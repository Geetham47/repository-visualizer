import { useEffect, useState, useRef } from "react";
import api from "./services/api";
import { toPng } from "html-to-image";
import {
  ReactFlow,
  Background,
  Controls,
  MarkerType,
  useReactFlow,
} from "@xyflow/react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { getLayoutedElements } from "./utils/layout";
import {
  FiSearch,
  FiFolder,
  FiDownload,
  FiSettings,
} from "react-icons/fi";

import {
  HiOutlineCubeTransparent,
} from "react-icons/hi2";

import {
  BsDiagram3,
} from "react-icons/bs";
function StatCard({
  icon,
  title,
  value,
  color,
}) {
  return (
    <div
      style={{
        background: "#1B1D24",
        border: "1px solid #30333D",
        borderRadius: "14px",
        padding: "12px 14px",
        minWidth: "160px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <div
          style={{
            fontSize: "12px",
            color: "#9CA3AF",
          }}
        >
          {title}
        </div>

        <div
          style={{
            fontSize: "22px",
            fontWeight: "700",
            color,
            marginTop: "4px",
          }}
        >
          {value}
        </div>
      </div>

      <div
        style={{
          fontSize: "18px",
          color,
        }}
      >
        {icon}
      </div>
    </div>
  );
}
function App() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [highlightedNodes, setHighlightedNodes] = useState([]);
  const [highlightedEdges, setHighlightedEdges] = useState([]);
  const [graphData, setGraphData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [repoPath, setRepoPath] = useState("C:/Users/geeth/Documents/CIG_DEV_PS");
  const [aiSummary, setAiSummary] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);
  const [aiMode, setAiMode] = useState("explain");

  const graphRef = useRef(null);
  const getNodeColor = (path) => {
  if (path.includes("/routes/")) {
    return "#4CAF50";
  }

  if (path.includes("/controllers/")) {
    return "#2196F3";
  }

  if (path.includes("/models/")) {
    return "#FF9800";
  }

  if (path.includes("/components/")) {
    return "#9C27B0";
  }

  if (path.includes("/services/")) {
    return "#F44336";
  }

  return "#FFFFFF";
};
  const loadRepository = () => {

  api
    .get(
      `/graph?path=${repoPath}`
    )
    .then((res) => {

      setGraphData(res.data);

      const rawNodes = res.data.nodes;

     const graphEdges =
  res.data.edges.map(
    (edge, index) => ({
      id: `${edge.source}-${edge.target}-${index}`,

      source: edge.source,

      target: edge.target,

      type: "straight",

      animated:
        highlightedEdges.includes(
          `${edge.source}-${edge.target}`
        ),

      style: {
        stroke:
          highlightedEdges.includes(
            `${edge.source}-${edge.target}`
          )
            ? "#00bfff"
            : "#666",

        strokeWidth:
          highlightedEdges.includes(
            `${edge.source}-${edge.target}`
          )
            ? 4
            : 1,

        opacity:
          highlightedEdges.length === 0
            ? 1
            : highlightedEdges.includes(
                `${edge.source}-${edge.target}`
              )
            ? 1
            : 0.15,
      },
    })
  );

      const {
        nodes: graphNodes,
        edges: layoutedEdges,
      } = getLayoutedElements(
        rawNodes,
        graphEdges
      );
      
      setNodes(
  graphNodes.map((n) => ({
    ...n,

    style: {
      border: highlightedNodes.includes(
        n.id
      )
        ? "2px solid #4da6ff"
        : "2px solid #555",

      borderRadius: "8px",

      padding: "10px",

      background: getNodeColor(
        n.id
      ),

      color: "#000",

      fontWeight: "bold",

      opacity:
        highlightedNodes.length === 0
          ? 1
          : highlightedNodes.includes(
              n.id
            )
          ? 1
          : 0.2,

      boxShadow:
        highlightedNodes.includes(
          n.id
        )
          ? "0 0 15px #4da6ff"
          : "none",
    },
  }))
);

      setEdges(layoutedEdges);
    })
    .catch((err) => {
      console.error(err);
    });

};
const fetchAISummary = async (
  filePath,
  mode = aiMode
) => {

  setLoadingAI(true);

  try {

    const res = await api.get(
      `/ai?repo_path=${repoPath}&path=${filePath}&mode=${mode}`
    );

    setAiSummary(
      res.data.summary
    );

  } catch (err) {

    console.error(err);

    setAiSummary(
      "Unable to generate AI response."
    );

  }

  setLoadingAI(false);

};
const exportJSON = () => {

  if (!graphData) return;

  const exportData = {
    repository: repoPath.split("/").pop(),

    generated_at: new Date().toLocaleString(),

    ...graphData,
  };

  const blob = new Blob(
    [
      JSON.stringify(
        exportData,
        null,
        2
      ),
    ],
    {
      type: "application/json",
    }
  );

  const url =
    URL.createObjectURL(blob);

  const link =
    document.createElement("a");

  link.href = url;

  link.download =
    "repository-analysis.json";

  link.click();

  URL.revokeObjectURL(url);

};
const exportPNG = async () => {

  if (!graphRef.current) return;

  try {

    const dataUrl = await toPng(
      graphRef.current,
      {
        cacheBust: true,

        pixelRatio: 8,

        backgroundColor: "#111111",
      }
    );

    const link = document.createElement("a");

    link.download = "repository-graph.png";

    link.href = dataUrl;

    link.click();

  } catch (err) {

    console.error(err);

  }

};

  useEffect(() => {
  loadRepository();
}, []);
const displayNodes = nodes.map(
  (node) => ({
    ...node,

    style: {
  ...node.style,

  opacity:
    highlightedNodes.length === 0
      ? 1
      : highlightedNodes.includes(
          node.id
        )
      ? 1
      : 0.2,

  boxShadow:
    highlightedNodes.includes(
      node.id
    )
      ? "0 0 20px #4da6ff"
      : "none",

  border:
    highlightedNodes.includes(
      node.id
    )
      ? "2px solid #4da6ff"
      : "2px solid #555",
},
  })
);
const displayEdges = edges.map(
  (edge) => ({
    ...edge,

    animated:
      highlightedEdges.includes(
        edge.id
      ),

    style: {
      stroke:
        highlightedEdges.includes(
          edge.id
        )
          ? "#4da6ff"
          : "#666",

      strokeWidth:
        highlightedEdges.includes(
          edge.id
        )
          ? 3
          : 1,

      opacity:
        highlightedEdges.length === 0
          ? 1
          : highlightedEdges.includes(
              edge.id
            )
          ? 1
          : 0.15,
    },
  })
);
const filteredNodes = nodes.filter(
  (node) =>
    node.data?.label
      ?.toLowerCase()
      .includes(
        searchTerm.toLowerCase()
      )
);
const outgoingDependencies =
  graphData?.edges.filter(
    (e) =>
      e.source === selectedNode?.id
  ) || [];

const incomingDependencies =
  graphData?.edges.filter(
    (e) =>
      e.target === selectedNode?.id
  ) || [];
  const routesCount =
  nodes.filter((n) =>
    n.id.includes("/routes/")
  ).length;

const controllersCount =
  nodes.filter((n) =>
    n.id.includes("/controllers/")
  ).length;

const modelsCount =
  nodes.filter((n) =>
    n.id.includes("/models/")
  ).length;

const servicesCount =
  nodes.filter((n) =>
    n.id.includes("/services/")
  ).length;

const componentsCount =
  nodes.filter((n) =>
    n.id.includes("/components/")
  ).length;
  const mostConnected =
  nodes.reduce(
    (best, node) => {

      const count =
        graphData?.edges.filter(
          (e) =>
            e.source === node.id ||
            e.target === node.id
        ).length || 0;

      return count >
        (best.count || 0)
        ? {
            node,
            count,
          }
        : best;
    },
    {}
  );
  const mostImported =
  nodes.reduce(
    (best, node) => {

      const count =
        graphData?.edges.filter(
          (e) =>
            e.target === node.id
        ).length || 0;

      return count >
        (best.count || 0)
        ? {
            node,
            count,
          }
        : best;
    },
    {}
  );
const selectNodeById = (
  nodeId
) => {
  const node = nodes.find(
    (n) => n.id === nodeId
  );

  if (!node) return;

  setSelectedNode(node);
  fetchAISummary(
    node.id,
    aiMode
);
  const connectedNodes = [];
  const connectedEdges = [];

  graphData?.edges.forEach(
    (edge) => {
      if (
        edge.source === node.id ||
        edge.target === node.id
      ) {
        connectedNodes.push(
          edge.source
        );

        connectedNodes.push(
          edge.target
        );

        connectedEdges.push(
  `${edge.source}-${edge.target}-${graphData.edges.indexOf(edge)}`
);
      }
    }
  );

  setHighlightedNodes([
    node.id,
    ...connectedNodes,
  ]);

  setHighlightedEdges(
    connectedEdges
  );
};
  const dependencyScore =
  outgoingDependencies.length +
  incomingDependencies.length;
  let riskLevel = "🟢 Low";
if (dependencyScore >= 10) {
  riskLevel = "🔴 High";
} else if (
  dependencyScore >= 5
) {
  riskLevel = "🟡 Medium";
}
const topConnectedFiles =
  graphData?.nodes
    ?.map((node) => {
      const incoming =
        graphData.edges.filter(
          (e) =>
            e.target === node.id
        ).length;

      const outgoing =
        graphData.edges.filter(
          (e) =>
            e.source === node.id
        ).length;

      return {
        id: node.id,
        score:
          incoming + outgoing,
      };
    })
    .sort(
      (a, b) =>
        b.score - a.score
    )
    
    .slice(0, 5) || [];
    const deadFiles =
  graphData?.nodes.filter(
    (node) => {

      const incoming =
        graphData.edges.filter(
          (e) =>
            e.target === node.id
        ).length;

      const outgoing =
        graphData.edges.filter(
          (e) =>
            e.source === node.id
        ).length;

      return incoming === 0;
    }
  ) || [];
return (
  <div
    style={{
      width: "100vw",
      height: "100vh",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
    }}
  >
    {/* Top Stats Bar */}
    <div
  style={{
    display: "flex",
    gap: "20px",
    padding: "15px",
    background: "#222",
    color: "white",
    borderBottom: "1px solid #444",
    alignItems: "center",
    fontFamily: "Inter, sans-serif",
    fontSize: "14px",
    fontWeight: "500",
    flexShrink: 0,
    zIndex: 100,
  }}
>
<div
  style={{
    display: "flex",
    gap: "12px",
    marginRight: "25px",
  }}
>
  <StatCard
    icon={<FiFolder />}
    title="Files"
    value={graphData?.total_nodes || 0}
    color="#4C8DFF"
  />

  <StatCard
    icon={<BsDiagram3 />}
    title="Dependencies"
    value={graphData?.total_edges || 0}
    color="#4ADE80"
  />

  <StatCard
    icon={<HiOutlineCubeTransparent />}
    title="Selected"
    value={
      selectedNode
        ? selectedNode.data.label
        : "None"
    }
    color="#A855F7"
  />
</div>
  <input
    type="text"
    placeholder="Search files..."
    value={searchTerm}
    onChange={(e) =>
      setSearchTerm(e.target.value)
    }
    onKeyDown={(e) => {
  if (e.key === "Enter") {
    const foundNode =
  nodes.find((node) =>
    node.data?.label
      ?.toLowerCase()
      .startsWith(
        searchTerm.toLowerCase()
      )
  ) ||
  nodes.find((node) =>
    node.data?.label
      ?.toLowerCase()
      .includes(
        searchTerm.toLowerCase()
      )
  );

    if (foundNode) {
      selectNodeById(
        foundNode.id
      );
    }
  }
}}
    style={{
      padding: "6px",
      marginLeft: "20px",
    }}
  />
  <input
  type="text"
  value={repoPath}
  onChange={(e) =>
    setRepoPath(e.target.value)
  }
  style={{
    width: "350px",
    padding: "6px",
  }}
/>

<button
  onClick={loadRepository}
  style={{
    padding: "6px 12px",
    cursor: "pointer",
  }}
>
  Analyze
</button>
<button
  onClick={exportJSON}
  style={{
    padding: "6px 12px",
    cursor: "pointer",
    marginLeft: "10px",
  }}
>
  📋 Export JSON
</button>
<button
  onClick={exportPNG}
  style={{
    padding: "6px 12px",
    cursor: "pointer",
    marginLeft: "10px",
  }}
>
  🖼 Export PNG
</button>
</div>

    {/* Graph + Sidebar Container */}
<div
  style={{
    flex: 1,
    display: "flex",
    overflow: "hidden",
  }}
>
      {/* Graph Workspace */}
{/* Graph Workspace */}
<div
  ref={graphRef}
  style={{
    flex: 1,
    overflow: "hidden",
    position: "relative",
  }}
>
  <ReactFlow
    nodes={displayNodes}
    edges={displayEdges}
    fitView
    fitViewOptions={{
     padding: 0.4,
    }}
    minZoom={0.1}
    maxZoom={2}
    zoomOnScroll={false}
    panOnScroll={true}
    panOnDrag={true}
   onNodeClick={(_, node) => {
  setSelectedNode(node);
  fetchAISummary(
    node.id,
    aiMode
);

  const connectedNodes = [];
  const connectedEdges = [];

  graphData?.edges.forEach((edge) => {
    if (
      edge.source === node.id ||
      edge.target === node.id
    ) {
      connectedNodes.push(edge.source);
      connectedNodes.push(edge.target);

     connectedEdges.push(
  `${edge.source}-${edge.target}-${graphData.edges.indexOf(edge)}`
);
    }
  });

  setHighlightedNodes([
    node.id,
    ...connectedNodes,
  ]);

  setHighlightedEdges(
    connectedEdges
  );
}}
  >
   <Background />

<Controls
  showZoom={true}
  showFitView={true}
/>
  </ReactFlow>
</div>

      {/* Sidebar */}
      <div
  style={{
    width: "350px",
    width: "135px",
    maxWidth: "350px",

    background: "#111",
    color: "white",

    overflowY: "auto",
    height: "100%",

    fontFamily: "Inter, sans-serif",
    fontSize: "14px",
    lineHeight: "1.6",

    flexShrink: 0,
    padding: "20px",
    borderLeft: "1px solid #444",
  }}
>
        <div
  style={{
    marginBottom: "20px",
  }}
>
<h3
  style={{
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "15px",
  }}
>
  Legend
</h3>

  <p>🟩 Routes</p>
  <p>🟦 Controllers</p>
  <p>🟧 Models</p>
  <p>🟪 Components</p>
  <p>🟥 Services</p>
</div>
<hr />

<h3
  style={{
    fontSize: "18px",
    fontWeight: "600",
  }}
>
  Architecture Overview
</h3>

<p>
  Routes: {routesCount}
</p>

<p>
  Controllers: {controllersCount}
</p>

<p>
  Models: {modelsCount}
</p>

<p>
  Services: {servicesCount}
</p>

<p>
  Components: {componentsCount}
</p>

<hr />

<p>
  <strong>
    Most Connected:
  </strong>
</p>

<p>
  {mostConnected?.node?.data?.label}
  {" "}
  ({mostConnected?.count})
</p>

<p>
  <strong>
    Most Imported:
  </strong>
</p>

<p>
  {mostImported?.node?.data?.label}
  {" "}
  ({mostImported?.count})
</p>

<hr/>
<hr />

<h4
  style={{
    color: "white",
    fontWeight: "600",
  }}
>
  Circular Dependencies
</h4>

<p>
  <strong>Count:</strong>{" "}
  {graphData?.cycle_count || 0}
</p>

{graphData?.cycle_count === 0 ? (

  <p
    style={{
      color: "#4CAF50",
    }}
  >
    ✅ No circular dependencies found.
  </p>

) : (

  <div>

    {graphData?.cycles.map(
      (cycle, index) => (

        <p
          key={index}
          style={{
            color: "#ff5252",
            marginBottom: "10px",
            lineHeight: "1.7",
          }}
        >
          {cycle.join(" → ")}
        </p>

      )
    )}

  </div>

)}

<hr />
<h2
  style={{
    fontSize: "18px",
    fontWeight: "600",
  }}
>
  File Details
</h2>

        {selectedNode ? (
          <>
           <h3
  style={{
    fontSize: "24px",
    fontWeight: "700",
    marginBottom: "10px",
  }}
>
  {selectedNode.data?.label}
</h3>

{dependencyScore >= 10 && (
  <p
    style={{
      color: "#ff5252",
      fontWeight: "bold",
    }}
  >
    ⚠ Critical File
  </p>
)}

           <p>
  <strong>Path:</strong>
</p>

<p
  style={{
    wordBreak: "break-all",
    marginBottom: "15px",
  }}
>
  {selectedNode.id}
</p>

<div
  style={{
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
    marginBottom: "20px",
    marginTop: "15px",
  }}
>

  {[
    {
      title: "LoC",
      value: selectedNode.data?.loc,
    },
    {
      title: "Functions",
      value: selectedNode.data?.functions,
    },
    {
      title: "Classes",
      value: selectedNode.data?.classes,
    },
    {
      title: "Imports",
      value: selectedNode.data?.imports,
    },
    {
      title: "Exports",
      value: selectedNode.data?.exports,
    },
    {
      title: "Complexity",
      value:
        selectedNode.data?.complexity <= 5
          ? "🟢 Low"
          : selectedNode.data?.complexity <= 10
          ? "🟡 Medium"
          : selectedNode.data?.complexity <= 20
          ? "🟠 High"
          : "🔴 Very High",
    },
  ].map((metric) => (

    <div
  key={metric.title}
  style={{
    background: "linear-gradient(145deg, #1b1b1b, #242424)",
    border: `2px solid ${metric.color}`,
    borderRadius: "16px",
    padding: "18px",
    textAlign: "center",
    boxShadow: `0 0 15px ${metric.color}33`,
    transition: "0.3s",
  }}
>

      <div
        style={{
          fontSize: "12px",
          color: "#999",
          marginBottom: "5px",
        }}
      >
        {metric.title}
      </div>

      <div
        style={{
          fontWeight: "bold",
          fontSize: "18px",
        }}
      >
        {metric.value}
      </div>

    </div>

  ))}

</div>

<hr />
<h4>
  {aiMode === "explain" && "🤖 AI Explanation"}

  {aiMode === "refactor" && "🛠 Refactoring Suggestions"}

  {aiMode === "bugs" && "🐞 Bug Analysis"}

  {aiMode === "improve" && "🚀 Improvement Suggestions"}
</h4>

<div
  style={{
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
    marginBottom: "15px",
  }}
>

  {[
    "explain",
    "refactor",
    "bugs",
    "improve",
  ].map((mode) => (

    <button
      key={mode}

      onClick={() => {

        setAiMode(mode);

        fetchAISummary(
          selectedNode.id,
          mode
        );

      }}

      style={{
        padding: "6px 10px",
        cursor: "pointer",

        borderRadius: "6px",

        border:
          aiMode === mode
            ? "2px solid #4da6ff"
            : "1px solid #555",

        background:
  aiMode === mode
    ? mode === "explain"
      ? "#2563eb"

      : mode === "refactor"
      ? "#7c3aed"

      : mode === "bugs"
      ? "#dc2626"

      : "#059669"

    : "#222",

        color: "white",

        textTransform: "capitalize",
      }}
    >

      {
  mode === "explain"
    ? "Explain"

    : mode === "refactor"
    ? "Refactor"

    : mode === "bugs"
    ? "Find Bugs"

    : "Improve"
}

    </button>

  ))}

</div>

{loadingAI ? (

  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "10px",
      color: "#bbb",
    }}
  >

    <div
      style={{
        width: "14px",
        height: "14px",
        borderRadius: "50%",
        border: "2px solid #555",
        borderTop: "2px solid #4da6ff",
        animation: "spin 1s linear infinite",
      }}
    />

    <span>

      {
        aiMode === "explain"
          ? "Explaining code..."

          : aiMode === "refactor"
          ? "Generating refactoring suggestions..."

          : aiMode === "bugs"
          ? "Searching for bugs..."

          : "Looking for improvements..."
      }

    </span>

  </div>

) : (

  <div
    style={{
      whiteSpace: "pre-wrap",
      lineHeight: "1.8",
      color: "#ddd",
      background: "#1a1a1a",
      padding: "12px",
      borderRadius: "10px",
      border: "1px solid #333",
    }}
  >
    {aiSummary}
  </div>

)}
<hr />

<h4>
  Dependency Analysis
</h4>

<p>
  <strong>
    Dependency Score:
  </strong>{" "}
  {dependencyScore}
</p>

<p>
  <strong>
    Risk Level:
  </strong>{" "}
  {riskLevel}
</p>
            <h4>Outgoing Dependencies</h4>

<p>
  Count: {outgoingDependencies.length}
</p>

<ul
  style={{
    fontSize: "14px",
    lineHeight: "1.8",
  }}
>
  {outgoingDependencies.map(
    (dep, index) => (
      <li
        key={index}
        style={{
          cursor: "pointer",
          color: "#4da6ff",
        }}
        onClick={() =>
          selectNodeById(
            dep.target
          )
        }
      >
        🔗{" "}
        {dep.target
          .split("/")
          .pop()}
      </li>
    )
  )}
</ul>

<hr />

<h4>Incoming Dependencies</h4>

<p>
  Count: {incomingDependencies.length}
</p>

<ul
  style={{
    fontSize: "14px",
    lineHeight: "1.8",
  }}
>
  {incomingDependencies.map(
    (dep, index) => (
      <li
        key={index}
        style={{
          cursor: "pointer",
          color: "#4da6ff",
        }}
        onClick={() =>
          selectNodeById(
            dep.source
          )
        }
      >
        🔗{" "}
        {dep.source
          .split("/")
          .pop()}
      </li>
    )
  )}
</ul>
<hr />

<h4>
  Top Connected Files
</h4>

<ol
  style={{
    paddingLeft: "20px",
    lineHeight: "1.8",
  }}
>
  {topConnectedFiles.map(
    (file, index) => (
      <li
  key={index}
  style={{
    cursor: "pointer",
    color: "#4CAF50",
  }}
  onClick={() =>
    selectNodeById(file.id)
  }
>
        {file.id.split("/").pop()}
        {" "}
        ({file.score})
      </li>
    )
  )}
</ol>
<hr />
          </>
        ) : (
          <p>Click a node</p>
        )}
        <hr />

<h4>
  Dead Files
</h4>

<p>
  Count: {deadFiles.length}
</p>

{deadFiles.length > 0 ? (
  <ul>
    {deadFiles.map(
      (file, index) => (
        <li
          key={index}
          style={{
            cursor: "pointer",
            color: "#ff5252",
          }}
          onClick={() =>
            selectNodeById(file.id)
          }
        >
          {file.id
            .split("/")
            .pop()}
        </li>
      )
    )}
  </ul>
) : (
  <p>
    🎉 No dead files found
  </p>
)}
      </div>
    </div>
    
  </div>
  
);
}

export default App;