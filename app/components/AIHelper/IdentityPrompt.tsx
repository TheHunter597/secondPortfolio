"use client";

import { useState, KeyboardEvent, ChangeEvent } from "react";
import "./IdentityPrompt.scss";

interface IdentityPromptProps {
  onIdentitySet: (id: string) => void;
}

export default function IdentityPrompt({ onIdentitySet }: IdentityPromptProps) {
  const [inputValue, setInputValue] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);

  const generateRandomId = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 12; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    }
    return result;
  };

  const handleSubmit = () => {
    if (inputValue.trim()) {
      const id = inputValue.trim();
      localStorage.setItem("ai-helper-id", id);
      onIdentitySet(id);
    }
  };

  const handleChatAnonymously = () => {
    const randomId = generateRandomId();
    localStorage.setItem("ai-helper-id", randomId);
    onIdentitySet(randomId);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      handleSubmit();
    }
  };

  return (
    <div className="identity-prompt">
      <div className="identity-prompt-content">
        <div className="identity-header">
          <h3>Welcome to AI Helper!</h3>
          <div
            className="info-icon"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            !
            {showTooltip && (
              <div className="info-tooltip">
                <strong>
                  Why provide email, username, or special identifier?
                </strong>
                <p>
                  This helps keep context of your chat history, allowing the AI
                  agent to be aware of your previous conversations and provide
                  more personalized assistance.
                </p>
              </div>
            )}
          </div>
        </div>

        <p className="identity-description">
          Please provide your email, username, or any special identifier to
          continue.
        </p>

        <div className="identity-input-group">
          <input
            type="text"
            className="identity-input"
            placeholder="Enter email, username, or identifier..."
            value={inputValue}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setInputValue(e.target.value)
            }
            onKeyPress={handleKeyPress}
          />
          <button
            className="identity-submit-btn"
            onClick={handleSubmit}
            disabled={!inputValue.trim()}
          >
            Continue
          </button>
        </div>

        <div className="identity-divider">
          <span>or</span>
        </div>

        <button
          className="identity-anonymous-btn"
          onClick={handleChatAnonymously}
        >
          Chat without entering email or username
        </button>

        <p className="identity-note">
          An anonymous identifier will be stored locally for context continuity.
        </p>
      </div>
    </div>
  );
}
