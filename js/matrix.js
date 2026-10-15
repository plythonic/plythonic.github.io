(function(){
  var canvas = document.getElementById('matrix');
  var ctx = canvas.getContext('2d');
  var chars = "01{}<>/=+*#[]();$%&LIOR".split("");
  var fontSize = 15;
  var columns, drops, dpr;
  var fadeRGB = "2,3,4";

  function setup(){
    dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    columns = Math.floor(window.innerWidth / fontSize);
    drops = new Array(columns).fill(0).map(function(){
      return Math.floor(Math.random() * -50);
    });
  }
  setup();
  window.addEventListener('resize', setup);

  function draw(){
    ctx.fillStyle = "rgba(" + fadeRGB + ",0.12)";
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

    ctx.font = fontSize + "px 'JetBrains Mono', monospace";

    for(var i = 0; i < drops.length; i++){
      var text = chars[Math.floor(Math.random() * chars.length)];
      var x = i * fontSize;
      var y = drops[i] * fontSize;

      ctx.fillStyle = "rgba(59,130,246,0.9)";
      ctx.fillText(text, x, y);

      if(y > window.innerHeight && Math.random() > 0.975){
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  setInterval(draw, 45);

  var themeBtn = document.getElementById('themeBtn');
  function applyTheme(theme){
    if(theme === 'light'){
      document.documentElement.classList.add('light');
      fadeRGB = "245,246,248";
      ctx.fillStyle = "rgba(245,246,248,1)";
      canvas.style.opacity = "0.9";
    } else {
      document.documentElement.classList.remove('light');
      fadeRGB = "2,3,4";
      ctx.fillStyle = "rgba(2,3,4,1)";
      canvas.style.opacity = "0.55";
    }
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    localStorage.setItem('plythonic-theme', theme);
  }
  themeBtn.addEventListener('click', function(){
    var next = document.documentElement.classList.contains('light') ? 'dark' : 'light';
    applyTheme(next);
  });
  var savedTheme = localStorage.getItem('plythonic-theme');
  applyTheme(savedTheme === 'light' ? 'light' : 'dark');
})();
