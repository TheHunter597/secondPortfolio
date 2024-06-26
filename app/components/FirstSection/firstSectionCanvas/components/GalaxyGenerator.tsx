import gaussian from "@/app/components/utils/guassian";
import { useTexture } from "@react-three/drei";
import { useMemo } from "react";
import { Color } from "three";
import GenerateGalaxies from "./generateGalaxies";
interface GalaxyGeneratorParams {
  count?: number;
  size?: number;
  branches?: number;
  radius?: number;
  spiral?: number;
  random?: number;
}
export default function GalaxyGenerator({
  count,
  size,
  branches,
  radius,
  spiral,
  random,
}: GalaxyGeneratorParams) {
  const galaxyParams = {
    count: count || 20000,
    size: size || 0.13,
    branches: branches || 6,
    radius: radius || 10,
    spiral: spiral || 0.35,
    random: random || 0.45,
  };
  const texture = useTexture("/images/particles/circle_03.png");
  const vertices = useMemo(() => {
    const vertices = new Float32Array(galaxyParams.count * 3);
    const colors = new Float32Array(galaxyParams.count * 3);
    const thetaDiff = (Math.PI * 2) / galaxyParams.branches;
    for (let i = 0; i < galaxyParams.count; i++) {
      const left = i % galaxyParams.branches;
      const randomNum = Math.random() * galaxyParams.radius;
      const x =
        Math.cos(thetaDiff * left + randomNum * galaxyParams.spiral) *
          randomNum +
        gaussian(0, galaxyParams.random);
      const y = gaussian(0, galaxyParams.random);
      const z =
        Math.sin(thetaDiff * left + randomNum * galaxyParams.spiral) *
          randomNum +
        gaussian(0, galaxyParams.random);

      vertices[i * 3] = x;
      vertices[i * 3 + 1] = y;
      vertices[i * 3 + 2] = z;

      let color = new Color();

      color.setHSL(Math.random() * 0.1, 0.5, 0.5); // Set color to a random hue
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    return { vertices, colors };
  }, []);
  const galaxyProps = {
    vertices: vertices.vertices,
    colors: vertices.colors,
    texture,
    galaxyParams,
  };
  const firstGalaxy = GenerateGalaxies(galaxyProps);

  return firstGalaxy;
}
