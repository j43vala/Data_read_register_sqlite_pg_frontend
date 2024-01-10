"use strict";(self.webpackChunkstarter_bt5=self.webpackChunkstarter_bt5||[]).push([[505],{9982:(e,t,s)=>{s.d(t,{Z:()=>d});var n=s(2791),a=s(9658),r=s(1889),i=s(5527),o=s(890),l=s(7391),c=s(4294),u=s(184);const d=()=>{const[e,t]=(0,n.useState)(null),[s,d]=(0,n.useState)(""),[m,p]=(0,n.useState)(""),[h,x]=(0,n.useState)(""),[y,f]=(0,n.useState)(""),[g,v]=(0,n.useState)(""),[b,j]=(0,n.useState)({checkFrequency:{days:"",hours:"",minutes:"",seconds:""},successRetention:{days:"",hours:"",minutes:"",seconds:""},failureRetention:{days:"",hours:"",minutes:"",seconds:""}}),[Z,O]=(0,n.useState)(!1),[P,w]=(0,n.useState)({minutes:"",seconds:""}),[C,T]=(0,n.useState)({days:"",hours:"",minutes:"",seconds:""}),[S,M]=(0,n.useState)(!1),[_,k]=(0,n.useState)(!1);if((0,n.useEffect)((()=>{setTimeout((()=>{d(""),p(""),x(""),f(""),v("")}),5e3)}),[s,m,h,y,g]),(0,n.useEffect)((()=>{(async()=>{try{const a=await fetch("/node-parameter/"),r=await a.json();if(t(r),r.node_parameters){var e,s,n;const t=null===(e=r.node_parameters.find((e=>"retention_parameter"===e.name)))||void 0===e?void 0:e.value;t&&j(t);const a=null===(s=r.node_parameters.find((e=>"time_delay"===e.name)))||void 0===s?void 0:s.value;a&&w(a);const i=null===(n=r.node_parameters.find((e=>"publish_time"===e.name)))||void 0===n?void 0:n.value;i&&T(i)}}catch(a){console.error("Error fetching data:",a)}})()}),[]),!e)return(0,u.jsx)("p",{children:"Loading..."});const R=e=>{let{message:t}=e;return(0,u.jsx)(a.Z,{severity:"success",children:t})},N=e=>{let{message:t}=e;return(0,u.jsx)(a.Z,{severity:"error",children:t})};return(0,u.jsxs)(r.ZP,{container:!0,spacing:1,children:[(0,u.jsxs)(r.ZP,{item:!0,xs:12,children:[s&&(0,u.jsx)(R,{message:s,onClose:()=>d("")}),m&&(0,u.jsx)(R,{message:m,onClose:()=>p("")}),h&&(0,u.jsx)(R,{message:h,onClose:()=>x("")}),y&&(0,u.jsx)(N,{message:y,onClose:()=>f("")})]}),(0,u.jsx)(r.ZP,{item:!0,xs:4,children:(0,u.jsxs)(i.Z,{style:{padding:"20px",marginBottom:"20px"},children:[(0,u.jsx)(o.Z,{variant:"h6",children:"Retention Parameters"}),(0,u.jsxs)("form",{children:[["check_frequency","success_retention","failure_retention"].map(((e,t)=>(0,u.jsxs)("div",{style:{marginBottom:"20px"},children:[(0,u.jsx)(o.Z,{variant:"subtitle1",children:e.replace("_"," ")}),(0,u.jsx)("div",{style:{display:"flex",flexDirection:"row"},children:["days","hours","minutes","seconds"].map(((t,s)=>(0,u.jsx)(l.Z,{label:t.charAt(0).toUpperCase()+t.slice(1),type:"number",value:b[e][t],onChange:s=>((e,t,s)=>{const n=parseInt(s,10);isNaN(n)||j((s=>({...s,[e]:{...s[e],[t]:n}}))),O(!0)})(e,t,s.target.value),fullWidth:!0,style:{marginRight:"10px"},inputProps:{min:0,max:"days"===t?31:"hours"===t?24:60}},s)))})]},t))),(0,u.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end"},children:[(0,u.jsx)(c.Z,{onClick:()=>{j({check_frequency:{days:0,hours:0,minutes:0,seconds:0},success_retention:{days:0,hours:0,minutes:0,seconds:0},failure_retention:{days:0,hours:0,minutes:0,seconds:0}}),O(!1)},color:"primary",variant:"contained",style:{marginRight:"10px"},children:"Reset"}),(0,u.jsx)(c.Z,{onClick:async()=>{try{const e=await fetch("/node-parameter/5",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({retention_parameter:b})});O(!1),e.ok?d("Retention Parameters updated successfully."):f("Failed to update Retention Parameters: ".concat(e.statusText))}catch(e){f("Error updating Retention Parameters: ".concat(e))}},color:"primary",variant:"contained",disabled:!Z,children:"Submit"})]})]})]})}),(0,u.jsx)(r.ZP,{item:!0,xs:4,children:(0,u.jsxs)(i.Z,{style:{padding:"20px",marginBottom:"20px"},children:[(0,u.jsx)(o.Z,{variant:"h6",children:"Time Delay Parameters"}),(0,u.jsxs)("div",{style:{display:"flex",flexDirection:"row",marginTop:"10px"},children:[(0,u.jsxs)("div",{style:{display:"flex",flexDirection:"row",marginRight:"20px"},children:[(0,u.jsx)(l.Z,{label:"Minutes",type:"number",value:P.minutes,style:{marginRight:"5px"},onChange:e=>{let t=parseInt(e.target.value)||0;t=Math.min(t,60),t=Math.max(t,0),w((e=>({...e,minutes:t}))),M(!0)},inputProps:{step:1,min:0,max:60}}),(0,u.jsx)(l.Z,{label:"Seconds",type:"number",value:P.seconds,onChange:e=>{let t=parseInt(e.target.value)||0;t=Math.min(t,60),t=Math.max(t,0),w((e=>({...e,seconds:t}))),M(!0)},inputProps:{step:1,min:0,max:60}})]}),(0,u.jsx)(c.Z,{onClick:async()=>{try{const e=await fetch("/node-parameter/6",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({time_delay:P})});M(!1),e.ok?p("Time Delay updated successfully."):f("Failed to update Time Delay: ".concat(e.statusText))}catch(e){f("Error updating Time Delay: ".concat(e))}},color:"primary",variant:"contained",style:{marginBottom:"15px"},disabled:!S,children:"Submit"})]})]})}),(0,u.jsx)(r.ZP,{item:!0,xs:4,children:(0,u.jsxs)(i.Z,{style:{padding:"20px",marginBottom:"20px"},children:[(0,u.jsx)(o.Z,{variant:"h6",children:" Publish Time"}),(0,u.jsxs)("div",{style:{display:"flex",flexDirection:"row",marginTop:"10px"},children:[(0,u.jsxs)("div",{style:{display:"flex",flexDirection:"row",marginRight:"20px"},children:[(0,u.jsx)(l.Z,{label:"Days",type:"number",value:C.days,style:{marginRight:"5px"},onChange:e=>{let t=parseInt(e.target.value)||0;t=Math.min(t,31),t=Math.max(t,0),T((e=>({...e,days:t}))),k(!0)},inputProps:{step:1,min:0,max:31}}),(0,u.jsx)(l.Z,{label:"Hours",type:"number",value:C.hours,style:{marginRight:"5px"},onChange:e=>{let t=parseInt(e.target.value)||0;t=Math.min(t,24),t=Math.max(t,0),T((e=>({...e,hours:t}))),k(!0)},inputProps:{step:1,min:0,max:24}}),(0,u.jsx)(l.Z,{label:"Minutes",type:"number",value:C.minutes,style:{marginRight:"5px"},onChange:e=>{let t=parseInt(e.target.value)||0;t=Math.min(t,60),t=Math.max(t,0),T((e=>({...e,minutes:t}))),k(!0)},inputProps:{step:1,min:0,max:60}}),(0,u.jsx)(l.Z,{label:"Seconds",type:"number",value:C.seconds,onChange:e=>{let t=parseInt(e.target.value)||0;t=Math.min(t,60),t=Math.max(t,0),T((e=>({...e,seconds:t}))),k(!0)},inputProps:{step:1,min:0,max:60}})]}),(0,u.jsx)(c.Z,{onClick:async()=>{try{const e=await fetch("/node-parameter/7",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({publish_time:C})});k(!1),e.ok?x("Publish Time updated successfully."):f("Failed to update Publish Time: ".concat(e.statusText))}catch(e){f("Error updating Publish Time: ".concat(e))}},color:"primary",variant:"contained",style:{marginBottom:"15px"},disabled:!_,children:"Submit"})]})]})})]})}},6964:(e,t,s)=>{s.r(t),s.d(t,{default:()=>c});var n=s(3009),a=s(9773),r=s(2399),i=s(1359);s.p,s.p,s.p,s.p;var o=s(9982),l=s(184);const c=()=>(0,l.jsx)("div",{children:(0,l.jsxs)(n.Z,{children:[(0,l.jsx)(a.Z,{xxl:"12",children:(0,l.jsx)(i.Z,{})}),(0,l.jsx)(a.Z,{xxl:"12",children:(0,l.jsx)(r.Z,{})}),(0,l.jsx)(a.Z,{xxl:"12",children:(0,l.jsx)(o.Z,{})})]})})},9773:(e,t,s)=>{s.d(t,{Z:()=>v});var n=s(2791),a=s(2007),r=s.n(a),i=s(1418),o=s.n(i),l=s(9622),c=["className","cssModule","widths","tag"];function u(){return u=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var s=arguments[t];for(var n in s)Object.prototype.hasOwnProperty.call(s,n)&&(e[n]=s[n])}return e},u.apply(this,arguments)}function d(e,t){if(null==e)return{};var s,n,a=function(e,t){if(null==e)return{};var s,n,a={},r=Object.keys(e);for(n=0;n<r.length;n++)s=r[n],t.indexOf(s)>=0||(a[s]=e[s]);return a}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)s=r[n],t.indexOf(s)>=0||Object.prototype.propertyIsEnumerable.call(e,s)&&(a[s]=e[s])}return a}function m(e,t,s){return t in e?Object.defineProperty(e,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[t]=s,e}var p=["xs","sm","md","lg","xl","xxl"],h=r().oneOfType([r().number,r().string]),x=r().oneOfType([r().bool,r().number,r().string,r().shape({size:r().oneOfType([r().bool,r().number,r().string]),order:h,offset:h})]),y={tag:l.iC,xs:x,sm:x,md:x,lg:x,xl:x,xxl:x,className:r().string,cssModule:r().object,widths:r().array},f=function(e,t,s){return!0===s||""===s?e?"col":"col-".concat(t):"auto"===s?e?"col-auto":"col-".concat(t,"-auto"):e?"col-".concat(s):"col-".concat(t,"-").concat(s)};function g(e){var t=e.className,s=e.cssModule,a=e.widths,r=void 0===a?p:a,i=e.tag,h=void 0===i?"div":i,x=function(e,t){var s=e,n=[];return(arguments.length>2&&void 0!==arguments[2]?arguments[2]:p).forEach((function(e,a){var r=s[e];if(delete s[e],r||""===r){var i=!a;if((0,l.Kn)(r)){var c,u=i?"-":"-".concat(e,"-"),d=f(i,e,r.size);n.push((0,l.mx)(o()((m(c={},d,r.size||""===r.size),m(c,"order".concat(u).concat(r.order),r.order||0===r.order),m(c,"offset".concat(u).concat(r.offset),r.offset||0===r.offset),c)),t))}else{var p=f(i,e,r);n.push(p)}}})),{colClasses:n,modifiedAttributes:s}}(d(e,c),s,r),y=x.modifiedAttributes,g=x.colClasses;g.length||g.push("col");var v=(0,l.mx)(o()(t,g),s);return n.createElement(h,u({},y,{className:v}))}g.propTypes=y;const v=g},3009:(e,t,s)=>{s.d(t,{Z:()=>y});var n=s(2791),a=s(2007),r=s.n(a),i=s(1418),o=s.n(i),l=s(9622),c=["className","cssModule","noGutters","tag","widths"];function u(){return u=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var s=arguments[t];for(var n in s)Object.prototype.hasOwnProperty.call(s,n)&&(e[n]=s[n])}return e},u.apply(this,arguments)}function d(e,t){if(null==e)return{};var s,n,a=function(e,t){if(null==e)return{};var s,n,a={},r=Object.keys(e);for(n=0;n<r.length;n++)s=r[n],t.indexOf(s)>=0||(a[s]=e[s]);return a}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)s=r[n],t.indexOf(s)>=0||Object.prototype.propertyIsEnumerable.call(e,s)&&(a[s]=e[s])}return a}var m=["xs","sm","md","lg","xl","xxl"],p=r().oneOfType([r().number,r().string]),h={tag:l.iC,noGutters:(0,l.x9)(r().bool,"Please use Bootstrap 5 gutter utility classes. https://getbootstrap.com/docs/5.0/layout/gutters/"),className:r().string,cssModule:r().object,xs:p,sm:p,md:p,lg:p,xl:p,xxl:p,widths:r().array};function x(e){var t=e.className,s=e.cssModule,a=e.noGutters,r=e.tag,i=void 0===r?"div":r,p=e.widths,h=void 0===p?m:p,x=d(e,c),y=[];h.forEach((function(t,s){var n=e[t];if(delete x[t],n){var a=!s;y.push(a?"row-cols-".concat(n):"row-cols-".concat(t,"-").concat(n))}}));var f=(0,l.mx)(o()(t,a?"gx-0":null,"row",y),s);return n.createElement(i,u({},x,{className:f}))}x.propTypes=h;const y=x}}]);
//# sourceMappingURL=505.eae5fc6f.chunk.js.map