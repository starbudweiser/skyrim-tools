// lecteur « porte à griffe » de l'accueil : rien n'est chargé avant le clic
(()=>{
const $=id=>document.getElementById(id),v=$('kv-v'),dlg=$('kv-dlg'),st=$('kv-st'),pl=$('kv-pl');
document.querySelectorAll('.kv-slot').forEach(s=>s.replaceWith($('kv-doorT').content.cloneNode(true)));
const doors=[...st.querySelectorAll('.kv-half .kv-door')];
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
// chapitres : un animal de la porte par appli (angle sur l'anneau, 0° = haut)
const CH=[[10.6,315,'mORTEX'],[22.7,0,'mABBAJACK'],[29.5,90,'sKYCRASH'],[36.2,270,'nEXUSWATCH'],[43,180,dlg.dataset.more]];
const D=64.4,fmt=s=>`${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,'0')}`;
function crop(el,deg,size){const k=size/128,R=240,cx=512+R*Math.sin(deg*Math.PI/180),cy=512-R*Math.cos(deg*Math.PI/180);
 el.style.backgroundSize=1024*k+'px';el.style.backgroundPosition=`${-(cx*k-size/2)}px ${-(cy*k-size/2)}px`}
const marks=CH.map(([t,a,n])=>{const m=document.createElement('div');m.className='kv-mark';m.style.left=(t/D*100)+'%';m.innerHTML=`<span>${n}</span>`;
 m.onclick=e=>{e.stopPropagation();v.currentTime=t;v.play()};$('kv-tr').append(m);return [m,a]});
const sizeMarks=()=>marks.forEach(([m,a])=>crop(m,a,m.offsetWidth||34));
for(let i=0;i<26;i++){const s=document.createElement('s');s.style.cssText=`left:${42+Math.random()*16}%;--t:${(1+Math.random()*1.4).toFixed(2)}s;--d:${(Math.random()*.5).toFixed(2)}s;--x:${(Math.random()*80-40).toFixed(0)}px`;$('kv-dust').append(s)}
const snd=new Audio('../assets/film/door.mp3');snd.volume=.7;snd.preload='none';
const setRings=(a,b,c)=>doors.forEach(d=>{d.style.setProperty('--ra',a+'deg');d.style.setProperty('--rb',b+'deg');d.style.setProperty('--rc',c+'deg')});
let timers=[],last;
const at=(ms,f)=>timers.push(setTimeout(f,ms));
function reset(){timers.forEach(clearTimeout);timers=[];st.className='kv-stage';pl.classList.remove('kv-ready');setRings(135,-90,45);v.pause()}
function open(){
 last=document.activeElement;reset();dlg.classList.add('kv-on');sizeMarks();
 if(!v.src){v.src='../assets/film/kit.mp4'}
 v.load();
 if(RM){st.classList.add('kv-gone');pl.classList.add('kv-ready');v.play().catch(()=>{});return}
 snd.currentTime=0;snd.play().catch(()=>{});
 at(250,()=>setRings(0,0,0));                 // les trois anneaux tournent jusqu'à la combinaison
 at(1650,()=>st.classList.add('kv-lit'));        // la griffe s'allume
 at(2050,()=>st.classList.add('kv-crack'));      // fente de lumière
 at(2350,()=>{st.classList.add('kv-open');v.play().catch(()=>{})}); // les battants s'écartent, la vidéo démarre
 at(3700,()=>{st.classList.add('kv-gone');pl.classList.add('kv-ready')});
}
function close(){reset();dlg.classList.remove('kv-on');last&&last.focus()}
$('kv-watch').onclick=open;$('kv-close').onclick=close;
dlg.onclick=e=>{if(e.target===dlg)close()};
const toggle=()=>v.paused?v.play():v.pause();
$('kv-pp').onclick=toggle;v.onclick=toggle;$('kv-again').onclick=()=>{st.classList.remove('kv-ended');v.currentTime=0;v.play()};
v.onplay=()=>{st.classList.remove('kv-ended');$('kv-ppi').setAttribute('d','M7 4h4v16H7zM13 4h4v16h-4z');$('kv-pp').setAttribute('aria-label',dlg.dataset.pause)};
v.onpause=()=>{$('kv-ppi').setAttribute('d','M7 4l13 8-13 8z');$('kv-pp').setAttribute('aria-label',dlg.dataset.play)};
v.onended=()=>st.classList.add('kv-ended');
v.ontimeupdate=()=>{const d=v.duration||D,p=v.currentTime/d*100;$('kv-fl').style.width=p+'%';$('kv-tm').textContent=`${fmt(v.currentTime)} / ${fmt(d)}`;
 let cur=-1;CH.forEach(([t],i)=>{if(v.currentTime>=t)cur=i});marks.forEach(([m],i)=>m.classList.toggle('kv-on',i===cur))};
$('kv-tr').onclick=e=>{const r=e.currentTarget.getBoundingClientRect();v.currentTime=(e.clientX-r.left)/r.width*(v.duration||D)};
$('kv-mu').onclick=()=>{v.muted=!v.muted;$('kv-mu').setAttribute('aria-pressed',v.muted);$('kv-mui').style.display=v.muted?'none':''};
$('kv-cc').onclick=()=>{const t=v.textTracks[0],on=t.mode!=='showing';t.mode=on?'showing':'hidden';$('kv-cc').setAttribute('aria-pressed',on)};
$('kv-fs').onclick=()=>{document.fullscreenElement?document.exitFullscreen():pl.requestFullscreen?.()};
addEventListener('resize',sizeMarks);
addEventListener('keydown',e=>{if(!dlg.classList.contains('kv-on'))return;
 if(e.key==='Escape')close();else if(e.key===' '||e.key==='k'){e.preventDefault();toggle()}
 else if(e.key==='ArrowRight')v.currentTime+=5;else if(e.key==='ArrowLeft')v.currentTime-=5;
 else if(e.key==='m')$('kv-mu').click();else if(e.key==='c')$('kv-cc').click();else if(e.key==='f')$('kv-fs').click()});
setRings(135,-90,45);
})();
