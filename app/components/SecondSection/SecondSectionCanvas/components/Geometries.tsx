import * as THREE from "three";
import MeshElement from "./MeshElement";
export default function Geometries() {
  const geometries: {
    geometry: any;
    material: any;
    position: [number, number, number];
    audio: HTMLAudioElement;
  }[] = [
    {
      geometry: new THREE.IcosahedronGeometry(1.8, 0),
      material: new THREE.MeshStandardMaterial({
        color: "#FFC0CB",
        metalness: 1,
        roughness: 0.2,
      }),
      position: [0, 0, 0],
      audio: new Audio("/Audio/Audio/click_002.ogg"),
    },
    {
      geometry: new THREE.IcosahedronGeometry(0.8, 0),
      material: new THREE.MeshStandardMaterial({
        color: "#E0607E",
        metalness: 1,
        roughness: 0.2,
      }),
      position: [2.2, 1, 0.2],
      audio: new Audio("/Audio/Audio/click_002.ogg"),
    },
    {
      geometry: new THREE.DodecahedronGeometry(0.8, 0),
      material: new THREE.MeshStandardMaterial({
        color: "#F2A359",
        metalness: 1,
        roughness: 0.2,
      }),
      position: [-1.85, 1, -0.2],
      audio: new Audio("/Audio/Audio/click_002.ogg"),
    },
    {
      geometry: new THREE.TorusGeometry(0.7, 0.3),
      material: new THREE.MeshStandardMaterial({
        color: "#FE5F55",
        metalness: 1,
        roughness: 0.2,
      }),
      position: [-1.6, -2, 0],
      audio: new Audio("/Audio/Audio/click_002.ogg"),
    },
    {
      geometry: new THREE.CapsuleGeometry(0.3, 1),
      material: new THREE.MeshStandardMaterial({
        color: "#FFC857",
        metalness: 1,
        roughness: 0.2,
      }),
      position: [0.4, -1.9, 1.2],
      audio: new Audio("/Audio/Audio/click_002.ogg"),
    },
  ];

  const elements = geometries.map((props, index) => {
    return <MeshElement key={index} props={props} index={index} />;
  });
  return elements;
}
