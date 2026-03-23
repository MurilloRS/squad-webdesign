/* =========================================
   OLLIRUM — Main JavaScript
   @frontend-dev (Finn)
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initHeroCanvas();
  initFAQ();
  initScrollReveal();
  initForm();
});

/* === NAVBAR === */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* === HERO CANVAS — Particle Network === */
function initHeroCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const PURPLE = [108, 99, 255];
  const GREEN  = [0, 229, 160];
  const NODE_COUNT = 55;
  const MAX_DIST = 160;

  let nodes = [];
  let W, H, animId;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function lerp(a, b, t) { return a + (b - a) * t; }

  function createNodes() {
    nodes = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 1,
      t: Math.random(), // position on gradient 0=purple 1=green
    }));
  }

  function nodeColor(t, alpha) {
    const r = Math.round(lerp(PURPLE[0], GREEN[0], t));
    const g = Math.round(lerp(PURPLE[1], GREEN[1], t));
    const b = Math.round(lerp(PURPLE[2], GREEN[2], t));
    return `rgba(${r},${g},${b},${alpha})`;
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Lines
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > MAX_DIST) continue;
        const alpha = (1 - dist / MAX_DIST) * 0.35;
        const mt = (nodes[i].t + nodes[j].t) / 2;
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.strokeStyle = nodeColor(mt, alpha);
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    // Nodes
    nodes.forEach(n => {
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = nodeColor(n.t, 0.7);
      ctx.fill();
    });
  }

  function update() {
    nodes.forEach(n => {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;
      n.x = Math.max(0, Math.min(W, n.x));
      n.y = Math.max(0, Math.min(H, n.y));
    });
  }

  function loop() {
    update();
    draw();
    animId = requestAnimationFrame(loop);
  }

  const ro = new ResizeObserver(() => {
    resize();
    nodes.forEach(n => {
      n.x = Math.min(n.x, W);
      n.y = Math.min(n.y, H);
    });
  });
  ro.observe(canvas);

  resize();
  createNodes();
  loop();
}

/* === FAQ ACCORDION === */
function initFAQ() {
  const items = document.querySelectorAll('.faq-item');
  items.forEach(item => {
    const btn = item.querySelector('.faq-question');
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // Close all
      items.forEach(i => i.classList.remove('open'));
      // Toggle current
      if (!isOpen) item.classList.add('open');
      btn.setAttribute('aria-expanded', !isOpen);
    });
  });
}

/* === SCROLL REVEAL === */
function initScrollReveal() {
  const els = document.querySelectorAll(
    '.pain-card, .service-card, .step-card, .why-card, .faq-item, .solution-grid, .ba-card'
  );
  els.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => observer.observe(el));
}

/* === FORM === */
function initForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const btnText    = form.querySelector('.btn-text');
  const btnLoading = form.querySelector('.btn-loading');

  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (!validateForm(form)) return;

    btnText.hidden    = true;
    btnLoading.hidden = false;

    try {
      const data = Object.fromEntries(new FormData(form));
      const res  = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Erro ao enviar. Tente novamente.');
      }

      showSuccess(form);
    } catch (ex) {
      btnText.hidden    = false;
      btnLoading.hidden = true;
      let errEl = form.querySelector('.form-error');
      if (!errEl) {
        errEl = document.createElement('p');
        errEl.className = 'form-error';
        errEl.style.cssText = 'color:#ff8080;font-size:.875rem;text-align:center;margin-top:.5rem;';
        form.appendChild(errEl);
      }
      errEl.textContent = ex.message;
    }
  });

  // WhatsApp mask
  const whatsInput = document.getElementById('whatsapp');
  if (whatsInput) {
    whatsInput.addEventListener('input', e => {
      let v = e.target.value.replace(/\D/g, '').slice(0, 11);
      if (v.length > 6)       v = `(${v.slice(0,2)}) ${v.slice(2,7)}-${v.slice(7)}`;
      else if (v.length > 2)  v = `(${v.slice(0,2)}) ${v.slice(2)}`;
      else if (v.length > 0)  v = `(${v}`;
      e.target.value = v;
    });
  }
}

function validateForm(form) {
  let valid = true;
  const required = form.querySelectorAll('[required]');
  required.forEach(field => {
    const group = field.closest('.form-group');
    if (!field.value.trim()) {
      group?.classList.add('error');
      valid = false;
    } else {
      group?.classList.remove('error');
    }
    field.addEventListener('input', () => group?.classList.remove('error'), { once: true });
  });
  return valid;
}

function showSuccess(form) {
  form.innerHTML = `
    <div style="text-align:center; padding: 2rem 0;">
      <div style="font-size:3rem; margin-bottom:1rem;">✅</div>
      <h3 style="font-family:'Plus Jakarta Sans',sans-serif; font-size:1.375rem; font-weight:700; color:#F5F5F7; margin-bottom:0.75rem;">
        Recebemos sua solicitação!
      </h3>
      <p style="color:#8B8B9E; font-size:0.9375rem; line-height:1.6;">
        Nossa equipe entrará em contato em breve para agendar<br>o seu diagnóstico gratuito.
      </p>
    </div>
  `;
}
