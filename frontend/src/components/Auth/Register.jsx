import React, { useContext, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { FaPencilAlt } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";
import {
  validateEmail,
  validatePassword,
  validatePhone,
  validateRequired,
} from "../../utils/validation";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const API = import.meta.env.VITE_API_URL;

  const {
    isAuthorized,
    setIsAuthorized,
    refreshUser,
  } = useContext(Context);

  const handleRegister = async (e) => {
  e.preventDefault();

  if (!validateRequired(role)) {
    return toast.error("Please select your role");
  }

  if (!validateRequired(name)) {
    return toast.error("Name is required");
  }

  if (name.length < 3) {
    return toast.error("Name must be at least 3 characters");
  }

  if (!validateRequired(phone)) {
    return toast.error("Phone number is required");
  }

  if (!validatePhone(phone)) {
    return toast.error("Phone number must be 10 digits");
  }

  if (!validateRequired(email)) {
    return toast.error("Email is required");
  }

  if (!validateEmail(email)) {
    return toast.error("Enter a valid email address");
  }

  if (!validateRequired(password)) {
    return toast.error("Password is required");
  }

  if (!validatePassword(password)) {
    return toast.error("Password must be at least 8 characters");
  }

  try {
    const { data } = await axios.post(
      `${API}/api/v1/user/register`,
      { name, phone, email, role, password },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    toast.success(data.message);

    setName("");
    setEmail("");
    setPassword("");
    setPhone("");
    setRole("");

    await refreshUser();
    setIsAuthorized(true);

  } catch (error) {
    toast.error(error?.response?.data?.message || "Registration failed");
  }
};

  if (isAuthorized) {
    return <Navigate to="/" />;
  }

  return (
    <section className="authPage">
      <div className="banner">
        <div className="banner-content">
          <h1>
            Build your professional future today
          </h1>

          <p>
            Create an account and access thousands
            of job opportunities.
          </p>

          <img
            src="/register.png"
            alt="register"
          />
        </div>
      </div>

      <div className="auth-container">
        <div className="auth-card">
          <div className="header">
            <img src="/JobZeelogo.png" alt="logo" />

            <h3>Create Account</h3>

            <p>
              Join CareerBridge and start applying.
            </p>
          </div>

          <form onSubmit={handleRegister}>
            <div className="inputTag">
              <label>Register As</label>

              <div className="inputWrapper">
                <FaRegUser />

                <select
                  value={role}
                  onChange={(e) =>
                    setRole(e.target.value)
                  }
                >
                  <option value="">
                    Select Role
                  </option>

                  <option value="Employer">
                    Employer
                  </option>

                  <option value="Job Seeker">
                    Job Seeker
                  </option>
                </select>
              </div>
            </div>

            <div className="inputTag">
              <label>Full Name</label>

              <div className="inputWrapper">
                <FaPencilAlt />

                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                />
              </div>
            </div>

            <div className="inputTag">
              <label>Phone Number</label>

              <div className="inputWrapper">
                <FaPhoneFlip />

                <input
                  type="tel"
                  placeholder="Enter phone number"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value)
                  }
                />
              </div>
            </div>

            <div className="inputTag">
              <label>Email Address</label>

              <div className="inputWrapper">
                <MdOutlineMailOutline />

                <input
                  type="email"
                  placeholder="example@gmail.com"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                />
              </div>
            </div>

            <div className="inputTag">
              <label>Password</label>

              <div className="inputWrapper">
                <RiLock2Fill />

                <input
                  type="password"
                  placeholder="Create password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                />
              </div>
            </div>

            <button
              type="submit"
              className="auth-btn"
            >
              Create Account
            </button>

            <Link
              to="/login"
              className="auth-switch"
            >
              Already have an account? Login
            </Link>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;