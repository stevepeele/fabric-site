
/* ===== TRANSFORMATION — woven field draws itself; scroll as narrative ===== */
(function(){
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- HERO WEAVE CANVAS: threads cross, interlace, become cloth ---------- */
  var canvas = document.getElementById('weaveCanvas');
  var hero = document.querySelector('.hero');
  if(canvas && hero){
    var ctx = canvas.getContext('2d');
    var W=0,H=0, t0=null, DPR=Math.min(window.devicePixelRatio||1,2);
    function size(){
      var r = hero.getBoundingClientRect();
      W = Math.max(320, r.width); H = Math.max(420, r.height);
      canvas.width = W*DPR; canvas.height = H*DPR;
      ctx.setTransform(DPR,0,0,DPR,0,0);
    }
    size(); window.addEventListener('resize', size);
    var GAP=30, DUR=1400; // the one signature motion: the weave draws itself, once
    function ease(p){ return p<0 ? 0 : p>1 ? 1 : 1-Math.pow(1-p,3); }
    function threadPath(horizontal, idx, prog, time){
      var len = horizontal ? W : H;
      var base = idx*GAP + GAP*0.6;
      var drawn = len * prog;
      ctx.beginPath();
      var steps = Math.max(2, Math.floor(drawn/14));
      for(var s=0;s<=steps;s++){
        var d = (drawn/steps)*s;
        var sway = Math.sin((d*0.012)+(idx*1.7)+(time*0.00022)) * 5 * Math.sin(Math.PI*Math.min(d/len,1));
        var x = horizontal ? d : base+sway;
        var y = horizontal ? base+sway : d;
        if(s===0){ ctx.moveTo(x,y); } else { ctx.lineTo(x,y); }
      }
      ctx.stroke();
    }
    function draw(now){
      if(!t0) t0 = now;
      var elapsed = reduce ? DUR : now - t0;
      ctx.clearRect(0,0,W,H);
      var rows = Math.ceil(H/GAP)+1, cols = Math.ceil(W/GAP)+1;
      var n = Math.max(rows, cols);
      /* warp (horizontal) draws first, staggered */
      for(var i=0;i<rows;i++){
        var p = ease((elapsed - i*40)/1100);
        if(p<=0) continue;
        ctx.strokeStyle = i%5===0 ? 'rgba(233,213,163,0.30)' : 'rgba(200,169,106,0.16)';
        ctx.lineWidth = i%5===0 ? 1.2 : 1;
        threadPath(true, i, p, now);
      }
      /* weft (vertical) interlaces over, staggered, starting slightly later */
      for(var j=0;j<cols;j++){
        var q = ease((elapsed - 300 - j*40)/1100);
        if(q<=0) continue;
        ctx.strokeStyle = j%5===0 ? 'rgba(233,213,163,0.20)' : 'rgba(200,169,106,0.10)';
        ctx.lineWidth = 1;
        /* dashed segments fake the over-under interlace */
        ctx.setLineDash([GAP*0.62, GAP*0.38]);
        ctx.lineDashOffset = (j%2)*GAP*0.5;
        threadPath(false, j, q, now);
        ctx.setLineDash([]);
      }
      /* cloth settles: soft gold wash once weave completes */
      var settle = ease((elapsed-900)/500);
      if(settle>0){
        var g = ctx.createLinearGradient(0,0,W,H);
        g.addColorStop(0,'rgba(200,169,106,'+(0.05*settle)+')');
        g.addColorStop(1,'rgba(200,169,106,0)');
        ctx.fillStyle = g; ctx.fillRect(0,0,W,H);
      }
      if(!reduce && elapsed < DUR+400){ requestAnimationFrame(draw); }
      /* finished state holds — the drawn weave is the DOM default */
    }
    requestAnimationFrame(draw);
  }

  /* ---------- weave states: loose where friction, tight where Fabric operates ---------- */
  var loose = ['pain','not','cases'];
  var tight = ['model','promise','packages','modules','start','downloads'];
  loose.forEach(function(id){ var el=document.getElementById(id); if(el) el.classList.add('weave-loose'); });
  tight.forEach(function(id){ var el=document.getElementById(id); if(el) el.classList.add('weave-tight'); });
  var band = document.querySelector('.band'); if(band) band.classList.add('weave-tight');

  /* ---------- editorial numbering on kickers ---------- */
  var secs = document.querySelectorAll('main > section');
  secs.forEach(function(sec, i){
    var k = sec.querySelector('.kicker');
    if(k && !k.querySelector('.sec-num')){
      var s = document.createElement('span'); s.className='sec-num';
      s.textContent = ('0'+(i+1)).slice(-2);
      k.insertBefore(s, k.firstChild);
    }
  });

  /* ---------- NOT list: strike lines draw with intent ---------- */
  document.querySelectorAll('.not-card:not(.yes) h3').forEach(function(h){
    var st=document.createElement('span'); st.className='strike'; st.setAttribute('aria-hidden','true'); h.appendChild(st);
  });

  /* ---------- choreographed scroll narrative ---------- */
  var groups = [
    {sel:'.pain-grid .pain, .case-grid .case, .dl-grid .dl-card, .model-grid .model-card, .fit .fit-box, .steps .step', cls:'rv', stagger:110},
    {sel:'.pkg-grid .pkg, .math-grid .math-card', cls:'rv', stagger:160},
    {sel:'.not-grid .not-card', cls:'rv', stagger:130, extra:'struck'},
    {sel:'.bolton-grid .bolton-card', cls:'rv', stagger:150}
  ];
  if(reduce || !('IntersectionObserver' in window)){
    document.querySelectorAll('.not-card').forEach(function(c){ c.classList.add('struck'); });
    var mt=document.getElementById('mathThread'); if(mt) mt.classList.add('full');
    return;
  }
  var foldLine = window.innerHeight * 1.25;
  groups.forEach(function(g){
    document.querySelectorAll(g.sel).forEach(function(el, idx){
      if(el.getBoundingClientRect().top < foldLine){
        /* already at/near the fold: never hide it — content is visible by default */
        if(g.extra){ setTimeout(function(){ el.classList.add(g.extra); }, 600); }
        return;
      }
      el.classList.add(g.cls);
      el.style.transitionDelay = (idx%3)*g.stagger/1000 + 's';
      if(g.extra){ el.dataset.extra = g.extra; }
    });
  });
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(en.isIntersecting){
        en.target.classList.add('in');
        if(en.target.dataset.extra){ en.target.classList.add(en.target.dataset.extra); }
        io.unobserve(en.target);
      }
    });
  },{threshold:.12, rootMargin:'0px 0px -8% 0px'});
  document.querySelectorAll('.rv').forEach(function(el){ io.observe(el); });
  /* module rows thread in from the side — only when genuinely below the fold */
  var ioC = new IntersectionObserver(function(entries){
    entries.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add('in'); ioC.unobserve(en.target); } });
  },{threshold:.2});
  document.querySelectorAll('.carrot').forEach(function(el, idx){
    if(el.getBoundingClientRect().top < foldLine){ el.classList.add('in'); return; }
    el.classList.add('pre');
    el.style.transitionDelay=(idx%4)*0.09+'s'; ioC.observe(el);
  });
  /* math thread fills as the math section arrives */
  var mtEl=document.getElementById('mathThread');
  if(mtEl){
    var ioM=new IntersectionObserver(function(entries){
      entries.forEach(function(en){ if(en.isIntersecting){ mtEl.classList.add('full'); ioM.disconnect(); } });
    },{threshold:.3});
    ioM.observe(mtEl);
  }
  /* safety: reveal everything eventually */
  setTimeout(function(){
    document.querySelectorAll('.rv,.carrot').forEach(function(el){ el.classList.add('in'); });
    document.querySelectorAll('.not-card').forEach(function(c){ c.classList.add('struck'); });
    if(mtEl) mtEl.classList.add('full');
  }, 2400);
})();
