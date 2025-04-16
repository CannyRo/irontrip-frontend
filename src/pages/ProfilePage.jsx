import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { getUserById, updateUserById } from "../services/user.service.js";

export const ProfilePage = () => {
  const { isLoggedIn, user } = useContext(AuthContext);
  const [userData, setUserData] = useState();
  const [bio, setBio] = useState(""); // State for the bio input
  const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode

  useEffect(() => {
    console.log("user ==> ", user);

    async function getUser() {
      try {
        if (isLoggedIn && user) {
          const userDataFromBackEnd = await getUserById(user.id);
          console.log("User detail : ", userDataFromBackEnd);
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
        console.log("userData:", userData); // Debug userData
        console.log("userData.id:", userData._id); // Debug userData.id

        const updatedUser = await updateUserById(user.id, { bio }); // Call the API to update bio
        setUserData(updatedUser.data); // Update the user data with the new bio
        setIsEditing(false); // Exit edit mode
      }
    } catch (error) {
      console.log("Error updating bio:", error);
    }
  };

  return (
    <main className="profile-page-container">
      {userData ? (
        <div className="profile-card">
          <img
            src={userData.profilePicture || "/default-profile.png"} // Fallback to a default image
            alt={`${userData.name}'s profile`}
            className="profile-picture"
          />
          <h1>User: {userData.username}</h1>
          <p>
            <strong>City:</strong> {userData.city || "Not specified."}
          </p>
          <p>
            <strong>Country:</strong> {userData.country || "Not specified."}
          </p>
          <div className="bio-section">
            <strong>Bio:</strong>
            {isEditing ? (
              <div>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="bio-input"
                />
                <button onClick={handleBioUpdate} className="save-button">
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="cancel-button"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <p>
                {userData.bio || "You can enter your Bio here"}{" "}
                <button
                  onClick={() => setIsEditing(true)}
                  className="edit-button"
                >
                  Edit
                </button>
              </p>
            )}
          </div>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </main>
  );
};
