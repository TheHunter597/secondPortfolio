import { Color } from "three";
import Geometries from "./components/Geometries";
import { useContext } from "react";
import MainContext from "@/app/context/context";
import GalaxyGenerator from "../../FirstSection/firstSectionCanvas/components/GalaxyGenerator";

declare module "three" {
  interface Material {
    color?: string | Color;
  }
}
export default function SecondSectionCanvas() {
  const {
    modifiers: { canvasYModifier },
  } = useContext(MainContext);
  const isPhoneView = useContext(MainContext).modifiers.isPhoneView;
  return (
    <group
      position={[
        isPhoneView ? 0 : 4,
        isPhoneView ? -11 : -(canvasYModifier * 1),
        isPhoneView ? -14 : -10,
      ]}
    >
      <Geometries />
      <group position={[-40, -20, -40]}>
        <GalaxyGenerator spiral={0.6} branches={7} />
      </group>
    </group>
  );
}
