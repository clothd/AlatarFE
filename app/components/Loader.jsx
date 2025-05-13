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

  return (
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
        minHeight: 64,
        minWidth: 340,
        maxWidth: 420,
        padding: "24px 36px 18px 36px",
        borderRadius: 32,
        background: "linear-gradient(90deg, #a259ff 60%, #ff4ecd 100%)",
        boxShadow: "0 4px 24px 0 rgba(160,120,255,0.12)",
        border: "none",
        position: "relative"
      }}
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
            fontWeight: 700,
            fontSize: 20,
            marginBottom: 18,
            minHeight: 28,
            textAlign: "center",
            letterSpacing: 0.2
          }}
        >
          {textArray[step]}
        </motion.div>
      </AnimatePresence>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: duration / 1000, ease: "linear" }}
        style={{
          height: 6,
          borderRadius: 3,
          background: "rgba(255,255,255,0.5)",
          marginTop: 8,
          position: "absolute",
          left: 0,
          bottom: 0,
          width: "100%"
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: duration / 1000, ease: "linear" }}
          style={{
            height: 6,
            borderRadius: 3,
            background: "linear-gradient(90deg, #fff 0%, #ffb6ff 100%)"
          }}
        />
      </motion.div>
    </motion.div>
  );
} 