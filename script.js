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
    const isActive = button.classList.contains('active');
    filters.forEach(item => item.classList.remove('active'));
    if (!isActive) {
      button.classList.add('active');
      projects.forEach(project => project.classList.toggle('hidden', project.dataset.category !== button.dataset.filter));
    } else {
      projects.forEach(project => project.classList.remove('hidden'));
    }
  }));
}

// Lightbox (only present on work.html)
const lightbox = document.querySelector('.lightbox');
if (lightbox) {
  const lightboxImage = lightbox.querySelector('img');
  const lightboxVideo = lightbox.querySelector('video');
  const lightboxCaption = lightbox.querySelector('p');
  projects.forEach(project => project.addEventListener('click', () => {
    if (project.dataset.video) {
      if (lightboxImage) lightboxImage.style.display = 'none';
      if (lightboxVideo) {
        lightboxVideo.style.display = 'block';
        lightboxVideo.src = project.dataset.video;
        lightboxVideo.play().catch(() => {});
      }
    } else {
      if (lightboxVideo) {
        lightboxVideo.pause();
        lightboxVideo.style.display = 'none';
      }
      if (lightboxImage) {
        lightboxImage.style.display = 'block';
        lightboxImage.src = project.dataset.image;
        lightboxImage.alt = project.dataset.title;
      }
    }
    if (lightboxCaption) lightboxCaption.textContent = project.dataset.title;
    lightbox.showModal();
  }));
  const closeBtn = lightbox.querySelector('.close');
  const closeLightbox = () => {
    if (lightboxVideo) { lightboxVideo.pause(); lightboxVideo.src = ''; }
    lightbox.close();
  };
  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', event => { if (event.target === lightbox) closeLightbox(); });
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
