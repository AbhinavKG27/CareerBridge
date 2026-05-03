import axios from "axios";

import React, {
  useContext,
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

import {
  FaCheck,
} from "react-icons/fa6";

import {
  RxCross2,
} from "react-icons/rx";

import { Context } from "../../main";

import {
  Navigate,
} from "react-router-dom";

const MyJobs = () => {
  const [myJobs, setMyJobs] = useState([]);

  const [editingMode, setEditingMode] =
    useState(null);

  const { isAuthorized, user } =
    useContext(Context);

  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } =
          await axios.get(
            `${API}/api/v1/job/getmyjobs`,
            {
              withCredentials: true,
            }
          );

        setMyJobs(data.myJobs);
      } catch (error) {
        toast.error(
          error.response.data.message
        );

        setMyJobs([]);
      }
    };

    fetchJobs();
  }, []);

  if (
    !isAuthorized ||
    (user && user.role !== "Employer")
  ) {
    return <Navigate to="/" />;
  }

  const handleEnableEdit = (jobId) => {
    setEditingMode(jobId);
  };

  const handleDisableEdit = () => {
    setEditingMode(null);
  };

  const handleUpdateJob = async (
    jobId
  ) => {
    const updatedJob = myJobs.find(
      (job) => job._id === jobId
    );

    await axios
      .put(
        `${API}/api/v1/job/update/${jobId}`,
        updatedJob,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        toast.success(res.data.message);

        setEditingMode(null);
      })
      .catch((error) => {
        toast.error(
          error.response.data.message
        );
      });
  };

  const handleDeleteJob = async (
    jobId
  ) => {
    await axios
      .delete(
        `${API}/api/v1/job/delete/${jobId}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        toast.success(res.data.message);

        setMyJobs((prevJobs) =>
          prevJobs.filter(
            (job) => job._id !== jobId
          )
        );
      })
      .catch((error) => {
        toast.error(
          error.response.data.message
        );
      });
  };

  const handleInputChange = (
    jobId,
    field,
    value
  ) => {
    setMyJobs((prevJobs) =>
      prevJobs.map((job) =>
        job._id === jobId
          ? {
              ...job,
              [field]: value,
            }
          : job
      )
    );
  };

  return (
    <section className="my-jobs-page page">
      <div className="container">
        <div className="dashboard-header">
          <span className="hero-badge">
            Employer Dashboard
          </span>

          <h1>Manage Your Job Listings</h1>

          <p>
            Edit, update, and manage all
            active job opportunities from one
            place.
          </p>
        </div>

        {myJobs.length > 0 ? (
          <div className="my-jobs-grid">
            {myJobs.map((job) => (
              <div
                className="dashboard-card"
                key={job._id}
              >
                <div className="dashboard-top">
                  <span className="job-category">
                    {job.category}
                  </span>

                  <div className="dashboard-actions">
                    {editingMode ===
                    job._id ? (
                      <>
                        <button
                          onClick={() =>
                            handleUpdateJob(
                              job._id
                            )
                          }
                          className="icon-btn success-btn"
                        >
                          <FaCheck />
                        </button>

                        <button
                          onClick={
                            handleDisableEdit
                          }
                          className="icon-btn danger-btn"
                        >
                          <RxCross2 />
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() =>
                          handleEnableEdit(
                            job._id
                          )
                        }
                        className="edit-job-btn"
                      >
                        Edit
                      </button>
                    )}
                  </div>
                </div>

                <div className="dashboard-grid">
                  <div className="field">
                    <label>Job Title</label>

                    <input
                      type="text"
                      disabled={
                        editingMode !==
                        job._id
                      }
                      value={job.title}
                      onChange={(e) =>
                        handleInputChange(
                          job._id,
                          "title",
                          e.target.value
                        )
                      }
                    />
                  </div>

                  <div className="field">
                    <label>Country</label>

                    <input
                      type="text"
                      disabled={
                        editingMode !==
                        job._id
                      }
                      value={job.country}
                      onChange={(e) =>
                        handleInputChange(
                          job._id,
                          "country",
                          e.target.value
                        )
                      }
                    />
                  </div>

                  <div className="field">
                    <label>City</label>

                    <input
                      type="text"
                      disabled={
                        editingMode !==
                        job._id
                      }
                      value={job.city}
                      onChange={(e) =>
                        handleInputChange(
                          job._id,
                          "city",
                          e.target.value
                        )
                      }
                    />
                  </div>

                  <div className="field">
                    <label>Category</label>

                    <select
                      disabled={
                        editingMode !==
                        job._id
                      }
                      value={job.category}
                      onChange={(e) =>
                        handleInputChange(
                          job._id,
                          "category",
                          e.target.value
                        )
                      }
                    >
                      <option value="Graphics & Design">
                        Graphics & Design
                      </option>

                      <option value="Mobile App Development">
                        Mobile App Development
                      </option>

                      <option value="Frontend Web Development">
                        Frontend Development
                      </option>

                      <option value="MERN Stack Development">
                        MERN Stack
                      </option>
                    </select>
                  </div>
                </div>

                <div className="dashboard-grid">
                  <div className="field">
                    <label>
                      Salary
                    </label>

                    {job.fixedSalary ? (
                      <input
                        type="number"
                        disabled={
                          editingMode !==
                          job._id
                        }
                        value={
                          job.fixedSalary
                        }
                        onChange={(e) =>
                          handleInputChange(
                            job._id,
                            "fixedSalary",
                            e.target.value
                          )
                        }
                      />
                    ) : (
                      <div className="dashboard-grid">
                        <input
                          type="number"
                          disabled={
                            editingMode !==
                            job._id
                          }
                          value={
                            job.salaryFrom
                          }
                          onChange={(e) =>
                            handleInputChange(
                              job._id,
                              "salaryFrom",
                              e.target.value
                            )
                          }
                        />

                        <input
                          type="number"
                          disabled={
                            editingMode !==
                            job._id
                          }
                          value={
                            job.salaryTo
                          }
                          onChange={(e) =>
                            handleInputChange(
                              job._id,
                              "salaryTo",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    )}
                  </div>

                  <div className="field">
                    <label>Expired</label>

                    <select
                      disabled={
                        editingMode !==
                        job._id
                      }
                      value={job.expired}
                      onChange={(e) =>
                        handleInputChange(
                          job._id,
                          "expired",
                          e.target.value
                        )
                      }
                    >
                      <option value={true}>
                        TRUE
                      </option>

                      <option value={false}>
                        FALSE
                      </option>
                    </select>
                  </div>
                </div>

                <div className="field">
                  <label>Description</label>

                  <textarea
                    rows={5}
                    disabled={
                      editingMode !==
                      job._id
                    }
                    value={job.description}
                    onChange={(e) =>
                      handleInputChange(
                        job._id,
                        "description",
                        e.target.value
                      )
                    }
                  />
                </div>

                <div className="field">
                  <label>Location</label>

                  <textarea
                    rows={3}
                    disabled={
                      editingMode !==
                      job._id
                    }
                    value={job.location}
                    onChange={(e) =>
                      handleInputChange(
                        job._id,
                        "location",
                        e.target.value
                      )
                    }
                  />
                </div>

                <button
                  onClick={() =>
                    handleDeleteJob(job._id)
                  }
                  className="delete-job-btn"
                >
                  Delete Job
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h3>No Jobs Posted Yet</h3>

            <p>
              Start publishing opportunities
              to attract talented candidates.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyJobs;