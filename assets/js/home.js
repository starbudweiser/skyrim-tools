const $=s=>document.querySelector(s),RM=false;
const nm=(id,c)=>`<i style="color:${c}">${id[0]}</i>${id.slice(1)}`;
const CH=I18N.chaps;
const vf=a=>`<video class="vfx ${a[4]}" src="../assets/video/${a[0]}.mp4#t=${(Math.random()*3).toFixed(1)}" muted loop playsinline preload="none" aria-hidden="true" data-r="${a[6]||1}" style="left:${a[1]}%;top:${a[2]}%;width:${a[3]}%;${a[5]||''}"></video>`;
const spr=a=>{const d=(Math.random()*.6).toFixed(2),im=(c)=>`<img class="spr ${a.kind} ${c}" src="../assets/sprites/${a.file}" alt="" style="left:${a.x}%;top:${a.y}%;width:${a.w}%;--dl:${d}s">`;return a.kind==='orb'?im('')+im('spin')+im('spin2'):im('glow')+im('')};
const sp=a=>{const[t,x,y,c,w]=a,n=t==='orb'?14:t==='fire'?8:t==='torch'?4:t==='embers'?7:0;return `<i class="sp ${t}" style="left:${x}%;top:${y}%;--c:${c};--w:${w}%;animation-delay:${(Math.random()*2).toFixed(2)}s">${Array.from({length:n},()=>`<b style="--dx:${(Math.random()*90-45).toFixed(0)}px;--d:${(Math.random()*2.6).toFixed(2)}s;--t:${(1.8+Math.random()*1.6).toFixed(2)}s"></b>`).join('')}</i>`};
$('#chaps').innerHTML=CH.map(h=>`<section class="chap" id="${h.id}"><header><div class="k rv">${h.k}</div><h2 class="rv">${h.t}</h2><p class="rv">${h.p}</p></header>
<div class="hero-img ${h.cls} rv" data-fx="${h.fx}"><div class="pic" style="background-image:url(../assets/img/${h.img}.jpg)">${(h.spells||[]).map(sp).join('')}${(h.sprites||[]).map(spr).join('')}${(h.vfx||[]).map(vf).join('')}</div><div class="mist"></div><canvas class="fx"></canvas><div class="dof2"></div><div class="dof"></div><div class="chips">${APPS.filter(a=>a.cat===h.cat).map(a=>`<a class="chip" href="#${a.id}"><img src="../assets/icons/${a.id}.png" alt=""><span>${nm(a.id,a.c)}</span></a>`).join('')}</div></div></section>`).join('');
$('#grid').innerHTML=APPS.map((a,i)=>`<article class="tile rv" id="${a.id}" style="--ac:${a.c};--d:${(i%4)*.07}s"><img src="../assets/icons/${a.id}.png" alt="" loading="lazy"><small>${I18N.cats[a.cat]}</small><h3>${nm(a.id,a.c)}</h3><p>${a.d}</p><div class="a"><a href="apps/${a.id}.html">${I18N.more}</a><a href="${GH}${a.repo}/releases/latest">${I18N.download}</a></div></article>`).join('');
$('#logos').innerHTML=APPS.map(a=>`<a href="../assets/icons/${a.id}.png" download><img src="../assets/icons/${a.id}.png" alt="" loading="lazy"><span>${a.id}</span></a>`).join('');
/* éventail d'icônes */
const fan=$('#fan'),n=APPS.length;fan.innerHTML=APPS.map((a,i)=>{const t=i-(n-1)/2;return `<div class="ic" style="--n:${i};--i:${(t*62).toFixed(0)};--j:${(Math.abs(t)**1.6*2.4).toFixed(0)};--r:${(t*2.2).toFixed(1)}"><img src="../assets/icons/${a.id}.png" alt=""></div>`}).join('');
const fit=()=>{const vis=innerWidth<=640?11:n,iw=Math.max(26,Math.min(Math.min(92,Math.max(40,innerWidth*.07)),(innerWidth*.92-40)/(vis*1.08))),stp=iw*1.08;fan.style.setProperty('--iw',iw.toFixed(1)+'px');fan.querySelectorAll('.ic').forEach((e,i)=>{if(i>=vis&&innerWidth<=640)return;const o=innerWidth<=640?(i-(vis-1)/2):i-(n-1)/2;e.style.setProperty('--i',(o*stp).toFixed(0))})};fit();addEventListener('resize',fit,{passive:true});
addEventListener('scroll',()=>{const q=Math.min(1,scrollY/innerHeight);fan.style.setProperty('--sp',(1+q*.3).toFixed(3));fan.style.setProperty('--fy',(q*-24).toFixed(1)+'px')},{passive:true});
/* thème */
$('#tg').onclick=()=>{const t=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=t;try{localStorage.setItem('theme-b',t)}catch(e){}};
/* révélations */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.rv').forEach(el=>io.observe(el));
/* texte géant */
const st=$('#st');st.innerHTML=st.textContent.split(' ').map(w=>`<span class="w">${w}</span>`).join(' ');const ws=[...st.querySelectorAll('.w')];
/* compteurs */
const co=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;co.unobserve(e.target);const N=+e.target.dataset.n,t0=performance.now();(function f(t){const p=Math.min(1,(t-t0)/1500);e.target.textContent=Math.round(N*(1-Math.pow(1-p,4)));if(p<1)requestAnimationFrame(f)})(t0)}));
document.querySelectorAll('[data-n]').forEach(el=>co.observe(el));
/* défilement : zoom des images, éventail, texte */
const imgs=[...document.querySelectorAll('.hero-img')];
function onScroll(){const vh=innerHeight;
 imgs.forEach(el=>{const r=el.getBoundingClientRect();if(r.bottom<-100||r.top>vh+100)return;const p=(r.top+r.height/2-vh/2)/vh;el.style.setProperty('--z',(1.04+Math.min(1,Math.abs(p))*.12).toFixed(3));el.querySelector('.pic').style.setProperty('--ty',(p*-40).toFixed(1)+'px')});
 const r=st.getBoundingClientRect(),p=Math.min(1,Math.max(0,(vh*.85-r.top)/(r.height+vh*.4)));ws.forEach((w,i)=>w.classList.toggle('on',i/ws.length<p*1.15))}
addEventListener('scroll',onScroll,{passive:true});onScroll();
/* halo sur les tuiles */
document.addEventListener('pointermove',e=>{const c=e.target.closest&&e.target.closest('.tile');if(c){const r=c.getBoundingClientRect();c.style.setProperty('--x',(e.clientX-r.left)+'px');c.style.setProperty('--y',(e.clientY-r.top)+'px')}});
/* liquide */
const lt=$('#lt');let t=0;(function f(){t+=.004;if(!RM)lt.setAttribute('baseFrequency',`${.004+Math.sin(t)*.0012} ${.007+Math.cos(t*.9)*.002}`);requestAnimationFrame(f)})();

/* vidéos des illustrations : lecture seulement à l'écran ; animations CSS en pause hors écran */
(function(){const PERF=window.PERF||(window.PERF=(()=>{const n=navigator,c=n.connection||{},de=document.documentElement,cb=[],qf=new URLSearchParams(location.search).get('fx');
 let t=2,why='';const ST=k=>{try{return localStorage.getItem(k)}catch(e){return null}};
 if(qf!==null&&'012'.includes(qf)&&qf!=='')t=+qf;
 else{const mob=matchMedia('(max-width:820px),(pointer:coarse)').matches;
  let gpu='';try{const g=document.createElement('canvas').getContext('webgl'),x=g&&g.getExtension('WEBGL_debug_renderer_info');gpu=x?String(g.getParameter(x.UNMASKED_RENDERER_WEBGL)):g?'':'none'}catch(e){gpu='none'}
  const saf=/^((?!chrome|chromium|android).)*safari/i.test(n.userAgent);const soft=/swiftshader|llvmpipe|software|basic render|microsoft basic/i.test(gpu),cores=saf?Math.max(8,n.hardwareConcurrency||0):(n.hardwareConcurrency||4),mem=n.deviceMemory||8,px=screen.width*(devicePixelRatio||1)*screen.height*(devicePixelRatio||1);
  /* cœurs et mémoire annoncés ne sont pas fiables (Brave et Safari les brouillent pour limiter le pistage) : on ne s'en sert plus ; mobile, économie de données et GPU logiciel coupent les effets, la surveillance de fluidité fait le reste */
  if(mob||c.saveData||matchMedia('(prefers-reduced-data: reduce)').matches||soft){t=0;why=mob?'mobile':soft?'gpu':'eco'}
  try{const k=+sessionStorage.getItem('perf-cap2');if(k>=0&&k<t&&sessionStorage.getItem('perf-cap2')!==null)t=k}catch(e){}}
 const P={tier:t,why,dbg:{gpu:typeof gpu==='undefined'?'':gpu,cores:n.hardwareConcurrency,mem:n.deviceMemory},on:f=>cb.push(f),set(v){if(v>=P.tier)return;P.tier=v;de.dataset.perf=v;try{sessionStorage.setItem('perf-cap2',v)}catch(e){}cb.forEach(f=>f(v))}};
 de.dataset.perf=t;
 /* surveillance : si l'affichage tombe sous 30 images/s sur trois fenêtres de 2 s d'affilée (page au premier plan), on retire un niveau d'effets pour la session (jamais l'inverse) */
 if(qf===null||qf===''){let f=0,t0=0,bad=0,last=0;const loop=now=>{if(P.tier<1)return;if(document.hidden||!document.hasFocus()||now-last>250){f=0;t0=now;last=now;requestAnimationFrame(loop);return}last=now;f++;
   if(!t0)t0=now;if(now-t0>=2000){const fps=f*1000/(now-t0);bad=fps<30?bad+1:0;f=0;t0=now;if(bad>=3){bad=0;P.set(P.tier-1)}}requestAnimationFrame(loop)};
  setTimeout(()=>requestAnimationFrame(loop),2500)}
 return P})());

const RMx=false;  /* animations gardées même avec « Réduire les animations » (choix du 03/11/2026) */
/* dragon du hero : 3 versions (near détaillée et nette, mid, far voilée), vols aléatoires sur une courbe de Bézier à vitesse constante,
   plus rapide quand il est proche, inclinaison selon la pente, retourné selon le sens */
const wv=[...document.querySelectorAll('.wyrm img')];if(wv.length){const box=wv[0].parentElement,R=Math.random,U=(a,b)=>a+(b-a)*R(),bz=(p,t)=>{const u=1-t;return u*u*u*p[0]+3*u*u*t*p[1]+3*u*t*t*p[2]+t*t*t*p[3]};
 const Z={near:{w:[.42,.6],max:880,blur:.6,f:'none',T:[4.5,6.5],y:[-.1,.6]},mid:{w:[.22,.32],max:460,blur:2.2,f:'contrast(.95)',T:[8,11],y:[0,.5]},far:{w:[.1,.15],max:230,blur:2.6,f:'contrast(.82) brightness(1.18) saturate(.8)',T:[13,18],y:[.02,.4]}};
 const DC=['gris','glace','feu','bronze'];  // couleur du dragon tirée au hasard à chaque passage
 /* apparitions : vrai tirage aléatoire sans rythme repérable. Attente = 15 s minimum + loi exponentielle (moyenne 55 s), et une fois sur cinq une longue pause de 1 à 3 min en plus ;
    la couleur ne revient jamais deux fois de suite, la distance et le sens jamais trois fois de suite ; rien ne se passe quand l'onglet est caché ou que le hero est hors écran */
 const ex=m=>-Math.log(1-R())*m,wait=()=>15000+ex(40000)+(R()<.2?U(60000,180000):0),hist={k:[],c:[],d:[]};
 const pick=(arr,key,w)=>{const h=hist[key],ok=arr.filter(x=>key==='c'?x!==h[h.length-1]:!(h.length>1&&h[h.length-1]===x&&h[h.length-2]===x));const ws=w?ok.map(x=>w[x]):ok.map(()=>1);let t=R()*ws.reduce((a,b)=>a+b,0),i=0;while(i<ok.length-1&&(t-=ws[i])>0)i++;hist[key].push(ok[i]);if(hist[key].length>3)hist[key].shift();return ok[i]};
 /* dragons et nuées d'oiseaux ne partagent jamais le ciel (sinon les tailles se contredisent) : SKY.dragon / SKY.birds */
 const SKY=window.SKY||(window.SKY={dragon:0,birds:0});
 const fly=()=>{if(PERF.tier<1||document.hidden||box.parentElement.classList.contains('off')){wv.forEach(e=>{e.removeAttribute('src');e.style.visibility='hidden'});setTimeout(fly,5000);return}
  if(SKY.birds>0){setTimeout(fly,3000);return}SKY.dragon=1;const k=pick(['mid','far'],'k',{mid:.5,far:.5}),c=Z[k],v=wv.find(e=>e.dataset.z===k),col=pick(DC,'c'),W=box.clientWidth,H=box.clientHeight,d=pick([-1,1],'d'),w=Math.min(W*U(...c.w),c.max);
  wv.forEach(e=>{if(e!==v){e.removeAttribute('src');e.style.visibility='hidden'}});
  v.style.width=w+'px';v.style.filter=(c.blur?'blur('+c.blur+'px) ':'')+c.f;const url='../assets/video/dragon_'+col+'_'+k+'.webp';v.removeAttribute('src');const begin=()=>{
  const a0=d<0?W+w*.1:-w*1.1,a3=d<0?-w*1.1:W+w*.1,xs=[a0,a0+(a3-a0)*U(.2,.45),a0+(a3-a0)*U(.55,.8),a3],ys=[0,0,0,0].map(()=>U(...c.y)*H);
  const T=U(...c.T)*1000*Math.max(.8,Math.min(1.4,W/1300)),N=64,L=[0];for(let i=1;i<=N;i++)L.push(L[i-1]+Math.hypot(bz(xs,i/N)-bz(xs,(i-1)/N),bz(ys,i/N)-bz(ys,(i-1)/N)));
  const at=s=>{const x=s*L[N];let i=1;while(i<N&&L[i]<x)i++;return(i-1+(x-L[i-1])/((L[i]-L[i-1])||1))/N};
  let t0=performance.now(),r=0;v.style.visibility='visible';dispatchEvent(new CustomEvent('wyrm',{detail:{k,d,T}}));  /* cri lointain (sound.js) */
  const step=n=>{const s=(n-t0)/T;if(s>=1){v.style.visibility='hidden';v.removeAttribute('src');SKY.dragon=0;setTimeout(fly,wait());return}
   const t=at(s),x=bz(xs,t),y=bz(ys,t),e=.002,dy=bz(ys,Math.min(1,t+e))-bz(ys,Math.max(0,t-e)),dx=Math.abs(bz(xs,Math.min(1,t+e))-bz(xs,Math.max(0,t-e)))||1;
   r+=(Math.max(-16,Math.min(16,-Math.atan2(dy,dx)*57.3))-r)*.06;
   v.style.transform='translate3d('+x.toFixed(1)+'px,'+y.toFixed(1)+'px,0) scaleX('+(-d)+') rotate('+r.toFixed(2)+'deg)';requestAnimationFrame(step)};
  requestAnimationFrame(step)};
  const pre=new Image();pre.src=url;(pre.decode?pre.decode():Promise.resolve()).catch(()=>{}).then(()=>{v.src=url;begin()})};
 setTimeout(fly,R()<.3?U(20000,60000):U(5000,20000))}
/* météo du hero, tirée dans un sac mélangé : toutes passent avant qu'une revienne, jamais deux fois de suite (?wx=neige pour en forcer une) : dégagé, neige, blizzard, pluie, orage, brouillard */
const MOB=PERF.tier<1;  /* machine faible ou mobile : pas de météo */
const hx=document.querySelector('.hero'),cv=hx&&hx.querySelector('canvas.wx');if(MOB&&cv){cv.remove();const g=hx.querySelector('canvas.glass');g&&g.remove()}
if(cv&&!MOB){const WX=['clair','neige','blizzard','pluie','orage','brouillard','automne'],q=new URLSearchParams(location.search).get('wx'),wx=WX.includes(q)?q:(()=>{let b=[],l='';try{b=JSON.parse(localStorage.getItem('wx-bag')||'[]').filter(x=>WX.includes(x));l=localStorage.getItem('wx-last')||''}catch(e){}
  if(!b.length){b=WX.filter(x=>x!==l);for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]]}}
  const v=b.shift();try{localStorage.setItem('wx-bag',JSON.stringify(b));localStorage.setItem('wx-last',v)}catch(e){}return v})();hx.dataset.wx=wx;document.documentElement.dataset.wx=wx;
 const P={automne:{n:100,vy:[38,95],vx:[-10,30],s:[1,1]},neige:{n:150,vy:[28,70],vx:[-18,10],s:[1,3.2]},blizzard:{n:460,vy:[110,240],vx:[-420,-240],s:[.8,2.6]},pluie:{n:240,vy:[900,1300],vx:[-150,-110],l:[14,26]},orage:{n:360,vy:[1100,1600],vx:[-260,-190],l:[18,32]}}[wx];
 if(P){const cx=cv.getContext('2d'),R=Math.random,U=a=>a?a[0]+(a[1]-a[0])*R():0,dpr=Math.min(2,devicePixelRatio||1);let w=0,h=0,ps=[],on=true,lt=0,fl=0,nf=performance.now()+U([3000,8000]);
  /* feuilles mortes : 8 vraies feuilles (photos FIBO détourées, atlas leaf_atlas.webp) en 3 degrés de flou pour la profondeur */
  const leaf=wx==='automne';let LS=null;if(leaf){const im=new Image();im.src='../assets/img/leaf_atlas.webp';im.onload=()=>{const out=[];for(let i=0;i<8;i++){const lv=[];for(const b of[0,1.4,3]){const k=document.createElement('canvas');k.width=k.height=128;const x=k.getContext('2d');if(b)try{x.filter='blur('+b+'px)'}catch(e){}x.drawImage(im,(i%4)*192,Math.floor(i/4)*192,192,192,8,8,112,112);lv.push(k)}out.push(lv)}LS=out;rs()}}
  const mk=top=>leaf?(z=>({x:top?U([-90,w*.8]):R()*w*1.1,y:top?-40:R()*h,z,vx:U(P.vx),vy:U(P.vy),sz:(22+z*44)*(.8+R()*.5),rot:R()*6.3,vr:U([-2.2,2.2])*(.5+z*.5),fp:R()*6.3,fs:U([1.6,4]),ph:R()*6.3,sp:U([.8,1.6]),spr:LS[Math.floor(R()*LS.length)],lv:z<.5?2:z<.78?1:0}))(.28+Math.pow(R(),1.3)*.72):({x:R()*w*1.25,y:top?-20:R()*h,vx:U(P.vx),vy:U(P.vy),s:U(P.s),l:U(P.l),z:.45+R()*.55,ph:R()*6.3});
  const rs=()=>{w=hx.clientWidth;h=hx.clientHeight;cv.width=w*dpr;cv.height=h*dpr;cx.setTransform(dpr,0,0,dpr,0,0);if(leaf&&!LS){ps=[];return}ps=Array.from({length:Math.round(P.n*(PERF.tier>=2?1:.5)*Math.min(1.4,Math.max(.5,w/1400)))},()=>mk(false))};
  rs();addEventListener('resize',rs,{passive:true});new IntersectionObserver(es=>{on=es[0].isIntersecting;if(on){lt=0;requestAnimationFrame(fr)}}).observe(hx);
  const fr=n=>{if(!on)return;if(PERF.tier<1){cx.clearRect(0,0,w,h);return}const dt=lt?Math.min(.05,(n-lt)/1000):0;lt=n;cx.clearRect(0,0,w,h);
   const dk=document.documentElement.dataset.theme!=='light',rain=!!P.l;
   cx.fillStyle=dk?'#fff':'#f4f7fb';cx.strokeStyle=dk?'rgba(205,218,235,.55)':'rgba(80,100,130,.4)';cx.lineWidth=1;if(rain)cx.beginPath();
   if(leaf){const wd=(Math.sin(n/3300)+.6*Math.sin(n/1450+2)+.3*Math.sin(n/610))*34+22;
    for(const p of ps){p.ph+=dt*p.sp;p.fp+=dt*p.fs;p.rot+=p.vr*dt+Math.sin(p.fp)*dt*.9;
     p.x+=(p.vx+wd+Math.sin(p.ph)*46)*p.z*dt;p.y+=(p.vy*(.75+.25*Math.abs(Math.cos(p.fp)))+Math.cos(p.ph*1.3)*14)*p.z*dt;
     if(p.y>h+50||p.x>w+90||p.x<-120)Object.assign(p,mk(true));
     const fl3=Math.cos(p.fp),k=p.sz/128;cx.globalAlpha=(.45+.55*p.z)*(dk?.92:1);cx.save();cx.translate(p.x,p.y);cx.rotate(p.rot);cx.scale(k,k*(.28+.72*Math.abs(fl3)));cx.drawImage(p.spr[p.lv],-64,-64);
     if(fl3<0){cx.globalCompositeOperation='source-atop';cx.fillStyle='rgba(30,10,0,.22)';cx.fillRect(-64,-64,128,128)}cx.restore()}
    cx.globalAlpha=1;requestAnimationFrame(fr);return}
   for(const p of ps){p.ph+=dt*1.4;p.x+=(p.vx+(rain?0:Math.sin(p.ph)*14))*p.z*dt;p.y+=p.vy*p.z*dt;
    if(p.y>h+30||p.x<-40){Object.assign(p,mk(true))}
    if(rain){const k=p.l*p.z/p.vy;cx.moveTo(p.x,p.y);cx.lineTo(p.x-p.vx*k,p.y-p.vy*k)}
    else{cx.globalAlpha=(dk?.85:.95)*p.z;cx.beginPath();cx.arc(p.x,p.y,p.s*p.z,0,6.283);cx.fill()}}
   cx.globalAlpha=1;if(rain)cx.stroke();
   if(wx==='orage'){if(n>nf){fl=1;nf=n+U([6000,14000]);dispatchEvent(new Event('wx-flash'))}if(fl>0){const a=fl>.7?.35:fl>.5?.05:fl>.35?.25:fl*.4;cx.fillStyle='rgba(225,232,255,'+a+')';cx.fillRect(0,0,w,h);fl-=dt*1.6}}
   requestAnimationFrame(fr)}}}
/* été (météo dégagée) : trois papillons qui volettent et viennent se poser sur les lettres du titre, un petit essaim de moucherons,
   et de temps en temps une mouche qui atterrit sur la vitre de l'écran, marche un peu puis repart ; un seul canevas, arrêté hors champ */
const bg=hx&&hx.querySelector('canvas.glass');
if(bg&&PERF.tier>=2&&hx.dataset.wx==='clair'&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
 const x=bg.getContext('2d'),R=Math.random,U=(a,b)=>a+(b-a)*R(),dpr=Math.min(2,devicePixelRatio||1),h1=hx.querySelector('h1'),TAU=6.2832;
 let w=0,h=0,on=true,lt=0;
 

 const rs=()=>{w=hx.clientWidth;h=hx.clientHeight;bg.width=w*dpr;bg.height=h*dpr;x.setTransform(dpr,0,0,dpr,0,0)};
 /* perchoirs : le haut de chaque lettre du titre (capitales et hampes plus haut que les minuscules) */
 const perch=()=>{const o=hx.getBoundingClientRect(),tw=document.createTreeWalker(h1,NodeFilter.SHOW_TEXT),r=document.createRange(),s=[];let n;
  while(n=tw.nextNode())for(let i=0;i<n.length;i++){const c=n.data[i];if(!/[A-Za-z]/.test(c))continue;r.setStart(n,i);r.setEnd(n,i+1);const b=r.getBoundingClientRect();if(!b.width)continue;
   s.push({x:b.left-o.left+b.width*(c==='k'?.28:c==='l'?.5:.5),y:b.top-o.top+b.height*(/[A-Zbdfhklt]/.test(c)?.21:.38)})}
  return s};
 /* papillons : piéride blanche, orangé, citron */
 const BF=[['rgba(255,251,238,.95)','#b9ae8a','#3a3a3a'],['rgba(255,170,70,.95)','#a8501a','#3b1c0c'],['rgba(250,240,170,.95)','#b3a250','#5a4e1c']];
 const bf=BF.map(c=>({c,x:0,y:0,vx:U(-40,40),vy:U(-20,20),tx:0,ty:0,wt:0,wa:R()*TAU,st:'fly',t:U(3,9),s:U(.85,1.15),p:null,ini:0}));
 const wander=b=>{b.tx=U(w*.12,w*.88);b.ty=U(h*.08,h*.5);b.wt=U(1.6,3.6)};
 const drawBf=b=>{const op=b.st==='land'?.18+.82*(.5+.5*Math.cos(b.wa)):.12+.88*Math.abs(Math.cos(b.wa)),k=b.s;
  x.save();x.translate(b.x,b.y);x.rotate(b.st==='land'?0:Math.max(-.5,Math.min(.5,b.vx/260)));x.scale(k,k);
  for(const sd of[-1,1]){x.save();x.scale(sd*op,1);x.fillStyle=b.c[0];x.strokeStyle=b.c[1];x.lineWidth=.7;
   x.beginPath();x.ellipse(7.5,-5,7.5,5.2,-.55,0,TAU);x.fill();x.stroke();x.beginPath();x.ellipse(5.4,3,4.6,3.6,.45,0,TAU);x.fill();x.stroke();
   x.fillStyle=b.c[2];x.beginPath();x.arc(10,-6.5,1.3,0,TAU);x.fill();x.restore()}
  x.fillStyle=b.c[2];x.beginPath();x.ellipse(0,0,1.4,5.6,0,0,TAU);x.fill();
  x.strokeStyle=b.c[2];x.lineWidth=.6;x.beginPath();x.moveTo(-.5,-5);x.quadraticCurveTo(-2,-9,-3.4,-10.5);x.moveTo(.5,-5);x.quadraticCurveTo(2,-9,3.4,-10.5);x.stroke();x.restore()};
 const stepBf=(b,dt)=>{if(!b.ini){b.ini=1;b.x=U(w*.1,w*.9);b.y=U(h*.1,h*.45);wander(b)}
  if(b.st==='land'){b.wa+=dt*1.7;b.x=b.p.x;b.y=b.p.y-5*b.s;if((b.t-=dt)<0){b.st='fly';b.vy=-70;b.vx=U(-50,50);b.t=U(5,12);b.p.busy=0;wander(b)}return}
  b.wa+=dt*24;let tx=b.tx,ty=b.ty;
  if(b.st==='go'){tx=b.p.x;ty=b.p.y-5*b.s;const d=Math.hypot(tx-b.x,ty-b.y);if(d<3){b.st='land';b.t=U(3.5,9);b.vx=b.vy=0;return}}
  else{if((b.wt-=dt)<0)wander(b);if((b.t-=dt)<0){const ps=perch().filter(p=>!bf.some(o=>o.p&&o.p.busy&&Math.abs(o.p.x-p.x)<20));
   if(ps.length&&R()<.75){b.p=ps[Math.floor(R()*ps.length)];b.p.busy=1;b.st='go'}else b.t=U(3,7)}}
  const dx=tx-b.x,dy=ty-b.y,d=Math.hypot(dx,dy)||1,sp=b.st==='go'?Math.min(85,d*1.6+12):70,f=Math.min(1,dt*2.2);
  b.vx+=(dx/d*sp-b.vx)*f;b.vy+=(dy/d*sp-b.vy)*f;
  b.x+=(b.vx+Math.sin(b.wa*.11)*26)*dt;b.y+=(b.vy+Math.sin(b.wa*.5)*34)*dt};
 /* moucherons : petit essaim en courbes de Lissajous autour d'un centre qui dérive dans le ciel */
 const mg=Array.from({length:7},()=>({a:U(.7,1.9),b:U(.8,2.3),c:R()*TAU,r:U(10,30)}));
 const drawMg=n=>{const t=n/1000,cx0=w*(.2+.06*Math.sin(t*.07)),cy0=h*(.22+.04*Math.sin(t*.11));x.fillStyle='rgba(28,28,30,.55)';
  for(const m of mg){const px=cx0+Math.sin(t*m.a*2+m.c)*m.r+Math.sin(t*7.3*m.a)*2,py=cy0+Math.cos(t*m.b*2+m.c)*m.r*.6+Math.cos(t*6.1*m.b)*2;x.beginPath();x.arc(px,py,1.3,0,TAU);x.fill()}};
 /* mouche sur la vitre : arrive du fond (petite, floue), se pose, marche par à-coups, se frotte les pattes, repart vers le spectateur */
 const fly={st:'wait',t:U(10,24),x:0,y:0,a:0,p:0,sx:0,sy:0,lx:0,ly:0,ex:0,ey:0,wk:0,wt:0,dx:0,dy:0,leg:0,rub:0};
 const drawFly=()=>{const f=fly,k=f.st==='in'?.2+.8*f.p:f.st==='out'?1+1.6*f.p:1,al=f.st==='in'?Math.min(1,f.p*2.5):f.st==='out'?1-f.p:1,air=f.st!=='sit';
  x.save();x.globalAlpha=al;x.translate(f.x,f.y);x.rotate(f.a);x.scale(k*1.15,k*1.15);
  if(!air){x.fillStyle='rgba(0,0,0,.18)';x.beginPath();x.ellipse(1.5,2.5,6,11,0,0,TAU);x.fill()}
  if(!air){x.strokeStyle='#141416';x.lineWidth=.9;const g=f.leg,rb=f.rub;
   [[-1,-4,-9,-9+rb],[1,-4,9,-9-rb],[-1,0,-11,1+g],[1,0,11,1-g],[-1,3,-9,11-g],[1,3,9,11+g]].forEach(([s,y0,lx,ly])=>{x.beginPath();x.moveTo(s*1.5,y0);x.quadraticCurveTo(lx*.7,y0+(ly-y0)*.3,lx,ly);x.stroke()})}
  /* ailes : repliées en V au repos, disque flou en vol */
  x.fillStyle='rgba(215,225,235,.32)';x.strokeStyle='rgba(255,255,255,.4)';x.lineWidth=.5;
  if(air){x.beginPath();x.ellipse(-6,-1,8,4.5,.4,0,TAU);x.fill();x.beginPath();x.ellipse(6,-1,8,4.5,-.4,0,TAU);x.fill()}
  else for(const s of[-1,1]){x.beginPath();x.ellipse(s*3.6,6,3.2,9,s*-.35,0,TAU);x.fill();x.stroke()}
  const gr=x.createLinearGradient(-3,-6,3,10);gr.addColorStop(0,'#3a3a3e');gr.addColorStop(1,'#0e0e10');x.fillStyle=gr;
  x.beginPath();x.ellipse(0,6,3.6,6.5,0,0,TAU);x.fill();x.beginPath();x.ellipse(0,-1.5,3.8,4,0,0,TAU);x.fill();
  x.fillStyle='#1a1a1c';x.beginPath();x.ellipse(0,-6.5,3.4,2.6,0,0,TAU);x.fill();
  x.fillStyle='#7a2c1c';x.beginPath();x.ellipse(-2.3,-7,1.7,2.1,-.3,0,TAU);x.fill();x.beginPath();x.ellipse(2.3,-7,1.7,2.1,.3,0,TAU);x.fill();
  x.fillStyle='rgba(255,255,255,.35)';x.beginPath();x.arc(-1.2,-1.5,1.2,0,TAU);x.fill();x.restore()};
 const stepFly=dt=>{const f=fly;
  if(f.st==='wait'){if((f.t-=dt)<0){f.st='in';f.p=0;f.lx=U(w*.18,w*.82);f.ly=U(h*.2,h*.62);const e=R()*TAU;f.sx=f.lx+Math.cos(e)*w*.35;f.sy=f.ly+Math.sin(e)*h*.3;f.a=Math.atan2(f.ly-f.sy,f.lx-f.sx)+1.57}return}
  if(f.st==='in'){f.p=Math.min(1,f.p+dt/1.1);const e=1-Math.pow(1-f.p,3),wb=Math.sin(f.p*18)*(1-f.p)*18;f.x=f.sx+(f.lx-f.sx)*e+wb;f.y=f.sy+(f.ly-f.sy)*e;if(f.p>=1){f.st='sit';f.t=U(4,9);f.wt=U(.4,1.2);f.wk=0}return}
  if(f.st==='sit'){f.t-=dt;
   if(f.wk>0){f.wk-=dt;f.x+=f.dx*dt;f.y+=f.dy*dt;f.leg=Math.sin(f.wk*40)*2;f.rub=0;if(f.x<20||f.x>w-20||f.y<20||f.y>h*.75)f.wk=0}
   else{f.leg=0;f.rub=f.wt<.6&&f.rubbing?Math.sin(f.wt*45)*2.5:0;if((f.wt-=dt)<0){if(R()<.3){f.rubbing=1;f.wt=U(.8,1.6)}else{f.rubbing=0;f.a+=U(-1.1,1.1);const sp=U(30,55);f.dx=Math.sin(f.a)*sp;f.dy=-Math.cos(f.a)*sp;f.wk=U(.25,.6);f.wt=U(.5,1.5)}}}
   if(f.t<0){f.st='out';f.p=0;f.sx=f.x;f.sy=f.y;const e=R()*TAU;f.ex=f.x+Math.cos(e)*w*.5;f.ey=f.y+Math.sin(e)*h*.4-h*.2}return}
  if(f.st==='out'){f.p=Math.min(1,f.p+dt/.6);const e=f.p*f.p;f.x=f.sx+(f.ex-f.sx)*e;f.y=f.sy+(f.ey-f.sy)*e;if(f.p>=1){f.st='wait';f.t=U(25,60)}}};
 rs();addEventListener('resize',rs,{passive:true});
 const fr=n=>{if(!on)return;const dt=lt?Math.min(.05,(n-lt)/1000):0;lt=n;x.clearRect(0,0,w,h);
  drawMg(n);for(const b of bf){stepBf(b,dt);drawBf(b)}stepFly(dt);if(fly.st!=='wait')drawFly();requestAnimationFrame(fr)};
 new IntersectionObserver(es=>{on=es[0].isIntersecting;if(on){lt=0;requestAnimationFrame(fr)}}).observe(hx);
}
/* nuées d'oiseaux au loin, en été et dans les trois hivers : deux profondeurs (lointaine, petite et voilée ; plus proche, plus grande et rapide),
   chacune avec son propre rythme ; formations souples qui ondulent, derrière le titre ; canevas dédié, arrêté hors champ */
{const W0=hx&&hx.dataset.wx,BW={clair:1,neige:1,blizzard:1,brouillard:.6};
if(hx&&!MOB&&PERF.tier>=2&&BW[W0]&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
 const c=document.createElement('canvas');c.className='wx birds';c.setAttribute('aria-hidden','true');(hx.querySelector('canvas.wx')||hx.firstChild).after(c);
 const x=c.getContext('2d'),R=Math.random,U=(a,b)=>a+(b-a)*R(),dpr=Math.min(2,devicePixelRatio||1),TAU=6.2832,fog=BW[W0],bl=W0==='blizzard';
 let w=0,h=0,on=true,lt=0;const rs=()=>{w=hx.clientWidth;h=hx.clientHeight;c.width=w*dpr;c.height=h*dpr;x.setTransform(dpr,0,0,dpr,0,0)};
 const LV=[{y:[.1,.22],v:[30,50],s:[1.9,2.6],n:[18,40],sp:[30,110],a:.5,lw:1,wait:[15,45],first:[1,4]},
           {y:[.16,.36],v:[70,105],s:[3,4.2],n:[10,26],sp:[40,170],a:.66,lw:1.3,wait:[25,60],first:[6,14]}].map(l=>({...l,on:0,t:U(...l.first)}));
 const SKY=window.SKY||(window.SKY={dragon:0,birds:0});
 const go=l=>{if(SKY.dragon){l.t=2;return}SKY.birds++;const d=R()<.5?1:-1;Object.assign(l,{on:1,d,x:d>0?-10:w+10,y0:U(...l.y)*h,vel:U(...l.v)*(bl?.8:1),sz:U(...l.s),k:0,
  b:Array.from({length:Math.round(U(...l.n))},()=>{const r=Math.sqrt(R());return{ox:-d*r*U(...l.sp),oy:U(-1,1)*r*l.sp[1]*.25,ph:R()*TAU,f:U(8,11),s:U(.75,1.15)}})})};
 const draw=(l,dt)=>{if(!l.on){if((l.t-=dt)<0)go(l);return}l.k+=dt;l.x+=l.d*l.vel*dt;
  const cy=l.y0+Math.sin(l.k*.35)*h*.025+(bl?Math.sin(l.k*1.7)*8:0);x.strokeStyle='rgba(30,32,38,'+(l.a*fog)+')';x.lineWidth=l.lw;x.beginPath();
  for(const o of l.b){o.ph+=o.f*dt;const px=l.x+o.ox+Math.sin(l.k*.6+o.oy*.05)*10,py=cy+o.oy+Math.sin(l.k*.9+o.ox*.02)*12,s=l.sz*o.s,a=Math.sin(o.ph)*.9;
   x.moveTo(px-s*1.2,py-a*s);x.quadraticCurveTo(px-s*.5,py-a*s*.2,px,py);x.quadraticCurveTo(px+s*.5,py-a*s*.2,px+s*1.2,py-a*s)}
  x.stroke();if(l.d>0?l.x-l.sp[1]-60>w:l.x+l.sp[1]+60<0){l.on=0;SKY.birds=Math.max(0,SKY.birds-1);l.t=U(...l.wait)}};
 rs();addEventListener('resize',rs,{passive:true});
 const fr=n=>{if(!on)return;const dt=lt?Math.min(.05,(n-lt)/1000):0;lt=n;x.clearRect(0,0,w,h);for(const l of LV)draw(l,dt);requestAnimationFrame(fr)};
 new IntersectionObserver(es=>{on=es[0].isIntersecting;if(on){lt=0;requestAnimationFrame(fr)}}).observe(hx);
}}
/* pluie, orage, neige, blizzard : gouttes (ou flocons qui fondent en gouttes) sur la vitre de l'écran ; chacune est une petite lentille qui montre le paysage inversé et réduit,
   bord sombre et reflet ; les grosses glissent, laissent une traînée de gouttelettes et absorbent celles qu'elles touchent */
const gl=hx&&hx.querySelector('canvas.glass');if(gl&&PERF.tier>=2&&hx.dataset.wx!=='clair'&&hx.dataset.wx!=='brouillard'&&hx.dataset.wx!=='automne'){const gx=gl.getContext('2d'),R=Math.random,U=(a,b)=>a+(b-a)*R(),dpr=Math.min(2,devicePixelRatio||1),storm=hx.dataset.wx==='orage',snow=hx.dataset.wx==='neige'||hx.dataset.wx==='blizzard',bliz=hx.dataset.wx==='blizzard';
 /* flocons : 8 cristaux dendritiques à 6 branches dessinés une fois, liseré gris-bleu pour rester lisibles sur fond clair */
 const SP=snow?Array.from({length:8},()=>{const c=document.createElement('canvas');c.width=c.height=96;const x=c.getContext('2d'),L=40,br=[.3,.5,.7].map(f=>[f,U(.18,.42)*(1.15-f)]),core=U(4,9);x.translate(48,48);x.lineCap='round';
  const arm=()=>{x.beginPath();for(let k=0;k<6;k++){x.save();x.rotate(k*Math.PI/3);x.moveTo(0,0);x.lineTo(0,-L);for(const[f,l]of br){x.moveTo(0,-L*f);x.lineTo(-L*l,-L*f-L*l*.9);x.moveTo(0,-L*f);x.lineTo(L*l,-L*f-L*l*.9)}x.restore()}};
  x.strokeStyle='rgba(90,115,150,.45)';x.lineWidth=5;arm();x.stroke();x.strokeStyle='#fff';x.lineWidth=2.4;x.shadowColor='rgba(220,235,255,.9)';x.shadowBlur=4;arm();x.stroke();
  x.beginPath();for(let k=0;k<6;k++){const t=k*Math.PI/3;x.lineTo(Math.sin(t)*core,-Math.cos(t)*core)}x.closePath();x.fillStyle='rgba(255,255,255,.9)';x.fill();return c}):null;
 let w=0,h=0,ds=[],bg=null,on=true,lt=0,acc=0;const im=new Image();im.src='../assets/img/hero.jpg';
 const mist=!snow,fog=document.createElement('canvas'),fox=fog.getContext('2d'),fb=document.createElement('canvas');let fogOk=false,fogN=0;
 const mkfog=()=>{if(!mist||!bg)return;fb.width=fog.width=w;fb.height=fog.height=h;const x=fb.getContext('2d');try{x.filter='blur(7px)'}catch(e){}x.drawImage(bg,0,0);x.filter='none';x.fillStyle=storm?'rgba(165,182,205,.24)':'rgba(190,200,215,.2)';x.fillRect(0,0,w,h);fox.clearRect(0,0,w,h);fox.drawImage(fb,0,0);fogOk=true};
 const wipe=(x,y,r,a)=>{fox.globalCompositeOperation='destination-out';const g=fox.createRadialGradient(x,y,r*.4,x,y,r*1.6);g.addColorStop(0,'rgba(0,0,0,'+a+')');g.addColorStop(1,'rgba(0,0,0,0)');fox.fillStyle=g;fox.fillRect(x-r*1.6,y-r*1.6,r*3.2,r*3.2);fox.globalCompositeOperation='source-over'};
 const mkbg=()=>{if(!im.complete||!im.naturalWidth)return;bg=document.createElement('canvas');bg.width=w;bg.height=h;const b=bg.getContext('2d'),sc=Math.max(w/im.naturalWidth,h/im.naturalHeight)*1.06;
  b.drawImage(im,(w-im.naturalWidth*sc)/2,(h-im.naturalHeight*sc)*.55,im.naturalWidth*sc,im.naturalHeight*sc);b.fillStyle=storm?'rgba(10,14,22,.38)':snow?'rgba(10,14,22,.1)':'rgba(10,14,22,.22)';b.fillRect(0,0,w,h);mkfog()};
 const rs=()=>{w=hx.clientWidth;h=hx.clientHeight;gl.width=w*dpr;gl.height=h*dpr;gx.setTransform(dpr,0,0,dpr,0,0);mkbg()};im.onload=mkbg;rs();addEventListener('resize',rs,{passive:true});
 const add=(x,y,r,tr)=>ds.push({x,y,r,a:0,life:tr?U(2,5):U(10,26),age:0,vy:0,slide:!tr&&r>5.5&&R()<.45,wait:U(.6,4),last:y,ws:R()*6.3});
 const drop=d=>{const{x,y,r}=d,ry=r*1.08;gx.globalAlpha=Math.min(1,d.a);
  gx.fillStyle='rgba(0,0,0,.16)';gx.beginPath();gx.ellipse(x,y+r*.18,r*1.02,ry,0,0,6.283);gx.fill();
  gx.save();gx.beginPath();gx.ellipse(x,y,r,ry,0,0,6.283);gx.clip();
  if(bg){const k=5.5*r;gx.translate(x,y);gx.scale(1,-1);gx.drawImage(bg,Math.max(0,x-k),Math.max(0,y-k*1.2),k*2,k*2.4,-r,-ry,r*2,ry*2);gx.setTransform(dpr,0,0,dpr,0,0)}
  else{gx.fillStyle='rgba(200,210,225,.25)';gx.fillRect(x-r,y-ry,r*2,ry*2)}
  const g=gx.createRadialGradient(x,y-r*.1,r*.35,x,y,r*1.05);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(.75,'rgba(0,0,0,.12)');g.addColorStop(1,'rgba(0,0,0,.45)');gx.fillStyle=g;gx.fillRect(x-r,y-ry,r*2,ry*2);gx.restore();
  gx.fillStyle='rgba(255,255,255,.75)';gx.beginPath();gx.ellipse(x-r*.32,y-r*.42,r*.22,r*.14,-.5,0,6.283);gx.fill();
  gx.fillStyle='rgba(255,255,255,.18)';gx.beginPath();gx.ellipse(x+r*.2,y+r*.55,r*.4,r*.18,0,0,6.283);gx.fill()};
 new IntersectionObserver(es=>{on=es[0].isIntersecting;if(on){lt=0;requestAnimationFrame(fr)}}).observe(hx);
 const fr=n=>{if(!on)return;if(PERF.tier<2){gx.clearRect(0,0,w,h);return}const dt=lt?Math.min(.05,(n-lt)/1000):0;lt=n;gx.clearRect(0,0,w,h);if(mist&&fogOk){if(++fogN%6===0){fox.globalAlpha=.04;fox.drawImage(fb,0,0);fox.globalAlpha=1}gx.globalAlpha=.3;gx.drawImage(fog,0,0);gx.globalAlpha=1}
  acc+=dt*(snow?(bliz?3.2:1.4):storm?14:5)*Math.max(.5,w/1400);while(acc>1&&ds.length<(snow?(bliz?55:35):storm?150:80)){acc--;if(snow){const z=U(12,24)*(R()<.15?1.7:1),st=U(2,6),me=U(2.5,4);ds.push({fl:SP[Math.floor(R()*SP.length)],x:R()*w,y:R()*h*.9,z,r:z*.2,rot:R()*1.05,a:0,age:0,st,me,life:st+me+U(4,8)})}else{const r=R()<.65?U(1.5,4.2):U(5,11);add(R()*w,R()*h*.92,r,false)}}
  for(const d of ds){d.age+=dt;d.a=Math.min(1,d.age*8)*Math.min(1,(d.life-d.age)/2.5);
   if(d.slide&&d.age>d.wait){d.vy=Math.min(d.vy+dt*U(60,160),U(60,140));d.y+=d.vy*dt;d.ws+=dt*3;d.x+=Math.sin(d.ws)*dt*6;d.life=d.age+3;
    if(d.y-d.last>d.r*1.6){d.last=d.y;add(d.x+U(-1,1),d.y-d.r*1.3,d.r*U(.18,.32),true);d.r*=.985}
    for(const e of ds)if(e!==d&&!e.dead&&Math.hypot(e.x-d.x,e.y-d.y)<d.r+e.r*.8){d.r=Math.min(13,Math.sqrt(d.r*d.r+e.r*e.r));e.dead=true}}
   if(d.y>h+20||d.age>d.life||d.r<.8)d.dead=true}
  ds=ds.filter(d=>!d.dead);if(mist&&fogOk)for(const d of ds)if(!d.fl&&d.slide)wipe(d.x,d.y,d.r,Math.min(1,d.a)*.9);  /* seules les gouttes qui glissent essuient la buée : pas de halo autour des autres */
  for(const d of ds){if(!d.fl){drop(d);continue}const t=Math.max(0,Math.min(1,(d.age-d.st)/d.me));
   if(t>0)drop({x:d.x,y:d.y+d.z*.1,r:d.r*Math.sqrt(t),a:d.a*Math.min(1,t*1.5)});
   if(t<1){const k=d.z*(1-.4*t)*(d.age<.2?1.15-d.age*.75:1)/48;gx.globalAlpha=Math.min(1,d.a)*(1-t)*.95;gx.save();gx.translate(d.x,d.y);gx.rotate(d.rot);gx.scale(k,k);gx.drawImage(d.fl,-48,-48);gx.restore()}}gx.globalAlpha=1;requestAnimationFrame(fr)}}
/* serveuse dans les cases vides de la dernière ligne de la grille (2 cases libres ou plus) */
const g=document.getElementById('grid');if(g){const w=document.createElement('div');w.className='wench';w.setAttribute('aria-hidden','true');
 w.innerHTML='<div class="wimg"><img class="steam" src="../assets/img/steam.webp" alt="" style="left:-2.35%;top:-35.17%;width:82.63%"></div>';g.append(w);
 const fit=()=>{const n=getComputedStyle(g).gridTemplateColumns.split(' ').length,k=APPS.length%n,e=k?n-k:0;w.style.display=e<2?'none':'';w.style.gridColumn=e<2?'':'span '+e};fit();addEventListener('resize',fit,{passive:true})}
PERF.on(v=>{if(v<2)document.querySelectorAll('video.vfx').forEach(x=>x.pause())});
document.querySelectorAll('.hero-img,.hero,.sage,.press .dragon,.wench').forEach(box=>{const vids=[...box.querySelectorAll('video.vfx')],imgs=[...box.querySelectorAll('img[data-src]')];
 new IntersectionObserver(es=>{const on=es[0].isIntersecting;box.classList.toggle('off',!on);
  imgs.forEach(i=>{if(on&&PERF.tier>=2)i.src=i.dataset.src;else i.removeAttribute('src')});
  vids.forEach(v=>{if(on&&!RMx&&PERF.tier>=2){v.preload='auto';v.playbackRate=+v.dataset.r||1;v.play().catch(()=>{})}else v.pause()})}).observe(box);
 if(!box.classList.contains('hero-img'))return;
 box.addEventListener('pointermove',e=>{const r=box.getBoundingClientRect();box.style.setProperty('--mx',((e.clientX-r.left)/r.width*2-1).toFixed(3));box.style.setProperty('--my',((e.clientY-r.top)/r.height*2-1).toFixed(3))});
 box.addEventListener('pointerleave',()=>{box.style.setProperty('--mx',0);box.style.setProperty('--my',0)});
});})();
