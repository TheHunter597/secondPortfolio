"use client";

import { useState } from "react";
import InfoTooltip from "./InfoTooltip";
import "./IdentificationModal.scss";

interface IdentificationModalProps {
  onSubmit: (identifier: string) => void;
  onSkip: () => void;
}

export default function IdentificationModal({
  onSubmit,
  onSkip,
}: IdentificationModalProps) {
  const [identifier, setIdentifier] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (identifier.trim()) {
      onSubmit(identifier.trim());
    }
  };

  return (
    <div className="identification-modal-overlay">
      <div className="identification-modal">
        <div className="modal-header">
          <div className="modal-title-with-info">
            <h3>Welcome to AI Helper!</h3>
            <InfoTooltip />
          </div>
          <p>
            Please enter your email, username, or any special identifier to help
            us personalize your experience.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="input-group">
            <label htmlFor="identifier">
              Email, Username, or Special Identifier
            </label>
            <input
              type="text"
              id="identifier"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="e.g., john@example.com or john_doe123"
            />
            <span className="input-hint">
              This can be your email, a unique username, or any special set of
              characters
            </span>
          </div>

          <div className="modal-actions">
            <button
              type="submit"
              className="submit-button"
              disabled={!identifier.trim()}
            >
              Continue with Identifier
            </button>
            <button type="button" className="skip-button" onClick={onSkip}>
              Chat Without Entering Identifier
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
