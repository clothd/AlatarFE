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
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 32 }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 80,
        minWidth: 320,
        padding: 32,
        borderRadius: 24,
        background: "#f7f7fa",
        boxShadow: "0 2px 12px rgba(80,80,120,0.06)",
        border: "2px solid #e0e0f0"
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
            color: "#a259ff",
            fontWeight: 600,
            fontSize: 20,
            marginBottom: 18,
            minHeight: 28,
            textAlign: "center"
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
          background: "linear-gradient(90deg, #a259ff, #ff4ecd)",
          marginTop: 8
        }}
      />
    </motion.div>
  );
} 