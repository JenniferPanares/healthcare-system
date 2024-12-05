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

// Route to post a new appointment (Patient only)
appointmentRouter.post("/post", isPatientAuthenticated, postAppointment);

// Route to get all appointments (Admin only)
appointmentRouter.get("/getall", isAdminAuthenticated, getAllAppointments);

// Route to update appointment status (Admin only)
appointmentRouter.put("/update/:id", isAdminAuthenticated, updateAppointmentStatus);

// Route to delete an appointment (Admin only)
appointmentRouter.delete("/delete/:id", isAdminAuthenticated, deleteAppointment);

export default appointmentRouter;
