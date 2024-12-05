import express from "express";
import {
  addNewAdmin,
  getAllDoctors,
  getUserDetails,
  login,
  logoutAdmin,
  logoutPatient,
  patientRegister,
} from "../controllers/userController.js";
import {
  isAdminAuthenticated,
  isPatientAuthenticated,
} from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

// Route for patient registration
userRouter.post("/patient/register", patientRegister);

// Route for user login (patients and admins)
userRouter.post("/login", login);

// Route to add a new admin (Admin only)
userRouter.post("/admin/addnew", isAdminAuthenticated, addNewAdmin);

// Route to get all doctors
userRouter.get("/doctors", getAllDoctors);

// Route to get patient details (Patient only)
userRouter.get("/patient/me", isPatientAuthenticated, getUserDetails);

// Route to get admin details (Admin only)
userRouter.get("/admin/me", isAdminAuthenticated, getUserDetails);

// Route for patient logout
userRouter.get("/patient/logout", isPatientAuthenticated, logoutPatient);

// Route for admin logout
userRouter.get("/admin/logout", isAdminAuthenticated, logoutAdmin);

export default userRouter;
