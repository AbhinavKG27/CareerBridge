import axios from "axios";

import React, {
  useContext,
  useState,
} from "react";

import toast from "react-hot-toast";

import {
  Navigate,
  useNavigate,
  useParams,
} from "react-router-dom";

import { Context } from "../../main";

const Application = () => {
  const [name, setName] = useState("");

  const [email, setEmail] =
    useState("");

  const [coverLetter, setCoverLetter] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [address, setAddress] =
    useState("");

  const API = import.meta.env.VITE_API_URL;

  const { isAuthorized, user } =
    useContext(Context);

  const navigateTo = useNavigate();

  const { id } = useParams();

  const handleApplication = async (
    e
  ) => {
    e.preventDefault();

    const formData = {
      name,
      email,
      phone,
      address,
      coverLetter,
      jobId: id,
    };

    try {
      const { data } = await axios.post(
        `${API}/api/v1/application/post`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type":
              "application/json",
          },
        }
      );

      toast.success(data.message);

      setName("");
      setEmail("");
      setCoverLetter("");
      setPhone("");
      setAddress("");

      navigateTo("/job/getall");
    } catch (error) {
      toast.error(
        error.response.data.message
      );
    }
  };

  if (
    !isAuthorized ||
    (user && user.role === "Employer")
  ) {
    return <Navigate to="/" />;
  }

  return (
    <section className="application-page page">
      <div className="container">
        <div className="dashboard-header">
          <span className="hero-badge">
            Job Application
          </span>

          <h1>
            Apply For This Opportunity
          </h1>

          <p>
            Showcase your experience and
            tell employers why you're the
            perfect fit for this role.
          </p>
        </div>

        <form
          onSubmit={handleApplication}
          className="application-form"
        >
          <div className="dashboard-card">
            <h3>Personal Information</h3>

            <div className="dashboard-grid">
              <div className="field">
                <label>Full Name</label>

                <input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                />
              </div>

              <div className="field">
                <label>Email Address</label>

                <input
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                />
              </div>

              <div className="field">
                <label>Phone Number</label>

                <input
                  type="tel"
                  placeholder="+91 9876543210"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value)
                  }
                />
              </div>

              <div className="field">
                <label>Address</label>

                <input
                  type="text"
                  placeholder="Bengaluru, India"
                  value={address}
                  onChange={(e) =>
                    setAddress(
                      e.target.value
                    )
                  }
                />
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <h3>Cover Letter</h3>

            <div className="field">
              <label>
                Tell the employer about
                yourself
              </label>

              <textarea
                rows={10}
                placeholder="Write a professional cover letter..."
                value={coverLetter}
                onChange={(e) =>
                  setCoverLetter(
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
            Submit Application
          </button>
        </form>
      </div>
    </section>
  );
};

export default Application;