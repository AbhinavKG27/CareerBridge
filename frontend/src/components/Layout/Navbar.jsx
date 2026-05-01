import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";
import { LuMoonStar, LuSun } from "react-icons/lu";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const { isAuthorized, setIsAuthorized, setUser, user } = useContext(Context);
  const navigateTo = useNavigate();
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${API}/api/v1/user/logout`, { withCredentials: true });
      toast.success(response.data.message);
      setIsAuthorized(false);
      setUser(null);
      navigateTo("/login");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Logout failed");
      setIsAuthorized(true);
    }
  };

  return (
    <nav className={isAuthorized ? "navbarShow" : "navbarHide"}>
      <div className="container">
        <div className="logo">
          <img src="/JobZee-logos__white.png" alt="CareerBridge logo" />
        </div>
        <ul className={!show ? "menu" : "show-menu menu"}>
          <li>
            <Link to="/" onClick={() => setShow(false)}>
              HOME
            </Link>
          </li>
          <li>
            <Link to="/job/getall" onClick={() => setShow(false)}>
              ALL JOBS
            </Link>
          </li>
          <li>
            <Link to="/applications/me" onClick={() => setShow(false)}>
              {user && user.role === "Employer" ? "APPLICANTS" : "MY APPLICATIONS"}
            </Link>
          </li>
          {user && user.role === "Employer" && (
            <>
              <li>
                <Link to="/job/post" onClick={() => setShow(false)}>
                  POST JOB
                </Link>
              </li>
              <li>
                <Link to="/job/me" onClick={() => setShow(false)}>
                  MY JOBS
                </Link>
              </li>
            </>
          )}
          <button
            className="theme-toggle"
            aria-label="Toggle theme"
            onClick={() => setDarkMode((prev) => !prev)}
          >
            {darkMode ? <LuSun /> : <LuMoonStar />}
          </button>
          <button onClick={handleLogout}>LOGOUT</button>
        </ul>
        <div className="hamburger" aria-label="Open menu">
          <GiHamburgerMenu onClick={() => setShow(!show)} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;