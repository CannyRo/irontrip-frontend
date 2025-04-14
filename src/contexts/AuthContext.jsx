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
    console.log("authenticateUser run");
    const tokenFromLocalStorage = localStorage.getItem("authToken");
    if (!tokenFromLocalStorage) {
      setUser(null);
      setIsLoading(false);
      setIsLoggedIn(false);
    } else {
      try {
        const repsonseFromVerifyRoute = await verify();
        console.log("authenticate user function", repsonseFromVerifyRoute);
        setUser(repsonseFromVerifyRoute.data.payload);
        setIsLoading(false);
        setIsLoggedIn(true);
        const userDetail = await getUserById(repsonseFromVerifyRoute.data.payload.id);
        console.log("=== userDetail === ", userDetail);
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
