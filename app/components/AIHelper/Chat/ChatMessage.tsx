"use client";

import type { Message } from "../AIHelper";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./ChatMessage.scss";

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className={`chat-message ${message.sender}`}>
      <div className="message-content">
        <div className="message-text">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {message.text}
          </ReactMarkdown>
        </div>
        <span className="message-time">{formatTime(message.timestamp)}</span>
      </div>
    </div>
  );
}
