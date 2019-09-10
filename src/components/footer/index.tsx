import React from "react";
import { Icon, IconButton } from "@material-ui/core";
import "./footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="App-footer">
      <p className="footer-author">
        created by:
        <a href="https://alvarojimenezmartin.com" target="_blank">
          Alvaro Jimenez Martin
        </a>
      </p>
      <IconButton
        aria-label="open"
        onClick={() =>
          window.open("https://github.com/ajimenezdev/react-eth-test", "_blank")
        }
      >
        <div className="footer-sourceContainer">
          <Icon className="footer-sourceIcon">code</Icon>
          <span className="footer-sourceText">Source Code</span>
        </div>
      </IconButton>
    </footer>
  );
};

export default Footer;
