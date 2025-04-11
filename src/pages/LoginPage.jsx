import React from 'react'
import { Link } from "react-router";
import { LoginForm } from '../components/LoginForm';

export const LoginPage = () => {
  return (
    <main>
      <h2>LoginPage</h2>
      <LoginForm />
      <p>
        New Here... <Link to="/signup">Sign Up</Link>
      </p>
    </main>
  );
}
