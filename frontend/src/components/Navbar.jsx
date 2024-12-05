import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Context } from "../index"; // Context for authentication state
import logo from "../assets/logo.png";

const Navbar = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context); // Authentication context
  const navigateTo = useNavigate(); // Navigation hook

  // Handle user logout
  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:5000/api/v1/user/patient/logout", {
        withCredentials: true, // Include cookies for authentication
      });
      setIsAuthenticated(false); // Update authentication state
    } catch (err) {
      console.error("Error during logout:", err); // Log any logout errors
    }
  };

  // Navigate to the login page
  const goToLogin = () => {
    navigateTo("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">
        {/* Logo */}
        <Link to="/" className="navbar-brand">
          <img src={logo} alt="logo" className="img-fluid" style={{ width: "100px" }} />
        </Link>

        {/* Toggle Button for Mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {/* Home Link */}
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            {/* Appointment Link */}
            <li className="nav-item">
              <Link to="/appointment" className="nav-link">
                Appointment
              </Link>
            </li>
            {/* About Us Link */}
            <li className="nav-item">
              <Link to="/about" className="nav-link">
                About Us
              </Link>
            </li>
            {/* Conditional Login/Logout Button */}
            {isAuthenticated ? (
              <li className="nav-item">
                <button className="btn btn-outline-danger ms-2" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            ) : (
              <li className="nav-item">
                <button className="btn btn-outline-primary ms-2" onClick={goToLogin}>
                  Login
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
