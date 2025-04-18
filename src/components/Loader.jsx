import Lottie from "lottie-react";
import animationData from "../assets/Animation.json"

export const Loader = () => {
  return (
    <div style={{ width: 300, height: 300 }}>
      <Lottie
      animationData={animationData}
      autoplay
      loop={true}
    />
    </div>
  )
}
