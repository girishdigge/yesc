import{a3 as I,r as g,D as _,j as e,B as b,af as n,S as A,U as F,V as m,W as h,X as j,Y as x,I as f,Z as u,T as M,ah as v,a7 as q,a4 as V}from"./index-DN-mAf4Y.js";import{P as k}from"./page-head-D5BIGoK2.js";import{u as K}from"./queries-Bzcr40ob.js";import{E as B,S as L,T as Y,D as O}from"./table-search-input-ncVSseCE.js";import{A as R}from"./alert-modal-DdYRKBeq.js";import{D as U,c as $,d as z,f as H,e as N,B as G}from"./dropdown-menu-DdkXt94Q.js";import{d as J,c as W}from"./todoAPI-CYFV_bn3.js";import{A as E,T as X}from"./auth-ChqoGKGZ.js";import{P as Z}from"./popup-modal-Cmto1Kyc.js";import{H as Q}from"./heading-Br6um3JW.js";import{b as ee}from"./formOptions-DVbo6krV.js";import{e as se}from"./projectAPI-B1wKE3EO.js";import{S as T,a as S,b as C,c as D,d as y}from"./select-epCCGX6U.js";import{D as ae}from"./data-table-skeleton-CEfORr93.js";import{B as re}from"./breadcrumbs-CG__nhQk.js";import"./index-BeWjbtXO.js";import"./scroll-area-B0bIr-0L.js";import"./chevron-left-AS5Mrr7-.js";import"./dialog-ILnS8yC2.js";import"./index-CxHxVwNh.js";import"./Combination-BGKLfQOr.js";import"./index-VWaDGczM.js";const te=({data:t})=>{const{role:o}=E(),c=I(),[i]=g.useState(!1),[p,r]=g.useState(!1),l=_(),a=async()=>{await J(t.id),r(!1),c("/todos"),window.location.reload()};return e.jsxs(e.Fragment,{children:[e.jsx(R,{isOpen:p,onClose:()=>r(!1),onConfirm:a,loading:i}),e.jsxs(U,{modal:!1,children:[e.jsx($,{asChild:!0,children:e.jsxs(b,{variant:"ghost",className:"h-8 w-8 p-0",children:[e.jsx("span",{className:"sr-only",children:"Open menu"}),e.jsx(B,{className:"h-4 w-4"})]})}),e.jsxs(z,{align:"end",children:[e.jsx(H,{children:"Actions"}),e.jsxs(N,{onClick:()=>l.push(`/todos/details/${t.id}`),children:[e.jsx(G,{className:"mr-2 h-4 w-4"})," Details"]}),e.jsxs(N,{onClick:()=>l.push(`/todos/update/${t.id}`),children:[e.jsx(L,{className:"mr-2 h-4 w-4"})," Update"]}),o==="root"&&e.jsxs(N,{onClick:()=>r(!0),children:[e.jsx(X,{className:"mr-2 h-4 w-4"})," Delete"]})]})]})]})},oe=[{accessorKey:"id",header:"ID"},{accessorKey:"Project_Name",header:"PROJECT"},{accessorKey:"Title",header:"TITLE"},{accessorKey:"Description",header:"DESCRIPTION"},{accessorKey:"Inhouse_Engineer",header:"ENGINEER"},{accessorKey:"Deadline",header:"DEADLINE"},{accessorKey:"Status",header:"STATUS"},{header:"Actions",id:"actions",cell:({row:t})=>e.jsx(te,{data:t.original})}],ne=n.object({Title:n.string({required_error:"Title required"}).min(1,{message:"title is should be at least 1 character"}),Description:n.string().optional(),Project_Id:n.string().optional(),Project_Name:n.string({required_error:"Project Name is required"}).min(1,{message:"title is should be at least 1 character"}),Inhouse_Engineer:n.string({required_error:"Engineer is required"}).min(1,{message:"title is should be at least 1 character"}),Status:n.string({required_error:"Status is required"}).min(1,{message:"Status should be at least 1 character"}),Deadline:n.string().refine(t=>/^\d{4}-\d{2}-\d{2}$/.test(t),{message:"Date should be in the format YYYY-MM-DD"})}),ie=({modalClose:t})=>{const[o,c]=g.useState([]),[i,p]=g.useState([]),r=A({resolver:M(ne),defaultValues:{}}),l=async a=>{var d,P,w;a.Project_Id=(d=a==null?void 0:a.Project_Name)==null?void 0:d.split(",")[1],a.Project_Name=(P=a==null?void 0:a.Project_Name)==null?void 0:P.split(",")[0];const s=await W(a);(s==null?void 0:s.status)===201&&(console.log(s==null?void 0:s.data),v({title:(w=s==null?void 0:s.data)==null?void 0:w.message,description:"Project Created Successfully!"})),window.location.reload()};return g.useEffect(()=>{(async()=>{const s=await q();c(s);const d=await se();p(d)})()},[]),e.jsxs("div",{className:"px-2",children:[e.jsx(Q,{title:"Create Todo",description:"",className:"space-y-2 py-8 text-center"}),e.jsx(F,{...r,children:e.jsxs("form",{onSubmit:r.handleSubmit(l),className:"space-y-10",autoComplete:"off",children:[e.jsxs("div",{className:"grid gap-y-4",children:[e.jsxs("div",{className:"grid grid-cols-1 gap-x-4 gap-y-4",children:[e.jsx(m,{control:r.control,name:"Title",render:({field:a})=>e.jsxs(h,{children:[e.jsx(j,{children:"Title"}),e.jsx(x,{children:e.jsx(f,{placeholder:"Title",...a,className:" px-4 py-6 shadow-inner drop-shadow-xl"})}),e.jsx(u,{})]})}),e.jsx(m,{control:r.control,name:"Description",render:({field:a})=>e.jsxs(h,{children:[e.jsx(j,{children:"Description"}),e.jsx(x,{children:e.jsx(f,{placeholder:"Description",...a,className:" px-4 py-6 shadow-inner drop-shadow-xl"})}),e.jsx(u,{})]})})]}),e.jsxs("div",{className:" grid grid-cols-2 gap-x-8 gap-y-4",children:[e.jsx(m,{control:r.control,name:"Project_Name",render:({field:a})=>e.jsxs(h,{children:[e.jsx(j,{children:"Select Project"}),e.jsx(x,{children:e.jsxs(T,{onValueChange:a.onChange,defaultValue:a.value,children:[e.jsx(S,{children:e.jsx(C,{placeholder:"Select Project"})}),e.jsx(D,{children:i==null?void 0:i.map(s=>e.jsx(y,{value:(s==null?void 0:s.Project_Name)+","+(s==null?void 0:s.id),children:s==null?void 0:s.Project_Name},s==null?void 0:s.id))})]})}),e.jsx(u,{})]})}),e.jsx(m,{control:r.control,name:"Inhouse_Engineer",render:({field:a})=>e.jsxs(h,{children:[e.jsx(j,{children:"Assign Inhouse Engineer"}),e.jsx(x,{children:e.jsxs(T,{onValueChange:a.onChange,defaultValue:a.value,children:[e.jsx(S,{children:e.jsx(C,{placeholder:"Select Inhouse Engineer"})}),e.jsx(D,{children:o==null?void 0:o.map(s=>e.jsx(y,{value:s==null?void 0:s.username,children:s==null?void 0:s.full_name},s==null?void 0:s.id))})]})}),e.jsx(u,{})]})})]}),e.jsxs("div",{className:" grid grid-cols-2 gap-x-8 gap-y-4",children:[e.jsx(m,{control:r.control,name:"Deadline",render:({field:a})=>e.jsxs(h,{children:[e.jsx(j,{children:"Deadline"}),e.jsx(x,{children:e.jsx(f,{type:"date",...a})}),e.jsx(u,{})]})}),e.jsx(m,{control:r.control,name:"Status",render:({field:a})=>e.jsxs(h,{children:[e.jsx(j,{children:"Status"}),e.jsx(x,{children:e.jsxs(T,{onValueChange:a.onChange,defaultValue:a.value,children:[e.jsx(S,{children:e.jsx(C,{placeholder:"Status"})}),e.jsx(D,{children:ee.map(s=>e.jsx(y,{value:s,children:s},s))})]})}),e.jsx(u,{})]})})]})]}),e.jsxs("div",{className:" flex items-center justify-center gap-4",children:[e.jsx(b,{type:"button",variant:"secondary",className:"rounded-full ",size:"lg",onClick:t,children:"Cancel"}),e.jsx(b,{type:"submit",className:"rounded-full",size:"lg",children:"Create Todo"})]})]})})]})},ce=ie;function le(){const{isAdmin:t}=E();return e.jsxs("div",{className:"flex items-center justify-between gap-2 py-5",children:[e.jsx("div",{className:"flex flex-1 gap-4",children:e.jsx(Y,{placeholder:"Search Todos "})}),e.jsx("div",{className:"flex gap-3",children:t&&e.jsx(Z,{title:"Todo",renderModal:o=>e.jsx(ce,{modalClose:o})})})]})}function de({todos:t,pageCount:o}){return e.jsxs(e.Fragment,{children:[e.jsx(le,{}),t&&e.jsx(O,{columns:oe,data:t,pageCount:o})]})}function Me(){const[t]=V(),o=Number(t.get("page")||1),c=Number(t.get("limit")||10),i=t.get("search")||null,p=(o-1)*c,{data:r,isLoading:l}=K(p,c,i),a=r==null?void 0:r.todos,s=r==null?void 0:r.totalTodos,d=r==null?void 0:r.pageCount;return l?e.jsx("div",{className:"p-5",children:e.jsx(ae,{columnCount:10,filterableColumnCount:2,searchableColumnCount:1})}):e.jsxs("div",{className:"p-4 md:p-8",children:[e.jsx(k,{title:"Todo Management | YSEC"}),e.jsx("div",{className:"flex justify-between",children:e.jsx(re,{items:[{title:"Dashboard",link:"/"},{title:"Todos",link:"/todos"}]})}),e.jsx(de,{todos:a,page:o,totalTodos:s,pageCount:d})]})}export{Me as default};