"use client";
import "./SecondSectionHtml.scss";
import { useContext, useEffect, useRef } from "react";
import MainContext from "@/app/context/context";
import { useInView } from "framer-motion";
import SkillsDisplay from "./OtherSkillsSection/OtherSkillsSection";
export default function SecondSectionHtml() {
  const { functions } = useContext(MainContext);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);
  useEffect(() => {
    if (isInView) functions.setCurrentSection("Skills");
  }, [isInView]);
  return (
    <>
      <section ref={ref} className="flex flex-col gap-12 h-screen" id="Skills">
        <div className="SecondSection__Header">
          <div className="w-fit">
            <h2 className="w-fit">
              What
              <br /> Skill I Have <br /> As A Developer
            </h2>
          </div>
        </div>

        <div className="SecondSectionHtml__Skills ">
          <SkillsDisplay />
        </div>
      </section>
    </>
  );
}
