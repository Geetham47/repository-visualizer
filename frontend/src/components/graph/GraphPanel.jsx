import {
  ReactFlow,
  Background,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import CustomNode from "./CustomNode";

import GraphControls from "./GraphControls";

function GraphPanel({
  displayNodes,
  displayEdges,
  onNodeClick,
  graphRef,
}) {
  const nodeTypes = {
    custom: CustomNode,
  };

  return (
    <div
      style={{
        flex: 1,
        margin: "18px",
        background: "#111318",
        // Using a premium multi-color gradient border layout to match the sidebar card glow in image_ada45d.jpg
        padding: "1px",
        backgroundImage: "linear-gradient(135deg, rgba(168, 85, 247, 0.4) 0%, rgba(99, 102, 241, 0.15) 40%, transparent 100%)",
        borderRadius: "22px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 10px 40px rgba(0,0,0,.45), 0 0 24px rgba(168, 85, 247, 0.03)",
      }}
    >
      {/* Inner containment wrapper to fix background colors inside the border gradient */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          background: "#111318",
          borderRadius: "21px",
          overflow: "hidden",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            height: "64px",
            padding: "0 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #2B3038",
            background: "#161A20",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "20px",
                fontWeight: "700",
                color: "white",
              }}
            >
              Repository Graph
            </div>
            <div
              style={{
                fontSize: "13px",
                color: "#94A3B8",
                marginTop: "4px",
              }}
            >
              Interactive Dependency Visualization
            </div>
          </div>
          <div
            style={{
              padding: "8px 16px",
              background: "#20242B",
              borderRadius: "12px",
              color: "#CBD5E1",
              fontSize: "13px",
            }}
          >
            React Flow
          </div>
        </div>

        {/* GRAPH */}
        <div
          ref={graphRef}
          style={{
            flex: 1,
            background: "#0F1116",
            position: "relative",
          }}
        >
          {/* Subtle central background illumination */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: "radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.06) 0%, rgba(139, 92, 246, 0.02) 45%, transparent 70%)",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />

          <div style={{ width: "100%", height: "100%", position: "relative", zIndex: 1 }}>
            <ReactFlow
              nodeTypes={nodeTypes}
              nodes={displayNodes}
              edges={displayEdges}
              defaultEdgeOptions={{
                animated: false,
              }}
              fitView
              fitViewOptions={{
                padding: 0.4,
              }}
              minZoom={0.1}
              maxZoom={2}
              zoomOnScroll={false}
              panOnScroll
              panOnDrag
              onNodeClick={onNodeClick}
            >
              <Background
                gap={24}
                size={1}
                color="#2B3038"
              />
              <GraphControls />
            </ReactFlow>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GraphPanel;