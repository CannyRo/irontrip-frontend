import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { getUserById } from "../services/user.service.js";

export const ProfilePage = () => {
  const { isLoggedIn, user } = useContext(AuthContext);
  const [userData, setUserData] = useState();

  useEffect(() => {
      console.log("user ==> ", user);
      async function getUser() {
        try {
          if (isLoggedIn && user) {
            const userDataFromBackEnd = await getUserById(user.id);
            console.log("User detail : ", userDataFromBackEnd);
            setUserData(userDataFromBackEnd.data);
          }
        } catch (error) {
          console.log(error);
        }
      }
      getUser();
    }, [isLoggedIn, user]);
  return (
    <main>ProfilePage</main>
  )
}
