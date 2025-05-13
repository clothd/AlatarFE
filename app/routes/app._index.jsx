import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SuggestionsList from "../components/SuggestionsList";
import CenterInput from "../components/CenterInput";
import DisplayContainer from "../components/DisplayContainer";
import BlockContainer from "../components/BlockContainer";
import Loader from "../components/Loader";
import { QA_LIST } from "../constants/qa";
import { QUERY_DATA } from "../constants/query";

export default function Index() {
  const [activeId, setActiveId] = useState(QA_LIST[0].id);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showBlocks, setShowBlocks] = useState(false);
  const [activeQuery, setActiveQuery] = useState(null);
  const inputRef = useRef();

  function handleSend() {
    // Find the query in QUERY_DATA
    const found = QUERY_DATA.find(q => q.question.toLowerCase() === input.trim().toLowerCase());
    if (found) {
      setActiveQuery(found);
      setIsLoading(true);
      setShowBlocks(false);
      setTimeout(() => {
        setIsLoading(false);
        setShowBlocks(true);
      }, 5000);
    } else {
      // fallback to QA_LIST for old behavior
      const qaFound = QA_LIST.find(q => q.question.toLowerCase() === input.trim().toLowerCase());
      if (qaFound) setActiveId(qaFound.id);
    }
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
        {/* Loader and Blocks */}
        <AnimatePresence mode="wait">
          {isLoading && activeQuery && (
            <motion.div
              key="loader"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              style={{ margin: "48px 0" }}
            >
              <Loader textArray={activeQuery.loaderText} duration={5000} />
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence mode="wait">
          {showBlocks && activeQuery && (
            <motion.div
              key="blocks"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.5 }}
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 40,
                justifyContent: "center",
                alignItems: "flex-start",
                width: "100%",
                maxWidth: 1400,
                margin: "0 auto"
              }}
            >
              {activeQuery.blocks.map((block, i) => (
                <BlockContainer key={block.title + i} {...block} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        {/* Suggestions and Display Container (hide during loading/blocks) */}
        <AnimatePresence>
          {!isLoading && !showBlocks && (
            <motion.div
              key="suggestions"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.5 }}
              style={{ 
                display: "flex", 
                gap: "48px",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                maxWidth: "1200px"
              }}
            >
              <SuggestionsList
                suggestions={QA_LIST}
                activeId={activeId}
                onSelect={setActiveId}
              />
              <DisplayContainer qa={activeQA} />
            </motion.div>
          )}
        </AnimatePresence>
        {/* Center Input (hide during loading/blocks) */}
        <AnimatePresence>
          {!isLoading && !showBlocks && (
            <motion.div 
              key="input"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
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
                ref={inputRef}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
