import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { getUserById, updateUserById } from "../services/user.service.js";

export const ProfilePage = () => {
  const { isLoggedIn, user } = useContext(AuthContext);
  const [userData, setUserData] = useState();
  const [bio, setBio] = useState(""); // State for the bio input
  const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode

  useEffect(() => {
    async function getUser() {
      try {
        if (isLoggedIn && user) {
          const userDataFromBackEnd = await getUserById(user.id);
          setUserData(userDataFromBackEnd.data);
          setBio(userDataFromBackEnd.data.bio || "");
        }
      } catch (error) {
        console.log(error);
      }
    }
    getUser();
  }, [isLoggedIn, user]);

  const handleBioUpdate = async () => {
    try {
      if (userData) {
        const updatedUser = await updateUserById(user.id, { bio }); // Call the API to update bio
        setUserData(updatedUser.data); // Update the user data with the new bio
        setIsEditing(false); // Exit edit mode
      }
    } catch (error) {
      console.log("Error updating bio:", error);
    }
  };

  return (
    <main>
      <div className="home-container">
        {userData ? (
          <div className="profile-card"><img
                src={userData.profilePicture || "/default-profile.png"} // Fallback to a default image
                alt={`${userData.name}'s profile`}
                className="profile-picture"
              />
            <div className="profil-datas">
              <div className="profile-info">
                <h1>{userData.username.toUpperCase()}</h1>
                <p>{userData.city || "City : Not specified."}</p>
                <p>{userData.country || "Country : Not specified."}</p>
              </div>
              <div className="bio-section">
              <h3>Bio:</h3>
              {isEditing ? (
                <div>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="bio-input"
                    rows={5}
                  />
                  <button onClick={handleBioUpdate} className="btn-form">
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="btn-form"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div>
                  <p>{userData.bio || "You can enter your Bio here..."} </p>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="btn-form"
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
            </div>
            
          </div>
        ) : (
          <p>Loading profile...</p>
        )}
      </div>
    </main>
  );
};
