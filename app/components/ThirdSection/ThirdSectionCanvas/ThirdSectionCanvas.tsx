import { useContext } from "react";
import MainText from "./components/MainText";
import MainContext from "@/app/context/context";

export default function ThirdSectionCanvas() {
  const {
    modifiers: { canvasYModifier },
  } = useContext(MainContext);
  return (
    <group position={[5, -(canvasYModifier * 2) - 2, -7]}>
      <MainText />
    </group>
  );
}
