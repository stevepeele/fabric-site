
/* Sticky mobile CTA — thumb reach, dismissible, never covers the book form */
(function(){
  var bar=document.getElementById('mobileCta'); if(!bar) return;
  var dismissed=false;
  document.getElementById('mobileCtaClose').addEventListener('click',function(){ dismissed=true; sync(); });
  function onBookPage(){ var h=(location.hash||''); return h.indexOf('#/book')===0 || h==='#apply'; }
  function sync(){
    var show=false;
    var kbOpen = window.visualViewport && (window.innerHeight - window.visualViewport.height > 120);
    if(!dismissed && !kbOpen && window.innerWidth<=768 && !onBookPage()){
      /* canon: the bar appears only after the hero CTA has scrolled away */
      show = window.scrollY > window.innerHeight*0.7;
      /* hide when the apply form / footer CTA is already on screen */
      var apply=document.getElementById('apply');
      if(apply && apply.offsetParent!==null){
        var r=apply.getBoundingClientRect();
        if(r.top<window.innerHeight && r.bottom>0) show=false;
      }
    }
    bar.classList.toggle('show',show);
    document.body.classList.toggle('cta-visible',show);
  }
  window.addEventListener('scroll',sync,{passive:true});
  window.addEventListener('resize',sync);
  window.addEventListener('hashchange',sync);
  if(window.visualViewport){ window.visualViewport.addEventListener('resize',sync); }
  setTimeout(sync,600); sync();
})();
