import mongoose from "mongoose";
import validator from "validator";

const appointmentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    minLength: [3, "First name must be at least 3 characters"],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    minLength: [3, "Last name must be at least 3 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    validate: [validator.isEmail, "Invalid email format"],
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
    minLength: [7, "Phone number must be at least 7 digits"],
    maxLength: [11, "Phone number can't exceed 11 digits"],
  },
  dob: {
    type: Date,
    required: [true, "Date of birth is required"],
  },
  gender: {
    type: String,
    required: [true, "Gender is required"],
    enum: ["Male", "Female"],
  },
  appointment_date: {
    type: Date,
    required: [true, "Appointment date is required"],
  },
  department: {
    type: String,
    required: [true, "Department is required"],
  },
  address: {
    type: String,
    required: [true, "Address is required"],
  },
  hasVisited: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected"],
    default: "Pending",
  },
});

export const Appointment = mongoose.model("Appointment", appointmentSchema);
