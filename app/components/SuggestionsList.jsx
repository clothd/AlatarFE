import React, { useEffect, useRef, useState } from "react";

const ITEM_HEIGHT = 56; // px
const AUTO_SCROLL_INTERVAL = 12000; // ms
const PAUSE_DURATION = 7000; // ms

export default function SuggestionsList({ suggestions, activeId, onSelect }) {
  // Internal state for auto-scroll
  const [internalActive, setInternalActive] = useState(activeId || suggestions[0].id);
  const [isPaused, setIsPaused] = useState(false);
  const pauseTimeout = useRef(null);

  // Add animated gradient keyframes for the button
  const gradientKeyframes = `
    @keyframes gradientMoveSuggestionsBtn {
      0% { background-position: 0% 50%; }
      25% { background-position: 50% 50%; }
      50% { background-position: 100% 50%; }
      75% { background-position: 50% 50%; }
      100% { background-position: 0% 50%; }
    }
  `;

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
  // Get the visible items: two above and the active, with looping
  const visible = [];
  const total = suggestions.length;
  for (let offset = -2; offset <= 0; offset++) {
    const i = (idx + offset + total) % total;
    visible.push({ ...suggestions[i], offset });
  }

  return (
    <>
      <style>{gradientKeyframes}</style>
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
                  ? "linear-gradient(270deg, #a259ff, #6ee7ff, #ff4ecd, #ffb86c, #a259ff)"
                  : "#fff",
                color: isActive ? "#fff" : "#bbb",
                borderRadius: 24,
                padding: "12px 24px",
                fontWeight: 500,
                cursor: "pointer",
                fontSize: isActive ? 18 : 15,
                opacity: isActive ? 1 : 0.65,
                // transform: isActive ? "scale(1)" : "scale(0.96)",
                marginBottom: isActive ? 0 : 8,
                marginTop: isActive ? 0 : 0,
                transition: "background 0.3s, color 0.3s, font-size 0.3s, opacity 0.3s, transform 0.3s",
                width: "100%",
                whiteSpace: "nowrap",
                backgroundSize: isActive ? "400% 400%" : undefined,
                animation: isActive ? `gradientMoveSuggestionsBtn 16s ease-in-out infinite` : undefined,
                outline: "none",
                border: "none",
                boxShadow: isActive ? "0 0 10px 0 rgba(0, 0, 0, 0.1)" : "none",
              }}
            >
              {item.question}
            </button>
          );
        })}
      </div>
    </>
  );
}