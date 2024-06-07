import { useContext } from "react";
import MainText from "./components/MainText";
import MainContext from "@/app/context/context";

export default function ThirdSectionCanvas() {
  const {
    modifiers: { canvasYModifier },
  } = useContext(MainContext);
  const isPhoneView = useContext(MainContext).modifiers.isPhoneView;

  return (
    <group
      position={[
        5,
        isPhoneView ? -15.5 : -(canvasYModifier * 2) - 1,
        isPhoneView ? -11 : -7,
      ]}
    >
      <MainText />
    </group>
  );
}
