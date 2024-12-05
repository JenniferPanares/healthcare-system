import React from "react";
import hero from "../assets/hero.png";

const Hero = ({ title, imageUrl }) => {
  return (
    <div className="container-fluid bg-light py-5">
      <div className="container">
        <div className="row align-items-center">
          {/* Text Section */}
          <div className="col-md-6 mb-4">
            {/* Display the title */}
            <h1 className="display-4 text-primary">{title}</h1>
            {/* Description about the clinic */}
            <p className="lead">
              JJK Medical Clinic is a state-of-the-art healthcare facility
              committed to delivering exceptional and compassionate medical
              care. Our experienced team of professionals is dedicated to
              providing personalized treatments designed to meet each patient’s
              unique needs. 
            </p>
          </div>

          {/* Image Section */}
          <div className="col-md-6 text-center">
            {/* Display the hero image */}
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
