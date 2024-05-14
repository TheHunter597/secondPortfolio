"use client";
import { useRef } from "react";

export default function FirstSection() {
  const dLightHelper = useRef(null);
  // @ts-ignore
  return (
    <group>
      <directionalLight intensity={2} position={[5, 3, 5]} ref={dLightHelper} />
      <ambientLight intensity={0.5} />
    </group>
  );
}
