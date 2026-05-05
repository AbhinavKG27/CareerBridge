import React, { useContext } from "react";

import { Context } from "../../main";

import { Link } from "react-router-dom";

import {
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";
import { RiMailFill } from "react-icons/ri";

const Footer = () => {
  const { isAuthorized } =
    useContext(Context);

  return (
    <footer
      className={
        isAuthorized
          ? "footer footerShow"
          : "footer footerHide"
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

  {/* LinkedIn */}
  <a
    href="https://www.linkedin.com/in/abhinavkg2004"
    target="_blank"
    rel="noopener noreferrer"
  >
    <FaLinkedin />
  </a>

  {/* Email */}
  <a href="mailto:abhinavkg2004@gmail.com">
    <RiMailFill />
  </a>

  {/* GitHub */}
  <a
    href="https://github.com/AbhinavKG27"
    target="_blank"
    rel="noopener noreferrer"
  >
    <FaGithub />
  </a>

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