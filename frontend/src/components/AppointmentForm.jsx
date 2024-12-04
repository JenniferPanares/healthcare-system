import axios from "axios";
import React, { useState, useEffect } from "react";

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    nic: "",
    dob: "",
    gender: "",
    appointmentDate: "",
    department: "Pediatrics",
    doctorFirstName: "",
    doctorLastName: "",
    address: "",
    hasVisited: false,
  });

  const departmentsArray = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
   
  ];

  const [doctors, setDoctors] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchDoctors = async () => {
      const { data } = await axios.get("http://localhost:4000/api/v1/user/doctors", {
        withCredentials: true,
      });
      setDoctors(data.doctors);
    };
    fetchDoctors();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleAppointment = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/appointment/post",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      setSuccessMessage(data.message);
      setErrorMessage("");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        nic: "",
        dob: "",
        gender: "",
        appointmentDate: "",
        department: "Pediatrics",
        doctorFirstName: "",
        doctorLastName: "",
        address: "",
        hasVisited: false,
      });
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "An error occurred");
      setSuccessMessage("");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Schedule an Appointment</h2>
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <form onSubmit={handleAppointment}>
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
        <div className="row mb-3">
          <div className="col-md-6">
            <input
              type="text"
              name="nic"
              className="form-control"
              placeholder="NIC"
              value={formData.nic}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <input
              type="date"
              name="dob"
              className="form-control"
              placeholder="Date of Birth"
              value={formData.dob}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <select
              name="gender"
              className="form-select"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="col-md-6">
            <input
              type="date"
              name="appointmentDate"
              className="form-control"
              value={formData.appointmentDate}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <select
              name="department"
              className="form-select"
              value={formData.department}
              onChange={handleChange}
            >
              {departmentsArray.map((dep, index) => (
                <option key={index} value={dep}>
                  {dep}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <select
              name="doctor"
              className="form-select"
              value={`${formData.doctorFirstName} ${formData.doctorLastName}`}
              onChange={(e) => {
                const [firstName, lastName] = e.target.value.split(" ");
                setFormData({
                  ...formData,
                  doctorFirstName: firstName,
                  doctorLastName: lastName,
                });
              }}
            >
              <option value="">Select Doctor</option>
              {doctors
                .filter((doc) => doc.department === formData.department)
                .map((doc, index) => (
                  <option
                    key={index}
                    value={`${doc.firstName} ${doc.lastName}`}
                  >
                    {doc.firstName} {doc.lastName}
                  </option>
                ))}
            </select>
          </div>
        </div>
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
        <button type="submit" className="btn btn-primary w-100">
          Schedule Appointment
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;
