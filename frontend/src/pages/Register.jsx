import axios from "axios";
import React, { useContext, useState } from "react";
import { Context } from "../index"; // Context for authentication state
import { Link, Navigate, useNavigate } from "react-router-dom"; // Routing utilities

const Register = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context); // Authentication context

  // State variables for form inputs
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");

  const navigateTo = useNavigate(); // Navigation hook

  // Handle form submission for registration
  const handleRegistration = async (e) => {
    e.preventDefault(); // Prevent page reload
    try {
      // Send registration details to API
      await axios
        .post(
          "http://localhost:5000/api/v1/user/patient/register",
          { firstName, lastName, email, phone, nic, dob, gender, password }, // Payload
          {
            withCredentials: true, // Include cookies for authentication
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          console.log(res.data.message); // Log success message
          setIsAuthenticated(true); // Update auth state
          navigateTo("/"); // Navigate to homepage
          // Reset form fields
          setFirstName("");
          setLastName("");
          setEmail("");
          setPhone("");
          setNic("");
          setDob("");
          setGender("");
          setPassword("");
        });
    } catch (error) {
      console.error(error.response?.data?.message || "An error occurred"); // Log error message
    }
  };

  // Redirect to homepage if the user is already authenticated
  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow p-4">
            {/* Registration form header */}
            <h2 className="text-center text-primary mb-4">Sign Up</h2>
            <p className="text-center">
              Please fill in the form below to create an account.
            </p>

            {/* Registration form */}
            <form onSubmit={handleRegistration}>
              {/* Name fields */}
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="firstName" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    className="form-control"
                    placeholder="Enter your first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="lastName" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    className="form-control"
                    placeholder="Enter your last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>

              {/* Email field */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Mobile number field */}
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="form-control"
                  placeholder="Enter your mobile number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              {/* NIC field */}
              <div className="mb-3">
                <label htmlFor="nic" className="form-label">
                  NIC
                </label>
                <input
                  type="text"
                  id="nic"
                  className="form-control"
                  placeholder="Enter your NIC"
                  value={nic}
                  onChange={(e) => setNic(e.target.value)}
                />
              </div>

              {/* Date of Birth field */}
              <div className="mb-3">
                <label htmlFor="dob" className="form-label">
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="dob"
                  className="form-control"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
              </div>

              {/* Gender field */}
              <div className="mb-3">
                <label htmlFor="gender" className="form-label">
                  Gender
                </label>
                <select
                  id="gender"
                  className="form-select"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              {/* Password field */}
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* Link to login page */}
              <div className="d-flex justify-content-between align-items-center mb-3">
                <p className="mb-0">Already Registered?</p>
                <Link to="/signin" className="text-primary text-decoration-none">
                  Login Now
                </Link>
              </div>

              {/* Submit button */}
              <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
