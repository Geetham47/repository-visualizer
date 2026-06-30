// components/sidebar/ArchitectureCard.jsx
import React from "react";

function ArchitectureCard({
  routesCount,
  controllersCount,
  modelsCount,
  servicesCount,
  componentsCount,
}) {
  const items = [
    { title: "Routes", value: routesCount, color: "#22C55E", icon: "📁" },
    { title: "Controllers", value: controllersCount, color: "#3B82F6", icon: "⚙️" },
    { title: "Models", value: modelsCount, color: "#F59E0B", icon: "📦" },
    { title: "Services", value: servicesCount, color: "#EF4444", icon: "🕸️" },
    { title: "Components", value: componentsCount, color: "#A855F7", icon: "🧱" },
  ];

  return (
    <div
      style={{
        background: "#111318",
        padding: "1px",
        backgroundImage: "linear-gradient(135deg, rgba(168, 85, 247, 0.4) 0%, rgba(139, 92, 246, 0.1) 40%, transparent 100%)",
        borderRadius: "14px",
        marginBottom: "16px",
        boxShadow: "0 8px 32px rgba(0,0,0,.35), 0 0 20px rgba(168, 85, 247, 0.02)",
      }}
    >
      <div style={{ background: "#13151A", borderRadius: "13px", padding: "16px" }}>
        <div style={{ margin: "0 0 12px 0", fontSize: "12px", fontWeight: "600", color: "#A855F7", letterSpacing: "0.5px", textTransform: "uppercase", display: "flex", alignItems: "center", gap: "8px" }}>
          <span>📊</span> Architecture Overview
        </div>
        {items.map((item) => (
          <div
            key={item.title}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "38px",
              padding: "0 10px",
              marginBottom: "5px",
              background: "rgba(32, 36, 43, 0.4)",
              border: "1px solid rgba(255, 255, 255, 0.03)",
              borderRadius: "6px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "12px", opacity: 0.8 }}>{item.icon}</span>
              <span style={{ color: "#9CA3AF", fontSize: "12px", fontWeight: "500" }}>
                {item.title}
              </span>
            </div>
            <div
              style={{
                background: "rgba(20, 22, 27, 0.6)",
                color: item.color,
                padding: "2px 8px",
                borderRadius: "4px",
                border: `1px solid ${item.color}33`,
                fontWeight: "700",
                fontSize: "11px",
                minWidth: "20px",
                textAlign: "center",
              }}
            >
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ArchitectureCard;