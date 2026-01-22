"use client";

import { useEffect, useState } from "react";
import "./AIHelperTooltip.scss";

interface AIHelperTooltipProps {
  onNeverShowAgain: () => void;
}

export default function AIHelperTooltip({
  onNeverShowAgain,
}: AIHelperTooltipProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const neverShow = localStorage.getItem("aiHelperTooltipNeverShow");
    if (neverShow === "true") {
      return;
    }

    // Show tooltip after 60 seconds for the first time
    const initialTimer = setTimeout(() => {
      setIsVisible(true);

      // Hide after 10 seconds
      const hideTimer = setTimeout(() => {
        setIsVisible(false);
      }, 10000);

      return () => clearTimeout(hideTimer);
    }, 60000);

    // Set up recurring interval to show tooltip every 60 seconds
    const recurringInterval = setInterval(() => {
      const neverShow = localStorage.getItem("aiHelperTooltipNeverShow");
      if (neverShow !== "true") {
        setIsVisible(true);

        // Hide after 10 seconds
        setTimeout(() => {
          setIsVisible(false);
        }, 10000);
      }
    }, 60000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(recurringInterval);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleNeverShowAgain = () => {
    localStorage.setItem("aiHelperTooltipNeverShow", "true");
    setIsVisible(false);
    onNeverShowAgain();
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="ai-helper-tooltip">
      <div className="tooltip-content">
        <p>
          This is an AI trained on <strong>Mohamed Hossam's</strong> skills and
          projects. Open it and ask about anything you want to know!
        </p>
      </div>
      <div className="tooltip-buttons">
        <button
          className="tooltip-button close-button"
          onClick={handleClose}
          aria-label="Close tooltip"
        >
          Close
        </button>
        <button
          className="tooltip-button never-show-button"
          onClick={handleNeverShowAgain}
          aria-label="Never show again"
        >
          Never Show Again
        </button>
      </div>
      <div className="tooltip-arrow"></div>
    </div>
  );
}
