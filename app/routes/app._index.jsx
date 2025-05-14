import { useState, useRef, useLayoutEffect, useEffect } from "react";
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
  const [blockPositions, setBlockPositions] = useState([]);
  const [inputPosition, setInputPosition] = useState(null);
  const [svgDims, setSvgDims] = useState({ width: 0, height: 0, left: 0, top: 0 });
  const [showLoaderDelayed, setShowLoaderDelayed] = useState(false);
  const [showBlocksDelayed, setShowBlocksDelayed] = useState(false);
  const [expandedBlock, setExpandedBlock] = useState(null);

  // Add this useEffect to monitor expandedBlock changes
  useEffect(() => {
    console.log('expandedBlock state changed to:', expandedBlock);
  }, [expandedBlock]);

  function handleSend() {
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
      const qaFound = QA_LIST.find(q => q.question.toLowerCase() === input.trim().toLowerCase());
      if (qaFound) setActiveId(qaFound.id);
    }
    setInput("");
  }

  // Get input and block positions for SVGs
  useLayoutEffect(() => {
    if (showBlocks && inputRef.current) {
      const inputRect = inputRef.current.getBoundingClientRect();
      setInputPosition(inputRect);
      const blockRects = blocksRefs.current.map(ref => ref ? ref.getBoundingClientRect() : null);
      setBlockPositions(blockRects);
      // Calculate SVG dimensions to cover from input to all blocks
      let minX = inputRect.left, minY = inputRect.top, maxX = inputRect.right, maxY = inputRect.bottom;
      blockRects.forEach(rect => {
        if (rect) {
          minX = Math.min(minX, rect.left);
          minY = Math.min(minY, rect.top);
          maxX = Math.max(maxX, rect.right);
          maxY = Math.max(maxY, rect.bottom);
        }
      });
      setSvgDims({
        width: maxX - minX,
        height: maxY - minY,
        left: minX,
        top: minY
      });
    }
  }, [showBlocks, activeQuery]);

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
  const blockSize = 320;

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
          top: 0,
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
          {/* SVGs for connections */}
          {showBlocks && inputPosition && blockPositions.length > 0 && showBlocksDelayed && (
            <svg
              width={svgDims.width}
              height={svgDims.height}
              style={{
                position: "absolute",
                left: svgDims.left,
                top: svgDims.top,
                pointerEvents: "none",
                zIndex: 1
              }}
            >
              {blockPositions.map((blockRect, i) => {
                if (!blockRect) return null;
                // Start at input center-top
                const [x1, y1] = inputPosition ? [inputPosition.left + inputPosition.width / 2, inputPosition.top] : [0, 0];
                // End at block center-bottom
                const [x2, y2] = blockRect ? [blockRect.left + blockRect.width / 2, blockRect.top + blockRect.height] : [0, 0];
                // Convert to SVG local coordinates
                const sx = x1 - svgDims.left;
                const sy = y1 - svgDims.top;
                const ex = x2 - svgDims.left;
                const ey = y2 - svgDims.top;
                // Create a curved path
                const mx = sx + (ex - sx) * 0.5;
                const my = sy + (ey - sy) * 0.3 + 40 * i; // control point for curve
                const path = `M${sx},${sy} Q${mx},${my} ${ex},${ey}`;
                return (
                  <motion.path
                    key={i}
                    d={path}
                    stroke="url(#arrow-gradient)"
                    strokeWidth={4}
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.2, delay: 0.2 + i * 0.15, ease: "easeInOut" }}
                    style={{ filter: "drop-shadow(0 2px 8px #a259ff33)" }}
                  />
                );
              })}
              <defs>
                <linearGradient id="arrow-gradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#a259ff" />
                  <stop offset="100%" stopColor="#ff4ecd" />
                </linearGradient>
              </defs>
            </svg>
          )}
        </div>
        {/* Suggestions and Display Container (hide during loading/blocks) */}
        <AnimatePresence>
          {!isLoading && !showBlocks && (
            <motion.div
              key="suggestions"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              style={{ 
                display: "flex", 
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "center",
                width: "100%",
                maxWidth: "1400px",
                gap: "40px"
              }}
            >
              <div style={{
                width: 340,
                minWidth: 260,
                maxWidth: 360,
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
                height: 520,
                overflowY: "auto",
              }}>
                <SuggestionsList
                  suggestions={QA_LIST}
                  activeId={activeId}
                  onSelect={setActiveId}
                />
              </div>
              <div style={{
                flex: 1,
                minWidth: 420,
                maxWidth: 700,
                height: 520,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 0,
                position: "relative",
                marginTop: "-62px",
              }}>
                <DisplayContainer qa={activeQA} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Center Input (always visible at bottom) */}
        <div style={{ width: "100%", display: "flex", justifyContent: "center", position: "fixed", left: 0, bottom: 32, zIndex: 10 }}>
          <div ref={inputRef} style={{ width: 480 }}>
            <CenterInput
              value={input}
              onChange={setInput}
              onSend={handleSend}
              disabled={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
