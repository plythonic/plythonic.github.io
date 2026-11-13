/* Plython — animated background + mouse effect */
(function () {
  const canvas = document.getElementById('bgCanvas');
  const glow = document.getElementById('cursorGlow');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const COLORS = ['59,130,246', '124,92,255']; // site blue + logo violet
  const LINK = 140;      // particle-to-particle link distance
  const MOUSE_R = 170;   // mouse influence radius

  let w = 0, h = 0, dpr = 1, parts = [], raf = 0, running = false;
  const mouse = { x: -9999, y: -9999, active: false };

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const max = w < 720 ? 42 : 110;
    const count = Math.min(max, Math.round((w * h) / 11000));
    while (parts.length < count) parts.push(spawn());
    parts.length = count;
    if (reduce) draw();
  }

  function spawn() {
    const a = Math.random() * Math.PI * 2;
    const sp = 0.12 + Math.random() * 0.28;
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      vx: Math.cos(a) * sp,
      vy: Math.sin(a) * sp,
      r: 1.2 + Math.random() * 1.8,
      c: COLORS[Math.random() < 0.7 ? 0 : 1]
    };
  }

  function step() {
    for (const p of parts) {
      if (mouse.active) {
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < MOUSE_R * MOUSE_R && d2 > 1) {
          const d = Math.sqrt(d2);
          const f = (1 - d / MOUSE_R) * 0.9;
          p.x += (dx / d) * f;
          p.y += (dy / d) * f;
        }
      }
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < -10) p.x = w + 10; else if (p.x > w + 10) p.x = -10;
      if (p.y < -10) p.y = h + 10; else if (p.y > h + 10) p.y = -10;
    }
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);

    for (let i = 0; i < parts.length; i++) {
      const a = parts[i];
      for (let j = i + 1; j < parts.length; j++) {
        const b = parts[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < LINK * LINK) {
          const o = (1 - Math.sqrt(d2) / LINK) * 0.34;
          ctx.strokeStyle = 'rgba(' + a.c + ',' + o.toFixed(3) + ')';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
      // lines from the mouse to nearby particles
      if (mouse.active) {
        const mx = a.x - mouse.x, my = a.y - mouse.y;
        const md2 = mx * mx + my * my;
        if (md2 < MOUSE_R * MOUSE_R * 1.6) {
          const o = (1 - Math.sqrt(md2) / (MOUSE_R * 1.26)) * 0.55;
          if (o > 0) {
            ctx.strokeStyle = 'rgba(96,165,250,' + o.toFixed(3) + ')';
            ctx.lineWidth = 1.1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }
    }

    for (const p of parts) {
      ctx.fillStyle = 'rgba(' + p.c + ',.95)';
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function loop() {
    step();
    draw();
    raf = requestAnimationFrame(loop);
  }

  function start() {
    if (running || reduce) return;
    running = true;
    raf = requestAnimationFrame(loop);
  }
  function stop() {
    running = false;
    cancelAnimationFrame(raf);
  }

  /* ----- mouse / touch ----- */
  function move(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.active = true;
    if (glow) {
      glow.style.transform = 'translate3d(' + mouse.x + 'px,' + mouse.y + 'px,0) translate(-50%,-50%)';
      glow.classList.add('on');
    }
    if (reduce) draw();
  }
  function leave() {
    mouse.active = false;
    mouse.x = mouse.y = -9999;
    if (glow) glow.classList.remove('on');
    if (reduce) draw();
  }

  window.addEventListener('pointermove', move, { passive: true });
  window.addEventListener('pointerdown', move, { passive: true });
  window.addEventListener('pointerup', function (e) { if (e.pointerType !== 'mouse') leave(); }, { passive: true });
  window.addEventListener('pointercancel', leave, { passive: true });
  document.documentElement.addEventListener('mouseleave', leave);

  let rt;
  window.addEventListener('resize', function () {
    clearTimeout(rt);
    rt = setTimeout(resize, 150);
  });
  document.addEventListener('visibilitychange', function () {
    document.hidden ? stop() : start();
  });

  resize();
  start();
})();
