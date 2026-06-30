import {
  FiSearch,
  FiFolder,
} from "react-icons/fi";

import {
  HiOutlineCubeTransparent,
} from "react-icons/hi2";

import {
  BsDiagram3,
} from "react-icons/bs";

import {
  FaProjectDiagram,
} from "react-icons/fa";

import ExportDropdown from "./ExportDropdown";

function Navbar({
  graphData,
  selectedNode,
  searchTerm,
  setSearchTerm,
  selectNodeById,
  nodes,
  selectedZip,
  setSelectedZip,
  uploadRepository,
  exportJSON,
  exportPNG,
  exportSourceFile,
}) {
  return (
    <div
      style={{
        height: "64px",
        background: "#111318",
        borderBottom: "1px solid #262A33",
        display: "flex",
        alignItems: "center",
        gap: "16px",
        padding: "0 20px",
        boxShadow: "0 4px 20px rgba(0,0,0,.35)",
        boxSizing: "border-box",
      }}
    >
      {/* 1. LOGO */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "10px",
            background: "linear-gradient(135deg,#6366F1,#8B5CF6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0 0 16px rgba(99,102,241,.45)",
            flexShrink: 0,
          }}
        >
          <FaProjectDiagram size={16} color="white" />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontSize: "16px",
              fontWeight: "700",
              color: "white",
              lineHeight: "1.2",
              whiteSpace: "nowrap",
            }}
          >
            RepoVision
          </div>

          <div
            style={{
              fontSize: "10px",
              marginTop: "1px",
              color: "#9AA4B2",
              whiteSpace: "nowrap",
              lineHeight: "1",
            }}
          >
            AI Repository Intelligence
          </div>
        </div>
      </div>

      {/* 2. STAT BADGES */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          flexShrink: 0,
        }}
      >
        {/* Files */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "#1C1F26",
            border: "1px solid #2E3440",
            borderRadius: "8px",
            padding: "0 12px",
            height: "36px",
            boxSizing: "border-box",
          }}
        >
          <FiFolder color="#4F8BFF" size={14} style={{ flexShrink: 0 }} />
          <span style={{ color: "#9AA4B2", fontSize: "13px" }}>Files:</span>
          <span style={{ color: "white", fontSize: "13px", fontWeight: "600" }}>
            {graphData?.total_nodes || 0}
          </span>
        </div>

        {/* Dependencies */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "#1C1F26",
            border: "1px solid #2E3440",
            borderRadius: "8px",
            padding: "0 12px",
            height: "36px",
            boxSizing: "border-box",
          }}
        >
          <BsDiagram3 color="#34D399" size={14} style={{ flexShrink: 0 }} />
          <span style={{ color: "#9AA4B2", fontSize: "13px" }}>Deps:</span>
          <span style={{ color: "white", fontSize: "13px", fontWeight: "600" }}>
            {graphData?.total_edges || 0}
          </span>
        </div>

        {/* Selected */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "#1C1F26",
            border: "1px solid #2E3440",
            borderRadius: "8px",
            padding: "0 12px",
            height: "36px",
            maxWidth: "220px",
            boxSizing: "border-box",
          }}
        >
          <HiOutlineCubeTransparent color="#A855F7" size={14} style={{ flexShrink: 0 }} />
          <span style={{ color: "#9AA4B2", fontSize: "13px", whiteSpace: "nowrap" }}>Selected:</span>
          <span
            style={{
              color: "white",
              fontSize: "13px",
              fontWeight: "600",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {selectedNode ? selectedNode.data.label : "None"}
          </span>
        </div>
      </div>

      {/* 3. CONTROLS & UTILITIES (Follows cleanly immediately after the selected box) */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          minWidth: 0,
          marginLeft: "4px",
        }}
      >
        {/* Search Field */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            background: "#1C1F26",
            height: "36px",
            padding: "0 10px",
            borderRadius: "8px",
            border: "1px solid #2E3440",
            minWidth: 0,
          }}
        >
          <FiSearch color="#8A93A3" style={{ flexShrink: 0 }} />

          <input
            placeholder="Search files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const foundNode =
                  nodes.find((node) =>
                    node.data?.label
                      ?.toLowerCase()
                      ?.startsWith(searchTerm.toLowerCase())
                  ) ||
                  nodes.find((node) =>
                    node.data?.label
                      ?.toLowerCase()
                      ?.includes(searchTerm.toLowerCase())
                  );

                if (foundNode) {
                  selectNodeById(foundNode.id);
                }
              }
            }}
            style={{
              background: "transparent",
              border: "none",
              outline: "none",
              marginLeft: "6px",
              width: "clamp(80px, 10vw, 160px)",
              fontSize: "13px",
              color: "white",
              minWidth: 0,
            }}
          />
        </div>

        {/* ZIP Upload */}
<div
  style={{
    display: "flex",
    alignItems: "center",
    background: "#1C1F26",
    height: "36px",
    padding: "0 10px",
    borderRadius: "8px",
    border: "1px solid #2E3440",
    minWidth: 0,
  }}
>
  <FiFolder color="#8A93A3" />

  <input
    type="file"
    accept=".zip"
    onChange={(e) => setSelectedZip(e.target.files[0])}
    style={{
      marginLeft: "8px",
      color: "white",
      fontSize: "12px",
      width: "220px",
    }}
  />
</div>

        {/* Analyze Button */}
        <button
          onClick={uploadRepository}
          style={{
            height: "36px",
            padding: "0 14px",
            background: "linear-gradient(135deg,#6366F1,#8B5CF6)",
            border: "none",
            borderRadius: "8px",
            color: "white",
            fontWeight: "600",
            fontSize: "13px",
            cursor: "pointer",
            transition: "0.25s",
            boxShadow: "0 0 12px rgba(99,102,241,.30)",
            flexShrink: 0,
            whiteSpace: "nowrap",
          }}
        >
          Analyze
        </button>

        {/* Export Button Normalization Container Wrapper */}
        <div 
          style={{ 
            height: "36px", 
            display: "inline-flex", 
            alignItems: "center",
            boxSizing: "border-box",
          }}
          className="custom-export-wrapper"
        >
          {/* Internal CSS Rule injector to forcefully clean up child component styling variants */}
          <style>{`
            .custom-export-wrapper > div,
            .custom-export-wrapper button {
              height: 36px !important;
              max-height: 36px !important;
              border-radius: 8px !important;
              font-size: 13px !important;
              box-sizing: border-box !important;
              display: flex !important;
              align-items: center !important;
            }
          `}</style>
          <ExportDropdown exportJSON={exportJSON} exportPNG={exportPNG}  exportSourceFile={exportSourceFile}/>
        </div>
      </div>
    </div>
  );
}

export default Navbar;