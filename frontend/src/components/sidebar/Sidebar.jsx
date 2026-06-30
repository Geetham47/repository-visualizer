// components/sidebar/Sidebar.jsx
import React from "react";
import ArchitectureCard from "./ArchitectureCard";
import RepositoryHealth from "./RepositoryHealth";
import FileDetailsCard from "./FileDetailsCard";
import AIAssistantCard from "./AIAssistantCard";
import DependencyCard from "./DependencyCard";
import TopFilesCard from "./TopFilesCard";
import DeadFilesCard from "./DeadFilesCard";

function LegendCard() {
  return (
    <div
      style={{
        background: "#111318",
        padding: "1px",
        backgroundImage: "linear-gradient(135deg, rgba(6, 182, 212, 0.4) 0%, rgba(59, 130, 246, 0.15) 40%, transparent 100%)",
        borderRadius: "14px",
        marginBottom: "16px",
        boxShadow: "0 8px 32px rgba(0,0,0,.35), 0 0 20px rgba(6, 182, 212, 0.02)",
      }}
    >
      <div style={{ background: "#13151A", borderRadius: "13px", padding: "16px" }}>
        <div style={{ margin: "0 0 12px 0", fontSize: "12px", fontWeight: "600", color: "#FFFFFF", letterSpacing: "0.5px", textTransform: "uppercase", opacity: 0.9 }}>
          Legend
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px 12px",
            color: "#D1D5DB",
            fontSize: "12px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <span style={{ fontSize: "10px" }}>🟩</span> Routes
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <span style={{ fontSize: "10px" }}>🟦</span> Controllers
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <span style={{ fontSize: "10px" }}>🟧</span> Models
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <span style={{ fontSize: "10px" }}>🟪</span> Components
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <span style={{ fontSize: "10px" }}>🟥</span> Services
          </div>
        </div>
      </div>
    </div>
  );
}

function Sidebar({
  graphData,
  routesCount,
  controllersCount,
  modelsCount,
  servicesCount,
  componentsCount,
  selectedNode,
  dependencyScore,
  riskLevel,
  outgoingDependencies,
  incomingDependencies,
  topConnectedFiles,
  deadFiles,
  mostConnected,
  mostImported,
  selectNodeById,
  aiMode,
  setAiMode,
  fetchAISummary,
  loadingAI,
  aiSummary,
}) {
  return (
    <div
      style={{
        width: "330px",
        height: "100%",
        overflowY: "auto",
        background: "#0B0C10",
        padding: "16px",
        boxSizing: "border-box",
        position: "relative",
        borderLeft: "1px solid rgba(99, 102, 241, 0.4)",
        boxShadow: "-10px 0 30px rgba(99, 102, 241, 0.05)",
      }}
    >
      <div 
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.6), transparent)",
          pointerEvents: "none",
        }}
      />

      <LegendCard />

      <ArchitectureCard
        routesCount={routesCount}
        controllersCount={controllersCount}
        modelsCount={modelsCount}
        servicesCount={servicesCount}
        componentsCount={componentsCount}
      />

      <RepositoryHealth
        graphData={graphData}
        deadFiles={deadFiles}
        riskLevel={riskLevel}
      />

      <FileDetailsCard
        selectedNode={selectedNode}
        dependencyScore={dependencyScore}
        riskLevel={riskLevel}
      />

      <AIAssistantCard
        selectedNode={selectedNode}
        aiMode={aiMode}
        setAiMode={setAiMode}
        fetchAISummary={fetchAISummary}
        loadingAI={loadingAI}
        aiSummary={aiSummary}
      />

      <DependencyCard
        outgoingDependencies={outgoingDependencies}
        incomingDependencies={incomingDependencies}
        selectNodeById={selectNodeById}
      />

      <TopFilesCard
        topConnectedFiles={topConnectedFiles}
        mostConnected={mostConnected}
        mostImported={mostImported}
        selectNodeById={selectNodeById}
      />

      <DeadFilesCard deadFiles={deadFiles} selectNodeById={selectNodeById} />
    </div>
  );
}

export default Sidebar;