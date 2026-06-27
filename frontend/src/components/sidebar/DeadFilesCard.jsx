function DeadFilesCard({

  deadFiles,

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

Unused Files

</div>

{

deadFiles.length===0

?

<div

style={{

background:"#1E2A22",

border:"1px solid #22C55E",

borderRadius:"12px",

padding:"16px",

color:"#22C55E",

fontWeight:"600",

textAlign:"center",

}}

>

✅ Excellent! No unused files detected.

</div>

:

<>

<div

style={{

background:"#312514",

border:"1px solid #F59E0B",

borderRadius:"12px",

padding:"12px",

marginBottom:"16px",

color:"#FBBF24",

fontSize:"14px",

lineHeight:"1.6",

}}

>

These files are currently not imported by any other file.

</div>

{

deadFiles.map((file,index)=>(

<div

key={index}

onClick={()=>selectNodeById(file)}

style={{

display:"flex",

justifyContent:"space-between",

alignItems:"center",

background:"#20242B",

padding:"12px 14px",

borderRadius:"12px",

marginBottom:"10px",

cursor:"pointer",

transition:"0.25s",

}}

>

<div

style={{

overflow:"hidden",

whiteSpace:"nowrap",

textOverflow:"ellipsis",

maxWidth:"220px",

color:"#D1D5DB",

}}

>

{file.split("/").pop()}

</div>

<div

style={{

background:"#F59E0B",

padding:"4px 10px",

borderRadius:"999px",

color:"white",

fontWeight:"700",

fontSize:"12px",

}}

>

Unused

</div>

</div>

))

}

</>

}

</div>

);

}

export default DeadFilesCard;