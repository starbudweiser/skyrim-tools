
/* musique : coupée par défaut ; le choix et la position suivent d'une page à l'autre ; fondu à l'entrée et à la sortie */
(function(){const b=document.getElementById('snd');if(!b)return;let a=null,fade=0;
const get=k=>{try{return localStorage.getItem(k)}catch(e){return null}},set=(k,v)=>{try{localStorage.setItem(k,v)}catch(e){}};
function ui(on){b.setAttribute('aria-pressed',on);b.setAttribute('aria-label',on?b.dataset.on:b.dataset.off);b.classList.toggle('on',on)}
function ramp(to,done){cancelAnimationFrame(fade);const from=a.volume,t0=performance.now();(function f(t){const p=Math.min(1,(t-t0)/1200);a.volume=from+(to-from)*p;if(p<1)fade=requestAnimationFrame(f);else done&&done()})(t0)}
function start(){if(!a){a=new Audio(b.dataset.src);a.loop=true;a.volume=0;const p=+get('snd-t')||0;if(p)a.currentTime=p}
 return a.play().then(()=>{ramp(.55);ui(true);set('snd','on')})}
function stop(){ui(false);set('snd','off');if(a)ramp(0,()=>a.pause())}
b.addEventListener('click',()=>{b.classList.contains('on')?stop():start().catch(()=>{})});
addEventListener('pagehide',()=>{if(a)set('snd-t',a.currentTime.toFixed(1))});
ui(false);
if(get('snd')==='on')start().catch(()=>{const go=()=>{start().catch(()=>{});removeEventListener('pointerdown',go)};addEventListener('pointerdown',go)});
})();
