import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { LuMoonStar, LuSun } from "react-icons/lu";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const { isAuthorized, setIsAuthorized, setUser, user } =
    useContext(Context);

  const navigateTo = useNavigate();
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
  if (darkMode) {
    document.body.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.body.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
}, [darkMode]);

  const closeMenu = () => setShow(false);

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        `${API}/api/v1/user/logout`,
        {
          withCredentials: true,
        }
      );

      toast.success(response.data.message);

      setIsAuthorized(false);
      setUser(null);

      navigateTo("/login");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Logout failed"
      );

      setIsAuthorized(true);
    }
  };

  return (
    <nav className={isAuthorized ? "navbarShow" : "navbarHide"}>
      <div className="container navbar-container">
        <Link to="/" className="logo" onClick={closeMenu}>
          <img
            src="/JobZee-logos__white.png"
            alt="CareerBridge logo"
          />
        </Link>

        <ul className={show ? "menu show-menu" : "menu"}>
          <li>
            <Link to="/" onClick={closeMenu}>
              Home
            </Link>
          </li>

          <li>
            <Link to="/job/getall" onClick={closeMenu}>
              Jobs
            </Link>
          </li>

          <li>
            <Link
              to="/applications/me"
              onClick={closeMenu}
            >
              {user?.role === "Employer"
                ? "Applicants"
                : "My Applications"}
            </Link>
          </li>

          {user?.role === "Employer" && (
            <>
              <li>
                <Link to="/job/post" onClick={closeMenu}>
                  Post Job
                </Link>
              </li>

              <li>
                <Link to="/job/me" onClick={closeMenu}>
                  My Jobs
                </Link>
              </li>
            </>
          )}

          <li>
            <button
              className="theme-toggle"
              aria-label="Toggle theme"
              onClick={() =>
                setDarkMode((prev) => !prev)
              }
            >
              {darkMode ? <LuSun /> : <LuMoonStar />}
            </button>
          </li>

          <li>
            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        </ul>

        <button
          className="hamburger"
          onClick={() => setShow((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {show ? <IoClose /> : <GiHamburgerMenu />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;