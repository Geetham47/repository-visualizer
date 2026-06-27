import {
  FiSearch,
  FiFolder,
  FiSettings,
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

import StatCard from "./StatCard";
import ExportDropdown from "./ExportDropdown";

function Navbar({

  graphData,

  selectedNode,

  searchTerm,

  setSearchTerm,

  selectNodeById,

  nodes,

  repoPath,

  setRepoPath,

  loadRepository,

  exportJSON,

  exportPNG,

}) {

  return (

<div
style={{

height:"96px",

background:"#111318",

borderBottom:"1px solid #262A33",

display:"flex",

justifyContent:"space-between",

alignItems:"center",

padding:"0 35px",

boxShadow:"0 4px 20px rgba(0,0,0,.35)",

}}

>

{/* LEFT */}

<div
style={{

display:"flex",

alignItems:"center",

gap:"30px",

}}

>

<div
style={{

display:"flex",

alignItems:"center",

gap:"16px",

}}

>

<div
style={{

width:"58px",

height:"58px",

borderRadius:"18px",

background:"linear-gradient(135deg,#6366F1,#8B5CF6)",

display:"flex",

justifyContent:"center",

alignItems:"center",

boxShadow:"0 0 28px rgba(99,102,241,.45)",

}}

>

<FaProjectDiagram
size={28}
color="white"
/>

</div>

<div>

<div
style={{

fontSize:"28px",

fontWeight:"700",

color:"white",

lineHeight:"1",

}}

>

RepoVision

</div>

<div
style={{

fontSize:"13px",

marginTop:"6px",

color:"#9AA4B2",

}}

>

AI Repository Intelligence

</div>

</div>

</div>

<div
style={{

display:"flex",

gap:"12px",

}}

>

<StatCard

title="Files"

value={graphData?.total_nodes||0}

icon={<FiFolder/>}

color="#4F8BFF"

/>

<StatCard

title="Dependencies"

value={graphData?.total_edges||0}

icon={<BsDiagram3/>}

color="#34D399"

/>

<StatCard

title="Selected"

value={

selectedNode

?selectedNode.data.label

:"None"

}

icon={<HiOutlineCubeTransparent/>}

color="#A855F7"

/>

</div>

</div>

{/* RIGHT */}

<div
style={{

display:"flex",

alignItems:"center",

gap:"14px",

}}

>

<div
style={{

display:"flex",

alignItems:"center",

background:"#1C1F26",

height:"50px",

padding:"0 16px",

borderRadius:"14px",

border:"1px solid #2E3440",

}}

>

<FiSearch
color="#8A93A3"
/>

<input

placeholder="Search files..."

value={searchTerm}

onChange={(e)=>setSearchTerm(e.target.value)}

onKeyDown={(e)=>{

if(e.key==="Enter"){

const foundNode=

nodes.find(node=>

node.data.label

.toLowerCase()

.includes(

searchTerm.toLowerCase()

)

);

if(foundNode){

selectNodeById(foundNode.id);

}

}

}}

style={{

background:"transparent",

border:"none",

outline:"none",

marginLeft:"12px",

width:"230px",

fontSize:"14px",

color:"white",

}}

>

</input>

</div>

<div
style={{

display:"flex",

alignItems:"center",

background:"#1C1F26",

height:"50px",

padding:"0 16px",

borderRadius:"14px",

border:"1px solid #2E3440",

}}

>

<FiFolder
color="#8A93A3"
/>

<input

value={repoPath}

onChange={(e)=>setRepoPath(e.target.value)}

style={{

background:"transparent",

border:"none",

outline:"none",

marginLeft:"12px",

width:"310px",

color:"white",

fontSize:"14px",

}}

>

</input>

</div>

<button

onClick={loadRepository}

style={{

height:"50px",

padding:"0 28px",

background:"linear-gradient(135deg,#6366F1,#8B5CF6)",

border:"none",

borderRadius:"14px",

color:"white",

fontWeight:"600",

fontSize:"14px",

cursor:"pointer",

transition:"0.25s",

boxShadow:"0 0 20px rgba(99,102,241,.40)",

}}

>

Analyze

</button>

<ExportDropdown

exportJSON={exportJSON}

exportPNG={exportPNG}

/>

<button

title="Settings"

style={{

height:"50px",

width:"50px",

background:"#1C1F26",

border:"1px solid #2E3440",

borderRadius:"14px",

cursor:"pointer",

color:"white",

display:"flex",

justifyContent:"center",

alignItems:"center",

}}

>

<FiSettings
size={19}
/>

</button>

</div>

</div>

);

}

export default Navbar;