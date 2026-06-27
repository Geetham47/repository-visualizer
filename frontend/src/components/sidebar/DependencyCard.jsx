function DependencyCard({

  outgoingDependencies,

  incomingDependencies,

  selectNodeById,

}) {

  function DependencyList({

    title,

    items,

    color,

  }) {

    return (

      <div
        style={{
          marginBottom: "20px",
        }}
      >

        <div
          style={{
            fontSize: "15px",
            fontWeight: "700",
            color: "white",
            marginBottom: "10px",
          }}
        >

          {title}

        </div>

        {

          items.length === 0 ?

          (

            <div
              style={{
                color: "#8B95A7",
                fontSize: "14px",
              }}
            >

              None

            </div>

          )

          :

          items.map((item,index)=>(

            <div

              key={index}

              onClick={()=>selectNodeById(item)}

              style={{

                background:"#20242B",

                padding:"10px 14px",

                borderRadius:"10px",

                marginBottom:"8px",

                cursor:"pointer",

                transition:"0.25s",

                color:"#D1D5DB",

                overflow:"hidden",

                textOverflow:"ellipsis",

                whiteSpace:"nowrap",

              }}

            >

              {item.split("/").pop()}

            </div>

          ))

        }

      </div>

    );

  }

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

marginBottom:"18px",

color:"white",

}}

>

Dependency Explorer

</div>

<DependencyList

title="Outgoing Dependencies"

items={outgoingDependencies}

color="#6366F1"

/>

<DependencyList

title="Incoming Dependencies"

items={incomingDependencies}

color="#22C55E"

/>

</div>

);

}

export default DependencyCard;