import React from "react";
import { motion } from "framer-motion";

export default function BlockContainer({ title, text, image, style, borderColor = "#b388ff", gradient }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 32 }}
      className="block-container"
      style={{
        borderRadius: 20,
        background: "#fff",
        border: gradient
          ? `3px solid transparent`
          : `3px solid ${borderColor}`,
        backgroundImage: gradient
          ? `linear-gradient(#fff, #fff), ${gradient}`
          : undefined,
        backgroundOrigin: gradient ? "border-box" : undefined,
        backgroundClip: gradient ? "padding-box, border-box" : undefined,
        boxShadow: "0 4px 24px 0 rgba(160,120,255,0.08)",
        padding: 10,
        minWidth: 300,
        maxWidth: 400,
        minHeight: 220,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        ...style
      }}
    >
      {image && (
        <img src={image} alt="block visual" style={{ width: "100%", borderRadius: 16, marginBottom: 18, objectFit: "cover" }} />
      )}
      <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 10, color: "#222" }}>{title}</div>
      <div style={{ fontSize: 16, color: "#444" }}>{text}</div>
    </motion.div>
  );
} 