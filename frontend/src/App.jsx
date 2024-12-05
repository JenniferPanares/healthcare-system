import React, { useContext, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Appointment from "./pages/Appointment.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import Register from "./pages/Register.jsx";
import Navbar from "./components/Navbar.jsx";
import AdminDashboard from "./components/AdminDashboard.jsx";
import UserDashboard from "./components/UserDashboard.jsx"; // Separate User Dashboard
import Sidebar from "./components/Sidebar.jsx";
import axios from "axios";
import { Context } from "./index";
import Login from "./pages/Login.jsx";
import AddNewAdmin from "./pages/AddNewAdmin.jsx";

const App = () => {
  const { isAuthenticated, setIsAuthenticated, setUser, user } =
    useContext(Context); // Access user context

  // Check authentication status on load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/user/patient/me",
          {
            withCredentials: true,
          }
        );
        setIsAuthenticated(true);
        setUser(response.data.user); // Set user data in context
      } catch (error) {
        setIsAuthenticated(false);
        setUser({});
      }
    };
    fetchUser();
  }, [setIsAuthenticated, setUser]);

  return (
    <Router>
      {/* Navbar and Sidebar */}
      <Navbar />
      {isAuthenticated && <Sidebar />}

      {/* Define Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/addnew" element={<AddNewAdmin />} />

        {/* Conditional Dashboard Rendering */}
        {isAuthenticated && user?.role === "Admin" && (
          <Route path="/dashboard" element={<AdminDashboard />} />
        )}
        {isAuthenticated && user?.role === "Patient" && (
          <Route path="/dashboard" element={<UserDashboard />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;
