import{P as f,r as c,t as v,j as e,B as N}from"./index-6H5e9l0w.js";import{B as _}from"./breadcrumbs-CyY4bF2v.js";import{P as p}from"./page-container-BpEd2y3f.js";import{H as S}from"./heading-D2ik8sFW.js";import{C as P,a as C,d as k}from"./card-D8_c88x3.js";import{b}from"./projectAPI-Ckeg2yN0.js";import{b as y}from"./api-BsWGTiFV.js";import{C as E}from"./chevron-left-Dn4d5UMm.js";import{d as o}from"./index-kbJyOzOM.js";import{a as T}from"./todoAPI-C5CE0O1H.js";import{C as u}from"./circle-check-WOuAasWw.js";import"./index-CMynADOj.js";import"./scroll-area-u-nMwbqL.js";import"./index-DQDEvldz.js";function w(){const{id:a}=f(),[s,n]=c.useState(),[x,d]=c.useState(""),h=v();return c.useEffect(()=>{(async()=>{const t=await b(a);if(n(t),t.SBC_File!==""){const m=`${y}/uploads/${t.SBC_File}`;d(m)}})()},[a]),e.jsxs("div",{className:"p-10",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx(S,{title:"Project Details"}),e.jsx("div",{className:"flex justify-end gap-3",children:e.jsxs(N,{onClick:()=>h.back(),children:[e.jsx(E,{className:"h-4 w-4"}),"Back"]})})]}),e.jsxs("div",{className:"grid grid-cols-1 gap-6 py-6 lg:grid-cols-4",children:[e.jsx("div",{className:"col-span-1 flex flex-col gap-6 lg:col-span-1"}),e.jsxs(P,{className:"col-span-1 bg-secondary shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] drop-shadow-sm lg:col-span-4",children:[e.jsxs(C,{className:"grid gap-y-4 text-xl font-bold md:grid-cols-2",children:[e.jsxs("div",{className:"mt-2 flex gap-2",children:[e.jsx("p",{children:s==null?void 0:s.Project_Name}),e.jsxs("p",{children:["(",s==null?void 0:s.Project_Job_Type,")"]})]}),e.jsx("div",{children:x&&e.jsx("a",{href:x,target:"_blank",rel:"noopener noreferrer",children:e.jsx(N,{className:"",children:"SBC File"})})})]}),e.jsx(k,{children:e.jsxs("div",{className:"mt-4 grid gap-y-4 md:grid-cols-2",children:[e.jsxs("div",{children:[e.jsx("p",{className:"font-bold",children:"Architect Name"}),e.jsx("p",{className:"text-muted-foreground",children:s==null?void 0:s.ArchitectName})]}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold",children:"Engineer Name"}),e.jsx("p",{className:"text-muted-foreground",children:s==null?void 0:s.EngineerName})]}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold",children:"Architect Email"}),e.jsx("p",{className:"text-muted-foreground",children:s==null?void 0:s.ArEmail})]}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold",children:"Engineer Email"}),e.jsx("p",{className:"text-muted-foreground",children:s==null?void 0:s.ErEmail})]}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold",children:"Firm Name"}),e.jsx("p",{className:"text-muted-foreground",children:s==null?void 0:s.FirmName})]}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold",children:"Contact Details"}),e.jsx("p",{className:"text-muted-foreground",children:s==null?void 0:s.ContactDetails})]}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold",children:"Project Job Number"}),e.jsx("p",{className:"text-muted-foreground",children:s==null?void 0:s.Project_Job_Number})]}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold",children:"Assigned Date"}),e.jsx("p",{className:"text-muted-foreground",children:new Date(s==null?void 0:s.Assigned_Date).toLocaleDateString()})]}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold",children:"Project Address"}),e.jsx("p",{className:"text-muted-foreground",children:s==null?void 0:s.Project_Address})]}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold",children:"Project Status"}),e.jsx("p",{className:"text-muted-foreground",children:s==null?void 0:s.Project_Status})]}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold",children:"Client"}),e.jsx("p",{className:"text-muted-foreground",children:s==null?void 0:s.Client})]}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold",children:"In-house Engineer"}),e.jsx("p",{className:"text-muted-foreground",children:s==null?void 0:s.Inhouse_Engineer})]}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold",children:"Number of Floors"}),e.jsx("p",{className:"text-muted-foreground",children:s==null?void 0:s.No_of_Floors})]}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold",children:"Building Status"}),e.jsx("p",{className:"text-muted-foreground",children:(s==null?void 0:s.Building_Status)==="Multiple Floors"?(s==null?void 0:s.Completed_Floors)+" floors were completed":s==null?void 0:s.Building_Status})]}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold",children:"Tank Information"}),e.jsxs("p",{className:"text-muted-foreground",children:["Overhead Tank: ",s!=null&&s.Overhead_Tank?"Yes":"No",",",(s==null?void 0:s.Overhead_Tank)&&e.jsxs(e.Fragment,{children:[" ","Capacity: ",s==null?void 0:s.Overhead_Tank_Capacity," , Position:"," ",s==null?void 0:s.Overhead_Tank_Position]}),e.jsx("br",{}),"Underground Tank: ",s!=null&&s.Underground_Tank?"Yes":"No",",",(s==null?void 0:s.Underground_Tank)&&e.jsxs(e.Fragment,{children:[" ","Capacity: ",s==null?void 0:s.Underground_Tank_Capacity," , Position:"," ",s==null?void 0:s.Underground_Tank_Position]}),e.jsx("br",{}),"Septic Tank: ",s!=null&&s.Septic_Tank?"Yes":"No",",",(s==null?void 0:s.Septic_Tank)&&e.jsxs(e.Fragment,{children:["Capacity: ",s==null?void 0:s.Septic_Tank_Capacity," , Position:"," ",s==null?void 0:s.Septic_Tank_Position]})]})]}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold",children:"Future Expansion"}),e.jsx("p",{className:"text-muted-foreground",children:s==null?void 0:s.Future_Expantion})]}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold",children:"SBC Number"}),e.jsx("p",{className:"text-muted-foreground",children:s==null?void 0:s.SBC_Number})]}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold",children:"Site Contact Name"}),e.jsx("p",{className:"text-muted-foreground",children:s==null?void 0:s.Site_Person_Name})]}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold",children:"Site Contact Email"}),e.jsx("p",{className:"text-muted-foreground",children:s==null?void 0:s.Site_Email})]}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold",children:"Site Contact Phone 1"}),e.jsx("p",{className:"text-muted-foreground",children:s==null?void 0:s.Site_Phone1})]}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold",children:"Site Contact Phone 2"}),e.jsx("p",{className:"text-muted-foreground",children:s==null?void 0:s.Site_Phone2})]}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold",children:"Owner Name"}),e.jsx("p",{className:"text-muted-foreground",children:s==null?void 0:s.Owner_Name})]}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold",children:"Owner Email"}),e.jsx("p",{className:"text-muted-foreground",children:s==null?void 0:s.Owner_Email})]}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold",children:"Owner Phone 1"}),e.jsx("p",{className:"text-muted-foreground",children:s==null?void 0:s.Owner_Phone1})]}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold",children:"Owner Phone 2"}),e.jsx("p",{className:"text-muted-foreground",children:s==null?void 0:s.Owner_Phone2})]})]})})]})]})]})}function A(a){var m;const s=a.id,[n,x]=c.useState(),[d,h]=c.useState([]),g=localStorage.getItem("username")||"",t=localStorage.getItem("role")||"";return c.useEffect(()=>{(async()=>{const r=await b(s);x(r);const i=await T(0,100,r==null?void 0:r.Project_Name,g,t,r==null?void 0:r.id);console.log(i==null?void 0:i.todos),h(i==null?void 0:i.todos)})()},[s]),e.jsxs(o.VerticalTimeline,{lineColor:"hsl(var(--border))",children:[e.jsxs(o.VerticalTimelineElement,{className:"vertical-timeline-element--work",contentStyle:{background:"hsl(var(--card))",color:"hsl(var(--card-foreground))",border:"1px solid hsl(var(--border))",borderRadius:"var(--radius)",boxShadow:"0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"},contentArrowStyle:{borderRight:"7px solid hsl(var(--card))"},date:n==null?void 0:n.createdAt.slice(0,10),iconStyle:{background:"hsl(var(--primary))",color:"hsl(var(--primary-foreground))"},icon:e.jsx(u,{}),children:[e.jsx("h3",{className:"text-lg font-bold",children:"Project Created"}),e.jsx("div",{className:"project-details",children:e.jsxs("ul",{className:"p-4 text-lg",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Job No : "})," ",n==null?void 0:n.Project_Job_Number]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Project Name : "})," ",n==null?void 0:n.Project_Name]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Inhouse Engineer : "})," ",n==null?void 0:n.Inhouse_Engineer]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Status : "})," ",n==null?void 0:n.Project_Status]})]})})]}),e.jsxs(o.VerticalTimelineElement,{className:"vertical-timeline-element--work",contentStyle:{background:"hsl(var(--card))",color:"hsl(var(--card-foreground))",border:"1px solid hsl(var(--border))",borderRadius:"var(--radius)",boxShadow:"0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"},contentArrowStyle:{borderRight:"7px solid hsl(var(--card))"},date:n==null?void 0:n.createdAt.slice(0,10),iconStyle:{background:"hsl(var(--primary))",color:"hsl(var(--primary-foreground))"},icon:e.jsx(u,{}),children:[e.jsx("h3",{className:"text-lg font-bold",children:"Building Structure"}),e.jsx("div",{className:"project-details",children:e.jsx("ul",{className:"p-4 text-lg",children:(m=n==null?void 0:n.buildingStructure)==null?void 0:m.slice(1).map(l=>e.jsxs("li",{className:"font-medium",children:[e.jsx("strong",{children:l.id}),": ",l.name]},l.id))})})]}),(d==null?void 0:d.length)>0&&d.map(l=>{var r;return e.jsxs(o.VerticalTimelineElement,{className:"vertical-timeline-element--work",contentStyle:{background:"hsl(var(--card))",color:"hsl(var(--card-foreground))",border:"1px solid hsl(var(--border))",borderRadius:"var(--radius)",boxShadow:"0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"},contentArrowStyle:{borderRight:"7px solid hsl(var(--card))"},date:(r=l==null?void 0:l.createdAt)==null?void 0:r.slice(0,10),iconStyle:{background:"hsl(var(--primary))",color:"hsl(var(--primary-foreground))"},icon:e.jsx(u,{}),children:[e.jsxs("h3",{className:"text-lg font-bold",children:["Todo (",l==null?void 0:l.Title,")"]}),e.jsx("div",{className:"project-details",children:e.jsxs("ul",{className:"p-4 text-lg font-medium",children:[e.jsx("li",{children:(l==null?void 0:l.Description)&&e.jsxs("div",{children:[e.jsx("strong",{children:"Description : "})," ",l==null?void 0:l.Project_Name]})}),e.jsxs("li",{children:[e.jsx("strong",{children:"Inhouse Engineer : "})," ",l==null?void 0:l.Inhouse_Engineer]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Senior : "})," ",l==null?void 0:l.Senior]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Status : "})," ",l==null?void 0:l.Status]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Deadline : "})," ",l==null?void 0:l.Deadline]}),e.jsx("li",{children:e.jsxs("div",{children:[e.jsx("strong",{children:"Activities : "}),l==null?void 0:l.Activity.map((i,j)=>e.jsx("li",{className:j%2==0?"bg-muted":"m-1",children:i}))]})})]})})]},l.id)})]})}function q(){const{id:a}=f(),s=[{title:"Dashboard",link:"/"},{title:"Projects",link:"/projects"},{title:`${a}`,link:`/projects/${a}`}];return e.jsxs(p,{scrollable:!0,children:[e.jsxs("div",{className:"space-y-2",children:[e.jsx(_,{items:s}),e.jsx(w,{})]}),e.jsx("div",{className:"mt-8",children:e.jsx(A,{id:a})})]})}export{q as default};