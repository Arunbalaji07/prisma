import React, { useState,useEffect } from "react";
import { ColorModeContext, useMode } from "../../theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "../global/Topbar";
import StaffSidebar from "../global/StaffSidebar";
import DataTable from "react-data-table-component";
import axios from "axios";
import { jwtDecode as jwt_decode } from "jwt-decode";
import * as ReactBootStrap from "react-bootstrap";

const DownloadReportStaff = () => {
  const [theme, colorMode] = useMode();
  const [data, setData] = useState();
  const [token, setToken] = useState(null)

  const [loading, setLoading] =  useState(false);

  const [modelData, setModelData] = useState('');
  const [finalData, setFinalData] = useState('');

  const fetchAllStudentsModel = async () => {
    try {
      const storedToken = localStorage.getItem('staff-token');
      const decodedToken = jwt_decode(storedToken)
      // console.log(decodedToken.id);

      const staffId = decodedToken.id

      const res = await axios.get(`http://localhost:7777/api/projects/${staffId}/reviews?stage=model`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`
        }
      });
      setLoading(true)
      const responseData = res.data
      setModelData(responseData.projects)
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAllStudentsFinal = async () => {
    try {
      const storedToken = localStorage.getItem('staff-token');
      const decodedToken = jwt_decode(storedToken)
      // console.log(decodedToken.id);

      const staffId = decodedToken.id

      const res = await axios.get(`http://localhost:7777/api/projects/${staffId}/reviews?stage=final`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`
        }
      });
      setLoading(true)
      const responseData = res.data
      setFinalData(responseData.projects)
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const storedToken = localStorage.getItem('staff-token');
    if (!storedToken) {
      window.location.href = "/";
      return;
    }

    setToken(storedToken);
    fetchAllStudentsModel()
    fetchAllStudentsFinal()
  }, []);

  const handleDownload = async (fileId) => {
    try {
      const response = await axios({
        url: `http://localhost:7777/api/files/${fileId}`,
        method: 'GET',
        responseType: 'blob', // important
        headers: {
          'Content-Type': 'application/json', // Adjust content type if necessary
          'Authorization': `Bearer ${token}`, // Include your authorization token here
        },
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'report.pdf'); // you can set file name here
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };


  const customStyles = {
    headRow: {
      style: {
        backgroundColor: "#45a049",
        color: "white",
      },
    },
    headCells: {
      style: {
        fontSize: "16px",
        maxWidth:'50px'
      },
    },
    cells: {
      style: {
        fontSize: "15px",
        maxWidth: "50px",
        // overflow: "hidden",
        textOverflow: "ellipsis",
      },
    },
  };

  const model = [
    {
      name: "PROJECT TITLE",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "STUDENT-1 NAME",
      selector: (row) => row.students && row.students.length > 0 ? row.students[0].fullName : "",
      sortable: true,
    },
    {
      name: "REGISTER NUMBER",
      selector: (row) => row.students && row.students.length > 0 ? row.students[0].regNo : "",
      sortable: true,
    },
    {
      name: "STUDENT-2 NAME",
      selector: (row) => row.students && row.students.length > 1 ? row.students[1].fullName : "",
      sortable: true,
    },
    {
      name: "REGISTER NUMBER",
      selector: (row) => row.students && row.students.length > 1 ? row.students[1].regNo : "",
      sortable: true,
    },
    {
      name: "STAGE",
      selector: (row) => row.reviews && row.reviews.length > 0 ? row.reviews[0].stage : "",
      sortable: true,
    },
    {
      name: "REPORT",
      cell: (row) => (
        row.reviews && row.reviews.length > 0 ?
          <button onClick={() => handleDownload(row.reviews[0].fileId[2])}>Download</button>
          : ""
      ),
      sortable: true,
    },
    // {
    //   name: "APPROVE STATUS",
    //   selector: (row) => row.reviews && row.reviews.length > 0 ? row.reviews[0].status : "",
    //   sortable: true,
    // },
    // {
    //   name: "Actions",
    //   cell: (row) => (
    //     <div>
    //       {row.reviews && row.reviews.length > 0 && row.reviews[0].status === 'pending' && (
    //         <>
    //           <button className="btn-approve" onClick={() => {}}>Approve</button>
    //           <button className="btn-decline" onClick={() => {}}>Decline</button>
    //         </>
    //       )}
    //       {row.reviews && row.reviews.length > 0 && row.reviews[0].status === 'approved' && <span>Approved</span>}
    //       {row.reviews && row.reviews.length > 0 && row.reviews[0].status === 'declined' && <span>Declined</span>}
    //     </div>
    //   ),
    //   sortable: false,
    // }
  ];

  const final = [
    {
      name: "PROJECT TITLE",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "STUDENT-1 NAME",
      selector: (row) => row.students && row.students.length > 0 ? row.students[0].fullName : "",
      sortable: true,
    },
    {
      name: "REGISTER NUMBER",
      selector: (row) => row.students && row.students.length > 0 ? row.students[0].regNo : "",
      sortable: true,
    },
    {
      name: "STUDENT-2 NAME",
      selector: (row) => row.students && row.students.length > 1 ? row.students[1].fullName : "",
      sortable: true,
    },
    {
      name: "REGISTER NUMBER",
      selector: (row) => row.students && row.students.length > 1 ? row.students[1].regNo : "",
      sortable: true,
    },
    {
      name: "STAGE",
      selector: (row) => row.reviews && row.reviews.length > 0 ? row.reviews[0].stage : "",
      sortable: true,
    },
    {
      name: "REPORT",
      cell: (row) => (
        row.reviews && row.reviews.length > 0 ?
          <button onClick={() => handleDownload(row.reviews[0].fileId[2])}>Download</button>
          : ""
      ),
      sortable: true,
    },
    // {
    //   name: "APPROVE STATUS",
    //   selector: (row) => row.reviews && row.reviews.length > 0 ? row.reviews[0].status : "",
    //   sortable: true,
    // },
    // {
    //   name: "Actions",
    //   cell: (row) => (
    //     <div>
    //       {row.reviews && row.reviews.length > 0 && row.reviews[0].status === 'pending' && (
    //         <>
    //           <button className="btn-approve" onClick={() => {}}>Approve</button>
    //           <button className="btn-decline" onClick={() => {}}>Decline</button>
    //         </>
    //       )}
    //       {row.reviews && row.reviews.length > 0 && row.reviews[0].status === 'approved' && <span>Approved</span>}
    //       {row.reviews && row.reviews.length > 0 && row.reviews[0].status === 'declined' && <span>Declined</span>}
    //     </div>
    //   ),
    //   sortable: false,
    // }
  ];


  const handleFilter = (event) => {
    const newRecord = data.filter(data => data.title.toLowerCase().includes(event.target.value.toLowerCase()))
    setData(newRecord)  
  }

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <StaffSidebar />
          <main className="content">
            <Topbar />
            <div style={{ maxWidth: '100%', overflowX: 'auto', margin:'20px'}}>
              <br />
              <h2>LIST OF STUDENTS</h2>
              <div style={{display: "flex", justifyContent: "left"}}>
                <input type="text" placeholder="Seach by Project" onChange={handleFilter} style={{padding: "6px 10px"}}/>
              </div>
              <br />
              {loading ? <>
                <h3 style={{textAlign:'center', color:'#9E1C3F'}}>Model Review</h3>
              <DataTable 
                columns={model}
                data={modelData}
                customStyles={customStyles}
                pagination
              />
              <h3 style={{textAlign:'center', color:'#9E1C3F'}}>Final Review</h3>
              <DataTable 
                columns={final}
                data={finalData}
                customStyles={customStyles}
                pagination
              />
              </> :
              <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}> 
              <ReactBootStrap.Spinner animation="border"/>
              </div>}
            </div>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default DownloadReportStaff;


