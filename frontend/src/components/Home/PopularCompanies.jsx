import React from "react";

import {
  FaMicrosoft,
  FaApple,
} from "react-icons/fa";

import { SiTesla } from "react-icons/si";

const PopularCompanies = () => {
  const companies = [
    {
      id: 1,
      title: "Microsoft",
      location: "Bengaluru, India",
      openings: "120 Open Roles",
      icon: <FaMicrosoft />,
    },
    {
      id: 2,
      title: "Tesla",
      location: "Abu Dhabi, UAE",
      openings: "42 Open Roles",
      icon: <SiTesla />,
    },
    {
      id: 3,
      title: "Apple",
      location: "California, USA",
      openings: "85 Open Roles",
      icon: <FaApple />,
    },
  ];

  return (
    <section className="companies">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            Top Companies
          </h2>

          <p className="section-subtitle">
            Connect with leading companies actively
            hiring talented professionals.
          </p>
        </div>

        <div className="companies-grid">
          {companies.map((company) => (
            <div
              className="company-card"
              key={company.id}
            >
              <div className="company-top">
                <div className="company-icon">
                  {company.icon}
                </div>

                <div>
                  <h3>{company.title}</h3>
                  <p>{company.location}</p>
                </div>
              </div>

              <div className="company-footer">
                <span>{company.openings}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCompanies;