"use client";

import { useRef, useState} from "react";
import AIHelperButton from "./AIHelperButton";
import ChatWindow from "./ChatWindow";
import AIHelperTooltip from "./AIHelperTooltip";
import "./AIHelper.scss";

export interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

// Function to generate random 12-character string
function generateRandomId(): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 12; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export default function AIHelper() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [showIdentificationModal, setShowIdentificationModal] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // const initialState =  {id:"",text:"",sender:"ai",timestamp:new Date()} as const ;
  
  // const [state, formAction, isPending] = useFormState(AIHelperAction,{message: initialState});

  const toggleChat = () => {
    if (!isOpen && !userId) {
      // Show identification modal when opening chat for the first time
      setShowIdentificationModal(true);
    }
    setIsOpen(!isOpen);
  };

  const handleIdentifierSubmit = (identifier: string) => {
    setUserId(identifier);
    localStorage.setItem("aiHelperUserId", identifier);
    setShowIdentificationModal(false);
  };

  const handleSkipIdentification = () => {
    const anonymousId = generateRandomId();
    setUserId(anonymousId);
    localStorage.setItem("aiHelperUserId", anonymousId);
    setShowIdentificationModal(false);
  };

  const handleTooltipNeverShowAgain = () => {
    setShowTooltip(false);
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
        process.env.NEXT_PUBLIC_WEBHOOK_LINK || "",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: text, id: userId }),
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

      await new Promise((resolve) => setTimeout(resolve, 1000));

    } catch (error) {
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
    <div className="ai-helper-container ">
      {isOpen && (
        <ChatWindow
          messages={messages}
          onSendMessage={sendMessage}
          onClose={toggleChat}
          isLoading={isLoading}
          messagesEndRef={messagesEndRef}
          showIdentificationModal={showIdentificationModal}
          onIdentifierSubmit={handleIdentifierSubmit}
          onSkipIdentification={handleSkipIdentification}
        />
      )}
        <AIHelperTooltip onNeverShowAgain={handleTooltipNeverShowAgain} />
      <AIHelperButton onClick={toggleChat} isOpen={isOpen} />
    </div>
  );
}
