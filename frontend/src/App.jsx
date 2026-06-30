import { useEffect, useState, useRef } from "react";
import api from "./services/api";
import { toPng } from "html-to-image";

import { getLayoutedElements } from "./utils/layout";

import Navbar from "./components/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import GraphPanel from "./components/graph/GraphPanel";

// Infers a CustomNode/nodeStyle "type" from a file path when the backend
// doesn't already provide one on the node's data.
function inferNodeType(path) {
  if (path.includes("/routes/")) return "route";
  if (path.includes("/controllers/")) return "controller";
  if (path.includes("/models/")) return "model";
  if (path.includes("/components/")) return "component";
  if (path.includes("/services/")) return "service";
  return undefined;
}

function App() {
  // ----------------------------- state -----------------------------
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [highlightedNodes, setHighlightedNodes] = useState([]);
  const [highlightedEdges, setHighlightedEdges] = useState([]);
  const [incomingEdges, setIncomingEdges] = useState([]);
  const [outgoingEdges, setOutgoingEdges] = useState([]);
  const [graphData, setGraphData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [repoPath, setRepoPath] = useState(
  localStorage.getItem("lastRepoPath") || ""
);
  const [aiSummary, setAiSummary] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);
  const [aiMode, setAiMode] = useState("explain");

  const graphRef = useRef(null);

  // --------------------------- API calls ----------------------------
  const loadRepository = () => {
    if (repoPath.trim() !== "") {
  localStorage.setItem("lastRepoPath", repoPath);
}
    api
      .get(`/graph?path=${repoPath}`)
      .then((res) => {
        setGraphData(res.data);

        const rawNodes = res.data.nodes;

        const graphEdges = res.data.edges.map((edge, index) => ({
          id: `${edge.source}-${edge.target}-${index}`,
          source: edge.source,
          target: edge.target,
          type: "straight",
          animated: highlightedEdges.includes(
            `${edge.source}-${edge.target}`
          ),
          style: {
            stroke: highlightedEdges.includes(
              `${edge.source}-${edge.target}`
            )
              ? "#00bfff"
              : "#666",
            strokeWidth: highlightedEdges.includes(
              `${edge.source}-${edge.target}`
            )
              ? 4
              : 1,
            opacity:
              highlightedEdges.length === 0
                ? 1
                : highlightedEdges.includes(`${edge.source}-${edge.target}`)
                ? 1
                : 0.15,
          },
        }));

        const { nodes: graphNodes, edges: layoutedEdges } =
          getLayoutedElements(rawNodes, graphEdges);

        // Wire every node up to render through CustomNode/nodeStyle.js
        setNodes(
          graphNodes.map((n) => ({
            ...n,
            type: "custom",
            data: {
              ...n.data,
              type: n.data?.type || inferNodeType(n.id),
            },
          }))
        );

        setEdges(layoutedEdges);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const fetchAISummary = async (filePath, mode = aiMode) => {
    setLoadingAI(true);

    try {
      const res = await api.get(
        `/ai?repo_path=${repoPath}&path=${filePath}&mode=${mode}`
      );

      setAiSummary(res.data.summary);
    } catch (err) {
      console.error(err);
      setAiSummary("Unable to generate AI response.");
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

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "repository-analysis.json";
    link.click();

    URL.revokeObjectURL(url);
  };

  const exportPNG = async () => {
    if (!graphRef.current) return;

    try {
      const dataUrl = await toPng(graphRef.current, {
        cacheBust: true,
        pixelRatio: 8,
        backgroundColor: "#111111",
      });

      const link = document.createElement("a");

      link.download = "repository-graph.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error(err);
    }
  };

  const exportSourceFile = async () => {

  if (!selectedNode) {

    alert("Please select a file first.");

    return;

  }

  try {

    const response = await api.get(

      `/source?repo_path=${repoPath}&path=${selectedNode.id}`,

      {
        responseType: "blob",
      }

    );

    const blob = new Blob(
      [response.data],
      {
        type: "text/plain",
      }
    );

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = selectedNode.data.label;

    link.click();

    window.URL.revokeObjectURL(url);

  } catch (err) {

    console.error(err);

    alert("Unable to export file.");

  }

};
  // ---------------------------- effects -----------------------------
  useEffect(() => {

  if (repoPath) {
    loadRepository();
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps

}, []);

  // -------------------------- event handlers -------------------------
  const highlightFromNode = (node) => {
  const connectedNodes = [];

  const incoming = [];
  const outgoing = [];

  graphData?.edges.forEach((edge, index) => {

    if (edge.source === node.id) {

      connectedNodes.push(edge.target);

      outgoing.push(
        `${edge.source}-${edge.target}-${index}`
      );

    }

    if (edge.target === node.id) {

      connectedNodes.push(edge.source);

      incoming.push(
        `${edge.source}-${edge.target}-${index}`
      );

    }

  });

  setHighlightedNodes([
    node.id,
    ...connectedNodes,
  ]);

  setIncomingEdges(incoming);

  setOutgoingEdges(outgoing);
};

  const selectNodeById = (nodeId) => {
    const node = nodes.find((n) => n.id === nodeId);
    if (!node) return;

    setSelectedNode(node);
    fetchAISummary(node.id, aiMode);
    highlightFromNode(node);
  };

  const onNodeClick = (_, node) => {
    setSelectedNode(node);
    fetchAISummary(node.id, aiMode);
    highlightFromNode(node);
  };

  // --------------------------- derived values --------------------------
  const displayNodes = nodes.map((node) => ({
    ...node,
    style: {
      ...node.style,
      opacity:
        highlightedNodes.length === 0
          ? 1
          : highlightedNodes.includes(node.id)
          ? 1
          : 0.2,
      boxShadow: highlightedNodes.includes(node.id)
        ? "0 0 28px rgba(168,85,247,.75)"
        : "none",
      border: highlightedNodes.includes(node.id)
        ? "2px solid #A855F7"
        : "2px solid #555",
    },
  }));

  const displayEdges = edges.map((edge) => ({

  ...edge,

  animated:
    incomingEdges.includes(edge.id) ||
    outgoingEdges.includes(edge.id),

  style: {

    stroke:
      outgoingEdges.includes(edge.id)
        ? "#A855F7"
        : incomingEdges.includes(edge.id)
        ? "#22C55E"
        : "#666",

    strokeWidth:
      outgoingEdges.includes(edge.id) ||
      incomingEdges.includes(edge.id)
        ? 3
        : 1,

    opacity:
      incomingEdges.length === 0 &&
      outgoingEdges.length === 0
        ? 1
        : incomingEdges.includes(edge.id) ||
          outgoingEdges.includes(edge.id)
        ? 1
        : 0.15,
  },

}));

  const outgoingDependencies =
    graphData?.edges.filter((e) => e.source === selectedNode?.id) || [];

  const incomingDependencies =
    graphData?.edges.filter((e) => e.target === selectedNode?.id) || [];

  // Sidebar's DependencyCard renders plain file-id strings.
  const outgoingDependencyIds = outgoingDependencies.map((dep) => dep.target);
  const incomingDependencyIds = incomingDependencies.map((dep) => dep.source);

  const routesCount = nodes.filter((n) => n.id.includes("/routes/")).length;
  const controllersCount = nodes.filter((n) =>
    n.id.includes("/controllers/")
  ).length;
  const modelsCount = nodes.filter((n) => n.id.includes("/models/")).length;
  const servicesCount = nodes.filter((n) =>
    n.id.includes("/services/")
  ).length;
  const componentsCount = nodes.filter((n) =>
    n.id.includes("/components/")
  ).length;

  const mostConnected = nodes.reduce((best, node) => {
    const count =
      graphData?.edges.filter(
        (e) => e.source === node.id || e.target === node.id
      ).length || 0;

    return count > (best.count || 0) ? { node, count } : best;
  }, {});

  const mostImported = nodes.reduce((best, node) => {
    const count =
      graphData?.edges.filter((e) => e.target === node.id).length || 0;

    return count > (best.count || 0) ? { node, count } : best;
  }, {});

  const mostConnectedLabel = mostConnected?.node
    ? `${mostConnected.node.data?.label} (${mostConnected.count})`
    : "None";

  const mostImportedLabel = mostImported?.node
    ? `${mostImported.node.data?.label} (${mostImported.count})`
    : "None";

  const dependencyScore =
    outgoingDependencies.length + incomingDependencies.length;

  let riskLevel = "🟢 Low";
  if (dependencyScore >= 10) {
    riskLevel = "🔴 High";
  } else if (dependencyScore >= 5) {
    riskLevel = "🟡 Medium";
  }

  const topConnectedFiles =
    graphData?.nodes
      ?.map((node) => {
        const incoming = graphData.edges.filter(
          (e) => e.target === node.id
        ).length;

        const outgoing = graphData.edges.filter(
          (e) => e.source === node.id
        ).length;

        return {
          id: node.id,
          count: incoming + outgoing,
        };
      })
      .sort((a, b) => b.count - a.count)
      .slice(0, 5) || [];

  const deadFiles =
    graphData?.nodes
      .filter((node) => {
        const incoming = graphData.edges.filter(
          (e) => e.target === node.id
        ).length;

        return incoming === 0;
      })
      .map((node) => node.id) || [];

  // ------------------------------ render ------------------------------
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
      <Navbar
        graphData={graphData}
        selectedNode={selectedNode}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectNodeById={selectNodeById}
        nodes={nodes}
        repoPath={repoPath}
        setRepoPath={setRepoPath}
        loadRepository={loadRepository}
        exportJSON={exportJSON}
        exportPNG={exportPNG}
        exportSourceFile={exportSourceFile}
      />

      <div
        style={{
          flex: 1,
          display: "flex",
          overflow: "hidden",
        }}
      >
        <GraphPanel
          displayNodes={displayNodes}
          displayEdges={displayEdges}
          onNodeClick={onNodeClick}
          graphRef={graphRef}
        />

        <Sidebar
          graphData={graphData}
          routesCount={routesCount}
          controllersCount={controllersCount}
          modelsCount={modelsCount}
          servicesCount={servicesCount}
          componentsCount={componentsCount}
          selectedNode={selectedNode}
          dependencyScore={dependencyScore}
          riskLevel={riskLevel}
          outgoingDependencies={outgoingDependencyIds}
          incomingDependencies={incomingDependencyIds}
          topConnectedFiles={topConnectedFiles}
          deadFiles={deadFiles}
          mostConnected={mostConnectedLabel}
          mostImported={mostImportedLabel}
          selectNodeById={selectNodeById}
          aiMode={aiMode}
          setAiMode={setAiMode}
          fetchAISummary={fetchAISummary}
          loadingAI={loadingAI}
          aiSummary={aiSummary}
        />
      </div>
    </div>
  );
}

export default App;
