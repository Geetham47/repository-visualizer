import ArchitectureCard from "./ArchitectureCard";
import RepositoryHealth from "./RepositoryHealth";
import FileDetailsCard from "./FileDetailsCard";
import AIAssistantCard from "./AIAssistantCard";
import DependencyCard from "./DependencyCard";
import TopFilesCard from "./TopFilesCard";
import DeadFilesCard from "./DeadFilesCard";

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

width:"380px",

height:"100%",

overflowY:"auto",

background:"#111318",

padding:"22px",

borderLeft:"1px solid #2B3038",

}}

>

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

<DeadFilesCard

deadFiles={deadFiles}

selectNodeById={selectNodeById}

/>

</div>

);

}

export default Sidebar;