import { useContext, useEffect } from "react";
import "./LoadingPage.scss";
import MainContext from "@/app/context/context";
import { TypeAnimation } from "react-type-animation";

export default function LoadingPage() {
  const {
    functions: { setShowTyped },
  } = useContext(MainContext);
  useEffect(() => {
    setTimeout(() => {
      setShowTyped(false);
    }, 5300);
  }, []);
  return (
    <TypeAnimation
      sequence={[
        "Loading planet earth",
        480,
        "Loading the moon",
        480,
        "Generating galaxies",
        480,
        "Welcome :)",
        480,
      ]}
      className="FirstSectionHeader__Typed"
      speed={70}
    />
  );
}
