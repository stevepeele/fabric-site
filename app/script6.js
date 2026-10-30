
/* Diagrams draw themselves in — the one signature motion, everywhere */
(function(){
  var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var viz=document.querySelectorAll('[data-viz]');
  if(reduce||!('IntersectionObserver' in window)){ viz.forEach(function(v){v.classList.add('in');}); return; }
  var io=new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } }); },{threshold:.25});
  viz.forEach(function(v){ io.observe(v); });
  setTimeout(function(){ viz.forEach(function(v){ v.classList.add('in'); }); },3500);
  window.addEventListener('hashchange',function(){ setTimeout(function(){ document.querySelectorAll('.page.active [data-viz]').forEach(function(v){ v.classList.add('in'); }); },350); });
})();
