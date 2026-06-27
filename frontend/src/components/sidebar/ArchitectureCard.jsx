function ArchitectureCard({

  routesCount,

  controllersCount,

  modelsCount,

  servicesCount,

  componentsCount,

}) {

  const items = [

    {
      title: "Routes",
      value: routesCount,
      color: "#22C55E",
    },

    {
      title: "Controllers",
      value: controllersCount,
      color: "#3B82F6",
    },

    {
      title: "Models",
      value: modelsCount,
      color: "#F59E0B",
    },

    {
      title: "Services",
      value: servicesCount,
      color: "#EF4444",
    },

    {
      title: "Components",
      value: componentsCount,
      color: "#A855F7",
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

Architecture Overview

</div>

{

items.map((item)=>(

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

minWidth:"36px",

textAlign:"center",

}}

>

{item.value}

</div>

</div>

))

}

</div>

);

}

export default ArchitectureCard;