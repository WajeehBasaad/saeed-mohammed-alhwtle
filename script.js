const nav = document.getElementById('siteNav');
const toggle = document.getElementById('menuToggle');
const links = [...document.querySelectorAll('.nav-link')];

toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('open', open);
});
links.forEach(link => link.addEventListener('click', () => {
  links.forEach(item => item.classList.remove('active'));
  link.classList.add('active');
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
}));

const sections = [...document.querySelectorAll('main section[id]')];
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    links.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
  });
}, { rootMargin: '-35% 0px -55% 0px' });
sections.forEach(section => observer.observe(section));

const form = document.getElementById('contactForm');
const feedback = document.getElementById('formFeedback');
form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const subject = encodeURIComponent(data.get('subject'));
  const body = encodeURIComponent(`الاسم: ${data.get('name')}\nالبريد الإلكتروني: ${data.get('email')}\n\n${data.get('message')}`);
  feedback.textContent = 'تم تجهيز رسالتك. أكمل الإرسال من تطبيق البريد الذي فُتح.';
  window.location.href = `mailto:?subject=${subject}&body=${body}`;
});

const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) {
    entry.target.classList.add('visible');
    revealObserver.unobserve(entry.target);
  }
}), { threshold: 0.12 });
document.querySelectorAll('.about-grid, .facts-row, .education, .section-heading-row, .skills-grid, .interest-list, .contact-panel').forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});
