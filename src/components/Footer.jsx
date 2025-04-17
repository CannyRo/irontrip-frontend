import "./Footer.css";
import { Link } from "react-router";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <nav className="footer-links">
          <Link to="/about">About</Link>
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
        <div className="footer-text">
          <p>© 2025 IronTrip App. All rights reserved.</p>
          <div className="footer-text-inspired">
            <p>
            Inspired by{" "}
            <a
              href="https://www.couchsurfing.com/app/membership"
              target="_blank"
              rel="noopener noreferrer"
            >
              Couchsurfing
            </a>
            .
          </p>
          <p>
            Launched by{" "}
            <a
              href="https://www.ironhack.com/fr-en/web-development/remote"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ironhack
            </a>
            .
          </p>
          </div>
          
        </div>
      </div>
    </footer>
  );
};
