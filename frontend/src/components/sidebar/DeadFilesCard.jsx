// components/sidebar/DeadFilesCard.jsx
import React from "react";

function DeadFilesCard({ deadFiles, selectNodeById }) {
  return (
    <div
      style={{
        background: "#111318",
        padding: "1px",
        backgroundImage: "linear-gradient(135deg, rgba(244, 63, 94, 0.4) 0%, rgba(225, 29, 72, 0.15) 40%, transparent 100%)",
        borderRadius: "14px",
        marginBottom: "16px",
        boxShadow: "0 8px 32px rgba(0,0,0,.35), 0 0 20px rgba(244, 63, 94, 0.02)",
      }}
    >
      <div style={{ background: "#13151A", borderRadius: "13px", padding: "16px" }}>
        <div style={{ margin: "0 0 12px 0", fontSize: "12px", fontWeight: "600", color: "#FFE4E6", letterSpacing: "0.5px", textTransform: "uppercase", display: "flex", alignItems: "center", gap: "6px" }}>
          <span>⚠️</span> Unused Files
        </div>

        {deadFiles.length === 0 ? (
          <div
            style={{
              background: "#1E2A22",
              border: "1px solid #22C55E",
              borderRadius: "8px",
              padding: "10px",
              color: "#22C55E",
              fontWeight: "600",
              fontSize: "12px",
              textAlign: "center",
            }}
          >
            ✅ Excellent! No unused files detected.
          </div>
        ) : (
          <>
            <div
              style={{
                background: "#312514",
                border: "1px solid #F59E0B",
                borderRadius: "8px",
                padding: "8px 10px",
                marginBottom: "8px",
                color: "#FBBF24",
                fontSize: "12px",
                lineHeight: "1.4",
              }}
            >
              These files are currently not imported by any other file.
            </div>

            {deadFiles.map((file, index) => (
              <div
                key={index}
                onClick={() => selectNodeById(file)}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "#20242B",
                  height: "40px",
                  padding: "0 12px",
                  borderRadius: "8px",
                  marginBottom: "4px",
                  cursor: "pointer",
                  transition: "0.25s",
                }}
              >
                <div
                  style={{
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    maxWidth: "180px",
                    color: "#D1D5DB",
                    fontSize: "13px",
                  }}
                >
                  {file.split("/").pop()}
                </div>

                <div
                  style={{
                    background: "#F59E0B",
                    padding: "2px 6px",
                    borderRadius: "4px",
                    color: "white",
                    fontWeight: "600",
                    fontSize: "11px",
                }}
                >
                  Unused
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default DeadFilesCard;