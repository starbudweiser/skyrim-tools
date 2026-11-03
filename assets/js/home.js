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

/* vidéos des illustrations : lecture seulement à l'écran ; animations CSS en pause hors écran */
(function(){const RMx=false;  /* animations gardées même avec « Réduire les animations » (choix du 03/11/2026) */
/* dragon du hero : 3 versions (near détaillée et nette, mid, far voilée), vols aléatoires sur une courbe de Bézier à vitesse constante,
   plus rapide quand il est proche, inclinaison selon la pente, retourné selon le sens */
const wv=[...document.querySelectorAll('.wyrm video')];if(wv.length){const box=wv[0].parentElement,R=Math.random,U=(a,b)=>a+(b-a)*R(),bz=(p,t)=>{const u=1-t;return u*u*u*p[0]+3*u*u*t*p[1]+3*u*t*t*p[2]+t*t*t*p[3]};
 const Z={near:{w:[.42,.6],max:880,blur:.6,f:'none',T:[4.5,6.5],y:[-.1,.6]},mid:{w:[.22,.32],max:460,blur:2.2,f:'contrast(.95)',T:[8,11],y:[0,.5]},far:{w:[.1,.15],max:230,blur:2.6,f:'contrast(.82) brightness(1.18) saturate(.8)',T:[13,18],y:[.02,.4]}};
 const DC=['gris','glace','feu','bronze'];  // couleur du dragon tirée au hasard à chaque passage
 const fly=()=>{const q=R(),k=q<.3?'near':q<.65?'mid':'far',c=Z[k],v=wv.find(e=>e.dataset.z===k),col=DC[Math.floor(R()*DC.length)],W=box.clientWidth,H=box.clientHeight,d=R()<.5?-1:1,w=Math.min(W*U(...c.w),c.max);
  wv.forEach(e=>{if(e!==v){e.pause();e.style.visibility='hidden'}});
  v.style.width=w+'px';v.style.filter=(c.blur?'blur('+c.blur+'px) ':'')+c.f;v.preload='auto';const st=()=>{try{v.currentTime=U(0,7.9)}catch(e){}};if(v.dataset.c!==col){v.dataset.c=col;[...v.querySelectorAll('source')].forEach(s=>s.src=s.src.replace(/dragon_\w+?_(near|mid|far)\./,'dragon_'+col+'_$1.'));v.load();v.addEventListener('loadedmetadata',st,{once:true})}else st();v.playbackRate=k==='near'?U(.95,1.05):U(.9,1.12);v.play().catch(()=>{});
  const a0=d<0?W+w*.1:-w*1.1,a3=d<0?-w*1.1:W+w*.1,xs=[a0,a0+(a3-a0)*U(.2,.45),a0+(a3-a0)*U(.55,.8),a3],ys=[0,0,0,0].map(()=>U(...c.y)*H);
  const T=U(...c.T)*1000*Math.max(.8,Math.min(1.4,W/1300)),N=64,L=[0];for(let i=1;i<=N;i++)L.push(L[i-1]+Math.hypot(bz(xs,i/N)-bz(xs,(i-1)/N),bz(ys,i/N)-bz(ys,(i-1)/N)));
  const at=s=>{const x=s*L[N];let i=1;while(i<N&&L[i]<x)i++;return(i-1+(x-L[i-1])/((L[i]-L[i-1])||1))/N};
  let t0=performance.now(),r=0;v.style.visibility='visible';
  const step=n=>{const s=(n-t0)/T;if(s>=1){v.style.visibility='hidden';v.pause();setTimeout(fly,U(2,7)*1000);return}
   const t=at(s),x=bz(xs,t),y=bz(ys,t),e=.002,dy=bz(ys,Math.min(1,t+e))-bz(ys,Math.max(0,t-e)),dx=Math.abs(bz(xs,Math.min(1,t+e))-bz(xs,Math.max(0,t-e)))||1;
   r+=(Math.max(-16,Math.min(16,-Math.atan2(dy,dx)*57.3))-r)*.06;
   v.style.transform='translate3d('+x.toFixed(1)+'px,'+y.toFixed(1)+'px,0) scaleX('+(-d)+') rotate('+r.toFixed(2)+'deg)';requestAnimationFrame(step)};
  requestAnimationFrame(step)};
 setTimeout(fly,1200)}
/* serveuse dans les cases vides de la dernière ligne de la grille (2 cases libres ou plus) */
const g=document.getElementById('grid');if(g){const w=document.createElement('div');w.className='wench';w.setAttribute('aria-hidden','true');
 w.innerHTML='<div class="wimg"><video class="vfx steam" muted loop playsinline preload="none" data-r="1" style="left:-2.35%;top:-35.17%;width:82.63%"><source src="../assets/video/steam.mov" type=\'video/mp4; codecs="hvc1"\'><source src="../assets/video/steam.webm" type="video/webm"></video></div>';g.append(w);
 const fit=()=>{const n=getComputedStyle(g).gridTemplateColumns.split(' ').length,k=APPS.length%n,e=k?n-k:0;w.style.display=e<2?'none':'';w.style.gridColumn=e<2?'':'span '+e};fit();addEventListener('resize',fit,{passive:true})}
document.querySelectorAll('.hero-img,.hero,.sage,.press .dragon,.wench').forEach(box=>{const vids=[...box.querySelectorAll('video.vfx')];
 new IntersectionObserver(es=>{const on=es[0].isIntersecting;box.classList.toggle('off',!on);
  vids.forEach(v=>{if(on&&!RMx){v.preload='auto';v.playbackRate=+v.dataset.r||1;v.play().catch(()=>{})}else v.pause()})}).observe(box);
 if(!box.classList.contains('hero-img'))return;
 box.addEventListener('pointermove',e=>{const r=box.getBoundingClientRect();box.style.setProperty('--mx',((e.clientX-r.left)/r.width*2-1).toFixed(3));box.style.setProperty('--my',((e.clientY-r.top)/r.height*2-1).toFixed(3))});
 box.addEventListener('pointerleave',()=>{box.style.setProperty('--mx',0);box.style.setProperty('--my',0)});
});})();
