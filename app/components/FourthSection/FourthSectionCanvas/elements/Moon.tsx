import MainContext from "@/app/context/context";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useContext, useRef } from "react";
import { Group, Object3DEventMap } from "three";
export default function Moon() {
  const loadingData = useContext(MainContext);
  const moon = useGLTF("models/earthMoon/moon.glb", true, false, (loader) => {
    loader.manager = loadingData.loading.loader;
  });
  const moonRef = useRef<Group<Object3DEventMap>>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    moon.scene.rotation.y = t / 2;
    if (moonRef.current) {
      moonRef.current.position.x = Math.cos(-t / 3) * 7;
      moonRef.current.position.z = Math.sin(-t / 3) * 7;
    }
  });

  return (
    <group position={[0, 1, 0]} scale={0.002} ref={moonRef} castShadow>
      <primitive object={moon.scene}></primitive>
    </group>
  );
}
