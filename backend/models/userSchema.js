import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Define user schema
const userSchema = new mongoose.Schema({
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
    minLength: [11, "Phone number must be 11 digits"],
    maxLength: [11, "Phone number must be 11 digits"],
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
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [8, "Password must be at least 8 characters"],
    select: false, // Exclude password by default in queries
  },
  role: {
    type: String,
    required: [true, "User role is required"],
    enum: ["Patient", "Doctor", "Admin"],
  },
  doctorDepartment: {
    type: String, // Optional: Doctor's department or specialization
  },
  docAvatar: {
    public_id: String, // Public ID for the avatar (if stored in cloud)
    url: String, // URL for the avatar image
  },
});

// Pre-save middleware to hash the password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next(); // Skip if password is unchanged
  }
  this.password = await bcrypt.hash(this.password, 10); // Hash password
});

// Method to compare entered password with the stored hash
userSchema.methods.comparePassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

// Method to generate a JWT token
userSchema.methods.generateJsonWebToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES, // Token expiration time
  });
};

// Create and export the User model
export const User = mongoose.model("User", userSchema);
