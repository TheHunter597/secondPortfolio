"use client";
import { Float } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import {
  BufferGeometry,
  Color,
  Material,
  Mesh,
  NormalBufferAttributes,
  Object3DEventMap,
} from "three";
interface MeshElementProps {
  props: {
    geometry: any;
    material: any;
    position: [number, number, number];
    audio: HTMLAudioElement;
  };
  index: number;
}
export default function MeshElement({
  props: { geometry, material, position, audio },
  index,
}: MeshElementProps) {
  const ref =
    useRef<
      Mesh<
        BufferGeometry<NormalBufferAttributes>,
        Material | Material[],
        Object3DEventMap
      >
    >(null);

  function handleOnClick(e: ThreeEvent<MouseEvent>) {
    if (e.object) {
      gsap.to(e.object.rotation, {
        x: Math.random() * Math.PI,
        y: Math.random() * Math.PI,
        z: Math.random() * Math.PI,
        duration: 1.5,
        ease: "power3.out",
        yoyo: true,
      });
    }
    if (ref.current) {
      if (ref.current?.material instanceof Array) {
      } else {
        ref.current.material.color = new Color(Math.random() * 0xffffff);
      }
    }
    audio.play();
  }
  function handleOnHover(e: ThreeEvent<MouseEvent>) {
    if (e.object) {
      gsap.to(e.object.scale, {
        x: 1.05,
        y: 1.05,
        z: 1.05,
        duration: 0.5,
      });
    }
    document.body.style.cursor = "pointer";
  }
  function handleOnLeave(e: ThreeEvent<MouseEvent>) {
    if (e.object) {
      gsap.to(e.object.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 0.5,
      });
    }
    document.body.style.cursor = "default";
  }
  useEffect(() => {}, []);
  return (
    <Float speed={3}>
      <mesh
        ref={ref}
        onClick={handleOnClick}
        onPointerLeave={handleOnLeave}
        onPointerEnter={handleOnHover}
        key={index}
        geometry={geometry}
        material={material}
        position={position}
      />
    </Float>
  );
}
