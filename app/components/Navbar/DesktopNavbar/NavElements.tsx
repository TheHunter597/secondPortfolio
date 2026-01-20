"use client";

import { useState } from "react";
import HeaderElement from "./HeaderElement";
import { LazyMotion, domAnimation } from "framer-motion";

export default function NavElements({
  setActive,
}: {
  setActive?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [currentHovered, setCurrentHovered] = useState<number>(-1);
  const leftSideElements = [
    {
      name: "Home",
      link: "#Home",
      number: 0,
    },
    {
      name: "Skills",
      link: "#Skills",
      number: 1,
    },
    {
      name: "Projects",
      link: "#Projects",
      number: 2,
    },
    {
      name: "About",
      link: "#About",
      number: 3,
    },
    {
      name: "Contact",
      link: "#Contact",
      number: 4,
    },
  ];

  const leftSideElementsResult = leftSideElements.map((element) => (
    <HeaderElement
      key={element.name}
      name={element.name}
      link={element.link}
      currentHovered={currentHovered}
      setCurrentHovered={setCurrentHovered}
      number={element.number}
      setActive={setActive}
    />
  ));
  return (
    <div className="flex flex-col gap-4 md:gap-0 md:flex-row justify-between flex-1">
      <ul className="flex flex-col md:flex-row gap-4 [&>*]:cursor-pointer child-hover:text-blue-400 child:duration-300">
        <LazyMotion features={domAnimation}>
          {leftSideElementsResult}
        </LazyMotion>
      </ul>
      <ul>
        <a
          download="Portfolio.pdf"
          href="/Portfolio.pdf"
          className="px-4 py-2 bg-red-500 text-white font-bold text-md  cursor-pointer
        hover:bg-transparent hover:text-red-500 border border-red-500 duration-300"
        >
          Download CV
        </a>
      </ul>
    </div>
  );
}
