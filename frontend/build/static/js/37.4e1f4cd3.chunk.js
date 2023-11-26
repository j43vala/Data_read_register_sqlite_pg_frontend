"use strict";(self.webpackChunkstarter_bt5=self.webpackChunkstarter_bt5||[]).push([[37],{9037:(e,t,r)=>{r.r(t),r.d(t,{default:()=>N});var a=r(2791),s=r(8096),n=r(4925),l=r(3926),i=r(9891),c=r(890),o=r(4294),d=r(9658),h=r(9281),u=r(5527),x=r(9836),v=r(6890),j=r(5855),m=r(3994),p=r(3382),Z=r(5289),y=r(5661),g=r(9157),f=r(1889),b=r(7391),C=r(7123),P=r(3400),A=r(2419),S=r(5585),k=r(7755),w=r(184);const E=(0,k.Z)((e=>({root:{padding:e.spacing(2)},header:{display:"flex",alignItems:"center",marginBottom:e.spacing(2)},headerText:{fontFamily:"Arial, sans-serif",fontSize:"18px",fontWeight:"bold",color:"#333",marginRight:e.spacing(2)},buttonGroup:{marginLeft:"auto",display:"flex",alignItems:"center"},addButton:{marginRight:e.spacing(2),backgroundColor:e.palette.success.main,color:"#fff","&:hover":{backgroundColor:e.palette.success.dark}},deleteButton:{color:e.palette.error.main}}))),D=()=>{const e=E(),[t,r]=(0,a.useState)([]),[k,D]=(0,a.useState)(""),[N,T]=(0,a.useState)([]),[_,I]=(0,a.useState)([]),[U,O]=(0,a.useState)(null),[F,B]=(0,a.useState)(!1),[R,J]=(0,a.useState)(""),[L,W]=(0,a.useState)(""),[q,G]=(0,a.useState)(""),[V,z]=(0,a.useState)(""),[H,K]=(0,a.useState)(""),[M,Q]=(0,a.useState)(""),[X,Y]=(0,a.useState)(""),[$,ee]=(0,a.useState)(""),[te,re]=(0,a.useState)(""),[ae,se]=(0,a.useState)(""),[ne,le]=(0,a.useState)(""),[ie,ce]=(0,a.useState)(""),[oe,de]=(0,a.useState)(!1),[he,ue]=(0,a.useState)(!1),[xe,ve]=(0,a.useState)(!1),[je,me]=(0,a.useState)(null),[pe,Ze]=(0,a.useState)(null),[ye,ge]=(0,a.useState)(!1),[fe,be]=(0,a.useState)(!1),[Ce,Pe]=(0,a.useState)(""),[Ae,Se]=(0,a.useState)(""),[ke,we]=(0,a.useState)(!1),[Ee,De]=(0,a.useState)(""),[Ne,Te]=(0,a.useState)(""),[_e,Ie]=(0,a.useState)(!1),[Ue,Oe]=(0,a.useState)([{address:"",ParameterName:"",data_type:""}]),[Fe,Be]=(0,a.useState)([{name:"",value:""}]),[Re,Je]=(0,a.useState)(null),[Le,We]=(0,a.useState)(!1);(0,a.useEffect)((()=>{setTimeout((()=>{ee(""),re(""),se(""),le(""),ce("")}),5e3)}),[$,te,ae,ne,ie]),(0,a.useEffect)((()=>{(async()=>{try{const e=await fetch("http://localhost:5000/devices/"),t=await e.json();Array.isArray(t.devices)?r(t.devices):console.error("Invalid response format for devices:",t)}catch(e){console.error("Error fetching devices:",e)}})()}),[]);const qe=async e=>{const t=e.target.value;try{const e=await fetch("http://localhost:5000/devices/".concat(t)),r=await e.json();r.device&&Array.isArray(r.device.parameters)?r.device.parameters.length>0?(T(r.device.parameters),ce(""),le("")):(T([]),I([]),le("No Parameters And Attributes connected to the selected device")):(T([]),le("Error fetching Parameters and Attributes or no Parameters and Attributes connected to the selected device")),D(t),r.device&&(Pe(r.device.name),Se(r.device.slave_id),I(r.device.attributes))}catch(r){console.error("Error fetching Device details:",r),le("Error fetching Device details. Please try again.")}},Ge=()=>{we(!1)},Ve=()=>{Ie(!1)},ze=()=>{ge(!1)},He=()=>{Q(""),Y("")},Ke=()=>{de(!1),He()},Me=()=>{ue(!1),Oe([{address:"",ParameterName:"",data_type:""}]),Qe()},Qe=()=>{Oe([{address:"",ParameterName:"",data_type:""}])},Xe=()=>{console.log("Add Parameter button clicked"),Oe([...Ue,{address:"",ParameterName:"",data_type:""}]),ue(!0)},Ye=()=>{B(!1),J(""),W(""),G("")},$e=(e,t,r)=>{const a=[...Ue];a[e][t]=r,Oe(a)},et=()=>{Be([{name:"",value:""}])},tt=()=>{ve(!1),Be([{name:"",value:""}]),et()},rt=()=>{console.log("Add Attribute button clicked"),Be([...Fe,{name:"",value:""}]),ve(!0)},at=(e,t,r)=>{const a=[...Fe];a[e][t]=r,Be(a)},st=()=>{We(!1),z(""),K("")};return(0,w.jsxs)("div",{className:e.root,children:[(0,w.jsxs)("div",{className:e.header,children:[(0,w.jsxs)(s.Z,{children:[(0,w.jsx)(n.Z,{id:"device-label",children:"Select Device"}),t.length>0?(0,w.jsx)(l.Z,{labelId:"device-label",id:"device-select",value:k,label:"Select Device",onChange:qe,children:t.map((e=>(0,w.jsx)(i.Z,{value:e.id,children:e.name},e.id)))}):(0,w.jsx)("p",{children:"No devices available"})]}),(0,w.jsxs)("div",{style:{marginLeft:"10px",display:"flex",alignItems:"center"},children:[(0,w.jsxs)(c.Z,{variant:"body1",className:e.body1,children:[(0,w.jsx)("span",{style:{color:"blue"},children:"Device:"}),(0,w.jsx)("span",{style:{color:"red"},children:Ce}),(0,w.jsx)("span",{style:{color:"blue",marginLeft:"10px"},children:"Slave ID:"}),(0,w.jsx)("span",{style:{color:"red",marginRight:"10px"},children:Ae})]}),(0,w.jsx)(o.Z,{onClick:()=>{De(Ce),Te(Ae),we(!0)},variant:"contained",color:"primary",style:{marginRight:"10px"},children:"Update"}),(0,w.jsx)(o.Z,{onClick:()=>{Ie(!0)},variant:"contained",color:"error",children:"Delete"})]}),(0,w.jsxs)("div",{className:e.buttonGroup,children:[(0,w.jsx)(o.Z,{onClick:()=>{de(!0)},variant:"contained",color:"secondary",style:{marginRight:"10px"},children:"Add Device"}),(0,w.jsx)(o.Z,{onClick:()=>{ue(!0)},variant:"contained",color:"secondary",style:{marginRight:"10px"},children:"Add Parameter"}),(0,w.jsx)(o.Z,{onClick:()=>{ve(!0)},variant:"contained",color:"secondary",children:"Add Attribute"})]})]}),$&&(0,w.jsx)(d.Z,{severity:"success",onClose:()=>ee(""),children:$}),te&&(0,w.jsx)(d.Z,{severity:"success",onClose:()=>re(""),children:te}),ae&&(0,w.jsx)(d.Z,{severity:"success",onClose:()=>re(""),children:ae}),ne&&(0,w.jsx)(d.Z,{severity:"error",onClose:()=>le(""),children:ne}),(0,w.jsx)(h.Z,{component:u.Z,children:(0,w.jsxs)(x.Z,{children:[(0,w.jsxs)(v.Z,{children:[(0,w.jsx)(j.Z,{children:(0,w.jsx)(m.Z,{colSpan:4,align:"center",children:(0,w.jsx)(c.Z,{variant:"h6",children:"Parameter Table"})})}),(0,w.jsxs)(j.Z,{children:[(0,w.jsx)(m.Z,{children:"Address"}),(0,w.jsx)(m.Z,{children:"Parameter Name"}),(0,w.jsx)(m.Z,{children:"Data Type"}),(0,w.jsx)(m.Z,{children:"Actions"})]})]}),(0,w.jsx)(p.Z,{children:N.map((e=>(0,w.jsxs)(j.Z,{children:[(0,w.jsx)(m.Z,{children:e.address}),(0,w.jsx)(m.Z,{children:e.parameter_name}),(0,w.jsx)(m.Z,{children:e.data_type}),(0,w.jsxs)(m.Z,{children:[(0,w.jsx)(o.Z,{onClick:()=>(e=>{O(e),J(e.address),W(e.parameter_name),G(e.data_type),B(!0)})(e),variant:"contained",color:"primary",style:{marginRight:"10px"},children:"Update"}),(0,w.jsx)(o.Z,{onClick:()=>(e=>{O(e),ge(!0)})(e),variant:"contained",color:"error",children:"Delete"})]})]},e.id)))})]})}),(0,w.jsx)(h.Z,{component:u.Z,style:{marginTop:"20px"},children:(0,w.jsxs)(x.Z,{children:[(0,w.jsxs)(v.Z,{children:[(0,w.jsx)(j.Z,{children:(0,w.jsx)(m.Z,{colSpan:3,align:"center",children:(0,w.jsx)(c.Z,{variant:"h6",children:"Attribute Table"})})}),(0,w.jsxs)(j.Z,{children:[(0,w.jsx)(m.Z,{children:"Attribute Name"}),(0,w.jsx)(m.Z,{children:"Attribute Value"}),(0,w.jsx)(m.Z,{children:"Actions"})]})]}),(0,w.jsx)(p.Z,{children:_.map((e=>(0,w.jsxs)(j.Z,{children:[(0,w.jsx)(m.Z,{children:e.name}),(0,w.jsx)(m.Z,{children:e.value}),(0,w.jsxs)(m.Z,{children:[(0,w.jsx)(o.Z,{onClick:()=>(e=>{Je(e),z(e.name),K(e.value),We(!0)})(e),variant:"contained",color:"primary",style:{marginRight:"10px"},children:"Update"}),(0,w.jsx)(o.Z,{onClick:()=>(e=>{Je(e),be(!0)})(e),variant:"contained",color:"error",children:"Delete"})]})]},e.id)))})]})}),(0,w.jsxs)(Z.Z,{open:F,onClose:Ye,children:[(0,w.jsx)(y.Z,{style:{color:"#008080"},children:"Update Parameter"}),(0,w.jsx)(g.Z,{children:(0,w.jsxs)(f.ZP,{container:!0,spacing:2,children:[(0,w.jsx)(f.ZP,{item:!0,xs:6,children:(0,w.jsx)(b.Z,{label:"Address",value:R,onChange:e=>J(e.target.value),fullWidth:!0})}),(0,w.jsx)(f.ZP,{item:!0,xs:6,children:(0,w.jsx)(b.Z,{label:"Parameter Name",value:L,onChange:e=>W(e.target.value),fullWidth:!0})}),(0,w.jsx)(f.ZP,{item:!0,xs:6,children:(0,w.jsxs)(s.Z,{fullWidth:!0,children:[(0,w.jsx)(n.Z,{children:"Data Type"}),(0,w.jsxs)(l.Z,{value:q,onChange:e=>G(e.target.value),children:[(0,w.jsx)(i.Z,{value:"Integer",children:"Integer"}),(0,w.jsx)(i.Z,{value:"Float",children:"Float"}),(0,w.jsx)(i.Z,{value:"Double",children:"Double"}),(0,w.jsx)(i.Z,{value:"Boolean",children:"Boolean"})]})]})})]})}),(0,w.jsxs)(C.Z,{children:[(0,w.jsx)(o.Z,{onClick:Ye,variant:"outlined",color:"error",children:"Cancel"}),(0,w.jsx)(o.Z,{onClick:async()=>{if(!U||!U.id)return void console.error("No Parameter selected for update");const e={address:R,parameter_name:L,data_type:q};try{const t=await fetch("http://localhost:5000/parameter/devices/".concat(k,"/parameter/").concat(U.id),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});if(!t.ok)throw new Error("Failed to update Parameter: ".concat(t.statusText));qe({target:{value:k}}),B(!1),J(""),W(""),G(""),re("Parameter updated successfully!")}catch(t){console.error("Error updating Parameter:",t),le("Error updating Parameter. ".concat(t.message))}},variant:"contained",color:"primary",children:"Update"})]})]}),(0,w.jsxs)(Z.Z,{open:ye,onClose:ze,children:[(0,w.jsx)(y.Z,{children:"Delete Parameter"}),(0,w.jsx)(g.Z,{children:(0,w.jsx)("p",{children:"Are you sure you want to delete this Parameter?"})}),(0,w.jsxs)(C.Z,{children:[(0,w.jsx)(o.Z,{onClick:()=>{ge(!1),me(null)},variant:"outlined",color:"error",children:"Cancel"}),(0,w.jsx)(o.Z,{onClick:()=>(async e=>{ge(!1);try{if(k&&e&&e.id){const t=await fetch("http://localhost:5000/parameter/devices/".concat(k,"/parameter/").concat(e.id),{method:"DELETE"});if(!t.ok)throw new Error("Failed to delete parameter: ".concat(t.statusText));re("Parameter deleted successfully!"),le("");const a=await fetch("http://localhost:5000/devices/".concat(k)),s=await a.json();s.device&&Array.isArray(s.device.parameters)?T(s.device.parameters):T([]);const n=await fetch("http://localhost:5000/devices/"),l=await n.json();Array.isArray(l.devices)?r(l.devices):console.error("Invalid response format for devices:",l)}}catch(t){console.error("Error deleting Parameter:",t),le("Error deleting Parameter. ".concat(t.message))}finally{B(!1),O(null)}})(U),variant:"contained",color:"error",children:"Delete"})]})]}),(0,w.jsxs)(Z.Z,{open:Le,onClose:st,children:[(0,w.jsx)(y.Z,{style:{color:"#008080"},children:"Update Attribute"}),(0,w.jsx)(g.Z,{children:(0,w.jsxs)(f.ZP,{container:!0,spacing:2,children:[(0,w.jsx)(f.ZP,{item:!0,xs:6,children:(0,w.jsx)(b.Z,{label:"Name",value:V,onChange:e=>z(e.target.value),fullWidth:!0})}),(0,w.jsx)(f.ZP,{item:!0,xs:6,children:(0,w.jsx)(b.Z,{label:"Value",value:H,onChange:e=>K(e.target.value),fullWidth:!0})})]})}),(0,w.jsxs)(C.Z,{children:[(0,w.jsx)(o.Z,{onClick:st,variant:"outlined",color:"error",children:"Cancel"}),(0,w.jsx)(o.Z,{onClick:async()=>{if(!Re||!Re.id)return void console.error("No Attribute selected for update");const e={name:V,value:H};try{const t=await fetch("http://localhost:5000/attribute/devices/".concat(k,"/attribute/").concat(Re.id),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});if(!t.ok)throw new Error("Failed to update Attribute: ".concat(t.statusText));qe({target:{value:k}}),st(),se("Attribute updated successfully!")}catch(t){console.error("Error updating Attribute:",t),le("Error updating Attribute. ".concat(t.message))}},variant:"contained",color:"primary",children:"Update"})]})]}),(0,w.jsxs)(Z.Z,{open:fe,onClose:ze,children:[(0,w.jsx)(y.Z,{children:"Delete Attribute"}),(0,w.jsx)(g.Z,{children:(0,w.jsx)("p",{children:"Are you sure you want to delete this Attribute?"})}),(0,w.jsxs)(C.Z,{children:[(0,w.jsx)(o.Z,{onClick:()=>{be(!1),Ze(null)},variant:"outlined",color:"error",children:"Cancel"}),(0,w.jsx)(o.Z,{onClick:()=>(async e=>{ge(!1);try{if(k&&e&&e.id){const t=await fetch("http://localhost:5000/attribute/devices/".concat(k,"/attribute/").concat(e.id),{method:"DELETE"});if(!t.ok)throw new Error("Failed to delete Attribute: ".concat(t.statusText));se("Attribute deleted successfully!"),le("");const a=await fetch("http://localhost:5000/devices/".concat(k)),s=await a.json();s.device&&Array.isArray(s.device.attributes)?I(s.device.attributes):I([]);const n=await fetch("http://localhost:5000/devices/"),l=await n.json();Array.isArray(l.devices)?r(l.devices):console.error("Invalid response format for devices:",l)}}catch(t){console.error("Error deleting Attribute:",t),le("Error deleting Attribute. ".concat(t.message))}finally{be(!1),We(!1),Je(null)}})(Re),variant:"contained",color:"error",children:"Delete"})]})]}),(0,w.jsxs)(Z.Z,{open:ke,onClose:Ge,children:[(0,w.jsx)(y.Z,{children:"Update Device"}),(0,w.jsxs)(g.Z,{children:[(0,w.jsx)(b.Z,{label:"Device Name",value:Ee,onChange:e=>De(e.target.value)}),(0,w.jsx)(b.Z,{label:"Slave ID",value:Ne,onChange:e=>Te(e.target.value)})]}),(0,w.jsxs)(C.Z,{children:[(0,w.jsx)(o.Z,{onClick:Ge,variant:"outlined",color:"error",children:"Cancel"}),(0,w.jsx)(o.Z,{onClick:async()=>{try{const e={name:Ee,slave_id:Ne};await fetch("http://localhost:5000/devices/".concat(k),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});const t=await fetch("http://localhost:5000/devices/"),a=await t.json();Array.isArray(a.devices)?(Pe(Ee),Se(Ne),r(a.devices),ee("Device updated successfully!")):console.error("Invalid response format for devices:",a)}catch(e){console.error("Error updating device:",e),le("Error updating device. Please try again.")}finally{we(!1)}},variant:"contained",color:"primary",children:"Update"})]})]}),(0,w.jsxs)(Z.Z,{open:_e,onClose:Ve,children:[(0,w.jsx)(y.Z,{children:"Delete Device"}),(0,w.jsx)(g.Z,{children:(0,w.jsxs)("p",{children:['Are you sure you want to delete "',Ce,'"?']})}),(0,w.jsxs)(C.Z,{children:[(0,w.jsx)(o.Z,{onClick:Ve,variant:"outlined",color:"error",children:"Cancel"}),(0,w.jsx)(o.Z,{onClick:()=>(async e=>{try{await fetch("http://localhost:5000/devices/".concat(e),{method:"DELETE"});const t=await fetch("http://localhost:5000/devices/"),a=await t.json();Array.isArray(a.devices)?(r(a.devices),T([]),D(null),Pe(""),Se("")):console.error("Invalid response format for devices:",a),ee("Device deleted successfully!")}catch(t){console.error("Error deleting device:",t),le("Error deleting device. Please try again.")}finally{Ie(!1),B(!1),O(null)}})(k),variant:"contained",color:"error",children:"Delete"})]})]}),(0,w.jsxs)(Z.Z,{open:oe,onClose:Ke,children:[(0,w.jsx)(y.Z,{children:"Add Device"}),(0,w.jsxs)(g.Z,{children:[(0,w.jsx)(b.Z,{label:"Device Name",value:M,onChange:e=>Q(e.target.value)}),(0,w.jsx)(b.Z,{label:"Slave ID",value:X,onChange:e=>Y(e.target.value)})]}),(0,w.jsxs)(C.Z,{children:[(0,w.jsx)(o.Z,{onClick:Ke,variant:"outlined",color:"error",children:"Cancel"}),(0,w.jsx)(o.Z,{onClick:async()=>{if(M&&X){const t={name:M,slave_id:X};try{if(!(await fetch("http://localhost:5000/devices/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})).ok)throw new Error("Network response was not ok");ee("Device created successfully!"),He(),de(!1);const e=await fetch("http://localhost:5000/devices/"),a=await e.json();Array.isArray(a.devices)?r(a.devices):console.error("Invalid response format for devices:",a)}catch(e){console.error("Error creating device:",e),le("Error creating device. Please try again.")}}else le("Both device name and slave ID are required")},variant:"contained",children:"Create Device"})]})]}),(0,w.jsxs)(Z.Z,{open:he,onClose:Me,children:[(0,w.jsx)(y.Z,{children:"Add Parameter"}),(0,w.jsx)(g.Z,{children:Ue.map(((e,t)=>(0,w.jsxs)(f.ZP,{container:!0,spacing:2,alignItems:"center",children:[(0,w.jsx)(f.ZP,{item:!0,xs:3,children:(0,w.jsx)(b.Z,{label:"Address",value:e.address,onChange:e=>$e(t,"address",e.target.value)})}),(0,w.jsx)(f.ZP,{item:!0,xs:3,children:(0,w.jsx)(b.Z,{label:"Parameter Name",value:e.ParameterName,onChange:e=>$e(t,"ParameterName",e.target.value)})}),(0,w.jsx)(f.ZP,{item:!0,xs:2,children:(0,w.jsxs)(s.Z,{children:[(0,w.jsx)(n.Z,{children:"Data Type"}),(0,w.jsxs)(l.Z,{value:e.data_type,onChange:e=>$e(t,"data_type",e.target.value),children:[(0,w.jsx)(i.Z,{value:"Integer",children:"Integer"}),(0,w.jsx)(i.Z,{value:"Float",children:"Float"}),(0,w.jsx)(i.Z,{value:"Double",children:"Double"}),(0,w.jsx)(i.Z,{value:"Boolean",children:"Boolean"})]})]})}),(0,w.jsx)(f.ZP,{item:!0,xs:1,children:0!==t&&(0,w.jsx)(P.Z,{onClick:()=>(e=>{const t=[...Ue];t.splice(e,1),Oe(t)})(t),children:(0,w.jsx)(S.Z,{style:{color:"red"}})})}),(0,w.jsx)(f.ZP,{item:!0,xs:1,children:t===Ue.length-1&&(0,w.jsx)(P.Z,{onClick:Xe,children:(0,w.jsx)(A.Z,{style:{color:"green"}})})})]},t)))}),(0,w.jsxs)(C.Z,{children:[(0,w.jsx)(o.Z,{onClick:Me,variant:"outlined",color:"error",children:"Cancel"}),(0,w.jsx)(o.Z,{onClick:()=>{if(!k)return void le("Please select a device!");if(Ue.some((e=>!e.address||!e.ParameterName||!e.data_type)))return void le("Please fill in all the required fields for each parameter!");const e={parameters:Ue.map((e=>({active:!0,address:e.address,parameter_name:e.ParameterName,data_type:e.data_type})))};fetch("http://localhost:5000/parameter/devices/".concat(k,"/parameter"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).then((e=>{if(!e.ok)throw new Error("One or more parameters failed to create.")})).then((()=>{re("Parameters created successfully!"),Qe(),ue(!1),qe({target:{value:k}})})).catch((e=>{console.error("Error creating Parameters:",e),le("Error creating Parameters. Please try again.")}))},variant:"contained",children:"Create Parameter"})]})]}),(0,w.jsxs)(Z.Z,{open:xe,onClose:tt,children:[(0,w.jsx)(y.Z,{children:"Add Attribute"}),(0,w.jsx)(g.Z,{children:Fe.map(((e,t)=>(0,w.jsxs)(f.ZP,{container:!0,spacing:2,alignItems:"center",children:[(0,w.jsx)(f.ZP,{item:!0,xs:3,children:(0,w.jsx)(b.Z,{label:"Name",value:e.name,onChange:e=>at(t,"name",e.target.value)})}),(0,w.jsx)(f.ZP,{item:!0,xs:3,children:(0,w.jsx)(b.Z,{label:"Value",value:e.value,onChange:e=>at(t,"value",e.target.value)})}),(0,w.jsx)(f.ZP,{item:!0,xs:1,children:0!==t&&(0,w.jsx)(P.Z,{onClick:()=>(e=>{const t=[...Fe];t.splice(e,1),Be(t)})(t),children:(0,w.jsx)(S.Z,{style:{color:"red"}})})}),(0,w.jsx)(f.ZP,{item:!0,xs:1,children:t===Fe.length-1&&(0,w.jsx)(P.Z,{onClick:rt,children:(0,w.jsx)(A.Z,{style:{color:"green"}})})})]},t)))}),(0,w.jsxs)(C.Z,{children:[(0,w.jsx)(o.Z,{onClick:tt,variant:"outlined",color:"error",children:"Cancel"}),(0,w.jsx)(o.Z,{onClick:()=>{if(!k)return void le("Please select a device!");if(Fe.some((e=>!e.name||!e.value)))return void le("Please fill in all the required fields for each attribute!");const e={attributes:Fe.map((e=>({name:e.name,value:e.value})))};fetch("http://localhost:5000/attribute/devices/".concat(k,"/attribute"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).then((e=>{if(!e.ok)throw new Error("One or more attributes failed to create.")})).then((()=>{se("Attributes created successfully!"),et(),ve(!1),qe({target:{value:k}})})).catch((e=>{console.error("Error creating Attributes:",e),le("Error creating Attributes. Please try again.")}))},variant:"contained",children:"Create Attribute"})]})]})]})},N=()=>(0,w.jsxs)("div",{children:[(0,w.jsx)("h1",{children:"GetDevice"}),(0,w.jsx)(D,{})]})}}]);
//# sourceMappingURL=37.4e1f4cd3.chunk.js.map