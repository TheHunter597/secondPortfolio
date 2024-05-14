import { useContext, useEffect } from "react";
import "./LoadingPage.scss";
import MainContext from "@/app/context/context";
import { TypeAnimation } from "react-type-animation";
export default function LoadingPage() {
  const {
    loading: { info, showTyped },
    functions: { setShowTyped },
  } = useContext(MainContext);
  useEffect(() => {
    setTimeout(() => {
      setShowTyped(false);
    }, 1000);
  }, []);
  return (
    <div
      className="LoadingPage FirstSectionHeader__Typed"
      key={"the loading page"}
    >
      {!showTyped ? (
        <div className="FirstSectionHeader__Typed">{info}</div>
      ) : (
        <TypeAnimation
          sequence={[
            "Loading planet earth",
            400,
            "Loading the moon",
            400,
            "Generating galaxies",
            400,
            "Welcome :)",
            400,
          ]}
          className="FirstSectionHeader__Typed"
          speed={50}
        />
      )}
    </div>
  );
}
