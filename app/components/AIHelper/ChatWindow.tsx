"use client";

import { useState, useRef, useEffect } from "react";
import type { Message } from "./AIHelper";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import "./ChatWindow.scss";

interface ChatWindowProps {
  messages: Message[];
  onSendMessage: (text: string) => void;
  onClose: () => void;
  isLoading: boolean;
}

export default function ChatWindow({
  messages,
  onSendMessage,
  onClose,
  isLoading,
}: ChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <div className="chat-header-content">
          <div className="chat-avatar">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="5" y="4" width="14" height="16" rx="2" ry="2"></rect>
              <circle cx="9" cy="10" r="1.5"></circle>
              <circle cx="15" cy="10" r="1.5"></circle>
              <line x1="12" y1="4" x2="12" y2="2"></line>
              <circle cx="12" cy="2" r="1"></circle>
              <path d="M9 15h6"></path>
            </svg>
          </div>
          <div className="chat-title">
            <h3>AI Helper</h3>
            <span className="chat-status">Online</span>
          </div>
        </div>
        <button
          className="chat-close"
          onClick={onClose}
          aria-label="Close chat"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <div className="chat-messages">
        {messages.length === 0 ? (
          <div className="chat-welcome">
            <div className="welcome-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
            <h4>Welcome to AI Helper!</h4>
            <p>I am an AI assistant Trained on Mohamed Hossam CV and Portfolio also his projects and skills</p>
          </div>
        ) : (
          messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))
        )}
        {isLoading && (
          <div className="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <ChatInput onSendMessage={onSendMessage} isLoading={isLoading} />
    </div>
  );
}
