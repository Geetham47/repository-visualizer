// components/sidebar/DependencyCard.jsx
import React from "react";

function DependencyList({ title, items, selectNodeById }) {
  return (
    <div style={{ marginBottom: "12px" }}>
      <div
        style={{
          fontSize: "13px",
          fontWeight: "600",
          color: "white",
          marginBottom: "6px",
        }}
      >
        {title}
      </div>

      {items.length === 0 ? (
        <div
          style={{
            color: "#8B95A7",
            fontSize: "12px",
          }}
        >
          None
        </div>
      ) : (
        items.map((item, index) => (
          <div
            key={index}
            onClick={() => selectNodeById(item)}
            style={{
              background: "#20242B",
              padding: "0 12px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              borderRadius: "8px",
              marginBottom: "4px",
              cursor: "pointer",
              transition: "0.25s",
              color: "#D1D5DB",
              fontSize: "13px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {item.split("/").pop()}
          </div>
        ))
      )}
    </div>
  );
}

function DependencyCard({
  outgoingDependencies,
  incomingDependencies,
  selectNodeById,
}) {
  return (
    <div
      style={{
        background: "#111318",
        padding: "1px",
        backgroundImage: "linear-gradient(135deg, rgba(59, 130, 246, 0.4) 0%, rgba(37, 99, 235, 0.15) 40%, transparent 100%)",
        borderRadius: "14px",
        marginBottom: "16px",
        boxShadow: "0 8px 32px rgba(0,0,0,.35), 0 0 20px rgba(59, 130, 246, 0.02)",
      }}
    >
      <div style={{ background: "#13151A", borderRadius: "13px", padding: "16px" }}>
        <div style={{ margin: "0 0 12px 0", fontSize: "12px", fontWeight: "600", color: "#DBEAFE", letterSpacing: "0.5px", textTransform: "uppercase", display: "flex", alignItems: "center", gap: "6px" }}>
          <span>🔗</span> Dependency Explorer
        </div>

        <DependencyList
          title="Outgoing Dependencies"
          items={outgoingDependencies}
          selectNodeById={selectNodeById}
        />

        <DependencyList
          title="Incoming Dependencies"
          items={incomingDependencies}
          selectNodeById={selectNodeById}
        />
      </div>
    </div>
  );
}

export default DependencyCard;