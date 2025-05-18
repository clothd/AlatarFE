import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa";

export default function CenterInput({ value, onChange, onSend, disabled, chatHistory = [] }) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [historyVisible, setHistoryVisible] = useState(chatHistory.length > 0);

  const handleSend = () => {
    if (value.trim()) {
      setIsAnimating(true);
      onSend();
      
      // Stop the border animation after 5 seconds
      setTimeout(() => {
        setIsAnimating(false);
      }, 5000);
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
      0% { border-color: #6ee7ff; box-shadow: 0 0 0 4px rgba(110, 231, 255, 0.1); }
      25% { border-color: #a259ff; box-shadow: 0 0 0 4px rgba(162, 89, 255, 0.1); }
      50% { border-color: #ff4ecd; box-shadow: 0 0 0 4px rgba(255, 78, 205, 0.1); }
      75% { border-color: #6ee7ff; box-shadow: 0 0 0 4px rgba(110, 231, 255, 0.1); }
      100% { border-color: #6ee7ff; box-shadow: 0 0 0 4px rgba(110, 231, 255, 0.1); }
    }
  `;

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
        onMouseEnter={() => historyVisible && setShowHistory(true)}
        onMouseLeave={() => setShowHistory(false)}
        onFocus={() => historyVisible && setShowHistory(true)}
        onBlur={() => setShowHistory(false)}
        tabIndex={-1}
      >
        {/* Chat History Panel */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: "100%",
            marginBottom: 12,
            maxHeight: showHistory ? 180 : 0,
            opacity: showHistory ? 1 : 0,
            pointerEvents: showHistory ? "auto" : "none",
            transform: showHistory ? "translateY(0) scaleY(1)" : "translateY(20px) scaleY(0.8)",
            transition: "opacity 0.35s cubic-bezier(.4,2,.6,1), transform 0.35s cubic-bezier(.4,2,.6,1), max-height 0.35s cubic-bezier(.4,2,.6,1)",
            background: "rgba(255,255,255,0.85)",
            boxShadow: "0 8px 32px 0 rgba(160,120,255,0.18)",
            borderRadius: 18,
            overflow: "hidden",
            overflowY: "auto",
            filter: "blur(0.5px)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            border: "1.5px solid #eaeaf5",
            zIndex: 10,
            padding: showHistory ? "16px 18px 12px 18px" : "0 18px",
            display: chatHistory.length === 0 ? "none" : "block",
          }}
        >
          {chatHistory.slice(-10).map((item, idx) => (
            <div key={idx} style={{ marginBottom: 14, padding: 0 }}>
              <div style={{ fontWeight: 600, color: "#a259ff", fontSize: 13, marginBottom: 2 }}>
                {item.question}
              </div>
              <div style={{ color: "#444", fontSize: 13, background: "rgba(245,245,255,0.7)", borderRadius: 10, padding: "7px 12px", boxShadow: "0 2px 8px #a259ff11" }}>
                {item.answer}
              </div>
            </div>
          ))}
        </div>
        {/* Input Area */}
        <div style={{
          display: "flex",
          alignItems: "center",
          background: "#fff",
          borderRadius: 24,
          border: `2px solid ${isAnimating ? '#6ee7ff' : '#e5e5e5'}`,
          boxShadow: isAnimating 
            ? "0 4px 32px rgba(162, 89, 255, 0.12)" 
            : "0 4px 24px rgba(0, 0, 0, 0.08)",
          padding: "2px 16px",
          animation: isAnimating ? "borderColorTransition 5s linear" : "none",
          transition: "all 0.3s ease"
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
        </div>
      </div>
    </>
  );
} 