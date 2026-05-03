import React, { useContext } from "react";

import { Context } from "../../main";

import { Link } from "react-router-dom";

import {
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";

import {
  RiInstagramFill,
} from "react-icons/ri";

const Footer = () => {
  const { isAuthorized } =
    useContext(Context);

  return (
    <footer
      className={
        isAuthorized
          ? "footerShow"
          : "footerHide"
      }
    >
      <div className="container footer-container">
        <div className="footer-left">
          <h3>CareerBridge</h3>

          <p>
            Connecting talent with
            opportunities worldwide.
          </p>
        </div>

        <div className="footer-right">
          <div className="socials">
            <Link to={"#"}>
              <FaLinkedin />
            </Link>

            <Link to={"#"}>
              <RiInstagramFill />
            </Link>

            <Link to={"#"}>
              <FaGithub />
            </Link>
          </div>

          <span>
            © 2026 CareerBridge. All
            rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;