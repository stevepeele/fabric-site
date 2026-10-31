/* ===== CONTROL TOWER CHAT — MEET SBII (SPIIX-1109, Stage 2) =====
   Copy: CHAT-FLOW-MEET-SBII.md — LOCKED, verbatim, no improvisation.
   Leads POST to the existing /api/submit (api/submit.js untouched).
   Path encoding (documented on SPIIX-1109): the endpoint hardcodes source
   server-side, so the chat path rides the free-text fields —
   stage = "Tower · Qualified | Near-line | Unqualified" (+ origin suffix),
   volume = Q2 band, pain = Q3 bottleneck. */
(function(){
  var API = '/api/submit';
  var CAL = 'https://cal.com/peele/sprint-call';
  var FALLBACK = 'If you don\u2019t get a personal reply within the hour, send your details to steve@stevepeeleii.com.';
  var state = { step:'idle', q1:null, volume:null, nearline:false, pain:null, origin:'', started:false };

  /* ---------- placements ---------- */
  var pill = document.createElement('button');
  pill.className = 'sbii-pill'; pill.id = 'sbiiPill';
  pill.innerHTML = '<b>MEET SBII \u2192</b><span>20 min \u00b7 Pilot access \u00b7 3 seats</span>';
  document.body.appendChild(pill);

  var panel = document.createElement('div');
  panel.className = 'sbii-panel'; panel.id = 'sbiiPanel';
  panel.setAttribute('role','dialog'); panel.setAttribute('aria-label','Fabric Control Tower chat');
  panel.innerHTML = '<div class="sbii-head"><span class="dot"></span><div><b>FABRIC // CONTROL TOWER</b><small>Routes you in 60 seconds.</small></div><button class="sbii-x" id="sbiiClose" aria-label="Close">\u00d7</button></div>'
    + '<div class="sbii-body" id="sbiiBody"></div>'
    + '<div class="sbii-chips" id="sbiiChips"><span>QUICK ANSWERS \u2014 NO FORM</span></div>';
  document.body.appendChild(panel);
  var body = panel.querySelector('#sbiiBody'), chips = panel.querySelector('#sbiiChips');

  var heroCtas = document.querySelector('.hero .cta-row') || document.querySelector('#welcome .hero-ctas');
  if (heroCtas) {
    var band = document.createElement('div'); band.className = 'sbii-band'; band.style.maxWidth = '100%';
    band.innerHTML = '<span class="bk">MEET SBII \u2014 THE CARROT, NOT A CONTACT FORM</span><h3>20 minutes with the founder. A verdict on the call. A teardown either way.</h3>'
      + '<p>Complete the Tower\u2019s 60-second check and qualified firms get a 1:1 with Steve Peele II \u2014 plus a private teardown of their firm\u2019s presence within 48 hours, whether you move forward or not.</p>'
      + '<button class="sbii-btn gold" data-sbii-open>Start the 60-second check \u2192</button>'
      + '<div class="bf">MARKET MOVERS PILOT \u00b7 CINCINNATI FIRST \u00b7 3 SEATS</div>';
    heroCtas.insertAdjacentElement('afterend', band);
  }
  var modSec = document.getElementById('modules');
  if (modSec) {
    var band2 = document.createElement('div'); band2.className = 'sbii-band small';
    band2.innerHTML = '<span class="bk">MEET SBII</span><h3>Think one of these is your bottleneck?</h3>'
      + '<p>Run the Tower\u2019s 60-second check. Qualified firms meet Steve Peele II 1:1 \u2014 and get the 48-hour teardown either way.</p>'
      + '<button class="sbii-btn gold" data-sbii-open>Start the 60-second check \u2192</button>'
      + '<div class="bf">NO FIT? YOU STILL KEEP THE TEARDOWN. THAT\u2019S THE DEAL.</div>';
    modSec.appendChild(band2);
  }

  /* ---------- helpers ---------- */
  function scrollDown(){ body.scrollTop = body.scrollHeight; }
  function msg(text, cls, mono){
    var d = document.createElement('div'); d.className = 'sbii-msg ' + (cls||'bot');
    if (mono) { var m = document.createElement('span'); m.className='mono'; m.textContent = mono; d.appendChild(m); }
    var t = document.createElement('span'); t.textContent = text; d.appendChild(t);
    body.appendChild(d); scrollDown(); return d;
  }
  function me(text){ msg(text,'me'); }
  function acts(list){
    var wrap = document.createElement('div'); wrap.className = 'sbii-acts';
    list.forEach(function(a){
      var b = document.createElement('button'); b.className = 'sbii-btn' + (a.gold ? ' gold' : ''); b.textContent = a.label;
      b.addEventListener('click', function(){ wrap.remove(); a.fn(); });
      wrap.appendChild(b);
    });
    body.appendChild(wrap); scrollDown(); return wrap;
  }
  function currentPage(){
    var h = (location.hash || '').replace(/^#\/?/, '');
    if (h.indexOf('module') === 0) return 'modules';
    if (h.indexOf('tools') === 0) return 'tools';
    if (h.indexOf('cases') === 0) return 'cases';
    return h.split('/')[0] || 'home';
  }
  function syncBook(){ document.body.classList.toggle('sbii-on-book', currentPage() === 'book'); if (currentPage() === 'book') closePanel(); }
  function openPanel(){ panel.classList.add('open'); if (!state.started) startFlow(); }
  function closePanel(){ panel.classList.remove('open'); }

  /* ---------- the flow (spec Sec.3, verbatim) ---------- */
  function startFlow(){
    state.started = true; state.step = 'open';
    msg('Tower here. 60 seconds, four taps, no form. I route you to the right 20 minutes \u2014 or tell you straight if it\u2019s not a fit.');
    acts([
      { label:'Let\u2019s route \u2192', gold:true, fn:function(){ me('Let\u2019s route \u2192'); q1(); } },
      { label:'Just looking', fn:function(){ me('Just looking'); branchL(); } }
    ]);
  }
  function q1(){
    state.step = 'q1';
    msg('First: who\u2019s asking?');
    acts([
      { label:'I lead the team / brokerage', gold:true, fn:function(){ me('I lead the team / brokerage'); state.q1 = 'lead'; q2(); } },
      { label:'I\u2019m on the team', fn:function(){ me('I\u2019m on the team'); state.origin = 'tckit'; endE2(false); } },
      { label:'Sending this to my lead', fn:function(){ me('Sending this to my lead'); state.origin = 'tckit'; endE2(true); } }
    ]);
  }
  function q2(){
    state.step = 'q2';
    msg('Team volume, last 12 months? (The pilot is built for firms already moving.)');
    acts([
      { label:'$50M+', gold:true, fn:function(){ me('$50M+'); state.volume = '$50M+'; state.nearline = false; q3(); } },
      { label:'$25\u201350M', fn:function(){ me('$25\u201350M'); state.volume = '$25\u201350M'; state.nearline = true; q3(); } },
      { label:'Under $25M', fn:function(){ me('Under $25M'); state.volume = 'Under $25M'; branchU(); } }
    ]);
  }
  function q3(){
    state.step = 'q3';
    msg('Where does it hurt most right now?');
    var opts = ['Listing launches','Follow-up speed','Database going quiet','Recruiting','All of it'];
    acts(opts.map(function(o){ return { label:o, fn:function(){ me(o); state.pain = o; q4(); } }; }));
  }
  function q4(){
    state.step = 'q4';
    msg('Last thing \u2014 where does the confirmation go?');
    var f = document.createElement('form'); f.className = 'sbii-form'; f.id = 'sbiiForm';
    f.innerHTML = '<label>NAME</label><input id="sb-name" autocomplete="name" placeholder="Your name">'
      + '<label>BROKERAGE / TEAM</label><input id="sb-brokerage" autocomplete="organization" placeholder="Brokerage / team">'
      + '<label>EMAIL OR CELL</label><input id="sb-contact" autocomplete="email" placeholder="Email or cell">'
      + '<button class="sbii-btn gold" type="submit">Route me \u2192</button>';
    f.addEventListener('submit', function(ev){
      ev.preventDefault();
      var name = f.querySelector('#sb-name').value.trim(),
          brk = f.querySelector('#sb-brokerage').value.trim(),
          contact = f.querySelector('#sb-contact').value.trim();
      if (!name || !brk || !contact) { msg('I need all three to route you \u2014 name, brokerage, and an email or cell.'); return; }
      var btn = f.querySelector('button'); btn.disabled = true; btn.textContent = 'Routing\u2026';
      submitLead({ name:name, brokerage:brk, contact:contact,
        stage: (state.nearline ? 'Tower \u00b7 Near-line' : 'Tower \u00b7 Qualified') + originSuffix(),
        volume: state.volume, pain: state.pain }, function(){ f.remove(); endE1(name, brk); });
    });
    body.appendChild(f); scrollDown();
  }
  function originSuffix(){
    if (state.origin === 'looker') return ' (via Looker)';
    if (state.origin === 'tckit') return ' (via TC kit)';
    return '';
  }
  function submitLead(payload, done){
    payload.company_website = '';
    fetch(API, { method:'POST', headers:{ 'Content-Type':'application/json' }, body: JSON.stringify(payload) })
      .then(function(){ done(); }).catch(function(){ done(); });
  }
  function endE1(name, brk){
    state.step = 'done';
    var d = msg('', 'sys', '\u2713 ROUTED \u2014 ' + brk.toUpperCase());
    d.querySelector('span:last-child').textContent = 'Booked in, ' + name.split(' ')[0] + '. Two things happen now:\n\nMIN 0 \u2014 this confirmation, on screen.\nNEXT \u2014 grab your 20 minutes with Steve Peele II (SBII) directly:\n\nPrivate teardown lands within 48 hours of the call, either way.';
    var ctas = document.createElement('div'); ctas.className = 'sbii-acts';
    var a = document.createElement('a'); a.className = 'sbii-btn gold'; a.href = CAL; a.target = '_blank'; a.rel = 'noopener'; a.textContent = 'Book my 20 minutes \u2192'; a.style.textDecoration = 'none';
    ctas.appendChild(a); body.appendChild(ctas);
    msg('Your seat: one of 3 \u00b7 held from this moment \u00b7 5 business days.');
    msg(FALLBACK);
  }
  /* ---------- branches (spec Sec.4, verbatim) ---------- */
  function branchU(){
    state.step = 'unqualified';
    msg('Straight answer: the pilot won\u2019t pay back under $25M yet \u2014 the math needs volume. Don\u2019t buy it. Take these instead: the Sample Teardown (a real firm, scored live) and the downloads. When you cross the line, the Tower will know you.');
    acts([
      { label:'Sample Teardown', fn:function(){ closePanel(); location.hash = '#/proof'; } },
      { label:'Downloads', fn:function(){ closePanel(); location.hash = '#/pricing'; } }
    ]);
    msg('Want the teardown sent when you\u2019re closer? Leave a name \u2014 no pitch attached.');
    var f = document.createElement('form'); f.className = 'sbii-form';
    f.innerHTML = '<label>NAME</label><input id="sb-u-name" placeholder="Your name">'
      + '<label>TEAM</label><input id="sb-u-team" placeholder="Team / brokerage">'
      + '<label>EMAIL</label><input id="sb-u-email" placeholder="Email">'
      + '<button class="sbii-btn" type="submit">Send me the teardown \u2192</button>';
    f.addEventListener('submit', function(ev){
      ev.preventDefault();
      var name = f.querySelector('#sb-u-name').value.trim(), team = f.querySelector('#sb-u-team').value.trim(), email = f.querySelector('#sb-u-email').value.trim();
      if (!name || !team || !email) { msg('Name, team, and email \u2014 then it\u2019s yours.'); return; }
      submitLead({ name:name, brokerage:team, contact:email, stage:'Tower \u00b7 Unqualified' + originSuffix(), volume:'Under $25M', pain: state.pain || 'Under-volume path' },
        function(){ f.remove(); msg('Done \u2014 you\u2019re on the list. The teardown\u2019s yours when you\u2019re closer to the line. No pitch attached.'); });
    });
    body.appendChild(f); scrollDown();
  }
  function branchL(){
    state.step = 'looker';
    msg('Look around properly, then:');
    acts([
      { label:'The Framework', fn:function(){ closePanel(); location.hash = '#/framework'; } },
      { label:'The Modules', fn:function(){ closePanel(); location.hash = '#/modules'; } },
      { label:'Sample Teardown', fn:function(){ closePanel(); location.hash = '#/proof'; } },
      { label:'I\u2019m the lead \u2014 route me \u2192', gold:true, fn:function(){ state.origin = 'looker'; me('I\u2019m the lead \u2014 route me \u2192'); q1(); } }
    ]);
    msg('Changed your mind mid-look? The pill stays in the corner.');
  }
  function endE2(warmer){
    state.step = 'e2';
    if (warmer) msg('Good instinct. This is the one to forward.');
    msg('Smart move: don\u2019t pitch it from memory. Send your lead the TC kit \u2014 the whole case, in operator language, built to be forwarded:');
    acts([
      { label:'Copy the kit', fn:function(){ if (window.copyKit) window.copyKit(); } },
      { label:'Email the kit', fn:function(){ if (window.emailKit) window.emailKit(); } },
      { label:'I\u2019m the lead \u2014 route me \u2192', gold:true, fn:function(){ me('I\u2019m the lead \u2014 route me \u2192'); q1(); } }
    ]);
    msg('They\u2019ll see the teardown offer too \u2014 48 hours, theirs to keep either way.');
  }
  /* quick-ask chips (spec Sec.4) */
  var CHIPQ = { price:'What does it cost?', va:'Is this a VA service?', breaks:'Will it break our stack?', human:'Can I just talk to a human?', timeline:'What happens after the first months?' };
  var CHIPA = {
    price:'Two prices. Start at $1,950. Full Fabric is $3,950 \u2014 everything included. First month up front either way. No module math, no seat traps.',
    va:'No. A VA waits for instructions and works your hours. Fabric is a framework installed on your stack and run by an engine \u2014 Oscar \u2014 on fixed cadences, to named standards, reported monthly. It doesn\u2019t sleep, and it doesn\u2019t need managing.',
    breaks:'Nothing is ripped out. Nothing is replaced. Fabric installs on the systems you already run \u2014 your CRM, dotloop, your email \u2014 and defines how they get used. If a tool truly can\u2019t carry the discipline, we\u2019ll show you in the teardown before you pay anything.',
    human:'That\u2019s literally the meeting. The Tower just makes sure the right humans get the 20 minutes.',
    timeline:'Four stages, one direction. Install \u2014 Months 1\u20132 flat, the framework goes in, nothing breaks. Stand By \u2014 from Month 3, opt in and pay out of what closes: Performance Cover, 20% of GCI on Fabric-touched sides, capped at your flat fee; a month that closes nothing charges nothing, it rolls. Net Zero \u2014 the month attributed GCI reaches 5\u00d7 the fee, the closings cover it in full. Graduate \u2014 Net Zero proven, you move to Full and unlock the rest. You pay flat while we install. Then you pay out of what closes. Then it pays for itself. Then you unlock the rest.'
  };
  Object.keys(CHIPQ).forEach(function(k){
    var b = document.createElement('button'); b.className = 'sbii-chip'; b.textContent = CHIPQ[k];
    b.addEventListener('click', function(){
      openPanel();
      me(CHIPQ[k]); msg(CHIPA[k]);
      if (k === 'timeline') acts([
        { label:'See Pricing', fn:function(){ closePanel(); location.hash = '#/pricing'; } },
        { label:'Book the 20 \u2192', gold:true, fn:function(){ window.open(CAL, '_blank', 'noopener'); } }
      ]);
      if (k === 'human' && state.step !== 'done') acts([{ label:'Route me \u2192', gold:true, fn:function(){ if (state.step === 'idle' || !state.started) startFlow(); else q1(); } }]);
    });
    chips.appendChild(b);
  });

  /* ---------- wiring ---------- */
  pill.addEventListener('click', openPanel);
  panel.querySelector('#sbiiClose').addEventListener('click', closePanel);
  document.querySelectorAll('[data-sbii-open]').forEach(function(b){ b.addEventListener('click', openPanel); });
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape') closePanel(); });
  window.addEventListener('hashchange', syncBook); syncBook();

  /* proactive open: once per session, 25s OR 60% scroll, Home/Modules/Pricing only, never Book */
  var nudged = false;
  try { nudged = !!sessionStorage.getItem('sbii-nudged'); } catch(e) {}
  function maybeNudge(){
    if (nudged || panel.classList.contains('open')) return;
    var p = currentPage();
    if (p !== 'home' && p !== 'modules' && p !== 'pricing') return;
    nudged = true; try { sessionStorage.setItem('sbii-nudged','1'); } catch(e) {}
    openPanel();
  }
  setTimeout(maybeNudge, 25000);
  window.addEventListener('scroll', function(){
    var max = document.documentElement.scrollHeight - innerHeight;
    if (max > 0 && (scrollY / max) >= 0.6) maybeNudge();
  }, { passive:true });
})();
