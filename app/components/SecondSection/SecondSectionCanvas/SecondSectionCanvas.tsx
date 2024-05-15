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
  return (
    <group position={[4, -(canvasYModifier * 1), -10]}>
      <Geometries />
      <group position={[-40, -20, -40]}>
        <GalaxyGenerator spiral={0.6} branches={7} />
      </group>
    </group>
  );
}
