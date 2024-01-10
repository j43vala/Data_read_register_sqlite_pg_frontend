"use strict";(self.webpackChunkstarter_bt5=self.webpackChunkstarter_bt5||[]).push([[359],{1359:(e,t,s)=>{s.d(t,{Z:()=>S});var a=s(2791),n=s(9658),o=s(1889),r=s(4294),i=s(5527),l=s(890),d=s(8096),c=s(4925),u=s(3926),p=s(9891),m=s(5289),h=s(5661),x=s(9157),v=s(7391),j=s(7123),g=s(3400),y=s(6189),Z=s(184);const b=(0,y.Z)((0,Z.jsx)("path",{d:"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"}),"Edit"),f=(0,y.Z)((0,Z.jsx)("path",{d:"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"}),"Add"),C=(0,y.Z)((0,Z.jsx)("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"}),"Delete"),_=(0,y.Z)((0,Z.jsx)("path",{d:"M19 13H5v-2h14v2z"}),"Remove"),S=()=>{var e,t,s,y,S,k,P,w,T;const[B,M]=(0,a.useState)(null),[N,q]=(0,a.useState)(!1),[A,E]=(0,a.useState)(!1),[L,z]=(0,a.useState)([]),[I,U]=(0,a.useState)(!1),[W,D]=(0,a.useState)(!1),[F,R]=(0,a.useState)([]),[H,O]=(0,a.useState)({port:"",method:"",parity:"",baudrate:"",stopbits:"",wordLength:""}),[V,J]=(0,a.useState)(""),[G,Q]=(0,a.useState)(""),[K,X]=(0,a.useState)(""),[Y,$]=(0,a.useState)(""),[ee,te]=(0,a.useState)(""),[se,ae]=(0,a.useState)(""),[ne,oe]=(0,a.useState)(""),[re,ie]=(0,a.useState)([]),[le,de]=(0,a.useState)(!1),[ce,ue]=(0,a.useState)(!1),[pe]=(0,a.useState)(!1),[me,he]=(0,a.useState)(""),[xe,ve]=(0,a.useState)(""),[je,ge]=(0,a.useState)(""),[ye,Ze]=(0,a.useState)(""),[be,fe]=(0,a.useState)(""),[Ce,_e]=(0,a.useState)(""),[Se,ke]=(0,a.useState)(""),[Pe,we]=(0,a.useState)("");if((0,a.useEffect)((()=>{setTimeout((()=>{he(""),ve(""),ge(""),Ze(""),fe(""),_e(""),ke(""),we("")}),5e3)}),[me,xe,je,ye,be,Ce,Se,Pe]),(0,a.useEffect)((()=>{(async()=>{try{const s=await fetch("/node-parameter/"),a=await s.json();if(M(a),a.node_parameters){var e,t;const s=null===(e=a.node_parameters.find((e=>"modbus"===e.name)))||void 0===e?void 0:e.value;s&&O(s);const n=null===(t=a.node_parameters.find((e=>"mqtt"===e.name)))||void 0===t?void 0:t.value;n&&ie(n.qos_options||[])}}catch(s){console.error("Error fetching data:",s)}})()}),[]),!B)return(0,Z.jsx)("p",{children:"Loading..."});const Te=null===(e=B.node_parameters.find((e=>"spb_parameter"===e.name)))||void 0===e?void 0:e.value,Be=null===(t=B.node_parameters.find((e=>"node_attributes"===e.name)))||void 0===t?void 0:t.value,Me=null===(s=B.node_parameters.find((e=>"mqtt"===e.name)))||void 0===s?void 0:s.value,Ne=[...new Set(null===(y=B.node_parameters.find((e=>"modbus"===e.name)))||void 0===y?void 0:y.value.baudrate_options)],qe=[...new Set(null===(S=B.node_parameters.find((e=>"modbus"===e.name)))||void 0===S?void 0:S.value.wordlength_options)],Ae=[...new Set(null===(k=B.node_parameters.find((e=>"modbus"===e.name)))||void 0===k?void 0:k.value.parity_options)],Ee=[...new Set(null===(P=B.node_parameters.find((e=>"modbus"===e.name)))||void 0===P?void 0:P.value.stopbits_options)],Le=[...new Set(null===(w=B.node_parameters.find((e=>"modbus"===e.name)))||void 0===w?void 0:w.value.port_options)],ze=[...new Set(null===(T=B.node_parameters.find((e=>"modbus"===e.name)))||void 0===T?void 0:T.value.method_options)],Ie=()=>{q(!1),D(!1),E(!1),U(!1)},Ue=(e,t,s)=>{const a=[...F];a[e][t]=s,R(a)},We=()=>{R([...F,{name:"",value:""}])},De=(e,t)=>{z((s=>{const a=[...s];return a[e]=t,a}))},Fe=e=>{let{message:t}=e;return(0,Z.jsx)(n.Z,{severity:"success",children:t})},Re=e=>{let{message:t}=e;return(0,Z.jsx)(n.Z,{severity:"error",children:t})};return(0,Z.jsxs)(o.ZP,{container:!0,spacing:1,children:[(0,Z.jsxs)(o.ZP,{item:!0,xs:6,children:[be&&(0,Z.jsx)(Fe,{message:be,onClose:()=>fe("")}),Ce&&(0,Z.jsx)(Fe,{message:Ce,onClose:()=>_e("")}),je&&(0,Z.jsx)(Fe,{message:je,onClose:()=>ge("")}),xe&&(0,Z.jsx)(Fe,{message:xe,onClose:()=>ve("")}),ye&&(0,Z.jsx)(Fe,{message:ye,onClose:()=>Ze("")}),me&&(0,Z.jsx)(Fe,{message:me,onClose:()=>he("")}),Se&&(0,Z.jsx)(Re,{message:Se,onClose:()=>ke("")})]}),(0,Z.jsx)(o.ZP,{item:!0,xs:6,children:(0,Z.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",marginBottom:"20px"},children:[(0,Z.jsx)(r.Z,{onClick:()=>{de(!0),fetch("/service/restart-services",{method:"GET",headers:{"Content-Type":"application/json"}}).then((e=>{e.ok?fe("Service is restarting."):ke("Failed to restart service: ".concat(e.statusText))})).catch((e=>{ke("Error restarting service: ".concat(e))})).finally((()=>{de(!1)}))},disabled:le||pe,variant:"contained",color:"primary",children:"Restart"}),(0,Z.jsx)(r.Z,{onClick:()=>{ue(!0),fetch("/service/stop-services",{method:"GET",headers:{"Content-Type":"application/json"}}).then((e=>{e.ok?_e("Service is stopped."):ke("Failed to stop service: ".concat(e.statusText))})).catch((e=>{ke("Error stopping service: ".concat(e))})).finally((()=>{ue(!1)}))},disabled:ce,style:{marginLeft:"10px"},variant:"contained",color:"error",children:"Stop"})]})}),(0,Z.jsx)(o.ZP,{item:!0,xs:4,children:(0,Z.jsxs)(i.Z,{style:{padding:"20px",marginBottom:"20px"},children:[(0,Z.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between"},children:[(0,Z.jsx)(l.Z,{variant:"h6",children:"Node Attributes"}),(0,Z.jsxs)("div",{style:{display:"flex",gap:"0px"},children:[(0,Z.jsx)(g.Z,{variant:"outlined",style:{marginRight:"0px"},onClick:()=>{const e=(null===Be||void 0===Be?void 0:Be.map((e=>({name:e.name,value:e.value}))))||[];z(e),E(!0)},children:(0,Z.jsx)(b,{style:{fontSize:"medium"}})}),(0,Z.jsx)(g.Z,{variant:"outlined",style:{marginLeft:"5px"},onClick:()=>{R([{name:"",value:""}]),D(!0)},children:(0,Z.jsx)(f,{style:{color:"green",fontSize:"medium"}})})]})]}),(0,Z.jsx)("div",{style:{marginTop:"3px"},children:Be&&Be.map((e=>(0,Z.jsx)("div",{children:(0,Z.jsxs)(l.Z,{variant:"body1",children:[(0,Z.jsxs)("strong",{children:[e.name,":"]})," ",e.value]})},e.name)))})]})}),(0,Z.jsx)(o.ZP,{item:!0,xs:4,children:(0,Z.jsxs)(i.Z,{style:{padding:"20px",marginBottom:"20px"},children:[(0,Z.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between"},children:[(0,Z.jsx)(l.Z,{variant:"h6",children:"SPB Parameter"}),(0,Z.jsx)(g.Z,{variant:"outlined",style:{marginLeft:"10px"},onClick:()=>{J((null===Te||void 0===Te?void 0:Te.edge_node_id)||""),Q((null===Te||void 0===Te?void 0:Te.group_id)||""),q(!0)},children:(0,Z.jsx)(b,{style:{fontSize:"medium"}})})]}),(0,Z.jsxs)("div",{children:[(0,Z.jsx)("strong",{children:"Edge Node Id:"})," ",null===Te||void 0===Te?void 0:Te.edge_node_id]}),(0,Z.jsxs)("div",{children:[(0,Z.jsx)("strong",{children:"Group Id:"})," ",null===Te||void 0===Te?void 0:Te.group_id]})]})}),(0,Z.jsx)(o.ZP,{item:!0,xs:4,children:(0,Z.jsxs)(i.Z,{style:{padding:"20px",marginBottom:"20px"},children:[(0,Z.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between"},children:[(0,Z.jsx)(l.Z,{variant:"h6",children:"MQTT"}),(0,Z.jsx)(g.Z,{variant:"outlined",style:{marginLeft:"10px"},onClick:()=>{X((null===Me||void 0===Me?void 0:Me.broker_host)||""),$((null===Me||void 0===Me?void 0:Me.broker_port)||""),oe((null===Me||void 0===Me?void 0:Me.qos)||""),te((null===Me||void 0===Me?void 0:Me.user)||""),ae((null===Me||void 0===Me?void 0:Me.password)||""),U(!0),ie((null===Me||void 0===Me?void 0:Me.qos_options)||[])},children:(0,Z.jsx)(b,{style:{fontSize:"medium"}})})]}),(0,Z.jsxs)("div",{children:[(0,Z.jsx)("strong",{children:"Broker Host:"})," ",null===Me||void 0===Me?void 0:Me.broker_host]}),(0,Z.jsx)("div",{style:{display:"flex",alignItems:"center"},children:(0,Z.jsxs)("div",{style:{marginRight:"60px"},children:[(0,Z.jsx)("strong",{children:"Broker Port:"})," ",null===Me||void 0===Me?void 0:Me.broker_port]})}),(0,Z.jsxs)("div",{children:[(0,Z.jsx)("strong",{children:"Client ID:"})," ",null===Me||void 0===Me?void 0:Me.user]}),(0,Z.jsxs)("div",{children:[(0,Z.jsx)("strong",{children:"Client Password:"})," ",null===Me||void 0===Me?void 0:Me.password]})]})}),(0,Z.jsx)(o.ZP,{item:!0,xs:12,children:(0,Z.jsxs)(i.Z,{style:{padding:"20px",marginBottom:"20px"},children:[(0,Z.jsx)(l.Z,{variant:"h6",children:"Modbus Parameters"}),(0,Z.jsx)("div",{style:{display:"flex",flexDirection:"row",marginTop:"10px"},children:["Port","Method","Parity","Baudrate","Stopbits","WordLength"].map(((e,t)=>(0,Z.jsx)("div",{style:{marginRight:"20px",width:"Method"===e?"150px":"120px"},children:(0,Z.jsxs)(d.Z,{fullWidth:!0,children:[(0,Z.jsx)(c.Z,{children:e}),(0,Z.jsxs)(u.Z,{value:H[e.toLowerCase()],onChange:t=>(async(e,t)=>{try{const s=await fetch("/node-parameter/1",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({modbus:{...H,[e]:t}})});s.ok?(he("Modbus updated successfully."),O((s=>({...s,[e]:t})))):ke("Failed to update Modbus: ".concat(s.statusText))}catch(s){ke("Error updating Modbus: ".concat(s))}})(e.toLowerCase(),t.target.value),children:["Baudrate"===e&&Ne.map((e=>(0,Z.jsx)(p.Z,{value:e,children:e},e))),"WordLength"===e&&qe.map((e=>(0,Z.jsx)(p.Z,{value:e,children:e},e))),"Parity"===e&&Ae.map((e=>(0,Z.jsx)(p.Z,{value:e,children:e},e))),"Stopbits"===e&&Ee.map((e=>(0,Z.jsx)(p.Z,{value:e,children:e},e))),"Port"===e&&Le.map((e=>(0,Z.jsx)(p.Z,{value:e,children:e},e))),"Method"===e&&ze.map((e=>(0,Z.jsx)(p.Z,{value:e,children:e},e)))]})]})},t)))})]})}),(0,Z.jsxs)(m.Z,{open:N,onClose:Ie,children:[(0,Z.jsx)(h.Z,{children:"Update SPB Parameter"}),(0,Z.jsxs)(x.Z,{children:[(0,Z.jsx)(v.Z,{label:"Edge Node ID",value:V,onChange:e=>J(e.target.value),fullWidth:!0,style:{marginBottom:"16px",marginTop:"5px"}}),(0,Z.jsx)(v.Z,{label:"Group ID",value:G,onChange:e=>Q(e.target.value),fullWidth:!0})]}),(0,Z.jsxs)(j.Z,{children:[(0,Z.jsx)(r.Z,{onClick:Ie,children:"Cancel"}),(0,Z.jsx)(r.Z,{onClick:async()=>{const e={spb_parameter:{edge_node_id:V,group_id:G}};try{const t=await fetch("/node-parameter/3",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});t.ok?(ve("SPB Parameter updated successfully."),M((e=>({...e,node_parameters:e.node_parameters.map((e=>"spb_parameter"===e.name?{...e,value:{edge_node_id:V,group_id:G}}:e))})))):ke("Failed to update SPB Parameter: ".concat(t.statusText))}catch(t){ke("Error updating SPB Parameter: ".concat(t))}Ie()},color:"primary",children:"Update"})]})]}),(0,Z.jsxs)(m.Z,{open:A,onClose:Ie,children:[(0,Z.jsx)(h.Z,{children:"Edit Node Attribute"}),(0,Z.jsx)(x.Z,{children:L.map(((e,t)=>(0,Z.jsxs)("div",{style:{display:"flex",flexDirection:"row",marginBottom:"10px"},children:[(0,Z.jsx)(v.Z,{label:"Attribute Name",value:e.name,onChange:s=>De(t,{...e,name:s.target.value}),style:{marginRight:"10px",marginTop:"5px"}}),(0,Z.jsx)(v.Z,{label:"Attribute Value",value:e.value,onChange:s=>De(t,{...e,value:s.target.value}),style:{marginTop:"5px"}}),(0,Z.jsx)(g.Z,{onClick:()=>(e=>{const t=[...L];t.splice(e,1),z(t)})(t),children:(0,Z.jsx)(C,{style:{color:"black",fontSize:"medium"}})})]},t)))}),(0,Z.jsxs)(j.Z,{children:[(0,Z.jsx)(r.Z,{onClick:Ie,children:"Cancel"}),(0,Z.jsx)(r.Z,{onClick:async()=>{M((e=>{const t=e.node_parameters.map((e=>"node_attributes"===e.name?{...e,value:L.map((e=>({name:e.name,value:e.value})))}:e));return{...e,node_parameters:t}}));const e={node_attributes:L.map((e=>({name:e.name,value:e.value})))};try{const t=await fetch("/node-parameter/4",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});t.ok?ge("Node Attribute updated successfully."):ke("Failed to update Node Attribute: ".concat(t.statusText))}catch(t){ke("Error updating Node Attribute:  ".concat(t))}Ie()},color:"primary",children:"Update"})]})]}),(0,Z.jsxs)(m.Z,{open:W,onClose:Ie,children:[(0,Z.jsx)(h.Z,{children:"Add Node Attribute"}),(0,Z.jsx)(x.Z,{children:F.map(((e,t)=>(0,Z.jsxs)(o.ZP,{container:!0,spacing:2,alignItems:"center",style:{marginBottom:"8px"},children:[(0,Z.jsx)(o.ZP,{item:!0,xs:4,children:(0,Z.jsx)(v.Z,{label:"Attribute Name",value:e.name,style:{marginTop:"5px"},onChange:e=>Ue(t,"name",e.target.value)})}),(0,Z.jsx)(o.ZP,{item:!0,xs:4,children:(0,Z.jsx)(v.Z,{label:"Attribute Value",value:e.value,style:{marginTop:"5px"},onChange:e=>Ue(t,"value",e.target.value)})}),(0,Z.jsx)(o.ZP,{item:!0,xs:2,children:t>0&&(0,Z.jsx)(g.Z,{onClick:()=>{return e=t,void R((t=>t.filter(((t,s)=>s!==e))));var e},children:(0,Z.jsx)(_,{style:{color:"red"}})})}),(0,Z.jsx)(o.ZP,{item:!0,xs:2,children:t===F.length-1&&(0,Z.jsx)(g.Z,{onClick:We,children:(0,Z.jsx)(f,{style:{color:"green"}})})})]},t)))}),(0,Z.jsxs)(j.Z,{children:[(0,Z.jsx)(r.Z,{onClick:Ie,children:"Cancel"}),(0,Z.jsx)(r.Z,{onClick:async()=>{try{const e=F.map((e=>({name:e.name,value:e.value}))),t=await fetch("/node-parameter/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:"node_attributes",value:e})});t.ok?(ge("Node Attributes added successfully."),M((t=>({...t,node_parameters:t.node_parameters.map((t=>"node_attributes"===t.name?{...t,value:[...t.value||[],...e]}:t))}))),R([])):ke("Failed to add Node Attributes: ".concat(t.statusText))}catch(e){ke("Error adding Node Attributes: ".concat(e))}Ie()},color:"primary",children:"Add"})]})]}),(0,Z.jsxs)(m.Z,{open:I,onClose:Ie,children:[(0,Z.jsx)(h.Z,{children:"Update Mqtt"}),(0,Z.jsxs)(x.Z,{children:[(0,Z.jsx)(v.Z,{label:"Broker Host",value:K,onChange:e=>X(e.target.value),fullWidth:!0,style:{marginBottom:"16px",marginTop:"5px"}}),(0,Z.jsx)(v.Z,{label:"Broker Port",value:Y,style:{marginBottom:"16px"},onChange:e=>$(e.target.value),fullWidth:!0}),(0,Z.jsx)(v.Z,{label:"Client ID",value:ee,onChange:e=>te(e.target.value),fullWidth:!0,style:{marginBottom:"16px"}}),(0,Z.jsx)(v.Z,{label:"Client Password",value:se,onChange:e=>ae(e.target.value),fullWidth:!0})]}),(0,Z.jsxs)(j.Z,{children:[(0,Z.jsx)(r.Z,{onClick:Ie,children:"Cancel"}),(0,Z.jsx)(r.Z,{onClick:async()=>{const e={mqtt:{broker_host:K,broker_port:Y,user:ee,password:se,qos:ne,qos_options:re}};try{const t=await fetch("/node-parameter/2",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});if(t.ok){const e=await t.json();console.log("Response Data:",e),Ze("Mqtt updated successfully"),M((t=>({...t,node_parameters:t.node_parameters.map((t=>"mqtt"===t.name?{...t,value:{broker_host:K,broker_port:Y,user:ee,password:se,qos:ne,qos_options:e.qos_options||[]}}:t))}))),ie(e.qos_options||[])}else ke("Failed to update Mqtt: ".concat(t.statusText))}catch(t){ke("Error updating Mqtt: ".concat(t))}Ie()},color:"primary",children:"Update"})]})]})]})}}}]);
//# sourceMappingURL=359.7330e0c5.chunk.js.map