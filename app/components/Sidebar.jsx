import React from "react";

export default function Sidebar() {
  return (
    <aside
      style={{
        width: 64,
        background: "#f7f7fa",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 24,
        boxShadow: "2px 0 8px rgba(0,0,0,0.03)",
      }}
    >
      {/* Logo/Name */}
      <div style={{ marginBottom: 40, fontWeight: 700, fontSize: 18, letterSpacing: 1, color: "#222" }}>
      </div>
      {/* Icons */}
      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        <span style={{ fontSize: 24, cursor: "pointer" }} title="Menu">☰</span>
        <span style={{ fontSize: 24, cursor: "pointer" }} title="Bookmark">🔖</span>
        <span style={{ fontSize: 24, cursor: "pointer" }} title="Clock">⏰</span>
      </div>
      {/* Spacer */}
      <div style={{ flex: 1 }} />
    </aside>
  );
} 