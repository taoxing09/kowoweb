const menu=document.querySelector('.menu-button'),panel=document.querySelector('.mobile-menu');
menu?.addEventListener('click',()=>{const open=document.body.classList.toggle('menu-open');menu.setAttribute('aria-expanded',open)});
panel?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>document.body.classList.remove('menu-open')));
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
window.addEventListener('scroll',()=>document.querySelector('.nav-shell')?.classList.toggle('scrolled',scrollY>30),{passive:true});
