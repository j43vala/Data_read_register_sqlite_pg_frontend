"use strict";(self.webpackChunkstarter_bt5=self.webpackChunkstarter_bt5||[]).push([[359],{1359:(e,t,a)=>{a.d(t,{Z:()=>S});var s=a(2791),n=a(9658),o=a(1889),r=a(4294),i=a(5527),l=a(890),d=a(8096),c=a(4925),u=a(3926),p=a(9891),m=a(5289),x=a(5661),h=a(9157),v=a(7391),g=a(7123),j=a(3400),y=a(6189),b=a(184);const Z=(0,y.Z)((0,b.jsx)("path",{d:"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"}),"Edit"),_=(0,y.Z)((0,b.jsx)("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"}),"Delete"),f=(0,y.Z)((0,b.jsx)("path",{d:"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"}),"Add"),C=(0,y.Z)((0,b.jsx)("path",{d:"M19 13H5v-2h14v2z"}),"Remove"),S=()=>{var e,t,a,y,S,k,T,P,w;const[B,N]=(0,s.useState)(null),[A,M]=(0,s.useState)(!1),[q,E]=(0,s.useState)(!1),[I,D]=(0,s.useState)([]),[L,R]=(0,s.useState)(!1),[U,z]=(0,s.useState)(!1),[F,V]=(0,s.useState)([]),[H,O]=(0,s.useState)({port:"",method:"",parity:"",baudrate:"",stopbits:"",wordLength:""}),[J,W]=(0,s.useState)(""),[G,Q]=(0,s.useState)(""),[K,X]=(0,s.useState)(""),[Y,$]=(0,s.useState)(""),[ee,te]=(0,s.useState)(""),[ae,se]=(0,s.useState)(""),[ne,oe]=(0,s.useState)(""),[re,ie]=(0,s.useState)(""),[le,de]=(0,s.useState)([]),[ce,ue]=(0,s.useState)(!1),[pe,me]=(0,s.useState)(!1),[xe]=(0,s.useState)(!1),[he,ve]=(0,s.useState)(""),[ge,je]=(0,s.useState)(""),[ye,be]=(0,s.useState)(""),[Ze,_e]=(0,s.useState)(""),[fe,Ce]=(0,s.useState)(""),[Se,ke]=(0,s.useState)(""),[Te,Pe]=(0,s.useState)(""),[we,Be]=(0,s.useState)("");if((0,s.useEffect)((()=>{setTimeout((()=>{ve(""),je(""),be(""),_e(""),Ce(""),ke(""),Pe(""),Be("")}),5e3)}),[he,ge,ye,Ze,fe,Se,Te,we]),(0,s.useEffect)((()=>{(async()=>{try{const a=await fetch("/node-parameter/"),s=await a.json();if(N(s),s.node_parameters){var e,t;const a=null===(e=s.node_parameters.find((e=>"modbus"===e.name)))||void 0===e?void 0:e.value;a&&O(a);const n=null===(t=s.node_parameters.find((e=>"mqtt"===e.name)))||void 0===t?void 0:t.value;n&&de(n.qos_options||[])}}catch(a){console.error("Error fetching data:",a)}})()}),[]),!B)return(0,b.jsx)("p",{children:"Loading..."});const Ne=null===(e=B.node_parameters.find((e=>"spb_parameter"===e.name)))||void 0===e?void 0:e.value,Ae=null===(t=B.node_parameters.find((e=>"node_attributes"===e.name)))||void 0===t?void 0:t.value,Me=null===(a=B.node_parameters.find((e=>"mqtt"===e.name)))||void 0===a?void 0:a.value,qe=[...new Set(null===(y=B.node_parameters.find((e=>"modbus"===e.name)))||void 0===y?void 0:y.value.baudrate_options)],Ee=[...new Set(null===(S=B.node_parameters.find((e=>"modbus"===e.name)))||void 0===S?void 0:S.value.wordlength_options)],Ie=[...new Set(null===(k=B.node_parameters.find((e=>"modbus"===e.name)))||void 0===k?void 0:k.value.parity_options)],De=[...new Set(null===(T=B.node_parameters.find((e=>"modbus"===e.name)))||void 0===T?void 0:T.value.stopbits_options)],Le=[...new Set(null===(P=B.node_parameters.find((e=>"modbus"===e.name)))||void 0===P?void 0:P.value.port_options)],Re=[...new Set(null===(w=B.node_parameters.find((e=>"modbus"===e.name)))||void 0===w?void 0:w.value.method_options)],Ue=()=>{M(!1),z(!1),E(!1),R(!1)},ze=(e,t,a)=>{const s=[...F];s[e][t]=a,V(s)},Fe=()=>{V((e=>[...e,{name:"",value:""}])),D((e=>[...e,{name:"",value:""}]))},Ve=(e,t)=>{D((a=>{const s=[...a];return s[e]=t,s}))},He=e=>{let{message:t}=e;return(0,b.jsx)(n.Z,{severity:"success",children:t})},Oe=e=>{let{message:t}=e;return(0,b.jsx)(n.Z,{severity:"error",children:t})};return(0,b.jsxs)(o.ZP,{container:!0,spacing:1,children:[(0,b.jsxs)(o.ZP,{item:!0,xs:6,children:[fe&&(0,b.jsx)(He,{message:fe,onClose:()=>Ce("")}),Se&&(0,b.jsx)(He,{message:Se,onClose:()=>ke("")}),ye&&(0,b.jsx)(He,{message:ye,onClose:()=>be("")}),ge&&(0,b.jsx)(He,{message:ge,onClose:()=>je("")}),Ze&&(0,b.jsx)(He,{message:Ze,onClose:()=>_e("")}),he&&(0,b.jsx)(He,{message:he,onClose:()=>ve("")}),Te&&(0,b.jsx)(Oe,{message:Te,onClose:()=>Pe("")})]}),(0,b.jsx)(o.ZP,{item:!0,xs:6,children:(0,b.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",marginBottom:"20px"},children:[(0,b.jsx)(r.Z,{onClick:()=>{ue(!0),fetch("/service/restart-services",{method:"GET",headers:{"Content-Type":"application/json"}}).then((e=>{e.ok?Ce("Service is restarting."):Pe("Failed to restart service: ".concat(e.statusText))})).catch((e=>{Pe("Error restarting service: ".concat(e))})).finally((()=>{ue(!1)}))},disabled:ce||xe,variant:"contained",color:"primary",children:"Restart"}),(0,b.jsx)(r.Z,{onClick:()=>{me(!0),fetch("/service/stop-services",{method:"GET",headers:{"Content-Type":"application/json"}}).then((e=>{e.ok?ke("Service is stopped."):Pe("Failed to stop service: ".concat(e.statusText))})).catch((e=>{Pe("Error stopping service: ".concat(e))})).finally((()=>{me(!1)}))},disabled:pe,style:{marginLeft:"10px"},variant:"contained",color:"error",children:"Stop"})]})}),(0,b.jsx)(o.ZP,{item:!0,xs:8,children:(0,b.jsxs)(i.Z,{style:{padding:"20px",marginBottom:"20px"},children:[(0,b.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between"},children:[(0,b.jsx)(l.Z,{variant:"h6",children:"Node Attributes"}),(0,b.jsx)("div",{style:{display:"flex",gap:"0px"},children:(0,b.jsx)(j.Z,{variant:"outlined",style:{marginRight:"0px"},onClick:()=>{const e=(null===Ae||void 0===Ae?void 0:Ae.map((e=>({name:e.name,value:e.value}))))||[];D(e),W((null===Ne||void 0===Ne?void 0:Ne.edge_node_id)||""),Q((null===Ne||void 0===Ne?void 0:Ne.group_id)||""),E(!0)},children:(0,b.jsx)(Z,{style:{fontSize:"medium"}})})})]}),(0,b.jsxs)("div",{style:{marginTop:"3px"},children:[(0,b.jsxs)("div",{children:[(0,b.jsx)("strong",{children:"Node Id:"})," ",null===Ne||void 0===Ne?void 0:Ne.edge_node_id]}),(0,b.jsxs)("div",{children:[(0,b.jsx)("strong",{children:"Group Id:"})," ",null===Ne||void 0===Ne?void 0:Ne.group_id]}),Ae&&Ae.map((e=>(0,b.jsx)("div",{children:(0,b.jsxs)(l.Z,{variant:"body1",children:[(0,b.jsxs)("strong",{children:[e.name,":"]})," ",e.value]})},e.name)))]})]})}),(0,b.jsx)(o.ZP,{item:!0,xs:4,children:(0,b.jsxs)(i.Z,{style:{padding:"20px",marginBottom:"20px"},children:[(0,b.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between"},children:[(0,b.jsx)(l.Z,{variant:"h6",children:"MQTT"}),(0,b.jsx)(j.Z,{variant:"outlined",style:{marginLeft:"10px"},onClick:()=>{$((null===Me||void 0===Me?void 0:Me.broker_host)||""),te((null===Me||void 0===Me?void 0:Me.broker_port)||""),ie((null===Me||void 0===Me?void 0:Me.qos)||""),se((null===Me||void 0===Me?void 0:Me.user)||""),oe((null===Me||void 0===Me?void 0:Me.password)||""),R(!0),de((null===Me||void 0===Me?void 0:Me.qos_options)||[])},children:(0,b.jsx)(Z,{style:{fontSize:"medium"}})})]}),(0,b.jsxs)("div",{children:[(0,b.jsx)("strong",{children:"Broker Host:"})," ",null===Me||void 0===Me?void 0:Me.broker_host]}),(0,b.jsx)("div",{style:{display:"flex",alignItems:"center"},children:(0,b.jsxs)("div",{style:{marginRight:"60px"},children:[(0,b.jsx)("strong",{children:"Broker Port:"})," ",null===Me||void 0===Me?void 0:Me.broker_port]})}),(0,b.jsxs)("div",{children:[(0,b.jsx)("strong",{children:"Client ID:"})," ",null===Me||void 0===Me?void 0:Me.user]}),(0,b.jsxs)("div",{children:[(0,b.jsx)("strong",{children:"Client Password:"})," ",null===Me||void 0===Me?void 0:Me.password]})]})}),(0,b.jsx)(o.ZP,{item:!0,xs:12,children:(0,b.jsxs)(i.Z,{style:{padding:"20px",marginBottom:"20px"},children:[(0,b.jsx)(l.Z,{variant:"h6",children:"Modbus Parameters"}),(0,b.jsx)("div",{style:{display:"flex",flexDirection:"row",marginTop:"10px"},children:["Port","Method","Parity","Baudrate","Stopbits","WordLength"].map(((e,t)=>(0,b.jsx)("div",{style:{marginRight:"20px",width:"Method"===e?"150px":"120px"},children:(0,b.jsxs)(d.Z,{fullWidth:!0,children:[(0,b.jsx)(c.Z,{children:e}),(0,b.jsxs)(u.Z,{value:H[e.toLowerCase()],onChange:t=>(async(e,t)=>{try{const a=await fetch("/node-parameter/1",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({modbus:{...H,[e]:t}})});a.ok?(ve("Modbus updated successfully."),O((a=>({...a,[e]:t})))):Pe("Failed to update Modbus: ".concat(a.statusText))}catch(a){Pe("Error updating Modbus: ".concat(a))}})(e.toLowerCase(),t.target.value),children:["Baudrate"===e&&qe.map((e=>(0,b.jsx)(p.Z,{value:e,children:e},e))),"WordLength"===e&&Ee.map((e=>(0,b.jsx)(p.Z,{value:e,children:e},e))),"Parity"===e&&Ie.map((e=>(0,b.jsx)(p.Z,{value:e,children:e},e))),"Stopbits"===e&&De.map((e=>(0,b.jsx)(p.Z,{value:e,children:e},e))),"Port"===e&&Le.map((e=>(0,b.jsx)(p.Z,{value:e,children:e},e))),"Method"===e&&Re.map((e=>(0,b.jsx)(p.Z,{value:e,children:e},e)))]})]})},t)))})]})}),(0,b.jsxs)(m.Z,{open:A,onClose:Ue,children:[(0,b.jsx)(x.Z,{children:"Update SPB Parameter"}),(0,b.jsxs)(h.Z,{children:[(0,b.jsx)(v.Z,{label:"Edge Node ID",value:J,onChange:e=>W(e.target.value),fullWidth:!0,style:{marginBottom:"16px",marginTop:"5px"}}),(0,b.jsx)(v.Z,{label:"Group ID",value:G,onChange:e=>Q(e.target.value),fullWidth:!0,style:{marginBottom:"16px",marginTop:"5px"}}),(0,b.jsx)(v.Z,{label:"Host Name",value:K,onChange:e=>X(e.target.value),fullWidth:!0})]}),(0,b.jsxs)(g.Z,{children:[(0,b.jsx)(r.Z,{onClick:Ue,children:"Cancel"}),(0,b.jsx)(r.Z,{onClick:async()=>{const e={spb_parameter:{edge_node_id:J,group_id:G,hostname:K}};try{const t=await fetch("/node-parameter/3",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});t.ok?N((e=>({...e,node_parameters:e.node_parameters.map((e=>"spb_parameter"===e.name?{...e,value:{edge_node_id:J,group_id:G,hostname:K}}:e))}))):Pe("Failed to update SPB Parameter: ".concat(t.statusText))}catch(t){Pe("Error updating SPB Parameter: ".concat(t))}Ue()},color:"primary",children:"Update"})]})]}),(0,b.jsxs)(m.Z,{open:q,onClose:Ue,children:[(0,b.jsx)(x.Z,{children:"Edit Node Attribute"}),(0,b.jsxs)(h.Z,{children:[(0,b.jsxs)("div",{style:{display:"flex",flexDirection:"row",marginBottom:"16px"},children:[(0,b.jsx)(v.Z,{label:"Attribute Name",value:"Node ID",style:{marginRight:"10px",marginTop:"10px"}}),(0,b.jsx)(v.Z,{label:"Attribute Value",value:J,onChange:e=>W(e.target.value),style:{marginTop:"10px"}})]}),(0,b.jsxs)("div",{style:{display:"flex",flexDirection:"row",marginBottom:"16px"},children:[(0,b.jsx)(v.Z,{label:"Attribute Name",value:"Group ID",style:{marginRight:"10px",marginTop:"10px"}}),(0,b.jsx)(v.Z,{label:"Attribute Value",value:G,onChange:e=>Q(e.target.value),style:{marginTop:"10px"}})]}),I.map(((e,t)=>(0,b.jsxs)("div",{style:{display:"flex",flexDirection:"row",marginBottom:"10px"},children:[(0,b.jsx)(v.Z,{label:"Attribute Name",value:e.name,onChange:a=>Ve(t,{...e,name:a.target.value}),style:{marginRight:"10px"}}),(0,b.jsx)(v.Z,{label:"Attribute Value",value:e.value,onChange:a=>Ve(t,{...e,value:a.target.value})}),(0,b.jsx)(j.Z,{onClick:()=>(e=>{const t=[...I];t.splice(e,1),D(t)})(t),children:(0,b.jsx)(_,{style:{color:"black",fontSize:"medium"}})})]},t)))]}),(0,b.jsxs)(g.Z,{children:[(0,b.jsx)(o.ZP,{item:!0,xs:2,children:(0,b.jsx)(j.Z,{onClick:Fe,children:(0,b.jsx)(f,{style:{color:"green"}})})}),(0,b.jsx)(r.Z,{onClick:Ue,children:"Cancel"}),(0,b.jsx)(r.Z,{onClick:async()=>{const e={spb_parameter:{edge_node_id:J,group_id:G,hostname:K}},t={node_attributes:I.map((e=>({name:e.name,value:e.value})))};try{const a=await fetch("/node-parameter/3",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});a.ok?N((e=>({...e,node_parameters:e.node_parameters.map((e=>"spb_parameter"===e.name?{...e,value:{edge_node_id:J,group_id:G,hostname:K}}:e))}))):Pe("Failed to update SPB Parameter: ".concat(a.statusText));const s=await fetch("/node-parameter/4",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});s.ok?(be("Node Attribute updated successfully."),N((e=>{const t=e.node_parameters.map((e=>"node_attributes"===e.name?{...e,value:I.map((e=>({name:e.name,value:e.value})))}:e));return{...e,node_parameters:t}}))):Pe("Failed to update Node Attribute: ".concat(s.statusText))}catch(a){Pe("Error updating parameters: ".concat(a))}Ue()},color:"primary",children:"Update"})]})]}),(0,b.jsxs)(m.Z,{open:U,onClose:Ue,children:[(0,b.jsx)(x.Z,{children:"Add Node Attribute"}),(0,b.jsx)(h.Z,{children:F.map(((e,t)=>(0,b.jsxs)(o.ZP,{container:!0,spacing:2,alignItems:"center",style:{marginBottom:"8px"},children:[(0,b.jsx)(o.ZP,{item:!0,xs:4,children:(0,b.jsx)(v.Z,{label:"Attribute Name",value:e.name,style:{marginTop:"5px"},onChange:e=>ze(t,"name",e.target.value)})}),(0,b.jsx)(o.ZP,{item:!0,xs:4,children:(0,b.jsx)(v.Z,{label:"Attribute Value",value:e.value,style:{marginTop:"5px"},onChange:e=>ze(t,"value",e.target.value)})}),(0,b.jsx)(o.ZP,{item:!0,xs:2,children:t>0&&(0,b.jsx)(j.Z,{onClick:()=>{return e=t,void V((t=>t.filter(((t,a)=>a!==e))));var e},children:(0,b.jsx)(C,{style:{color:"red"}})})}),(0,b.jsx)(o.ZP,{item:!0,xs:2,children:t===F.length-1&&(0,b.jsx)(j.Z,{onClick:Fe,children:(0,b.jsx)(f,{style:{color:"green"}})})})]},t)))}),(0,b.jsxs)(g.Z,{children:[(0,b.jsx)(r.Z,{onClick:Ue,children:"Cancel"}),(0,b.jsx)(r.Z,{onClick:async()=>{try{const e=F.map((e=>({name:e.name,value:e.value}))),t=await fetch("/node-parameter/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:"node_attributes",value:e})});t.ok?(be("Node Attributes added successfully."),N((t=>({...t,node_parameters:t.node_parameters.map((t=>"node_attributes"===t.name?{...t,value:[...t.value||[],...e]}:t))}))),V([])):Pe("Failed to add Node Attributes: ".concat(t.statusText))}catch(e){Pe("Error adding Node Attributes: ".concat(e))}Ue()},color:"primary",children:"Add"})]})]}),(0,b.jsxs)(m.Z,{open:L,onClose:Ue,children:[(0,b.jsx)(x.Z,{children:"Update Mqtt"}),(0,b.jsxs)(h.Z,{children:[(0,b.jsx)(v.Z,{label:"Broker Host",value:Y,onChange:e=>$(e.target.value),style:{marginBottom:"16px",marginTop:"5px",marginRight:"10px"}}),(0,b.jsx)(v.Z,{label:"Broker Port",value:ee,style:{marginBottom:"16px",marginTop:"5px"},onChange:e=>te(e.target.value)}),(0,b.jsx)(v.Z,{label:"Client ID",value:ae,onChange:e=>se(e.target.value),style:{marginBottom:"16px",marginRight:"10px"}}),(0,b.jsx)(v.Z,{label:"Client Password",value:ne,onChange:e=>oe(e.target.value)})]}),(0,b.jsxs)(g.Z,{children:[(0,b.jsx)(r.Z,{onClick:Ue,children:"Cancel"}),(0,b.jsx)(r.Z,{onClick:async()=>{const e={mqtt:{broker_host:Y,broker_port:ee,user:ae,password:ne,qos:re,qos_options:le}};try{const t=await fetch("/node-parameter/2",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});if(t.ok){const e=await t.json();_e("Mqtt updated successfully"),N((t=>({...t,node_parameters:t.node_parameters.map((t=>"mqtt"===t.name?{...t,value:{broker_host:Y,broker_port:ee,user:ae,password:ne,qos:re,qos_options:e.qos_options||[]}}:t))}))),de(e.qos_options||[])}else Pe("Failed to update Mqtt: ".concat(t.statusText))}catch(t){Pe("Error updating Mqtt: ".concat(t))}Ue()},color:"primary",children:"Update"})]})]})]})}}}]);
//# sourceMappingURL=359.9b2b9bef.chunk.js.map