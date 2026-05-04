import React, {
  useContext,
} from "react";

import {
  FaBuilding,
  FaSuitcase,
  FaUsers,
  FaUserPlus,
} from "react-icons/fa";

import { useEffect, useState } from "react";
import axios from "axios";

import { Link } from "react-router-dom";

import { Context } from "../../main";

const HeroSection = () => {
  const { user } =
    useContext(Context);

  const isEmployer =
    user?.role === "Employer";

  const [stats, setStats] = useState({
    totalJobs: 0,
    totalCompanies: 0,
    totalJobSeekers: 0,
    successRate: 0,
  });

  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(
          `${API}/api/v1/job/stats`
        );
        setStats(res.data.stats);
      } catch (err) {
        console.log("Stats error:", err);
      }
    };

    fetchStats();
  }, [API]);

  const details = isEmployer
    ? [
        {
          id: 1,
          title: `${stats.totalCompanies}+`,
          subTitle:
            "Active Recruiters",
          icon: <FaBuilding />,
        },
        {
          id: 2,
          title: `${stats.totalJobs}+`,
          subTitle:
            "Open Positions",
          icon: <FaSuitcase />,
        },
        {
          id: 3,
          title: `${stats.totalJobSeekers}+`,
          subTitle:
            "Candidates",
          icon: <FaUsers />,
        },
        {
          id: 4,
          title: `${stats.successRate}%`,
          subTitle:
            "Hiring Success",
          icon: <FaUserPlus />,
        },
      ]
    : [
        {
          id: 1,
          title: `${stats.totalJobs}+`,
          subTitle:
            "Active Jobs",
          icon: <FaSuitcase />,
        },
        {
          id: 2,
          title: `${stats.totalCompanies}+`,
          subTitle:
            "Hiring Companies",
          icon: <FaBuilding />,
        },
        {
          id: 3,
          title: `${stats.totalJobSeekers}+`,
          subTitle:
            "Job Seekers",
          icon: <FaUsers />,
        },
        {
          id: 4,
          title: `${stats.successRate}%`,
          subTitle:
            "Success Rate",
          icon: <FaUserPlus />,
        },
      ];

  return (
    <section className="heroSection">
      <div className="container hero-grid">
        <div className="hero-content">
          <span className="hero-badge">
            {isEmployer
              ? "Recruit smarter with CareerBridge"
              : "Trusted by modern professionals"}
          </span>

          <h1>
            {isEmployer
              ? "Hire top talent faster and build your dream team."
              : "Find meaningful work that matches your ambition."}
          </h1>

          <p>
            {isEmployer
              ? "Post opportunities, manage applications, and connect with skilled professionals through a modern recruitment platform."
              : "CareerBridge helps talented professionals connect with growing companies, discover opportunities faster, and build successful careers with confidence."}
          </p>

          <div className="hero-cta">
            {isEmployer ? (
              <>
                <Link
                  to="/job/post"
                  className="btn btn-primary"
                >
                  Post a Job
                </Link>

                <Link
                  to="/applications/me"
                  className="btn btn-secondary"
                >
                  View Applicants
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/job/getall"
                  className="btn btn-primary"
                >
                  Explore Jobs
                </Link>

                <Link
                  to="/applications/me"
                  className="btn btn-secondary"
                >
                  Track Applications
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="hero-image-wrapper">
          <img
            src="/heroS.jpg"
            alt="CareerBridge Hero"
          />
        </div>
      </div>

      <div className="container stats-grid">
        {details.map((item) => (
          <div
            className="stats-card"
            key={item.id}
          >
            <div className="stats-icon">
              {item.icon}
            </div>

            <div className="stats-content">
              <h3>{item.title}</h3>

              <p>
                {item.subTitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;