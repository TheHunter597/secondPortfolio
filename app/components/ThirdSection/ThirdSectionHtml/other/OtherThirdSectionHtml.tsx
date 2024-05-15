import { useInView, useScroll, useTransform } from "framer-motion";
import Card from "./Card";
import "./OtherThirdSectionHtml.scss";
import { useContext, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import MainContext from "@/app/context/context";
export default function OtherThirdSectionHtml() {
  const sections = [
    {
      image: "/images/projects/Project_1.png",
      title: "Random elements",
    },
    {
      image: "/images/projects/Project_2.png",
      title: "Planet Earth",
    },
    {
      image: "/images/projects/Project_3.png",
      title: "Wikipedia",
    },
    {
      image: "/images/projects/Project_4.png",
      title: "The Hup",
    },
  ];
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });

  const result = sections.map((item, index) => {
    return <Card key={`sectionCardNumber${index}`} data={item} />;
  });

  const x = useTransform(
    scrollYProgress,
    [0.05, 1],
    ["0%", `-${(sections.length - 1) * 102.5 + 4}%`]
  );
  const { functions } = useContext(MainContext);
  const isInView = useInView(ref);
  useEffect(() => {
    if (isInView) functions.setCurrentSection("Projects");
  }, [isInView]);
  useEffect(() => {
    functions.setProjectsNum(sections.length);
  }, []);
  return (
    <div
      ref={ref}
      className="OtherThirdSectionHtml"
      id="Projects"
      style={{
        height: `${sections.length * 95}vh`,
      }}
    >
      <div className="OtherThirdSectionHtml__Content ">
        <motion.div style={{ x }} className="w-11/12 gap-2 grid grid-flow-col">
          {result}
        </motion.div>
      </div>
    </div>
  );
}
