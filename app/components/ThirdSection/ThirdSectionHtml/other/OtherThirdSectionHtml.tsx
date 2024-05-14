import { useInView, useScroll, useTransform } from "framer-motion";
import Card from "./Card";
import "./OtherThirdSectionHtml.scss";
import { useContext, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import MainContext from "@/app/context/context";
export default function OtherThirdSectionHtml() {
  const card = [1, 2, 3, 4, 5];
  const result = card.map((item) => {
    return <Card key={item} />;
  });
  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, [0.43, 1], ["0%", "-88%"]);
  const ref = useRef<HTMLDivElement>(null);
  const { functions } = useContext(MainContext);
  const isInView = useInView(ref);
  useEffect(() => {
    if (isInView) functions.setCurrentSection("Projects");
  }, [isInView]);
  return (
    <div ref={ref} className="OtherThirdSectionHtml" id="#Projects">
      <div className="OtherThirdSectionHtml__Content ">
        <motion.div style={{ x }} className="flex gap-8">
          {result}
        </motion.div>
      </div>
    </div>
  );
}
