"use client";
import { useContext, useEffect } from "react";
import FirstSectionHtml from "./FirstSection/firstSectionHtml/firstSectionHtml";
import FourthSectionHtml from "./FourthSection/FourthSectionHtml/FourthSectionHtml";
import SecondSectionHtml from "./SecondSection/SecondSectionHtml/SecondSectionHtml";
import ThirdSectionHtml from "./ThirdSection/ThirdSectionHtml/ThirdSectionHtml";
import MainContext from "../context/context";
import LoadingPage from "./LoadingPage/LoadingPage";
import { AnimatePresence, motion } from "framer-motion";
import OtherThirdSectionHtml from "./ThirdSection/ThirdSectionHtml/other/OtherThirdSectionHtml";

export default function ForgroundHtml() {
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
  return isLoading || showTyped ? (
    <LoadingPage />
  ) : (
    <div className="ForegroundHtml">
      <FirstSectionHtml />
      <SecondSectionHtml />
      {/* <ThirdSectionHtml /> */}
      <OtherThirdSectionHtml />
      <FourthSectionHtml />
    </div>
  );
}
