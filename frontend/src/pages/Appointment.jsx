import React from "react";
import Hero from "../components/Hero";
import AppointmentForm from "../components/AppointmentForm";

const Appointment = () => {
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
        <div className="col-md-8 col-lg-6">
          <AppointmentForm />
        </div>
      </div>
    </div>
  );
};

export default Appointment;
