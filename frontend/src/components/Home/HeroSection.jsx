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

  // ✅ TYPING ANIMATION STATES (ADDED)
  const texts =
    user?.role === "Employer"
      ? [
          "Hire top talent faster",
          "Build your dream team",
          "Find the best candidates",
        ]
      : [
          "Find meaningful work",
          "Get your dream job",
          "Grow your career faster",
        ];

  const [displayText, setDisplayText] =
    useState("");
  const [textIndex, setTextIndex] =
    useState(0);
  const [charIndex, setCharIndex] =
    useState(0);
  const [isDeleting, setIsDeleting] =
    useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];

    const typingSpeed = isDeleting ? 40 : 80;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(
          currentText.substring(
            0,
            charIndex + 1
          )
        );
        setCharIndex((prev) => prev + 1);

        if (
          charIndex + 1 ===
          currentText.length
        ) {
          setTimeout(
            () => setIsDeleting(true),
            1200
          );
        }
      } else {
        setDisplayText(
          currentText.substring(
            0,
            charIndex - 1
          )
        );
        setCharIndex((prev) => prev - 1);

        if (charIndex === 0) {
          setIsDeleting(false);
          setTextIndex(
            (prev) =>
              (prev + 1) %
              texts.length
          );
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [
    charIndex,
    isDeleting,
    textIndex,
    texts,
  ]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(
          `${API}/api/v1/job/stats`
        );
        setStats(res.data.stats);
      } catch (err) {
        console.log(
          "Stats error:",
          err
        );
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

          {/* ✅ TYPING HEADING (ENHANCED) */}
          <h1 className="hero-heading">
            {displayText}
            <span className="typing-cursor">
              |
            </span>
          </h1>

          <p className="hero-subtext">
            {isEmployer
              ? "Post opportunities, manage applications, and connect with skilled professionals through a modern recruitment platform."
              : "CareerBridge helps talented professionals connect with growing companies, discover opportunities faster, and build successful careers with confidence."}
          </p>

          <div className="hero-cta">
            {isEmployer ? (
              <>
                <Link
                  to="/job/post"
                  className="btn btn-primary hero-btn"
                >
                  Post a Job
                </Link>

                <Link
                  to="/applications/me"
                  className="btn btn-secondary hero-btn"
                >
                  View Applicants
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/job/getall"
                  className="btn btn-primary hero-btn"
                >
                  Explore Jobs
                </Link>

                <Link
                  to="/applications/me"
                  className="btn btn-secondary hero-btn"
                >
                  Track Applications
                </Link>
              </>
            )}
          </div>
        </div>

        {/* ✅ IMAGE ANIMATION */}
        <div className="hero-image-wrapper animated-image">
          <img
            src="/heroS.jpg"
            alt="CareerBridge Hero"
          />
        </div>
      </div>

      <div className="container stats-grid">
        {details.map((item) => (
          <div
            className="stats-card hover-card"
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