
/* ===== PAGE SPLIT ROUTER — distinct pages, one calm site ===== */
(function(){
  var main=document.querySelector('main');
  if(!main) return;
  function byId(id){return document.getElementById(id);}
  var fitSec=null;
  main.querySelectorAll(':scope > section').forEach(function(s){ if(s.querySelector('.fit-box')) fitSec=s; });
  var nodes={
    hero:document.querySelector('.hero'),
    boundary:byId('boundary'), shift:byId('shift'), systems:byId('systems'), layer:byId('layer'),
    band:document.querySelector('.band'),
    sliver:byId('sliver'), model:byId('model'), promise:byId('promise'), notS:byId('not'),
    pain:byId('pain'), math:byId('math'), start:byId('start'),
    pkgs:byId('packages'), cases:byId('cases'), modules:byId('modules'),
    downloads:byId('downloads'), fit:fitSec, apply:byId('apply'), proof:byId('proof')
  };
  /* Home: stages summary + closing CTA (built once) */
  var sum=document.createElement('section');
  sum.innerHTML='<div class="wrap"><div class="kicker">Pilot pricing \u2014 two prices</div><h2>Start. Full.</h2><p class="sub">Two prices. Start at $1,950. Full Fabric is $3,950 \u2014 everything included. First month paid up front to start \u2014 no separate start fee.</p><div class="sum-grid">'
    +'<article class="sum-card"><span class="pilot-badge">PILOT</span><label style="font-size:11px;letter-spacing:.16em;font-weight:800;opacity:.7;display:block">THE FRAMEWORK IN \u2014 NOTHING BREAKS</label><h3>Start</h3><div class="price">$1,950<small> / mo</small></div><div class="upfront">First month paid up front to start</div><p>For owners who want the foundation first. The framework installed on the stack you already have \u2014 plus Listing Launch, Nurture Engine, and a monthly report.</p></article>'
    +'<article class="sum-card"><span class="pilot-badge">PILOT</span><label style="font-size:11px;letter-spacing:.16em;font-weight:800;opacity:.7;display:block">RECOMMENDED</label><h3>Full</h3><div class="price">$3,950<small> / mo</small></div><div class="upfront">First month paid up front to start</div><p>Everything Fabric does. Everything in Start, plus Oscar, Quality Scorer, Build an Empire, Syndicate, Cascade, Dardo (up to 10 seats), You Found Home, Coming Soon Funnels and Showing Ops — with weekly execution and priority turnaround.</p></article>'
    +''
    +'</div><div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:22px"><a class="btn" href="#/pricing">See Pricing &amp; Stages \u2192</a><a class="btn ghost" href="#/modules">Browse Modules</a><a class="btn ghost" href="#/book">Book a Fit Call</a></div>'
    +'<div class="home-cta" style="margin-top:26px"><h3>Pilot pricing locked for the first 3 Market Movers.</h3><p>Easy to digest, easy to trial, easy to implement \u2014 the first month is paid up front to start, and there is no separate start fee.</p><a class="btn" href="#/book">Book your 20-minute fit call \u2192</a></div></div>';
  var defs={
    home:[nodes.hero,nodes.boundary,nodes.shift,nodes.systems,nodes.layer,nodes.band,nodes.promise,nodes.sliver,sum],
    model:[nodes.model,nodes.notS],
    modules:[nodes.modules],
    cases:[nodes.pain,nodes.cases],
    pricing:[nodes.math,nodes.pkgs,nodes.downloads],
    proof:[nodes.proof],
    book:[nodes.start,nodes.fit,nodes.apply]
  };
  var pages={};
  Object.keys(defs).forEach(function(name){
    var d=document.createElement('div');
    d.className='page'; d.id='page-'+name; d.setAttribute('data-page',name);
    defs[name].forEach(function(n){ if(n) d.appendChild(n); });
    pages[name]=d; main.appendChild(d);
  });
  /* renumber editorial kickers sequentially within each page */
  Object.keys(pages).forEach(function(k){
    pages[k].querySelectorAll('.sec-num').forEach(function(n,i){ n.textContent=('0'+(i+1)).slice(-2); });
  });
  /* legacy anchors -> page + optional section */
  var legacy={model:['model','model'],not:['model','not'],pain:['cases','pain'],math:['pricing','math'],packages:['pricing','packages'],downloads:['pricing','downloads'],cases:['cases','cases'],modules:['modules','modules'],boltons:['modules','boltons'],start:['book','start'],apply:['book','apply'],promise:['home','promise'],top:['home',null],fit:['book','apply']};
  function current(){
    var h=(location.hash||'#/home').replace(/^#\/?/,'');
    if(h.indexOf('module-')===0) return {page:'__none__',sec:null};
    if(h==='tools'||h.indexOf('tools/')===0) return {page:'__none__',sec:null};
    if(pages[h]) return {page:h,sec:null};
    if(legacy[h]) return {page:legacy[h][0],sec:legacy[h][1]};
    return {page:'home',sec:null};
  }
  function render(){
    var r=current();
    Object.keys(pages).forEach(function(k){ pages[k].classList.toggle('active',k===r.page); });
    document.querySelectorAll('.pagenav a').forEach(function(a){ a.classList.toggle('on',a.getAttribute('data-nav')===r.page); });
    if(r.sec){ var el=byId(r.sec); if(el){ el.scrollIntoView({block:'start'}); return; } }
    window.scrollTo(0,0);
  }
  window.addEventListener('hashchange',render);
  render();
  /* share-kit buttons created on Home summary (none use kit) + safety: any .kit-open inside pages still works via original binding; rebind all */
  document.querySelectorAll('.kit-open').forEach(function(b){
    b.addEventListener('click',function(){ var o=byId('kitOverlay'); if(o) o.classList.add('open'); });
  });
})();
