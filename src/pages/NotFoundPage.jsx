import Lottie from "lottie-react";
import animationData from "../assets/AnimationNotFound.json";
import { Link } from "react-router";

export const NotFoundPage = () => {
  return (
    <main>
      <div style={{ width: 300, height: 300 }}>
        <Lottie animationData={animationData} autoplay loop={true} />
      </div>
      <h1 style={{fontSize: "2rem"}}>Page Not Found</h1>
      <p style={{marginBottom: "2rem"}}>Ooops 🤭</p>
      <Link to="/" style={{color: "var(--primary-color-ligth)"}}>Back to Home </Link>
    </main>
  );
};
