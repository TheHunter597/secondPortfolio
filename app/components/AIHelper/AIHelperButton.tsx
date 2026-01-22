"use client";

import "./AIHelperButton.scss";

interface AIHelperButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

export default function AIHelperButton({
  onClick,
  isOpen,
}: AIHelperButtonProps) {
  return (
    <div className="ai-helper-button-wrapper">
      {!isOpen && <span className="ai-helper-label cursor-pointer"
              onClick={onClick}
      >Open AI Helper</span>}
      <button
        className={`ai-helper-button ${isOpen ? "open" : ""}`}
        onClick={onClick}
        aria-label="Toggle AI Helper"
      >
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="robot-icon"
          >
            {/* Robot head */}
            <rect x="5" y="4" width="14" height="16" rx="2" ry="2"></rect>
            {/* Eyes */}
            <circle cx="9" cy="10" r="1.5"></circle>
            <circle cx="15" cy="10" r="1.5"></circle>
            {/* Antenna */}
            <line x1="12" y1="4" x2="12" y2="2"></line>
            <circle cx="12" cy="2" r="1"></circle>
            {/* Mouth */}
            <path d="M9 15h6"></path>
          </svg>
        )}
      </button>
    </div>
  );
}
