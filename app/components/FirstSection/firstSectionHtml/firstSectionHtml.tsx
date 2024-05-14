"use client";
import { m, LazyMotion, useInView, domAnimation } from "framer-motion";
import "./firstSectionHtml.scss";
import { TypeAnimation } from "react-type-animation";
import { useContext, useEffect, useRef } from "react";
import MainContext from "@/app/context/context";
export default function FirstSectionHtml() {
  const { functions } = useContext(MainContext);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);
  useEffect(() => {
    if (isInView) functions.setCurrentSection("Home");
  }, [isInView]);
  const mainIntro = {
    text: "Welcome to My Creative Universe I'am Mohamed Hossam Full Stack Developer",
    colorful: ["Mohamed", "Hossam"],
  };
  const mainIntroResult = mainIntro.text.split(" ").map((text, index) => {
    return (
      <m.span
        className={`${mainIntro.colorful.includes(text) ? "colorful" : ""}`}
        key={`HeaderText-${index}`}
        initial={{ opacity: 0, y: -100 }}
        whileInView={{
          opacity: [0, 1],
          y: [-100, 0],
          transition: {
            delay: 0.1 + Math.random(),
            duration: 1.5,
            type: "spring",
          },
        }}
      >
        {text}{" "}
      </m.span>
    );
  });
  return (
    <LazyMotion features={domAnimation}>
      <section className="FirstSectionHtml" id="Home" ref={ref}>
        <h1 className="FirstSectionHtml__Header sm:w-1/2">
          <div className="FirstSectionHeader__line">
            <div></div>
            <m.div
              animate={{
                scaleY: [0, 1],
                transition: {
                  duration: 1.5,
                  delay: 0.5,
                },
              }}
              initial={{ scaleY: 0 }}
            ></m.div>
          </div>
          <div className="FirstSectionHeader__main">
            <div>{mainIntroResult}</div>
            <div>
              <TypeAnimation
                sequence={[
                  // Same substring at the start will only be typed once, initially
                  "Interested in Web Development",
                  1500,

                  "Love to get lost in spring docs",
                  1500,
                  "Contact me for any help",
                  200,
                ]}
                speed={{
                  type: "keyStrokeDelayInMs",
                  value: 120,
                }}
                className="FirstSectionHeader__Typed"
              />
            </div>
          </div>
        </h1>
      </section>
    </LazyMotion>
  );
}
