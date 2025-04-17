import "./Header.css";
import { Link } from "react-router";
import { Navbar } from "./Navbar";

export const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-container">
          <Link to="/">
            <h1 className="logo-text">IRONTRIP</h1>
          </Link>
        </div>
        <Navbar />
      </div>
    </header>
  );
};
