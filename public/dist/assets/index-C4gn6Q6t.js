import{t as v,r as d,v as N,w as S,j as e,F as k,x as m,y as x,z as u,A as h,I as g,D as j,B as F,E as L,G as p,L as E,i as I,H as T}from"./index-BB6X3njJ.js";import{a as P}from"./axios-Cm0UX6qg.js";import{j as U}from"./index-VWaDGczM.js";const q="http://16.171.13.100";async function z(o){try{return(await P.post(`${q}/auth`,o)).data}catch(s){console.log(s)}}const B=L({username:p().min(1,{message:"Username is required"}),password:p().min(1,{message:"Password is required"})});function C(){const o=v(),[s,c]=d.useState(!1),[i,n]=d.useState(null),t=N({resolver:S(B)}),f=async r=>{c(!0),n(null);try{const l=await z(r),a=l;if(l){localStorage.setItem("accessToken",a.accessToken);const w=U(a.accessToken),{username:y,role:b}=w.UserInfo;localStorage.setItem("username",y),localStorage.setItem("role",b),console.log("Login successful:",a.accessToken),o.push("/")}else n(a.message||"Login failed")}catch{n("Something went wrong. Please try again later.")}finally{c(!1)}};return e.jsx(e.Fragment,{children:e.jsx(k,{...t,children:e.jsxs("form",{onSubmit:t.handleSubmit(f),className:"w-full space-y-2",children:[e.jsx(m,{control:t.control,name:"username",render:({field:r})=>e.jsxs(x,{children:[e.jsx(u,{children:"Username"}),e.jsx(h,{children:e.jsx(g,{type:"text",placeholder:"Enter your username",disabled:s,...r})}),e.jsx(j,{})]})}),e.jsx(m,{control:t.control,name:"password",render:({field:r})=>e.jsxs(x,{children:[e.jsx(u,{children:"Password"}),e.jsx(h,{children:e.jsx(g,{type:"password",placeholder:"Enter your password",disabled:s,...r})}),e.jsx(j,{})]})}),i&&e.jsx("p",{className:"text-red-500",children:i}),e.jsx(F,{disabled:s,className:"ml-auto w-full text-base",type:"submit",children:s?"Signing in...":"Sign In"})]})})})}function M(){return e.jsxs("div",{className:"relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0",children:[e.jsx(E,{to:"/",className:I(T({variant:"ghost"}),"absolute right-4 top-4 hidden md:right-8 md:top-8"),children:"Login"}),e.jsxs("div",{className:"relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r  lg:flex",children:[e.jsx("div",{className:"absolute inset-0 bg-primary dark:bg-secondary"}),e.jsxs("div",{className:"relative z-20 flex items-center text-lg font-medium",children:[e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"mr-2 h-6 w-6",children:e.jsx("path",{d:"M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"})}),"YSEC"]}),e.jsx("div",{className:"relative z-20 mt-auto",children:e.jsxs("blockquote",{className:"space-y-2",children:[e.jsx("p",{className:"text-lg",children:"“Yash sale Engineer and contractors”"}),e.jsx("footer",{className:"ml-2 text-sm",children:" Solapur."})]})})]}),e.jsx("div",{className:"flex h-1/2 justify-center p-8 lg:p-8",children:e.jsxs("div",{className:"mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]",children:[e.jsxs("div",{className:"flex flex-col space-y-2 text-center",children:[e.jsx("h1",{className:"text-2xl font-semibold tracking-tight",children:"Login"}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"Enter username password below to login."})]}),e.jsx(C,{})]})})]})}export{M as default};