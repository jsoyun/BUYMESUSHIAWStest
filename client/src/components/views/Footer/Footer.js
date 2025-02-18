import React from "react";
import "./Footer.css";
import Instagram from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Link from "react-router";

const Footer = () => {
  return (
    <div className="main-footer">
      <div className="container">
        <div className="row">
          {/* column 1*/}
          <div className="col">
            <h4>usEarth</h4>
            <ul className="list-unstyled">
              <li>02-567-1234</li>
              <li>seoul, Korea</li>
              <li>123 Street South North</li>
            </ul>
          </div>
          {/* column 2*/}
          <div className="col">
            <h4>Members</h4>
            <ul className="list-unstyled">
              <li>Site Editor: Kim Hyerin</li>
              <li>Site Editor: Choi Hyunseok</li>
              <li>Site Editor: Lee Seongjae</li>
              <li>Site Editor: Lee Soyun</li>
            </ul>
          </div>
          {/* column 3*/}
          <div className="col">
            <h4>Connect Us</h4>
            <ul className="list-unstyled">
              <Instagram fontSize="large" />
              <TwitterIcon fontSize="large" />
              <FacebookIcon fontSize="large" />
              <GitHubIcon
                fontSize="large"
                color="secondary"
                onClick={() =>
                  window.open(
                    "https://github.com/buymesushi/BUYMESUSHI.git",
                    "_blank"
                  )
                }
              />
              <YouTubeIcon fontSize="large" />
            </ul>
          </div>
        </div>
        <hr />
        <div className="row">
          <br />
          <p className="col-sm">
            &copy;{new Date().getFullYear()} by usEarth, Inc. All rights
            reserved. | Terms Of Service | Privacy
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
