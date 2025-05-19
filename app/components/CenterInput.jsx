import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPaperPlane ,FaPaperclip} from "react-icons/fa";

export default function CenterInput({ value, onChange, onSend, disabled, chatHistory = [], isAwaitingBlocks }) {
  const [showHistory, setShowHistory] = useState(false);
  const [historyVisible, setHistoryVisible] = useState(chatHistory.length > 0);

  // Border animation is controlled by isAwaitingBlocks
  const isAnimating = !!isAwaitingBlocks;

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
      0% { border-color: #6ee7ff; box-shadow: 0 0 0 4px rgba(110, 231, 255, 0.1); }
      25% { border-color: #a259ff; box-shadow: 0 0 0 4px rgba(162, 89, 255, 0.1); }
      50% { border-color: #ff4ecd; box-shadow: 0 0 0 4px rgba(255, 78, 205, 0.1); }
      75% { border-color:rgb(110, 255, 182); box-shadow: 0 0 0 4px rgba(110, 231, 255, 0.1); }
      100% { border-color:rgb(255, 231, 110); box-shadow: 0 0 0 4px rgba(110, 231, 255, 0.1); }
    }
    /* Hide scrollbar but keep scroll */
    .custom-history-scroll::-webkit-scrollbar { display: none; }
    .custom-history-scroll { scrollbar-width: none; -ms-overflow-style: none; }
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
          className="custom-history-scroll"
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
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1.5px solid #eaeaf5",
            zIndex: 10,
            padding: showHistory ? "16px 18px 12px 18px" : "0 18px",
            display: chatHistory.length === 0 ? "none" : "block",
            boxSizing: "border-box"
          }}
        >
          {chatHistory.slice(-10).map((item, idx) => (
            <div key={idx} style={{ display: "flex", flexDirection: "row", alignItems: "flex-end", marginBottom: 14, gap: 10 }}>
              {/* Answer bubble (left) */}
              <div style={{
                background: "rgba(240,240,240,0.95)",
                color: "#444",
                borderRadius: "16px 8px 8px 16px",
                padding: "10px 16px",
                fontSize: 14,
                maxWidth: "60%",
                boxShadow: "0 2px 8px #a259ff11",
                marginRight: "auto"
              }}>{item.answer}</div>
              {/* Query bubble (right) */}
              <div style={{
                background: "linear-gradient(90deg, #a259ff, #6ee7ff, #ff4ecd)",
                color: "#fff",
                borderRadius: "8px 16px 16px 8px",
                padding: "10px 16px",
                fontWeight: 600,
                fontSize: 14,
                maxWidth: "40%",
                marginLeft: "auto",
                boxShadow: "0 2px 8px #a259ff22",
                textAlign: "right",
                whiteSpace: "pre-line"
              }}>{item.question}</div>
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