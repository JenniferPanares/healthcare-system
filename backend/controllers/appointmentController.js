import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Appointment } from "../models/appointmentSchema.js";
import { User } from "../models/userSchema.js";

import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Appointment } from "../models/appointmentSchema.js";

// Create a new appointment
export const postAppointment = catchAsyncErrors(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    appointment_date,
    department,
    hasVisited,
    address,
  } = req.body;

  // Validate required fields
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !dob ||
    !gender ||
    !appointment_date ||
    !department ||
    !address
  ) {
    return next(new ErrorHandler("Please Fill the Complete Form!", 400));
  }

  // Create a new appointment
  const appointment = await Appointment.create({
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    appointment_date,
    department,
    hasVisited,
    address,
    patientId: req.user._id, // Assign patient ID from the logged-in user
  });

  res.status(200).json({
    success: true,
    appointment,
    message: "Appointment Scheduled Successfully!",
  });
});

// Get all appointments
export const getAllAppointments = catchAsyncErrors(async (req, res, next) => {
  const appointments = await Appointment.find(); // Fetch all appointments
  res.status(200).json({
    success: true,
    appointments,
  });
});

// Update appointment status
export const updateAppointmentStatus = catchAsyncErrors(
  async (req, res, next) => {
    const { id } = req.params;

    // Find appointment by ID
    let appointment = await Appointment.findById(id);
    if (!appointment) {
      return next(new ErrorHandler("Appointment not found!", 404));
    }

    // Update appointment details
    appointment = await Appointment.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      message: "Appointment Status Updated!",
    });
  }
);

// Delete an appointment
export const deleteAppointment = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  // Find appointment by ID
  const appointment = await Appointment.findById(id);
  if (!appointment) {
    return next(new ErrorHandler("Appointment Not Found!", 404));
  }

  // Delete the appointment
  await appointment.deleteOne();
  res.status(200).json({
    success: true,
    message: "Appointment Deleted!",
  });
});
