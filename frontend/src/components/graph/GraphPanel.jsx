import ReactFlow, {
  Background,
  Controls,
  MiniMap,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import CustomNode from "./CustomNode";

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

flex:1,

margin:"18px",

background:"#111318",

border:"1px solid #2B3038",

borderRadius:"22px",

overflow:"hidden",

display:"flex",

flexDirection:"column",

boxShadow:"0 10px 30px rgba(0,0,0,.35)",

}}

>

{/* HEADER */}

<div

style={{

height:"64px",

padding:"0 24px",

display:"flex",

justifyContent:"space-between",

alignItems:"center",

borderBottom:"1px solid #2B3038",

background:"#161A20",

}}

>

<div>

<div

style={{

fontSize:"20px",

fontWeight:"700",

color:"white",

}}

>

Repository Graph

</div>

<div

style={{

fontSize:"13px",

color:"#94A3B8",

marginTop:"4px",

}}

>

Interactive Dependency Visualization

</div>

</div>

<div

style={{

padding:"8px 16px",

background:"#20242B",

borderRadius:"12px",

color:"#CBD5E1",

fontSize:"13px",

}}

>

React Flow

</div>

</div>

{/* GRAPH */}

<div

ref={graphRef}

style={{

flex:1,

background:"#0F1116",

}}

>

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

<MiniMap
    pannable
    zoomable
    style={{
        background: "#171A20",
        border: "1px solid #30333D",
        borderRadius: 12,
    }}
    nodeColor={(node) => {

        switch (node.data?.type) {

            case "component":
                return "#8B5CF6";

            case "route":
                return "#22C55E";

            case "controller":
                return "#EF4444";

            case "service":
                return "#3B82F6";

            case "model":
                return "#F59E0B";

            default:
                return "#64748B";
        }

    }}
/>

<Controls
    showZoom
    showFitView
    showInteractive={false}
/>

</ReactFlow>

</div>

</div>

);

}

export default GraphPanel;