"use client";
import "./SecondSectionHtml.scss";
import { FaHtml5 } from "react-icons/fa6";
import { FaCss3Alt } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";
import { BiLogoTypescript } from "react-icons/bi";
import { FaReact } from "react-icons/fa";
import { SiRedux } from "react-icons/si";
import { FaSass } from "react-icons/fa";
import { RiTailwindCssFill } from "react-icons/ri";
import { FaNodeJs } from "react-icons/fa";
import { SiExpress } from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { SiSpringboot } from "react-icons/si";
import { FaPython } from "react-icons/fa";
import { SiDjango } from "react-icons/si";
import SiDjangorestframework from "@/public/images/logos/DjangoREST.svg";
import { FaDocker } from "react-icons/fa";
import { SiKubernetes } from "react-icons/si";
import { BiLogoPostgresql } from "react-icons/bi";
import { SiApachekafka } from "react-icons/si";
import { SiNextdotjs } from "react-icons/si";
import { FaFigma } from "react-icons/fa";
import { SiThreedotjs } from "react-icons/si";
import SkillsCard from "./components/SkillsCard";
import { useContext, useEffect, useRef } from "react";
import MainContext from "@/app/context/context";
import { useInView } from "framer-motion";
export default function SecondSectionHtml() {
  const skills = [
    {
      category: "Frontend",
      skills: [
        {
          name: "HTML",
          icon: FaHtml5,
        },
        {
          name: "CSS",
          icon: FaCss3Alt,
        },
        {
          name: "JavaScript",
          icon: IoLogoJavascript,
        },
        {
          name: "React",
          icon: FaReact,
        },
        {
          name: "Next js",
          icon: SiNextdotjs,
        },
        {
          name: "Redux",
          icon: SiRedux,
        },
        {
          name: "TypeScript",
          icon: BiLogoTypescript,
        },
        {
          name: "Sass",
          icon: FaSass,
        },
        {
          name: "Tailwind CSS",
          icon: RiTailwindCssFill,
        },
        {
          name: "Three.js",
          icon: SiThreedotjs,
          basics: true,
        },
      ],
    },
    {
      category: " Backend",
      skills: [
        {
          name: "Node.js",
          icon: FaNodeJs,
        },
        {
          name: "Express",
          icon: SiExpress,
        },
        {
          name: "Java",
          icon: FaJava,
        },
        {
          name: "Spring Boot",
          icon: SiSpringboot,
          basics: true,
        },
        {
          name: "Python",
          icon: FaPython,
        },
        {
          name: "Django",
          icon: SiDjango,
        },
        {
          name: "Django Rest Framework",
        },
      ],
    },
    {
      category: "Others",
      skills: [
        {
          name: "Docker",
          icon: FaDocker,
        },
        {
          name: "Kubernetes",
          icon: SiKubernetes,
          basics: true,
        },
        {
          name: "PostgreSQL",
          icon: BiLogoPostgresql,
        },
        {
          name: "Apache Kafka",
          icon: SiApachekafka,
          basics: true,
        },
        {
          name: "Figma",
          icon: FaFigma,
          basics: true,
        },
      ],
    },
  ];
  const skillsList = skills.map((skill, index) => (
    <SkillsCard
      key={`skillsCard-${index}`}
      category={skill.category}
      skills={skill.skills}
    />
  ));
  const { functions } = useContext(MainContext);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);
  useEffect(() => {
    if (isInView) functions.setCurrentSection("Skills");
  }, [isInView]);
  return (
    <section ref={ref} className="SecondSectionHtml" id="Skills">
      <div className="SecondSectionHtml__Header">
        <h2>
          What
          <br /> Skill I Have <br /> As A Developer
        </h2>
      </div>
      <div className="SecondSectionHtml__Skills ">{skillsList}</div>
    </section>
  );
}
