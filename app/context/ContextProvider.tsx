"use client";
import { LoadingManager } from "three";
import MainContext from "./context";
import { useEffect, useState } from "react";

export default function ContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isPhoneView, setIsPhoneView] = useState(false);
  const [canvasYModifier, setCanvasYModifier] = useState(9);
  const [projectsNum, setProjectsNum] = useState(4);

  const [isLoading, setIsLoading] = useState(true);
  const [showTyped, setShowTyped] = useState(true);
  const [currentSection, setCurrentSection] = useState("home");
  const [isSectionInView, setIsSectionInView] = useState(false);
  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsPhoneView(true);
    }
  }, []);
  function changeIsLoading(param: boolean) {
    setIsLoading(() => param);
  }
  function changeShowTyped(param: boolean) {
    setShowTyped(() => param);
  }
  function changeCurrentSection(param: string) {
    setCurrentSection(() => param);
  }
  function changeProjectsNum(param: number) {
    setProjectsNum(() => param);
  }

  function changeIsSectionInView(param: boolean) {
    setIsSectionInView(() => param);
  }
  return (
    <MainContext.Provider
      value={{
        loading: {
          isLoading,
          info: "Loading the page",
          loader: new LoadingManager(),
          showTyped,
        },
        functions: {
          setIsLoading: changeIsLoading,
          setShowTyped: changeShowTyped,
          setCurrentSection: changeCurrentSection,
          setProjectsNum: changeProjectsNum,
          changeIsSectionInView: changeIsSectionInView,
        },
        currentSection,
        modifiers: {
          isPhoneView,
          canvasYModifier,
          projectsNumber: projectsNum,
        },

        sectionInView: {
          isSectionInView: isSectionInView,
          sectionData: {
            image: "",
            title: "",
          },
        },
      }}
    >
      {children}
    </MainContext.Provider>
  );
}
