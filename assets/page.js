const pageHeader=document.querySelector('[data-page-header]');
const pageMenuButton=document.querySelector('[data-page-menu-button]');
const pageMenu=document.querySelector('[data-page-menu]');
const closePageMenu=()=>{document.body.classList.remove('page-menu-open');pageMenuButton?.setAttribute('aria-expanded','false')};
pageMenuButton?.addEventListener('click',()=>{const open=document.body.classList.toggle('page-menu-open');pageMenuButton.setAttribute('aria-expanded',String(open))});
pageMenu?.querySelectorAll('a').forEach(link=>link.addEventListener('click',closePageMenu));
window.addEventListener('scroll',()=>pageHeader?.classList.toggle('is-scrolled',scrollY>18),{passive:true});
const pageObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');pageObserver.unobserve(entry.target)}}),{threshold:.1,rootMargin:'0px 0px -28px'});
document.querySelectorAll('[data-reveal]').forEach((element,index)=>{element.style.setProperty('--delay',`${Math.min(index%4,3)*55}ms`);pageObserver.observe(element)});
