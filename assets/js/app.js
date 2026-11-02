
const $=s=>document.querySelector(s);
$('#tg')&&($('#tg').onclick=()=>{const t=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=t;try{localStorage.setItem('theme-b',t)}catch(e){}});
document.querySelectorAll('.lg a').forEach(a=>a.addEventListener('click',()=>{try{localStorage.setItem('lang',a.dataset.l)}catch(e){}}));
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.rv').forEach(el=>io.observe(el));
