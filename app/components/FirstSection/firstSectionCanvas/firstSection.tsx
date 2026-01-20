"use client";
import { useContext, useRef } from "react";
import GalaxyGenerator from "./components/GalaxyGenerator";
import MainContext from "@/app/context/context";

export default function FirstSection() {
  const dLightHelper = useRef(null);
  const {
    modifiers: { canvasYModifier },
  } = useContext(MainContext);
  const isPhoneView = useContext(MainContext).modifiers.isPhoneView;
  return (
    <group
      position={[
        isPhoneView ? 2 : 8,
        isPhoneView ? 5 : 0 * canvasYModifier + 2,
        -20 * (isPhoneView ? 2 : 1),
      ]}
    >
      <directionalLight intensity={2} position={[5, 3, 5]} ref={dLightHelper} />
      <ambientLight intensity={0.5} />
      <GalaxyGenerator />
    </group>
  );
}
