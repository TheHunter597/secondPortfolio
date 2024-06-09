"use client";
import { useInView, useScroll, useTransform } from "framer-motion";
import Card from "./components/Card";
import "./ThirdSectionHtml.scss";

import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import MainContext from "@/app/context/context";
import Bounded from "@/app/components/utils/Bounded";
import { MainContentSlice } from "@/prismicio-types";

export default function ThirdSectionMainContent({
  landingPageProjectsData,
}: {
  landingPageProjectsData: MainContentSlice[];
}) {
  landingPageProjectsData.sort((a: any, b: any) => {
    return a.primary.placement - b.primary.placement;
  });

  const data = landingPageProjectsData.map((item) => {
    return {
      image: item.primary["projectimage"].url,
      title: item.primary.title,
      // @ts-ignore
      description: item.primary.summarizeddescription[0]["text"],
      // @ts-ignore
      url: item.primary["url"]["url"],
      // @ts-ignore
      portfolioUrl: item.primary["portfoliourl"]["url"],
      // @ts-ignore
      githubUrl: item.primary["project"] && item.primary["project"]["url"],
    };
  });
  let [phoneView, setPhoneView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });

  const result = useMemo(() => {
    return data.map((item, index) => {
      return (
        <Card
          key={`sectionCardNumber${index}`}
          data={item}
          phoneView={phoneView}
        />
      );
    });
  }, [phoneView]);

  const x = useTransform(
    scrollYProgress,
    [0.05, 1],
    ["0%", `-${(data.length - 1) * 110}%`]
  );
  const { functions } = useContext(MainContext);
  const isInView = useInView(ref);
  useEffect(() => {
    if (window.innerWidth < 768) setPhoneView(true);
    if (isInView) functions.setCurrentSection("Projects");
  }, [isInView]);

  useEffect(() => {
    functions.setProjectsNum(data.length);
  }, []);
  return (
    <Bounded>
      <div
        ref={ref}
        className="ThirdSectionHtml"
        id="Projects"
        style={{
          height: `${data.length * 95}vh`,
        }}
      >
        <div className="ThirdSectionHtml__Content ">
          <motion.div
            style={{ x }}
            className="w-11/12 gap-2 grid grid-flow-col"
          >
            {result}
          </motion.div>
        </div>
      </div>
    </Bounded>
  );
}
