function AIButton({

  title,

  mode,

  currentMode,

  setAiMode,

  selectedNode,

  fetchAISummary,

}) {

  const active = mode === currentMode;

  return (

<button

onClick={() => {

setAiMode(mode);

if(selectedNode){

fetchAISummary(

selectedNode.id,

mode

);

}

}}

style={{

flex:1,

padding:"10px",

border:"none",

borderRadius:"10px",

cursor:"pointer",

transition:"0.25s",

background:active

?"linear-gradient(135deg,#6366F1,#8B5CF6)"

:"#20242B",

color:"white",

fontWeight:"600",

}}

>

{title}

</button>

);

}

function AIAssistantCard({

selectedNode,

aiMode,

setAiMode,

fetchAISummary,

loadingAI,

aiSummary,

}){

return(

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

marginBottom:"18px",

color:"white",

}}

>

🤖 AI Assistant

</div>

<div

style={{

display:"grid",

gridTemplateColumns:"1fr 1fr",

gap:"10px",

marginBottom:"18px",

}}

>

<AIButton

title="Explain"

mode="explain"

currentMode={aiMode}

setAiMode={setAiMode}

selectedNode={selectedNode}

fetchAISummary={fetchAISummary}

/>

<AIButton

title="Refactor"

mode="refactor"

currentMode={aiMode}

setAiMode={setAiMode}

selectedNode={selectedNode}

fetchAISummary={fetchAISummary}

/>

<AIButton

title="Find Bugs"

mode="bugs"

currentMode={aiMode}

setAiMode={setAiMode}

selectedNode={selectedNode}

fetchAISummary={fetchAISummary}

/>

<AIButton

title="Improve"

mode="improve"

currentMode={aiMode}

setAiMode={setAiMode}

selectedNode={selectedNode}

fetchAISummary={fetchAISummary}

/>

</div>

<div

style={{

background:"#20242B",

borderRadius:"14px",

padding:"16px",

minHeight:"180px",

color:"#D1D5DB",

lineHeight:"1.8",

fontSize:"14px",

whiteSpace:"pre-wrap",

}}

>

{

!selectedNode ?

(

<div

style={{

color:"#8B95A7",

}}

>

Select a file to start AI analysis.

</div>

)

:

loadingAI ?

(

<div

style={{

display:"flex",

alignItems:"center",

gap:"12px",

}}

>

<div

style={{

width:"14px",

height:"14px",

borderRadius:"50%",

border:"2px solid #444",

borderTop:"2px solid #6366F1",

animation:"spin 1s linear infinite",

}}

></div>

Generating AI response...

</div>

)

:

aiSummary

}

</div>

<div

style={{

marginTop:"14px",

display:"flex",

justifyContent:"flex-end",

}}

>

<button

onClick={()=>

navigator.clipboard.writeText(

aiSummary

)

}

style={{

padding:"10px 16px",

background:"#20242B",

border:"none",

borderRadius:"10px",

cursor:"pointer",

color:"white",

}}

>

📋 Copy

</button>

</div>

</div>

);

}

export default AIAssistantCard;