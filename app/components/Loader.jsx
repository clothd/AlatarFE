import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader({ textArray = [], duration = 5000 }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (textArray.length <= 1) return;
    const interval = setInterval(() => {
      setStep(s => (s + 1) % textArray.length);
    }, duration / textArray.length);
    return () => clearInterval(interval);
  }, [textArray, duration]);

  // Inline keyframes for animated gradient
  const gradientKeyframes = `
    @keyframes gradientMoveLoader {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
  `;

  return (
    <>
      <style>{gradientKeyframes}</style>
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.85 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          width: "480px",
          padding: "12px 36px",
          borderRadius: 32,
          boxShadow: "0 4px 24px 0 rgba(160,120,255,0.12)",
          border: "none",
          position: "relative",
          overflow: "hidden",
          background: "linear-gradient(90deg, #6ee7ff, #a259ff, #ff4ecd, #6ee7ff)",
          backgroundSize: "300% 300%",
          animation: "gradientMoveLoader 12s linear infinite",
          transition: "min-width 0.4s cubic-bezier(.4,0,.2,1), max-width 0.4s cubic-bezier(.4,0,.2,1), min-height 0.4s cubic-bezier(.4,0,.2,1), padding 0.4s cubic-bezier(.4,0,.2,1)"
        }}
        className="animated-gradient-loader"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={textArray[step]}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            style={{
              color: "#fff",
              // fontWeight: 700,
              fontSize: 16,
              minHeight: 28,
              textAlign: "center",
              letterSpacing: 0.2,
              zIndex: 2,
            }}
          >
            {textArray[step]}
          </motion.div>
        </AnimatePresence>
        {/* Animated gradient background overlay */}
        <div style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          borderRadius: 32,
          pointerEvents: "none",
        }} className="animated-gradient-bg" />
      </motion.div>
    </>
  );
}
