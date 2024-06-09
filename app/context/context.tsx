"use client";
import { createContext } from "react";
import { LoadingManager } from "three";

const MainContext = createContext({
  loading: {
    isLoading: false,
    info: "",
    loader: new LoadingManager(),
    showTyped: true,
  },
  functions: {
    setIsLoading: (value: boolean) => {},
    setShowTyped: (value: boolean) => {},
    setCurrentSection: (value: string) => {},
    setProjectsNum: (value: number) => {},
    changeIsSectionInView: (value: boolean) => {},
  },
  currentSection: "home",
  modifiers: {
    isPhoneView: false,
    canvasYModifier: 9,
    projectsNumber: 4,
  },
  sectionInView: {
    isSectionInView: false,
    sectionData: {
      image: "",
      title: "",
    },
  },
});

export default MainContext;
