import React, { useContext, useState } from "react";
import { Context } from "../index"; // Context for authentication state
import { Navigate, useNavigate } from "react-router-dom"; // Navigation hooks
import axios from "axios";

const AddNewAdmin = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context); // Authentication context

  // State for form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");

  const navigateTo = useNavigate(); // Navigation hook

  // Handle form submission
  const handleAddNewAdmin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      // Send POST request to the API
      const res = await axios.post(
        "http://localhost:4000/api/v1/user/admin/addnew",
        { firstName, lastName, email, phone, nic, dob, gender, password },
        {
          withCredentials: true, // Include cookies for authentication
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log(res.data.message); // Log success message
      alert("Admin added successfully!"); // Show success alert
      setIsAuthenticated(true); // Update authentication state
      navigateTo("/"); // Navigate to the homepage

      // Clear form fields
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setNic("");
      setDob("");
      setGender("");
      setPassword("");
    } catch (error) {
      console.error(error.response.data.message); // Log error message
      alert("Error adding admin. Please try again."); // Show error alert
    }
  };

  // Redirect to login page if not authenticated
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <section className="page">
      <section className="container form-component add-admin-form">
        {/* Logo and title */}
        <img src="/logo.png" alt="logo" className="logo" />
        <h1 className="form-title">ADD NEW ADMIN</h1>

        {/* Form for adding a new admin */}
        <form onSubmit={handleAddNewAdmin}>
          {/* Name fields */}
          <div>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          {/* Contact fields */}
          <div>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="number"
              placeholder="Mobile Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          {/* Identification and DOB fields */}
          <div>
            <input
              type="number"
              placeholder="NIC"
              value={nic}
              onChange={(e) => setNic(e.target.value)}
            />
            <input
              type={"date"}
              placeholder="Date of Birth"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>

          {/* Gender and Password fields */}
          <div>
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Submit button */}
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">ADD NEW ADMIN</button>
          </div>
        </form>
      </section>
    </section>
  );
};

export default AddNewAdmin;
