import React from "react";
import "../App.css"; // Ensure this file contains the footer styles

const Footer = () => {
  return (
    <footer className="footer">
      <p>© 2025 IronTrip App. All rights reserved.</p>
      <nav className="footer-links">
        <a
          href="https://github.com/CannyRo/irontrip-frontend"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub Frontend Repository
        </a>
        <a
          href="https://github.com/ecastanedam/irontrip-backend"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub Backend Repository
        </a>
      </nav>
    </footer>
  );
};

export default Footer;