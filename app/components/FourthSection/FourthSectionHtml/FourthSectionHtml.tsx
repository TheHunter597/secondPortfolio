import { useContext, useEffect, useRef } from "react";
import "./FourthSectionHtml.scss";
import ContactMe from "./components/ContactMe";
import { useInView } from "framer-motion";
import MainContext from "@/app/context/context";
import Bounded from "../../utils/Bounded";

export default function FourthSectionHtml() {
  const { functions } = useContext(MainContext);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);
  useEffect(() => {
    if (isInView) functions.setCurrentSection("Contact");
  }, [isInView]);
  return (
    <Bounded>
      <section
        ref={ref}
        className="flex flex-row justify-center sm:justify-end p-3 py-24 z-10 FourthSectionCustomHeight"
        id="Contact"
      >
        <ContactMe />
      </section>
    </Bounded>
  );
}
