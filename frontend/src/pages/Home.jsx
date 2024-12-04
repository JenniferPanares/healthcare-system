import React from "react";
import Hero from "../components/Hero";


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
            imageUrl={"./hero.png"}
          />
        </div>
      </div>

      
    </div>
  );
};

export default Home;
