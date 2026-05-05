import React, {
  useContext,
  useEffect,
  useState,
} from "react";

import {
  Link,
  Navigate,
  useNavigate,
  useParams,
} from "react-router-dom";

import axios from "axios";

import { Context } from "../../main";

import {
  FaLocationDot,
  FaMoneyBillWave,
  FaBriefcase,
} from "react-icons/fa6";

const JobDetails = () => {
  const { id } = useParams();

  const [job, setJob] = useState({});

  const navigateTo = useNavigate();

  const API = import.meta.env.VITE_API_URL;

  const { isAuthorized, user } =
    useContext(Context);

  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  useEffect(() => {
    axios
      .get(`${API}/api/v1/job/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setJob(res.data.job);
      })
      .catch(() => {
        navigateTo("/notfound");
      });
  }, [API, id, navigateTo]);

  if (!isAuthorized) {
    return <Navigate to="/login" />;
  }

  return (
    <section className="job-details-page page">
      <div className="container">
        <div className="job-details-card">
          <div className="job-details-top">
            <div>
              <span className="job-category">
                {job.category}
              </span>

              <h1>{job.title}</h1>

              <div className="job-detail-meta">
                <span>
                  <FaLocationDot />
                  {job.city}, {job.country}
                </span>

                <span>
                  <FaBriefcase />
                  Full Time
                </span>

                <span>
                  <FaMoneyBillWave />
                  {job.fixedSalary
                    ? `₹${job.fixedSalary}`
                    : `₹${job.salaryFrom} - ₹${job.salaryTo}`}
                </span>
              </div>
            </div>

            {user?.role !== "Employer" && (
              <Link
                to={`/application/${job._id}`}
                className="apply-btn"
              >
                Apply Now
              </Link>
            )}
          </div>

          <div className="job-section">
            <h3>Job Description</h3>

            <p>{job.description}</p>
          </div>

          <div className="job-info-grid">
            <div className="info-card">
              <h4>Location</h4>

              <p>{job.location}</p>
            </div>

            <div className="info-card">
              <h4>Posted On</h4>

              <p>{formatDate(job.jobPostedOn)}</p>
            </div>

            <div className="info-card">
              <h4>Category</h4>

              <p>{job.category}</p>
            </div>

            <div className="info-card">
              <h4>Country</h4>

              <p>{job.country}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobDetails;