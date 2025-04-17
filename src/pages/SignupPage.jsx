import React from "react";
import { Link } from "react-router";
import { SignupFom } from "../components/SignupFom";

export const SignupPage = () => {
  return (
    <main>
      <div className="glass-container">
        <h2>Sign-Up</h2>
        <SignupFom />
        <p>
          Already a member ?{" "}
          <Link to="/login">
            <span className="link-bold">Login</span>
          </Link>
        </p>
      </div>
    </main>
  );
};
