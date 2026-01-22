"use client";
import { motion } from "framer-motion";
import { useMemo } from "react";
function SkillElement({ skill }: { skill: string }) {
  const randomNum = useMemo(() => {
    return Math.floor(Math.random() * 3);
  }, []);
  return (
    <motion.div
      className={`InfitieSkillElement ${
        randomNum === 0
          ? "text-blue-300"
          : randomNum === 1
            ? "text-red-300"
            : ""
      }`}
    >
      {skill}
    </motion.div>
  );
}

export default function InfititeGrid({
  elements,
  header,
}: {
  elements: string[];
  header: string;
}) {
  const result = elements.map((skill, index) => {
    return <SkillElement key={`skill-${index}`} skill={skill} />;
  });

  const marqueeVariants = {
    animate: {
      x: [0, "-100%"],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: result.length * Math.floor(Math.random() * (12 - 9) + 9),
          ease: "linear",
        },
      },
    },
  };
  return (
    <div className="flex flex-col gap-8 w-screen">
      <motion.div
        className="grid grid-flow-col w-fit "
        variants={marqueeVariants}
        animate={"animate"}
      >
        {result}
      </motion.div>
    </div>
  );
}
