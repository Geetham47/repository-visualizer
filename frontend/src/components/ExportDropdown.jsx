import { useState, useRef, useEffect } from "react";

import {
  FiDownload,
  FiImage,
  FiFileText,
  FiChevronDown,
} from "react-icons/fi";

function ExportDropdown({

  exportJSON,

  exportPNG,

  exportSourceFile,

}) { 

  const [open, setOpen] = useState(false);

  const menuRef = useRef(null);

  useEffect(() => {

    function handleClick(e) {

      if (
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        setOpen(false);
      }

    }

    document.addEventListener(
      "mousedown",
      handleClick
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClick
      );

  }, []);

  return (

<div
ref={menuRef}
style={{
position:"relative",
}}
>

<button

onClick={()=>
setOpen(!open)
}

style={{

height:"48px",

padding:"0 18px",

background:"#1C1F26",

border:"1px solid #2E3440",

borderRadius:"14px",

display:"flex",

alignItems:"center",

gap:"10px",

color:"white",

cursor:"pointer",

fontWeight:"600",

}}

>

<FiDownload/>

Export

<FiChevronDown/>

</button>

{
open && (

<div

style={{

position:"absolute",

right:0,

top:"56px",

width:"180px",

background:"#1B1E24",

border:"1px solid #2E3440",

borderRadius:"14px",

overflow:"hidden",

boxShadow:"0 10px 30px rgba(0,0,0,.45)",

zIndex:1000,

}}

>

<div

onClick={()=>{
exportJSON();
setOpen(false);
}}

style={{

padding:"14px 18px",

display:"flex",

gap:"12px",

cursor:"pointer",

alignItems:"center",

color:"white",

}}

>

📄

JSON

</div>

<div

onClick={()=>{
exportPNG();
setOpen(false);
}}

style={{

padding:"14px 18px",

display:"flex",

gap:"12px",

cursor:"pointer",

alignItems:"center",

color:"white",

borderTop:"1px solid #2E3440",

}}

>

🖼️

PNG

</div>

<div

onClick={()=>{
exportSourceFile();
setOpen(false);
}}

style={{

padding:"14px 18px",

display:"flex",

gap:"12px",

cursor:"pointer",

alignItems:"center",

color:"white",

borderTop:"1px solid #2E3440",

}}

>

💻

Source Code

</div>

</div>

)

}

</div>

);

}

export default ExportDropdown;