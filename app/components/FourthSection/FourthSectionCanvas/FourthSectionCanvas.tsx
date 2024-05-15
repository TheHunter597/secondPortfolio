"use client";
import { useContext, useEffect, useRef } from "react";
import { Group, Object3DEventMap } from "three";
import * as THREE from "three";
import Earth from "./elements/Earth";
import Moon from "./elements/Moon";
import MainContext from "@/app/context/context";
import GalaxyGenerator from "../../FirstSection/firstSectionCanvas/components/GalaxyGenerator";

export default function FourthSectionCanvas() {
  const earthMoonRef = useRef<Group<Object3DEventMap>>(null);
  const meRef =
    useRef<
      THREE.Mesh<
        THREE.BufferGeometry<THREE.NormalBufferAttributes>,
        THREE.Material | THREE.Material[],
        Object3DEventMap
      >
    >(null);
  const contactRef =
    useRef<
      THREE.Mesh<
        THREE.BufferGeometry<THREE.NormalBufferAttributes>,
        THREE.Material | THREE.Material[],
        Object3DEventMap
      >
    >(null);

  useEffect(() => {
    if (contactRef.current && meRef.current) {
      const contactBoxPosition = new THREE.Box3().setFromObject(
        contactRef.current
      );
      meRef.current.position.x = contactBoxPosition.max.x + 0.2;
      meRef.current.rotation.z = -Math.PI / 8;
    }
  }, [contactRef.current]);
  const {
    modifiers: { projectsNumber, canvasYModifier },
  } = useContext(MainContext);
  return (
    <group
      ref={earthMoonRef}
      position={[0, -(projectsNumber + 5) * canvasYModifier, -20]}
    >
      <group position={[-6, 0, 4]}>
        <Earth />
        <Moon />
      </group>
      <group position={[18, 10, -40]}>
        <GalaxyGenerator spiral={0.5} branches={7} />
      </group>
    </group>
  );
}
