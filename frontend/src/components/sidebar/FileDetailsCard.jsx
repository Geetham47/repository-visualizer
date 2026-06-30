// components/sidebar/FileDetailsCard.jsx
import React from "react";

function InfoTile({ title, value, color = "#6366F1" }) {
  return (
    <div
      style={{
        background: "#20242B",
        borderRadius: "8px",
        padding: "8px 6px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          fontSize: "10px",
          color: "#9CA3AF",
          marginBottom: "2px",
          textTransform: "uppercase",
          letterSpacing: "0.5px",
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: "15px",
          fontWeight: "600",
          color,
        }}
      >
        {value}
      </div>
    </div>
  );
}

function complexityLabel(complexity) {
  if (complexity === undefined || complexity === null) return undefined;
  if (complexity <= 5) return "🟢 Low";
  if (complexity <= 10) return "🟡 Med";
  if (complexity <= 20) return "🟠 High";
  return "🔴 V.High";
}

function FileDetailsCard({ selectedNode, dependencyScore, riskLevel }) {
  return (
    <div
      style={{
        background: "#111318",
        padding: "1px",
        backgroundImage: "linear-gradient(135deg, rgba(99, 102, 241, 0.4) 0%, rgba(79, 70, 229, 0.15) 40%, transparent 100%)",
        borderRadius: "14px",
        marginBottom: "16px",
        boxShadow: "0 8px 32px rgba(0,0,0,.35), 0 0 20px rgba(99, 102, 241, 0.02)",
      }}
    >
      <div style={{ background: "#13151A", borderRadius: "13px", padding: "16px" }}>
        <div style={{ margin: "0 0 12px 0", fontSize: "12px", fontWeight: "600", color: "#E0E7FF", letterSpacing: "0.5px", textTransform: "uppercase", display: "flex", alignItems: "center", gap: "6px" }}>
          <span>ℹ️</span> File Details
        </div>

        {!selectedNode ? (
          <div
            style={{
              color: "#9CA3AF",
              lineHeight: "1.5",
              fontSize: "13px",
            }}
          >
            Select any file from the graph to inspect its metrics, dependency score and AI insights.
          </div>
        ) : (
          <>
            <div
              style={{
                fontSize: "15px",
                fontWeight: "600",
                color: "white",
                marginBottom: "2px",
              }}
            >
              {selectedNode.data?.label}
            </div>

            {dependencyScore >= 10 && (
              <div
                style={{
                  color: "#ff5252",
                  fontWeight: "bold",
                  fontSize: "12px",
                  marginBottom: "4px",
                }}
              >
                ⚠ Critical File
              </div>
            )}

            <div
              style={{
                fontSize: "11px",
                color: "#9CA3AF",
                wordBreak: "break-all",
                marginBottom: "12px",
              }}
            >
              {selectedNode.id}
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "6px",
              }}
            >
              <InfoTile title="LOC" value={selectedNode.data?.loc} />
              <InfoTile title="Funcs" value={selectedNode.data?.functions} />
              <InfoTile title="Imports" value={selectedNode.data?.imports} />
              <InfoTile title="Exports" value={selectedNode.data?.exports} />
              <InfoTile title="Classes" value={selectedNode.data?.classes} />
              <InfoTile
                title="Complex"
                value={complexityLabel(selectedNode.data?.complexity)}
              />
            </div>

            <div style={{ marginTop: "12px", fontSize: "12px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "6px",
                }}
              >
                <span style={{ color: "#D1D5DB" }}>Dependency Score</span>
                <strong style={{ color: "#F59E0B" }}>{dependencyScore}</strong>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span style={{ color: "#D1D5DB" }}>Risk Level</span>
                <strong
                  style={{
                    color: riskLevel.includes("Low")
                      ? "#22C55E"
                      : riskLevel.includes("Medium")
                      ? "#F59E0B"
                      : "#EF4444",
                  }}
                >
                  {riskLevel}
                </strong>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default FileDetailsCard;