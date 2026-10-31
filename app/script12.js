/* FABRIC ELEVATION II - SPIIX-1086: tasteful scroll reveals for the app surface.
   Tags content blocks, arms the hidden state only when it can observe them,
   and reveals each block once as it enters. Reduced motion: nothing is armed. */
(function(){
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduce || !('IntersectionObserver' in window)) return;
  var SEL = '.module-card,.model-card,.vm-card,.not-card,.band-col,.pkg,.pain,.role-tile,.dl-card,.math-card,.step,.receipt,.tl-row,.proof-big,.viz,.faq details';
  var els = Array.prototype.slice.call(document.querySelectorAll(SEL));
  if(!els.length) return;
  els.forEach(function(el){ el.setAttribute('data-rv',''); });
  document.documentElement.classList.add('rv');
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(!en.isIntersecting) return;
      var el = en.target;
      var sibs = Array.prototype.filter.call(el.parentNode.children, function(c){
        return c.hasAttribute && c.hasAttribute('data-rv');
      });
      var i = sibs.indexOf(el);
      el.style.setProperty('--rvd', (Math.min(Math.max(i,0),5)*60) + 'ms');
      el.classList.add('in');
      io.unobserve(el);
    });
  }, {threshold:.12, rootMargin:'0px 0px -6% 0px'});
  els.forEach(function(el){ io.observe(el); });
})();
