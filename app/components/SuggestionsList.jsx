import React, { useEffect, useRef, useState } from "react";

const ITEM_HEIGHT = 56; // px
const AUTO_SCROLL_INTERVAL = 4000; // ms
const PAUSE_DURATION = 7000; // ms

export default function SuggestionsList({ suggestions, activeId, onSelect }) {
  // Internal state for auto-scroll
  const [internalActive, setInternalActive] = useState(activeId || suggestions[0].id);
  const [isPaused, setIsPaused] = useState(false);
  const pauseTimeout = useRef(null);

  // Auto-scroll effect
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setInternalActive(prev => {
        const idx = suggestions.findIndex(item => item.id === prev);
        const nextIdx = (idx + 1) % suggestions.length;
        return suggestions[nextIdx].id;
      });
    }, AUTO_SCROLL_INTERVAL);
    return () => clearInterval(interval);
  }, [isPaused, suggestions]);

  // Sync with external activeId
  useEffect(() => {
    if (activeId !== internalActive) setInternalActive(activeId);
  }, [activeId]);

  // Notify parent on change
  useEffect(() => {
    if (onSelect) onSelect(internalActive);
    // eslint-disable-next-line
  }, [internalActive]);

  // Pause auto-scroll on user click
  function handleClick(id) {
    setInternalActive(id);
    setIsPaused(true);
    if (pauseTimeout.current) clearTimeout(pauseTimeout.current);
    pauseTimeout.current = setTimeout(() => setIsPaused(false), PAUSE_DURATION);
    if (onSelect) onSelect(id);
  }

  // Find the index of the active item
  const idx = suggestions.findIndex(item => item.id === internalActive);
  // Get the visible items: one above and the active
  const visible = [];
  if (idx > 0) visible.push({ ...suggestions[idx - 1], offset: -1 });
  if (idx >= 0) visible.push({ ...suggestions[idx], offset: 0 });

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 480,
        minHeight: ITEM_HEIGHT * visible.length,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: 0,
        background: "transparent",
        zIndex: 11,
        overflow: "hidden",
        padding: 0,
      }}
    >
      {visible.map((item, i) => {
        const isActive = item.offset === 0;
        return (
          <button
            key={item.id}
            onClick={() => handleClick(item.id)}
            style={{
              background: isActive
                ? "linear-gradient(90deg, #ff4ecd, #ffb86c)"
                : "#fff",
              color: isActive ? "#fff" : "#bbb",
              border: "none",
              borderRadius: 24,
              padding: "12px 24px",
              fontWeight: 500,
              cursor: "pointer",
              boxShadow: isActive
                ? "0 2px 8px rgba(255,78,205,0.08)"
                : undefined,
              fontSize: isActive ? 18 : 15,
              opacity: isActive ? 1 : 0.55,
              transform: isActive ? "scale(1)" : "scale(0.96)",
              marginBottom: isActive ? 0 : 8,
              marginTop: isActive ? 0 : 0,
              transition: "background 0.3s, color 0.3s, font-size 0.3s, opacity 0.3s, transform 0.3s",
              width: "100%",
              whiteSpace: "nowrap",
            }}
          >
            {item.question}
          </button>
        );
      })}
    </div>
  );
} 