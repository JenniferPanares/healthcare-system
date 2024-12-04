import express from "express";
import {
  deleteAppointment,
  getAllAppointments,
  postAppointment,
  updateAppointmentStatus,
} from "../controllers/appointmentController.js";
import {
  isAdminAuthenticated,
  isPatientAuthenticated,
} from "../middlewares/authMiddleware.js";

const appointmentRouter = express.Router();

// Appointment routes
appointmentRouter.post("/post", isPatientAuthenticated, postAppointment);
appointmentRouter.get("/getall", isAdminAuthenticated, getAllAppointments);
appointmentRouter.put("/update/:id", isAdminAuthenticated, updateAppointmentStatus);
appointmentRouter.delete("/delete/:id", isAdminAuthenticated, deleteAppointment);

export default appointmentRouter;
