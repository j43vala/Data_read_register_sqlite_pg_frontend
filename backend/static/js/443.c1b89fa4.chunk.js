"use strict";(self.webpackChunkstarter_bt5=self.webpackChunkstarter_bt5||[]).push([[443],{443:(e,l,t)=>{t.r(l),t.d(l,{default:()=>j});var s=t(2791),r=t(5527),n=t(890),a=t(8096),i=t(4925),c=t(3926),o=t(9891),d=t(7391),h=t(4294),x=t(5294),g=t(184);const u=e=>{let{logs:l}=e;return(0,g.jsxs)(r.Z,{elevation:3,style:{padding:"16px",marginTop:"16px",background:"white"},children:[(0,g.jsx)(n.Z,{variant:"h5",children:"Logs:"}),(0,g.jsx)("ul",{children:l.map(((e,l)=>(0,g.jsx)("li",{children:e},l)))})]})},p=()=>{const[e,l]=(0,s.useState)(""),[t,r]=(0,s.useState)(0),[n,p]=(0,s.useState)([]);return(0,g.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"flex-start"},children:[(0,g.jsxs)("div",{style:{display:"flex",alignItems:"center"},children:[(0,g.jsxs)(a.Z,{fullWidth:!0,style:{width:"130px",marginRight:"10px"},children:[(0,g.jsx)(i.Z,{id:"cmd-label",children:"CMD"}),(0,g.jsxs)(c.Z,{labelId:"cmd-label",id:"cmd-select",value:e,label:"CMD",onChange:e=>{l(e.target.value)},children:[(0,g.jsx)(o.Z,{value:"info",children:"Info"}),(0,g.jsx)(o.Z,{value:"error",children:"Error"})]})]}),(0,g.jsx)(d.Z,{type:"input",label:"Number",value:t,onChange:e=>{const l=parseInt(e.target.value,10);r(l)},style:{marginRight:"10px"}}),(0,g.jsx)(h.Z,{onClick:async()=>{try{const l=await x.Z.get("/logs/logs?log_type=".concat(e,"&num_occurrences=").concat(t));p(l.data.logs)}catch(l){console.error("Error fetching logs:",l)}},variant:"contained",color:"primary",children:"Fetch"})]}),n.length>0&&(0,g.jsx)(u,{logs:n,style:{marginTop:"16px"}})]})},j=()=>(0,g.jsx)("div",{children:(0,g.jsx)(p,{})})}}]);
//# sourceMappingURL=443.c1b89fa4.chunk.js.map