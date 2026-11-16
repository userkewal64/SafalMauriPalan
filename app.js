/**
 * SAFAL MAURI PALAN — LUXURY INTERACTIVE SCRIPT (app.js)
 * High-performance 3D visual rendering, scroll-spy, gallery lightbox,
 * and direct WhatsApp ordering integration.
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollSpy();
  init3DHeroJar();
  initFlyingBee();
  initGalleryLightbox();
  initEquipmentFilter();
  initScrollToTop();
  initWhatsAppHelpers();
});

/* --------------------------------------------------------------------------
   1. STICKY NAVBAR & MOBILE MENU
   -------------------------------------------------------------------------- */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const toggleBtn = document.querySelector('.nav-toggle');
  const closeBtn = document.querySelector('.mobile-close');
  const mobileMenu = document.querySelector('.mobile-menu');
  const backdrop = document.querySelector('.backdrop');
  const mobileLinks = document.querySelectorAll('.mobile-menu .nav-link');

  // Sticky header on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  }, { passive: true });

  // Mobile menu open / close
  function openMenu() {
    mobileMenu?.classList.add('open');
    backdrop?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileMenu?.classList.remove('open');
    backdrop?.classList.remove('active');
    document.body.style.overflow = '';
  }

  toggleBtn?.addEventListener('click', openMenu);
  closeBtn?.addEventListener('click', closeMenu);
  backdrop?.addEventListener('click', closeMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

/* --------------------------------------------------------------------------
   2. SCROLL SPY (ACTIVE LINK HIGHLIGHTING)
   -------------------------------------------------------------------------- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinks = document.querySelectorAll('.nav-links .nav-link');

  if (!sections.length || !navLinks.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/* --------------------------------------------------------------------------
   3. CINEMATIC 3D HONEY JAR & PARTICLES (THREE.JS WITH FALLBACK)
   -------------------------------------------------------------------------- */
function init3DHeroJar() {
  const canvas = document.getElementById('hero-3d-canvas');
  const fallback = document.querySelector('.hero-product-fallback');
  
  // Graceful degradation if Three.js is not loaded or WebGL is unsupported
  if (!canvas || typeof THREE === 'undefined') {
    if (fallback) fallback.style.display = 'flex';
    return;
  }

  try {
    const wrapper = canvas.parentElement;
    let width = wrapper.clientWidth || 450;
    let height = wrapper.clientHeight || 520;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xfff4d6, 0.9);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffb834, 2.2);
    keyLight.position.set(5, 8, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x40a060, 1.2);
    rimLight.position.set(-5, 4, -4);
    scene.add(rimLight);

    const bottomGlow = new THREE.PointLight(0xf5b027, 2.5, 10);
    bottomGlow.position.set(0, -2, 2);
    scene.add(bottomGlow);

    // Main Jar Group
    const jarGroup = new THREE.Group();
    scene.add(jarGroup);

    // 1. Honey Liquid (Internal Body)
    const honeyGeo = new THREE.CylinderGeometry(1.22, 1.18, 2.3, 32);
    const honeyMat = new THREE.MeshPhysicalMaterial({
      color: 0xdf8c0b,
      emissive: 0x5a2d00,
      roughness: 0.1,
      metalness: 0.05,
      transmission: 0.65,
      ior: 1.45,
      transparent: true,
      opacity: 0.92
    });
    const honeyMesh = new THREE.Mesh(honeyGeo, honeyMat);
    honeyMesh.position.y = -0.15;
    jarGroup.add(honeyMesh);

    // 2. Glass Jar (Outer Shell)
    const glassGeo = new THREE.CylinderGeometry(1.3, 1.25, 2.65, 36);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.04,
      metalness: 0.05,
      transmission: 0.88,
      ior: 1.52,
      reflectivity: 0.9,
      transparent: true,
      opacity: 0.75
    });
    const glassMesh = new THREE.Mesh(glassGeo, glassMat);
    glassMesh.position.y = -0.1;
    jarGroup.add(glassMesh);

    // 3. Wooden / Golden Lid
    const lidGeo = new THREE.CylinderGeometry(1.38, 1.38, 0.42, 36);
    const lidMat = new THREE.MeshStandardMaterial({
      color: 0x8a5822,
      roughness: 0.45,
      metalness: 0.2
    });
    const lidMesh = new THREE.Mesh(lidGeo, lidMat);
    lidMesh.position.y = 1.35;
    jarGroup.add(lidMesh);

    // Lid Rim Ring
    const lidRingGeo = new THREE.TorusGeometry(1.36, 0.06, 16, 36);
    const lidRingMat = new THREE.MeshStandardMaterial({ color: 0xf5b027, metalness: 0.7, roughness: 0.2 });
    const lidRing = new THREE.Mesh(lidRingGeo, lidRingMat);
    lidRing.rotation.x = Math.PI / 2;
    lidRing.position.y = 1.18;
    jarGroup.add(lidRing);

    // 4. Custom Label Canvas Texture
    const labelCanvas = document.createElement('canvas');
    labelCanvas.width = 512;
    labelCanvas.height = 256;
    const ctx = labelCanvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#0a1a10';
      ctx.fillRect(0, 0, 512, 256);
      ctx.strokeStyle = '#f5b027';
      ctx.lineWidth = 6;
      ctx.strokeRect(12, 12, 488, 232);

      // Gold Label text
      ctx.fillStyle = '#f5b027';
      ctx.font = 'bold 36px Georgia, serif';
      ctx.textAlign = 'center';
      ctx.fillText('SAFAL MAURI PALAN', 256, 75);

      ctx.fillStyle = '#f7f4ea';
      ctx.font = '22px Arial, sans-serif';
      ctx.fillText('सफल मौरी पालन • Itahari', 256, 120);

      ctx.fillStyle = '#ffd466';
      ctx.font = 'italic 20px Georgia, serif';
      ctx.fillText('100% PURE & RAW HONEY', 256, 165);

      ctx.fillStyle = '#a0b8a6';
      ctx.font = '16px Arial, sans-serif';
      ctx.fillText('Net Wt. 1 Kg / 500g', 256, 210);
    }
    const labelTexture = new THREE.CanvasTexture(labelCanvas);
    const labelGeo = new THREE.CylinderGeometry(1.305, 1.305, 1.4, 36, 1, true, -Math.PI / 3, (2 * Math.PI) / 3);
    const labelMat = new THREE.MeshBasicMaterial({
      map: labelTexture,
      transparent: true,
      side: THREE.DoubleSide
    });
    const labelMesh = new THREE.Mesh(labelGeo, labelMat);
    labelMesh.position.y = -0.15;
    jarGroup.add(labelMesh);

    // 5. Wooden Honey Dipper Stick
    const dipperGroup = new THREE.Group();
    const handleGeo = new THREE.CylinderGeometry(0.08, 0.08, 3.2, 16);
    const handleMat = new THREE.MeshStandardMaterial({ color: 0x9e652a, roughness: 0.5 });
    const handleMesh = new THREE.Mesh(handleGeo, handleMat);
    dipperGroup.add(handleMesh);

    // Dipper head rings
    for (let i = 0; i < 4; i++) {
      const ringGeo = new THREE.TorusGeometry(0.28, 0.08, 12, 24);
      const ringMesh = new THREE.Mesh(ringGeo, handleMat);
      ringMesh.rotation.x = Math.PI / 2;
      ringMesh.position.y = -0.9 + i * 0.22;
      dipperGroup.add(ringMesh);
    }

    // Dripping Honey Drop
    const dropGeo = new THREE.SphereGeometry(0.18, 16, 16);
    dropGeo.scale(1, 1.6, 1);
    const dropMat = new THREE.MeshPhysicalMaterial({
      color: 0xf5b027,
      transmission: 0.7,
      roughness: 0.1,
      ior: 1.48
    });
    const dropMesh = new THREE.Mesh(dropGeo, dropMat);
    dropMesh.position.y = -1.35;
    dipperGroup.add(dropMesh);

    dipperGroup.position.set(2.0, 0.2, 0.5);
    dipperGroup.rotation.z = -0.35;
    scene.add(dipperGroup);

    // 6. Floating Golden Pollen Particles
    const particleCount = 140;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 10;
      positions[i + 1] = (Math.random() - 0.5) * 8;
      positions[i + 2] = (Math.random() - 0.5) * 8;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xffd466,
      size: 0.065,
      transparent: true,
      opacity: 0.8
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Hide CSS fallback if WebGL succeeds
    if (fallback) fallback.style.display = 'none';

    // Interactive Drag / Rotation
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotationY = 0.3;
    let targetRotationX = 0.08;

    canvas.addEventListener('mousedown', (e) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    });

    window.addEventListener('mouseup', () => { isDragging = false; });

    window.addEventListener('mousemove', (e) => {
      if (isDragging) {
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        targetRotationY += deltaX * 0.008;
        targetRotationX += deltaY * 0.005;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
      }
    });

    // Touch support
    canvas.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
      }
    }, { passive: true });

    window.addEventListener('touchend', () => { isDragging = false; });

    window.addEventListener('touchmove', (e) => {
      if (isDragging && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - prevMouseX;
        const deltaY = e.touches[0].clientY - prevMouseY;
        targetRotationY += deltaX * 0.008;
        targetRotationX += deltaY * 0.005;
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
      }
    }, { passive: true });

    // Window Resize
    window.addEventListener('resize', () => {
      width = wrapper.clientWidth || 450;
      height = wrapper.clientHeight || 520;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });

    // Animation Loop
    let clock = new THREE.Clock();
    function animate() {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Gentle auto float and smooth damping
      if (!isDragging) {
        targetRotationY += 0.004;
      }
      jarGroup.rotation.y += (targetRotationY - jarGroup.rotation.y) * 0.08;
      jarGroup.rotation.x += (targetRotationX - jarGroup.rotation.x) * 0.08;
      jarGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.12;

      // Dipper gentle motion
      dipperGroup.position.y = 0.2 + Math.cos(elapsedTime * 1.8) * 0.08;

      // Particles drift
      particles.rotation.y = elapsedTime * 0.03;
      particles.rotation.x = elapsedTime * 0.015;

      renderer.render(scene, camera);
    }
    animate();

  } catch (err) {
    console.warn('WebGL / Three.js fallback active:', err);
    if (fallback) fallback.style.display = 'flex';
  }
}

/* --------------------------------------------------------------------------
   4. FLYING BEE HOVER ANIMATION
   -------------------------------------------------------------------------- */
function initFlyingBee() {
  const beeContainer = document.querySelector('.flying-bee-container');
  if (!beeContainer) return;

  let x = window.innerWidth * 0.6;
  let y = 180;
  let targetX = x;
  let targetY = y;
  let angle = 0;

  // Track cursor gently
  window.addEventListener('mousemove', (e) => {
    targetX = Math.min(window.innerWidth - 60, Math.max(30, e.clientX + 40));
    targetY = Math.min(window.innerHeight - 60, Math.max(80, e.clientY - 40));
  }, { passive: true });

  function updateBee() {
    angle += 0.04;
    const hoverWobbleX = Math.sin(angle) * 18;
    const hoverWobbleY = Math.cos(angle * 1.4) * 14;

    x += (targetX + hoverWobbleX - x) * 0.05;
    y += (targetY + hoverWobbleY - y) * 0.05;

    beeContainer.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    requestAnimationFrame(updateBee);
  }
  updateBee();
}

/* --------------------------------------------------------------------------
   5. GALLERY FILTER & LIGHTBOX MODAL
   -------------------------------------------------------------------------- */
function initGalleryLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const modal = document.getElementById('lightbox-modal');
  const modalImg = document.getElementById('lightbox-img');
  const modalCaption = document.getElementById('lightbox-caption');
  const closeBtn = document.querySelector('.lightbox-close');

  if (!modal || !modalImg) return;

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const caption = item.querySelector('.gallery-overlay span');
      if (img) {
        modalImg.src = img.src;
        modalImg.alt = img.alt || 'Safal Mauri Palan Apiary Photo';
        if (modalCaption && caption) {
          modalCaption.textContent = caption.textContent;
        }
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  closeBtn?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* --------------------------------------------------------------------------
   6. EQUIPMENT FILTER TABS
   -------------------------------------------------------------------------- */
function initEquipmentFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.equipment-card');

  if (!filterBtns.length || !cards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter') || 'all';

      cards.forEach(card => {
        const category = card.getAttribute('data-category') || '';
        if (filterVal === 'all' || category.includes(filterVal)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   7. SCROLL TO TOP BUTTON
   -------------------------------------------------------------------------- */
function initScrollToTop() {
  const btn = document.querySelector('.scroll-top-btn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* --------------------------------------------------------------------------
   8. WHATSAPP INQUIRY BUILDERS
   -------------------------------------------------------------------------- */
function initWhatsAppHelpers() {
  const primaryPhone = '9779802313025';

  // Honey product order buttons
  const orderBtns = document.querySelectorAll('.order-honey-btn');
  orderBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const product = btn.getAttribute('data-product') || 'Itahari Honey';
      const weight = btn.getAttribute('data-weight') || '1 Kg';
      const price = btn.getAttribute('data-price') || 'Rs. 1200';
      const text = encodeURIComponent(
        `Namaste Safal Mauri Palan! I would like to order: \n` +
        `• Product: ${product}\n` +
        `• Size: ${weight} (Price: ${price})\n` +
        `Please confirm available variety (Mustard/Litchi/Multifloral) and delivery to my address.`
      );
      window.open(`https://wa.me/${primaryPhone}?text=${text}`, '_blank');
    });
  });

  // Equipment inquiry buttons
  const equipBtns = document.querySelectorAll('.equipment-inquire-btn');
  equipBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const item = btn.getAttribute('data-item') || 'Beekeeping Equipment';
      const text = encodeURIComponent(
        `Namaste Safal Mauri Palan! I am inquiring about:\n` +
        `• Beekeeping Item: ${item}\n` +
        `Please share the current pricing, stock availability, and delivery options.`
      );
      window.open(`https://wa.me/${primaryPhone}?text=${text}`, '_blank');
    });
  });

  // Custom Quick Inquiry Form
  const customInquiryBtn = document.getElementById('custom-inquiry-btn');
  if (customInquiryBtn) {
    customInquiryBtn.addEventListener('click', () => {
      const input = document.getElementById('inquiry-msg-input');
      const customMsg = input && input.value.trim() ? input.value.trim() : 'I would like to inquire about your natural honey and beekeeping services.';
      const text = encodeURIComponent(`Namaste Safal Mauri Palan!\n\n${customMsg}`);
      window.open(`https://wa.me/${primaryPhone}?text=${text}`, '_blank');
    });
  }
}
