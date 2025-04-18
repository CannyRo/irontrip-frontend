import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { logout, verify } from "../services/auth.service";
import { getUserById } from "../services/user.service";

const AuthContext = createContext();

const AuthContextWrapper = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userDetail, setUserDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const nav = useNavigate();
  /* Functions for handling the authentication status (isLoggedIn, isLoading, user) */

  const authenticateUser = async () => {
    const tokenFromLocalStorage = localStorage.getItem("authToken");
    if (!tokenFromLocalStorage) {
      setUser(null);
      setIsLoading(false);
      setIsLoggedIn(false);
    } else {
      try {
        const responseFromVerifyRoute = await verify(); // Corrected typo here
        setUser(responseFromVerifyRoute.data.payload); // Corrected typo here
        setIsLoading(false);
        setIsLoggedIn(true);
        const userDetail = await getUserById(responseFromVerifyRoute.data.payload.id);
        setUserDetail(userDetail.data);
      } catch (error) {
        console.log(error);
        setUser(null);
        setUserDetail(null);
        setIsLoading(false);
        setIsLoggedIn(false);
      }
    }
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  const handleLougoutuser = async () => {
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
        userDetail,
        authenticateUser,
        handleLougoutuser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContextWrapper, AuthContext };
