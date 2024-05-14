"use client";
import { createContext } from "react";
import { LoadingManager } from "three";

const MainContext = createContext({
  loading: {
    isLoading: false,
    info: "",
    loader: new LoadingManager(),
    showTyped: false,
  },
  functions: {
    setIsLoading: (value: boolean) => {},
    setShowTyped: (value: boolean) => {},
    setCurrentSection: (value: string) => {},
  },
  currentSection: "home",
});

export default MainContext;
