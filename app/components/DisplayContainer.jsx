import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function DisplayContainer({ qa }) {
  if (!qa) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
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
      <div
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
      >
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          style={{ fontSize: 18, fontWeight: 600, marginBottom: 16, color: "#ff4ecd" }}
        >
          Alatar's Response
        </motion.div>
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{ fontSize: 16, color: "#333", marginBottom: 16 }}
        >
          {qa.answer}
        </motion.div>
        <AnimatePresence>
          {qa.image && (
            <motion.img 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: 0.3 }}
              src={qa.image} 
              alt="answer visual" 
              style={{ maxWidth: 320, borderRadius: 22, marginBottom: 12 }} 
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {qa.graph && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: 0.4 }}
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
      </div>
    </motion.div>
  );
} 