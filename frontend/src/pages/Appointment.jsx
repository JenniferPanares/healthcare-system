import React, { useContext } from "react";
import { Navigate } from "react-router-dom"; 
import Hero from "../components/Hero"; 
import { Context } from "../index"; 

const Appointment = () => {
  const { isAuthenticated } = useContext(Context); // Get authentication state from context

  // Redirect to login if the user is not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container-fluid">
      {/* Hero Section */}
      <div className="row">
        <div className="col-12">
          <Hero
            title={"Schedule Your Appointment | JJK Medical Clinic"}
            imageUrl={"./signin.png"}
          />
        </div>
      </div>

      {/* Appointment Form Section */}
      <div className="row justify-content-center mt-5">
        <div className="col-md-8 col-lg-6 text-center">
          <p className="lead">
            You are now logged in. Navigate to the dashboard to schedule your
            appointments.
          </p>
          <p>
            Go to your <a href="/dashboard">Dashboard</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
