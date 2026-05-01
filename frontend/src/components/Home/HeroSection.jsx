import React from "react";
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const details = [
    { id: 1, title: "12k+", subTitle: "Active Jobs", icon: <FaSuitcase /> },
    { id: 2, title: "3k+", subTitle: "Hiring Companies", icon: <FaBuilding /> },
    { id: 3, title: "25k+", subTitle: "Job Seekers", icon: <FaUsers /> },
    { id: 4, title: "98%", subTitle: "Satisfaction", icon: <FaUserPlus /> },
  ];

  return (
    <div className="heroSection">
      <div className="container">
        <div className="title">
          <h1>Find work that matches your skills and ambition.</h1>
          <p>
            CareerBridge connects top talent with modern companies. Discover opportunities,
            apply in seconds, and take your career to the next level.
          </p>
          <div style={{ display: "flex", gap: "0.7rem", marginTop: "1rem" }}>
            <Link to="/job/getall" className="cta">Explore Jobs</Link>
            <Link to="/applications/me" className="cta" style={{ background: "transparent", color: "var(--primary)", border: "1px solid var(--border)" }}>Track Applications</Link>
          </div>
        </div>
        <div className="image">
          <img src="/heroS.jpg" alt="Job search hero" />
        </div>
      </div>
      <div className="details container">
        {details.map((element) => (
          <div className="card" key={element.id}>
            <div className="icon">{element.icon}</div>
            <div className="content">
              <p>{element.title}</p>
              <p>{element.subTitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;