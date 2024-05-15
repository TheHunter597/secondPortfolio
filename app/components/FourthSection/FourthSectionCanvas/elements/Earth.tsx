import MainContext from "@/app/context/context";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useContext } from "react";

export default function Earth() {
  const loadingData = useContext(MainContext);

  const otherEarth = useGLTF(
    "models/earthMoon/earthCompressed.glb",
    false,
    false,
    (loader) => {
      loader.manager = loadingData.loading.loader;
    }
  );

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    otherEarth.scene.rotation.y = t / 30;
  });

  return (
    <group scale={0.00008} rotation={[0, 0, (23.5 * Math.PI) / 180]}>
      <primitive object={otherEarth.scene}></primitive>
    </group>
  );
}
