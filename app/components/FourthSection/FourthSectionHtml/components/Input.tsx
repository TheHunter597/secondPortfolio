import { motion } from "framer-motion";
export default function Input({
  label,
  element,
  currentHovered,
  setCurrentHovered,
  type,
  value,
  setValue,
  error,
}: {
  label: string;
  element: string;
  currentHovered: string;
  setCurrentHovered: React.Dispatch<React.SetStateAction<string>>;
  type: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  error: string;
}) {
  const isActive = currentHovered == label || value.length != 0;
  const labelVariants = {
    active: {
      y: "-180%",
      x: "-30%",
      scale: 0.9,
      color: "#6366f1",
    },
    inactive: {
      y: 0,
      scale: 1,
      color: "#94a3b8",
    },
  };
  return (
    <div className="ContactMe__Input">
      <div>
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
          animate={isActive ? "active" : "inactive"}
          htmlFor={`Contact-${label}`}
          initial={{ y: 0 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
        >
          {label}
        </motion.label>
        <small className="text-base text-red-500">{error}</small>
      </div>
    </div>
  );
}
