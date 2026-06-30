// components/sidebar/TopFilesCard.jsx
import React from "react";

function TopFilesCard({
  topConnectedFiles,
  mostConnected,
  mostImported,
  selectNodeById,
}) {
  return (
    <div
      style={{
        background: "#111318",
        padding: "1px",
        backgroundImage: "linear-gradient(135deg, rgba(245, 158, 11, 0.4) 0%, rgba(217, 119, 6, 0.15) 40%, transparent 100%)",
        borderRadius: "14px",
        marginBottom: "16px",
        boxShadow: "0 8px 32px rgba(0,0,0,.35), 0 0 20px rgba(245, 158, 11, 0.02)",
      }}
    >
      <div style={{ background: "#13151A", borderRadius: "13px", padding: "16px" }}>
        <div style={{ margin: "0 0 12px 0", fontSize: "12px", fontWeight: "600", color: "#FEF3C7", letterSpacing: "0.5px", textTransform: "uppercase", display: "flex", alignItems: "center", gap: "6px" }}>
          <span>⭐</span> Repository Insights
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            marginBottom: "12px",
          }}
        >
          <div
            style={{
              background: "#20242B",
              padding: "8px 12px",
              borderRadius: "8px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "2px",
              minHeight: "44px",
            }}
          >
            <div style={{ fontSize: "11px", color: "#9CA3AF" }}>
              🔥 Most Connected
            </div>
            <div
              style={{
                fontWeight: "600",
                color: "white",
                fontSize: "13px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {mostConnected || "None"}
            </div>
          </div>

          <div
            style={{
              background: "#20242B",
              padding: "8px 12px",
              borderRadius: "8px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "2px",
              minHeight: "44px",
            }}
          >
            <div style={{ fontSize: "11px", color: "#9CA3AF" }}>
              📥 Most Imported
            </div>
            <div
              style={{
                fontWeight: "600",
                color: "white",
                fontSize: "13px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {mostImported || "None"}
            </div>
          </div>
        </div>

        <div
          style={{
            fontWeight: "600",
            color: "white",
            fontSize: "13px",
            marginBottom: "8px",
            marginTop: "12px",
          }}
        >
          Top Connected Files
        </div>

        {topConnectedFiles.length === 0 ? (
          <div style={{ color: "#8B95A7", fontSize: "12px" }}>No data available.</div>
        ) : (
          topConnectedFiles.map((file, index) => (
            <div
              key={index}
              onClick={() => selectNodeById(file.id)}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                height: "40px",
                padding: "0 12px",
                marginBottom: "4px",
                background: "#20242B",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "0.25s",
              }}
            >
              <div
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  maxWidth: "220px",
                  color: "#D1D5DB",
                  fontSize: "13px",
                }}
              >
                {file.id.split("/").pop()}
              </div>

              <div
                style={{
                  background: "#6366F1",
                  padding: "2px 6px",
                  borderRadius: "4px",
                  color: "white",
                  fontWeight: "600",
                  fontSize: "11px",
                }}
              >
                {file.count}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TopFilesCard;