(function(){const PERF=window.PERF||(window.PERF=(()=>{const n=navigator,c=n.connection||{},de=document.documentElement,cb=[],qf=new URLSearchParams(location.search).get('fx');
 let t=2,why='';const ST=k=>{try{return localStorage.getItem(k)}catch(e){return null}};
 if(qf!==null&&'012'.includes(qf)&&qf!=='')t=+qf;
 else{const mob=matchMedia('(max-width:820px),(pointer:coarse)').matches;
  let gpu='';try{const g=document.createElement('canvas').getContext('webgl'),x=g&&g.getExtension('WEBGL_debug_renderer_info');gpu=x?String(g.getParameter(x.UNMASKED_RENDERER_WEBGL)):g?'':'none'}catch(e){gpu='none'}
  const soft=/swiftshader|llvmpipe|software|basic render|microsoft basic|none/i.test(gpu),cores=n.hardwareConcurrency||4,mem=n.deviceMemory||8,px=screen.width*(devicePixelRatio||1)*screen.height*(devicePixelRatio||1);
  if(mob||c.saveData||matchMedia('(prefers-reduced-data: reduce)').matches||soft||cores<4||mem<4){t=0;why=mob?'mobile':soft?'gpu':'eco'}
  else if(cores<6||mem<8||(px>14e6&&cores<8)){t=1;why='moyen'}
  try{const k=+sessionStorage.getItem('perf-cap2');if(k>=0&&k<t&&sessionStorage.getItem('perf-cap2')!==null)t=k}catch(e){}}
 const P={tier:t,why,on:f=>cb.push(f),set(v){if(v>=P.tier)return;P.tier=v;de.dataset.perf=v;try{sessionStorage.setItem('perf-cap2',v)}catch(e){}cb.forEach(f=>f(v))}};
 de.dataset.perf=t;
 /* surveillance : si l'affichage tombe sous 30 images/s sur trois fenêtres de 2 s d'affilée (page au premier plan), on retire un niveau d'effets pour la session (jamais l'inverse) */
 if(qf===null||qf===''){let f=0,t0=0,bad=0,last=0;const loop=now=>{if(P.tier<1)return;if(document.hidden||!document.hasFocus()||now-last>250){f=0;t0=now;last=now;requestAnimationFrame(loop);return}last=now;f++;
   if(!t0)t0=now;if(now-t0>=2000){const fps=f*1000/(now-t0);bad=fps<30?bad+1:0;f=0;t0=now;if(bad>=3){bad=0;P.set(P.tier-1)}}requestAnimationFrame(loop)};
  setTimeout(()=>requestAnimationFrame(loop),2500)}
 return P})());

if(PERF.tier<2)return;let wx=document.documentElement.dataset.wx;if(!wx){try{wx=localStorage.getItem('wx-last')}catch(e){}document.documentElement.dataset.wx=wx||''}
if(wx!=='neige'&&wx!=='blizzard')return;const R=Math.random,U=(a,b)=>a+(b-a)*R();
const st=document.createElement('style');st.textContent=`
.ice{position:absolute;left:0;right:0;top:0;height:60px;pointer-events:none;z-index:6;filter:drop-shadow(0 2px 3px rgba(40,70,110,.25))}
.ice{-webkit-mask-image:linear-gradient(to right,transparent,#000 9%,#000 91%,transparent);mask-image:linear-gradient(to right,transparent,#000 9%,#000 91%,transparent)}
.ice svg{display:block;width:100%;height:100%;overflow:visible}
.frost{position:absolute;inset:0;border-radius:inherit;pointer-events:none;z-index:5;overflow:hidden;box-shadow:inset 0 0 0 1px rgba(225,240,255,.4),inset 0 0 28px rgba(200,225,255,.22)}
.frost::before,.frost::after{content:"";position:absolute;background-repeat:no-repeat;background-size:cover}
.frost::before{right:0;top:0;width:62%;height:78%;background-image:url(../assets/img/frost_shard.webp);background-position:right top;transform:scaleX(var(--fx,1));opacity:1;-webkit-mask-image:radial-gradient(ellipse 100% 100% at 100% 0,#000 22%,transparent 74%);mask-image:radial-gradient(ellipse 100% 100% at 100% 0,#000 22%,transparent 74%)}
.frost::after{left:0;bottom:0;width:70%;height:62%;background-image:url(../assets/img/frost_crack.webp);background-position:left bottom;transform:scaleX(var(--fx,1));opacity:1;-webkit-mask-image:radial-gradient(ellipse 100% 100% at 0 100%,#000 25%,transparent 76%);mask-image:radial-gradient(ellipse 100% 100% at 0 100%,#000 25%,transparent 76%)}
/* filtre froid : décor et illustrations légèrement désaturés et bleutés, voile bleu glacé par-dessus */
.pano,.hero-img .pic,.app-hero .big img{filter:saturate(.72) hue-rotate(-10deg) brightness(.97) contrast(1.02)}
.pano{filter:blur(2px) saturate(.7) hue-rotate(-10deg) brightness(1.02)}
.hero-img::after,.hero::before{box-shadow:none}
.hero-img .pic::after{content:"";position:absolute;inset:0;background:linear-gradient(160deg,rgba(130,175,235,.34),rgba(90,130,200,.2));mix-blend-mode:soft-light;pointer-events:none}
.hero-img .pic::before{content:"";position:absolute;inset:0;background:rgba(150,190,240,.14);mix-blend-mode:color;pointer-events:none;z-index:1}
[data-theme=light] .frost::before,[data-theme=light] .frost::after{filter:brightness(.55) saturate(1.8) drop-shadow(0 0 1px rgba(60,100,160,.6))}
.btn{box-shadow:inset 0 0 0 1px rgba(225,240,255,.55),inset 0 0 14px rgba(215,235,255,.35)}`;document.head.append(st);
const NS='http://www.w3.org/2000/svg';
const ice=(el,w,h,long)=>{const d=document.createElement('i');d.className='ice';d.setAttribute('aria-hidden','true');let p=`M0 0H${w}V3`,x=w,hl='';
 while(x>0){const iw=U(4,13),gap=U(2,long?26:18),e=Math.min(x,w-x)/w,tp=Math.max(.08,Math.min(1,e/.14)),L=(R()<.12?U(h*.6,h):R()<.5?U(h*.2,h*.5):U(3,h*.2))*tp,cx=x-iw/2-U(-1,1);
  p+=`L${(x).toFixed(1)} ${U(3,6).toFixed(1)}Q${(x-iw*.2).toFixed(1)} ${(L*.6).toFixed(1)} ${cx.toFixed(1)} ${L.toFixed(1)}Q${(x-iw*.85).toFixed(1)} ${(L*.55).toFixed(1)} ${(x-iw).toFixed(1)} ${U(3,6).toFixed(1)}`;
  if(L>10)hl+=`M${(x-iw*.3).toFixed(1)} 5L${(cx+iw*.08).toFixed(1)} ${(L*.8).toFixed(1)}`;x-=iw+gap;p+=`L${Math.max(0,x).toFixed(1)} ${U(3,6).toFixed(1)}`}
 p+='L0 3Z';const id='ig'+Math.floor(R()*1e9);
 d.innerHTML=`<svg xmlns="${NS}" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none"><defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".97"/><stop offset=".35" stop-color="#e3f1ff" stop-opacity=".85"/><stop offset="1" stop-color="#a9d0f5" stop-opacity=".55"/></linearGradient></defs><path d="${p}" fill="url(#${id})" stroke="rgba(120,160,205,.55)" stroke-width=".8"/><path d="${hl}" stroke="#fff" stroke-opacity=".8" stroke-width="1.1" fill="none" stroke-linecap="round"/></svg>`;
 if(getComputedStyle(el).position==='static')el.style.position='relative';el.append(d)};
const deco=()=>{
 document.querySelectorAll('.tile,.hero-img,.app-hero .big,.shots img').forEach(el=>{if(el.dataset.ice)return;el.dataset.ice=1;
  if(getComputedStyle(el).position==='static')el.style.position='relative';
  const f=document.createElement('i');f.className='frost';f.style.setProperty('--fx',R()<.5?1:-1);f.style.setProperty('--fy',R()<.5?1:-1);f.setAttribute('aria-hidden','true');if(el.tagName!=='IMG')el.append(f);
  if(el.tagName!=='IMG'&&el.offsetWidth>150)ice(el,el.offsetWidth,Math.min(60,el.offsetWidth*.16),true)})};
deco();new MutationObserver(deco).observe(document.body,{childList:true,subtree:true});})();
