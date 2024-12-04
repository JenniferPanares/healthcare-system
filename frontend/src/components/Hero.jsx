import React from "react";
import hero from "../assets/hero.png";

const Hero = ({ title, imageUrl }) => {
  return (
    <div className="container-fluid bg-light py-5">
      <div className="container">
        <div className="row align-items-center">
          {/* Text Section */}
          <div className="col-md-6 mb-4">
            <h1 className="display-4 text-primary">{title}</h1>
            <p className="lead">
            JJK Medical Clinic is a modern healthcare facility devoted to delivering comprehensive and compassionate medical services. Our skilled team of professionals is dedicated to providing personalized care, tailored to meet the unique needs of each patient. At JJK, your well-being is our priority as we guide you on a seamless journey to achieving optimal health and wellness.
            </p>
          </div>

          {/* Image Section */}
          <div className="col-md-6 text-center">
            <img
              src={hero}
              alt="hero"
              className="img-fluid rounded shadow"
            />         
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
