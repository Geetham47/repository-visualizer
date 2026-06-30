// components/sidebar/AIAssistantCard.jsx
import React from "react";

function AIButton({
  title,
  mode,
  currentMode,
  setAiMode,
  selectedNode,
  fetchAISummary,
}) {
  const active = mode === currentMode;

  return (
    <button
      onClick={() => {
        setAiMode(mode);
        if (selectedNode) {
          fetchAISummary(selectedNode.id, mode);
        }
      }}
      style={{
        flex: 1,
        padding: "6px 4px",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        transition: "0.25s",
        background: active
          ? "linear-gradient(135deg,#6366F1,#8B5CF6)"
          : "#20242B",
        color: "white",
        fontWeight: "500",
        fontSize: "12px",
      }}
    >
      {title}
    </button>
  );
}

function AIAssistantCard({
  selectedNode,
  aiMode,
  setAiMode,
  fetchAISummary,
  loadingAI,
  aiSummary,
}) {
  return (
    <div
      style={{
        background: "#111318",
        padding: "1px",
        backgroundImage: "linear-gradient(135deg, rgba(217, 70, 239, 0.4) 0%, rgba(168, 85, 247, 0.15) 40%, transparent 100%)",
        borderRadius: "14px",
        marginBottom: "16px",
        boxShadow: "0 8px 32px rgba(0,0,0,.35), 0 0 20px rgba(217, 70, 239, 0.02)",
      }}
    >
      <div style={{ background: "#13151A", borderRadius: "13px", padding: "16px" }}>
        <div style={{ margin: "0 0 12px 0", fontSize: "12px", fontWeight: "600", color: "#F5D0FE", letterSpacing: "0.5px", textTransform: "uppercase", display: "flex", alignItems: "center", gap: "6px" }}>
          <span>🤖</span> AI Assistant
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "6px",
            marginBottom: "12px",
          }}
        >
          <AIButton
            title="Explain"
            mode="explain"
            currentMode={aiMode}
            setAiMode={setAiMode}
            selectedNode={selectedNode}
            fetchAISummary={fetchAISummary}
          />
          <AIButton
            title="Refactor"
            mode="refactor"
            currentMode={aiMode}
            setAiMode={setAiMode}
            selectedNode={selectedNode}
            fetchAISummary={fetchAISummary}
          />
          <AIButton
            title="Find Bugs"
            mode="bugs"
            currentMode={aiMode}
            setAiMode={setAiMode}
            selectedNode={selectedNode}
            fetchAISummary={fetchAISummary}
          />
          <AIButton
            title="Improve"
            mode="improve"
            currentMode={aiMode}
            setAiMode={setAiMode}
            selectedNode={selectedNode}
            fetchAISummary={fetchAISummary}
          />
        </div>

        <div
          style={{
            background: "#20242B",
            borderRadius: "8px",
            padding: "10px 12px",
            minHeight: "110px",
            color: "#D1D5DB",
            lineHeight: "1.5",
            fontSize: "12px",
            whiteSpace: "pre-wrap",
          }}
        >
          {!selectedNode ? (
            <div style={{ color: "#8B95A7" }}>
              Select a file to start AI analysis.
            </div>
          ) : loadingAI ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  border: "2px solid #444",
                  borderTop: "2px solid #6366F1",
                  animation: "spin 1s linear infinite",
                }}
              ></div>
              Generating AI response...
            </div>
          ) : (
            aiSummary
          )}
        </div>

        <div
          style={{
            marginTop: "10px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <button
            onClick={() => navigator.clipboard.writeText(aiSummary)}
            style={{
              padding: "6px 12px",
              background: "#20242B",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              color: "white",
              fontSize: "12px",
            }}
          >
            📋 Copy
          </button>
        </div>
      </div>
    </div>
  );
}

export default AIAssistantCard;