import { motion } from "framer-motion";
import { useState } from "react";
export default function Input({
  label,
  element,
  currentHovered,
  setCurrentHovered,
  type,
  value,
  setValue,
}: {
  label: string;
  element: string;
  currentHovered: string;
  setCurrentHovered: React.Dispatch<React.SetStateAction<string>>;
  type: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}) {
  const labelVariants = {
    active: {
      y: "-160%",
      scale: 1.1,
      x: -5,
    },
    inactive: {
      y: 0,
      scale: 1,
    },
  };
  return (
    <div className="ContactMe__Input">
      {element == "input" ? (
        <input
          type={type}
          id={`Contact-${label}`}
          onClick={() => {
            setCurrentHovered(label);
          }}
          onFocus={(e) => {
            setCurrentHovered(label);
          }}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          onBlur={() => {
            setCurrentHovered("");
          }}
        />
      ) : (
        <textarea
          id={`Contact-${label}`}
          rows={3}
          onClick={() => {
            setCurrentHovered(label);
          }}
          onFocus={(e) => {
            setCurrentHovered(label);
          }}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          onBlur={() => {
            setCurrentHovered("");
          }}
        ></textarea>
      )}
      <motion.label
        variants={labelVariants}
        animate={
          currentHovered == label || value.length != 0 ? "active" : "inactive"
        }
        htmlFor={`Contact-${label}`}
        initial={{ translateY: "50%" }}
      >
        {label}
      </motion.label>
    </div>
  );
}
