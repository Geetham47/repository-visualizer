function InfoTile({
  title,
  value,
  color = "#6366F1",
}) {
  return (
    <div
      style={{
        background: "#20242B",
        borderRadius: "12px",
        padding: "14px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          fontSize: "11px",
          color: "#9CA3AF",
          marginBottom: "8px",
          textTransform: "uppercase",
          letterSpacing: "1px",
        }}
      >
        {title}
      </div>

      <div
        style={{
          fontSize: "22px",
          fontWeight: "700",
          color,
        }}
      >
        {value}
      </div>
    </div>
  );
}

function FileDetailsCard({

  selectedNode,

  dependencyScore,

  riskLevel,

}) {

  if (!selectedNode) {

    return (

<div
style={{

background:"#1A1D23",

border:"1px solid #2B3038",

borderRadius:"18px",

padding:"20px",

marginBottom:"18px",

}}

>

<div
style={{
fontSize:"18px",
fontWeight:"700",
color:"white",
marginBottom:"14px",
}}
>

File Details

</div>

<div
style={{
color:"#9CA3AF",
lineHeight:"1.7",
}}
>

Select any file from the graph to inspect
its metrics, dependency score and AI insights.

</div>

</div>

);

  }

  const data = selectedNode.data || {};

  return (

<div
style={{

background:"#1A1D23",

border:"1px solid #2B3038",

borderRadius:"18px",

padding:"20px",

marginBottom:"18px",

boxShadow:"0 8px 20px rgba(0,0,0,.25)",

}}

>

<div
style={{

fontSize:"18px",

fontWeight:"700",

color:"white",

marginBottom:"15px",

}}

>

File Details

</div>

<div
style={{
fontSize:"20px",
fontWeight:"700",
color:"white",
marginBottom:"6px",
}}
>

{data.label}

</div>

<div
style={{
fontSize:"13px",
color:"#9CA3AF",
wordBreak:"break-all",
marginBottom:"18px",
}}
>

{selectedNode.id}

</div>

<div
style={{

display:"grid",

gridTemplateColumns:"1fr 1fr",

gap:"12px",

}}

>

<InfoTile
title="LOC"
value={data.loc}
/>

<InfoTile
title="Functions"
value={data.functions}
/>

<InfoTile
title="Imports"
value={data.imports}
/>

<InfoTile
title="Exports"
value={data.exports}
/>

<InfoTile
title="Classes"
value={data.classes}
/>

<InfoTile
title="Complexity"
value={data.complexity}
/>

</div>

<div
style={{
marginTop:"18px",
}}
>

<div
style={{
display:"flex",
justifyContent:"space-between",
marginBottom:"10px",
}}
>

<span
style={{
color:"#D1D5DB",
}}
>

Dependency Score

</span>

<strong
style={{
color:"#F59E0B",
}}
>

{dependencyScore}

</strong>

</div>

<div
style={{
display:"flex",
justifyContent:"space-between",
}}
>

<span
style={{
color:"#D1D5DB",
}}
>

Risk Level

</span>

<strong
style={{
color:
riskLevel.includes("Low")
?"#22C55E"
:riskLevel.includes("Medium")
?"#F59E0B"
:"#EF4444",
}}
>

{riskLevel}

</strong>

</div>

</div>

</div>

);

}

export default FileDetailsCard;