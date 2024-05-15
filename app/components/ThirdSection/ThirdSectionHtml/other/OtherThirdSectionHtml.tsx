import { useInView, useScroll, useTransform } from "framer-motion";
import Card from "./Card";
import "./OtherThirdSectionHtml.scss";
import { useContext, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import MainContext from "@/app/context/context";
export default function OtherThirdSectionHtml() {
  const sections = [1, 2, 3, 4];
  const result = sections.map((item) => {
    return <Card key={item} />;
  });

  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, [0.43, 1], ["0%", "-98%"]);
  const ref = useRef<HTMLDivElement>(null);
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
        height: `${sections.length * 100}vh`,
      }}
    >
      <div className="OtherThirdSectionHtml__Content ">
        <motion.div style={{ x }} className="flex gap-8">
          {result}
        </motion.div>
      </div>
    </div>
  );
}
