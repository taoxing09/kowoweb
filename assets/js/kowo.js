(function(){
  const menu=document.querySelector('.mobile-menu');
  const open=document.querySelector('.menu-btn');
  const close=document.querySelector('.close-btn');
  if(open&&menu){open.addEventListener('click',()=>{menu.style.display='block';document.body.style.overflow='hidden';});}
  if(close&&menu){close.addEventListener('click',()=>{menu.style.display='none';document.body.style.overflow='';});}
  document.querySelectorAll('.mobile-menu a').forEach(a=>a.addEventListener('click',()=>{menu.style.display='none';document.body.style.overflow='';}));
  const els=document.querySelectorAll('.reveal');
  const io=new IntersectionObserver((entries)=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target);}}),{threshold:.12});
  els.forEach(el=>io.observe(el));
})();
