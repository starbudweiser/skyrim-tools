
/* musique : coupée par défaut ; le choix et la position suivent d'une page à l'autre ; fondu à l'entrée et à la sortie */
(function(){const b=document.getElementById('snd');if(!b)return;let a=null,fade=0;
const get=k=>{try{return localStorage.getItem(k)}catch(e){return null}},set=(k,v)=>{try{localStorage.setItem(k,v)}catch(e){}};
function ui(on){b.setAttribute('aria-pressed',on);b.setAttribute('aria-label',on?b.dataset.on:b.dataset.off);b.classList.toggle('on',on)}
function ramp(to,done){cancelAnimationFrame(fade);const from=a.volume,t0=performance.now();(function f(t){const p=Math.max(0,Math.min(1,(t-t0)/1200));a.volume=from+(to-from)*p;if(p<1)fade=requestAnimationFrame(f);else done&&done()})(t0)}
function start(){if(!a){a=new Audio(b.dataset.src);a.loop=true;a.volume=0;const p=+get('snd-t')||0;if(p)a.currentTime=p}
 return a.play().then(()=>{ramp(.55);ui(true);set('snd','on');dispatchEvent(new CustomEvent('snd',{detail:true}))})}
function stop(){ui(false);set('snd','off');dispatchEvent(new CustomEvent('snd',{detail:false}));if(a)ramp(0,()=>a.pause())}
b.addEventListener('click',()=>{b.classList.contains('on')?stop():start().catch(()=>{})});
addEventListener('pagehide',()=>{if(a)set('snd-t',a.currentTime.toFixed(1))});
ui(false);
if(get('snd')==='on')start().catch(()=>{const go=()=>{start().catch(()=>{});removeEventListener('pointerdown',go)};addEventListener('pointerdown',go)});
})();
/* ambiance de la météo du hero (accueil) : seulement avec le son allumé et le hero à l'écran ; boucle Web Audio,
   contexte suspendu dès qu'on n'écoute plus (aucun calcul) ; tonnerre décalé après chaque éclair de l'orage */
(function(){const hx=document.querySelector('.hero'),AC=window.AudioContext||window.webkitAudioContext;if(!hx||!AC)return;
const VOL={clair:.7,neige:.75,blizzard:.5,pluie:.55,orage:.55,brouillard:.75,automne:.6},LEN={pluie:26,orage:26},U='../assets/audio/wx/';
let cx=null,g=null,on=false,vis=true,busy=null,th=[],off=0;
const cur=()=>hx.querySelector('canvas.wx')?hx.dataset.wx||'':'',want=()=>on&&vis&&!document.hidden&&!!VOL[cur()];
const buf=u=>fetch(u).then(r=>r.arrayBuffer()).then(d=>new Promise((ok,ko)=>cx.decodeAudioData(d,ok,ko)));
function load(){if(busy)return busy;const w=cur();
 busy=buf(U+w+'.m4a').then(b=>{const s=cx.createBufferSource();s.buffer=b;s.loop=true;s.loopEnd=Math.min(b.duration,LEN[w]||32);s.connect(g);s.start()}).catch(()=>{busy=null});
 if(w==='orage')[1,2,3].forEach(i=>buf(U+'thunder'+i+'.m4a').then(b=>th.push(b),()=>{}));return busy}
function apply(){clearTimeout(off);if(!want()){if(!cx)return;const t=cx.currentTime;g.gain.cancelScheduledValues(t);g.gain.setValueAtTime(g.gain.value,t);g.gain.linearRampToValueAtTime(0,t+1);off=setTimeout(()=>cx.suspend(),1100);return}
 if(!cx){cx=new AC();g=cx.createGain();g.gain.value=0;g.connect(cx.destination)}
 cx.resume();load();const t=cx.currentTime;g.gain.cancelScheduledValues(t);g.gain.setValueAtTime(g.gain.value,t);g.gain.linearRampToValueAtTime(VOL[cur()],t+2.5)}
addEventListener('snd',e=>{on=e.detail;apply()});
document.addEventListener('visibilitychange',apply);
if('IntersectionObserver'in window)new IntersectionObserver(es=>{vis=es[0].isIntersecting;apply()},{threshold:.15}).observe(hx);
addEventListener('wx-flash',()=>{if(!want()||!th.length)return;const s=cx.createBufferSource(),k=cx.createGain();s.buffer=th[Math.random()*th.length|0];
 k.gain.value=.35+Math.random()*.2;s.connect(k);k.connect(cx.destination);s.start(cx.currentTime+.5+Math.random()*2.2)});
})();
