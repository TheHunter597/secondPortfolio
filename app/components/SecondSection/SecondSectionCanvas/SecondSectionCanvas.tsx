import { Color } from "three";
import Geometries from "./components/Geometries";

declare module "three" {
  interface Material {
    color?: string | Color;
  }
}
export default function SecondSectionCanvas() {
  return (
    <group position={[4, -9, -10]}>
      <Geometries />
    </group>
  );
}
