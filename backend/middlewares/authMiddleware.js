import jwt from "jsonwebtoken";
import { User } from "../models/userSchema.js";

const verifyToken = async (token, role, res) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user || user.role !== role) {
      res.status(403).json({ message: "Access denied" });
      return null;
    }
    return user;
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
    return null;
  }
};

export const isAdminAuthenticated = async (req, res, next) => {
  const { adminToken } = req.cookies;
  if (!adminToken) {
    return res.status(401).json({ message: "Admin not authenticated" });
  }
  req.user = await verifyToken(adminToken, "Admin", res);
  if (req.user) next();
};

export const isPatientAuthenticated = async (req, res, next) => {
  const { patientToken } = req.cookies;
  if (!patientToken) {
    return res.status(401).json({ message: "Patient not authenticated" });
  }
  req.user = await verifyToken(patientToken, "Patient", res);
  if (req.user) next();
};
