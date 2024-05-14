import { useContext, useEffect, useRef } from "react";
import "./FourthSectionHtml.scss";
import ContactMe from "./components/ContactMe";
import { useInView } from "framer-motion";
import MainContext from "@/app/context/context";

export default function FourthSectionHtml() {
  const { functions } = useContext(MainContext);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);
  useEffect(() => {
    if (isInView) functions.setCurrentSection("Contact");
  }, [isInView]);
  return (
    <section
      ref={ref}
      className="flex flex-row justify-end p-3 py-24 z-10"
      id="Contact"
    >
      <ContactMe />
    </section>
  );
}
