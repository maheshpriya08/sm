// Mobile Nav Toggle
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

// Work Gallery & Lightbox Logic (only present on work.html)
const filters = document.querySelectorAll('.filters button');
const projects = Array.from(document.querySelectorAll('.project[data-category]'));
const lightbox = document.querySelector('.lightbox');

if (filters.length && projects.length) {
  // Calculate category counts
  const counts = {
    all: projects.length,
    roofing: projects.filter(p => p.dataset.category === 'roofing').length,
    pvc: projects.filter(p => p.dataset.category === 'pvc').length,
    painting: projects.filter(p => p.dataset.category === 'painting').length
  };

  filters.forEach(button => {
    const filterKey = button.dataset.filter;
    const countSpan = button.querySelector('.count');
    if (countSpan && counts[filterKey] !== undefined) {
      countSpan.textContent = counts[filterKey];
    }

    button.addEventListener('click', () => {
      filters.forEach(item => item.classList.remove('active'));
      button.classList.add('active');

      projects.forEach(project => {
        const isMatch = filterKey === 'all' || project.dataset.category === filterKey;
        project.classList.toggle('hidden', !isMatch);
      });
    });
  });
}

// Lightbox with Next / Prev Navigation and Keyboard Shortcuts
if (lightbox && projects.length) {
  const lightboxImage = lightbox.querySelector('img');
  const lightboxVideo = lightbox.querySelector('video');
  const lightboxCaption = lightbox.querySelector('p');
  const lightboxCounter = lightbox.querySelector('.lightbox-counter');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');
  const closeBtn = lightbox.querySelector('.close');

  let currentIndex = 0;
  let visibleProjects = [...projects];

  const updateVisibleProjects = () => {
    visibleProjects = projects.filter(p => !p.classList.contains('hidden'));
  };

  const showItemAtIndex = (index) => {
    updateVisibleProjects();
    if (!visibleProjects.length) return;
    
    // Wrap around
    if (index < 0) index = visibleProjects.length - 1;
    if (index >= visibleProjects.length) index = 0;
    currentIndex = index;

    const project = visibleProjects[currentIndex];

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
        lightboxImage.alt = project.dataset.title || '';
      }
    }

    if (lightboxCaption) lightboxCaption.textContent = project.dataset.title || '';
    if (lightboxCounter) lightboxCounter.textContent = `Item ${currentIndex + 1} of ${visibleProjects.length}`;
  };

  projects.forEach((project) => {
    project.addEventListener('click', () => {
      updateVisibleProjects();
      const vIndex = visibleProjects.indexOf(project);
      showItemAtIndex(vIndex >= 0 ? vIndex : 0);
      lightbox.showModal();
    });
  });

  if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); showItemAtIndex(currentIndex - 1); });
  if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); showItemAtIndex(currentIndex + 1); });

  const closeLightbox = () => {
    if (lightboxVideo) { lightboxVideo.pause(); lightboxVideo.src = ''; }
    lightbox.close();
  };

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (event) => { if (event.target === lightbox) closeLightbox(); });

  window.addEventListener('keydown', (e) => {
    if (!lightbox.open) return;
    if (e.key === 'ArrowLeft') showItemAtIndex(currentIndex - 1);
    if (e.key === 'ArrowRight') showItemAtIndex(currentIndex + 1);
    if (e.key === 'Escape') closeLightbox();
  });
}

// Footer Year
const yearEl = document.querySelector('#year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Lead Form -> WhatsApp Handoff
const leadForm = document.querySelector('#lead-form');
if (leadForm) {
  leadForm.addEventListener('submit', event => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const message = `Hello Sanmahi Solutions, I would like a free quote.\n\nName: ${form.get('name')}\nPhone: ${form.get('phone')}\nService: ${form.get('service')}\nProject details: ${form.get('details') || 'Not provided'}`;
    window.open(`https://wa.me/918667664248?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
  });
}
