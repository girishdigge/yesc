import{c as l}from"./index-iXFkq3tm.js";import{j as m}from"./index-VWaDGczM.js";/**
 * @license lucide-react v0.358.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h=l("Trash",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}]]),d=()=>{const s=localStorage.getItem("accessToken");let t=!1,o=!1,r=!1;if(s){const n=m(s),{first_name:a,last_name:c,username:i,role:e}=n.UserInfo;return(e==="root"||e==="admin")&&(t=!0),(e==="root"||e==="admin"||e==="senior")&&(r=!0),(e==="root"||e==="admin"||e==="engineer")&&(o=!0),console.log(e,t,o,r),{first_name:a,last_name:c,username:i,role:e,isAdmin:t,isEngineer:o,isSenior:r}}return{username:"",role:""}},p=d;export{p as A,h as T};
