"use client";
import { useState } from "react";

interface SkillElementProps {
  name: string;
  IconElement?: React.ComponentType | string;
  basics?: boolean;
  image?: string;
}
export default function SkillElement({
  name,
  IconElement,
  basics,
  image,
}: SkillElementProps) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="SkillElement"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="SkillElement__Main">
        <div className="SkillElement__Icon">
          {IconElement && <IconElement />}
        </div>
        <div className="SkillElement__Name">{name}</div>
      </div>
      {basics && (
        <div className="absolute -top-2 -right-1 bg-green-500 text-white px-1 scale-90 z-10 h-4 w-4 rounded-lg">
          {hovered && (
            <div
              className="absolute bg-purple-800 bg-opacity-75 rounded-lg text-white w-24 text-center
            z-20 -top-full
            "
            >
              Know the basics
            </div>
          )}
        </div>
      )}
    </div>
  );
}
