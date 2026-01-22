"use client";

import { useRef, useState} from "react";
import AIHelperButton from "./AIHelperButton";
import ChatWindow, { type ChatWindowProps } from "./Chat/ChatWindow";
import AIHelperTooltip from "./addons/AIHelperTooltip";
import "./AIHelper.scss";
import { type PredefinedQA } from "./utils/fuzzySearch";
import { saveQAAction } from "./actions/saveQAAction";
import { flushSync } from "react-dom";

export interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
  isPredefined?: boolean;
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
  const [learnedVersion, setLearnedVersion] = useState(0);
  const saveFormRef = useRef<HTMLFormElement>(null);
  const [pendingQuestion, setPendingQuestion] = useState<string>("");
  const [pendingAnswer, setPendingAnswer] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // const initialState =  {id:"",text:"",sender:"ai",timestamp:new Date()} as const ;
  
  // const [state, formAction, isPending] = useFormState(AIHelperAction,{message: initialState});

  const toggleChat = () => {
    if (!isOpen && !userId) {
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

  const handleSuggestionSelected = (qa: PredefinedQA) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: qa.question,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: qa.answer,
      sender: "ai",
      timestamp: new Date(),
      isPredefined: true,
    };
    
    setTimeout(() => {
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 300);
  };

  const sendMessage = async (text: string) => {
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

      // Submit hidden server action form to save directly to file
      try {
        flushSync(()=>{
          setPendingQuestion(text);
          setPendingAnswer(messageText);
        })
        // Programmatically submit server action form
        saveFormRef.current?.requestSubmit();
        // Optimistically bump learned version so suggestions can refresh
        setLearnedVersion((v) => v + 1);
      } catch (saveError) {
        console.error('Error triggering save action:', saveError);
      }

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
      {/* Hidden form to save Q&A directly via server action without API */}
      <form action={saveQAAction} ref={saveFormRef} style={{ display: "none" }}>
        <input type="hidden" name="question" value={pendingQuestion} />
        <input type="hidden" name="answer" value={pendingAnswer} />
      </form>
      {isOpen && (
        <ChatWindow
          {...({
            messages,
            onSendMessage: sendMessage,
            onSuggestionSelected: handleSuggestionSelected,
            learnedVersion,
            onClose: toggleChat,
            isLoading,
            messagesEndRef,
            showIdentificationModal,
            onIdentifierSubmit: handleIdentifierSubmit,
            onSkipIdentification: handleSkipIdentification,
          } satisfies ChatWindowProps)}
        />
      )}
        <AIHelperTooltip onNeverShowAgain={handleTooltipNeverShowAgain} />
      <AIHelperButton onClick={toggleChat} isOpen={isOpen} />
    </div>
  );
}
