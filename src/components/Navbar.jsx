import "./Navbar.css";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router";

export const Navbar = () => {
  const { isLoggedIn, handleLougoutuser } =
    useContext(AuthContext);

  return (
    <nav className="navbar">
      {isLoggedIn && (
        <div className="navbar-menu-connected">
          <Link to="/">
            <button>Home</button>
          </Link>
          <Link to="/create-listing">
            <button>Create Listing</button>
          </Link>
          <Link to="/listings">
            <button>My Listings</button>
          </Link>
          <Link to="/requests">
            <button>My Request</button>
          </Link>
        </div>
      )}
      {isLoggedIn && (
        <div className="login-buttons-connected">
          <Link to="/profile">
            <button>My Profile</button>
          </Link>
          <button onClick={handleLougoutuser} className="link-like">
            Logout
          </button>
        </div>
      )}
      {!isLoggedIn && (
        <>
          <div className="navbar-menu-disconnected">
            <Link to="/">
              <button>Home</button>
            </Link>
          </div>
          <div className="login-buttons-disconnected">
            <Link to="/signup">
              {" "}
              <button>SignUp</button>{" "}
            </Link>
            <Link to="/login">
              {" "}
              <button>Login</button>{" "}
            </Link>
          </div>
        </>
      )}
    </nav>
  );
};
