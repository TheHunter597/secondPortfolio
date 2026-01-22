"use client";

import { useState, KeyboardEvent, useRef, useEffect } from "react";
import "./ChatInput.scss";
import { flushSync } from "react-dom";
import { fuzzySearchAll, type SearchResult, type PredefinedQA } from "../utils/fuzzySearch";
import predefinedQuestions from "../data/predefinedQuestions.json";

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  isLoading: boolean;
  messagesRef: React.RefObject<HTMLDivElement>;
  onSuggestionSelect?: (qa: PredefinedQA) => void;
  learnedVersion?: number;
}

export default function ChatInput({
  onSendMessage,
  isLoading,
  messagesRef,
  onSuggestionSelect,
  learnedVersion = 0,
}: ChatInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [useUpdate, setUseUpdate] = useState(false);
  const [suggestions, setSuggestions] = useState<SearchResult[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [learnedQuestions, setLearnedQuestions] = useState<PredefinedQA[]>([]);
  const [suggestionsOpen, setSuggestionsOpen] = useState(true);
  const [suggestionsClosedByUser, setSuggestionsClosedByUser] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Load learned questions on mount and whenever learnedVersion changes
  useEffect(() => {
    const loadLearnedQuestions = async () => {
      try {
        const response = await fetch('/api/ai-responses');
        if (response.ok) {
          const data = await response.json();
          setLearnedQuestions(data.qa || []);
        }
      } catch (error) {
        console.error('Error loading learned questions:', error);
      }
    };

    loadLearnedQuestions();

    // Blur the input when component mounts to prevent autofocus
    if (inputRef.current) {
      inputRef.current.blur();
    }
  }, [learnedVersion]);

  // Refresh suggestions if learned questions change while user has input
  useEffect(() => {
    if (inputValue.trim()) {
      const results = fuzzySearchAll(
        inputValue,
        predefinedQuestions.qa as PredefinedQA[],
        learnedQuestions,
        0.35,
        5
      );
      setSuggestions(results);
      setShowSuggestions(results.length > 0);
      if (results.length > 0 && !suggestionsClosedByUser) {
        setSuggestionsOpen(true);
      }
    }
  }, [learnedQuestions, suggestionsClosedByUser]);

  const handleInputChange = (value: string) => {
    setInputValue(value);

    if (value.trim()) {
      const results = fuzzySearchAll(
        value,
        predefinedQuestions.qa as PredefinedQA[],
        learnedQuestions,
        0.35,
        5
      );
      setSuggestions(results);
      setShowSuggestions(results.length > 0);
      if (results.length > 0 && !suggestionsClosedByUser) {
        setSuggestionsOpen(true);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSend = () => {
    if (inputValue.trim() && !isLoading) {
      onSendMessage(inputValue.trim());
      setInputValue("");
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (qa: PredefinedQA) => {
    setInputValue(qa.question);
    setSuggestions([]);
    setShowSuggestions(false);
    
    // Scroll to show messages
    setTimeout(() => {
      messagesRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }, 0);
    
    if (onSuggestionSelect) {
      onSuggestionSelect(qa);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-input-wrapper">
      {!suggestionsOpen && suggestions.length > 0 && (
        <button
          className="suggestions-toggle"
          onClick={() => {
            setSuggestionsOpen(true);
            setSuggestionsClosedByUser(false);
          }}
          aria-label="Show suggestions"
        >
          ↑ suggestions available
        </button>
      )}
      {showSuggestions && suggestions.length > 0 && suggestionsOpen && (
        <div className="suggestions-dropdown">
          <button
            className="suggestions-close"
            aria-label="Hide suggestions"
            onClick={() => {
              setSuggestionsOpen(false);
              setSuggestionsClosedByUser(true);
            }}
          >
            ×
          </button>
          {suggestions.map((result) => (
            <button
              key={result.qa.id}
              className="suggestion-item"
              onClick={() => handleSuggestionClick(result.qa)}
              title={result.qa.question}
            >
              <span className="suggestion-text">{result.qa.question}</span>
              <span className="suggestion-confidence">
                {Math.round(result.score * 100)}%
              </span>
            </button>
          ))}
        </div>
      )}
      <div className="chat-input-container">
        <textarea
          ref={inputRef}
          name="message"
          className="chat-input"
          placeholder="Type your message..."
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
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
    </div>
  );
}
