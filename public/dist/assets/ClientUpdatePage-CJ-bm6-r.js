import{af as n,D as u,a3 as g,a8 as j,S as N,r as y,j as e,B as p,U as w,V as i,W as l,X as t,Y as o,I as c,Z as d,am as _,T as C}from"./index-Cmx8tmCA.js";import{B as b}from"./breadcrumbs-DFTZUQU8.js";import{P as k}from"./page-container-D0_64C1B.js";import{H as v}from"./heading-BhocicoW.js";import{b as F,u as E}from"./clientAPI-CgftSYDt.js";import{C as B}from"./chevron-left-ehNR0xsy.js";import"./index-B7XoVwBY.js";import"./scroll-area-C6kJR1FW.js";const P=n.object({first_name:n.string({required_error:"First name is required"}).min(1,{message:"firstname is should be at least 1 character"}),middle_name:n.string().optional(),last_name:n.string().min(1,{message:"lastname is required"}),location:n.string().optional(),firm:n.string().optional(),email:n.string().optional(),phone:n.string().optional(),remarks:n.string().optional()}),U=()=>{const m=u(),x=g(),{id:h}=j(),a=N({resolver:C(P),defaultValues:{first_name:"",middle_name:"",last_name:"",email:"",phone:"",firm:"",location:"",remarks:""}});y.useEffect(()=>{(async()=>{const r=await F(h);r&&a.reset({first_name:r.first_name,middle_name:r.middle_name,last_name:r.last_name,email:r.email,phone:r.phone,firm:r.firm,location:r.location,remarks:r.remarks})})()},[h,a]);const f=async s=>{await E(h,s),x("/clients")};return e.jsxs("div",{className:"container mx-auto py-10",children:[e.jsxs("div",{className:"flex justify-between gap-3",children:[e.jsx(v,{title:"Update Client",description:"Edit client details"}),e.jsxs(p,{onClick:()=>m.back(),children:[e.jsx(B,{className:"h-4 w-4"}),"Back"]})]}),e.jsx(w,{...a,children:e.jsxs("form",{onSubmit:a.handleSubmit(f),className:"mt-12 space-y-12",autoComplete:"off",children:[e.jsxs("div",{className:"grid gap-y-4",children:[e.jsxs("div",{className:"grid grid-cols-3 gap-x-4 gap-y-4",children:[e.jsx(i,{control:a.control,name:"first_name",render:({field:s})=>e.jsxs(l,{children:[e.jsx(t,{id:"first_name",children:"First Name"}),e.jsx(o,{children:e.jsx(c,{placeholder:"Firstname",...s,className:"px-4 py-6 shadow-inner drop-shadow-xl"})}),e.jsx(d,{})]})}),e.jsx(i,{control:a.control,name:"middle_name",render:({field:s})=>e.jsxs(l,{children:[e.jsx(t,{id:"middle_name",children:"Middle Name"}),e.jsx(o,{children:e.jsx(c,{placeholder:"Middlename",...s,className:"px-4 py-6 shadow-inner drop-shadow-xl"})}),e.jsx(d,{})]})}),e.jsx(i,{control:a.control,name:"last_name",render:({field:s})=>e.jsxs(l,{children:[e.jsx(t,{id:"last_name",children:"Last Name"}),e.jsx(o,{children:e.jsx(c,{placeholder:"Lastname",...s,className:"px-4 py-6 shadow-inner drop-shadow-xl"})}),e.jsx(d,{})]})})]}),e.jsxs("div",{className:"grid grid-cols-2 gap-x-8 gap-y-4",children:[e.jsx(i,{control:a.control,name:"email",render:({field:s})=>e.jsxs(l,{children:[e.jsx(t,{id:"email",children:"Email"}),e.jsx(o,{children:e.jsx(c,{placeholder:"Enter email",...s,className:"px-4 py-6 shadow-inner drop-shadow-xl"})}),e.jsx(d,{})]})}),e.jsx(i,{control:a.control,name:"phone",render:({field:s})=>e.jsxs(l,{children:[e.jsx(t,{id:"phone",children:"Phone"}),e.jsx(o,{children:e.jsx(c,{placeholder:"Enter phone",...s,className:"px-4 py-6 shadow-inner drop-shadow-xl"})}),e.jsx(d,{})]})}),e.jsx(i,{control:a.control,name:"firm",render:({field:s})=>e.jsxs(l,{children:[e.jsx(t,{id:"firm",children:"Firm"}),e.jsx(o,{children:e.jsx(c,{placeholder:"Enter firm",...s,className:"px-4 py-6 shadow-inner drop-shadow-xl"})}),e.jsx(d,{})]})}),e.jsx(i,{control:a.control,name:"location",render:({field:s})=>e.jsxs(l,{children:[e.jsx(t,{id:"location",children:"Location"}),e.jsx(o,{children:e.jsx(c,{placeholder:"Enter location",...s,className:"px-4 py-6 shadow-inner drop-shadow-xl"})}),e.jsx(d,{})]})})]}),e.jsx("div",{className:"grid grid-cols-2 gap-x-8 gap-y-4",children:e.jsx(i,{control:a.control,name:"remarks",render:({field:s})=>e.jsxs(l,{children:[e.jsx(t,{id:"remarks",children:"Remarks"}),e.jsx(o,{children:e.jsx(_,{placeholder:"Enter remarks",...s,className:"px-4 py-6 shadow-inner drop-shadow-xl"})}),e.jsx(d,{})]})})})]}),e.jsxs("div",{className:"flex items-center justify-center gap-4",children:[e.jsx(p,{type:"button",variant:"secondary",className:"rounded-full",size:"lg",onClick:()=>x("/client"),children:"Cancel"}),e.jsx(p,{type:"submit",variant:"default",className:"rounded-full",size:"lg",children:"Update"})]})]})})]})},I=U;function H(){const{id:m}=j(),x=[{title:"Dashboard",link:"/"},{title:"Clients",link:"/clients"},{title:`${m}`,link:`/clients/${m}`}];return e.jsx(k,{scrollable:!0,children:e.jsxs("div",{className:"space-y-2",children:[e.jsx(b,{items:x}),e.jsx(I,{})]})})}export{H as default};