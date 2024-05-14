"use client";
import { LoadingManager } from "three";
import MainContext from "./context";
import { useState } from "react";

export default function ContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
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
        },
        currentSection,
      }}
    >
      {children}
    </MainContext.Provider>
  );
}
