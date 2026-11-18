const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

function animateCount(el) {
  const target = parseFloat(el.dataset.count);
  const dec = parseInt(el.dataset.dec || 0);
  const suffix = el.dataset.suffix || '';
  const sep = el.dataset.sep;
  const start = performance.now();
  const dur = 1600;

  function frame(now) {
    const p = Math.min((now - start) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    let txt = (target * eased).toFixed(dec);
    if (sep) txt = Number(txt).toLocaleString('en-US');
    el.textContent = txt + suffix;
    if (p < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}
const countIO = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCount(e.target);
      countIO.unobserve(e.target);
    }
  });
}, { threshold: .5 });
document.querySelectorAll('[data-count]').forEach(el => countIO.observe(el));

const days = 30;
const series = [];
let seed = 7;

function rnd() {
  seed = (seed * 9301 + 49297) % 233280;
  return seed / 233280;
}
for (let i = 0; i < days; i++) {
  const base = 3200 + i * 85;
  series.push(base + rnd() * 1800 - 600 + (i % 7 === 5 ? -700 : 0));
}
const svg = document.getElementById('chart');
const maxV = Math.max(...series) * 1.1;
const pts = series.map((v, i) => [i * (600 / (days - 1)), 230 - (v / maxV) * 220]);
const line = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
const area = line + ' L600 230 L0 230 Z';
let grid = '';
for (let i = 1; i < 5; i++) grid += `<line x1="0" x2="600" y1="${i * 46}" y2="${i * 46}" stroke="#1c1c22" stroke-width="1" vector-effect="non-scaling-stroke"/>`;
svg.innerHTML = `<defs><linearGradient id="ag" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4287f5" stop-opacity=".32"/><stop offset="1" stop-color="#4287f5" stop-opacity="0"/></linearGradient></defs>${grid}<path d="${area}" fill="url(#ag)"/><path id="linePath" d="${line}" fill="none" stroke="#4287f5" stroke-width="2.5" vector-effect="non-scaling-stroke" stroke-linejoin="round"/>`;
const lp = document.getElementById('linePath');
const len = lp.getTotalLength();
lp.style.strokeDasharray = len;
lp.style.strokeDashoffset = len;
lp.style.transition = 'stroke-dashoffset 2.2s ease';

function setDates() {
  const fmt = d => d.toLocaleDateString(LOC[LANG], { day: 'numeric', month: 'short' });
  const now = new Date();
  const d1 = new Date(now);
  d1.setDate(now.getDate() - 29);
  const d2 = new Date(now);
  d2.setDate(now.getDate() - 15);
  document.getElementById('d1').textContent = fmt(d1);
  document.getElementById('d2').textContent = fmt(d2);
}
setDates();

const langData = [['Moderation', 32.5], ['Ticket', 18.2], ['Automation', 15.8], ['User', 12.3], ['Server', 9.7], ['Emoji', 6.2], ['Other', 5.3]];
const langsEl = document.getElementById('langs');
function renderLangs() {
  const ready = langsEl.dataset.ready;
  langsEl.innerHTML = langData.map(([n, v]) => `<div class="lang-row"><div><span>${t(n)}</span><span>${v}%</span></div><div class="bar"><i data-w="${Math.min(v * 1.7, 100)}" style="${ready ? 'width:' + Math.min(v * 1.7, 100) + '%' : ''}"></i></div></div>`).join('');
}
renderLangs();

const chartIO = new IntersectionObserver(es => {
  es.forEach(e => {
    if (e.isIntersecting) {
      lp.style.strokeDashoffset = 0;
      document.querySelectorAll('.bar i').forEach(b => b.style.width = b.dataset.w + '%');
      langsEl.dataset.ready = '1';
      chartIO.disconnect();
    }
  });
}, { threshold: .3 });
chartIO.observe(svg);

const languageNodes = [];
const walker = document.createTreeWalker(document.documentElement, NodeFilter.SHOW_TEXT, {
  acceptNode: n => {
    const pn = n.parentNode.nodeName;
    if (pn === 'SCRIPT' || pn === 'STYLE') return NodeFilter.FILTER_REJECT;
    return T[n.nodeValue.trim()] ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
  }
});
let wn;
while ((wn = walker.nextNode())) {
  const m = wn.nodeValue.match(/^(\s*)([\s\S]*?)(\s*)$/);
  languageNodes.push({ n: wn, pre: m[1], k: m[2], post: m[3] });
}

function applyLang(l) {
  LANG = l;
  document.documentElement.lang = l;
  languageNodes.forEach(o => { o.n.nodeValue = o.pre + t(o.k) + o.post; });
  renderLangs();
  setDates();
  document.getElementById('currentLang').textContent = l === 'tr' ? 'TR' : 'EN';
  
  document.querySelectorAll('.lang-option').forEach(opt => {
    opt.classList.toggle('active', opt.dataset.lang === l);
  });
  
  try { localStorage.setItem('plython-lang', l); } catch (e) { }
}

const langDropdown = document.getElementById('langDropdown');
const langBtn = document.getElementById('langBtn');
const langMenu = document.getElementById('langMenu');

langBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  langDropdown.classList.toggle('open');
});

document.querySelectorAll('.lang-option').forEach(opt => {
  opt.addEventListener('click', (e) => {
    e.stopPropagation();
    applyLang(opt.dataset.lang);
    langDropdown.classList.remove('open');
  });
});

const menuBtn = document.getElementById('menuBtn');
const navCta = document.getElementById('navCta');

function closeMenu() {
  menuBtn.classList.remove('open');
  navCta.classList.remove('open');
  menuBtn.setAttribute('aria-expanded', 'false');
  langDropdown.classList.remove('open');
}

menuBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  const open = !navCta.classList.contains('open');
  menuBtn.classList.toggle('open', open);
  navCta.classList.toggle('open', open);
  menuBtn.setAttribute('aria-expanded', String(open));
  if (!open) langDropdown.classList.remove('open');
});

navCta.addEventListener('click', (e) => {
  if (e.target.closest('#dashboardBtn') || e.target.closest('.btn-primary')) closeMenu();
});

window.addEventListener('resize', () => { if (window.innerWidth > 720) closeMenu(); });

document.addEventListener('click', (e) => {
  langDropdown.classList.remove('open');
  if (!e.target.closest('#navCta')) closeMenu();
});

applyLang(LANG);


const dashboardBtn = document.getElementById('dashboardBtn');
let toastEl = null;
let toastTimers = [];

function showToast(message) {
  toastTimers.forEach(clearTimeout);
  toastTimers = [];
  if (toastEl) toastEl.remove();

  const el = document.createElement('div');
  el.className = 'toast';
  el.innerHTML = `
    <div class="toast-icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 8v4"/>
        <path d="M12 16h.01"/>
      </svg>
    </div>
    <span>${message}</span>
  `;
  document.body.appendChild(el);
  toastEl = el;

  toastTimers.push(setTimeout(() => el.classList.add('show'), 10));
  toastTimers.push(setTimeout(() => el.classList.remove('show'), 3000));
  toastTimers.push(setTimeout(() => { el.remove(); if (toastEl === el) toastEl = null; }, 3300));
}

dashboardBtn.addEventListener('click', (e) => {
  e.preventDefault();
  showToast(t('Dashboard, coming soon!'));
});


document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href').substring(1);
    e.preventDefault();
    if (!targetId) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      history.replaceState(null, '', window.location.pathname);
      return;
    }
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      const headerOffset = 84;
      const offsetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      history.replaceState(null, '', '#' + targetId);
    }
  });
});

function scrollToHash() {
  const id = window.location.hash.substring(1);
  const el = id && document.getElementById(id);
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 84, behavior: 'smooth' });
}
window.addEventListener('hashchange', scrollToHash);

window.addEventListener('beforeunload', function() {
  window.scrollTo(0, 0);
});

if (history.scrollRestoration) {
  history.scrollRestoration = 'manual';
}
window.addEventListener('load', function () {
  if (window.location.hash) scrollToHash(); else window.scrollTo(0, 0);
});

const toTopBtn = document.getElementById('toTop');
if (toTopBtn) {
  const toggleToTop = () => toTopBtn.classList.toggle('show', window.scrollY > 500);
  window.addEventListener('scroll', toggleToTop, { passive: true });
  toggleToTop();
  toTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}
