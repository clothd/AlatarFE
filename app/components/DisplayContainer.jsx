import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const spring = {
  type: "spring",
  stiffness: 600,
  damping: 30,
  mass: 0.7
};

export default function DisplayContainer({ qa }) {
  if (!qa) return null;
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={spring}
      style={{
        minHeight: 360,
        minWidth: 360,
        maxWidth: 480,
        margin: "0 auto",
        borderRadius: 30,
        padding: 4, // for border thickness
        background: "linear-gradient(90deg, #ff4ecd, #ffb86c)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
        overflow: "visible"
      }}
    >
      <motion.div
        layout
        style={{
          width: "100%",
          minHeight: 352,
          borderRadius: 26,
          background: "#fff",
          padding: 32,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden"
        }}
        transition={spring}
      >
        <motion.div 
          key={qa.id + "-title"}
          layout
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ ...spring, delay: 0.1 }}
          style={{ fontSize: 18, fontWeight: 600, marginBottom: 16, color: "#ff4ecd" }}
        >
          Alatar's Response
        </motion.div>
        <AnimatePresence mode="wait">
          <motion.div 
            key={qa.id + "-answer"}
            layout
            initial={{ y: 20, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ ...spring, delay: 0.15 }}
            style={{ fontSize: 16, color: "#333", marginBottom: 16, width: "100%", textAlign: "center" }}
          >
            {qa.answer}
          </motion.div>
        </AnimatePresence>
        <AnimatePresence mode="wait">
          {qa.image && (
            <motion.img 
              key={qa.id + "-img"}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ ...spring, delay: 0.2 }}
              src={qa.image} 
              alt="answer visual" 
              style={{ maxWidth: 320, borderRadius: 22, marginBottom: 12 }} 
            />
          )}
        </AnimatePresence>
        <AnimatePresence mode="wait">
          {qa.graph && (
            <motion.div 
              key={qa.id + "-graph"}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ ...spring, delay: 0.25 }}
              style={{ 
                width: 320, 
                height: 180, 
                background: "#f7f7fa", 
                borderRadius: 12, 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                color: "#bbb" 
              }}
            >
              [Graph Placeholder]
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
} 