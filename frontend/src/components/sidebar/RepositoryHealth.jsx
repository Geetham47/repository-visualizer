function RepositoryHealth({

  graphData,

  deadFiles,

  riskLevel,

}) {

  const healthItems = [

    {
      title: "Total Files",
      value: graphData?.total_nodes || 0,
      color: "#3B82F6",
    },

    {
      title: "Dependencies",
      value: graphData?.total_edges || 0,
      color: "#22C55E",
    },

    {
      title: "Circular",
      value: graphData?.cycle_count || 0,
      color:
        graphData?.cycle_count === 0
          ? "#22C55E"
          : "#EF4444",
    },

    {
      title: "Dead Files",
      value: deadFiles.length,
      color:
        deadFiles.length === 0
          ? "#22C55E"
          : "#F59E0B",
    },

    {
      title: "Risk",

      value: riskLevel,

      color:
        riskLevel.includes("Low")
          ? "#22C55E"
          : riskLevel.includes("Medium")
          ? "#F59E0B"
          : "#EF4444",
    },

  ];

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

marginBottom:"18px",

}}

>

Repository Health

</div>

{

healthItems.map((item)=>(

<div

key={item.title}

style={{

display:"flex",

justifyContent:"space-between",

alignItems:"center",

padding:"12px 14px",

marginBottom:"10px",

background:"#20242B",

borderRadius:"12px",

}}

>

<div
style={{
color:"#D1D5DB",
fontWeight:"500",
}}
>

{item.title}

</div>

<div

style={{

background:item.color,

color:"white",

padding:"4px 12px",

borderRadius:"999px",

fontWeight:"700",

minWidth:"45px",

textAlign:"center",

}}

>

{item.value}

</div>

</div>

))

}

<div
style={{
marginTop:"12px",
}}
>

{

graphData?.cycle_count===0

?

<div
style={{
color:"#22C55E",
fontWeight:"600",
}}
>

✅ No circular dependencies detected

</div>

:

<div
style={{
color:"#EF4444",
fontWeight:"600",
}}
>

⚠ Circular dependencies found

</div>

}

</div>

</div>

);

}

export default RepositoryHealth;