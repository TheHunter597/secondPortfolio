import { useContext, useEffect, useRef } from "react";
import "./AboutHtml.scss";
import Image from "next/image";
import MainContext from "@/app/context/context";
import { useInView } from "framer-motion";
import Bounded from "../../utils/Bounded";
export default function AboutHtml() {
  const { functions } = useContext(MainContext);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (isInView) functions.setCurrentSection("About");
  }, [isInView]);
  return (
    <Bounded>
      <section className="About" id="About" ref={ref}>
        <div className="About__Content">
          <div className="About__Header">
            <h3>About Me</h3>
          </div>
          <p className="About__Info">
            Hello! I am a fifth-year medical student with a passion for web
            development. Over the past two years, I have dedicated myself to
            studying full-stack web development, creating innovative solutions
            with cutting-edge technology.
            <br />
            <br />
            My journey in web development has equipped me with a diverse skill
            set, including front-end and back-end technologies. I am proficient
            in HTML, CSS, SCSS, JavaScript, and TypeScript. On the front end, I
            have worked extensively with frameworks and libraries such as React,
            Next.js, Framer Motion, and Three.js, leveraging Tailwind CSS for
            efficient styling.
            <br />
            <br />
            On the back end, I have experience with Node.js, Express, and Django
            REST Framework (DRF), along with databases like PostgreSQL. I am
            also familiar with Java and am currently diving deeper into Spring
            Boot.
            <br />
            <br />
            In addition to my coding skills, I have explored containerization
            with Docker and Kubernetes, and I am good at using design tools like
            Figma. My knowledge extends to working with Apache Kafka for
            real-time data processing.
            <br />
            <br />I look forward to collaborating with like-minded individuals
            and contributing to innovative projects that make a difference.
          </p>
        </div>
        <div className="About__Portrait cursor-pointer h-fit">
          <div className="w-fit relative">
            <Image
              src={"/images/portrait.jpeg"}
              alt="portrait"
              width={200}
              height={200}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>
    </Bounded>
  );
}
