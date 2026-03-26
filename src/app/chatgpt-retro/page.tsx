"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./ai-chat.module.css";

// Types
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  lastActive: Date;
}

interface Suggestion {
  id: string;
  text: string;
  icon: string;
}

// Mock data
const mockConversations: Conversation[] = [
  {
    id: "1",
    title: "Creative Writing Help",
    messages: [
      {
        id: "1-1",
        role: "user",
        content: "Can you help me write a short story about a lighthouse keeper?",
        timestamp: new Date(Date.now() - 3600000),
      },
      {
        id: "1-2",
        role: "assistant",
        content: "Of course! I'd love to help you with that. What tone are you going for - mysterious, heartwarming, or perhaps something more melancholic? And how long would you like the story to be?",
        timestamp: new Date(Date.now() - 3500000),
      },
    ],
    lastActive: new Date(Date.now() - 3500000),
  },
  {
    id: "2",
    title: "Python Code Review",
    messages: [
      {
        id: "2-1",
        role: "user",
        content: "Can you review my Python code for a data processing pipeline?",
        timestamp: new Date(Date.now() - 86400000),
      },
      {
        id: "2-2",
        role: "assistant",
        content: "I'd be happy to help review your code! Please share the relevant files or snippets, and let me know what specific aspects you'd like me to focus on - performance, readability, error handling, or all of the above?",
        timestamp: new Date(Date.now() - 86300000),
      },
    ],
    lastActive: new Date(Date.now() - 86300000),
  },
  {
    id: "3",
    title: "Travel Recommendations",
    messages: [
      {
        id: "3-1",
        role: "user",
        content: "What are some hidden gems in Japan worth visiting?",
        timestamp: new Date(Date.now() - 172800000),
      },
      {
        id: "3-2",
        role: "assistant",
        content: "Japan has so many wonderful hidden gems! Here are some lesser-known places that offer unique experiences...",
        timestamp: new Date(Date.now() - 172700000),
      },
    ],
    lastActive: new Date(Date.now() - 172700000),
  },
  {
    id: "4",
    title: "Meal Prep Ideas",
    messages: [],
    lastActive: new Date(Date.now() - 259200000),
  },
  {
    id: "5",
    title: "Project Planning",
    messages: [],
    lastActive: new Date(Date.now() - 345600000),
  },
];

const suggestions: Suggestion[] = [
  { id: "s1", text: "Help me write creative content", icon: "✍️" },
  { id: "s2", text: "Analyze and debug code", icon: "🔍" },
  { id: "s3", text: "Explain a complex topic", icon: "💡" },
  { id: "s4", text: "Brainstorm ideas", icon: "🧠" },
];

const aiResponses = [
  "I'd be happy to help with that! Let me think through this carefully and provide you with a thoughtful response.",
  "That's a great question. Here's what I can tell you based on my understanding...",
  "Absolutely! Let me break this down into clear steps for you.",
  "Interesting perspective! Here's an alternative way to think about it...",
];

export default function AIChatInterface() {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Get active conversation
  const activeConversation = conversations.find((c) => c.id === activeConversationId);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSendMessage = async (content?: string) => {
    const messageContent = content || inputValue.trim();
    if (!messageContent) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageContent,
      timestamp: new Date(),
    };

    let currentConvId = activeConversationId;
    if (!currentConvId) {
      const newConversation: Conversation = {
        id: Date.now().toString(),
        title: messageContent.slice(0, 30) + (messageContent.length > 30 ? "..." : ""),
        messages: [userMessage],
        lastActive: new Date(),
      };
      setConversations((prev) => [newConversation, ...prev]);
      currentConvId = newConversation.id;
      setActiveConversationId(currentConvId);
    } else {
      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === currentConvId
            ? { ...conv, messages: [...conv.messages, userMessage], lastActive: new Date() }
            : conv
        )
      );
    }

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);

      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === currentConvId
            ? { ...conv, messages: [...conv.messages, aiMessage], lastActive: new Date() }
            : conv
        )
      );
    }, 1500 + Math.random() * 1000);
  };

  const handleNewChat = () => {
    setActiveConversationId(null);
    setMessages([]);
    inputRef.current?.focus();
  };

  const handleSelectConversation = (id: string) => {
    const conv = conversations.find((c) => c.id === id);
    if (conv) {
      setActiveConversationId(id);
      setMessages(conv.messages);
    }
  };

  const handleSuggestionClick = (text: string) => {
    handleSendMessage(text);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={styles.chatContainer}>
      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.open : styles.closed}`}>
        <div className={styles.sidebarHeader}>
          <button className={styles.newChatBtn} onClick={handleNewChat}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            New chat
          </button>
        </div>

        <div className={styles.sidebarContent}>
          <div className={styles.conversationsLabel}>Recent</div>
          <nav className={styles.conversationsList}>
            {conversations.map((conv) => (
              <button
                key={conv.id}
                className={`${styles.conversationItem} ${activeConversationId === conv.id ? styles.active : ""}`}
                onClick={() => handleSelectConversation(conv.id)}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <span className={styles.conversationTitle}>{conv.title}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className={styles.sidebarFooter}>
          <div className={styles.userInfo}>
            <div className={styles.userAvatar}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <span>Guest</span>
          </div>
        </div>
      </aside>

      {/* Main Chat */}
      <main className={styles.chatMain}>
        <header className={styles.chatHeader}>
          <button
            className={styles.menuToggle}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <div className={styles.headerBrand}>
            <h1>Chat</h1>
          </div>
        </header>

        <div className={styles.messagesContainer}>
          {messages.length === 0 && !activeConversation ? (
            <div className={styles.welcomeScreen}>
              <div className={styles.welcomeIcon}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="#10a37f" strokeWidth="1.5" />
                  <path d="M12 8v8M8 12h8" stroke="#10a37f" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <h2>How can I help you today?</h2>
              <p>I can help you write, analyze, or brainstorm anything</p>

              <div className={styles.suggestionsGrid}>
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion.id}
                    className={styles.suggestionCard}
                    onClick={() => handleSuggestionClick(suggestion.text)}
                  >
                    <span className={styles.suggestionIcon}>{suggestion.icon}</span>
                    <span className={styles.suggestionText}>{suggestion.text}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : messages.length === 0 && activeConversation ? (
            <div className={styles.emptyConversation}>
              <p>Select a conversation to continue...</p>
            </div>
          ) : (
            <div className={styles.messagesList}>
              {messages.map((message) => (
                <div key={message.id} className={`${styles.message} ${message.role}`}>
                  <div className={styles.messageAvatar}>
                    {message.role === "assistant" ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                        <path d="M12 8v8M8 12h8" strokeLinecap="round" />
                      </svg>
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    )}
                  </div>
                  <div className={styles.messageContent}>
                    <div className={styles.messageBubble}>
                      <p>{message.content}</p>
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className={`${styles.message} ${styles.assistant}`}>
                  <div className={styles.messageAvatar}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <path d="M12 8v8M8 12h8" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div className={styles.messageContent}>
                    <div className={styles.typingIndicator}>
                      <span className={styles.typingDot}></span>
                      <span className={styles.typingDot}></span>
                      <span className={styles.typingDot}></span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input */}
        <div className={styles.inputContainer}>
          <div className={styles.inputWrapper}>
            <textarea
              ref={inputRef}
              className={styles.messageInput}
              placeholder="Send a message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
            />
            <button
              className={styles.sendButton}
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim() || isTyping}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
          <p className={styles.inputHint}>AI can make mistakes. Please check important info.</p>
        </div>
      </main>
    </div>
  );
}
