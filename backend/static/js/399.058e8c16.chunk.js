"use strict";(self.webpackChunkstarter_bt5=self.webpackChunkstarter_bt5||[]).push([[399],{2399:(e,t,a)=>{a.d(t,{Z:()=>N});var r=a(2791),n=a(9658),s=a(1889),i=a(4294),l=a(9281),c=a(5527),o=a(9836),d=a(6890),h=a(5855),u=a(3994),x=a(3382),g=a(6125),m=a(5661),j=a(5289),v=a(9157),p=a(8096),Z=a(4925),y=a(3926),f=a(9891),C=a(7391),b=a(7123),P=a(3400),S=a(2419),A=a(5585),T=a(7247),k=a(1286),_=a(7755),w=a(5678),E=a(5172),I=a(184);const D=(0,_.Z)((e=>({root:{padding:e.spacing(2)},header:{display:"flex",alignItems:"center",marginBottom:e.spacing(2)},headerText:{fontFamily:"Arial, sans-serif",fontSize:"18px",fontWeight:"bold",color:"#333",marginRight:e.spacing(2)},buttonGroup:{marginLeft:"auto",display:"flex",alignItems:"center"},addButton:{marginRight:e.spacing(2),backgroundColor:e.palette.success.main,color:"#fff","&:hover":{backgroundColor:e.palette.success.dark}},deleteButton:{color:e.palette.error.main}}))),N=()=>{const e=D(),[t,a]=(0,r.useState)([]),[_,N]=(0,r.useState)(""),[R,F]=(0,r.useState)([]),[O,W]=(0,r.useState)([]),[M,U]=(0,r.useState)(null),[z,B]=(0,r.useState)(!1),[J,V]=(0,r.useState)(""),[H,L]=(0,r.useState)(""),[q,G]=(0,r.useState)(""),[K,$]=(0,r.useState)(""),[Q,X]=(0,r.useState)(""),[Y,ee]=(0,r.useState)(""),[te,ae]=(0,r.useState)(""),[re,ne]=(0,r.useState)(""),[se,ie]=(0,r.useState)(""),[le,ce]=(0,r.useState)(""),[oe,de]=(0,r.useState)(""),[he,ue]=(0,r.useState)(""),[xe,ge]=(0,r.useState)(""),[me,je]=(0,r.useState)(""),[ve,pe]=(0,r.useState)(""),[Ze,ye]=(0,r.useState)(!1),[fe,Ce]=(0,r.useState)(!1),[be,Pe]=(0,r.useState)(!1),[Se,Ae]=(0,r.useState)(null),[Te,ke]=(0,r.useState)(null),[_e,we]=(0,r.useState)(!1),[Ee,Ie]=(0,r.useState)(!1),[De,Ne]=(0,r.useState)(""),[Re,Fe]=(0,r.useState)(""),[Oe,We]=(0,r.useState)(!1),[Me,Ue]=(0,r.useState)(""),[ze,Be]=(0,r.useState)(""),[Je,Ve]=(0,r.useState)(!1),[He,Le]=(0,r.useState)([{function_code:"",address:"",ParameterName:"",data_type:"",threshold:"",aggregation_type:""}]),[qe,Ge]=(0,r.useState)([{name:"",value:""}]),[Ke,$e]=(0,r.useState)(null),[Qe,Xe]=(0,r.useState)(!1),[Ye,et]=(0,r.useState)([]),[tt,at]=(0,r.useState)(null),[rt,nt]=(0,r.useState)(""),[st,it]=(0,r.useState)(""),[lt,ct]=(0,r.useState)("");(0,r.useEffect)((()=>{setTimeout((()=>{de(""),ue(""),ge(""),je(""),pe("")}),5e3)}),[oe,he,xe,me,ve]),(0,r.useEffect)((()=>{(async()=>{try{const e=await fetch("/devices/"),t=await e.json();Array.isArray(t.devices)?a(t.devices):je("No Devices Available.!")}catch(e){je("Error fetching devices: ".concat(e))}})()}),[]);const ot=async e=>{try{console.log("Fetching device details for deviceId:",e);const t=await fetch("/devices/".concat(encodeURIComponent(e))),a=await t.json();at((t=>t===e?null:e)),a.device&&Array.isArray(a.device.parameters)?a.device.parameters.length>0?(F(a.device.parameters),pe(""),je("")):(F([]),W([])):(F([]),je("Error fetching Parameters and Attributes or no Parameters and Attributes connected to the selected device")),N(e),a.device&&(Ne(a.device.name),Fe(a.device.slave_id),W(a.device.attributes))}catch(t){console.error("Error fetching Device details:",t),je("Error fetching Device details. Please try again.")}},dt=e=>{const t=e.target.value;ot(t)},ht=()=>{B(!1),V(""),L(""),G(""),$(""),X(""),ee("")},ut=()=>{We(!1)},xt=()=>{Ve(!1)},gt=()=>{we(!1)},mt=()=>{ie(""),ce(""),nt(""),it(""),ct("")},jt=()=>{Ce(!0)},vt=()=>{ye(!1),mt()},pt=()=>{Ce(!1),Le([{function_code:"",address:"",ParameterName:"",data_type:"",threshold:"",aggregation_type:""}]),Zt()},Zt=()=>{Le([{function_code:"",address:"",ParameterName:"",data_type:"",threshold:"",aggregation_type:""}])},yt=()=>{B(!1),V(""),L(""),G(""),$(""),X(""),ee("")},ft=(e,t,a)=>{(/^\d*\.?\d*$/.test(a)||""===a)&&Ct(e,t,a)},Ct=(e,t,a)=>{const r=[...He];r[e][t]=a,Le(r)},bt=()=>{Ge([{name:"",value:""}])},Pt=()=>{Pe(!1),Ge([{name:"",value:""}]),bt()},St=()=>{console.log("Add Attribute button clicked"),Ge([...qe,{name:"",value:""}]),Pe(!0)},At=()=>{Pe(!0)},Tt=(e,t,a)=>{const r=[...qe];r[e][t]=a,Ge(r)},kt=()=>{Xe(!1),ae(""),ne("")},_t=e=>{let{message:t}=e;return(0,I.jsx)(n.Z,{severity:"success",children:t})},wt=e=>{let{message:t}=e;return(0,I.jsx)(n.Z,{severity:"error",children:t})};return(0,I.jsxs)("div",{children:[(0,I.jsx)("div",{className:e.header,children:(0,I.jsxs)(s.ZP,{container:!0,spacing:1,alignItems:"center",children:[(0,I.jsx)(s.ZP,{item:!0,xs:10,children:oe&&(0,I.jsx)(_t,{message:oe,onClose:()=>de("")})}),(0,I.jsx)(s.ZP,{item:!0,xs:2,container:!0,justifyContent:"flex-end",children:(0,I.jsx)(i.Z,{onClick:()=>{ye(!0)},variant:"contained",color:"secondary",children:"Add Device"})}),(0,I.jsx)(s.ZP,{item:!0,xs:12,children:(0,I.jsx)(l.Z,{component:c.Z,children:(0,I.jsxs)(o.Z,{children:[(0,I.jsx)(d.Z,{children:(0,I.jsxs)(h.Z,{children:[(0,I.jsx)(u.Z,{children:"Device Name"}),(0,I.jsx)(u.Z,{children:"Slave ID"}),(0,I.jsx)(u.Z,{children:"Actions"})]})}),(0,I.jsx)(x.Z,{children:t.map((e=>(0,I.jsxs)(r.Fragment,{children:[(0,I.jsxs)(h.Z,{style:{backgroundColor:tt===e.id?"lightpink":"inherit"},children:[(0,I.jsx)(u.Z,{children:e.name}),(0,I.jsx)(u.Z,{children:e.slave_id}),(0,I.jsxs)(u.Z,{children:[(0,I.jsx)(P.Z,{onClick:()=>(e=>{const a=t.find((t=>t.id===e));Ue(a.name),Be(a.slave_id),N(a),We(!0)})(e.id),variant:"contained",style:{marginRight:"10px"},children:(0,I.jsx)(k.Z,{style:{color:"gray",fontSize:"medium"}})}),(0,I.jsx)(P.Z,{onClick:()=>((e,t)=>{N(e),Ne(t),Ve(!0)})(e.id,e.name),variant:"outlined",style:{marginRight:"10px"},children:(0,I.jsx)(T.Z,{style:{color:"gray",fontSize:"medium"}})}),(0,I.jsx)(P.Z,{onClick:()=>ot(e.id),variant:"contained",color:"primary",style:{float:"right"},children:tt===e.id?(0,I.jsx)(w.Z,{style:{color:"gray",fontSize:"large"}}):(0,I.jsx)(E.Z,{style:{color:"gray",fontSize:"large"}})})]})]}),(0,I.jsx)(h.Z,{children:(0,I.jsx)(u.Z,{colSpan:3,children:(0,I.jsx)(g.Z,{in:tt===e.id,timeout:"auto",unmountOnExit:!0,children:(0,I.jsxs)("div",{children:[(0,I.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,I.jsx)(m.Z,{children:"Parameter"}),(0,I.jsx)(i.Z,{onClick:jt,variant:"contained",color:"secondary",style:{marginBottom:"10px"},children:"Add"})]}),he&&(0,I.jsx)(_t,{message:he,onClose:()=>ue("")}),me&&(0,I.jsx)(wt,{message:me,onClose:()=>je("")}),(0,I.jsx)(l.Z,{component:c.Z,style:{marginTop:"10px"},children:(0,I.jsxs)(o.Z,{children:[(0,I.jsx)(d.Z,{children:(0,I.jsxs)(h.Z,{children:[(0,I.jsx)(u.Z,{children:"Function Code"}),(0,I.jsx)(u.Z,{children:"Address"}),(0,I.jsx)(u.Z,{children:"Parameter Name"}),(0,I.jsx)(u.Z,{children:"Data Type"}),(0,I.jsx)(u.Z,{children:"Threshold"}),(0,I.jsx)(u.Z,{children:"Aggregation Type"}),(0,I.jsx)(u.Z,{children:"Actions"})]})}),(0,I.jsx)(x.Z,{children:R.map((e=>(0,I.jsxs)(h.Z,{children:[(0,I.jsx)(u.Z,{children:e.function_code}),(0,I.jsx)(u.Z,{children:e.address}),(0,I.jsx)(u.Z,{children:e.parameter_name}),(0,I.jsx)(u.Z,{children:e.data_type}),(0,I.jsx)(u.Z,{children:e.threshold}),(0,I.jsx)(u.Z,{children:e.aggregation_type}),(0,I.jsxs)(u.Z,{children:[(0,I.jsx)(P.Z,{onClick:()=>(e=>{U(e),V(e.function_code),L(e.address),G(e.parameter_name),$(e.data_type),X(e.threshold),ee(e.aggregation_type),B(!0)})(e),variant:"contained",style:{marginRight:"10px"},children:(0,I.jsx)(k.Z,{style:{color:"gray",fontSize:"medium"}})}),(0,I.jsx)(P.Z,{onClick:()=>(e=>{U(e),we(!0)})(e),variant:"contained",children:(0,I.jsx)(T.Z,{style:{color:"gray",fontSize:"medium"}})})]})]},e.id)))})]})}),(0,I.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,I.jsx)(m.Z,{style:{marginTop:"30px"},children:"Attribute"}),(0,I.jsx)(i.Z,{onClick:At,variant:"contained",color:"secondary",style:{marginTop:"30px"},children:"Add"})]}),xe&&(0,I.jsx)(_t,{message:xe,onClose:()=>ge("")}),(0,I.jsx)(l.Z,{component:c.Z,style:{marginTop:"10px"},children:(0,I.jsxs)(o.Z,{children:[(0,I.jsx)(d.Z,{children:(0,I.jsxs)(h.Z,{children:[(0,I.jsx)(u.Z,{children:"Attribute Name"}),(0,I.jsx)(u.Z,{children:"Attribute Value"}),(0,I.jsx)(u.Z,{children:"Actions"})]})}),(0,I.jsx)(x.Z,{children:O.map(((e,t)=>(0,I.jsxs)(h.Z,{children:[(0,I.jsx)(u.Z,{children:e.name}),(0,I.jsx)(u.Z,{children:e.value}),(0,I.jsxs)(u.Z,{children:[(0,I.jsx)(P.Z,{onClick:()=>(e=>{$e(e),ae(e.name),ne(e.value),Xe(!0)})(e),variant:"contained",style:{marginRight:"10px"},children:(0,I.jsx)(k.Z,{style:{color:"gray",fontSize:"medium"}})}),t>=5?(0,I.jsx)(P.Z,{onClick:()=>(e=>{$e(e),Ie(!0)})(e),variant:"contained",children:(0,I.jsx)(T.Z,{style:{color:"gray",fontSize:"medium"}})}):(0,I.jsx)(P.Z,{disabled:!0,variant:"contained",style:{display:"none"},children:(0,I.jsx)(T.Z,{style:{color:"gray",fontSize:"medium"}})})]})]},e.id)))})]})})]})})})})]},e.id)))})]})})})]})}),(0,I.jsxs)(j.Z,{open:z,onClose:yt,children:[(0,I.jsx)(m.Z,{style:{color:"#008080"},children:"Update Parameter"}),(0,I.jsx)(v.Z,{children:(0,I.jsxs)(s.ZP,{container:!0,spacing:2,children:[(0,I.jsx)(s.ZP,{item:!0,xs:6,children:(0,I.jsxs)(p.Z,{fullWidth:!0,children:[(0,I.jsx)(Z.Z,{style:{marginTop:"10px"},children:"Function Code"}),(0,I.jsxs)(y.Z,{value:J,style:{marginTop:"10px"},onChange:e=>V(e.target.value),children:[(0,I.jsx)(f.Z,{value:"Coil Status",children:"Coil Status"}),(0,I.jsx)(f.Z,{value:"Input Status",children:"Input Status"}),(0,I.jsx)(f.Z,{value:"Holding Register",children:"Holding Register"}),(0,I.jsx)(f.Z,{value:"Input Register",children:"Input Register"})]})]})}),(0,I.jsx)(s.ZP,{item:!0,xs:6,children:(0,I.jsx)(C.Z,{label:"Address",value:H,style:{marginTop:"10px"},onChange:e=>L(e.target.value),fullWidth:!0})}),(0,I.jsx)(s.ZP,{item:!0,xs:6,children:(0,I.jsx)(C.Z,{label:"Parameter Name",value:q,onChange:e=>G(e.target.value),fullWidth:!0})}),(0,I.jsx)(s.ZP,{item:!0,xs:6,children:(0,I.jsxs)(p.Z,{fullWidth:!0,children:[(0,I.jsx)(Z.Z,{children:"Data Type"}),(0,I.jsxs)(y.Z,{value:K,onChange:e=>$(e.target.value),children:[(0,I.jsx)(f.Z,{value:"Integer",children:"Integer"}),(0,I.jsx)(f.Z,{value:"Float",children:"Float"}),(0,I.jsx)(f.Z,{value:"Double",children:"Double"}),(0,I.jsx)(f.Z,{value:"Boolean",children:"Boolean"})]})]})}),(0,I.jsx)(s.ZP,{item:!0,xs:6,children:(0,I.jsx)(C.Z,{label:"Threshold",value:Q,onChange:e=>X(e.target.value),fullWidth:!0})}),(0,I.jsx)(s.ZP,{item:!0,xs:6,children:(0,I.jsxs)(p.Z,{fullWidth:!0,children:[(0,I.jsx)(Z.Z,{children:"Aggregation Type"}),(0,I.jsxs)(y.Z,{value:Y,onChange:e=>ee(e.target.value),children:[(0,I.jsx)(f.Z,{value:"current_val",children:"Current Value"}),(0,I.jsx)(f.Z,{value:"min",children:"Min"}),(0,I.jsx)(f.Z,{value:"max",children:"Max"}),(0,I.jsx)(f.Z,{value:"avg",children:"Avg"}),(0,I.jsx)(f.Z,{value:"median",children:"Median"}),(0,I.jsx)(f.Z,{value:"rms",children:"Rms"}),(0,I.jsx)(f.Z,{value:"mode",children:"Mode"})]})]})})]})}),(0,I.jsxs)(b.Z,{children:[(0,I.jsx)(i.Z,{onClick:yt,variant:"outlined",color:"error",children:"Cancel"}),(0,I.jsx)(i.Z,{onClick:async()=>{if(!M||!M.id)return void je("No Parameter selected for update");if(!Number.isInteger(parseInt(H,10)))return je("Please Insert Only Integer Values in the Address field!"),void ht();const e={function_code:J,address:H,parameter_name:q,data_type:K,threshold:Q,aggregation_type:Y};try{const t=await fetch("/parameter/devices/".concat(_,"/parameter/").concat(M.id),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});if(!t.ok)throw new Error("Failed to update Parameter: ".concat(t.statusText));dt({target:{value:_}}),Zt(),ht(),ue("Parameter updated successfully!")}catch(t){console.error("Error updating Parameter:",t),Zt(),ht(),je("Error updating Parameter. ".concat(t.message))}},variant:"contained",color:"primary",children:"Update"})]})]}),(0,I.jsxs)(j.Z,{open:_e,onClose:gt,children:[(0,I.jsx)(m.Z,{children:"Delete Parameter"}),(0,I.jsx)(v.Z,{children:(0,I.jsx)("p",{children:"Are you sure you want to delete this Parameter?"})}),(0,I.jsxs)(b.Z,{children:[(0,I.jsx)(i.Z,{onClick:()=>{we(!1),Ae(null)},variant:"outlined",color:"error",children:"Cancel"}),(0,I.jsx)(i.Z,{onClick:()=>(async e=>{we(!1);try{if(_&&e&&e.id){const t=await fetch("/parameter/devices/".concat(_,"/parameter/").concat(e.id),{method:"DELETE"});if(!t.ok)throw new Error("Failed to delete parameter: ".concat(t.statusText));ue("Parameter deleted successfully!"),je("");const r=await fetch("/devices/".concat(_)),n=await r.json();n.device&&Array.isArray(n.device.parameters)?F(n.device.parameters):F([]);const s=await fetch("/devices/"),i=await s.json();Array.isArray(i.devices)?a(i.devices):console.error("Invalid response format for devices:",i)}}catch(t){console.error("Error deleting Parameter:",t),je("Error deleting Parameter. ".concat(t.message))}finally{B(!1),U(null)}})(M),variant:"contained",color:"error",children:"Delete"})]})]}),(0,I.jsxs)(j.Z,{open:Qe,onClose:kt,children:[(0,I.jsx)(m.Z,{style:{color:"#008080"},children:"Update Attribute"}),(0,I.jsx)(v.Z,{children:(0,I.jsxs)(s.ZP,{container:!0,spacing:2,children:[(0,I.jsx)(s.ZP,{item:!0,xs:6,children:(0,I.jsx)(C.Z,{label:"Name",value:te,style:{marginTop:"10px"},onChange:e=>ae(e.target.value),fullWidth:!0})}),(0,I.jsx)(s.ZP,{item:!0,xs:6,children:(0,I.jsx)(C.Z,{label:"Value",value:re,style:{marginTop:"10px"},onChange:e=>ne(e.target.value),fullWidth:!0})})]})}),(0,I.jsxs)(b.Z,{children:[(0,I.jsx)(i.Z,{onClick:kt,variant:"outlined",color:"error",children:"Cancel"}),(0,I.jsx)(i.Z,{onClick:async()=>{if(!Ke||!Ke.id||!_)return void console.error("No Attribute or Device selected for update");const e={name:te,value:re};try{const t=await fetch("/attribute/devices/".concat(_,"/attribute/").concat(Ke.id),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});if(!t.ok)throw new Error("Failed to update Attribute: ".concat(t.statusText));dt({target:{value:_}}),kt(),bt(),ge("Attribute updated successfully!")}catch(t){console.error("Error updating Attribute:",t),je("Error updating Attribute. ".concat(t.message)),bt(),kt()}},variant:"contained",color:"primary",children:"Update"})]})]}),(0,I.jsxs)(j.Z,{open:Ee,onClose:gt,children:[(0,I.jsx)(m.Z,{children:"Delete Attribute"}),(0,I.jsx)(v.Z,{children:(0,I.jsx)("p",{children:"Are you sure you want to delete this Attribute?"})}),(0,I.jsxs)(b.Z,{children:[(0,I.jsx)(i.Z,{onClick:()=>{Ie(!1),ke(null)},variant:"outlined",color:"error",children:"Cancel"}),(0,I.jsx)(i.Z,{onClick:()=>(async e=>{we(!1);try{if(_&&e&&e.id){const t=await fetch("/attribute/devices/".concat(_,"/attribute/").concat(e.id),{method:"DELETE"});if(!t.ok)throw new Error("Failed to delete Attribute: ".concat(t.statusText));ge("Attribute deleted successfully!"),je("");const r=await fetch("/devices/".concat(_)),n=await r.json();n.device&&Array.isArray(n.device.attributes)?W(n.device.attributes):W([]);const s=await fetch("/devices/"),i=await s.json();Array.isArray(i.devices)?a(i.devices):console.error("Invalid response format for devices:",i)}}catch(t){console.error("Error deleting Attribute:",t),je("Error deleting Attribute. ".concat(t.message))}finally{Ie(!1),Xe(!1),$e(null)}})(Ke),variant:"contained",color:"error",children:"Delete"})]})]}),(0,I.jsxs)(j.Z,{open:Oe,onClose:ut,children:[(0,I.jsx)(m.Z,{children:"Update Device"}),(0,I.jsx)(v.Z,{children:_&&(0,I.jsxs)(I.Fragment,{children:[(0,I.jsx)(C.Z,{label:"Device Name",value:Me,style:{marginTop:"5px",marginRight:"5px"},onChange:e=>Ue(e.target.value)}),(0,I.jsx)(C.Z,{label:"Slave ID",value:ze,style:{marginTop:"5px"},onChange:e=>Be(e.target.value)})]})}),(0,I.jsxs)(b.Z,{children:[(0,I.jsx)(i.Z,{onClick:ut,variant:"outlined",color:"error",children:"Cancel"}),(0,I.jsx)(i.Z,{onClick:async()=>{try{const e={name:Me,slave_id:ze};await fetch("/devices/".concat(_.id),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});const t=await fetch("/devices/"),r=await t.json();Array.isArray(r.devices)?(Ne(Me),Fe(ze),a(r.devices),de("Device updated successfully!")):console.error("Invalid response format for devices:",r)}catch(e){console.error("Error updating device:",e),je("Error updating device. Please try again.")}finally{We(!1)}},variant:"contained",color:"primary",children:"Update"})]})]}),(0,I.jsxs)(j.Z,{open:Je,onClose:xt,children:[(0,I.jsx)(m.Z,{children:"Delete Device"}),(0,I.jsx)(v.Z,{children:(0,I.jsxs)("p",{children:['Are you sure you want to delete "',De,'"?']})}),(0,I.jsxs)(b.Z,{children:[(0,I.jsx)(i.Z,{onClick:xt,variant:"outlined",color:"error",children:"Cancel"}),(0,I.jsx)(i.Z,{onClick:()=>(async e=>{try{await fetch("/devices/".concat(e),{method:"DELETE"});const t=await fetch("/devices/"),r=await t.json();Array.isArray(r.devices)?(a(r.devices),F([]),W([]),N(null),Ne(""),Fe("")):console.error("Invalid response format for devices:",r),de("Device deleted successfully!")}catch(t){console.error("Error deleting device:",t),je("Error deleting device. Please try again.")}finally{Ve(!1),B(!1),U(null),$e(null)}})(_),variant:"contained",color:"error",children:"Delete"})]})]}),(0,I.jsxs)(j.Z,{open:Ze,onClose:vt,children:[(0,I.jsx)(m.Z,{children:"Add Device"}),(0,I.jsxs)(v.Z,{children:[(0,I.jsx)(C.Z,{label:"Device Name",value:se,onChange:e=>ie(e.target.value),style:{marginRight:"5px",marginTop:"5px"}}),(0,I.jsx)(C.Z,{label:"Slave ID",value:le,style:{marginTop:"5px"},onChange:e=>ce(e.target.value)}),(0,I.jsx)(C.Z,{label:"Type",value:rt,style:{marginRight:"5px",marginTop:"5px"},onChange:e=>nt(e.target.value)}),(0,I.jsx)(C.Z,{label:"Company",value:st,style:{marginTop:"5px"},onChange:e=>it(e.target.value)}),(0,I.jsx)(C.Z,{label:"Model Number",value:lt,style:{marginTop:"5px"},onChange:e=>ct(e.target.value)})]}),(0,I.jsxs)(b.Z,{children:[(0,I.jsx)(i.Z,{onClick:vt,variant:"outlined",color:"error",children:"Cancel"}),(0,I.jsx)(i.Z,{onClick:async()=>{if(se&&le){const t={name:se,slave_id:le};try{const e=await fetch("/devices/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});if(!e.ok)throw new Error("Network response was not ok");const r=(await e.json()).device_id,n=[{name:"Device Name",value:t.name},{name:"Slave ID",value:t.slave_id},{name:"Type",value:rt},{name:"Company",value:st},{name:"Model Number",value:lt}];console.log("defaultAttributes: ",n);const s={attributes:n.map((e=>({name:e.name,value:e.value})))};await fetch("/attribute/devices/".concat(r,"/attribute"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)}),de("Device created successfully!"),mt(),ye(!1);const i=await fetch("/devices/"),l=await i.json();Array.isArray(l.devices)?a(l.devices):(je("Invalid response format for devices: ".concat(l)),mt(),ye(!1))}catch(e){console.error("Error creating device:",e),je("Error creating device. Please try again."),mt(),ye(!1)}}else je("Both device name and slave ID are required"),mt(),ye(!1)},variant:"contained",children:"Create Device"})]})]}),(0,I.jsxs)(j.Z,{open:fe,onClose:pt,fullWidth:!0,keepMounted:!0,disableEscapeKeyDown:!0,onClick:e=>e.stopPropagation(),children:[(0,I.jsx)(m.Z,{children:"Add Parameter"}),me&&(0,I.jsx)(wt,{message:me,onClose:()=>je("")}),(0,I.jsxs)(v.Z,{children:[He.map(((e,t)=>(0,I.jsxs)(s.ZP,{container:!0,spacing:1,alignItems:"center",children:[(0,I.jsx)(s.ZP,{item:!0,xs:3,children:(0,I.jsxs)(p.Z,{fullWidth:!0,children:[(0,I.jsx)(Z.Z,{style:{marginTop:"5px"},children:"Function Code"}),(0,I.jsxs)(y.Z,{value:e.function_code||"",style:{marginTop:"8px"},onChange:e=>Ct(t,"function_code",e.target.value),children:[(0,I.jsx)(f.Z,{value:"Coil Status",children:"Coil Status"}),(0,I.jsx)(f.Z,{value:"Input Status",children:"Input Status"}),(0,I.jsx)(f.Z,{value:"Holding Register",children:"Holding Register"}),(0,I.jsx)(f.Z,{value:"Input Register",children:"Input Register"})]})]})}),(0,I.jsx)(s.ZP,{item:!0,xs:2,children:(0,I.jsx)(C.Z,{label:"Address",value:e.address,style:{marginTop:"5px"},onChange:e=>ft(t,"address",e.target.value)})}),(0,I.jsx)(s.ZP,{item:!0,xs:2,children:(0,I.jsx)(C.Z,{label:"Parameter Name",value:e.ParameterName,style:{marginTop:"5px"},onChange:e=>Ct(t,"ParameterName",e.target.value)})}),(0,I.jsx)(s.ZP,{item:!0,xs:2,children:(0,I.jsxs)(p.Z,{fullWidth:!0,children:[(0,I.jsx)(Z.Z,{style:{marginTop:"5px"},children:"Data Type"}),(0,I.jsxs)(y.Z,{value:e.data_type,style:{marginTop:"8px"},onChange:e=>Ct(t,"data_type",e.target.value),children:[(0,I.jsx)(f.Z,{value:"Integer",children:"Integer"}),(0,I.jsx)(f.Z,{value:"Float",children:"Float"}),(0,I.jsx)(f.Z,{value:"Double",children:"Double"}),(0,I.jsx)(f.Z,{value:"Boolean",children:"Boolean"})]})]})}),(0,I.jsx)(s.ZP,{item:!0,xs:2,children:(0,I.jsx)(C.Z,{label:"Threshold",value:e.threshold,style:{marginTop:"5px"},onChange:e=>ft(t,"threshold",e.target.value)})}),(0,I.jsx)(s.ZP,{item:!0,xs:2,children:(0,I.jsxs)(p.Z,{fullWidth:!0,children:[(0,I.jsx)(Z.Z,{style:{marginTop:"5px"},children:"Aggregation Type"}),(0,I.jsxs)(y.Z,{value:e.aggregation_type,style:{marginTop:"8px"},onChange:e=>Ct(t,"aggregation_type",e.target.value),children:[(0,I.jsx)(f.Z,{value:"current_val",children:"Current Value"}),(0,I.jsx)(f.Z,{value:"min",children:"Min"}),(0,I.jsx)(f.Z,{value:"max",children:"Max"}),(0,I.jsx)(f.Z,{value:"avg",children:"Avg"}),(0,I.jsx)(f.Z,{value:"median",children:"Median"}),(0,I.jsx)(f.Z,{value:"rms",children:"Rms"}),(0,I.jsx)(f.Z,{value:"mode",children:"Mode"})]})]})}),(0,I.jsx)(s.ZP,{item:!0,xs:1,children:0!==t&&(0,I.jsx)(P.Z,{onClick:()=>(e=>{const t=[...He];t.splice(e,1),Le(t)})(t),children:(0,I.jsx)(A.Z,{style:{color:"red"}})})})]},t))),(0,I.jsx)(s.ZP,{container:!0,spacing:2,alignItems:"center",children:(0,I.jsx)(s.ZP,{item:!0,xs:12,align:"right",children:(0,I.jsx)(P.Z,{onClick:()=>{console.log("Add Parameter button clicked"),Le([...He,{function_code:"",address:"",ParameterName:"",data_type:"",threshold:"",aggregation_type:""}]),Ce(!0)},children:(0,I.jsx)(S.Z,{style:{color:"green"}})})})})]}),(0,I.jsxs)(b.Z,{children:[(0,I.jsx)(i.Z,{onClick:pt,variant:"outlined",color:"secondary",children:"Cancel"}),(0,I.jsx)(i.Z,{onClick:()=>{if(!_)return je("Please select a device!"),void Ce(!1);if(He.some((e=>!e.function_code||!e.address||!e.ParameterName||!e.data_type||!e.aggregation_type)))return je("Please fill in all the required fields for each parameter!"),void Ce(!1);if(He.some((e=>!Number.isInteger(parseInt(e.address,10)))))return void je("Please Enter Only Integer Values in the Address Field!");const e={parameters:He.map((e=>({active:!0,function_code:e.function_code,address:e.address,parameter_name:e.ParameterName,data_type:e.data_type,threshold:""!==e.threshold?parseFloat(e.threshold):0,aggregation_type:e.aggregation_type})))};fetch("/parameter/devices/".concat(_,"/parameter"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).then((e=>{if(!e.ok)throw new Error("One or more parameters failed to create.");return e.json()})).then((e=>{console.log("API Response Data:",e),e.created_parameters?(et([...Ye,...e.created_parameters]),ue("Parameters created successfully!"),Zt(),Ce(!1),dt({target:{value:_}})):(console.error("Unexpected response format:",e),je("Error creating Parameters. Please try again."),Zt(),Ce(!1))})).catch((e=>{console.error("Error creating Parameters:",e),je("Error creating Parameters. Please try again."),Zt(),Ce(!1)}))},variant:"contained",color:"primary",children:"Create Parameter"})]})]}),(0,I.jsxs)(j.Z,{open:be,onClose:Pt,children:[(0,I.jsx)(m.Z,{children:"Add Attribute"}),(0,I.jsx)(v.Z,{children:qe.map(((e,t)=>(0,I.jsxs)(s.ZP,{container:!0,spacing:2,alignItems:"center",children:[(0,I.jsx)(s.ZP,{item:!0,xs:3,children:(0,I.jsx)(C.Z,{label:"Name",value:e.name,style:{marginTop:"7px"},onChange:e=>Tt(t,"name",e.target.value)})}),(0,I.jsx)(s.ZP,{item:!0,xs:3,children:(0,I.jsx)(C.Z,{label:"Value",value:e.value,style:{marginTop:"7px"},onChange:e=>Tt(t,"value",e.target.value)})}),(0,I.jsx)(s.ZP,{item:!0,xs:1,children:0!==t&&(0,I.jsx)(P.Z,{onClick:()=>(e=>{const t=[...qe];t.splice(e,1),Ge(t)})(t),children:(0,I.jsx)(A.Z,{style:{color:"red"}})})}),(0,I.jsx)(s.ZP,{item:!0,xs:1,children:t===qe.length-1&&(0,I.jsx)(P.Z,{onClick:St,children:(0,I.jsx)(S.Z,{style:{color:"green"}})})})]},t)))}),(0,I.jsxs)(b.Z,{children:[(0,I.jsx)(i.Z,{onClick:Pt,variant:"outlined",color:"error",children:"Cancel"}),(0,I.jsx)(i.Z,{onClick:()=>{if(!_)return void je("Please select a device!");if(qe.some((e=>!e.name||!e.value)))return je("Please fill in all the required fields for each attribute!"),void bt();const e={attributes:qe.map((e=>({name:e.name,value:e.value})))};fetch("/attribute/devices/".concat(_,"/attribute"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).then((e=>{if(!e.ok)throw new Error("One or more attributes failed to create.")})).then((()=>{ge("Attributes created successfully!"),bt(),Pe(!1),dt({target:{value:_}})})).catch((e=>{console.error("Error creating Attributes:",e),je("Error creating Attributes. Please try again."),bt(),Pe(!1)}))},variant:"contained",children:"Create Attribute"})]})]})]})}}}]);
//# sourceMappingURL=399.058e8c16.chunk.js.map