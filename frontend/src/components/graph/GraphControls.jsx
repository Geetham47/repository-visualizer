import {
  FiPlus,
  FiMinus,
  FiMaximize2,
} from "react-icons/fi";

import { useReactFlow } from "@xyflow/react";

function GraphControls() {

  const {
    zoomIn,
    zoomOut,
    fitView,
  } = useReactFlow();

  return (

    <div
      style={{
        position: "absolute",
        left: "22px",
        bottom: "22px",

        zIndex: 1000,

        display: "flex",
        flexDirection: "column",

        padding: "10px",

        gap: "10px",

        borderRadius: "24px",

        background:
          "rgba(18,20,28,.88)",

        backdropFilter:
          "blur(18px)",

        border:
          "1px solid rgba(120,120,255,.15)",

        boxShadow:
          `
          0 15px 40px rgba(0,0,0,.45),
          0 0 25px rgba(99,102,241,.18)
          `,
      }}
    >

      <ControlButton
        icon={<FiPlus />}
        onClick={() => zoomIn()}
      />

      <ControlButton
        icon={<FiMinus />}
        onClick={() => zoomOut()}
      />

      <ControlButton
        icon={<FiMaximize2 />}
        onClick={() =>
          fitView({
            duration: 600,
            padding: .4,
          })
        }
      />

    </div>

  );

}

function ControlButton({
  icon,
  onClick,
}) {

  return (

    <button
      onClick={onClick}
      style={{
        width: "46px",
        height: "46px",

        borderRadius: "16px",

        border:
          "1px solid rgba(255,255,255,.04)",

        background:
          "linear-gradient(180deg,#242938,#1C202C)",

        color: "#C6CEFF",

        cursor: "pointer",

        fontSize: "19px",

        display: "flex",

        justifyContent: "center",

        alignItems: "center",

        transition: ".22s",

        boxShadow:
          "0 6px 18px rgba(0,0,0,.25)",
      }}

      onMouseEnter={(e)=>{

        e.currentTarget.style.transform="translateY(-2px)";

        e.currentTarget.style.background=
          "linear-gradient(180deg,#343B52,#252C3C)";

        e.currentTarget.style.boxShadow=
          "0 0 18px rgba(99,102,241,.35)";
      }}

      onMouseLeave={(e)=>{

        e.currentTarget.style.transform="translateY(0px)";

        e.currentTarget.style.background=
          "linear-gradient(180deg,#242938,#1C202C)";

        e.currentTarget.style.boxShadow=
          "0 6px 18px rgba(0,0,0,.25)";
      }}

    >

      {icon}

    </button>

  );

}

export default GraphControls;