import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaPaperPlane ,FaPaperclip} from "react-icons/fa";

export default function CenterInput({ value, onChange, onSend, disabled, chatHistory = [], isAwaitingBlocks, hideChatHistory = false }) {
  const [showHistory, setShowHistory] = useState(false);
  const [historyVisible, setHistoryVisible] = useState(chatHistory.length > 0);
  const [historyHover, setHistoryHover] = useState(false);

  // Border animation is controlled by isAwaitingBlocks
  const isAnimating = !!isAwaitingBlocks;

  // Delay hiding chat history after mouse leave
  const hideHistoryTimeout = useRef();

  const handleShowHistory = () => {
    if (hideHistoryTimeout.current) clearTimeout(hideHistoryTimeout.current);
    setShowHistory(true);
  };
  const handleHideHistory = () => {
    hideHistoryTimeout.current = setTimeout(() => setShowHistory(false), 1000);
  };

  useEffect(() => {
    return () => { if (hideHistoryTimeout.current) clearTimeout(hideHistoryTimeout.current); };
  }, []);

  const handleSend = () => {
    if (value.trim()) {
      onSend();
      // Stop the border animation after 8 seconds
      setTimeout(() => {
        // This is a placeholder for the animation logic
      }, 9000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !disabled) {
      handleSend();
    }
  };

  // Inline keyframes for border color transition
  const borderKeyframes = `
    @keyframes borderColorTransition {
      0% { border-color: #6ee7ff; box-shadow: 0 0 0 4px rgba(110, 231, 255, 0.1); background-position: 0% 50%; }
      25% { border-color: #a259ff; box-shadow: 0 0 0 4px rgba(162, 89, 255, 0.1); background-position: 50% 50%; }
      50% { border-color: #ff4ecd; box-shadow: 0 0 0 4px rgba(255, 78, 205, 0.1); background-position: 100% 50%; }
      75% { border-color:rgb(110, 255, 182); box-shadow: 0 0 0 4px rgba(110, 231, 255, 0.1); background-position: 50% 50%; }
      100% { border-color:rgb(255, 231, 110); box-shadow: 0 0 0 4px rgba(110, 231, 255, 0.1); background-position: 0% 50%; }
    }
    @keyframes gradientMoveChatBubble {
      0% { background-position: 0% 50%; }
      25% { background-position: 50% 50%; }
      50% { background-position: 100% 50%; }
      75% { background-position: 50% 50%; }
      100% { background-position: 0% 50%; }
    }
    .custom-history-scroll::-webkit-scrollbar { display: none; }
    .custom-history-scroll { scrollbar-width: none; -ms-overflow-style: none; }
  `;

  // Default and expanded heights for chat history
  const defaultHistoryHeight = 180;
  const expandedHistoryHeight = 400;

  // Delay showing chat history for 5 seconds after a new query is submitted
  useEffect(() => {
    if (chatHistory.length === 0) {
      setHistoryVisible(false);
      return;
    }
    setHistoryVisible(false);
    const timer = setTimeout(() => setHistoryVisible(true), 5000);
    return () => clearTimeout(timer);
  }, [chatHistory.length]);

  return (
    <>
      <style>{borderKeyframes}</style>
      <div style={{ position: "relative", width: "100%" }}
        tabIndex={-1}
        onMouseEnter={handleShowHistory}
        onMouseLeave={handleHideHistory}
      >
        {/* Chat History Panel */}
        {!hideChatHistory && (
          <div
            className="custom-history-scroll"
            onMouseEnter={() => setHistoryHover(true)}
            onMouseLeave={() => setHistoryHover(false)}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: "100%",
              marginBottom: 12,
              maxHeight: showHistory ? (historyHover ? expandedHistoryHeight : defaultHistoryHeight) : 0,
              opacity: showHistory ? 1 : 0,
              pointerEvents: showHistory ? "auto" : "none",
              transform: showHistory ? "translateY(0) scaleY(1)" : "translateY(20px) scaleY(0.8)",
              transition: "opacity 0.5s cubic-bezier(.4,2,.6,1), transform 0.5s cubic-bezier(.4,2,.6,1), max-height 1.2s cubic-bezier(.4,2,.6,1)",
              background: "rgba(255,255,255,0.85)",
              boxShadow: "0 8px 32px 0 rgba(160,120,255,0.18)",
              borderRadius: 22,
              overflow: "hidden",
              overflowY: "auto",
              filter: "blur(0.5px)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1.5px solid #eaeaf5",
              zIndex: 10,
              padding: showHistory ? "18px 22px 16px 22px" : "0 22px",
              display: chatHistory.length === 0 ? "none" : "block",
              boxSizing: "border-box",
              position: "absolute",
              WebkitMaskImage: "linear-gradient(to bottom, transparent 0px, #000 24px, #000 calc(100% - 24px), transparent 100%)",
              maskImage: "linear-gradient(to bottom, transparent 0px, #000 24px, #000 calc(100% - 24px), transparent 100%)"
            }}
          >
            {chatHistory.slice(-10).map((item, idx) => (
              <div key={idx} style={{ display: "flex", flexDirection: "column", alignItems: "stretch", marginBottom: 18, gap: 8 }}>
                {/* Query bubble (top, right-aligned) */}
                <div style={{
                  background: "linear-gradient(270deg, #a259ff, #6ee7ff, #ff4ecd, #ffb86c, #a259ff)",
                  color: "#fff",
                  borderRadius: "24px 24px 24px 24px",
                  padding: "12px 12px",
                  fontSize: 14,
                  maxWidth: "90%",
                  marginLeft: "auto",
                  boxShadow: "0 2px 8px #a259ff22",
                  textAlign: "right",
                  whiteSpace: "pre-line",
                  backgroundSize: "400% 400%",
                  animation: "gradientMoveChatBubble 18s ease-in-out infinite"
                }}>{item.question}</div>
                {/* Answer bubble (bottom, left-aligned) */}
                <div style={{
                  background: "rgba(240,240,240,0.97)",
                  color: "#444",
                  borderRadius: "18px 10px 10px 18px",
                  padding: "12px 12px",
                  fontSize: 14,
                  maxWidth: "70%",
                  boxShadow: "0 2px 8px #a259ff11",
                  marginRight: "auto",
                  lineHeight: 1.7,
                }}>{item.answer}</div>
              </div>
            ))}
          </div>
        )}
        {/* Input Area */}
        <div style={{
          display: "flex",
          alignItems: "center",
          background: "#f9f9f9",
          borderRadius: 24,
          border: `2px solid ${isAnimating ? '#6ee7ff' : '#e5e5e5'}`,
          boxShadow: isAnimating 
            ? "0 4px 32px rgba(162, 89, 255, 0.12)" 
            : "0 4px 24px rgba(0, 0, 0, 0.08)",
          padding: "2px 16px",
          animation: isAnimating ? "borderColorTransition 5s linear infinite" : "none",
          transition: "all 0.3s ease",
          position: "relative"
        }}>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={disabled}
            placeholder="Ask me anything..."
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              background: "transparent",
              fontSize: 16,
              padding: "12px 16px",
              color: "#333"
            }}
          />
          <motion.button
            onClick={handleSend}
            disabled={disabled || !value.trim()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: value.trim() 
                ? "linear-gradient(135deg, #a259ff, #ff4ecd)" 
                : "#f0f0f0",
              color: value.trim() ? "#fff" : "#999",
              border: "none",
              borderRadius: 20,
              padding: "10px 20px",
              cursor: value.trim() ? "pointer" : "not-allowed",
              fontWeight: 600,
              fontSize: 14,
              transition: "all 0.2s ease"
            }}
          >
            <FaPaperPlane />
          </motion.button>
          <FaPaperclip style={{marginLeft: 10, marginRight: 10,fontSize: 16,color: "#999"}} />
        </div>
        {/* Audio Icon Floating Button */}
        <button
          style={{
            position: "absolute",
            right: -48,
            top: "50%",
            transform: "translateY(-50%)",
            background: "#000",
            border: "none",
            borderRadius: "50%",
            width: 36,
            height: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: 4,
            cursor: "pointer",
            boxShadow: "0 2px 8px #0002"
          }}
          aria-label="Record audio"
        >
          <img
            src="/audio.jpeg"
            alt="audio icon"
            style={{
              width: 24,
              height: 24,
              borderRadius: "50%",
              objectFit: "cover",
              display: "block"
            }}
          />
        </button>
      </div>
    </>
  );
} 