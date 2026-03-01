import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="hero" id="home">
      <div className="hero-overlay">
        <div className="hero-content">
          <h1>Smart India Hackathon 2025</h1>
          <p className="hero-sub">
            World’s Biggest Open Innovation Platform
          </p>

          <div className="hero-quote">
            “Innovate. Implement. Impact.  
            Transforming ideas into national solutions.”
          </div>

           <Link to="/problems" className="hero-btn">
  Explore Problem Statements
</Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;