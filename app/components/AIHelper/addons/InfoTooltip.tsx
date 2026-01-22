"use client";

import { useState } from "react";
import "./InfoTooltip.scss";

export default function InfoTooltip() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="info-tooltip-container"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <div className="info-icon">!</div>
      {isVisible && (
        <div className="tooltip-content">
          <h4>Why provide an email or username?</h4>
          <p>
            Providing an identifier helps keep the context of your chat history.
            This allows the AI agent to be aware of your previous conversations
            and provide more personalized and contextual responses.
          </p>
        </div>
      )}
    </div>
  );
}
