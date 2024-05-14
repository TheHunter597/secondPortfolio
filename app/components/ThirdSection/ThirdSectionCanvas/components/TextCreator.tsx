import { Text3D } from "@react-three/drei";
import { Color } from "three";

interface TextCreatorProps {
  text: string;
  position: [number, number, number];
  color: Color | string | number;
  rotation?: [number, number, number];
}
export default function TextCreator({
  text,
  position: [x, y, z],
  color,
  rotation: [Rx, Ry, Rz] = [0, 0, 0],
}: TextCreatorProps) {
  return (
    <Text3D
      font={"text/Roboto Black_Regular.json"}
      position={[x, y, z]}
      letterSpacing={0.1}
      scale={0.7}
      rotation={[Rx, Ry, Rz]}
      lineHeight={0.5}
      bevelThickness={0.4}
      bevelSize={0.05}
      bevelOffset={0}
      bevelEnabled={true}
    >
      {text}
      <meshStandardMaterial color={new Color(color)} />
    </Text3D>
  );
}
