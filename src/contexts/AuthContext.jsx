import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { logout, verify } from "../services/auth.service";

const AuthContext = createContext();

const AuthContextWrapper = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const nav = useNavigate();
  /* Functions for handling the authentication status (isLoggedIn, isLoading, user) */

  const authenticateUser = async () => {
    console.log("authenticateUser run");
    const tokenFromLocalStorage = localStorage.getItem("authToken");
    if (!tokenFromLocalStorage) {
      setUser(null);
      setIsLoading(false);
      setIsLoggedIn(false);
    } else {
      try {
        const responseFromVerifyRoute = await verify(); // Corrected typo here
        console.log("authenticate user function", responseFromVerifyRoute);
        setUser(responseFromVerifyRoute.data.payload); // Corrected typo here
        setIsLoading(false);
        setIsLoggedIn(true);
      } catch (error) {
        console.log(error);
        setUser(null);
        setIsLoading(false);
        setIsLoggedIn(false);
      }
    }
  };

  useEffect(() => {
    console.log("useEffect run");
    authenticateUser();
  }, []);

  const handleLougoutuser = async () => {
    console.log("Logout run");
    logout();
    await authenticateUser();
    nav("/");
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        authenticateUser,
        handleLougoutuser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContextWrapper, AuthContext };
