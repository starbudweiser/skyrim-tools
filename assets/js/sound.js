
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
/* cris de dragon lointains au passage des dragons : 16 cris tirés dans un sac (pas de répétition avant d'avoir tout entendu),
   chargés à la demande ; hauteur, niveau et éloignement variés à chaque fois, le cri suit le dragon de gauche à droite */
const DN=16,dbag=[],dbuf={};
const dnext=()=>{if(!dbag.length){for(let i=1;i<=DN;i++)dbag.push(i);for(let i=DN-1;i>0;i--){const j=Math.random()*(i+1)|0;[dbag[i],dbag[j]]=[dbag[j],dbag[i]]}}return dbag.pop()};
const dget=i=>dbuf[i]||(dbuf[i]=buf(U+'dragon'+String(i).padStart(2,'0')+'.m4a').catch(()=>{delete dbuf[i]}));
addEventListener('wyrm',e=>{if(!on||!ok||!cx||!vis||document.hidden||(dlg&&dlg.classList.contains('kv-on')))return;const{k,d,T}=e.detail,R=Math.random,far=k==='far';
 const cry=(delay,i)=>dget(i).then(a=>{if(!a||cx.state!=='running')return;const s=cx.createBufferSource(),f=cx.createBiquadFilter(),gn=cx.createGain(),t=cx.currentTime+delay/1000;
  s.buffer=a;s.playbackRate.value=(far?.86:.92)+R()*.18;f.type='lowpass';f.frequency.value=far?1500+R()*700:2600+R()*900;gn.gain.value=far?.2+R()*.12:.34+R()*.14;
  s.connect(f);f.connect(gn);let out=gn;
  if(cx.createStereoPanner){const pn=cx.createStereoPanner(),p0=-d*.65*(1-delay/T*1.6),dur=Math.max(.5,(T-delay)/1000);pn.pan.setValueAtTime(Math.max(-1,Math.min(1,p0)),t);pn.pan.linearRampToValueAtTime(d*.65,t+dur);gn.connect(pn);out=pn}
  out.connect(cx.destination);s.start(t)});
 const d1=T*(.12+R()*.33);cry(d1,dnext());if(R()<.3)cry(d1+1800+R()*T*.3,dnext())});
})();
