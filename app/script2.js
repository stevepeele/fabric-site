
/* Fabric elevation — thread dividers, scroll reveal, number ease-in */
(function(){
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var main = document.querySelector('main');
  if(main){
    var sections = main.querySelectorAll(':scope > section');
    sections.forEach(function(sec, i){
      if(i>0){
        var rule = document.createElement('div');
        rule.className = 'thread-rule';
        rule.setAttribute('aria-hidden','true');
        sec.parentNode.insertBefore(rule, sec);
      }
    });
  }
  var targets = document.querySelectorAll('main section, .hero .scarcity, .bolton-card');
  if(reduce || !('IntersectionObserver' in window)){
    return;
  }
  targets.forEach(function(el){ el.classList.add('reveal'); });
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(en.isIntersecting){
        en.target.classList.add('in');
        io.unobserve(en.target);
      }
    });
  },{threshold:.08, rootMargin:'0px 0px -6% 0px'});
  targets.forEach(function(el){ io.observe(el); });
  /* Safety: nothing stays hidden if the observer is slow */
  setTimeout(function(){ targets.forEach(function(el){ el.classList.add('in'); }); }, 2600);

  /* Commission numbers ease in: animate the first integer in each big figure */
  var bigs = document.querySelectorAll('.math-card .big');
  function animateBig(el){
    var original = el.textContent;
    var m = original.match(/\d+/);
    if(!m){ return; }
    var target = parseInt(m[0],10);
    var idx = original.indexOf(m[0]);
    var pre = original.slice(0,idx), post = original.slice(idx + m[0].length);
    var start = null, dur = 2000;
    function frame(ts){
      if(!start){ start = ts; }
      var p = Math.min((ts-start)/dur, 1);
      var eased = 1 - Math.pow(1-p, 3);
      el.textContent = pre + Math.round(target * eased) + post;
      if(p<1){ requestAnimationFrame(frame); } else { el.textContent = original; }
    }
    requestAnimationFrame(frame);
  }
  var io2 = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(en.isIntersecting){ animateBig(en.target); io2.unobserve(en.target); }
    });
  },{threshold:.4});
  /* Canon: no counting counters — figures render static, final state is the DOM default. */
})();
