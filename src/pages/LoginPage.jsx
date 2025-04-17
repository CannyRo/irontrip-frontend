import React from "react";
import { Link } from "react-router";
import { LoginForm } from "../components/LoginForm";

export const LoginPage = () => {
  return (
    <main>
      <div className="glass-container">
        <h2>Login</h2>
        <LoginForm />
        <p>
          New Here ?{" "}
          <Link to="/signup">
            <span className="link-bold">Sign-Up</span>
          </Link>
        </p>
      </div>
    </main>
  );
};
