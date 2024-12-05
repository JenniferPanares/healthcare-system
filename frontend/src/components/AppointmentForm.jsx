import axios from "axios";
import React, { useState } from "react";

const AppointmentForm = () => {
  // State for form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    appointmentDate: "",
    department: "Pediatrics",
    address: "",
    hasVisited: false,
  });

  // Array of departments
  const departmentsArray = [
    "Pediatrics",
    "Cardiology",
    "Neurology",
    "Orthopedics",
  ];

  const [successMessage, setSuccessMessage] = useState(""); // State for success message
  const [errorMessage, setErrorMessage] = useState(""); // State for error message

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle form submission
  const handleAppointment = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/appointment/post",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      setSuccessMessage(data.message); // Show success message
      setErrorMessage(""); // Clear error message
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        dob: "",
        gender: "",
        appointmentDate: "",
        department: "Pediatrics",
        address: "",
        hasVisited: false,
      });
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "An error occurred");
      setSuccessMessage(""); // Clear success message
    }
  };
  

  return (
    <div className="container mt-5">
      <h2 className="text-center">Schedule an Appointment</h2>
      {/* Display success or error messages */}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      
      {/* Appointment form */}
      <form onSubmit={handleAppointment}>
        {/* Personal information fields */}
        <div className="row mb-3">
          <div className="col-md-6">
            <input
              type="text"
              name="firstName"
              className="form-control"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              name="lastName"
              className="form-control"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
        </div>
        
        {/* Contact and NIC information */}
        <div className="row mb-3">
          <div className="col-md-6">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              name="phone"
              className="form-control"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
        </div>
        
        {/* Appointment and department details */}
        <div className="row mb-3">
          <div className="col-md-6">
            <select
              name="department"
              className="form-select"
              value={formData.department}
              onChange={handleChange}
            >
              {/* Populate departments */}
              {departmentsArray.map((dep, index) => (
                <option key={index} value={dep}>
                  {dep}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Address and additional options */}
        <div className="mb-3">
          <textarea
            name="address"
            className="form-control"
            placeholder="Address"
            rows="3"
            value={formData.address}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="form-check mb-3">
          <input
            type="checkbox"
            name="hasVisited"
            className="form-check-input"
            checked={formData.hasVisited}
            onChange={handleChange}
          />
          <label className="form-check-label">Have you visited us before?</label>
        </div>

        {/* Submit button */}
        <button type="submit" className="btn btn-primary w-100">
          Schedule Appointment
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;
