import React, { useContext, useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { Link, Navigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";
import {
  validateEmail,
  validatePassword,
} from "../../utils/validation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const API = import.meta.env.VITE_API_URL;

  const {
    isAuthorized,
    setIsAuthorized,
    refreshUser,
  } = useContext(Context);

  const handleLogin = async (e) => {
  e.preventDefault();

  if (!role) {
    return toast.error(
      "Please select your role"
    );
  }

  if (!email.trim()) {
    return toast.error(
      "Email address is required"
    );
  }

  if (!validateEmail(email)) {
    return toast.error(
      "Please enter a valid email address"
    );
  }

  if (!password.trim()) {
    return toast.error(
      "Password is required"
    );
  }

  if (!validatePassword(password)) {
    return toast.error(
      "Password must contain at least 8 characters"
    );
  }

  try {
    const { data } = await axios.post(
      `${API}/api/v1/user/login`,
      {
        email,
        password,
        role,
      },
      {
        headers: {
          "Content-Type":
            "application/json",
        },
        withCredentials: true,
      }
    );

    toast.success(data.message);

    setEmail("");
    setPassword("");
    setRole("");

    await refreshUser();

    setIsAuthorized(true);
  } catch (error) {
    toast.error(
      error?.response?.data?.message ||
        "Login failed"
    );
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
            Find your dream career with CareerBridge
          </h1>

          <p>
            Connect with companies, apply for jobs,
            and build your professional future.
          </p>

          <img src="/login.png" alt="Login" />
        </div>
      </div>

      <div className="auth-container">
        <div className="auth-card">
          <div className="header">
            <img src="/JobZeelogo.png" alt="logo" />

            <h3>Welcome Back</h3>

            <p>
              Login to continue exploring opportunities.
            </p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="inputTag">
              <label>Login As</label>

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
                  placeholder="Enter your password"
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
              Login
            </button>

            <Link
              to="/register"
              className="auth-switch"
            >
              Don't have an account? Register
            </Link>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;