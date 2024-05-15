"use client";
import { LoadingManager } from "three";
import MainContext from "./context";
import { useReducer, useState } from "react";

export default function ContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isPhoneView, setIsPhoneView] = useState(false);
  const [canvasYModifier, setCanvasYModifier] = useState(9);
  const [projectsNum, setProjectsNum] = useState(4);

  const [isLoading, setIsLoading] = useState(true);
  const [showTyped, setShowTyped] = useState(false);
  const [currentSection, setCurrentSection] = useState("home");

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
  function changeIsPhoneView(param: boolean) {
    setIsPhoneView(() => param);
    setCanvasYModifier(() => (param ? 7 : 9));
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
          setIsPhoneView: changeIsPhoneView,
        },
        currentSection,
        modifiers: {
          isPhoneView,
          canvasYModifier,
          projectsNumber: projectsNum,
        },
      }}
    >
      {children}
    </MainContext.Provider>
  );
}
