// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open);
    navToggle.textContent = open ? '×' : '☰';
  });
  document.querySelectorAll('.nav a').forEach(link => link.addEventListener('click', () => nav.classList.remove('open')));
}

// Work gallery filters (only present on work.html)
const filters = document.querySelectorAll('.filters button');
const projects = document.querySelectorAll('.project[data-category]');
if (filters.length && projects.length) {
  filters.forEach(button => button.addEventListener('click', () => {
    filters.forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    projects.forEach(project => project.classList.toggle('hidden', button.dataset.filter !== 'all' && project.dataset.category !== button.dataset.filter));
  }));
}

// Lightbox (only present on work.html)
const lightbox = document.querySelector('.lightbox');
if (lightbox) {
  const lightboxImage = lightbox.querySelector('img');
  const lightboxCaption = lightbox.querySelector('p');
  projects.forEach(project => project.addEventListener('click', () => {
    lightboxImage.src = project.dataset.image;
    lightboxImage.alt = project.dataset.title;
    lightboxCaption.textContent = project.dataset.title;
    lightbox.showModal();
  }));
  const closeBtn = lightbox.querySelector('.close');
  if (closeBtn) closeBtn.addEventListener('click', () => lightbox.close());
  lightbox.addEventListener('click', event => { if (event.target === lightbox) lightbox.close(); });
}

// Footer year (present on every page)
const yearEl = document.querySelector('#year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Lead form -> WhatsApp handoff (present on index.html and contact.html)
const leadForm = document.querySelector('#lead-form');
if (leadForm) {
  leadForm.addEventListener('submit', event => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const message = `Hello Sanmahi Solutions, I would like a free quote.\n\nName: ${form.get('name')}\nPhone: ${form.get('phone')}\nService: ${form.get('service')}\nProject details: ${form.get('details') || 'Not provided'}`;
    window.open(`https://wa.me/918667664248?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
  });
}
