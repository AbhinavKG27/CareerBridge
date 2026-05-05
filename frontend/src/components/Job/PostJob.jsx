import React, {
  useContext,
  useState,
} from "react";

import axios from "axios";

import toast from "react-hot-toast";

import {
  Navigate,
  useNavigate,
} from "react-router-dom";

import { Context } from "../../main";

const PostJob = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [country, setCountry] =
    useState("");

  const [city, setCity] = useState("");

  const [location, setLocation] =
    useState("");

  const [salaryFrom, setSalaryFrom] =
    useState("");

  const [salaryTo, setSalaryTo] =
    useState("");

  const [fixedSalary, setFixedSalary] =
    useState("");

  const [salaryType, setSalaryType] =
    useState("default");

  // ✅ NEW STATE (ADDED ONLY)
  const [companyName, setCompanyName] = useState("");

  const API = import.meta.env.VITE_API_URL;

  const { isAuthorized, user } =
    useContext(Context);

  const navigateTo = useNavigate();

  const handleJobPost = async (e) => {
    e.preventDefault();

    // ✅ BASIC VALIDATION (ADDED, NON-BREAKING)
    if (!companyName) {
      return toast.error("Company name is required");
    }

    try {
      const payload =
        salaryType === "Fixed Salary"
          ? {
              title,
              description,
              category,
              country,
              city,
              location,
              companyName, // ✅ ADDED
              fixedSalary,
            }
          : {
              title,
              description,
              category,
              country,
              city,
              location,
              companyName, // ✅ ADDED
              salaryFrom,
              salaryTo,
            };

      const { data } = await axios.post(
        `${API}/api/v1/job/post`,
        payload,
        {
          withCredentials: true,
          headers: {
            "Content-Type":
              "application/json",
          },
        }
      );

      toast.success(data.message);

      navigateTo("/job/me");
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          "Failed to post job"
      );
    }
  };

  if (
    !isAuthorized ||
    (user && user.role !== "Employer")
  ) {
    return <Navigate to="/" />;
  }

  return (
    <section className="post-job-page page">
      <div className="container">
        <div className="dashboard-header">
          <span className="hero-badge">
            Employer Dashboard
          </span>

          <h1>Create a New Job Listing</h1>

          <p>
            Publish opportunities and connect
            with talented professionals around
            the world.
          </p>
        </div>

        <form
          onSubmit={handleJobPost}
          className="post-job-form"
        >
          <div className="dashboard-card">
            <h3>Basic Information</h3>

            <div className="dashboard-grid">

              {/* ✅ NEW FIELD (ADDED ONLY) */}
              <div className="field">
                <label>Company Name</label>
                <input
                  type="text"
                  placeholder="Google, Microsoft..."
                  value={companyName}
                  onChange={(e) =>
                    setCompanyName(e.target.value)
                  }
                />
              </div>

              <div className="field">
                <label>Job Title</label>

                <input
                  type="text"
                  placeholder="Senior Frontend Developer"
                  value={title}
                  onChange={(e) =>
                    setTitle(e.target.value)
                  }
                />
              </div>

              <div className="field">
                <label>Category</label>

                <select
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value)
                  }
                >
                  <option value="">
                    Select Category
                  </option>

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

                  <option value="Account & Finance">
                    Finance
                  </option>

                  <option value="Artificial Intelligence">
                    Artificial Intelligence
                  </option>

                  <option value="Video Animation">
                    Video Animation
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <h3>Location</h3>

            <div className="dashboard-grid location-grid">
  <div className="field">
    <label>Country</label>
    <input
      type="text"
      value={country}
      onChange={(e) => setCountry(e.target.value)}
    />
  </div>

  <div className="field">
    <label>City</label>
    <input
      type="text"
      value={city}
      onChange={(e) => setCity(e.target.value)}
    />
  </div>

  {/* ✅ FULL WIDTH FIELD */}
  <div className="field full-width">
    <label>Office Location</label>
    <input
      type="text"
      value={location}
      onChange={(e) => setLocation(e.target.value)}
      placeholder="Street, Area, Landmark..."
    />
  </div>
</div>
          </div>

          <div className="dashboard-card">
            <h3>Salary Information</h3>

            <div className="field">
              <label>Salary Type</label>

              <select
                value={salaryType}
                onChange={(e) =>
                  setSalaryType(e.target.value)
                }
              >
                <option value="default">
                  Select Salary Type
                </option>

                <option value="Fixed Salary">
                  Fixed Salary
                </option>

                <option value="Ranged Salary">
                  Ranged Salary
                </option>
              </select>
            </div>

            {salaryType ===
              "Fixed Salary" && (
              <div className="field">
                <label>Fixed Salary</label>

                <input
                  type="number"
                  placeholder="50000"
                  value={fixedSalary}
                  onChange={(e) =>
                    setFixedSalary(
                      e.target.value
                    )
                  }
                />
              </div>
            )}

            {salaryType ===
              "Ranged Salary" && (
              <div className="dashboard-grid">
                <div className="field">
                  <label>Salary From</label>

                  <input
                    type="number"
                    placeholder="40000"
                    value={salaryFrom}
                    onChange={(e) =>
                      setSalaryFrom(
                        e.target.value
                      )
                    }
                  />
                </div>

                <div className="field">
                  <label>Salary To</label>

                  <input
                    type="number"
                    placeholder="80000"
                    value={salaryTo}
                    onChange={(e) =>
                      setSalaryTo(
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>
            )}
          </div>

          <div className="dashboard-card">
            <h3>Job Description</h3>

            <div className="field">
              <label>Description</label>

              <textarea
                rows="8"
                placeholder="Describe responsibilities, requirements, expectations..."
                value={description}
                onChange={(e) =>
                  setDescription(
                    e.target.value
                  )
                }
              />
            </div>
          </div>

          <button
            type="submit"
            className="dashboard-submit-btn"
          >
            Publish Job
          </button>
        </form>
      </div>
    </section>
  );
};

export default PostJob;