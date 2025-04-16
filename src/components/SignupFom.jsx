import { useState } from "react";
import { signup } from "../services/auth.service";
import { useNavigate } from "react-router";


export const SignupFom = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState(null);

  const nav = useNavigate();

  async function handleSignup(e) {
    e.preventDefault();
    setError(null); // Reset error state

    // Basic validation
    if (!username || !email || !password || !city || !country) {
      setError("All fields are required.");
      return;
    }
    let formToSend;

    if (imageFile) {
      // We use FormData if an image is uploaded
      formToSend = new FormData();
      formToSend.append("username", username);
      formToSend.append("email", email);
      formToSend.append("password", password);
      formToSend.append("city", city);
      formToSend.append("country", country);
      formToSend.append("profilePicture", imageFile); // le nom doit correspondre au backend
    } else {
      // if noone image is uploaded we just use the imageUrl
      formToSend = {
        username,
        email,
        password,
        city,
        country,
        profilePicture: imageUrl || ""
      };
    }

    try {
        const createdUser = await signup(formToSend);
        console.log("User created with success. ", createdUser);
        nav("/login");
    } catch(error) {
        console.log(error);
        setError("Failed to create user. Please check your connection or try again.");
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <label>
        Username:
        <input
          type="text"
          placeholder="enter a username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
      </label>
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
      <label>
        City:
        <input
          type="text"
          placeholder="enter a city"
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />
      </label>
      <label>
        Country:
        <input
          type="text"
          placeholder="enter a country"
          value={country}
          onChange={(e) => {
            setCountry(e.target.value);
          }}
        />
      </label>
      <label>
        Profile image URL:
        <input
          type="text"
          placeholder="https://..."
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </label>
      <label>
        Or upload profile image:
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
        />
      </label>
      <button type="submit">Signup</button>
    </form>
  );
};
