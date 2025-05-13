import React from "react";

export default function DisplayContainer({ qa }) {
  if (!qa) return null;
  return (
    <div
      style={{
        minHeight: 360,
        minWidth: 360,
        maxWidth: 480,
        margin: "0 auto",
        borderRadius: 24,
        background: "#fff",
        padding: 32,
        boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
        border: "4px solid",
        borderImage: "linear-gradient(90deg, #ff4ecd, #ffb86c) 1",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 16, color: "#ff4ecd" }}>Alatar's Response</div>
      <div style={{ fontSize: 16, color: "#333", marginBottom: 16 }}>{qa.answer}</div>
      {qa.image && (
        <img src={qa.image} alt="answer visual" style={{ maxWidth: 320, borderRadius: 12, marginBottom: 12 }} />
      )}
      {qa.graph && (
        <div style={{ width: 320, height: 180, background: "#f7f7fa", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", color: "#bbb" }}>
          [Graph Placeholder]
        </div>
      )}
    </div>
  );
} 