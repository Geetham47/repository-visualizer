// components/MetricCard.jsx
import React from 'react';

function MetricCard({ title, children, variant = "default" }) {
  let accentBorder = "1px solid rgba(255, 255, 255, 0.04)";
  let accentGlow = "rgba(255, 255, 255, 0.01)";

  if (variant === "purple") {
    accentBorder = "1px solid rgba(168, 85, 247, 0.2)";
    accentGlow = "rgba(168, 85, 247, 0.02)";
  } else if (variant === "green") {
    accentBorder = "1px solid rgba(34, 197, 94, 0.2)";
    accentGlow = "rgba(34, 197, 94, 0.02)";
  } else if (variant === "blue") {
    accentBorder = "1px solid rgba(59, 130, 246, 0.2)";
    accentGlow = "rgba(59, 130, 246, 0.02)";
  } else if (variant === "amber") {
    accentBorder = "1px solid rgba(245, 158, 11, 0.2)";
    accentGlow = "rgba(245, 158, 11, 0.02)";
  } else if (variant === "rose") {
    accentBorder = "1px solid rgba(244, 63, 94, 0.2)";
    accentGlow = "rgba(244, 63, 94, 0.02)";
  }

  return (
    <div
      style={{
        background: "linear-gradient(180deg, rgba(20, 22, 28, 0.85) 0%, rgba(13, 14, 18, 0.9) 100%)",
        border: accentBorder,
        borderRadius: "12px",
        marginBottom: "16px",
        position: "relative",
        boxShadow: `0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.02), 0 0 20px ${accentGlow}`,
        transition: "border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
        overflow: "hidden",
      }}
    >
      <div style={{ padding: "16px" }}>
        {title && (
          <div
            style={{
              margin: "0 0 16px 0",
              fontSize: "12px",
              fontWeight: "600",
              color: "#FFFFFF",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              opacity: 0.9,
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            {title}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

export default MetricCard;