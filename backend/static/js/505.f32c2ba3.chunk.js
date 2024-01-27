"use strict";(self.webpackChunkstarter_bt5=self.webpackChunkstarter_bt5||[]).push([[505],{3656:(e,t,s)=>{s.d(t,{Z:()=>Z});var n=s(2791),a=s(1614),r=s(3400),i=s(5289),o=s(5661),l=s(9157),c=s(8096),d=s(4925),u=s(3926),p=s(9891),m=s(7391),x=s(7123),h=s(4294),y=s(1563),j=s(3466),g=s(3746),v=s(165),f=s(184);const Z=()=>{const[e,t]=(0,n.useState)([]),[s,Z]=(0,n.useState)(""),[b,C]=(0,n.useState)(""),[S,P]=(0,n.useState)(!1),[w,k]=(0,n.useState)(!1);(0,n.useEffect)((()=>{fetch("/service/get-wifi-lists").then((e=>e.json())).then((e=>{Array.isArray(e.ssids)?t(e.ssids):console.error("Invalid data format:",e)})).catch((e=>console.error("Error fetching data:",e)))}),[]);const T=()=>{Z(""),C(""),k(!1)};return(0,f.jsxs)(a.Z,{children:[(0,f.jsx)("div",{style:{position:"absolute",top:0,right:0,padding:"10px",marginRight:"225px"},children:(0,f.jsx)(r.Z,{onClick:()=>{k(!0)},color:"primary",children:(0,f.jsx)(y.Z,{})})}),(0,f.jsxs)(i.Z,{open:w,onClose:T,children:[(0,f.jsx)(o.Z,{children:"Wi-Fi"}),(0,f.jsx)(l.Z,{children:(0,f.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"center"},children:[(0,f.jsxs)(c.Z,{children:[(0,f.jsx)(d.Z,{id:"network-select-label",style:{marginTop:"10px"},children:"Available-Network"}),(0,f.jsx)(u.Z,{labelId:"network-select-label",id:"network-select",value:s,onChange:e=>{Z(e.target.value)},label:"Available-Network",style:{marginTop:"10px",width:"200px"},children:e.map(((e,t)=>(0,f.jsx)(p.Z,{value:e,children:e},t)))})]}),(0,f.jsx)(m.Z,{margin:"normal",label:"Password",type:S?"text":"password",value:b,onChange:e=>{C(e.target.value)},style:{marginTop:"10px",width:"200px"},InputProps:{endAdornment:(0,f.jsx)(j.Z,{position:"end",children:(0,f.jsx)(r.Z,{onClick:()=>{P(!S)},children:S?(0,f.jsx)(v.Z,{fontSize:"small"}):(0,f.jsx)(g.Z,{fontSize:"small"})})})}})]})}),(0,f.jsxs)(x.Z,{children:[(0,f.jsx)(h.Z,{onClick:T,color:"primary",children:"Cancel"}),(0,f.jsx)(h.Z,{onClick:()=>{if(!s||!b)return void console.error("SSID and password are required.");const e={ssid:s,password:b};fetch("/service/connect_network",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).then((e=>e.text())).then((e=>{console.log("Server response:",e)})).catch((e=>{console.error("Error connecting to the network:",e)})),T()},color:"primary",children:"Connect"})]})]})]})}},9982:(e,t,s)=>{s.d(t,{Z:()=>u});var n=s(2791),a=s(9658),r=s(1889),i=s(5527),o=s(890),l=s(7391),c=s(4294),d=s(184);const u=()=>{const[e,t]=(0,n.useState)(null),[s,u]=(0,n.useState)(""),[p,m]=(0,n.useState)(""),[x,h]=(0,n.useState)(""),[y,j]=(0,n.useState)(""),[g,v]=(0,n.useState)(""),[f,Z]=(0,n.useState)({checkFrequency:{days:"",hours:"",minutes:"",seconds:""},successRetention:{days:"",hours:"",minutes:"",seconds:""},failureRetention:{days:"",hours:"",minutes:"",seconds:""}}),[b,C]=(0,n.useState)(!1),[S,P]=(0,n.useState)({minutes:"",seconds:""}),[w,k]=(0,n.useState)({days:"",hours:"",minutes:"",seconds:""}),[T,_]=(0,n.useState)(!1),[R,M]=(0,n.useState)(!1);if((0,n.useEffect)((()=>{setTimeout((()=>{u(""),m(""),h(""),j(""),v("")}),5e3)}),[s,p,x,y,g]),(0,n.useEffect)((()=>{(async()=>{try{const a=await fetch("/node-parameter/"),r=await a.json();if(t(r),r.node_parameters){var e,s,n;const t=null===(e=r.node_parameters.find((e=>"retention_parameter"===e.name)))||void 0===e?void 0:e.value;t&&Z(t);const a=null===(s=r.node_parameters.find((e=>"time_delay"===e.name)))||void 0===s?void 0:s.value;a&&P(a);const i=null===(n=r.node_parameters.find((e=>"publish_time"===e.name)))||void 0===n?void 0:n.value;i&&k(i)}}catch(a){console.error("Error fetching data:",a)}})()}),[]),!e)return(0,d.jsx)("p",{children:"Loading..."});const D=e=>{let{message:t}=e;return(0,d.jsx)(a.Z,{severity:"success",children:t})},I=e=>{let{message:t}=e;return(0,d.jsx)(a.Z,{severity:"error",children:t})};return(0,d.jsxs)(r.ZP,{container:!0,spacing:1,children:[(0,d.jsxs)(r.ZP,{item:!0,xs:12,children:[s&&(0,d.jsx)(D,{message:s,onClose:()=>u("")}),p&&(0,d.jsx)(D,{message:p,onClose:()=>m("")}),x&&(0,d.jsx)(D,{message:x,onClose:()=>h("")}),y&&(0,d.jsx)(I,{message:y,onClose:()=>j("")})]}),(0,d.jsx)(r.ZP,{item:!0,xs:4,children:(0,d.jsxs)(i.Z,{style:{padding:"20px",marginBottom:"20px"},children:[(0,d.jsx)(o.Z,{variant:"h6",children:"Retention Parameters"}),(0,d.jsxs)("form",{children:[["check_frequency","success_retention","failure_retention"].map(((e,t)=>(0,d.jsxs)("div",{style:{marginBottom:"20px"},children:[(0,d.jsx)(o.Z,{variant:"subtitle1",children:e.replace("_"," ")}),(0,d.jsx)("div",{style:{display:"flex",flexDirection:"row"},children:["days","hours","minutes","seconds"].map(((t,s)=>(0,d.jsx)(l.Z,{label:t.charAt(0).toUpperCase()+t.slice(1),type:"number",value:f[e][t],onChange:s=>((e,t,s)=>{const n=parseInt(s,10);isNaN(n)||Z((s=>({...s,[e]:{...s[e],[t]:n}}))),C(!0)})(e,t,s.target.value),fullWidth:!0,style:{marginRight:"10px"},inputProps:{min:0,max:"days"===t?31:"hours"===t?24:60}},s)))})]},t))),(0,d.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end"},children:[(0,d.jsx)(c.Z,{onClick:()=>{Z({check_frequency:{days:0,hours:0,minutes:0,seconds:0},success_retention:{days:0,hours:0,minutes:0,seconds:0},failure_retention:{days:0,hours:0,minutes:0,seconds:0}}),C(!1)},color:"primary",variant:"contained",style:{marginRight:"10px"},children:"Reset"}),(0,d.jsx)(c.Z,{onClick:async()=>{try{const e=await fetch("/node-parameter/5",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({retention_parameter:f})});C(!1),e.ok?u("Retention Parameters updated successfully."):j("Failed to update Retention Parameters: ".concat(e.statusText))}catch(e){j("Error updating Retention Parameters: ".concat(e))}},color:"primary",variant:"contained",disabled:!b,children:"Submit"})]})]})]})}),(0,d.jsx)(r.ZP,{item:!0,xs:4,children:(0,d.jsxs)(i.Z,{style:{padding:"20px",marginBottom:"20px"},children:[(0,d.jsx)(o.Z,{variant:"h6",children:"Time Delay Parameters"}),(0,d.jsxs)("div",{style:{display:"flex",flexDirection:"row",marginTop:"10px"},children:[(0,d.jsxs)("div",{style:{display:"flex",flexDirection:"row",marginRight:"20px"},children:[(0,d.jsx)(l.Z,{label:"Minutes",type:"number",value:S.minutes,style:{marginRight:"5px"},onChange:e=>{let t=parseInt(e.target.value)||0;t=Math.min(t,60),t=Math.max(t,0),P((e=>({...e,minutes:t}))),_(!0)},inputProps:{step:1,min:0,max:60}}),(0,d.jsx)(l.Z,{label:"Seconds",type:"number",value:S.seconds,onChange:e=>{let t=parseInt(e.target.value)||0;t=Math.min(t,60),t=Math.max(t,0),P((e=>({...e,seconds:t}))),_(!0)},inputProps:{step:1,min:0,max:60}})]}),(0,d.jsx)(c.Z,{onClick:async()=>{try{const e=await fetch("/node-parameter/6",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({time_delay:S})});_(!1),e.ok?m("Time Delay updated successfully."):j("Failed to update Time Delay: ".concat(e.statusText))}catch(e){j("Error updating Time Delay: ".concat(e))}},color:"primary",variant:"contained",style:{marginBottom:"15px"},disabled:!T,children:"Submit"})]})]})}),(0,d.jsx)(r.ZP,{item:!0,xs:4,children:(0,d.jsxs)(i.Z,{style:{padding:"20px",marginBottom:"20px"},children:[(0,d.jsx)(o.Z,{variant:"h6",children:" Publish Time"}),(0,d.jsxs)("div",{style:{display:"flex",flexDirection:"row",marginTop:"10px"},children:[(0,d.jsxs)("div",{style:{display:"flex",flexDirection:"row",marginRight:"20px"},children:[(0,d.jsx)(l.Z,{label:"Days",type:"number",value:w.days,style:{marginRight:"5px"},onChange:e=>{let t=parseInt(e.target.value)||0;t=Math.min(t,31),t=Math.max(t,0),k((e=>({...e,days:t}))),M(!0)},inputProps:{step:1,min:0,max:31}}),(0,d.jsx)(l.Z,{label:"Hours",type:"number",value:w.hours,style:{marginRight:"5px"},onChange:e=>{let t=parseInt(e.target.value)||0;t=Math.min(t,24),t=Math.max(t,0),k((e=>({...e,hours:t}))),M(!0)},inputProps:{step:1,min:0,max:24}}),(0,d.jsx)(l.Z,{label:"Minutes",type:"number",value:w.minutes,style:{marginRight:"5px"},onChange:e=>{let t=parseInt(e.target.value)||0;t=Math.min(t,60),t=Math.max(t,0),k((e=>({...e,minutes:t}))),M(!0)},inputProps:{step:1,min:0,max:60}}),(0,d.jsx)(l.Z,{label:"Seconds",type:"number",value:w.seconds,onChange:e=>{let t=parseInt(e.target.value)||0;t=Math.min(t,60),t=Math.max(t,0),k((e=>({...e,seconds:t}))),M(!0)},inputProps:{step:1,min:0,max:60}})]}),(0,d.jsx)(c.Z,{onClick:async()=>{try{const e=await fetch("/node-parameter/7",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({publish_time:w})});M(!1),e.ok?h("Publish Time updated successfully."):j("Failed to update Publish Time: ".concat(e.statusText))}catch(e){j("Error updating Publish Time: ".concat(e))}},color:"primary",variant:"contained",style:{marginBottom:"15px"},disabled:!R,children:"Submit"})]})]})})]})}},6964:(e,t,s)=>{s.r(t),s.d(t,{default:()=>d});var n=s(3009),a=s(9773),r=s(2399),i=s(8769);s.p,s.p,s.p,s.p;var o=s(9982),l=s(3656),c=s(184);const d=()=>(0,c.jsx)("div",{children:(0,c.jsxs)(n.Z,{children:[(0,c.jsx)(a.Z,{xxl:"12",children:(0,c.jsx)(i.Z,{})}),(0,c.jsx)(a.Z,{xxl:"12",children:(0,c.jsx)(r.Z,{})}),(0,c.jsx)(a.Z,{xxl:"12",children:(0,c.jsx)(o.Z,{})}),(0,c.jsx)(a.Z,{xxl:"12",children:(0,c.jsx)(l.Z,{})})]})})}}]);
//# sourceMappingURL=505.f32c2ba3.chunk.js.map