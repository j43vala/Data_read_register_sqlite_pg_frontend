"use strict";(self.webpackChunkstarter_bt5=self.webpackChunkstarter_bt5||[]).push([[229],{9982:(e,t,a)=>{a.d(t,{Z:()=>m});var n=a(2791),r=a(9658),s=a(1889),i=a(5527),o=a(890),l=a(7391),p=a(4294),c=a(184);const m=()=>{const[e,t]=(0,n.useState)(null),[a,m]=(0,n.useState)(""),[u,d]=(0,n.useState)(""),[h,g]=(0,n.useState)(""),[y,x]=(0,n.useState)(""),[v,f]=(0,n.useState)(""),[j,b]=(0,n.useState)({checkFrequency:{days:"",hours:"",minutes:"",seconds:""},successRetention:{days:"",hours:"",minutes:"",seconds:""},failureRetention:{days:"",hours:"",minutes:"",seconds:""}}),[Z,P]=(0,n.useState)(!1),[S,T]=(0,n.useState)({minutes:"",seconds:""}),[C,M]=(0,n.useState)({days:"",hours:"",minutes:"",seconds:""}),[w,R]=(0,n.useState)(!1),[_,B]=(0,n.useState)(!1);if((0,n.useEffect)((()=>{setTimeout((()=>{m(""),d(""),g(""),x(""),f("")}),5e3)}),[a,u,h,y,v]),(0,n.useEffect)((()=>{(async()=>{try{const r=await fetch("/node-parameter/"),s=await r.json();if(t(s),s.node_parameters){var e,a,n;const t=null===(e=s.node_parameters.find((e=>"retention_parameter"===e.name)))||void 0===e?void 0:e.value;t&&b(t);const r=null===(a=s.node_parameters.find((e=>"time_delay"===e.name)))||void 0===a?void 0:a.value;r&&T(r);const i=null===(n=s.node_parameters.find((e=>"publish_time"===e.name)))||void 0===n?void 0:n.value;i&&M(i)}}catch(r){console.error("Error fetching data:",r)}})()}),[]),!e)return(0,c.jsx)("p",{children:"Loading..."});const k=e=>{let{message:t}=e;return(0,c.jsx)(r.Z,{severity:"success",children:t})},D=e=>{let{message:t}=e;return(0,c.jsx)(r.Z,{severity:"error",children:t})};return(0,c.jsxs)(s.ZP,{container:!0,spacing:1,children:[(0,c.jsxs)(s.ZP,{item:!0,xs:12,children:[a&&(0,c.jsx)(k,{message:a,onClose:()=>m("")}),u&&(0,c.jsx)(k,{message:u,onClose:()=>d("")}),h&&(0,c.jsx)(k,{message:h,onClose:()=>g("")}),y&&(0,c.jsx)(D,{message:y,onClose:()=>x("")})]}),(0,c.jsx)(s.ZP,{item:!0,xs:4,children:(0,c.jsxs)(i.Z,{style:{padding:"20px",marginBottom:"20px"},children:[(0,c.jsx)(o.Z,{variant:"h6",children:"Retention Parameters"}),(0,c.jsxs)("form",{children:[["check_frequency","success_retention","failure_retention"].map(((e,t)=>(0,c.jsxs)("div",{style:{marginBottom:"20px"},children:[(0,c.jsx)(o.Z,{variant:"subtitle1",children:e.replace("_"," ")}),(0,c.jsx)("div",{style:{display:"flex",flexDirection:"row"},children:["days","hours","minutes","seconds"].map(((t,a)=>(0,c.jsx)(l.Z,{label:t.charAt(0).toUpperCase()+t.slice(1),type:"number",value:j[e][t],onChange:a=>{let n=parseInt(a.target.value,10);const r="hours"===t?24:"minutes"===t||"seconds"===t?60:void 0;void 0!==r&&n>r&&(n=r),((e,t,a)=>{const n=parseInt(a,10);isNaN(n)||b((a=>({...a,[e]:{...a[e],[t]:n}}))),P(!0)})(e,t,n)},fullWidth:!0,style:{marginRight:"10px"},inputProps:{min:0,max:"minutes"===t||"seconds"===t?60:void 0}},a)))})]},t))),(0,c.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end"},children:[(0,c.jsx)(p.Z,{onClick:()=>{b({check_frequency:{days:0,hours:0,minutes:0,seconds:0},success_retention:{days:0,hours:0,minutes:0,seconds:0},failure_retention:{days:0,hours:0,minutes:0,seconds:0}}),P(!1)},color:"primary",variant:"contained",style:{marginRight:"10px"},children:"Reset"}),(0,c.jsx)(p.Z,{onClick:async()=>{try{const e=await fetch("/node-parameter/5",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({retention_parameter:j})});P(!1),e.ok?m("Retention Parameters updated successfully."):x("Failed to update Retention Parameters: ".concat(e.statusText))}catch(e){x("Error updating Retention Parameters: ".concat(e))}},color:"primary",variant:"contained",disabled:!Z,children:"Submit"})]})]})]})}),(0,c.jsx)(s.ZP,{item:!0,xs:3,children:(0,c.jsxs)(i.Z,{style:{padding:"20px",marginBottom:"20px"},children:[(0,c.jsx)(o.Z,{variant:"h6",children:"Time Delay Parameters"}),(0,c.jsxs)("div",{style:{display:"flex",flexDirection:"row",marginTop:"10px"},children:[(0,c.jsxs)("div",{style:{display:"flex",flexDirection:"row",marginRight:"20px"},children:[(0,c.jsx)(l.Z,{label:"Minutes",type:"number",value:S.minutes,style:{marginRight:"5px"},onChange:e=>{let t=parseInt(e.target.value)||0;t=Math.min(t,60),t=Math.max(t,0),T((e=>({...e,minutes:t}))),R(!0)},inputProps:{step:1,min:0,max:60}}),(0,c.jsx)(l.Z,{label:"Seconds",type:"number",value:S.seconds,onChange:e=>{let t=parseInt(e.target.value)||0;t=Math.min(t,60),t=Math.max(t,0),T((e=>({...e,seconds:t}))),R(!0)},inputProps:{step:1,min:0,max:60}})]}),(0,c.jsx)(p.Z,{onClick:async()=>{try{const e=await fetch("/node-parameter/6",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({time_delay:S})});R(!1),e.ok?d("Time Delay updated successfully."):x("Failed to update Time Delay: ".concat(e.statusText))}catch(e){x("Error updating Time Delay: ".concat(e))}},color:"primary",variant:"contained",style:{marginBottom:"15px"},disabled:!w,children:"Submit"})]})]})}),(0,c.jsx)(s.ZP,{item:!0,xs:5,children:(0,c.jsxs)(i.Z,{style:{padding:"20px",marginBottom:"20px"},children:[(0,c.jsx)(o.Z,{variant:"h6",children:" Publish Time"}),(0,c.jsxs)("div",{style:{display:"flex",flexDirection:"row",marginTop:"10px"},children:[(0,c.jsxs)("div",{style:{display:"flex",flexDirection:"row",marginRight:"20px"},children:[(0,c.jsx)(l.Z,{label:"Days",type:"number",value:C.days,style:{marginRight:"5px"},onChange:e=>{let t=parseInt(e.target.value)||0;t=Math.min(t,31),t=Math.max(t,0),M((e=>({...e,days:t}))),B(!0)},inputProps:{step:1,min:0,max:31}}),(0,c.jsx)(l.Z,{label:"Hours",type:"number",value:C.hours,style:{marginRight:"5px"},onChange:e=>{let t=parseInt(e.target.value)||0;t=Math.min(t,24),t=Math.max(t,0),M((e=>({...e,hours:t}))),B(!0)},inputProps:{step:1,min:0,max:24}}),(0,c.jsx)(l.Z,{label:"Minutes",type:"number",value:C.minutes,style:{marginRight:"5px"},onChange:e=>{let t=parseInt(e.target.value)||0;t=Math.min(t,60),t=Math.max(t,0),M((e=>({...e,minutes:t}))),B(!0)},inputProps:{step:1,min:0,max:60}}),(0,c.jsx)(l.Z,{label:"Seconds",type:"number",value:C.seconds,onChange:e=>{let t=parseInt(e.target.value)||0;t=Math.min(t,60),t=Math.max(t,0),M((e=>({...e,seconds:t}))),B(!0)},inputProps:{step:1,min:0,max:60}})]}),(0,c.jsx)(p.Z,{onClick:async()=>{try{const e=await fetch("/node-parameter/7",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({publish_time:C})});B(!1),e.ok?g("Publish Time updated successfully."):x("Failed to update Publish Time: ".concat(e.statusText))}catch(e){x("Error updating Publish Time: ".concat(e))}},color:"primary",variant:"contained",style:{marginBottom:"15px"},disabled:!_,children:"Submit"})]})]})})]})}},4229:(e,t,a)=>{a.r(t),a.d(t,{default:()=>s});a(2791);var n=a(9982),r=a(184);const s=()=>(0,r.jsxs)("div",{children:[(0,r.jsx)("h1",{children:"Retention"}),(0,r.jsx)(n.Z,{})]})},890:(e,t,a)=>{a.d(t,{Z:()=>j});var n=a(3366),r=a(7462),s=a(2791),i=a(9278),o=a(8519),l=a(4419),p=a(6934),c=a(1402),m=a(4036),u=a(5878),d=a(1217);function h(e){return(0,d.Z)("MuiTypography",e)}(0,u.Z)("MuiTypography",["root","h1","h2","h3","h4","h5","h6","subtitle1","subtitle2","body1","body2","inherit","button","caption","overline","alignLeft","alignRight","alignCenter","alignJustify","noWrap","gutterBottom","paragraph"]);var g=a(184);const y=["align","className","component","gutterBottom","noWrap","paragraph","variant","variantMapping"],x=(0,p.ZP)("span",{name:"MuiTypography",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:a}=e;return[t.root,a.variant&&t[a.variant],"inherit"!==a.align&&t["align".concat((0,m.Z)(a.align))],a.noWrap&&t.noWrap,a.gutterBottom&&t.gutterBottom,a.paragraph&&t.paragraph]}})((e=>{let{theme:t,ownerState:a}=e;return(0,r.Z)({margin:0},"inherit"===a.variant&&{font:"inherit"},"inherit"!==a.variant&&t.typography[a.variant],"inherit"!==a.align&&{textAlign:a.align},a.noWrap&&{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},a.gutterBottom&&{marginBottom:"0.35em"},a.paragraph&&{marginBottom:16})})),v={h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",h6:"h6",subtitle1:"h6",subtitle2:"h6",body1:"p",body2:"p",inherit:"p"},f={primary:"primary.main",textPrimary:"text.primary",secondary:"secondary.main",textSecondary:"text.secondary",error:"error.main"},j=s.forwardRef((function(e,t){const a=(0,c.Z)({props:e,name:"MuiTypography"}),s=(e=>f[e]||e)(a.color),p=(0,o.Z)((0,r.Z)({},a,{color:s})),{align:u="inherit",className:d,component:j,gutterBottom:b=!1,noWrap:Z=!1,paragraph:P=!1,variant:S="body1",variantMapping:T=v}=p,C=(0,n.Z)(p,y),M=(0,r.Z)({},p,{align:u,color:s,className:d,component:j,gutterBottom:b,noWrap:Z,paragraph:P,variant:S,variantMapping:T}),w=j||(P?"p":T[S]||v[S])||"span",R=(e=>{const{align:t,gutterBottom:a,noWrap:n,paragraph:r,variant:s,classes:i}=e,o={root:["root",s,"inherit"!==e.align&&"align".concat((0,m.Z)(t)),a&&"gutterBottom",n&&"noWrap",r&&"paragraph"]};return(0,l.Z)(o,h,i)})(M);return(0,g.jsx)(x,(0,r.Z)({as:w,ref:t,ownerState:M,className:(0,i.Z)(R.root,d)},C))}))}}]);
//# sourceMappingURL=229.6cd9f944.chunk.js.map