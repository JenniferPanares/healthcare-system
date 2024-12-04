import React from "react";
import Hero from "../components/Hero";
import about from "../assets/about.gif";

const AboutUs = () => {
  return (
    <div className="container-fluid">
      {/* Hero Section */}
      <div className="row">
        <div className="col-12">
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
