const initialEmployees = [
 {id:1,name:"Olivia Rhye",email:"olivia@company.com",role:"Senior Product Designer",department:"Design",score:96,goals:92,initials:"OR",color:"avatar-pink",status:"Excellent"},
 {id:2,name:"Phoenix Baker",email:"phoenix@company.com",role:"Engineering Lead",department:"Engineering",score:94,goals:88,initials:"PB",color:"avatar-purple",status:"Excellent"},
 {id:3,name:"Lana Steiner",email:"lana@company.com",role:"Marketing Manager",department:"Marketing",score:91,goals:85,initials:"LS",color:"avatar-blue",status:"Excellent"},
 {id:4,name:"Demi Wilkinson",email:"demi@company.com",role:"UX Researcher",department:"Design",score:90,goals:80,initials:"DW",color:"avatar-green",status:"Excellent"},
 {id:5,name:"Candice Wu",email:"candice@company.com",role:"Software Engineer",department:"Engineering",score:87,goals:79,initials:"CW",color:"avatar-yellow",status:"Good"},
 {id:6,name:"Natali Craig",email:"natali@company.com",role:"HR Specialist",department:"Human Resources",score:84,goals:76,initials:"NC",color:"avatar-orange",status:"Good"},
 {id:7,name:"Drew Cano",email:"drew@company.com",role:"Sales Executive",department:"Sales",score:78,goals:67,initials:"DC",color:"avatar-blue",status:"Good"},
 {id:8,name:"Orlando Diggs",email:"orlando@company.com",role:"Finance Analyst",department:"Finance",score:66,goals:55,initials:"OD",color:"avatar-pink",status:"Needs support"}
];
const initialGoals = [
 {id:1,title:"Launch the new customer portal",department:"Engineering",progress:82,owner:"Engineering team",due:"Oct 28, 2026"},
 {id:2,title:"Improve customer satisfaction score",department:"Marketing",progress:68,owner:"Marketing team",due:"Nov 05, 2026"},
 {id:3,title:"Refresh the design system",department:"Design",progress:55,owner:"Design team",due:"Nov 12, 2026"},
 {id:4,title:"Streamline employee onboarding",department:"Human Resources",progress:91,owner:"People team",due:"Oct 22, 2026"}
];
const initialReviews = [
 {employee:1,reviewer:"Alex Morgan",due:"Oct 18, 2026",status:"Completed"},
 {employee:2,reviewer:"Alex Morgan",due:"Oct 20, 2026",status:"Completed"},
 {employee:3,reviewer:"Jordan Lee",due:"Oct 21, 2026",status:"Pending"},
 {employee:4,reviewer:"Jordan Lee",due:"Oct 22, 2026",status:"Completed"},
 {employee:5,reviewer:"Alex Morgan",due:"Oct 24, 2026",status:"Pending"},
 {employee:6,reviewer:"Sam Taylor",due:"Oct 25, 2026",status:"Completed"},
 {employee:7,reviewer:"Sam Taylor",due:"Oct 27, 2026",status:"Pending"},
 {employee:8,reviewer:"Alex Morgan",due:"Oct 29, 2026",status:"Completed"}
];
const palette = ["avatar-purple","avatar-blue","avatar-green","avatar-pink","avatar-yellow","avatar-orange"];
let employees = load("performlyEmployees", initialEmployees);
let goals = load("performlyGoals", initialGoals);
let reviews = load("performlyReviews", initialReviews);
let performanceChart, distributionChart, departmentChart, toastTimer;
const $ = id => document.getElementById(id);
const safe = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function load(key, fallback){try{const v=localStorage.getItem(key);return v?JSON.parse(v):structuredClone(fallback)}catch{return structuredClone(fallback)}}
function persist(){localStorage.setItem("performlyEmployees",JSON.stringify(employees));localStorage.setItem("performlyGoals",JSON.stringify(goals));localStorage.setItem("performlyReviews",JSON.stringify(reviews))}
function initials(name){return name.trim().split(/\s+/).slice(0,2).map(x=>x[0]).join("").toUpperCase()}
function statusFor(score){return score>=90?"Excellent":score>=75?"Good":"Needs support"}
function statusClass(score){return score>=90?"status-excellent":score>=75?"status-good":"status-support"}
function avatarClass(id){return palette[(Number(id)-1)%palette.length]}
function showToast(message){$("toastMessage").textContent=message;$("toast").classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>$("toast").classList.remove("show"),2600)}
function icons(){if(window.lucide)lucide.createIcons()}
function avgScore(){return employees.length?employees.reduce((s,e)=>s+Number(e.score),0)/employees.length:0}
function updateStats(){
 const avg=avgScore(), high=employees.filter(e=>e.score>=90).length, good=employees.filter(e=>e.score>=75&&e.score<90).length, support=employees.filter(e=>e.score<75).length;
 $("totalEmployees").textContent=String(employees.length).padStart(2,"0");$("employeeNavCount").textContent=employees.length;
 $("avgPerformance").textContent=avg.toFixed(1);$("avgProgress").style.width=Math.min(avg,100)+"%";
 $("highPerformers").textContent=high;$("excellentCount").textContent=high;$("goodCount").textContent=good;$("supportCount").textContent=support;
 $("pendingReviews").textContent=String(reviews.filter(r=>r.status==="Pending").length).padStart(2,"0");
 $("reportAvg").innerHTML=avg.toFixed(1)+"<span>/100</span>";$("reportHigh").textContent=high;
}
function renderTopPerformers(){
 const top=[...employees].sort((a,b)=>b.score-a.score).slice(0,4);
 $("topPerformersBody").innerHTML=top.map(e=>`<tr><td><div class="employee-cell"><div class="avatar ${safe(e.color||avatarClass(e.id))}">${safe(e.initials||initials(e.name))}</div><div><strong>${safe(e.name)}</strong><small>${safe(e.role)}</small></div></div></td><td>${safe(e.department)}</td><td><div class="score-cell"><strong>${e.score}</strong><span class="mini-progress"><span style="width:${e.score}%"></span></span></div></td><td><span class="status-pill ${statusClass(e.score)}">${statusFor(e.score)}</span></td></tr>`).join("")||'<tr><td colspan="4">No employees yet.</td></tr>';
}
function renderActivities(){
 const latest=[...employees].sort((a,b)=>b.id-a.id).slice(0,3);
 const activities=[
  {icon:"trophy",text:`<strong>${safe([...employees].sort((a,b)=>b.score-a.score)[0]?.name||"Your team")}</strong> is leading the performance board.`,time:"Just now"},
  {icon:"clipboard-check",text:`Performance data updated for <strong>${employees.length} team members</strong>.`,time:"Today, 10:24 AM"},
  {icon:"target",text:`<strong>${goals.length} team goals</strong> are currently being tracked.`,time:"Yesterday"}
 ];
 $("activityList").innerHTML=activities.map(a=>`<div class="activity-item"><span class="activity-symbol"><i data-lucide="${a.icon}"></i></span><div><p>${a.text}</p><small>${a.time}</small></div></div>`).join("");
}
function renderEmployees(){
 const q=($("employeeSearch")?.value||$("globalSearch")?.value||"").toLowerCase().trim();
 const dep=$("departmentFilter")?.value||"all", sort=$("sortFilter")?.value||"score";
 let list=employees.filter(e=>(dep==="all"||e.department===dep)&&[e.name,e.role,e.department,e.email].some(v=>String(v).toLowerCase().includes(q)));
 list.sort(sort==="name"?(a,b)=>a.name.localeCompare(b.name):sort==="department"?(a,b)=>a.department.localeCompare(b.department): (a,b)=>b.score-a.score);
 $("employeeGrid").innerHTML=list.length?list.map(e=>`<article class="employee-card"><div class="employee-card-top"><div class="avatar ${safe(e.color||avatarClass(e.id))}">${safe(e.initials||initials(e.name))}</div><button class="icon-button" title="Edit employee" data-edit="${e.id}"><i data-lucide="square-pen"></i></button></div><h3>${safe(e.name)}</h3><div class="role">${safe(e.role)}</div><span class="department-tag">${safe(e.department)}</span><div class="employee-card-stats"><div><small>Performance score</small><strong>${e.score}<span> / 100</span></strong><div class="card-progress"><span style="width:${e.score}%"></span></div></div><div><small>Goals completed</small><strong>${e.goals}<span>%</span></strong><div class="card-progress"><span style="width:${e.goals}%;background:linear-gradient(90deg,#7ce0bf,#20b887)"></span></div></div></div><div class="card-actions"><span class="status-pill ${statusClass(e.score)}">${statusFor(e.score)}</span><button class="text-button" data-delete="${e.id}">Remove <i data-lucide="arrow-up-right"></i></button></div></article>`).join(""):'<div class="empty-state no-results">No employees match your search. Try another keyword or add a team member.</div>';
 icons();
}
function renderReviews(){
 $("reviewsBody").innerHTML=reviews.map(r=>{const e=employees.find(x=>x.id===r.employee);if(!e)return"";return `<tr><td><div class="employee-cell"><div class="avatar ${safe(e.color||avatarClass(e.id))}">${safe(e.initials||initials(e.name))}</div><div><strong>${safe(e.name)}</strong><small>${safe(e.role)}</small></div></div></td><td>${safe(r.reviewer)}</td><td>${safe(r.due)}</td><td><span class="review-status ${r.status==="Completed"?"review-done":"review-pending"}">${r.status}</span></td><td><button class="review-action" data-review="${e.id}">${r.status==="Completed"?"View review":"Mark complete"}</button></td></tr>`}).join("");
}
function renderGoals(){
 $("goalList").innerHTML=goals.map(g=>`<article class="goal-item"><div class="goal-item-head"><div><h3>${safe(g.title)}</h3><p>${safe(g.department)} · ${safe(g.owner||g.department+" team")}</p></div><div class="goal-percent">${g.progress}%</div></div><div class="card-progress"><span style="width:${g.progress}%"></span></div><div class="goal-item-foot"><span><i data-lucide="calendar" style="width:11px;vertical-align:middle"></i> Due ${safe(g.due||"To be decided")}</span><span>${g.progress>=100?"Completed":g.progress>=70?"On track":"In progress"}</span></div></article>`).join("")||'<div class="empty-state">No goals yet. Add your first team goal.</div>';
 $("activeGoals").textContent=goals.filter(g=>g.progress<100).length;icons();
}
function renderReports(){
 $("reportsBody").innerHTML=[...employees].sort((a,b)=>b.score-a.score).map(e=>`<tr><td><div class="employee-cell"><div class="avatar ${safe(e.color||avatarClass(e.id))}">${safe(e.initials||initials(e.name))}</div><div><strong>${safe(e.name)}</strong><small>${safe(e.email)}</small></div></div></td><td>${safe(e.department)}</td><td>${safe(e.role)}</td><td><strong>${e.score}/100</strong></td><td>${e.goals}%</td></tr>`).join("");
}
function refresh(){
 employees=employees.map(e=>({...e,status:statusFor(Number(e.score))}));persist();updateStats();renderTopPerformers();renderActivities();renderEmployees();renderReviews();renderGoals();renderReports();updateCharts();icons();
}
function chartDefaults(){return {responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{backgroundColor:"#29243f",padding:10,titleFont:{family:"DM Sans"},bodyFont:{family:"DM Sans"}}},scales:{x:{grid:{display:false},border:{display:false},ticks:{color:"#a4a7b6",font:{family:"DM Sans",size:9}}},y:{min:0,max:100,grid:{color:"#f0eff6",drawTicks:false},border:{display:false},ticks:{stepSize:25,color:"#a4a7b6",font:{family:"DM Sans",size:9},padding:8}}}}}
function updateCharts(){
 if(!window.Chart)return;
 const labels=["May","Jun","Jul","Aug","Sep","Oct"], range=Number($("chartRange")?.value||6);
 if(performanceChart){performanceChart.data.labels=labels.slice(-range);performanceChart.data.datasets[0].data=[74,78,76,82,80,85].slice(-range);performanceChart.data.datasets[1].data=[61,66,68,70,73,76].slice(-range);performanceChart.update()}
 if(distributionChart){distributionChart.data.datasets[0].data=[employees.filter(e=>e.score>=90).length,employees.filter(e=>e.score>=75&&e.score<90).length,employees.filter(e=>e.score<75).length];distributionChart.update()}
 if(departmentChart){const deps=[...new Set(employees.map(e=>e.department))];departmentChart.data.labels=deps;departmentChart.data.datasets[0].data=deps.map(d=>{const arr=employees.filter(e=>e.department===d);return arr.reduce((s,e)=>s+e.score,0)/(arr.length||1)});departmentChart.update()}
}
function initCharts(){
 if(!window.Chart)return;
 Chart.defaults.font.family="'DM Sans', sans-serif";Chart.defaults.color="#a1a4b5";
 performanceChart=new Chart($("performanceChart"),{type:"line",data:{labels:["May","Jun","Jul","Aug","Sep","Oct"],datasets:[{label:"Performance score",data:[74,78,76,82,80,85],borderColor:"#8b6bf0",backgroundColor:"rgba(139,107,240,.10)",fill:true,tension:.42,borderWidth:2.5,pointRadius:3,pointHoverRadius:5,pointBackgroundColor:"#fff",pointBorderWidth:2,pointBorderColor:"#8b6bf0"},{label:"Goal completion",data:[61,66,68,70,73,76],borderColor:"#59d1ae",backgroundColor:"transparent",tension:.42,borderWidth:2.5,pointRadius:3,pointHoverRadius:5,pointBackgroundColor:"#fff",pointBorderWidth:2,pointBorderColor:"#59d1ae"}]},options:chartDefaults()});
 distributionChart=new Chart($("distributionChart"),{type:"doughnut",data:{labels:["Excellent","Good","Needs support"],datasets:[{data:[4,3,1],backgroundColor:["#8b6bf0","#68a5f5","#f6b35e"],borderWidth:0,hoverOffset:5,spacing:4,borderRadius:4}]},options:{responsive:true,maintainAspectRatio:false,cutout:"77%",plugins:{legend:{display:false},tooltip:{backgroundColor:"#29243f",padding:10}}}});
 const options=chartDefaults();options.indexAxis="y";options.scales.x={min:0,max:100,grid:{color:"#f0eff6"},border:{display:false},ticks:{color:"#a4a7b6",font:{size:9}}};options.scales.y={grid:{display:false},border:{display:false},ticks:{color:"#7f8499",font:{size:10}}};
 departmentChart=new Chart($("departmentChart"),{type:"bar",data:{labels:[],datasets:[{label:"Average score",data:[],backgroundColor:["#8b6bf0","#6ba8f5","#5bd1af","#f4b45f","#e98db0","#9aadd8"],borderRadius:6,barThickness:18}]},options});
 updateCharts();
}
function openModal(id){$(id).classList.add("open");document.body.style.overflow="hidden"}
function closeModal(id){$(id).classList.remove("open");document.body.style.overflow=""}
function openEmployeeModal(id=null){
 $("employeeForm").reset();$("editEmployeeId").value="";
 $("modalTitle").textContent=id?"Edit employee":"Add employee";
 if(id){const e=employees.find(x=>x.id===Number(id));if(!e)return;$("editEmployeeId").value=e.id;$("empName").value=e.name;$("empEmail").value=e.email;$("empRole").value=e.role;$("empDepartment").value=e.department;$("empScore").value=e.score;$("empGoals").value=e.goals}
 openModal("employeeModal");
}
function exportCSV(){
 const rows=[["Name","Email","Role","Department","Performance Score","Goals Completed","Status"],...employees.map(e=>[e.name,e.email,e.role,e.department,e.score,e.goals,statusFor(e.score)])];
 const csv=rows.map(r=>r.map(v=>`"${String(v).replace(/"/g,'""')}"`).join(",")).join("\r\n");
 const blob=new Blob(["\ufeff"+csv],{type:"text/csv;charset=utf-8;"}),url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download="performly-employee-performance.csv";a.click();URL.revokeObjectURL(url);showToast("Performance report exported");
}
function showPage(name){
 document.querySelectorAll(".page").forEach(p=>p.classList.remove("active-page"));$("page-"+name)?.classList.add("active-page");
 document.querySelectorAll(".nav-link").forEach(b=>b.classList.toggle("active",b.dataset.page===name));
 const titles={overview:"Overview",employees:"Employees",reviews:"Performance reviews",goals:"Goals & OKRs",reports:"Reports",settings:"Settings"};$("breadcrumbCurrent").textContent=titles[name]||"Overview";
 if(name==="reports")setTimeout(()=>{if(departmentChart)departmentChart.resize()},50);
 $("sidebar").classList.remove("open");window.scrollTo({top:0,behavior:"smooth"});
}
document.querySelectorAll(".nav-link").forEach(b=>b.addEventListener("click",()=>showPage(b.dataset.page)));
document.querySelectorAll("[data-goto]").forEach(b=>b.addEventListener("click",()=>showPage(b.dataset.goto)));
$("menuToggle").addEventListener("click",()=>$("sidebar").classList.toggle("open"));
$("addEmployeeTop").addEventListener("click",()=>openEmployeeModal());$("addEmployeeBtn").addEventListener("click",()=>openEmployeeModal());
$("employeeForm").addEventListener("submit",e=>{
 e.preventDefault();const id=Number($("editEmployeeId").value),data={name:$("empName").value.trim(),email:$("empEmail").value.trim(),role:$("empRole").value.trim(),department:$("empDepartment").value,score:Number($("empScore").value),goals:Number($("empGoals").value)};
 if(!data.name||!data.email||!data.role)return;
 if(id){employees=employees.map(e=>e.id===id?{...e,...data,initials:initials(data.name)}:e);showToast("Employee details updated")}else{const newId=Math.max(0,...employees.map(e=>e.id))+1;employees.push({id:newId,...data,initials:initials(data.name),color:avatarClass(newId)});reviews.push({employee:newId,reviewer:"Alex Morgan",due:"Nov 02, 2026",status:"Pending"});showToast("Employee added successfully")}
 closeModal("employeeModal");refresh();
});
document.addEventListener("click",e=>{
 const edit=e.target.closest("[data-edit]"),del=e.target.closest("[data-delete]"),review=e.target.closest("[data-review]"),close=e.target.closest("[data-close]");
 if(edit)openEmployeeModal(edit.dataset.edit);
 if(del){const id=Number(del.dataset.delete),person=employees.find(x=>x.id===id);if(confirm(`Remove ${person?.name||"this employee"} from the demo directory?`)){employees=employees.filter(x=>x.id!==id);reviews=reviews.filter(x=>x.employee!==id);refresh();showToast("Employee removed")}}
 if(review){const r=reviews.find(x=>x.employee===Number(review.dataset.review));if(r?.status==="Pending"){r.status="Completed";refresh();showToast("Review marked as completed")}else showToast("Review status: Completed")}
 if(close)closeModal(close.dataset.close);
 if(e.target.classList.contains("modal-backdrop"))closeModal(e.target.id);
});
$("employeeSearch").addEventListener("input",renderEmployees);$("departmentFilter").addEventListener("change",renderEmployees);$("sortFilter").addEventListener("change",renderEmployees);
$("globalSearch").addEventListener("input",()=>{const value=$("globalSearch").value;if(value){showPage("employees");$("employeeSearch").value=value;renderEmployees()}else{$("employeeSearch").value="";renderEmployees()}});
$("chartRange").addEventListener("change",updateCharts);
$("exportBtn").addEventListener("click",exportCSV);$("reportsExportBtn").addEventListener("click",exportCSV);
$("reviewNoticeBtn").addEventListener("click",()=>showPage("reviews"));$("dismissNotice").addEventListener("click",()=>$("dismissNotice").parentElement.remove());
$("notificationBtn").addEventListener("click",()=>showToast(`${reviews.filter(r=>r.status==="Pending").length} performance reviews are pending`));
$("tipsBtn").addEventListener("click",()=>showToast("Tip: give feedback that is timely, specific and actionable."));
$("newReviewBtn").addEventListener("click",()=>{const pending=reviews.find(r=>r.status==="Pending");if(pending){showPage("reviews");showToast("Select “Mark complete” to finish a pending review")}else showToast("All reviews are completed!")});
$("addGoalBtn").addEventListener("click",()=>{ $("goalModalTitle").textContent="Add a goal"; openModal("goalModal"); });
$("goalForm").addEventListener("submit",e=>{e.preventDefault();const id=Math.max(0,...goals.map(g=>g.id))+1;goals.push({id,title:$("goalTitle").value.trim(),department:$("goalDepartment").value,progress:Number($("goalProgressInput").value),owner:$("goalDepartment").value+" team",due:"To be decided"});persist();renderGoals();closeModal("goalModal");$("goalForm").reset();showToast("Goal added successfully")});
$("saveSettingsBtn").addEventListener("click",()=>{localStorage.setItem("performlyShowNotice",$("announcementSetting").checked);document.body.classList.toggle("compact-cards",$("compactSetting").checked);localStorage.setItem("performlyCompact",$("compactSetting").checked);showToast("Preferences saved")});
$("resetDataBtn").addEventListener("click",()=>{if(confirm("Reset all demo changes and restore the original sample data?")){employees=structuredClone(initialEmployees);goals=structuredClone(initialGoals);reviews=structuredClone(initialReviews);persist();refresh();showToast("Demo data restored")}});
if(localStorage.getItem("performlyShowNotice")==="false")document.querySelector(".notice-strip").remove();
$("announcementSetting").checked=localStorage.getItem("performlyShowNotice")!=="false";
$("compactSetting").checked=localStorage.getItem("performlyCompact")==="true";document.body.classList.toggle("compact-cards",$("compactSetting").checked);
initCharts();refresh();icons();
