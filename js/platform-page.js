(function(){
  var P = window.PAGE;
  var common = {
    tr: {label:'TR', search_placeholder:'Ara...', no_results:'Sonuç bulunamadı', empty_showcase:'Boş Vitrin'},
    en: {label:'EN', search_placeholder:'Search...', no_results:'No results found', empty_showcase:'Empty Showcase'},
    ru: {label:'RU', search_placeholder:'Поиск...', no_results:'Результаты не найдены', empty_showcase:'Пустая Витрина'}
  };
  var translations = {};
  ['tr','en','ru'].forEach(function(l){
    translations[l] = Object.assign({}, common[l], P[l]);
  });

  var langSwitch = document.getElementById('langSwitch');
  var langCurrent = document.getElementById('langCurrent');
  var langCurrentLabel = document.getElementById('langCurrentLabel');
  var langMenu = document.getElementById('langMenu');
  var tabA = document.getElementById('tabServers');
  var tabB = document.getElementById('tabBots');
  var searchInput = document.getElementById('searchInput');

  var dataA = [];
  var dataB = [];
  for(var i = 1; i <= 100; i++){
    dataA.push({number:i, url:P.urlA + i, type:'a'});
    dataB.push({number:i, url:P.urlB + i, type:'b'});
  }
  var currentTab = 'a';
  var currentData = dataA;

  function renderItems(items, type){
    var grid = document.getElementById('serverGrid');
    var lang = window.currentLang || 'tr';
    var dict = translations[lang] || translations.tr;
    var icon = type === 'b' ? P.iconB : P.iconA;
    var text = type === 'b' ? dict.text_b : dict.text_a;
    var html = '';
    items.forEach(function(item){
      html += '<a href="' + item.url + '" target="_blank" rel="noopener" class="info-card discord-card" style="cursor:pointer;position:relative;">';
      html += '<span class="card-number">#' + item.number + '</span>';
      html += '<div class="ic">' + icon + '</div>';
      html += '<h2>' + dict.empty_showcase + '</h2>';
      html += '<p>' + text + '</p>';
      html += '</a>';
    });
    grid.innerHTML = html || '<p style="grid-column:1/-1;text-align:center;color:var(--muted);padding:40px;">' + dict.no_results + '</p>';
  }

  window.filterAndRender = function(){
    var query = searchInput.value.toLowerCase().trim();
    var filtered = currentData;
    if(query !== ''){
      var dict = translations[window.currentLang || 'tr'] || translations.tr;
      var name = dict.empty_showcase.toLowerCase();
      filtered = currentData.filter(function(item){
        var n = item.number.toString();
        return name.indexOf(query) !== -1 || n.indexOf(query) !== -1 || ('#' + n).indexOf(query) !== -1;
      });
    }
    renderItems(filtered, currentTab);
  };

  function applyLang(lang){
    var dict = translations[lang] || translations.tr;
    document.querySelector('.eyebrow').textContent = dict.eyebrow;
    document.querySelector('h1').textContent = dict.title;
    document.querySelector('.lead').textContent = dict.lead;
    tabA.textContent = dict.tab_a;
    tabB.textContent = dict.tab_b;
    tabA.classList.add('ready');
    tabB.classList.add('ready');
    searchInput.placeholder = dict.search_placeholder;
    langCurrentLabel.textContent = dict.label;
    document.documentElement.lang = lang;
    langMenu.querySelectorAll('button').forEach(function(btn){
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
    localStorage.setItem('plythonic-lang-v2', lang);
    window.currentLang = lang;
    window.filterAndRender();
  }

  langCurrent.addEventListener('click', function(e){
    e.stopPropagation();
    var isOpen = langSwitch.classList.toggle('open');
    langCurrent.setAttribute('aria-expanded', isOpen);
  });
  langMenu.querySelectorAll('button').forEach(function(btn){
    btn.addEventListener('click', function(){
      applyLang(btn.getAttribute('data-lang'));
      langSwitch.classList.remove('open');
      langCurrent.setAttribute('aria-expanded', 'false');
    });
  });
  document.addEventListener('click', function(){
    langSwitch.classList.remove('open');
    langCurrent.setAttribute('aria-expanded', 'false');
  });

  var restartBtn = document.getElementById('restartBtn');
  restartBtn.addEventListener('click', function(){
    restartBtn.classList.add('spin');
    setTimeout(function(){ location.reload(); }, 300);
  });

  searchInput.addEventListener('input', window.filterAndRender);
  searchInput.addEventListener('focus', function(){
    this.style.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--blue');
    this.style.boxShadow = '0 0 0 3px rgba(' + getComputedStyle(document.documentElement).getPropertyValue('--blue-rgb') + ',.1)';
  });
  searchInput.addEventListener('blur', function(){
    var isLight = document.documentElement.classList.contains('light');
    this.style.borderColor = isLight ? 'rgba(0,0,0,.4)' : 'rgba(255,255,255,.35)';
    this.style.boxShadow = 'none';
  });

  tabA.addEventListener('click', function(){
    if(currentTab === 'a') return;
    currentTab = 'a';
    currentData = dataA;
    tabA.classList.add('active');
    tabB.classList.remove('active');
    searchInput.value = '';
    window.filterAndRender();
  });
  tabB.addEventListener('click', function(){
    if(currentTab === 'b') return;
    currentTab = 'b';
    currentData = dataB;
    tabB.classList.add('active');
    tabA.classList.remove('active');
    searchInput.value = '';
    window.filterAndRender();
  });

  var savedLang = localStorage.getItem('plythonic-lang-v2');
  applyLang(savedLang && translations[savedLang] ? savedLang : 'tr');
})();
