import React from "react";
import { motion } from "framer-motion";

export default function BlockContainer({ title, text, image, style }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 32 }}
      style={{
        borderRadius: 20,
        background: "#fff",
        border: "2px solid #e0e0f0",
        boxShadow: "0 2px 12px rgba(80,80,120,0.06)",
        padding: 28,
        minWidth: 260,
        maxWidth: 400,
        minHeight: 180,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        ...style
      }}
    >
      {image && (
        <img src={image} alt="block visual" style={{ width: "100%", borderRadius: 16, marginBottom: 18, objectFit: "cover" }} />
      )}
      <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 10, color: "#222" }}>{title}</div>
      <div style={{ fontSize: 16, color: "#444" }}>{text}</div>
    </motion.div>
  );
} 