import { motion } from "framer-motion";
import { useState } from "react";
export default function Input({
  label,
  element,
  currentHovered,
  setCurrentHovered,
  type,
}: {
  label: string;
  element: string;
  currentHovered: string;
  setCurrentHovered: React.Dispatch<React.SetStateAction<string>>;
  type: string;
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
  const [text, setText] = useState("");
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
          value={text}
          onChange={(e) => {
            setText(e.target.value);
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
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        ></textarea>
      )}
      <motion.label
        variants={labelVariants}
        animate={
          currentHovered == label || text.length != 0 ? "active" : "inactive"
        }
        htmlFor={`Contact-${label}`}
        initial={{ translateY: "50%" }}
      >
        {label}
      </motion.label>
    </div>
  );
}
