const $=s=>document.querySelector(s),RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const nm=(id,c)=>`<i style="color:${c}">${id[0]}</i>${id.slice(1)}`;
const CH=I18N.chaps;
const sp=a=>{const[t,x,y,c,w]=a,n=t==='orb'?14:t==='fire'?8:0;return `<i class="sp ${t}" style="left:${x}%;top:${y}%;--c:${c};--w:${w}%;animation-delay:${(Math.random()*2).toFixed(2)}s">${Array.from({length:n},()=>`<b style="--dx:${(Math.random()*90-45).toFixed(0)}px;--d:${(Math.random()*2.6).toFixed(2)}s;--t:${(1.8+Math.random()*1.6).toFixed(2)}s"></b>`).join('')}</i>`};
$('#chaps').innerHTML=CH.map(h=>`<section class="chap" id="${h.id}"><header><div class="k rv">${h.k}</div><h2 class="rv">${h.t}</h2><p class="rv">${h.p}</p></header>
<div class="hero-img ${h.cls} rv" data-fx="${h.fx}"><div class="pic" style="background-image:url(../assets/img/${h.img}.jpg)">${(h.spells||[]).map(sp).join('')}</div><div class="mist"></div><div class="flick"></div><canvas class="fx"></canvas><div class="dof2"></div><div class="dof"></div><div class="chips">${APPS.filter(a=>a.cat===h.cat).map(a=>`<a class="chip" href="#${a.id}"><img src="../assets/icons/${a.id}.png" alt=""><span>${nm(a.id,a.c)}</span></a>`).join('')}</div></div></section>`).join('');
$('#grid').innerHTML=APPS.map((a,i)=>`<article class="tile rv" id="${a.id}" style="--ac:${a.c};--d:${(i%4)*.07}s"><img src="../assets/icons/${a.id}.png" alt="" loading="lazy"><small>${I18N.cats[a.cat]}</small><h3>${nm(a.id,a.c)}</h3><p>${a.d}</p><div class="a"><a href="apps/${a.id}.html">${I18N.more}</a><a href="${GH}${a.repo}/releases/latest">${I18N.download}</a></div></article>`).join('');
$('#logos').innerHTML=APPS.map(a=>`<a href="../assets/icons/${a.id}.png" download><img src="../assets/icons/${a.id}.png" alt="" loading="lazy"><span>${a.id}</span></a>`).join('');
/* éventail d'icônes */
const fan=$('#fan'),n=APPS.length;fan.innerHTML=APPS.map((a,i)=>{const t=i-(n-1)/2;return `<div class="ic" style="--n:${i};--i:${(t*(innerWidth<700?24:62)).toFixed(0)};--j:${(Math.abs(t)**1.6*2.4).toFixed(0)};--r:${(t*2.2).toFixed(1)}"><img src="../assets/icons/${a.id}.png" alt=""></div>`}).join('');
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

/* activité dans les illustrations : particules à profondeur de champ, selon l'ambiance du chapitre */
(function(){const RMx=matchMedia('(prefers-reduced-motion: reduce)').matches;
document.querySelectorAll('.hero-img,.hero[data-fx]').forEach(box=>{const fx=box.dataset.fx,cv=box.querySelector('canvas.fx'),c=cv.getContext('2d');let W=0,H=0,P=[],on=false,raf=0;
 const N={snow:80,glint:46,dust:60,ember:55,dawn:52}[fx]||40;
 const mk=()=>({x:Math.random()*W,y:Math.random()*H,z:Math.random(),s:Math.random()*6.28,t:Math.random()*6.28});
 function size(){const r=box.getBoundingClientRect();W=cv.width=Math.max(1,r.width);H=cv.height=Math.max(1,r.height);P=Array.from({length:N},mk)}
 size();new ResizeObserver(size).observe(box);
 function frame(){if(!on)return;c.clearRect(0,0,W,H);
  for(const p of P){const z=p.z,r=.8+z*z*(fx==='glint'?2.2:4.2),bl=Math.abs(z-.5)*2*9;p.s+=.012;p.t+=.03;
   if(fx==='snow'){p.y+=.3+z*1.4;p.x+=Math.sin(p.s)*(.25+z*.6);c.fillStyle=`rgba(235,244,255,${.3+z*.55})`;c.shadowColor='#bfe3ff'}
   else if(fx==='ember'){p.y-=.25+z*1.0;p.x+=Math.sin(p.s)*(.3+z*.5);c.fillStyle=`rgba(255,${150+z*90|0},70,${.25+z*.6})`;c.shadowColor='#ff9a2e'}
   else if(fx==='dawn'){p.y-=.1+z*.38;p.x+=.18+Math.sin(p.s)*.35;c.fillStyle=`rgba(255,226,150,${.15+z*.5})`;c.shadowColor='#ffd27a'}
   else if(fx==='dust'){p.y-=.12+z*.3;p.x+=.2+z*.5+Math.sin(p.s)*.3;c.fillStyle=`rgba(210,220,255,${.2+z*.5})`;c.shadowColor='#a5b4fc'}
   else{p.x+=Math.sin(p.s)*.12;p.y+=Math.cos(p.s)*.1;const tw=.5+.5*Math.sin(p.t);c.fillStyle=`rgba(190,235,255,${(.1+z*.8)*tw})`;c.shadowColor='#7dd3fc'}
   if(p.y>H+10)p.y=-10;if(p.y<-10)p.y=H+10;if(p.x>W+10)p.x=-10;if(p.x<-10)p.x=W+10;
   c.shadowBlur=bl+3;c.beginPath();c.arc(p.x,p.y,r,0,6.283);c.fill()}
  raf=requestAnimationFrame(frame)}
 new IntersectionObserver(es=>{on=es[0].isIntersecting;cancelAnimationFrame(raf);if(on&&!RMx)frame();else if(on){frame();cancelAnimationFrame(raf)}}).observe(box);
 box.addEventListener('pointermove',e=>{const r=box.getBoundingClientRect();box.style.setProperty('--mx',((e.clientX-r.left)/r.width*2-1).toFixed(3));box.style.setProperty('--my',((e.clientY-r.top)/r.height*2-1).toFixed(3))});
 box.addEventListener('pointerleave',()=>{box.style.setProperty('--mx',0);box.style.setProperty('--my',0)});
});})();
