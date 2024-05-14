import Link from "next/link";
import { m } from "framer-motion";
import React, { useContext } from "react";
import MainContext from "@/app/context/context";
interface HeaderElementProps {
  name: string;
  link: string;
  currentHovered: number;
  setCurrentHovered: React.Dispatch<React.SetStateAction<number>>;
  number: number;
}

export default function HeaderElement({
  name,
  link,
  currentHovered,
  setCurrentHovered,
  number,
}: HeaderElementProps) {
  const { currentSection } = useContext(MainContext);
  const dots = [1, 2, 3];
  const variants = {
    active: {
      opacity: 1,
    },
    inactive: {
      opacity: 0,
    },
  };
  const container = {
    active: {
      transition: {
        staggerChildren: 0.1,
      },
    },
    inactive: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  const dotsResult = dots.map((dot) => (
    <m.div
      key={`${name}-dot-${dot}`}
      className="p-1 rounded-full bg-green-300"
      variants={variants}
    ></m.div>
  ));

  return (
    <div
      onMouseOver={() => {
        setCurrentHovered(number);
      }}
      onMouseOut={() => {
        if (currentHovered == number) setCurrentHovered(-1);
      }}
    >
      <Link href={link}>{name}</Link>
      <m.div
        className="flex flex-row gap-1 justify-center align-middle"
        variants={container}
        initial="inactive"
        animate={
          currentHovered == number || currentSection == name
            ? "active"
            : "inactive"
        }
      >
        {dotsResult}
      </m.div>
    </div>
  );
}
