import React, { useContext, useState } from "react";
import { TiHome } from "react-icons/ti"; // Home icon
import { RiLogoutBoxFill } from "react-icons/ri"; // Logout icon
import { MdAddModerator } from "react-icons/md"; // Add Admin icon
import { GiHamburgerMenu } from "react-icons/gi"; // Hamburger menu icon
import axios from "axios";
import { Context } from "../index"; // Authentication context
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [show, setShow] = useState(false); // Sidebar visibility toggle
  const { isAuthenticated, setIsAuthenticated } = useContext(Context); // Context for auth state

  // Handle admin logout
  const handleLogout = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/v1/user/admin/logout", {
        withCredentials: true, // Include cookies for auth
      });
      console.log(res.data.message); // Log success message
      setIsAuthenticated(false); // Update auth state
      alert("You have logged out successfully."); // Optional alert
    } catch (err) {
      console.error(err.response?.data?.message); // Log error message
      alert("Error logging out. Please try again."); // Optional alert
    }
  };

  const navigateTo = useNavigate(); // Navigation hook

  // Navigate to the homepage
  const gotoHomePage = () => {
    navigateTo("/");
    setShow(!show); // Toggle sidebar visibility
  };

  // Navigate to Add New Admin page
  const gotoAddNewAdmin = () => {
    navigateTo("/admin/addnew");
    setShow(!show); // Toggle sidebar visibility
  };

  return (
    <>
      {/* Sidebar navigation menu */}
      <nav
        style={!isAuthenticated ? { display: "none" } : { display: "flex" }} // Hide if not authenticated
        className={show ? "show sidebar" : "sidebar"}
      >
        <div className="links">
          {/* Home link */}
          <TiHome onClick={gotoHomePage} />
          {/* Add Admin link */}
          <MdAddModerator onClick={gotoAddNewAdmin} />
          {/* Logout button */}
          <RiLogoutBoxFill onClick={handleLogout} />
        </div>
      </nav>

      {/* Hamburger menu for toggling sidebar */}
      <div
        className="wrapper"
        style={!isAuthenticated ? { display: "none" } : { display: "flex" }} // Hide if not authenticated
      >
        <GiHamburgerMenu className="hamburger" onClick={() => setShow(!show)} />
      </div>
    </>
  );
};

export default Sidebar;
