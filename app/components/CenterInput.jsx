import React from "react";

export default function CenterInput({ value, onChange, onSend, disabled }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      background: "#fff",
      borderRadius: 32,
      boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      padding: "8px 24px",
      width: 480,
      margin: "0 auto"
    }}>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Message Alatar..."
        style={{
          flex: 1,
          border: "none",
          outline: "none",
          fontSize: 18,
          background: "transparent",
          color: "#222"
        }}
        disabled={disabled}
        onKeyDown={e => {
          if (e.key === "Enter" && !e.shiftKey && value.trim() && !disabled) {
            e.preventDefault();
            onSend();
          }
        }}
      />
      <button
        onClick={onSend}
        disabled={disabled || !value.trim()}
        style={{
          background: "linear-gradient(90deg, #ff4ecd, #ffb86c)",
          border: "none",
          borderRadius: "50%",
          width: 40,
          height: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginLeft: 12,
          cursor: disabled ? "not-allowed" : "pointer",
          opacity: disabled ? 0.5 : 1
        }}
        tabIndex={-1}
      >
        <span role="img" aria-label="send" style={{ fontSize: 20, color: "#fff" }}>➤</span>
      </button>
    </div>
  );
} 