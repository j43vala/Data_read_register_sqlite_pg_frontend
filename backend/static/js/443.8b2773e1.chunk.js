"use strict";(self.webpackChunkstarter_bt5=self.webpackChunkstarter_bt5||[]).push([[443],{443:(e,l,r)=>{r.r(l),r.d(l,{default:()=>j});var t=r(2791),s=r(5527),n=r(890),a=r(8096),i=r(4925),c=r(3926),o=r(9891),d=r(7391),h=r(4294),u=r(5294),x=r(184);const g=e=>{let{logs:l}=e;return(0,x.jsxs)(s.Z,{elevation:3,style:{padding:"16px",marginTop:"16px",background:"white"},children:[(0,x.jsx)(n.Z,{variant:"h5",children:"Logs:"}),(0,x.jsx)("ul",{children:l.map(((e,l)=>(0,x.jsx)("li",{children:e},l)))})]})},p=()=>{const[e,l]=(0,t.useState)(""),[r,s]=(0,t.useState)(""),[n,p]=(0,t.useState)([]);return(0,x.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"flex-start"},children:[(0,x.jsxs)("div",{style:{display:"flex",alignItems:"center"},children:[(0,x.jsxs)(a.Z,{fullWidth:!0,style:{width:"130px",marginRight:"10px"},children:[(0,x.jsx)(i.Z,{id:"cmd-label",children:"CMD"}),(0,x.jsxs)(c.Z,{labelId:"cmd-label",id:"cmd-select",value:e,label:"CMD",onChange:e=>{l(e.target.value)},children:[(0,x.jsx)(o.Z,{value:"info",children:"Info"}),(0,x.jsx)(o.Z,{value:"error",children:"Error"})]})]}),(0,x.jsx)(d.Z,{type:"input",label:"Number",value:r,onChange:e=>{const l=e.target.value;s(l)},style:{marginRight:"10px"}}),(0,x.jsx)(h.Z,{onClick:async()=>{try{const l=parseInt(r,10);if(isNaN(l))return void console.error("Invalid value for numOccurrences:",r);const t=await u.Z.get("/logs/logs?log_type=".concat(e,"&num_occurrences=").concat(l));p(t.data.logs)}catch(l){console.error("Error fetching logs:",l)}},variant:"contained",color:"primary",children:"Fetch"})]}),n.length>0&&(0,x.jsx)(g,{logs:n,style:{marginTop:"16px"}})]})},j=()=>(0,x.jsx)("div",{children:(0,x.jsx)(p,{})})}}]);
//# sourceMappingURL=443.8b2773e1.chunk.js.map