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
  active?: boolean;
  setActive?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function HeaderElement({
  name,
  link,
  currentHovered,
  setCurrentHovered,
  number,
  setActive,
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
      className="p-1 rounded-full bg-blue-300 md:bg-green-300"
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
      className="flex flex-col gap-1 items-center justify-center md:block"
    >
      <Link
        href={link}
        className="md:text-white text-red-400"
        onClick={() => {
          if (setActive) {
            setActive(() => false);
          }
        }}
      >
        {name}
      </Link>
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
