import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router";

export const ProtectedRoute = ({ children }) => {
  const { isLoading, isLoggedIn } = useContext(AuthContext);
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return <div>{children}</div>;
};