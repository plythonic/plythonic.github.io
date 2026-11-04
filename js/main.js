const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
burger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));

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

const langData = [['Moderasyon', 32.5], ['Ticket', 18.2], ['Otomasyon', 15.8], ['Kullanıcı', 12.3], ['Sunucu', 9.7], ['Emoji', 6.2], ['Diğer', 5.3]];
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

const editCard = document.getElementById('editCard');
document.querySelectorAll('#themes .pill').forEach(b => {
  b.addEventListener('click', () => {
    document.querySelectorAll('#themes .pill').forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    editCard.dataset.theme = b.dataset.t;
  });
});
document.querySelectorAll('#btnStyle .pill').forEach(b => {
  b.addEventListener('click', () => {
    document.querySelectorAll('#btnStyle .pill').forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    editCard.classList.toggle('outline', b.dataset.s === 'outline');
  });
});
const radius = document.getElementById('radius');
radius.addEventListener('input', () => {
  editCard.style.setProperty('--c-radius', radius.value + 'px');
  document.getElementById('radiusVal').textContent = radius.value + 'px';
});

const metaEl = document.querySelector('meta[name="description"]');
const metaKey = metaEl.content;
const titleKey = document.title;
const burgerEl = document.getElementById('burger');
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
  metaEl.content = t(metaKey);
  document.title = t(titleKey);
  burgerEl.setAttribute('aria-label', t('Menü'));
  renderLangs();
  setDates();
  document.getElementById('currentLang').textContent = l === 'tr' ? 'TR' : 'EN';
  
  // Update active state
  document.querySelectorAll('.lang-option').forEach(opt => {
    opt.classList.toggle('active', opt.dataset.lang === l);
  });
  
  try { localStorage.setItem('plython-lang', l); } catch (e) { }
}

// Language dropdown
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

// Close dropdown when clicking outside
document.addEventListener('click', () => {
  langDropdown.classList.remove('open');
});

applyLang(LANG);


// Dashboard button - Coming Soon Toast
const dashboardBtn = document.getElementById('dashboardBtn');
let toastEl = null;

function showToast(message) {
  // Remove existing toast if any
  if (toastEl) {
    toastEl.remove();
  }
  
  // Create toast
  toastEl = document.createElement('div');
  toastEl.className = 'toast';
  toastEl.innerHTML = `
    <div class="toast-icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 8v4"/>
        <path d="M12 16h.01"/>
      </svg>
    </div>
    <span>${message}</span>
  `;
  document.body.appendChild(toastEl);
  
  // Show toast
  setTimeout(() => toastEl.classList.add('show'), 10);
  
  // Hide and remove after 3 seconds
  setTimeout(() => {
    toastEl.classList.remove('show');
    setTimeout(() => {
      if (toastEl) toastEl.remove();
      toastEl = null;
    }, 300);
  }, 3000);
}

dashboardBtn.addEventListener('click', (e) => {
  e.preventDefault();
  showToast(LANG === 'tr' ? 'Yakında hazır olacaq!' : 'Coming soon!');
});


// Smooth scroll without hash in URL
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    
    if (targetSection) {
      const headerOffset = 84;
      const elementPosition = targetSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Update URL without hash
      if (targetId) {
        history.pushState(null, '', '/' + targetId);
      }
      
      // Close mobile menu if open
      mobileMenu.classList.remove('open');
    }
  });
});

// Handle back/forward buttons
window.addEventListener('popstate', function() {
  const path = window.location.pathname.substring(1);
  const section = document.getElementById(path);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});


// Scroll to top on page reload/refresh
window.addEventListener('beforeunload', function() {
  window.scrollTo(0, 0);
});

// Also scroll to top on page load
if (history.scrollRestoration) {
  history.scrollRestoration = 'manual';
}
window.addEventListener('load', function() {
  window.scrollTo(0, 0);
});
