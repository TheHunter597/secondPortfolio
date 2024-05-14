import { useContext, useEffect, useRef } from "react";
import "./ThirdSectionHtml.scss";
import ProjectSection from "./components/ProjectSection";
import MainContext from "@/app/context/context";
import { LazyMotion, domAnimation, useInView } from "framer-motion";
export default function ThirdSectionHtml() {
  const sectionsData = [
    {
      header: "Welcome to summoners rift",
      content:
        "Welcome to summoners rift, the place where you can play with your friends and have fun.",
    },
    {
      header: "Not welcome to summoners rift",
      content:
        "Not welcome to summoners rift, the place where you can play with your friends and have fun.",
    },
  ];
  const { functions } = useContext(MainContext);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);
  useEffect(() => {
    if (isInView) functions.setCurrentSection("Projects");
  }, [isInView]);
  const sectionsResult = sectionsData.map((section, index) => {
    return (
      <ProjectSection
        key={`projectSection-${index}`}
        header={section.header}
        content={section.content}
      />
    );
  });
  return (
    <section ref={ref} className="ThirdSectionHtml" id="Projects">
      <div className="ThirdSectionHtml__Content">
        <LazyMotion features={domAnimation}>{sectionsResult}</LazyMotion>
      </div>
    </section>
  );
}
