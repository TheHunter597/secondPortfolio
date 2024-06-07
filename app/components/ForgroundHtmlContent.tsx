"use client";
import { useContext, useEffect } from "react";
import FirstSectionHtml from "./FirstSection/firstSectionHtml/firstSectionHtml";
import FourthSectionHtml from "./FourthSection/FourthSectionHtml/FourthSectionHtml";
import SecondSectionHtml from "./SecondSection/SecondSectionHtml/SecondSectionHtml";
import MainContext from "../context/context";
import LoadingPage from "./LoadingPage/LoadingPage";
import { AnimatePresence, motion } from "framer-motion";
import AboutHtml from "./About/AboutHtml/AboutHtml";
import ThirdSectionHtml from "./ThirdSection/ThirdSectionHtml/ThirdSectionHtml";
import { MainContentSlice } from "@/prismicio-types";
export default function ForegroundHtmlContent({
  landingPageProjectsData,
}: {
  landingPageProjectsData: MainContentSlice[];
}) {
  const {
    loading: { isLoading, loader, showTyped },
    functions,
  } = useContext(MainContext);
  loader.onLoad = () => {
    functions.setIsLoading(false);
  };
  useEffect(() => {
    functions.setShowTyped(true);
  }, []);

  return (
    <AnimatePresence>
      {showTyped ? (
        <motion.div
          key={"loading-page"}
          initial={{ opacity: 1, x: "0%" }}
          exit={{ opacity: 1, y: "100%" }}
          transition={{ duration: 1.2 }}
          className="z-50 w-full h-full fixed top-0 
          left-0 bg-black flex justify-center items-center text-center "
        >
          <LoadingPage />
        </motion.div>
      ) : (
        <div className="ForegroundHtml">
          <FirstSectionHtml />
          <SecondSectionHtml />
          <ThirdSectionHtml landingPageProjectsData={landingPageProjectsData} />
          <AboutHtml />
          <FourthSectionHtml />
        </div>
      )}
    </AnimatePresence>
  );
}
