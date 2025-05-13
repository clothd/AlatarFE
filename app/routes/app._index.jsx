import { useState } from "react";
import Sidebar from "../components/Sidebar";
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
    <div style={{ display: "flex", minHeight: "100vh", background: "#f3f4f8" }}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "row", alignItems: "stretch" }}>
        {/* Suggestions List */}
        <SuggestionsList
          suggestions={QA_LIST}
          activeId={activeId}
          onSelect={setActiveId}
        />
        {/* Center Area */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <div style={{ marginBottom: 32, color: "#bbb", fontSize: 20, textAlign: "center" }}>
            How can I help you today?
          </div>
          <CenterInput
            value={input}
            onChange={setInput}
            onSend={handleSend}
            disabled={false}
          />
        </div>
        {/* Display Container */}
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <DisplayContainer qa={activeQA} />
        </div>
      </div>
    </div>
  );
}
