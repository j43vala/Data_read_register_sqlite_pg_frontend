"use strict";(self.webpackChunkstarter_bt5=self.webpackChunkstarter_bt5||[]).push([[150],{9982:(e,t,s)=>{s.d(t,{Z:()=>u});var n=s(2791),a=s(9658),r=s(1889),i=s(5527),o=s(890),c=s(7391),l=s(4294),d=s(184);const u=()=>{const[e,t]=(0,n.useState)(null),[s,u]=(0,n.useState)(""),[m,p]=(0,n.useState)(""),[h,x]=(0,n.useState)(""),[y,f]=(0,n.useState)(""),[g,j]=(0,n.useState)({checkFrequency:{days:"",hours:"",minutes:"",seconds:""},successRetention:{days:"",hours:"",minutes:"",seconds:""},failureRetention:{days:"",hours:"",minutes:"",seconds:""}}),[v,Z]=(0,n.useState)(!1),[b,_]=(0,n.useState)({minutes:"",seconds:""}),[C,P]=(0,n.useState)(!1);if((0,n.useEffect)((()=>{setTimeout((()=>{u(""),p(""),x(""),f("")}),5e3)}),[s,m,h,y]),(0,n.useEffect)((()=>{(async()=>{try{const n=await fetch("/node-parameter/"),a=await n.json();if(t(a),console.log("responseData: ",a),a.node_parameters){var e,s;const t=null===(e=a.node_parameters.find((e=>"retention_parameter"===e.name)))||void 0===e?void 0:e.value;t&&j(t);const n=null===(s=a.node_parameters.find((e=>"time_delay"===e.name)))||void 0===s?void 0:s.value;n&&_(n)}}catch(n){console.error("Error fetching data:",n)}})()}),[]),!e)return(0,d.jsx)("p",{children:"Loading..."});const S=e=>{let{message:t}=e;return(0,d.jsx)(a.Z,{severity:"success",children:t})},k=e=>{let{message:t}=e;return(0,d.jsx)(a.Z,{severity:"error",children:t})};return(0,d.jsxs)(r.ZP,{container:!0,spacing:1,children:[(0,d.jsxs)(r.ZP,{item:!0,xs:12,children:[s&&(0,d.jsx)(S,{message:s,onClose:()=>u("")}),m&&(0,d.jsx)(S,{message:m,onClose:()=>p("")}),h&&(0,d.jsx)(k,{message:h,onClose:()=>x("")})]}),(0,d.jsx)(r.ZP,{item:!0,xs:4,children:(0,d.jsxs)(i.Z,{style:{padding:"20px",marginBottom:"20px"},children:[(0,d.jsx)(o.Z,{variant:"h6",children:"Retention Parameters"}),(0,d.jsxs)("form",{children:[["check_frequency","success_retention","failure_retention"].map(((e,t)=>(0,d.jsxs)("div",{style:{marginBottom:"20px"},children:[(0,d.jsx)(o.Z,{variant:"subtitle1",children:e.replace("_"," ")}),(0,d.jsx)("div",{style:{display:"flex",flexDirection:"row"},children:["days","hours","minutes","seconds"].map(((t,s)=>(0,d.jsx)(c.Z,{label:t.charAt(0).toUpperCase()+t.slice(1),type:"number",value:g[e][t],onChange:s=>((e,t,s)=>{const n=parseInt(s,10);isNaN(n)||j((s=>({...s,[e]:{...s[e],[t]:n}}))),Z(!0)})(e,t,s.target.value),fullWidth:!0,style:{marginRight:"10px"},inputProps:{min:0,max:"days"===t?31:"hours"===t?24:60}},s)))})]},t))),(0,d.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end"},children:[(0,d.jsx)(l.Z,{onClick:()=>{j({check_frequency:{days:0,hours:0,minutes:0,seconds:0},success_retention:{days:0,hours:0,minutes:0,seconds:0},failure_retention:{days:0,hours:0,minutes:0,seconds:0}}),Z(!1)},color:"primary",variant:"contained",style:{marginRight:"10px"},children:"Reset"}),(0,d.jsx)(l.Z,{onClick:async()=>{try{const e=await fetch("/node-parameter/5",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({retention_parameter:g})});Z(!1),e.ok?u("Retention Parameters updated successfully."):x("Failed to update Retention Parameters: ".concat(e.statusText))}catch(e){x("Error updating Retention Parameters: ".concat(e))}},color:"primary",variant:"contained",disabled:!v,children:"Submit"})]})]})]})}),(0,d.jsx)(r.ZP,{item:!0,xs:4,children:(0,d.jsxs)(i.Z,{style:{padding:"20px",marginBottom:"20px"},children:[(0,d.jsx)(o.Z,{variant:"h6",children:"Time Delay Parameters"}),(0,d.jsxs)("div",{style:{display:"flex",flexDirection:"row",marginTop:"10px"},children:[(0,d.jsxs)("div",{style:{display:"flex",flexDirection:"row",marginRight:"20px"},children:[(0,d.jsx)(c.Z,{label:"Minutes",type:"number",value:b.minutes,style:{marginRight:"5px"},onChange:e=>{let t=parseInt(e.target.value)||0;t=Math.min(t,60),t=Math.max(t,0),_((e=>({...e,minutes:t}))),P(!0)},inputProps:{step:1,min:0,max:60}}),(0,d.jsx)(c.Z,{label:"Seconds",type:"number",value:b.seconds,onChange:e=>{let t=parseInt(e.target.value)||0;t=Math.min(t,60),t=Math.max(t,0),_((e=>({...e,seconds:t}))),P(!0)},inputProps:{step:1,min:0,max:60}})]}),(0,d.jsx)(l.Z,{onClick:async()=>{try{const e=await fetch("/node-parameter/6",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({time_delay:b})});P(!1),e.ok?p("Time Delay updated successfully."):x("Failed to update Time Delay: ".concat(e.statusText))}catch(e){x("Error updating Time Delay: ".concat(e))}},color:"primary",variant:"contained",style:{marginBottom:"15px"},disabled:!C,children:"Submit"})]})]})})]})}},4229:(e,t,s)=>{s.r(t),s.d(t,{default:()=>r});s(2791);var n=s(9982),a=s(184);const r=()=>(0,a.jsxs)("div",{children:[(0,a.jsx)("h1",{children:"Retention"}),(0,a.jsx)(n.Z,{})]})}}]);
//# sourceMappingURL=150.7767c499.chunk.js.map