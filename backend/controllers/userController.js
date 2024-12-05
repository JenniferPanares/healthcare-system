import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { User } from "../models/userSchema.js";
import ErrorHandler from "../middlewares/error.js";
import { generateToken } from "../utils/jwtToken.js";

// Register a new patient
export const patientRegister = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, phone, nic, dob, gender, password } =
    req.body;

  // Validate required fields
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !dob ||
    !gender ||
    !password
  ) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }

  // Check if email is already registered
  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(new ErrorHandler("User already Registered!", 400));
  }

  // Create new patient user
  const user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    password,
    role: "Patient",
  });

  // Generate JWT token for the user
  generateToken(user, "User Registered!", 200, res);
});

// Login a user (patient or admin)
export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password, role } = req.body;

  // Validate required fields
  if (!email || !password || !role) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }

  // Check if user exists and password matches
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.comparePassword(password))) {
    return next(new ErrorHandler("Invalid Email Or Password!", 400));
  }

  // Check if role matches
  if (role !== user.role) {
    return next(new ErrorHandler("User Not Found With This Role!", 400));
  }

  // Generate JWT token for the user
  generateToken(user, "Login Successfully!", 201, res);
});

// Add a new admin user
export const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, phone, nic, dob, gender, password } =
    req.body;

  // Validate required fields
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !dob ||
    !gender ||
    !password
  ) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }

  // Check if email is already registered
  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(new ErrorHandler("Admin With This Email Already Exists!", 400));
  }

  // Create a new admin user
  const admin = await User.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
    role: "Admin",
  });

  res.status(200).json({
    success: true,
    message: "New Admin Registered",
    admin,
  });
});

// Get a list of all doctors
export const getAllDoctors = catchAsyncErrors(async (req, res, next) => {
  const doctors = await User.find({ role: "Doctor" });
  res.status(200).json({
    success: true,
    doctors,
  });
});

// Get details of the logged-in user
export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = req.user; // Retrieved from auth middleware
  res.status(200).json({
    success: true,
    user,
  });
});

// Logout for admin (dashboard)
export const logoutAdmin = catchAsyncErrors(async (req, res, next) => {
  res
    .status(201)
    .cookie("adminToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Admin Logged Out Successfully.",
    });
});

// Logout for patient (frontend)
export const logoutPatient = catchAsyncErrors(async (req, res, next) => {
  res
    .status(201)
    .cookie("patientToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Patient Logged Out Successfully.",
    });
});
