"use strict";(self.webpackChunkstarter_bt5=self.webpackChunkstarter_bt5||[]).push([[769],{8769:(e,t,a)=>{a.d(t,{Z:()=>S});var n=a(2791),s=a(9658),r=a(1889),i=a(4294),o=a(5527),l=a(890),d=a(8096),c=a(4925),u=a(3926),p=a(9891),m=a(7391),x=a(5289),h=a(5661),v=a(9157),j=a(7123),y=a(3400),g=a(2419),Z=a(5585),f=a(1286),b=a(7247),C=a(184);const _="http://192.168.1.10:5000",S=()=>{var e,t,a,S,k,P,T,w,B;const[N,E]=(0,n.useState)(null),[A,M]=(0,n.useState)(!1),[R,U]=(0,n.useState)(!1),[I,D]=(0,n.useState)([]),[F,L]=(0,n.useState)(!1),[W,q]=(0,n.useState)(""),[O,J]=(0,n.useState)(""),[z,G]=(0,n.useState)(!1),[H,V]=(0,n.useState)([{name:"",value:""}]),[Q,K]=(0,n.useState)([]),[X,Y]=(0,n.useState)({port:"",method:"",parity:"",baudrate:"",stopbits:"",wordLength:""}),[$,ee]=(0,n.useState)(""),[te,ae]=(0,n.useState)(""),[ne,se]=(0,n.useState)(""),[re,ie]=(0,n.useState)(""),[oe,le]=(0,n.useState)(!1),[de,ce]=(0,n.useState)(!1),[ue]=(0,n.useState)(!1),[pe,me]=(0,n.useState)(""),[xe,he]=(0,n.useState)(""),[ve,je]=(0,n.useState)(""),[ye,ge]=(0,n.useState)(""),[Ze,fe]=(0,n.useState)(""),[be,Ce]=(0,n.useState)(""),[_e,Se]=(0,n.useState)(""),[ke,Pe]=(0,n.useState)(""),[Te,we]=(0,n.useState)(""),[Be,Ne]=(0,n.useState)(""),[Ee,Ae]=(0,n.useState)({checkFrequency:{days:"",hours:"",minutes:"",seconds:""},successRetention:{days:"",hours:"",minutes:"",seconds:""},failureRetention:{days:"",hours:"",minutes:"",seconds:""}}),[Me,Re]=(0,n.useState)({minutes:"",seconds:""});if((0,n.useEffect)((()=>{setTimeout((()=>{me(""),he(""),je(""),ge(""),fe(""),Ce(""),Se(""),Pe(""),we(""),Ne("")}),5e3)}),[pe,xe,ve,ye,Ze,be,_e,ke,Te,Be]),(0,n.useEffect)((()=>{(async()=>{try{const n=await fetch("".concat(_,"/node-parameter")),s=await n.json();if(E(s),s.node_parameters){var e,t,a;const n=null===(e=s.node_parameters.find((e=>"modbus"===e.name)))||void 0===e?void 0:e.value;n&&Y(n);const r=null===(t=s.node_parameters.find((e=>"retention_parameter"===e.name)))||void 0===t?void 0:t.value;r&&Ae(r);const i=null===(a=s.node_parameters.find((e=>"time_delay"===e.name)))||void 0===a?void 0:a.value;i&&Re(i)}}catch(n){console.error("Error fetching data:",n)}})()}),[]),!N)return(0,C.jsx)("p",{children:"Loading..."});const Ue=null===(e=N.node_parameters.find((e=>"spb_parameter"===e.name)))||void 0===e?void 0:e.value,Ie=null===(t=N.node_parameters.find((e=>"node_attributes"===e.name)))||void 0===t?void 0:t.value,De=null===(a=N.node_parameters.find((e=>"mqtt"===e.name)))||void 0===a?void 0:a.value,Fe=null===(S=N.node_parameters.find((e=>"modbus"===e.name)))||void 0===S?void 0:S.value.baudrate_options,Le=null===(k=N.node_parameters.find((e=>"modbus"===e.name)))||void 0===k?void 0:k.value.wordlength_options,We=null===(P=N.node_parameters.find((e=>"modbus"===e.name)))||void 0===P?void 0:P.value.parity_options,qe=null===(T=N.node_parameters.find((e=>"modbus"===e.name)))||void 0===T?void 0:T.value.stopbits_options,Oe=null===(w=N.node_parameters.find((e=>"modbus"===e.name)))||void 0===w?void 0:w.value.port_options,Je=null===(B=N.node_parameters.find((e=>"modbus"===e.name)))||void 0===B?void 0:B.value.method_options,ze=[...new Set(Fe)],Ge=[...new Set(Le)],He=[...new Set(We)],Ve=[...new Set(qe)],Qe=[...new Set(Oe)],Ke=[...new Set(Je)],Xe=()=>{M(!1),G(!1),U(!1),L(!1)},Ye=(e,t,a)=>{const n=[...Q];n[e][t]=a,K(n)},$e=()=>{K([...Q,{name:"",value:""}])},et=(e,t)=>{D((a=>{const n=[...a];return n[e]=t,n}))},tt=e=>{let{message:t}=e;return(0,C.jsx)(s.Z,{severity:"success",children:t})},at=e=>{let{message:t}=e;return(0,C.jsx)(s.Z,{severity:"error",children:t})};return(0,C.jsxs)(r.ZP,{container:!0,spacing:1,children:[(0,C.jsxs)(r.ZP,{item:!0,xs:6,children:[Ze&&(0,C.jsx)(tt,{message:Ze,onClose:()=>fe("")}),be&&(0,C.jsx)(tt,{message:be,onClose:()=>Ce("")}),ve&&(0,C.jsx)(tt,{message:ve,onClose:()=>je("")}),xe&&(0,C.jsx)(tt,{message:xe,onClose:()=>he("")}),ye&&(0,C.jsx)(tt,{message:ye,onClose:()=>ge("")}),pe&&(0,C.jsx)(tt,{message:pe,onClose:()=>me("")}),_e&&(0,C.jsx)(tt,{message:_e,onClose:()=>Se("")}),ke&&(0,C.jsx)(tt,{message:ke,onClose:()=>Pe("")}),Te&&(0,C.jsx)(at,{message:Te,onClose:()=>we("")})]}),(0,C.jsx)(r.ZP,{item:!0,xs:6,children:(0,C.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",marginBottom:"20px"},children:[(0,C.jsx)(i.Z,{onClick:()=>{le(!0),fetch("".concat(_,"/service/restart-services"),{method:"GET",headers:{"Content-Type":"application/json"}}).then((e=>{e.ok?fe("Service is restarting."):we("Failed to restart service: ".concat(e.statusText))})).catch((e=>{we("Error restarting service: ".concat(e))})).finally((()=>{le(!1)}))},disabled:oe||ue,variant:"contained",color:"primary",children:"Restart"}),(0,C.jsx)(i.Z,{onClick:()=>{ce(!0),fetch("".concat(_,"/service/stop-services"),{method:"GET",headers:{"Content-Type":"application/json"}}).then((e=>{e.ok?Ce("Service is stopped."):we("Failed to stop service: ".concat(e.statusText))})).catch((e=>{we("Error stopping service: ".concat(e))})).finally((()=>{ce(!1)}))},disabled:de,style:{marginLeft:"10px"},variant:"contained",color:"error",children:"Stop"})]})}),(0,C.jsx)(r.ZP,{item:!0,xs:4,children:(0,C.jsxs)(o.Z,{style:{padding:"20px",marginBottom:"20px"},children:[(0,C.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between"},children:[(0,C.jsx)(l.Z,{variant:"h6",children:"Node Attributes"}),(0,C.jsxs)("div",{style:{display:"flex",gap:"0px"},children:[(0,C.jsx)(y.Z,{variant:"outlined",style:{marginRight:"0px"},onClick:()=>{const e=(null===Ie||void 0===Ie?void 0:Ie.map((e=>({name:e.name,value:e.value}))))||[];D(e),U(!0)},children:(0,C.jsx)(f.Z,{style:{fontSize:"medium"}})}),(0,C.jsx)(y.Z,{variant:"outlined",style:{marginLeft:"5px"},onClick:()=>{K([{name:"",value:""}]),G(!0)},children:(0,C.jsx)(g.Z,{style:{color:"green",fontSize:"medium"}})})]})]}),(0,C.jsx)("div",{style:{marginTop:"3px"},children:Ie&&Ie.map((e=>(0,C.jsx)("div",{children:(0,C.jsxs)(l.Z,{variant:"body1",children:[(0,C.jsxs)("strong",{children:[e.name,":"]})," ",e.value]})},e.name)))})]})}),(0,C.jsx)(r.ZP,{item:!0,xs:4,children:(0,C.jsxs)(o.Z,{style:{padding:"20px",marginBottom:"20px"},children:[(0,C.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between"},children:[(0,C.jsx)(l.Z,{variant:"h6",children:"SPB Parameter"}),(0,C.jsx)(y.Z,{variant:"outlined",style:{marginLeft:"10px"},onClick:()=>{ee((null===Ue||void 0===Ue?void 0:Ue.edge_node_id)||""),ae((null===Ue||void 0===Ue?void 0:Ue.group_id)||""),M(!0)},children:(0,C.jsx)(f.Z,{style:{fontSize:"medium"}})})]}),(0,C.jsxs)("div",{children:[(0,C.jsx)("strong",{children:"Edge Node Id:"})," ",null===Ue||void 0===Ue?void 0:Ue.edge_node_id]}),(0,C.jsxs)("div",{children:[(0,C.jsx)("strong",{children:"Group Id:"})," ",null===Ue||void 0===Ue?void 0:Ue.group_id]})]})}),(0,C.jsx)(r.ZP,{item:!0,xs:4,children:(0,C.jsxs)(o.Z,{style:{padding:"20px",marginBottom:"20px"},children:[(0,C.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between"},children:[(0,C.jsx)(l.Z,{variant:"h6",children:"MQTT"}),(0,C.jsx)(y.Z,{variant:"outlined",style:{marginLeft:"10px"},onClick:()=>{se((null===De||void 0===De?void 0:De.broker_host)||""),ie((null===De||void 0===De?void 0:De.broker_port)||""),L(!0)},children:(0,C.jsx)(f.Z,{style:{fontSize:"medium"}})})]}),(0,C.jsxs)("div",{children:[(0,C.jsx)("strong",{children:"Broker Host:"})," ",null===De||void 0===De?void 0:De.broker_host]}),(0,C.jsxs)("div",{children:[(0,C.jsx)("strong",{children:"Broker Port:"})," ",null===De||void 0===De?void 0:De.broker_port]})]})}),(0,C.jsx)(r.ZP,{item:!0,xs:12,children:(0,C.jsxs)(o.Z,{style:{padding:"20px",marginBottom:"20px"},children:[(0,C.jsx)(l.Z,{variant:"h6",children:"Modbus Parameters"}),(0,C.jsx)("div",{style:{display:"flex",flexDirection:"row",marginTop:"10px"},children:["Port","Method","Parity","Baudrate","Stopbits","WordLength"].map(((e,t)=>(0,C.jsx)("div",{style:{marginRight:"20px",width:"Method"===e?"150px":"120px"},children:(0,C.jsxs)(d.Z,{fullWidth:!0,children:[(0,C.jsx)(c.Z,{children:e}),(0,C.jsxs)(u.Z,{value:X[e.toLowerCase()],onChange:t=>(async(e,t)=>{try{const a=await fetch("".concat(_,"/node-parameter/1"),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({modbus:{...X,[e]:t}})});a.ok?(me("Modbus updated successfully."),Y((a=>({...a,[e]:t})))):we("Failed to update Modbus: ".concat(a.statusText))}catch(a){we("Error updating Modbus: ".concat(a))}})(e.toLowerCase(),t.target.value),children:["Baudrate"===e&&ze.map((e=>(0,C.jsx)(p.Z,{value:e,children:e},e))),"WordLength"===e&&Ge.map((e=>(0,C.jsx)(p.Z,{value:e,children:e},e))),"Parity"===e&&He.map((e=>(0,C.jsx)(p.Z,{value:e,children:e},e))),"Stopbits"===e&&Ve.map((e=>(0,C.jsx)(p.Z,{value:e,children:e},e))),"Port"===e&&Qe.map((e=>(0,C.jsx)(p.Z,{value:e,children:e},e))),"Method"===e&&Ke.map((e=>(0,C.jsx)(p.Z,{value:e,children:e},e)))]})]})},t)))})]})}),(0,C.jsx)(r.ZP,{item:!0,xs:4,children:(0,C.jsxs)(o.Z,{style:{padding:"20px",marginBottom:"20px"},children:[(0,C.jsx)(l.Z,{variant:"h6",children:"Retention Parameters"}),(0,C.jsxs)("form",{children:[["check_frequency","success_retention","failure_retention"].map(((e,t)=>(0,C.jsxs)("div",{style:{marginBottom:"20px"},children:[(0,C.jsx)(l.Z,{variant:"subtitle1",children:e.replace("_"," ")}),(0,C.jsx)("div",{style:{display:"flex",flexDirection:"row"},children:["days","hours","minutes","seconds"].map(((t,a)=>(0,C.jsx)(m.Z,{label:t.charAt(0).toUpperCase()+t.slice(1),type:"number",value:Ee[e][t],onChange:a=>((e,t,a)=>{const n=parseInt(a,10);isNaN(n)||Ae((a=>({...a,[e]:{...a[e],[t]:n}})))})(e,t,a.target.value),fullWidth:!0,style:{marginRight:"10px"}},a)))})]},t))),(0,C.jsx)(i.Z,{onClick:async()=>{try{const e=await fetch("".concat(_,"/node-parameter/5"),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({retention_parameter:Ee})});e.ok?Se("Retention Parameters updated successfully."):we("Failed to update Retention Parameters: ".concat(e.statusText))}catch(e){we("Error updating Retention Parameters: ".concat(e))}},color:"primary",children:"Submit"})]})]})}),(0,C.jsx)(r.ZP,{item:!0,xs:4,children:(0,C.jsxs)(o.Z,{style:{padding:"20px",marginBottom:"20px"},children:[(0,C.jsx)(l.Z,{variant:"h6",children:"Time Delay Parameters"}),(0,C.jsxs)("div",{style:{display:"flex",flexDirection:"row",marginTop:"10px"},children:[(0,C.jsx)(m.Z,{label:"Minutes",type:"number",value:Me.minutes,onChange:e=>Re((t=>({...t,minutes:parseInt(e.target.value)||0}))),fullWidth:!0,style:{marginRight:"20px"}}),(0,C.jsx)(m.Z,{label:"Seconds",type:"number",value:Me.seconds,onChange:e=>Re((t=>({...t,seconds:parseInt(e.target.value)||0}))),fullWidth:!0})]}),(0,C.jsx)(i.Z,{onClick:async()=>{try{const e=await fetch("".concat(_,"/node-parameter/6"),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({time_delay:Me})});e.ok?Pe("Time Delay updated successfully."):we("Failed to update Time Delay: ".concat(e.statusText))}catch(e){we("Error updating Time Delay: ".concat(e))}},color:"primary",children:"Submit"})]})}),(0,C.jsxs)(x.Z,{open:A,onClose:Xe,children:[(0,C.jsx)(h.Z,{children:"Update SPB Parameter"}),(0,C.jsxs)(v.Z,{children:[(0,C.jsx)(m.Z,{label:"Edge Node ID",value:$,onChange:e=>ee(e.target.value),fullWidth:!0,style:{marginBottom:"16px",marginTop:"5px"}}),(0,C.jsx)(m.Z,{label:"Group ID",value:te,onChange:e=>ae(e.target.value),fullWidth:!0})]}),(0,C.jsxs)(j.Z,{children:[(0,C.jsx)(i.Z,{onClick:Xe,children:"Cancel"}),(0,C.jsx)(i.Z,{onClick:async()=>{const e={spb_parameter:{edge_node_id:$,group_id:te}};try{const t=await fetch("".concat(_,"/node-parameter/3"),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});t.ok?(he("SPB Parameter updated successfully."),E((e=>({...e,node_parameters:e.node_parameters.map((e=>"spb_parameter"===e.name?{...e,value:{edge_node_id:$,group_id:te}}:e))})))):we("Failed to update SPB Parameter: ".concat(t.statusText))}catch(t){we("Error updating SPB Parameter: ".concat(t))}Xe()},color:"primary",children:"Update"})]})]}),(0,C.jsxs)(x.Z,{open:R,onClose:Xe,children:[(0,C.jsx)(h.Z,{children:"Edit Node Attribute"}),(0,C.jsx)(v.Z,{children:I.map(((e,t)=>(0,C.jsxs)("div",{style:{display:"flex",flexDirection:"row",marginBottom:"10px"},children:[(0,C.jsx)(m.Z,{label:"Attribute Name",value:e.name,onChange:a=>et(t,{...e,name:a.target.value}),style:{marginRight:"10px",marginTop:"5px"}}),(0,C.jsx)(m.Z,{label:"Attribute Value",value:e.value,onChange:a=>et(t,{...e,value:a.target.value}),style:{marginTop:"5px"}}),(0,C.jsx)(y.Z,{onClick:()=>(e=>{const t=[...I];t.splice(e,1),D(t)})(t),children:(0,C.jsx)(b.Z,{style:{color:"black",fontSize:"medium"}})})]},t)))}),(0,C.jsxs)(j.Z,{children:[(0,C.jsx)(i.Z,{onClick:Xe,children:"Cancel"}),(0,C.jsx)(i.Z,{onClick:async()=>{E((e=>{const t=e.node_parameters.map((e=>"node_attributes"===e.name?{...e,value:I.map((e=>({name:e.name,value:e.value})))}:e));return{...e,node_parameters:t}}));const e={node_attributes:I.map((e=>({name:e.name,value:e.value})))};try{const t=await fetch("".concat(_,"/node-parameter/4"),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});t.ok?je("Node Attribute updated successfully."):we("Failed to update Node Attribute: ".concat(t.statusText))}catch(t){we("Error updating Node Attribute:  ".concat(t))}Xe()},color:"primary",children:"Update"})]})]}),(0,C.jsxs)(x.Z,{open:z,onClose:Xe,children:[(0,C.jsx)(h.Z,{children:"Add Node Attribute"}),(0,C.jsx)(v.Z,{children:Q.map(((e,t)=>(0,C.jsxs)(r.ZP,{container:!0,spacing:2,alignItems:"center",style:{marginBottom:"8px"},children:[(0,C.jsx)(r.ZP,{item:!0,xs:4,children:(0,C.jsx)(m.Z,{label:"Attribute Name",value:e.name,style:{marginTop:"5px"},onChange:e=>Ye(t,"name",e.target.value)})}),(0,C.jsx)(r.ZP,{item:!0,xs:4,children:(0,C.jsx)(m.Z,{label:"Attribute Value",value:e.value,style:{marginTop:"5px"},onChange:e=>Ye(t,"value",e.target.value)})}),(0,C.jsx)(r.ZP,{item:!0,xs:2,children:t>0&&(0,C.jsx)(y.Z,{onClick:()=>{return e=t,void K((t=>t.filter(((t,a)=>a!==e))));var e},children:(0,C.jsx)(Z.Z,{style:{color:"red"}})})}),(0,C.jsx)(r.ZP,{item:!0,xs:2,children:t===Q.length-1&&(0,C.jsx)(y.Z,{onClick:$e,children:(0,C.jsx)(g.Z,{style:{color:"green"}})})})]},t)))}),(0,C.jsxs)(j.Z,{children:[(0,C.jsx)(i.Z,{onClick:Xe,children:"Cancel"}),(0,C.jsx)(i.Z,{onClick:async()=>{try{const e=Q.map((e=>({name:e.name,value:e.value}))),t=await fetch("".concat(_,"/node-parameter/"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:"node_attributes",value:e})});t.ok?(je("Node Attributes added successfully."),E((t=>({...t,node_parameters:t.node_parameters.map((t=>"node_attributes"===t.name?{...t,value:[...t.value||[],...e]}:t))}))),K([])):we("Failed to add Node Attributes: ".concat(t.statusText))}catch(e){we("Error adding Node Attributes: ".concat(e))}Xe()},color:"primary",children:"Add"})]})]}),(0,C.jsxs)(x.Z,{open:F,onClose:Xe,children:[(0,C.jsx)(h.Z,{children:"Update Mqtt"}),(0,C.jsxs)(v.Z,{children:[(0,C.jsx)(m.Z,{label:"Broker Host",value:ne,onChange:e=>se(e.target.value),fullWidth:!0,style:{marginBottom:"16px",marginTop:"5px"}}),(0,C.jsx)(m.Z,{label:"Broker Port",value:re,onChange:e=>ie(e.target.value),fullWidth:!0})]}),(0,C.jsxs)(j.Z,{children:[(0,C.jsx)(i.Z,{onClick:Xe,children:"Cancel"}),(0,C.jsx)(i.Z,{onClick:async()=>{const e={mqtt:{broker_host:ne,broker_port:re}};try{const t=await fetch("".concat(_,"/node-parameter/2"),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});t.ok?(ge("Mqtt updated successfully."),E((e=>({...e,node_parameters:e.node_parameters.map((e=>"mqtt"===e.name?{...e,value:{broker_host:ne,broker_port:re}}:e))})))):we("Failed to update Mqtt: ".concat(t.statusText))}catch(t){we("Error updating Mqtt: ".concat(t))}Xe()},color:"primary",children:"Update"})]})]})]})}}}]);
//# sourceMappingURL=769.041a137f.chunk.js.map