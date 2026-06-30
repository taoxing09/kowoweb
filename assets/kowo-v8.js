(function(){
  const b=document.querySelector('.hamb'), m=document.querySelector('.mobile'), x=document.querySelector('.x');
  const open=()=>{document.body.classList.add('menu-open'); b&&b.setAttribute('aria-expanded','true');};
  const close=()=>{document.body.classList.remove('menu-open'); b&&b.setAttribute('aria-expanded','false');};
  b&&b.addEventListener('click',open); x&&x.addEventListener('click',close); m&&m.addEventListener('click',e=>{if(e.target===m)close();});
  document.querySelectorAll('.mobile a').forEach(a=>a.addEventListener('click',close));
  const io=new IntersectionObserver((entries)=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('on')}),{threshold:.12});
  document.querySelectorAll('.reveal,.card,.role,.case,.metric,.node').forEach(el=>{el.classList.add('reveal');io.observe(el);});
})();
