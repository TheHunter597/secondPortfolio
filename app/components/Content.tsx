import { useFrame, useThree } from "@react-three/fiber";
import FirstSection from "./FirstSection/firstSectionCanvas/firstSection";
import { useRef } from "react";
import {
  BufferGeometry,
  Group,
  Material,
  NormalBufferAttributes,
  Object3DEventMap,
  Points,
} from "three";
import { Environment, PerspectiveCamera, Stars } from "@react-three/drei";
import GalaxyGenerator from "./FirstSection/firstSectionCanvas/components/GalaxyGenerator";
import SecondSectionCanvas from "./SecondSection/SecondSectionCanvas/SecondSectionCanvas";
import ThirdSectionCanvas from "./ThirdSection/ThirdSectionCanvas/ThirdSectionCanvas";
import FourthSectionCanvas from "./FourthSection/FourthSectionCanvas/FourthSectionCanvas";
export default function Content() {
  const { camera } = useThree();
  const starsRef =
    useRef<
      Points<
        BufferGeometry<NormalBufferAttributes>,
        Material | Material[],
        Object3DEventMap
      >
    >(null);
  useFrame(() => {
    starsRef.current?.rotateY(0.0002);
    camera.position.y = -((window.scrollY / window.innerHeight) * 10).toFixed(
      2
    );
  });
  const cameraGroup = useRef<Group<Object3DEventMap>>(null);
  return (
    <>
      <group ref={cameraGroup}>
        <PerspectiveCamera makeDefault />
      </group>
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
        ref={starsRef}
      />
      <FirstSection />
      <SecondSectionCanvas />
      <ThirdSectionCanvas />
      <FourthSectionCanvas />
      <Environment preset="sunset" />
      {/* <Perf /> */}
    </>
  );
}
