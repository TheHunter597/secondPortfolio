import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import {
  BufferGeometry,
  Material,
  NormalBufferAttributes,
  Object3DEventMap,
  Points,
} from "three";

export default function GenerateGalaxies({
  vertices,
  colors,
  texture,
  galaxyParams,
}: {
  vertices: Float32Array;
  colors: Float32Array;
  texture: any;
  galaxyParams: any;
}) {
  const galaxyRef =
    useRef<
      Points<
        BufferGeometry<NormalBufferAttributes>,
        Material | Material[],
        Object3DEventMap
      >
    >(null);
  useFrame(() => {
    if (galaxyRef.current) {
      galaxyRef.current.rotation.y += 0.001;
    }
  });
  return (
    <points rotation={[Math.PI / 3, 0, 0]} ref={galaxyRef}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attach={"attributes-position"}
          count={galaxyParams.count}
          array={vertices}
          itemSize={3}
        />
        <bufferAttribute
          attach={"attributes-color"}
          count={galaxyParams.count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        attach="material"
        size={galaxyParams.size}
        alphaMap={texture}
        transparent
        vertexColors
      />
    </points>
  );
}
