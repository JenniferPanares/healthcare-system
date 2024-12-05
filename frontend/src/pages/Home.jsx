import React from "react";
import Hero from "../components/Hero";
import hero from "../assets/hero.png";

const Home = () => {
  return (
    <div className="container-fluid">
      {/* Hero Section */}
      <div className="row">
        <div className="col-12">
          <Hero
            title={
              "Welcome to JJK Medical Clinic | Your Certified Healthcare Experts"
            }
            imageUrl={hero}
          />
        </div>
      </div>

      {/* About Us Section */}
      <div className="row my-5">
        <div className="col-12 text-center">
          <h2>About JJK Medical Clinic</h2>
          <p className="lead">
            At JJK Medical Clinic, we prioritize your health and well-being. Our
            team of dedicated healthcare professionals provides personalized
            care to meet your specific needs. From routine checkups to
            specialized treatments, we are here to support you every step of
            the way.
          </p>
        </div>
      </div>

      {/* Services Section */}
      <div className="row my-5">
        <div className="col-12">
          <h3 className="text-center">Our Services</h3>
          <ul className="list-unstyled text-center">
            <li>✔ General Checkups</li>
            <li>✔ Pediatric Care</li>
            <li>✔ Cardiology Services</li>
            <li>✔ Neurology Consultations</li>
            <li>✔ Orthopedics and Sports Medicine</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
