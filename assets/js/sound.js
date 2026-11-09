
/* effets sonores de la météo du hero (accueil) : activés par défaut, coupables par le bouton de la barre (choix gardé d'une page à l'autre).
   Le navigateur n'autorise le son qu'après une première interaction : le contexte démarre au premier clic, toucher ou touche.
   Boucle Web Audio seulement avec le hero à l'écran ; contexte suspendu dès qu'on n'écoute plus (aucun calcul) ; tonnerre décalé après chaque éclair de l'orage */
(function(){const b=document.getElementById('snd'),hx=document.querySelector('.hero'),AC=window.AudioContext||window.webkitAudioContext;
const get=k=>{try{return localStorage.getItem(k)}catch(e){return null}},set=(k,v)=>{try{localStorage.setItem(k,v)}catch(e){}};
let on=get('snd')!=='off',cx=null,ok=false;  /* ok : le navigateur a autorisé le son au moins une fois */
/* le bouton montre ce qu'on entend : barré tant que le navigateur n'a pas encore autorisé le son */
const live=()=>on&&(ok||!AC||!cur());
let hint=null,ht=0;
function ui(){if(!b)return;const l=live();b.setAttribute('aria-pressed',l);b.setAttribute('aria-label',l?b.dataset.on:b.dataset.off);b.classList.toggle('on',l);
 const need=on&&!ok&&!!AC&&!!cur()&&!!b.dataset.hint;clearTimeout(ht);
 if(need){ht=setTimeout(()=>{if(!hint){hint=document.createElement('span');hint.className='snd-hint';hint.setAttribute('aria-hidden','true');hint.textContent=b.dataset.hint;b.append(hint)}requestAnimationFrame(()=>hint.classList.add('show'))},2500)}
 else if(hint)hint.classList.remove('show')}
const VOL={clair:.7,neige:.75,blizzard:.5,pluie:.55,orage:.55,brouillard:.75,automne:.6},U='../assets/audio/wx/';
let g=null,vis=true,busy=null,th=[],off=0,first,gone;
const cur=()=>hx&&hx.querySelector('canvas.wx')&&VOL[hx.dataset.wx]?hx.dataset.wx:'',dlg=document.getElementById('kv-dlg'),want=()=>on&&vis&&!document.hidden&&!(dlg&&dlg.classList.contains('kv-on'))&&!!VOL[cur()];
const buf=u=>fetch(u).then(r=>r.arrayBuffer()).then(d=>new Promise((ok,ko)=>cx.decodeAudioData(d,ok,ko)));
function load(){if(busy)return busy;const w=cur();
 busy=buf(U+w+'.m4a').then(a=>{const s=cx.createBufferSource();s.buffer=a;s.loop=true;s.loopEnd=Math.min(a.duration,32);s.connect(g);s.start()}).catch(()=>{busy=null});
 if(w==='orage')[1,2,3].forEach(i=>buf(U+'thunder'+i+'.m4a').then(a=>th.push(a),()=>{}));return busy}
function apply(gest){if(!AC||!hx)return;clearTimeout(off);
 if(!want()){if(!cx)return;const t=cx.currentTime;g.gain.cancelScheduledValues(t);g.gain.setValueAtTime(g.gain.value,t);g.gain.linearRampToValueAtTime(0,t+1);off=setTimeout(()=>cx.suspend(),1100);return}
 if(!cx){if(!gest)return;cx=new AC();cx.onstatechange=()=>{if(cx.state==='running')ok=true;ui()};g=cx.createGain();g.gain.value=0;g.connect(cx.destination)}
 /* déverrouillage dans le geste lui-même (Safari) : reprise + tampon muet joué tout de suite */
 if(gest&&cx.state!=='running'){try{const z=cx.createBufferSource();z.buffer=cx.createBuffer(1,1,22050);z.connect(cx.destination);z.start(0)}catch(e){}}
 cx.resume().then(()=>{if(!want()||cx.state!=='running')return;gone();load();const t=cx.currentTime;g.gain.cancelScheduledValues(t);g.gain.setValueAtTime(g.gain.value,t);g.gain.linearRampToValueAtTime(VOL[cur()],t+2.5)},()=>{})}
/* première interaction : le navigateur autorise alors le son */
/* clic, toucher ou touche : seuls gestes qui autorisent le son dans tous les navigateurs (pas pointerdown sous Safari) */
first=()=>apply(true);gone=()=>['click','touchend','keydown'].forEach(e=>removeEventListener(e,first,true));
['click','touchend','keydown'].forEach(e=>addEventListener(e,first,true));
/* son voulu mais encore bloqué : le clic sur le bouton le lance au lieu de le couper */
if(b)b.addEventListener('click',()=>{if(!(on&&AC&&cur()&&!ok)){on=!on;set('snd',on?'on':'off')}ui();apply(true)});
ui();
document.addEventListener('visibilitychange',()=>apply());
if(dlg)new MutationObserver(()=>apply()).observe(dlg,{attributes:true,attributeFilter:['class']});  /* silence pendant la vidéo */
if(hx&&'IntersectionObserver'in window)new IntersectionObserver(es=>{vis=es[0].isIntersecting;apply()},{threshold:.15}).observe(hx);
addEventListener('wx-flash',()=>{if(!want()||!th.length||!cx||cx.state!=='running')return;const s=cx.createBufferSource(),k=cx.createGain();s.buffer=th[Math.random()*th.length|0];
 k.gain.value=.35+Math.random()*.2;s.connect(k);k.connect(cx.destination);s.start(cx.currentTime+.5+Math.random()*2.2)});
addEventListener('load',()=>setTimeout(()=>{ui();apply()},300));
})();
