import React from "react";
import Hero from "../components/Hero"; // Hero component for the hero section
import about from "../assets/about.gif"; // About us image

const AboutUs = () => {
  return (
    <div className="container-fluid">
      {/* Hero Section */}
      <div className="row">
        <div className="col-12">
          {/* Pass title and image URL to the Hero component */}
          <Hero
            title={"Learn More About Us | JJK Medical Clinic"}
            imageUrl={about}
          />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
