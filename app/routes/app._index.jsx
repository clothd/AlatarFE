import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SuggestionsList from "../components/SuggestionsList";
import CenterInput from "../components/CenterInput";
import DisplayContainer from "../components/DisplayContainer";
import { QA_LIST } from "../constants/qa";

export default function Index() {
  const [activeId, setActiveId] = useState(QA_LIST[0].id);
  const [input, setInput] = useState("");

  // When user sends a message, set it as the active suggestion if it matches
  function handleSend() {
    const found = QA_LIST.find(q => q.question.toLowerCase() === input.trim().toLowerCase());
    if (found) setActiveId(found.id);
    setInput("");
  }

  const activeQA = QA_LIST.find(q => q.id === activeId);

  return (
    <div style={{ minHeight: "100vh", background: "#f7f7fa" }}>
      {/* Top Bar */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        style={{ 
          height: 56, 
          background: "#f7f7fa", 
          display: "flex", 
          alignItems: "center", 
          padding: "0 32px", 
          borderBottom: "1px solid #eee", 
          fontWeight: 700, 
          fontSize: 24, 
          letterSpacing: 1 
        }}
      >
        <span style={{ color: "#222", fontWeight: 700 }}>Alatar</span>
        <span style={{ color: "#ff4ecd", fontWeight: 400, fontSize: 16, marginLeft: 12 }}>V1.1</span>
      </motion.div>

      {/* Main Content */}
      <div style={{ 
        display: "flex", 
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "calc(100vh - 56px)",
        padding: "32px",
        gap: "48px"
      }}>
        {/* Suggestions and Display Container */}
        <div style={{ 
          display: "flex", 
          gap: "48px",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          maxWidth: "1200px"
        }}>
          <SuggestionsList
            suggestions={QA_LIST}
            activeId={activeId}
            onSelect={setActiveId}
          />
          <DisplayContainer qa={activeQA} />
        </div>

        {/* Center Input */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{ 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center",
            gap: "16px"
          }}
        >
          <div style={{ 
            color: "#bbb", 
            fontSize: 22, 
            textAlign: "center", 
            fontWeight: 500 
          }}>
            How can I help you today?
          </div>
          <CenterInput
            value={input}
            onChange={setInput}
            onSend={handleSend}
            disabled={false}
          />
        </motion.div>
      </div>
    </div>
  );
}
