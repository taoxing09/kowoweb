const shellLang=(document.documentElement.lang||'fr').toLowerCase().startsWith('en')?'en':'fr';
const shellNav=document.querySelector('.nav-inner,.kowo-nav-inner,body > .nav,body > .kowo-nav');
if(shellNav&&!shellNav.querySelector('.global-language-switch')){
  const existingSwitcher=shellNav.querySelector('.lang');
  const switcher=existingSwitcher||document.createElement('div');
  switcher.classList.add('global-language-switch');
  switcher.setAttribute('aria-label',shellLang==='en'?'Choose language':'Choisir la langue');
  switcher.innerHTML=`<a href="/" lang="fr" ${shellLang==='fr'?'class="active" aria-current="page"':''}>FR</a><a href="/en.html" lang="en" ${shellLang==='en'?'class="active" aria-current="page"':''}>EN</a>`;
  const menuButton=shellNav.querySelector('.hamb,.hamburger,.menu-button');
  shellNav.insertBefore(switcher,menuButton||null);
}
const shellTargets=document.querySelectorAll('main section,.section,.legal-card,.card,.role-card,.matrix-card,.compliance-card,.doc-card,.flow-step,.bullet');
shellTargets.forEach((element,index)=>{element.dataset.shellReveal='';element.style.setProperty('--reveal-delay',`${Math.min(index%4,3)*55}ms`)});
const shellObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('shell-visible');shellObserver.unobserve(entry.target)}}),{threshold:.08,rootMargin:'0px 0px -25px'});
shellTargets.forEach(element=>shellObserver.observe(element));
