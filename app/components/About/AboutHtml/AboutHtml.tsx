import { useContext, useEffect, useRef } from "react";
import "./AboutHtml.scss";
import Image from "next/image";
import MainContext from "@/app/context/context";
import { useInView } from "framer-motion";

export default function AboutHtml() {
  const { functions } = useContext(MainContext);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);
  useEffect(() => {
    if (isInView) functions.setCurrentSection("About");
  }, [isInView]);
  return (
    <section className="About" id="About" ref={ref}>
      <div className="About__Header">
        <h3>
          Shame may follow a victorious without dignity, and truimph is given to
          the beaten heroes
        </h3>
      </div>
      <div className="About__Content">
        <p className="About__Info">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi error,
          sit cupiditate placeat alias quos perferendis id! Quaerat nihil at
          eaque accusantium minima maiores, temporibus quam exercitationem
          voluptates quas quibusdam.
          <br />
          <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis quas
          iure pariatur dolorum et optio soluta modi fugit saepe aliquam
          cupiditate error esse ipsa quam facere perferendis, tempora nisi
          libero!
        </p>
      </div>
      <div className="About__Portrait">
        <Image
          src={"/images/portrait.jpeg"}
          alt="portrait"
          width={300}
          height={450}
          className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-500 ease-in-out cursor-pointer"
        />
      </div>
    </section>
  );
}
