import jwt from "jsonwebtoken";
import { User } from "../models/userSchema.js";

// Helper function to verify token and user role
const verifyToken = async (token, role, res) => {
  try {
    // Decode and verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user associated with the token
    const user = await User.findById(decoded.id);

    // Validate user existence and role
    if (!user || user.role !== role) {
      res.status(403).json({ message: "You do not have the required access" });
      return null;
    }

    return user; // Return the user if valid
  } catch (error) {
    // Handle invalid or expired token
    res.status(401).json({ message: "Session is invalid or has expired" });
    return null;
  }
};

// Middleware to authenticate admin
export const isAdminAuthenticated = async (req, res, next) => {
  const { adminToken } = req.cookies;

  // Check if admin token exists
  if (!adminToken) {
    return res.status(401).json({ message: "Admin access denied" });
  }

  // Verify admin token and role
  req.user = await verifyToken(adminToken, "Admin", res);

  // Proceed if the user is authenticated
  if (req.user) next();
};

// Middleware to authenticate patient
export const isPatientAuthenticated = async (req, res, next) => {
  const { patientToken } = req.cookies;

  // Check if patient token exists
  if (!patientToken) {
    return res.status(401).json({ message: "Patient access denied" });
  }

  // Verify patient token and role
  req.user = await verifyToken(patientToken, "Patient", res);

  // Proceed if the user is authenticated
  if (req.user) next();
};
