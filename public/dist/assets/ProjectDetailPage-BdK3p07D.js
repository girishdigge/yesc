import{O as u,r as c,t as j,j as e,B as v}from"./index-BB6X3njJ.js";import{B as _}from"./breadcrumbs-RVjN4Hlb.js";import{P as p}from"./page-container-BbHTN7Xu.js";import{H as S}from"./heading-CM_0-Vep.js";import{C as P,a as k,d as y}from"./card-D6jxzYda.js";import{b as g}from"./projectAPI-Cmn6CIod.js";import{C}from"./chevron-left-DHzp5AQW.js";import{d as t}from"./index-C6Wfymb1.js";import{a as E}from"./todoAPI-Cfj5uBOX.js";import{C as h}from"./circle-check-CYCZSC41.js";import"./index-BYsGAs3W.js";import"./scroll-area-BJ_NemdG.js";import"./axios-Cm0UX6qg.js";import"./index-DR7Ejryv.js";function T(){const{id:r}=u(),[s,l]=c.useState(),x=j();return c.useEffect(()=>{(async()=>{const m=await g(r);l(m)})()},[r]),e.jsxs("div",{className:"p-10",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx(S,{title:"Project Details"}),e.jsx("div",{className:"flex justify-end gap-3",children:e.jsxs(v,{onClick:()=>x.back(),children:[e.jsx(C,{className:"h-4 w-4"}),"Back"]})})]}),e.jsxs("div",{className:"grid grid-cols-1 gap-6 py-6 lg:grid-cols-4",children:[e.jsx("div",{className:"col-span-1 flex flex-col gap-6 lg:col-span-1"}),e.jsxs(P,{className:"col-span-1 bg-secondary shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] drop-shadow-sm lg:col-span-4",children:[e.jsx(k,{className:"text-xl font-bold",children:e.jsxs("div",{className:"flex gap-2",children:[e.jsx("p",{children:s==null?void 0:s.Project_Name}),e.jsxs("p",{children:["(",s==null?void 0:s.Project_Job_Type,")"]})]})}),e.jsx(y,{children:e.jsxs("div",{className:"mt-4 grid gap-y-4 md:grid-cols-2",children:[e.jsxs("div",{children:[e.jsx("p",{className:"font-bold",children:"Architect Name"}),e.jsx("p",{className:"text-muted-foreground",children:s==null?void 0:s.ArchitectName})]}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold",children:"Engineer Name"}),e.jsx("p",{className:"text-muted-foreground",children:s==null?void 0:s.EngineerName})]}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold",children:"Architect Email"}),e.jsx("p",{className:"text-muted-foreground",children:s==null?void 0:s.ArEmail})]}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold",children:"Engineer Email"}),e.jsx("p",{className:"text-muted-foreground",children:s==null?void 0:s.ErEmail})]}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold",children:"Firm Name"}),e.jsx("p",{className:"text-muted-foreground",children:s==null?void 0:s.FirmName})]}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold",children:"Contact Details"}),e.jsx("p",{className:"text-muted-foreground",children:s==null?void 0:s.ContactDetails})]}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold",children:"Project Job Number"}),e.jsx("p",{className:"text-muted-foreground",children:s==null?void 0:s.Project_Job_Number})]}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold",children:"Assigned Date"}),e.jsx("p",{className:"text-muted-foreground",children:new Date(s==null?void 0:s.Assigned_Date).toLocaleDateString()})]}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold",children:"Project Address"}),e.jsx("p",{className:"text-muted-foreground",children:s==null?void 0:s.Project_Address})]}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold",children:"Project Status"}),e.jsx("p",{className:"text-muted-foreground",children:s==null?void 0:s.Project_Status})]}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold",children:"Client"}),e.jsx("p",{className:"text-muted-foreground",children:s==null?void 0:s.Client})]}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold",children:"In-house Engineer"}),e.jsx("p",{className:"text-muted-foreground",children:s==null?void 0:s.Inhouse_Engineer})]}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold",children:"Number of Floors"}),e.jsx("p",{className:"text-muted-foreground",children:s==null?void 0:s.No_of_Floors})]}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold",children:"Building Status"}),e.jsx("p",{className:"text-muted-foreground",children:(s==null?void 0:s.Building_Status)==="Multiple Floors"?(s==null?void 0:s.Completed_Floors)+" floors were completed":s==null?void 0:s.Building_Status})]}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold",children:"Tank Information"}),e.jsxs("p",{className:"text-muted-foreground",children:["Overhead Tank: ",s!=null&&s.Overhead_Tank?"Yes":"No",",",(s==null?void 0:s.Overhead_Tank)&&e.jsxs(e.Fragment,{children:[" ","Capacity: ",s==null?void 0:s.Overhead_Tank_Capacity," , Position:"," ",s==null?void 0:s.Overhead_Tank_Position]}),e.jsx("br",{}),"Underground Tank: ",s!=null&&s.Underground_Tank?"Yes":"No",",",(s==null?void 0:s.Underground_Tank)&&e.jsxs(e.Fragment,{children:[" ","Capacity: ",s==null?void 0:s.Underground_Tank_Capacity," , Position:"," ",s==null?void 0:s.Underground_Tank_Position]}),e.jsx("br",{}),"Septic Tank: ",s!=null&&s.Septic_Tank?"Yes":"No",",",(s==null?void 0:s.Septic_Tank)&&e.jsxs(e.Fragment,{children:["Capacity: ",s==null?void 0:s.Septic_Tank_Capacity," , Position:"," ",s==null?void 0:s.Septic_Tank_Position]})]})]}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold",children:"Future Expansion"}),e.jsx("p",{className:"text-muted-foreground",children:s==null?void 0:s.Future_Expantion})]}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold",children:"SBC Number"}),e.jsx("p",{className:"text-muted-foreground",children:s==null?void 0:s.SBC_Number})]}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold",children:"Site Contact Name"}),e.jsx("p",{className:"text-muted-foreground",children:s==null?void 0:s.Site_Person_Name})]}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold",children:"Site Contact Email"}),e.jsx("p",{className:"text-muted-foreground",children:s==null?void 0:s.Site_Email})]}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold",children:"Site Contact Phone 1"}),e.jsx("p",{className:"text-muted-foreground",children:s==null?void 0:s.Site_Phone1})]}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold",children:"Site Contact Phone 2"}),e.jsx("p",{className:"text-muted-foreground",children:s==null?void 0:s.Site_Phone2})]}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold",children:"Owner Name"}),e.jsx("p",{className:"text-muted-foreground",children:s==null?void 0:s.Owner_Name})]}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold",children:"Owner Email"}),e.jsx("p",{className:"text-muted-foreground",children:s==null?void 0:s.Owner_Email})]}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold",children:"Owner Phone 1"}),e.jsx("p",{className:"text-muted-foreground",children:s==null?void 0:s.Owner_Phone1})]}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold",children:"Owner Phone 2"}),e.jsx("p",{className:"text-muted-foreground",children:s==null?void 0:s.Owner_Phone2})]})]})})]})]})]})}function w(r){var o;const s=r.id,[l,x]=c.useState(),[d,m]=c.useState([]),N=localStorage.getItem("username")||"",f=localStorage.getItem("role")||"";return c.useEffect(()=>{(async()=>{const a=await g(s);x(a);const i=await E(0,100,a==null?void 0:a.Project_Name,N,f,a==null?void 0:a.id);console.log(i==null?void 0:i.todos),m(i==null?void 0:i.todos)})()},[s]),e.jsxs(t.VerticalTimeline,{lineColor:"hsl(var(--border))",children:[e.jsxs(t.VerticalTimelineElement,{className:"vertical-timeline-element--work",contentStyle:{background:"hsl(var(--card))",color:"hsl(var(--card-foreground))",border:"1px solid hsl(var(--border))",borderRadius:"var(--radius)",boxShadow:"0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"},contentArrowStyle:{borderRight:"7px solid hsl(var(--card))"},date:l==null?void 0:l.createdAt.slice(0,10),iconStyle:{background:"hsl(var(--primary))",color:"hsl(var(--primary-foreground))"},icon:e.jsx(h,{}),children:[e.jsx("h3",{className:"text-lg font-bold",children:"Project Created"}),e.jsx("div",{className:"project-details",children:e.jsxs("ul",{className:"p-4 text-lg",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Job No : "})," ",l==null?void 0:l.Project_Job_Number]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Project Name : "})," ",l==null?void 0:l.Project_Name]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Inhouse Engineer : "})," ",l==null?void 0:l.Inhouse_Engineer]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Status : "})," ",l==null?void 0:l.Project_Status]})]})})]}),e.jsxs(t.VerticalTimelineElement,{className:"vertical-timeline-element--work",contentStyle:{background:"hsl(var(--card))",color:"hsl(var(--card-foreground))",border:"1px solid hsl(var(--border))",borderRadius:"var(--radius)",boxShadow:"0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"},contentArrowStyle:{borderRight:"7px solid hsl(var(--card))"},date:l==null?void 0:l.createdAt.slice(0,10),iconStyle:{background:"hsl(var(--primary))",color:"hsl(var(--primary-foreground))"},icon:e.jsx(h,{}),children:[e.jsx("h3",{className:"text-lg font-bold",children:"Building Structure"}),e.jsx("div",{className:"project-details",children:e.jsx("ul",{className:"p-4 text-lg",children:(o=l==null?void 0:l.buildingStructure)==null?void 0:o.slice(1).map(n=>e.jsxs("li",{className:"font-medium",children:[e.jsx("strong",{children:n.id}),": ",n.name]},n.id))})})]}),(d==null?void 0:d.length)>0&&d.map(n=>{var a;return e.jsxs(t.VerticalTimelineElement,{className:"vertical-timeline-element--work",contentStyle:{background:"hsl(var(--card))",color:"hsl(var(--card-foreground))",border:"1px solid hsl(var(--border))",borderRadius:"var(--radius)",boxShadow:"0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"},contentArrowStyle:{borderRight:"7px solid hsl(var(--card))"},date:(a=n==null?void 0:n.createdAt)==null?void 0:a.slice(0,10),iconStyle:{background:"hsl(var(--primary))",color:"hsl(var(--primary-foreground))"},icon:e.jsx(h,{}),children:[e.jsxs("h3",{className:"text-lg font-bold",children:["Todo (",n==null?void 0:n.Title,")"]}),e.jsx("div",{className:"project-details",children:e.jsxs("ul",{className:"p-4 text-lg font-medium",children:[e.jsx("li",{children:(n==null?void 0:n.Description)&&e.jsxs("div",{children:[e.jsx("strong",{children:"Description : "})," ",n==null?void 0:n.Project_Name]})}),e.jsxs("li",{children:[e.jsx("strong",{children:"Inhouse Engineer : "})," ",n==null?void 0:n.Inhouse_Engineer]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Senior : "})," ",n==null?void 0:n.Senior]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Status : "})," ",n==null?void 0:n.Status]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Deadline : "})," ",n==null?void 0:n.Deadline]}),e.jsx("li",{children:e.jsxs("div",{children:[e.jsx("strong",{children:"Activities : "}),n==null?void 0:n.Activity.map((i,b)=>e.jsx("li",{className:b%2==0?"bg-muted":"m-1",children:i}))]})})]})})]},n.id)})]})}function M(){const{id:r}=u(),s=[{title:"Dashboard",link:"/"},{title:"Projects",link:"/projects"},{title:`${r}`,link:`/projects/${r}`}];return e.jsxs(p,{scrollable:!0,children:[e.jsxs("div",{className:"space-y-2",children:[e.jsx(_,{items:s}),e.jsx(T,{})]}),e.jsx("div",{className:"mt-8",children:e.jsx(w,{id:r})})]})}export{M as default};