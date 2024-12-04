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

// User routes
userRouter.post("/patient/register", patientRegister);
userRouter.post("/login", login);
userRouter.post("/admin/addnew", isAdminAuthenticated, addNewAdmin);
userRouter.get("/doctors", getAllDoctors);
userRouter.get("/patient/me", isPatientAuthenticated, getUserDetails);
userRouter.get("/admin/me", isAdminAuthenticated, getUserDetails);
userRouter.get("/patient/logout", isPatientAuthenticated, logoutPatient);
userRouter.get("/admin/logout", isAdminAuthenticated, logoutAdmin);

export default userRouter;
