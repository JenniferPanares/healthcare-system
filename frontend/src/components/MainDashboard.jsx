import React, { useContext } from "react";
import { Context } from "../index";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const { isAuthenticated, user } = useContext(Context); // Access authentication and user data

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Conditionally render dashboards based on user role
  return (
    <>
      {user.role === "Admin" && <AdminDashboard />}
      {user.role === "Patient" && <UserDashboard />}
    </>
  );
};

export default Dashboard;
