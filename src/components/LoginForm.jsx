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
    <form onSubmit={handleLogin}>
      <label>
        Email:
        <input
          type="email"
          placeholder="enter an email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          placeholder="enter the password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </label>
      <button type="submit">Login</button>
    </form>
  );
};
