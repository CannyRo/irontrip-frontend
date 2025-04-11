import React from "react";
import { Link } from "react-router";
import { SignupFom } from "../components/SignupFom";

export const SignupPage = () => {
  return (
    <main>
      <h2>SignupPage</h2>
      <SignupFom />
      <p>
        Already a member... <Link to="/login">Login</Link>
      </p>
    </main>
  );
};
