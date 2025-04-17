import { useContext, useState } from "react";
import { login } from "../services/auth.service";
import { useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const nav = useNavigate();
  const { authenticateUser } = useContext(AuthContext);

  async function handleLogin(e) {
    e.preventDefault();
    const formattedData = {
      email: email,
      password: password,
    };
    try {
      const response = await login(formattedData);
      console.log("User logged with success. ", response);
      localStorage.setItem("authToken", response.data.authToken);
      await authenticateUser();
      nav("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={handleLogin} className="form-container">
      <input
        type="email"
        placeholder="Email (ex: john@doe.com)"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />

      <input
        type="password"
        placeholder="Password (ex: pizza)"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button type="submit" className="btn-form">
        Login
      </button>
    </form>
  );
};
