import { useEffect, useMemo, useState } from "react";
import "./SkillElement.scss";
import InfititeGrid from "./components/InfititeGrid";

export default function SkillsDisplay() {
  const frontEndSkills = [
    "React",
    "Next js",
    "Redux",
    "TypeScript",
    "Sass",
    "Tailwind",
  ];
  const backEndSkils = [
    "Node.js",
    "Express",
    "Java",
    "Spring Boot",
    "Python",
    "Django",
    "Django rest",
  ];
  const otherSkills = [
    "Kubernetes",
    "Docker",
    "PostgreSQL",
    "Apache Kafka",
    "Figma",
  ];
  const repetitions = 20;
  let replicatedFrontend: string[] = [];
  let replicatedBackend: string[] = [];
  let replicatedOthers: string[] = [];
  for (let i = 0; i < repetitions; i++) {
    replicatedFrontend = replicatedFrontend.concat(frontEndSkills);
    replicatedBackend = replicatedBackend.concat(backEndSkils);
    replicatedOthers = replicatedOthers.concat(otherSkills);
  }
  return (
    <div
      className="flex flex-col gap-4 z-30 text-white w-fit overflow-hidden overflow-x-hidden 
      p-4"
    >
      <div className="flex flex-col gap-6 md:gap-10 ooverflow-hidden overflow-x-hidden">
        <InfititeGrid elements={replicatedFrontend} header="Frontend" />
        <InfititeGrid elements={replicatedBackend} header="Backend" />
        <InfititeGrid elements={replicatedOthers} header="Others" />
      </div>
    </div>
  );
}
