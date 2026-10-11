const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
const reveals = document.querySelectorAll<HTMLElement>('[data-reveal]');
if (!motion.matches && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) if (entry.isIntersecting) { entry.target.classList.remove('reveal-pending'); observer.unobserve(entry.target); }
  }, { threshold: 0.07 });
  reveals.forEach(el => { el.classList.add('reveal-pending'); observer.observe(el); });
  motion.addEventListener('change', () => { if (motion.matches) { reveals.forEach(el => el.classList.remove('reveal-pending')); observer.disconnect(); } });
}
const header = document.querySelector<HTMLElement>('.site-header');
const progress = document.querySelector<HTMLElement>('.scroll-progress');
const heroMedia = document.querySelector<HTMLElement>('.hero-media');
const PARALLAX_MIN_WIDTH = 900;
let scheduled = false;
const updateScroll = () => {
  const scroll = window.scrollY;
  header?.classList.toggle('scrolled', scroll > 45);
  if (progress) progress.style.transform = `scaleX(${scroll / Math.max(1, document.documentElement.scrollHeight - window.innerHeight)})`;
  if (heroMedia && !motion.matches && window.innerWidth > PARALLAX_MIN_WIDTH && scroll < 900) heroMedia.style.transform = `translate3d(0, ${scroll * 0.18}px, 0)`;
  scheduled = false;
};
window.addEventListener('scroll', () => { if (!scheduled) { scheduled = true; requestAnimationFrame(updateScroll); } }, { passive: true });
updateScroll();
const menu = document.querySelector<HTMLDialogElement>('#mobile-menu');
const toggle = document.querySelector<HTMLButtonElement>('.menu-toggle');
const closeMenu = () => { menu?.close(); };
toggle?.addEventListener('click', () => { menu?.showModal(); toggle.setAttribute('aria-expanded', 'true'); document.body.classList.add('menu-open'); });
menu?.querySelector('.menu-close')?.addEventListener('click', closeMenu);
menu?.addEventListener('click', event => { if (event.target === menu) closeMenu(); });
menu?.addEventListener('close', () => { toggle?.setAttribute('aria-expanded', 'false'); document.body.classList.remove('menu-open'); toggle?.focus(); });
menu?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
const megaToggle = document.querySelector<HTMLButtonElement>('.mega-toggle');
const mega = document.querySelector<HTMLElement>('#services-mega');
const setMega = (open: boolean) => { if (!mega) return; mega.hidden = !open; megaToggle?.setAttribute('aria-expanded', String(open)); };
megaToggle?.addEventListener('click', () => setMega(Boolean(mega?.hidden)));
document.addEventListener('click', event => {
  if (!mega || mega.hidden || !(event.target instanceof Node)) return;
  if (!mega.contains(event.target) && !megaToggle?.contains(event.target)) setMega(false);
});
document.addEventListener('keydown', event => { if (event.key === 'Escape' && mega && !mega.hidden) { setMega(false); megaToggle?.focus(); } });
mega?.addEventListener('focusout', event => { if (event.relatedTarget instanceof Node && !mega.contains(event.relatedTarget) && event.relatedTarget !== megaToggle) setMega(false); });
window.addEventListener('resize', () => { if (window.innerWidth <= 1040) setMega(false); }, { passive: true });
const form = document.querySelector<HTMLFormElement>('[data-enquiry-form]');
if (form) {
  const submit = form.querySelector<HTMLButtonElement>('.form-submit')!;
  submit.disabled = false;
  const fullName = form.elements.namedItem('name') as HTMLInputElement;
  const locationField = form.elements.namedItem('location') as HTMLInputElement;
  const phone = form.elements.namedItem('phone') as HTMLInputElement;
  const feedback = form.querySelector<HTMLElement>('.form-feedback')!;
  const draftActions = form.querySelector<HTMLElement>('.draft-actions')!;
  const draftLink = form.querySelector<HTMLAnchorElement>('.draft-link')!;
  const select = form.elements.namedItem('service') as HTMLSelectElement;
  const queryService = new URLSearchParams(location.search).get('service');
  if (queryService && Array.from(select.options).some(option => option.value === queryService)) select.value = queryService;
  const resetDraft = () => { draftActions.hidden = true; draftLink.href = 'https://wa.me/919711161009'; feedback.textContent = ''; phone.setCustomValidity(''); fullName.setCustomValidity(''); locationField.setCustomValidity(''); };
  form.addEventListener('input', resetDraft); form.addEventListener('change', resetDraft);
  form.addEventListener('submit', event => {
    event.preventDefault();
    phone.setCustomValidity('');
    fullName.setCustomValidity(fullName.value.trim().length < 2 ? 'Please enter your name.' : '');
    locationField.setCustomValidity(!locationField.value.trim() ? 'Please enter your service location.' : '');
    const digits = phone.value.replace(/\D/g, '');
    const local = digits.length === 12 && digits.startsWith('91') ? digits.slice(2) : digits;
    if (!/^[+\d\s().-]+$/.test(phone.value) || !/^[6-9]\d{9}$/.test(local)) { phone.setCustomValidity('Enter a valid 10-digit Indian mobile number, optionally with +91.'); phone.reportValidity(); return; }
    if (!form.reportValidity()) return;
    const values = new FormData(form);
    if (String(values.get('website') || '').trim()) { feedback.textContent = 'We couldn’t prepare this enquiry. Please contact us by phone.'; return; }
    const text = `Hello JSS Elite Group India, I would like to discuss a service requirement.\n\nName: ${String(values.get('name')).trim()}\nMobile: +91${local}\nService: ${values.get('service')}\nLocation: ${String(values.get('location')).trim()}\n${values.get('message') ? `Details: ${String(values.get('message')).trim()}\n` : ''}\nPlease contact me to discuss availability and arrangements.`;
    draftLink.href = `https://wa.me/919711161009?text=${encodeURIComponent(text)}`;
    draftActions.hidden = false;
    feedback.textContent = 'Your enquiry is prepared. It has not been sent yet.';
    draftLink.focus();
  });
}
