function MetricCard({

title,

children,

}){

return(

<div

style={{

background:"#1A1D23",

border:"1px solid #2E3440",

borderRadius:"18px",

padding:"18px",

marginBottom:"18px",

boxShadow:"0 6px 20px rgba(0,0,0,.25)",

}}

>

<h3

style={{

margin:0,

marginBottom:"16px",

fontSize:"17px",

fontWeight:"700",

color:"#FFFFFF",

}}

>

{title}

</h3>

{children}

</div>

);

}

export default MetricCard;