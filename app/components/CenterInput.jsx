import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa";

export default function CenterInput({ value, onChange, onSend, disabled }) {
  const [isAnimating, setIsAnimating] = useState(false);

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

  return (
    <>
      <style>{borderKeyframes}</style>
      <div style={{ position: "relative", width: "100%" }}>
       
        <div style={{
          display: "flex",
          alignItems: "center",
          background: "#fff",
          borderRadius: 24,
          border: `2px solid ${isAnimating ? '#6ee7ff' : '#e5e5e5'}`,
          boxShadow: isAnimating 
            ? "0 4px 32px rgba(162, 89, 255, 0.12)" 
            : "0 4px 24px rgba(0, 0, 0, 0.08)",
          padding: "8px 16px",
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