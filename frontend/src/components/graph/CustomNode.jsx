import { Handle, Position } from "@xyflow/react";
import { getNodeStyle } from "./nodeStyle";

function CustomNode({ data, selected }) {
  const style = getNodeStyle(data.type);
  const Icon = style.icon;

  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        style={{
          background: style.color,
          width: 10,
          height: 10,
        }}
      />

      <div
        style={{
          width: 180,
          background: style.background,
          border: selected
            ? `2px solid ${style.color}`
            : `1px solid ${style.border}`,
          borderRadius: 14,
          padding: 14,
          transition: "0.25s",
          boxShadow: selected
            ? `0 0 18px ${style.color}55`
            : "0 8px 18px rgba(0,0,0,.25)",
        }}
      >
        {/* Header */}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: style.color,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Icon color="white" size={16} />
          </div>

          <div>
            <div
              style={{
                color: "white",
                fontWeight: 700,
                fontSize: 13,
              }}
            >
              {data.label}
            </div>

            <div
              style={{
                color: "#A0AEC0",
                fontSize: 10,
                marginTop: 2,
              }}
            >
              {style.label}
            </div>
          </div>
        </div>

        {/* Bottom */}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 14,
            fontSize: 11,
            color: "#CBD5E1",
          }}
        >
          <span>{data.loc} LOC</span>

          <span>{data.imports} Imports</span>
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        style={{
          background: style.color,
          width: 10,
          height: 10,
        }}
      />
    </>
  );
}

export default CustomNode;