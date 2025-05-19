import { useState, useRef, useEffect } from "react";
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
  const blocksRefs = useRef([]);
  const [showLoaderDelayed, setShowLoaderDelayed] = useState(false);
  const [showBlocksDelayed, setShowBlocksDelayed] = useState(false);
  const [expandedBlock, setExpandedBlock] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [hasQueried, setHasQueried] = useState(false);

  // Add this useEffect to monitor expandedBlock changes
  useEffect(() => {
    console.log('expandedBlock state changed to:', expandedBlock);
  }, [expandedBlock]);

  function handleSend() {
    setHasQueried(true);
    const found = QUERY_DATA.find(q => q.question.toLowerCase() === input.trim().toLowerCase());
    if (found) {
      setActiveQuery(found);
      setIsLoading(true);
      setShowBlocks(false);
      setTimeout(() => {
        setIsLoading(false);
        setShowBlocks(true);
  }, 9000);
    } else {
      const qaFound = QA_LIST.find(q => q.question.toLowerCase() === input.trim().toLowerCase());
      if (qaFound) setActiveId(qaFound.id);
    }
    // Add to chat history
    if (input.trim()) {
      // Try to find a dummy answer for the question in QUERY_DATA
      const foundQuery = QUERY_DATA.find(q => q.question.toLowerCase() === input.trim().toLowerCase());
      let dummyAnswer = "";
      if (foundQuery && foundQuery.dummyAnswer) {
        dummyAnswer = foundQuery.dummyAnswer;
      } else {
        dummyAnswer = "Sorry, no answer available.";
      }
      setChatHistory(prev => [
        ...prev,
        { question: input.trim(), answer: dummyAnswer }
      ]);
    }
    setInput("");
  }

  // Delay loader appearance
  useEffect(() => {
    let loaderTimeout;
    if (isLoading) {
      loaderTimeout = setTimeout(() => setShowLoaderDelayed(true), 1000);
    } else {
      setShowLoaderDelayed(false);
    }
    return () => clearTimeout(loaderTimeout);
  }, [isLoading]);

  // Delay blocks appearance
  useEffect(() => {
    let blocksTimeout;
    if (showBlocks) {
      blocksTimeout = setTimeout(() => setShowBlocksDelayed(true), 1000);
    } else {
      setShowBlocksDelayed(false);
    }
    return () => clearTimeout(blocksTimeout);
  }, [showBlocks]);

  // Layout for blocks (relative positions)
  const blockAreaWidth = 1200;
  const blockAreaHeight = 500;

  const activeQA = QA_LIST.find(q => q.id === activeId);

  return (
    <div style={{ minHeight: "100vh", background: "#f7f7fa", display: "flex", flexDirection: "column", overflowY: "hidden" }}>
      {/* Main Content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          minHeight: "100vh",
        }}
      >
        {/* Loader and Blocks Area (centered absolutely above input) */}
        <div style={{
          position: "absolute",
          left: 0,
          top: 45,
          width: "100%",
          height: "100%",
          display: (isLoading || showBlocks) ? "flex" : "none",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "auto",
          zIndex: 2,
          background: "repeating-radial-gradient(circle at 0 0, #eaeaf5 1px, transparent 0 32px)",
        }}>
          <AnimatePresence mode="wait">
            {isLoading && activeQuery && showLoaderDelayed && (
              <motion.div
                key="loader"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                style={{ display: "flex", justifyContent: "center", alignItems: "flex-end", width: "100%", pointerEvents: "auto", marginTop: "380px" }}
              >
                <Loader textArray={activeQuery.loaderText} duration={5000} />
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence mode="wait">
            {showBlocks && activeQuery && showBlocksDelayed && (
              <motion.div
                key="blocks"
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 60 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                style={{
                  position: "relative",
                  width: blockAreaWidth,
                  height: blockAreaHeight,
                  margin: "0 0"
                }}
              >
                {activeQuery.blocks.map((block, i) => {
                  const pos = activeQuery.layout && activeQuery.layout[i] ? activeQuery.layout[i] : { x: 0, y: 0 };
                  const gradient = block.gradient || (block.size === "large"
                    ? "linear-gradient(135deg,#b388ff,#8fd3f4)"
                    : block.size === "small"
                    ? "linear-gradient(135deg,#a3f7bf,#b388ff)"
                    : "linear-gradient(135deg,#ffb86c,#ff4ecd)");
                  const size = block.size || "medium";
                  // If expanded, render modal above all
                  if (expandedBlock === i) return null;
                  return (
                    <div
                      key={block.title + i}
                      ref={el => blocksRefs.current[i] = el}
                      style={{
                        position: "absolute",
                        left: pos.x,
                        top: pos.y,
                        zIndex: 2,
                        width: size === "large" ? 400 : size === "small" ? 300 : size === "wide" ? 420 : 340,
                        minHeight: size === "large" ? 340 : size === "small" ? 120 : size === "wide" ? 120 : 220,
                        display: "flex",
                        alignItems: "stretch",
                        justifyContent: "center"
                      }}
                    >
                      <BlockContainer
                        {...block}
                        gradient={gradient}
                        size={size}
                        expanded={false}
                        onExpand={() => {
                          console.log('onExpand called for block index:', i);
                          console.log('Block title:', block.title);
                          console.log('Current expandedBlock:', expandedBlock);
                          setExpandedBlock(i);
                          console.log('Set expandedBlock to:', i);
                        }}
                      />
                    </div>
                  );
                })}
                {/* Expanded block modal (rendered above all) */}
                {expandedBlock !== null && activeQuery.blocks[expandedBlock] && (
                  <div
                    style={{
                      position: "fixed",
                      inset: 0,
                      zIndex: 1100,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      paddingBottom: 96, // leave space for input bar (adjust as needed)
                      pointerEvents: "none"
                    }}
                  >
                    {/* Blurred background overlay */}
                    <div
                      onClick={() => setExpandedBlock(null)}
                      style={{
                        position: "fixed",
                        inset: 0,
                        zIndex: 1100,
                        background: "rgba(247,247,250,0.7)",
                        backdropFilter: "blur(8px)",
                        WebkitBackdropFilter: "blur(8px)",
                        pointerEvents: "auto"
                      }}
                    />
                    <BlockContainer
                      {...activeQuery.blocks[expandedBlock]}
                      expanded={true}
                      onClose={() => setExpandedBlock(null)}
                      style={{ pointerEvents: "auto", zIndex: 1110 }}
                    />
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {/* Suggestions, Display, and Input (vertical stack) */}
        <AnimatePresence>
          {!isLoading && !showBlocks && input === '' && !hasQueried && (
            <motion.div
              key="vertical-stack"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                maxWidth: "100vw",
                gap: "32px",
                position: "relative",
                marginBottom: 120 // leave space for input
              }}
            >
              {/* DisplayContainer centered */}
              <div style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: '200px'
              }}>
                <DisplayContainer qa={activeQA} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Center Input (always visible at bottom) */}
        <div style={{ width: "100%", display: "flex", justifyContent: "center", position: "fixed", left: 0, bottom: 32, zIndex: 10, flexDirection: "column", alignItems: "center" }}>
          {input === '' && !hasQueried && (
            <div style={{ width: 480, maxWidth: "90vw", marginBottom: 8 }}>
              <SuggestionsList
                suggestions={QA_LIST}
                activeId={activeId}
                onSelect={setActiveId}
              />
            </div>
          )}
          <div ref={inputRef} style={{ width: 480, maxWidth: "90vw" }}>
            <CenterInput
              value={input}
              onChange={setInput}
              onSend={handleSend}
              disabled={false}
              chatHistory={chatHistory}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
