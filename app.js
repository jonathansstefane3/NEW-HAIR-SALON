const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const fmt=n=>'UGX '+n.toLocaleString('en-US');
const dur=m=>m>=60?Math.floor(m/60)+' hr'+(m%60?' '+m%60+' min':''):m+' min';
const SERVICES=[
{id:'cut',cat:'Cuts and styling',name:'Cut and blow-dry',price:35000,mins:60,d:'Shape, wash and a smooth finish.'},
{id:'fade',cat:'Cuts and styling',name:'Barber fade',price:15000,mins:30,d:'Sharp fade with a clean line-up.'},
{id:'kids',cat:'Cuts and styling',name:'Kids’ cut or braids',price:20000,mins:60,d:'Gentle and patient, for ages 3 to 12.'},
{id:'updo',cat:'Cuts and styling',name:'Event updo',price:80000,mins:90,d:'Buns, twists and pinned styles for weddings and parties.'},
{id:'silk',cat:'Cuts and styling',name:'Silk press',price:70000,mins:90,d:'Smooth, bouncy straight hair without a relaxer.'},
{id:'box',cat:'Braids and locs',name:'Box braids',price:120000,mins:240,d:'Neat parts in your chosen length and thickness.'},
{id:'corn',cat:'Braids and locs',name:'Cornrows',price:50000,mins:90,d:'Straight-back or in a pattern of your choice.'},
{id:'twist',cat:'Braids and locs',name:'Twists',price:90000,mins:180,d:'Passion, Senegalese or two-strand twists.'},
{id:'loc',cat:'Braids and locs',name:'Loc retwist',price:60000,mins:90,d:'Tidy roots and a fresh style for your locs.'},
{id:'colour',cat:'Colour and care',name:'Full colour',price:100000,mins:120,d:'Single-shade colour from roots to ends.'},
{id:'hl',cat:'Colour and care',name:'Highlights',price:150000,mins:150,d:'Face-framing or all-over lighter tones.'},
{id:'deep',cat:'Colour and care',name:'Deep conditioning',price:40000,mins:45,d:'Moisture treatment for dry or damaged hair.'},
{id:'ker',cat:'Colour and care',name:'Keratin smoothing',price:180000,mins:180,d:'Reduces frizz for up to three months.'}];
const STYLISTS=[
{id:'stefie',name:'Stefie',role:'Owner. Braids and colour',look:'updo',skin:'#8a5a44'},
{id:'amina',name:'Amina',role:'Cuts and silk press',look:'bob',skin:'#a8714f'},
{id:'grace',name:'Grace',role:'Locs and natural hair',look:'curls',skin:'#6e4332'},
{id:'brian',name:'Brian',role:'Barber. Fades and kids’ cuts',look:'fade',skin:'#7b4d38'}];
const LOOKS=[
{id:'braids',cat:'Braids and locs',name:'Waist-length box braids',svc:'box',bg:['#f7d3e6','#c59be0'],hair:'#241529',skin:'#8a5a44'},
{id:'bob',cat:'Cuts and styling',name:'Blunt chin-length bob',svc:'cut',bg:['#ffe3c4','#f0a8a0'],hair:'#2c1a1e',skin:'#a8714f'},
{id:'curls',cat:'Cuts and styling',name:'Defined natural curls',svc:'deep',bg:['#d5ecd9','#8fcbb0'],hair:'#1f1420',skin:'#6e4332'},
{id:'fade',cat:'Cuts and styling',name:'Skin fade with line-up',svc:'fade',bg:['#cfd9f5','#8ea4e0'],hair:'#1a1220',skin:'#7b4d38'},
{id:'updo',cat:'Cuts and styling',name:'Sleek event updo',svc:'updo',bg:['#f3e2b8','#d9a96a'],hair:'#2b1b2e',skin:'#9a6648'},
{id:'colour',cat:'Colour and care',name:'Copper long layers',svc:'colour',bg:['#ffd9cf','#e88f7b'],hair:'#b4552b',skin:'#c58a63'},
{id:'locs',cat:'Braids and locs',name:'Fresh retwisted locs',svc:'loc',bg:['#e1d5f5','#a98bd6'],hair:'#2a1a22',skin:'#6e4332'},
{id:'blonde',cat:'Colour and care',name:'Honey highlights',svc:'hl',bg:['#d6f0f2','#8dc9d1'],hair:'#7b4a2a',skin:'#a8714f',hl:'#e0ad5b'}];

/* ---- JS-drawn portraits ---- */
function art(l,w=200,h=240){
const c=l.hair,s=l.skin,id='g'+Math.random().toString(36).slice(2,7);
let back='',front='';
switch(l.id){
case 'braids':case 'locs':{
const dash=l.id==='braids'?'stroke-dasharray="7 3"':'';const sw=l.id==='braids'?9:12;
for(let i=0;i<7;i++){const x=64+i*12,len=l.id==='locs'?150+(i%3)*22:205;back+=`<path d="M${x} 70 Q${x+(i-3)*3} 140 ${x+(i-3)*5} ${len}" stroke="${c}" stroke-width="${sw}" fill="none" stroke-linecap="round" ${dash}/>`}
front=`<path d="M60 108 Q58 52 100 50 Q142 52 140 108 Q128 72 100 72 Q72 72 60 108Z" fill="${c}"/>`;break}
case 'bob':back=`<path d="M58 112 Q54 48 100 46 Q146 48 142 112 L146 156 Q100 170 54 156Z" fill="${c}"/>`;front=`<path d="M62 100 Q70 62 100 62 Q130 62 138 100 Q120 78 100 80 Q80 78 62 100Z" fill="${c}"/>`;break;
case 'curls':for(let i=0;i<26;i++){const a=Math.PI+i/25*Math.PI,r=54+(i%3)*5;back+=`<circle cx="${100+Math.cos(a)*r}" cy="${108+Math.sin(a)*r*.95}" r="${13+(i%2)*3}" fill="${c}"/>`}
front=`<path d="M64 100 Q70 66 100 64 Q130 66 136 100 Q118 80 100 82 Q82 80 64 100Z" fill="${c}"/>`;break;
case 'fade':front=`<path d="M64 96 Q64 56 100 54 Q136 56 136 96 Q124 74 100 74 Q76 74 64 96Z" fill="${c}"/><path d="M62 104 Q62 80 66 78 L68 104Z M138 104 Q138 80 134 78 L132 104Z" fill="${c}" opacity=".45"/>`;break;
case 'updo':back=`<circle cx="100" cy="44" r="21" fill="${c}"/>`;front=`<path d="M60 108 Q56 56 100 54 Q144 56 140 108 Q128 76 100 76 Q72 76 60 108Z" fill="${c}"/>`;break;
default:back=`<defs><linearGradient id="${id}h" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c}"/><stop offset="1" stop-color="${l.hl||c}"/></linearGradient></defs><path d="M56 112 Q52 46 100 44 Q148 46 144 112 L152 214 Q100 226 48 214Z" fill="url(#${id}h)"/>`;front=`<path d="M62 100 Q72 60 100 60 Q128 60 138 100 Q118 76 100 78 Q82 76 62 100Z" fill="${c}"/>`}
return `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${l.name||'Stylist portrait'}"><defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${(l.bg||['#f3e6f1','#c9a0dc'])[0]}"/><stop offset="1" stop-color="${(l.bg||['#f3e6f1','#c9a0dc'])[1]}"/></linearGradient></defs><rect width="${w}" height="${h}" fill="url(#${id})"/>${back}<path d="M30 ${h} Q40 178 100 172 Q160 178 170 ${h}Z" fill="#3b2147"/><rect x="88" y="146" width="24" height="32" rx="8" fill="${s}"/><ellipse cx="100" cy="112" rx="38" ry="46" fill="${s}"/>${front}<circle cx="86" cy="112" r="3" fill="#2b1736"/><circle cx="114" cy="112" r="3" fill="#2b1736"/><path d="M88 132 Q100 142 112 132" stroke="#2b1736" stroke-width="3" fill="none" stroke-linecap="round"/></svg>`}

/* ---- state ---- */
let cart=new Set(), svcCat='All', galCat='All', pickedSlot=null, lbLook=null;
const store={get(k){try{return JSON.parse(localStorage.getItem(k))}catch(e){return null}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
const svcById=id=>SERVICES.find(s=>s.id===id);

/* ---- hours ---- */
const HOURS={1:[8,19],2:[8,19],3:[8,19],4:[8,19],5:[8,19],6:[8,18],0:null};
const DAYS=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
function renderHours(){const now=new Date();const h=HOURS[now.getDay()],t=now.getHours()+now.getMinutes()/60;const open=h&&t>=h[0]&&t<h[1];
$('#dot').className='dot'+(open?' on':'');
$('#openTxt').textContent=open?`Open now, until ${h[1]>12?h[1]-12:h[1]}:00 ${h[1]>=12?'pm':'am'}`:'Closed now. Book for later';
$('#hours').innerHTML=[1,2,3,4,5,6,0].map(d=>{const x=HOURS[d];return `<tr class="${d===now.getDay()?'today':''}"><td>${DAYS[d]}</td><td>${x?x[0]+':00 am to '+(x[1]-12)+':00 pm':'Closed'}</td></tr>`}).join('')}

/* ---- services ---- */
function chips(el,cats,cur,fn){el.innerHTML=['All',...cats].map(c=>`<button class="chip" aria-pressed="${c===cur}" data-c="${c}">${c}</button>`).join('');el.onclick=e=>{const b=e.target.closest('.chip');if(b)fn(b.dataset.c)}}
function renderSvc(){const cats=[...new Set(SERVICES.map(s=>s.cat))];chips($('#svcTabs'),cats,svcCat,c=>{svcCat=c;renderSvc()});
$('#svcGrid').innerHTML=SERVICES.filter(s=>svcCat==='All'||s.cat===svcCat).map(s=>`<div class="card ${cart.has(s.id)?'sel':''}"><h3>${s.name}</h3><div class="meta">${s.d}</div><div class="foot"><div><div class="price">${fmt(s.price)}</div><div class="meta">${dur(s.mins)}</div></div><button class="btn sm ${cart.has(s.id)?'':'ghost'}" data-id="${s.id}" aria-pressed="${cart.has(s.id)}">${cart.has(s.id)?'Added ✓':'Add'}</button></div></div>`).join('')}
$('#svcGrid').onclick=e=>{const b=e.target.closest('button[data-id]');if(b)toggle(b.dataset.id)};
function toggle(id,force){if(force===true)cart.add(id);else cart.has(id)?cart.delete(id):cart.add(id);renderSvc();renderCart()}
function renderCart(){const items=[...cart].map(svcById);const p=items.reduce((a,s)=>a+s.price,0),m=items.reduce((a,s)=>a+s.mins,0);
$('#sum').innerHTML=items.length?items.map(s=>`<li><span>${s.name}</span><span>${fmt(s.price)}</span></li>`).join(''):'<li style="color:var(--muted)">Nothing added yet. Choose services above.</li>';
$('#tTime').textContent=items.length?'About '+dur(m):'';$('#tPrice').textContent=items.length?fmt(p):'';
$('#bar').classList.toggle('show',items.length>0);$('#barTxt').textContent=`${items.length} service${items.length>1?'s':''} · ${fmt(p)} · ${dur(m)}`}

/* ---- gallery ---- */
function renderGal(){chips($('#galTabs'),[...new Set(LOOKS.map(l=>l.cat))],galCat,c=>{galCat=c;renderGal()});
$('#gal').innerHTML=LOOKS.filter(l=>galCat==='All'||l.cat===galCat).map(l=>`<button data-l="${l.id}" aria-label="View ${l.name}">${art(l)}<span>${l.name}</span></button>`).join('')}
$('#gal').onclick=e=>{const b=e.target.closest('button[data-l]');if(!b)return;lbLook=LOOKS.find(l=>l.id===b.dataset.l);const s=svcById(lbLook.svc);
$('#lbArt').innerHTML=art(lbLook);$('#lbTitle').textContent=lbLook.name;$('#lbDesc').textContent=`${s.name}: ${fmt(s.price)}, about ${dur(s.mins)}.`;$('#lb').showModal()};
$('#lbClose').onclick=()=>$('#lb').close();
$('#lb').onclick=e=>{if(e.target===$('#lb'))$('#lb').close()};
$('#lbAdd').onclick=()=>{toggle(lbLook.svc,true);$('#lb').close()};

/* ---- team, reviews ---- */
$('#team-grid').innerHTML=STYLISTS.map(s=>`<div class="card"><div class="av">${art({id:s.look,skin:s.skin,hair:'#241529',name:s.name,bg:['#f3e6f1','#c9a0dc']},200,200)}</div><h3>${s.name}</h3><div class="meta">${s.role}</div></div>`).join('');
$('#rev').innerHTML=[['My braids lasted two months and the parts were perfect. I’m booking again.','Naome'],['Quick, friendly and my fade has never been sharper.','Daniel'],['Stefie made my wedding updo feel effortless. Everyone asked who did it.','Ruth']].map(r=>`<div class="card"><p class="quote">“${r[0]}”</p><div class="meta">${r[1]}</div></div>`).join('');

/* ---- booking ---- */
const pad=n=>String(n).padStart(2,'0');
const iso=d=>`${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
const hash=s=>[...s].reduce((a,c)=>(a*31+c.charCodeAt(0))>>>0,7);
const bookings=()=>store.get('stefie-bookings')||[];
$('#stylist').innerHTML='<option value="any">Any available stylist</option>'+STYLISTS.map(s=>`<option value="${s.id}">${s.name}: ${s.role}</option>`).join('');
$('#date').min=iso(new Date());
function renderSlots(){const box=$('#slots'),ds=$('#date').value;pickedSlot=null;
if(!ds){box.innerHTML='<span style="color:var(--muted)">Choose a date to see times.</span>';return}
const d=new Date(ds+'T00:00'),h=HOURS[d.getDay()];
if(!h){box.innerHTML='<span style="color:var(--muted)">We’re closed on Sundays. Try another day.</span>';return}
const st=$('#stylist').value,now=new Date(),taken=bookings().filter(b=>b.date===ds&&(st==='any'||b.stylist===st)).map(b=>b.time);
let out='';for(let t=h[0];t<h[1]-1;t++){const lab=pad(t)+':00';const busy=taken.includes(lab)||hash(ds+st+lab)%5===0||(ds===iso(now)&&t<=now.getHours());
out+=`<button type="button" class="slot" data-t="${lab}" aria-pressed="false" ${busy?'disabled':''}>${lab}</button>`}
box.innerHTML=out}
$('#slots').onclick=e=>{const b=e.target.closest('.slot');if(!b||b.disabled)return;pickedSlot=b.dataset.t;$$('.slot').forEach(x=>x.setAttribute('aria-pressed',x===b))};
$('#date').onchange=$('#stylist').onchange=renderSlots;
function renderMine(){const list=bookings().sort((a,b)=>(a.date+a.time).localeCompare(b.date+b.time));
$('#mine').innerHTML=list.length?list.map(b=>`<div class="bk"><div><strong>${b.date} at ${b.time}</strong> with ${b.stylistName}<br><span style="color:var(--muted);font-size:.9rem">${b.services.join(', ')} · ${fmt(b.total)} · Ref ${b.ref}</span></div><button class="btn ghost sm" data-ref="${b.ref}">Cancel</button></div>`).join(''):'<p style="color:var(--muted);margin:0">No bookings yet.</p>'}
$('#mine').onclick=e=>{const b=e.target.closest('button[data-ref]');if(!b)return;store.set('stefie-bookings',bookings().filter(x=>x.ref!==b.dataset.ref));renderMine();renderSlots()};
$('#form').onsubmit=e=>{e.preventDefault();const out=$('#out'),err=m=>{out.className='msg err';out.textContent=m};
const items=[...cart].map(svcById),name=$('#name').value.trim(),phone=$('#phone').value.trim();
if(!items.length)return err('Add at least one service from the list above.');
if(!$('#date').value)return err('Choose a date.');
if(!pickedSlot)return err('Choose a time.');
if(!name)return err('Enter your name.');
if(phone.replace(/\D/g,'').length<9)return err('Enter a phone number with at least 9 digits.');
const sty=$('#stylist').value,sn=sty==='any'?'first available stylist':STYLISTS.find(s=>s.id===sty).name;
const ref='SF'+Math.random().toString(36).slice(2,6).toUpperCase();
const b={ref,date:$('#date').value,time:pickedSlot,stylist:sty,stylistName:sn,services:items.map(s=>s.name),total:items.reduce((a,s)=>a+s.price,0),name,phone};
store.set('stefie-bookings',[...bookings(),b]);
out.className='msg ok';out.textContent=`Booked, ${name.split(' ')[0]}! ${b.date} at ${b.time} with ${sn}. Your reference is ${ref}.`;
cart.clear();renderSvc();renderCart();renderMine();renderSlots();$('#note').value=''};

$('#theme').onclick=()=>{const r=document.documentElement,dark=r.dataset.theme?r.dataset.theme==='dark':matchMedia('(prefers-color-scheme:dark)').matches;r.dataset.theme=dark?'light':'dark'};
$('#yr').textContent=new Date().getFullYear();
$('#heroArt').innerHTML=art({id:'braids',name:'Illustrated braids',skin:'#8a5a44',hair:'#241529',bg:['#f7d3e6','#b98ad8']},200,250);
renderHours();renderSvc();renderCart();renderGal();renderMine();renderSlots();
