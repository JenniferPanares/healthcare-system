import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";

import userRoutes from "./routes/userRouter.js";
import appointmentRoutes from "./routes/appointmentRouter.js";

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());

// Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/appointment", appointmentRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({ message: err.message });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
