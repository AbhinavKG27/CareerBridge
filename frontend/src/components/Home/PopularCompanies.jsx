import React, { useEffect, useState } from "react";

import {
  FaMicrosoft,
  FaApple,
} from "react-icons/fa";

import { SiTesla } from "react-icons/si";
import { FaGoogle, FaAmazon } from "react-icons/fa";
import { SiNetflix } from "react-icons/si";

import axios from "axios";

const PopularCompanies = () => {

  // ✅ NEW STATE
  const [companiesData, setCompaniesData] = useState([]);

  const API = import.meta.env.VITE_API_URL;

  // ✅ FETCH FROM BACKEND
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axios.get(`${API}/api/v1/job/companies`);
        setCompaniesData(res.data.companies);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCompanies();
  }, [API]);

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

  // ✅ NEW ONES
  {
    id: 4,
    title: "Google",
    location: "Hyderabad, India",
    openings: "95 Open Roles",
    icon: <FaGoogle />,
  },
  {
    id: 5,
    title: "Netflix",
    location: "Los Angeles, USA",
    openings: "28 Open Roles",
    icon: <SiNetflix />,
  },
  {
    id: 6,
    title: "Amazon",
    location: "Seattle, USA",
    openings: "150 Open Roles",
    icon: <FaAmazon />,
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

          {/* ✅ DYNAMIC DATA FIRST */}
          {companiesData.length > 0 &&
            companiesData.map((company, index) => (
              <div className="company-card" key={index}>
                <div className="company-top">
                  <div className="company-icon">
                    {company.company
                      ? company.company.slice(0, 2).toUpperCase()
                      : "NA"}
                  </div>

                  <div>
                    <h3>{company.company || "Unknown Company"}</h3>
                    <p>{company.location || "Location not available"}</p>
                  </div>
                </div>

                <div className="company-footer">
                  <span>{company.openRoles} Open Roles</span>
                </div>
              </div>
            ))}

          {/* ❗ ORIGINAL HARDCODED (KEPT AS FALLBACK) */}
          {companiesData.length === 0 &&
            companies.map((company) => (
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