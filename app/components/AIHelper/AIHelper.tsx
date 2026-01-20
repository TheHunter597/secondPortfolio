"use client";

import { useState } from "react";
import AIHelperButton from "./AIHelperButton";
import ChatWindow from "./ChatWindow";
import "./AIHelper.scss";

export interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

export default function AIHelper() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };
  const sendMessage = async (text: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://thehunter597.app.n8n.cloud/webhook-test/d140614e-e932-4679-8da6-122b4b8ccc6f",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: text }),
        },
      );

      const data = await response.json();

      // Parse the n8n response format: { "response": "..." }
      let messageText = "Thank you for your message!";

      if (data.response) {
        try {
          // The response field contains a JSON string, parse it
          const parsedResponse =
            typeof data.response === "string"
              ? JSON.parse(data.response)
              : data.response;
          messageText = parsedResponse;
        } catch (e) {
          // If parsing fails, use the response as is
          messageText = data.response;
        }
      } else if (data.message) {
        messageText = data.message;
      }

      // Add AI response
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: messageText,
        sender: "ai",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I couldn't process your request. Please try again.",
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="ai-helper-container">
      {isOpen && (
        <ChatWindow
          messages={messages}
          onSendMessage={sendMessage}
          onClose={toggleChat}
          isLoading={isLoading}
        />
      )}
      <AIHelperButton onClick={toggleChat} isOpen={isOpen} />
    </div>
  );
}
