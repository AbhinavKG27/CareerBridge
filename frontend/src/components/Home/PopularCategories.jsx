import React from "react";

import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      icon: <FaUserPlus />,
      title: "Create Your Account",
      description:
        "Sign up and build your professional profile to receive personalized job recommendations and opportunities.",
    },
    {
      id: 2,
      icon: <MdFindInPage />,
      title: "Discover Opportunities",
      description:
        "Browse thousands of jobs from top companies or post openings to connect with qualified candidates.",
    },
    {
      id: 3,
      icon: <IoMdSend />,
      title: "Apply & Connect",
      description:
        "Apply seamlessly, manage applications, and connect directly with employers or skilled professionals.",
    },
  ];

  return (
    <section className="howitworks">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            How CareerBridge Works
          </h2>

          <p className="section-subtitle">
            A simple and efficient workflow for both
            job seekers and employers.
          </p>
        </div>

        <div className="how-grid">
          {steps.map((step) => (
            <div className="how-card" key={step.id}>
              <div className="how-icon">
                {step.icon}
              </div>

              <h3>{step.title}</h3>

              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;