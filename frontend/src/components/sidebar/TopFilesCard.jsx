function TopFilesCard({

  topConnectedFiles,

  mostConnected,

  mostImported,

  selectNodeById,

}) {

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

Repository Insights

</div>

{/* Highlights */}

<div
style={{
display:"grid",
gridTemplateColumns:"1fr",
gap:"12px",
marginBottom:"18px",
}}
>

<div
style={{
background:"#20242B",
padding:"14px",
borderRadius:"12px",
}}
>

<div
style={{
fontSize:"12px",
color:"#9CA3AF",
marginBottom:"6px",
}}
>

🔥 Most Connected

</div>

<div
style={{
fontWeight:"700",
color:"white",
}}
>

{mostConnected || "None"}

</div>

</div>

<div
style={{
background:"#20242B",
padding:"14px",
borderRadius:"12px",
}}
>

<div
style={{
fontSize:"12px",
color:"#9CA3AF",
marginBottom:"6px",
}}
>

📥 Most Imported

</div>

<div
style={{
fontWeight:"700",
color:"white",
}}
>

{mostImported || "None"}

</div>

</div>

</div>

<div

style={{

fontWeight:"700",

color:"white",

marginBottom:"12px",

}}

>

Top Connected Files

</div>

{

topConnectedFiles.length===0

?

<div
style={{
color:"#8B95A7",
}}
>

No data available.

</div>

:

topConnectedFiles.map((file,index)=>(

<div

key={index}

onClick={()=>selectNodeById(file.id)}

style={{

display:"flex",

justifyContent:"space-between",

alignItems:"center",

padding:"12px 14px",

marginBottom:"10px",

background:"#20242B",

borderRadius:"12px",

cursor:"pointer",

transition:"0.25s",

}}

>

<div
style={{
overflow:"hidden",
textOverflow:"ellipsis",
whiteSpace:"nowrap",
maxWidth:"180px",
color:"#D1D5DB",
}}
>

{file.id.split("/").pop()}

</div>

<div

style={{

background:"#6366F1",

padding:"4px 10px",

borderRadius:"999px",

color:"white",

fontWeight:"700",

}}

>

{file.count}

</div>

</div>

))

}

</div>

);

}

export default TopFilesCard;