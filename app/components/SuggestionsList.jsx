import React, { useEffect, useRef, useState } from "react";

const SCROLL_SPEED = 1; // px per frame
const ITEM_HEIGHT = 56; // px (approximate, adjust as needed)
const PAUSE_DURATION = 2000; // ms to pause on each item

export default function SuggestionsList({ suggestions, activeId, onSelect }) {
  const [scrollTop, setScrollTop] = useState(0);
  const [internalActive, setInternalActive] = useState(suggestions[0].id);
  const listRef = useRef(null);
  const pauseRef = useRef(false);

  // Infinite scroll logic
  useEffect(() => {
    let frame;
    let lastSwitch = Date.now();
    function animate() {
      if (!pauseRef.current) {
        setScrollTop((prev) => {
          const totalHeight = suggestions.length * ITEM_HEIGHT;
          let next = prev + SCROLL_SPEED;
          if (next >= totalHeight) next = 0;
          // Switch active when a new item is centered
          const idx = Math.round(next / ITEM_HEIGHT) % suggestions.length;
          const newActive = suggestions[idx].id;
          if (newActive !== internalActive && Date.now() - lastSwitch > PAUSE_DURATION) {
            setInternalActive(newActive);
            lastSwitch = Date.now();
          }
          return next;
        });
      }
      frame = requestAnimationFrame(animate);
    }
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [suggestions, internalActive]);

  // Pause on hover
  function handleMouseEnter() { pauseRef.current = true; }
  function handleMouseLeave() { pauseRef.current = false; }

  // When user clicks, set active and pause
  function handleClick(id) {
    setInternalActive(id);
    if (onSelect) onSelect(id);
    pauseRef.current = true;
    setTimeout(() => { pauseRef.current = false; }, PAUSE_DURATION);
  }

  // Sync with external activeId
  useEffect(() => {
    if (activeId !== internalActive) setInternalActive(activeId);
  }, [activeId]);

  // Render two copies for infinite effect
  const items = [...suggestions, ...suggestions];

  return (
    <div
      style={{ width: 320, height: 280, overflow: "hidden", padding: 24, position: "relative" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={listRef}
    >
      <div
        style={{
          position: "absolute",
          top: -scrollTop,
          left: 0,
          right: 0,
          transition: "top 0.1s linear"
        }}
      >
        {items.map((item, idx) => {
          const isActive = item.id === internalActive;
          return (
            <div
              key={idx + "-" + item.id}
              onClick={() => handleClick(item.id)}
              style={{
                background: isActive ? "linear-gradient(90deg, #ff4ecd, #ffb86c)" : "#f3f4f8",
                color: isActive ? "#fff" : "#888",
                borderRadius: 24,
                padding: "12px 24px",
                fontWeight: 500,
                cursor: "pointer",
                boxShadow: isActive ? "0 2px 8px rgba(255,78,205,0.08)" : undefined,
                transition: "background 0.3s, color 0.3s",
                marginBottom: 8,
                height: ITEM_HEIGHT - 8,
                display: "flex",
                alignItems: "center"
              }}
            >
              {item.question}
            </div>
          );
        })}
      </div>
    </div>
  );
} 