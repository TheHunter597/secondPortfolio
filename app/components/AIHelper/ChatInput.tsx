"use client";

import { useState, KeyboardEvent, useRef, useEffect } from "react";
import "./ChatInput.scss";
import { flushSync } from "react-dom";

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  isLoading: boolean;
  messagesRef: React.RefObject<HTMLDivElement>;
}

export default function ChatInput({
  onSendMessage,
  isLoading,
  messagesRef,
}: ChatInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [useUpdate, setUseUpdate] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Blur the input when component mounts to prevent autofocus
    if (inputRef.current) {
      inputRef.current.blur();
    }
  }, []);
  const handleSend = () => {
    if (inputValue.trim() && !isLoading) {
      onSendMessage(inputValue.trim());
      setInputValue("");
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-input-container">
      <textarea
        ref={inputRef}
        name="message"
        className="chat-input"
        placeholder="Type your message..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyPress}
        disabled={isLoading}
        rows={1}
        autoFocus={false}
      />
      <button
        className="send-button"
        onClick={()=>{
          handleSend();
          flushSync(()=>{
            setUseUpdate(true);
          })
          
          messagesRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "end",
          });
     
        }}
        disabled={!inputValue.trim() || isLoading}
        aria-label="Send message"

      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
      </button>
    </div>
  );
}
