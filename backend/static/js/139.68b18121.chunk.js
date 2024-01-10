"use strict";(self.webpackChunkstarter_bt5=self.webpackChunkstarter_bt5||[]).push([[139],{4139:(e,t,a)=>{a.r(t),a.d(t,{default:()=>L});var r=a(2791),n=a(7391),s=a(4294),i=a(3366),o=a(7462);function l(e){var t,a,r="";if("string"==typeof e||"number"==typeof e)r+=e;else if("object"==typeof e)if(Array.isArray(e)){var n=e.length;for(t=0;t<n;t++)e[t]&&(a=l(e[t]))&&(r&&(r+=" "),r+=a)}else for(a in e)e[a]&&(r&&(r+=" "),r+=a);return r}const d=function(){for(var e,t,a=0,r="",n=arguments.length;a<n;a++)(e=arguments[a])&&(t=l(e))&&(r&&(r+=" "),r+=t);return r};var c=a(1122),u=a(1217),h=a(4419),m=a(7078);const v=(0,a(4046).ZP)();var f=a(5080),x=a(184);const p=["className","component","disableGutters","fixed","maxWidth","classes"],g=(0,f.Z)(),b=v("div",{name:"MuiContainer",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:a}=e;return[t.root,t["maxWidth".concat((0,c.Z)(String(a.maxWidth)))],a.fixed&&t.fixed,a.disableGutters&&t.disableGutters]}}),Z=e=>(0,m.Z)({props:e,name:"MuiContainer",defaultTheme:g});var C=a(4036),j=a(6934),y=a(1402);const S=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const{createStyledComponent:t=b,useThemeProps:a=Z,componentName:n="MuiContainer"}=e,s=t((e=>{let{theme:t,ownerState:a}=e;return(0,o.Z)({width:"100%",marginLeft:"auto",boxSizing:"border-box",marginRight:"auto",display:"block"},!a.disableGutters&&{paddingLeft:t.spacing(2),paddingRight:t.spacing(2),[t.breakpoints.up("sm")]:{paddingLeft:t.spacing(3),paddingRight:t.spacing(3)}})}),(e=>{let{theme:t,ownerState:a}=e;return a.fixed&&Object.keys(t.breakpoints.values).reduce(((e,a)=>{const r=a,n=t.breakpoints.values[r];return 0!==n&&(e[t.breakpoints.up(r)]={maxWidth:"".concat(n).concat(t.breakpoints.unit)}),e}),{})}),(e=>{let{theme:t,ownerState:a}=e;return(0,o.Z)({},"xs"===a.maxWidth&&{[t.breakpoints.up("xs")]:{maxWidth:Math.max(t.breakpoints.values.xs,444)}},a.maxWidth&&"xs"!==a.maxWidth&&{[t.breakpoints.up(a.maxWidth)]:{maxWidth:"".concat(t.breakpoints.values[a.maxWidth]).concat(t.breakpoints.unit)}})})),l=r.forwardRef((function(e,t){const r=a(e),{className:l,component:m="div",disableGutters:v=!1,fixed:f=!1,maxWidth:g="lg"}=r,b=(0,i.Z)(r,p),Z=(0,o.Z)({},r,{component:m,disableGutters:v,fixed:f,maxWidth:g}),C=((e,t)=>{const{classes:a,fixed:r,disableGutters:n,maxWidth:s}=e,i={root:["root",s&&"maxWidth".concat((0,c.Z)(String(s))),r&&"fixed",n&&"disableGutters"]};return(0,h.Z)(i,(e=>(0,u.Z)(t,e)),a)})(Z,n);return(0,x.jsx)(s,(0,o.Z)({as:m,ownerState:Z,className:d(C.root,l),ref:t},b))}));return l}({createStyledComponent:(0,j.ZP)("div",{name:"MuiContainer",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:a}=e;return[t.root,t["maxWidth".concat((0,C.Z)(String(a.maxWidth)))],a.fixed&&t.fixed,a.disableGutters&&t.disableGutters]}}),useThemeProps:e=>(0,y.Z)({props:e,name:"MuiContainer"})}),W=S;var k=a(2421),w=a(104),N=a(8519),D=a(3459);const R=["className","component"];var P=a(5902),G=a(1979),T=a(988);const M=(0,a(5878).Z)("MuiBox",["root"]),I=(0,G.Z)(),_=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const{themeId:t,defaultTheme:a,defaultClassName:n="MuiBox-root",generateClassName:s}=e,l=(0,k.ZP)("div",{shouldForwardProp:e=>"theme"!==e&&"sx"!==e&&"as"!==e})(w.Z);return r.forwardRef((function(e,r){const c=(0,D.Z)(a),u=(0,N.Z)(e),{className:h,component:m="div"}=u,v=(0,i.Z)(u,R);return(0,x.jsx)(l,(0,o.Z)({as:m,ref:r,className:d(h,s?s(n):n),theme:t&&c[t]||c},v))}))}({themeId:T.Z,defaultTheme:I,defaultClassName:M.root,generateClassName:P.Z.generate}),E=_;var O=a(9658);const A="http://localhost:5000",B=()=>{const[e,t]=(0,r.useState)(""),[a,i]=(0,r.useState)(""),[o,l]=(0,r.useState)(""),[d,c]=(0,r.useState)(""),[u,h]=(0,r.useState)(""),[m,v]=(0,r.useState)(""),[f,p]=(0,r.useState)(""),[g,b]=(0,r.useState)(""),Z=()=>{t(""),i("")},C=()=>{l(""),c(""),h(""),v("")};return(0,x.jsxs)(W,{children:[(0,x.jsxs)(E,{mt:3,children:[(0,x.jsx)("h2",{children:"Create Device"}),(0,x.jsxs)("form",{children:[(0,x.jsx)(n.Z,{label:"Device Name",variant:"outlined",fullWidth:!0,value:e,onChange:e=>t(e.target.value)}),(0,x.jsx)(n.Z,{label:"Slave ID",variant:"outlined",fullWidth:!0,value:a,onChange:e=>i(e.target.value)}),(0,x.jsx)(s.Z,{variant:"contained",color:"primary",onClick:()=>{if(e&&a){const t={name:e,slave_id:a};fetch("".concat(A,"/devices/"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}).then((e=>{if(!e.ok)throw new Error("Network response was not ok");return e.json()})).then((()=>{p("Device created successfully!"),b(""),Z()})).catch((e=>{console.error("Error creating device:",e),b("Error creating device. Please try again.")}))}else b("Both device name and slave ID are required")},children:"Create Device"})]})]}),(0,x.jsxs)(E,{mt:3,children:[(0,x.jsx)("h2",{children:"Register Device"}),(0,x.jsxs)("form",{children:[(0,x.jsx)(n.Z,{label:"Address",variant:"outlined",fullWidth:!0,value:o,onChange:e=>l(e.target.value)}),(0,x.jsx)(n.Z,{label:"Parameter Name",variant:"outlined",fullWidth:!0,value:d,onChange:e=>c(e.target.value)}),(0,x.jsx)(n.Z,{label:"Type",variant:"outlined",fullWidth:!0,value:u,onChange:e=>h(e.target.value)}),(0,x.jsx)(n.Z,{label:"Device ID",variant:"outlined",fullWidth:!0,value:m,onChange:e=>v(e.target.value)}),(0,x.jsx)(s.Z,{variant:"contained",color:"primary",onClick:()=>{if(!m)return void b("Device ID is required!");const e={address:o,parameter_name:d,data_type:u,device_id:m};fetch("".concat(A,"/register/"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).then((()=>{p("New register created successfully!"),b(""),C()})).catch((e=>{console.error("Error creating a new register:",e),b("Error creating a new register. Please try again.")}))},children:"Register Device"})]})]}),f&&(0,x.jsx)(O.Z,{severity:"success",onClose:()=>p(""),children:f}),g&&(0,x.jsx)(O.Z,{severity:"error",onClose:()=>b(""),children:g})]})},L=()=>(0,x.jsxs)("div",{children:[(0,x.jsx)("h1",{children:"CreateDeviceAndRegister"}),(0,x.jsx)(B,{})]})}}]);
//# sourceMappingURL=139.68b18121.chunk.js.map