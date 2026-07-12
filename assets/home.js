const header=document.querySelector('[data-header]');
const menuButton=document.querySelector('[data-menu-button]');
const mobileMenu=document.querySelector('[data-mobile-menu]');
const closeMenu=()=>{document.body.classList.remove('menu-open');menuButton?.setAttribute('aria-expanded','false')};
menuButton?.addEventListener('click',()=>{const open=document.body.classList.toggle('menu-open');menuButton.setAttribute('aria-expanded',String(open))});
mobileMenu?.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
window.addEventListener('scroll',()=>header?.classList.toggle('is-scrolled',window.scrollY>20),{passive:true});
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}}),{threshold:.12,rootMargin:'0px 0px -30px'});
document.querySelectorAll('[data-reveal]').forEach(element=>observer.observe(element));
const stage=document.querySelector('.product-stage');
const device=document.querySelector('.device');
if(stage&&device&&window.matchMedia('(pointer:fine)').matches&&!window.matchMedia('(prefers-reduced-motion:reduce)').matches){
  stage.addEventListener('pointermove',event=>{
    const rect=stage.getBoundingClientRect();
    const x=((event.clientX-rect.left)/rect.width-.5)*10;
    const y=((event.clientY-rect.top)/rect.height-.5)*8;
    device.style.translate=`${x}px ${y}px`;
  });
  stage.addEventListener('pointerleave',()=>device.style.translate='0 0');
}
