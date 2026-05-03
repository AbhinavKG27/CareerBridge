import React, {
  useContext,
  useEffect,
  useState,
} from "react";

import axios from "axios";

import toast from "react-hot-toast";

import {
  Navigate,
} from "react-router-dom";

import { Context } from "../../main";

import {
  FaEnvelope,
  FaLocationDot,
  FaPhone,
} from "react-icons/fa6";

const MyApplications = () => {
  const { user, isAuthorized } =
    useContext(Context);

  const [applications, setApplications] =
    useState([]);

  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchApplications =
      async () => {
        try {
          const endpoint =
            user?.role === "Employer"
              ? `${API}/api/v1/application/employer/getall`
              : `${API}/api/v1/application/jobseeker/getall`;

          const res = await axios.get(
            endpoint,
            {
              withCredentials: true,
            }
          );

          setApplications(
            res.data.applications
          );
        } catch (error) {
          toast.error(
            error.response.data.message
          );
        }
      };

    fetchApplications();
  }, [API, user]);

  if (!isAuthorized) {
    return <Navigate to="/login" />;
  }

  const deleteApplication = async (
    id
  ) => {
    try {
      const res = await axios.delete(
        `${API}/api/v1/application/delete/${id}`,
        {
          withCredentials: true,
        }
      );

      toast.success(res.data.message);

      setApplications((prev) =>
        prev.filter(
          (application) =>
            application._id !== id
        )
      );
    } catch (error) {
      toast.error(
        error.response.data.message
      );
    }
  };

  return (
    <section className="applications-page page">
      <div className="container">
        <div className="dashboard-header">
          <span className="hero-badge">
            {user?.role === "Employer"
              ? "Recruitment Dashboard"
              : "Application Dashboard"}
          </span>

          <h1>
            {user?.role === "Employer"
              ? "Candidate Applications"
              : "My Applications"}
          </h1>

          <p>
            {user?.role === "Employer"
              ? "Review and manage incoming candidate applications."
              : "Track and manage all your submitted job applications."}
          </p>
        </div>

        {applications.length <= 0 ? (
          <div className="empty-state">
            <h3>
              No Applications Found
            </h3>

            <p>
              Applications will appear here
              once available.
            </p>
          </div>
        ) : (
          <div className="applications-grid">
            {applications.map(
              (application) => (
                <div
                  className="application-card"
                  key={
                    application._id
                  }
                >
                  <div className="application-top">
                    <div className="candidate-avatar">
                      {application.name?.charAt(
                        0
                      )}
                    </div>

                    <div>
                      <h3>
                        {
                          application.name
                        }
                      </h3>

                      <p>
                        Candidate
                      </p>
                    </div>
                  </div>

                  <div className="application-info">
                    <span>
                      <FaEnvelope />
                      {
                        application.email
                      }
                    </span>

                    <span>
                      <FaPhone />
                      {
                        application.phone
                      }
                    </span>

                    <span>
                      <FaLocationDot />
                      {
                        application.address
                      }
                    </span>
                  </div>

                  <div className="cover-letter-box">
                    <h4>
                      Cover Letter
                    </h4>

                    <p>
                      {
                        application.coverLetter
                      }
                    </p>
                  </div>

                  {user?.role ===
                    "Job Seeker" && (
                    <button
                      className="delete-application-btn"
                      onClick={() =>
                        deleteApplication(
                          application._id
                        )
                      }
                    >
                      Delete Application
                    </button>
                  )}
                </div>
              )
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default MyApplications;