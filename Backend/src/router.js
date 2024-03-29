import { Router } from "express";

import { upload } from "./modules/multer.js";

import {
  getAllStudent,
  getSingleStudent,
  updateStudent,
  deleteStudent
} from "./handlers/student.js";
import {
  createStaff,
  getAllStaff,
  getSingleStaff,
  deleteStaff,
  updateStaff
} from "./handlers/staff.js";
import {
  createAdmin,
  getAllAdmin,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin
} from "./handlers/admin.js";
import {
  registerProject,
  updateProject,
  deleteProject,
  getAllProjects,
  getSingleProject, getAllProjectsForSingleStaff,
  updateReviewByProjectId
} from "./handlers/project.js";

import { getFileById, updateFile, uploadFile } from "./handlers/file.js";

import { review, updateReview, reviewForm, deleteReviewsByProjectId } from "./handlers/review.js";

const router = Router();

// get single student
router.get("/students/:id", getSingleStudent);
// student signup
// router.post("/student", createStudent);
// update student
router.put("/students/:id", updateStudent);
// delete student
router.delete("/students/:id", deleteStudent);

router.get("/staffs/:id", getSingleStaff);
router.post("/staffs", upload.single("profileImg"), createStaff);
router.put("/staffs/:id", updateStaff);
router.delete("/staffs/:id", deleteStaff);

router.get("/admins", getAllAdmin);
router.get("/admins/:id", getSingleAdmin);
router.post("/admins", createAdmin);
router.put("/admins/:id", updateAdmin);
router.delete("/admins/:id", deleteAdmin);

// Projects
router.get("/projects", getAllProjects);
router.get("/projects/reviews", getAllProjects);
router.get("/projects/:staffId/reviews/", getAllProjectsForSingleStaff)
router.get("/projects/:id", getSingleProject);
router.get("/projects/:id/reviews", getSingleProject);
router.post("/projects", registerProject);
router.put("/projects/:id", updateProject);
router.put("/projects/:staffId/reviews/:projectId", updateReviewByProjectId )
router.delete("/projects/:id", deleteProject);

router.get("/files/:id", getFileById);
router.post("/files", upload.single("data"), uploadFile);
router.put("/files/:id", upload.single("data"), updateFile);

router.get("/review-form",reviewForm);
router.post("/reviews", review);
router.put("/reviews/:id", updateReview);
router.delete("/projects/:id/reviews", deleteReviewsByProjectId)

export default router;
