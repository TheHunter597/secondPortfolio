"use client";
import { Canvas } from "@react-three/fiber";
import Content from "./Content";

export default function BackgroundCanvas() {
  return (
    <Canvas
      camera={{
        fov: 65,
        position: [0, 0, 7],
      }}
      shadows
    >
      <color attach="background" args={["#11151C"]} />
      <Content />
    </Canvas>
  );
}
