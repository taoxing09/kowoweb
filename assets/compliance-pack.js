const progress = document.querySelector('.progress');
const onScroll = () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.width = `${Math.max(0, Math.min(100, scrollY / max * 100))}%`;
};
addEventListener('scroll', onScroll); onScroll();
const io = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); }), {threshold: .12});
document.querySelectorAll('.reveal').forEach(el => io.observe(el));
const hamb = document.querySelector('.hamb'); const nav = document.querySelector('.navlinks');
hamb?.addEventListener('click', () => nav.classList.toggle('open'));
nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
