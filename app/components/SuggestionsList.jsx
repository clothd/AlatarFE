import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ITEM_HEIGHT = 56; // px
const VISIBLE_COUNT = 7; // 3 above, 1 active, 3 below

export default function SuggestionsList({ suggestions, activeId, onSelect }) {
  const [internalActive, setInternalActive] = useState(suggestions[0].id);

  // Sync with external activeId
  useEffect(() => {
    if (activeId !== internalActive) setInternalActive(activeId);
  }, [activeId]);

  // Find the index of the active item
  const activeIdx = suggestions.findIndex(item => item.id === internalActive);

  // Get the visible items (3 above, 1 active, 3 below)
  let visible = [];
  for (let i = -3; i <= 3; i++) {
    let idx = (activeIdx + i + suggestions.length) % suggestions.length;
    visible.push({ ...suggestions[idx], offset: i });
  }

  // Animate to center on active
  function handleClick(id) {
    setInternalActive(id);
    if (onSelect) onSelect(id);
  }

  return (
    <div
      style={{
        width: 320,
        height: ITEM_HEIGHT * VISIBLE_COUNT,
        overflow: "hidden",
        padding: 0,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "rgba(255,255,255,0.0)",
      }}
    >
      <div style={{ position: "relative", width: "100%", height: ITEM_HEIGHT * VISIBLE_COUNT }}>
        <AnimatePresence initial={false}>
          {visible.map((item, i) => {
            const isActive = item.id === internalActive;
            // Fade and scale for non-active items
            const opacity = isActive ? 1 : 0.35 - 0.08 * Math.abs(item.offset);
            const scale = isActive ? 1 : 0.96 - 0.04 * Math.abs(item.offset);
            const y = (item.offset) * ITEM_HEIGHT;
            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: y + 20, scale }}
                animate={{ opacity, y, scale }}
                exit={{ opacity: 0, y: y - 20, scale }}
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
                onClick={() => handleClick(item.id)}
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: "50%",
                  transform: `translateY(-50%)`,
                  background: isActive ? "linear-gradient(90deg, #ff4ecd, #ffb86c)" : "#f3f4f8",
                  color: isActive ? "#fff" : "#000",
                  borderRadius: 24,
                  padding: "12px 24px",
                  fontWeight: 500,
                  cursor: "pointer",
                  boxShadow: isActive ? "0 2px 8px rgba(255,78,205,0.08)" : undefined,
                  marginBottom: 8,
                  height: ITEM_HEIGHT - 8,
                  display: "flex",
                  alignItems: "center",
                  zIndex: isActive ? 2 : 1,
                  fontSize: isActive ? 18 : 16,
                  transition: "background 0.3s, color 0.3s, font-size 0.3s"
                }}
              >
                {item.question}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
} 