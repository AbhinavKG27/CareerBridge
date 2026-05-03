import React, {
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import axios from "axios";

import {
  Link,
  Navigate,
} from "react-router-dom";

import { Context } from "../../main";

import {
  FaLocationDot,
  FaBriefcase,
  FaMagnifyingGlass,
} from "react-icons/fa6";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const { isAuthorized } = useContext(Context);

  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(
          `${API}/api/v1/job/getall`,
          {
            withCredentials: true,
          }
        );

        setJobs(res.data.jobs || []);
      } catch (err) {
        setError(
          err?.response?.data?.message ||
            "Unable to load jobs"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [API]);

  const categories = useMemo(() => {
    const unique = [
      ...new Set(
        jobs.map((job) => job.category)
      ),
    ];

    return ["All", ...unique];
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        job.title
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        job.city
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        job.country
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "All"
          ? true
          : job.category === selectedCategory;

      return (
        matchesSearch && matchesCategory
      );
    });
  }, [jobs, search, selectedCategory]);

  if (!isAuthorized) {
    return <Navigate to="/login" />;
  }

  return (
    <section className="jobs-page page">
      <div className="container">
        <div className="jobs-hero">
          <div>
            <span className="hero-badge">
              Career Opportunities
            </span>

            <h1>
              Discover jobs that match your
              skills and goals.
            </h1>

            <p>
              Explore curated opportunities
              from top companies and growing
              startups around the world.
            </p>
          </div>
        </div>

        <div className="jobs-toolbar">
          <div className="search-box">
            <FaMagnifyingGlass />

            <input
              type="text"
              placeholder="Search jobs, cities, countries..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />
          </div>

          <div className="category-filters">
            {categories.map((category) => (
              <button
                key={category}
                className={
                  selectedCategory === category
                    ? "filter-btn active"
                    : "filter-btn"
                }
                onClick={() =>
                  setSelectedCategory(category)
                }
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {loading && (
          <div className="jobs-grid">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="job-card skeleton-card"
              />
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="empty-state">
            <h3>Something went wrong</h3>
            <p>{error}</p>
          </div>
        )}

        {!loading &&
          !error &&
          filteredJobs.length === 0 && (
            <div className="empty-state">
              <h3>No matching jobs found</h3>

              <p>
                Try changing your search or
                category filters.
              </p>
            </div>
          )}

        {!loading &&
          !error &&
          filteredJobs.length > 0 && (
            <div className="jobs-grid">
              {filteredJobs.map((job) => (
                <div
                  className="job-card"
                  key={job._id}
                >
                  <div className="job-top">
                    <span className="job-category">
                      {job.category}
                    </span>
                  </div>

                  <h3>{job.title}</h3>

                  <div className="job-meta">
                    <span>
                      <FaLocationDot />
                      {job.city},{" "}
                      {job.country}
                    </span>

                    <span>
                      <FaBriefcase />
                      Full Time
                    </span>
                  </div>

                  <p className="job-description">
                    {job.description?.slice(
                      0,
                      120
                    )}
                    ...
                  </p>

                  <div className="job-footer">
                    <div className="salary-chip">
                      {job.fixedSalary
                        ? `₹${job.fixedSalary}`
                        : `₹${job.salaryFrom} - ₹${job.salaryTo}`}
                    </div>

                    <Link
                      to={`/job/${job._id}`}
                      className="job-btn"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
      </div>
    </section>
  );
};

export default Jobs;