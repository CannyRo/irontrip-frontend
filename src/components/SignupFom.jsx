import "./SignupForm.css";
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
    setError(null);

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
      formToSend.append("profilePicture", imageFile);
    } else {
      // if noone image is uploaded we just use the imageUrl
      formToSend = {
        username,
        email,
        password,
        city,
        country,
        profilePicture: imageUrl || "",
      };
    }

    try {
      const createdUser = await signup(formToSend);
      console.log("User created with success. ", createdUser);
      nav("/login");
    } catch (error) {
      console.log(error);
      setError(
        "Failed to create user. Please check your connection or try again."
      );
    }
  }

  return (
    <form onSubmit={handleSignup} className="form-container">
      <input
        type="text"
        placeholder="Username (ex: John)"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
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

      <input
        type="text"
        placeholder="City (ex: London)"
        value={city}
        onChange={(e) => {
          setCity(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Country (ex: United Kingdom)"
        value={country}
        onChange={(e) => {
          setCountry(e.target.value);
        }}
      />
      <br />
      <label>Paste your profile image URL :</label>
      <input
        type="text"
        placeholder="https://..."
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />

      <p>OR</p>
      <label>Upload your profile image:</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files[0])}
      />

      <button type="submit" className="btn-form">
        Sign-up
      </button>
    </form>
  );
};
