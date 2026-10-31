
/* ===== CASES BY ROLE — SPIIX-1107 (Stage 2, SPIIX-1106) =====
   Seven seats, seven separate experiences. Index lives in index.html (#cases);
   role pages are built here on the spec's 8-block template
   (~/workspace/fabric/USE-CASES-BY-ROLE.md). No prices on role pages. */
(function(){
  var G='#C8A96A', GH='#E9D5A3', LN='rgba(244,239,227,.3)', LD='rgba(244,239,227,.14)';
  var ROLES=[
  { slug:'team-leader', name:'Team Leader', sendto:'your team',
    promise:'You stop being the switchboard. You run the tower.',
    returned:'~40 interruptions a day \u2192 a decision queue of five or fewer',
    before:['Your phone is the CRM. Every lead, listing, and problem routes through you.','Evenings are follow-up audit \u2014 checking what your team already did.','Status lives in your head, so every question waits for you.'],
    day:[['7:30','Live Board brief: overnight leads scored and routed, listings launched, hand-raisers surfaced. One screen.'],['9:00','Cascade queue: today\u2019s listings and wins, approve once, the whole team posts.'],['Midday','Only judgment calls reach you. Everything else already moved.'],['17:00','Dardo roll-up: every field recap from your team, 2-minute retro. Keep / kill / change.']],
    inputs:['LEADS','LISTINGS','PROBLEMS','STATUS ASKS'], person:'THE LEADER', decision:'5 DECISION NODES',
    underneath:[['oscar','Oscar \u2014 the engine'],['quality-scorer','Quality Scorer'],['dardo','Dardo \u2014 leader roll-up'],['cascade','Cascade approvals'],['nurture-engine','Nurture Engine \u2014 signal summary']],
    never:['chasing status','being first touch','formatting anything'],
    outcome:'~40 \u2192 \u22645', outcomeSub:'interruptions a day become a decision queue of five or fewer.',
    testimony:'I stopped being the switchboard in the first week. The board opens, the day is already sorted.',
    art:'<rect x="330" y="30" width="60" height="120" fill="none" stroke="'+LN+'" stroke-width="1.5"/><line x1="330" y1="70" x2="390" y2="70" stroke="'+LD+'"/><line x1="330" y1="110" x2="390" y2="110" stroke="'+LD+'"/><circle cx="360" cy="50" r="5" fill="'+G+'"/><path class="draw" d="M60 250 C 200 190, 300 235, 360 160 S 560 210, 680 150" fill="none" stroke="'+G+'" stroke-width="2"/><path class="draw2" d="M60 268 C 220 225, 420 262, 680 205" fill="none" stroke="rgba(200,169,106,.4)" stroke-width="1.5"/><g fill="'+GH+'"><circle cx="180" cy="222" r="4"/><circle cx="300" cy="228" r="4"/><circle cx="470" cy="196" r="4"/><circle cx="590" cy="182" r="4"/></g><g stroke="'+LD+'"><path d="M120 262 H640 M120 262 V246 M260 256 V240 M400 254 V238 M540 232 V216"/></g><text x="360" y="290" text-anchor="middle" class="t-small t-gold">ONLY GOLD NODES RISE TO THE TOWER</text>'},
  { slug:'listing-agent', name:'Listing Agent', sendto:'your team leader',
    promise:'Sign it Tuesday. Launched before you\u2019ve finished telling the seller.',
    returned:'4\u20136 hours per listing, back \u2014 live in hours, not days',
    before:['Sign a listing, lose 4\u20136 hours to photos, copy, a page, social, email.','Every launch rebuilt from scratch, every time.','Day one starts cold \u2014 no waitlist, no momentum.'],
    day:[['Tue','Listing signed. One tap in Dardo: address, photos ordered, notes captured.'],['Wed 09:00','Photos land. Fabric builds the premium listing page, launch copy, sphere email.'],['Wed PM','Live. Syndicate has it everywhere; Cascade puts it through the whole team\u2019s channels \u2014 approved once, by the leader.'],['Pre-MLS','Coming Soon page builds the buyer waitlist while the seller watches demand form.']],
    inputs:['PHOTOS','ADDRESS','SELLER NOTES','PRICE'], person:'THE AGENT', decision:'ONE APPROVAL',
    underneath:[['listing-launch','Listing Launch'],['syndicate','Syndicate'],['cascade','Cascade'],['coming-soon-funnels','Coming Soon Funnels'],['dardo','Dardo \u2014 capture']],
    never:['building a launch from scratch','posting the same listing five places','a cold day-one'],
    outcome:'Hours, not days', outcomeSub:'from signature to live \u2014 and 4\u20136 hours per listing handed back.',
    testimony:'Signed Tuesday, live Wednesday \u2014 and I was at the next seller\u2019s table while it happened.',
    art:'<rect x="52" y="105" width="120" height="90" fill="none" stroke="'+LN+'" stroke-width="1.5"/><text x="112" y="146" text-anchor="middle" font-size="13" font-weight="700">THE LISTING</text><text x="112" y="166" text-anchor="middle" class="t-small">SIGNED TUESDAY</text><path class="draw" d="M172 150 C 300 150, 380 60, 520 52" fill="none" stroke="'+G+'" stroke-width="2"/><path class="draw2" d="M172 150 C 320 148, 400 108, 540 104" fill="none" stroke="rgba(200,169,106,.55)" stroke-width="1.5"/><path class="draw" d="M172 150 H560" fill="none" stroke="'+G+'" stroke-width="2"/><path class="draw2" d="M172 150 C 320 152, 400 192, 540 196" fill="none" stroke="rgba(200,169,106,.55)" stroke-width="1.5"/><path class="draw2" d="M172 150 C 300 150, 380 240, 520 248" fill="none" stroke="rgba(200,169,106,.35)" stroke-width="1.5"/><g class="fade" font-size="11" fill="'+GH+'"><text x="560" y="56">LISTING PAGE</text><text x="566" y="108">PORTALS</text><text x="566" y="154">SOCIAL</text><text x="566" y="200">SPHERE EMAIL</text><text x="546" y="252">WAITLIST</text></g><g fill="'+G+'"><circle cx="548" cy="52" r="4"/><circle cx="552" cy="104" r="4"/><circle cx="552" cy="150" r="4"/><circle cx="552" cy="196" r="4"/><circle cx="540" cy="248" r="4"/></g>'},
  { slug:'buyers-agent', name:'Buyer\u2019s Agent', sendto:'your team leader',
    promise:'Your job is the houses and the people. Not the paperwork after.',
    returned:'~90 minutes of after-showing admin \u2192 a 10-minute review',
    before:['Showings all day, admin all night.','Notes scattered; follow-ups drafted from memory at 10pm.','Buyers vanish after closing \u2014 nobody touches the 60 days after.'],
    day:[['Morning','Today\u2019s route and showings on one board; client context attached to each stop.'],['In the field','One tap per house in Dardo: photo, voice note, done. No forms.'],['Evening','Your brief is waiting: recaps written, follow-ups drafted in your voice, next steps routed. Approve, don\u2019t compose.'],['At close','Your buyer moves into You Found Home automatically. You stay their agent for the next 60 days without lifting a finger.']],
    inputs:['SHOWINGS','VOICE NOTES','CLIENT CONTEXT','NEXT STEPS'], person:'THE AGENT', decision:'APPROVE, DON\u2019T COMPOSE',
    underneath:[['dardo','Dardo \u2014 field seat'],['oscar','Oscar \u2014 routing'],['showing-ops','Showing Ops'],['you-found-home','You Found Home \u2014 handoff']],
    never:['10pm note reconstruction','follow-ups from memory','buyers who vanish after closing'],
    outcome:'90 min \u2192 10 min', outcomeSub:'of after-showing admin becomes a short evening review.',
    testimony:'My evenings are mine again. The brief is written before I\u2019m home.',
    art:'<path class="draw" d="M50 230 C 160 120, 240 210, 330 120 S 520 90, 590 130" fill="none" stroke="'+G+'" stroke-width="2"/><path class="draw2" d="M590 130 C 630 145, 650 150, 672 148" fill="none" stroke="rgba(200,169,106,.5)" stroke-width="1.5"/><g fill="none" stroke="'+LN+'" stroke-width="1.5"><path d="M96 168 l22 -18 22 18 M104 162 v20 h24 v-20"/><path d="M286 148 l22 -18 22 18 M294 142 v20 h24 v-20"/><path d="M476 84 l22 -18 22 18 M484 78 v20 h24 v-20"/></g><g fill="'+G+'"><circle cx="118" cy="196" r="5"/><circle cx="308" cy="168" r="5"/><circle cx="498" cy="104" r="5"/></g><rect x="636" y="118" width="52" height="42" fill="rgba(200,169,106,.14)" stroke="'+G+'" stroke-width="1.5"/><text x="662" y="135" text-anchor="middle" font-size="10" fill="'+GH+'">HOME</text><text x="662" y="150" text-anchor="middle" font-size="9" fill="'+GH+'">DAY 60</text><text x="118" y="238" text-anchor="middle" class="t-small">ONE TAP PER HOUSE</text><text x="470" y="238" text-anchor="middle" class="t-small t-gold">THE THREAD CONTINUES PAST THE LAST HOUSE</text>'},
  { slug:'ops', name:'TC / Admin / Ops Manager', sendto:'your team leader',
    promise:'Nothing reaches a client unqualified. Nothing lives only in your head.',
    returned:'Inbox-as-system \u2192 exception-only \u2014 the operation survives your day off',
    before:['You\u2019re the human router and the human reminder system.','Every file, deadline, and status question is yours.','If you\u2019re out, the knowledge walks out with you.'],
    day:[['Morning','One exception queue. Oscar has already qualified everything inbound: complete, deduped, scored, reason codes in plain English. You work only what failed the gate.'],['Midday','Deadlines and file status on the Live Board \u2014 visible to the whole team, so nobody asks you.'],['Always','Documents flow through the tools you already use \u2014 dotloop, DocuSign, your CRM. Nothing new to learn, nothing ripped out.']],
    inputs:['INBOUND FILES','DEADLINES','STATUS ASKS','DOCUMENTS'], person:'THE TC', decision:'EXCEPTIONS ONLY',
    underneath:[['oscar','Oscar \u2014 qualification gate'],['quality-scorer','Quality Scorer \u2014 completeness + reason codes'],['dardo','Dardo \u2014 recaps']],
    never:['status-chasing','re-typing the same data','being the only one who knows'],
    outcome:'Exception-only', outcomeSub:'the inbox stops being the system. You work what failed the gate \u2014 nothing else.',
    testimony:'It\u2019s the first system that made my job smaller instead of bigger. Everything arrives qualified.',
    art:'<g stroke="'+LD+'" stroke-dasharray="3 6" fill="none"><path d="M40 60 C 160 90, 220 60, 300 120"/><path d="M40 130 C 150 110, 230 170, 300 140"/><path d="M40 210 C 170 180, 210 230, 300 160"/><path d="M40 250 C 140 240, 240 210, 300 180"/></g><path d="M330 70 L400 150 L330 230 L260 150 Z" fill="rgba(200,169,106,.07)" stroke="'+G+'" stroke-width="1.5"/><path d="M292 105 L368 195 M368 105 L292 195 M330 88 V212 M298 150 H362" stroke="rgba(200,169,106,.4)" stroke-width="1"/><path class="draw" d="M400 105 H660" stroke="'+G+'" stroke-width="2" fill="none"/><path class="draw2" d="M400 150 H660" stroke="rgba(200,169,106,.6)" stroke-width="1.5" fill="none"/><path class="draw2" d="M400 195 H660" stroke="rgba(200,169,106,.35)" stroke-width="1.5" fill="none"/><g class="fade" font-size="11" fill="'+GH+'"><text x="668" y="109">QUALIFIED</text><text x="668" y="154">LABELED</text><text x="668" y="199">ROUTED</text></g><text x="330" y="262" text-anchor="middle" class="t-small t-gold">THE GATE SORTS. YOU WORK THE EXCEPTIONS.</text>'},
  { slug:'lead-handler', name:'ISA / Lead Handler', sendto:'your team leader',
    promise:'You only talk to people who are ready to talk.',
    returned:'No lead sits \u2014 your calls start at the top of the stack, every time',
    before:['A chronological inbox where the loudest and the latest win.','Hot leads wait behind junk.','Every conversation starts blank.'],
    day:[['All day','A ranked stack, not an inbox. Quality Scorer scores every lead the moment it lands \u2014 fit, intent, recency, engagement, completeness \u2014 with plain-English reason codes.'],['Each card','Arrives enriched: source, history, property, prior conversations, intent signals. You start informed.'],['The floor','First touch inside 60 seconds is the floor \u2014 the layer handles speed; you handle the conversation that matters, on the right channel, at the right time.'],['Live','Hand-raisers feed in from Nurture Engine\u2019s signal monitoring \u2014 people who moved, listed, or re-engaged show up at the top of your stack.']],
    inputs:['NEW LEADS','HAND-RAISERS','RE-ENGAGEMENT','PORTAL ALERTS'], person:'THE HANDLER', decision:'NOW / WAIT / DROP',
    underneath:[['quality-scorer','Quality Scorer'],['nurture-engine','Nurture Engine \u2014 hand-raiser feed'],['oscar','Oscar \u2014 routing']],
    never:['cold-start conversations','working a list top-to-bottom','losing a hot lead to a slow hour'],
    outcome:'Top of the stack', outcomeSub:'every call starts with the person who matters now \u2014 scored, enriched, informed.',
    testimony:'Every call starts informed. The stack tells me who matters now \u2014 I just talk.',
    art:'<g><rect x="180" y="36" width="360" height="52" rx="8" fill="rgba(200,169,106,.13)" stroke="'+G+'" stroke-width="1.5"/><rect x="196" y="100" width="328" height="46" rx="8" fill="none" stroke="'+LN+'"/><rect x="212" y="158" width="296" height="42" rx="8" fill="none" stroke="'+LD+'"/><rect x="228" y="212" width="264" height="38" rx="8" fill="none" stroke="'+LD+'"/></g><path class="draw" d="M120 250 C 200 200, 130 120, 168 62" fill="none" stroke="'+G+'" stroke-width="2"/><circle cx="172" cy="58" r="5" fill="'+G+'"/><text x="360" y="68" text-anchor="middle" font-size="13" font-weight="700" fill="'+GH+'">NOW \u2014 SCORED \u00b7 ENRICHED \u00b7 READY</text><text x="360" y="128" text-anchor="middle" class="t-small">WAIT \u2014 NURTURE HOLDS</text><text x="360" y="184" text-anchor="middle" class="t-small">DROP \u2014 ON THE RECORD</text><text x="96" y="262" class="t-small t-gold">SCORE THREAD</text>'},
  { slug:'brokerage-owner', name:'Brokerage Owner', sendto:'your top producer',
    promise:'Scale the brokerage without becoming the bottleneck at scale.',
    returned:'One recruited producer \u2248 $120K+ GCI a year \u2014 recruiting as a system, not an event',
    before:['Growth means more chaos in more places.','Recruiting is a scramble when someone remembers.','You see problems weeks after they start.'],
    day:[['Weekly','Leadership board: every team, every pipeline, one view. Dardo recaps roll up; you see where the week actually went.'],['Recruiting, running','Build an Empire identifies your next producers from your own deal-side data: the top performers already closing across from your agents. Ranked, enriched, approached discreetly \u2014 you control every approach. No toes stepped on.'],['Always','Your brokerage already looks like the place winners work: spotlights and market authority cascade through every agent\u2019s channels continuously.']],
    inputs:['CLOSED DEALS','DEAL-SIDE DATA','TEAM PIPELINES','FIELD RECAPS'], person:'THE OWNER', decision:'EVERY APPROACH, CONTROLLED',
    underneath:[['build-an-empire','Build an Empire'],['oscar','Oscar'],['cascade','Cascade \u2014 brokerage-wide'],['dardo','Dardo \u2014 leadership roll-up']],
    never:['cold recruiting lists','finding out late','growth that depends on your hours'],
    outcome:'$120K+', outcomeSub:'GCI a year from one recruited producer \u2014 found in your own deal flow.',
    testimony:'Recruiting stopped being an event. It runs \u2014 and I make the calls that matter.',
    art:'<g fill="none" stroke="'+LD+'"><circle cx="140" cy="80" r="6"/><circle cx="240" cy="200" r="6"/><circle cx="120" cy="230" r="6"/><circle cx="560" cy="220" r="6"/><circle cx="620" cy="90" r="6"/><circle cx="430" cy="60" r="6"/></g><circle cx="360" cy="145" r="34" fill="rgba(200,169,106,.1)" stroke="'+G+'" stroke-width="1.5"/><text x="360" y="149" text-anchor="middle" font-size="11" font-weight="700" fill="'+GH+'">YOUR WEAVE</text><path class="draw" d="M140 80 C 220 100, 280 120, 326 138" fill="none" stroke="'+G+'" stroke-width="2"/><path class="draw2" d="M620 90 C 540 105, 460 125, 394 140" fill="none" stroke="rgba(200,169,106,.6)" stroke-width="1.5"/><path class="draw2" d="M560 220 C 490 195, 440 170, 392 154" fill="none" stroke="rgba(200,169,106,.4)" stroke-width="1.5"/><g fill="'+G+'"><circle cx="140" cy="80" r="4"/><circle cx="620" cy="90" r="4"/><circle cx="560" cy="220" r="4"/></g><text x="140" y="56" text-anchor="middle" class="t-small t-gold">OTHER SIDE OF YOUR DEAL</text><text x="600" y="262" text-anchor="middle" class="t-small">THE STRONGEST NODES GLOW \u2014 THEN CONNECT</text>'},
  { slug:'homeowner', name:'Past Client \u2014 The Homeowner', sendto:'your agent',
    promise:'You found home. We never left.',
    returned:'A set of referrals is the designed outcome \u2014 not one lucky intro',
    before:['Closing day is the last thoughtful contact.','Then a holiday text, forever.','Referrals and reviews are left to luck and memory.'],
    day:[['Day 15','Settle-in check-in, as their own agent. Anything unresolved surfaces privately to the agent \u2014 never pushed public.'],['Day 30','Value only. Homeownership wins, local knowledge, encouragement. No pitch.'],['Day 45','The referral path opens \u2014 as a game, not a favor: visible progress, milestones, recognition from their agent at every step.'],['Day 60','The review ask, earned by now, routed across every platform that counts. Then Nurture Engine keeps the relationship warm for years \u2014 nothing to reactivate, because nothing was left to die.']],
    inputs:['CLOSING DAY','CHECK-INS','MILESTONES','THE YEARS AFTER'], person:'THEIR AGENT', decision:'EARNED, NOT ASKED EARLY',
    underneath:[['you-found-home','You Found Home'],['nurture-engine','Nurture Engine \u2014 continuity'],['oscar','Oscar']],
    never:['begging for reviews','referrals left to luck','clients who forget your name by year two'],
    outcome:'A set of referrals', outcomeSub:'is the designed outcome of the 60 days \u2014 not one lucky intro.',
    testimony:'They checked in before I knew I needed anything. Of course I sent them my sister.',
    art:'<path d="M300 60 L360 20 L420 60 M312 52 V110 H408 V52" fill="rgba(200,169,106,.08)" stroke="'+LN+'" stroke-width="1.5"/><rect x="344" y="76" width="32" height="34" fill="rgba(233,213,163,.25)" stroke="'+G+'"/><path class="draw" d="M30 190 C 200 176, 420 204, 690 182" fill="none" stroke="'+G+'" stroke-width="2"/><g><circle cx="150" cy="184" r="7" fill="#0B0A08" stroke="'+G+'" stroke-width="2"/><circle cx="300" cy="188" r="7" fill="#0B0A08" stroke="'+G+'" stroke-width="2"/><circle cx="450" cy="192" r="7" fill="#0B0A08" stroke="'+G+'" stroke-width="2"/><circle cx="590" cy="186" r="7" fill="'+G+'"/></g><g class="fade" font-size="12" fill="'+GH+'"><text x="150" y="222" text-anchor="middle">15</text><text x="300" y="226" text-anchor="middle">30</text><text x="450" y="230" text-anchor="middle">45</text><text x="590" y="224" text-anchor="middle">60</text></g><text x="360" y="268" text-anchor="middle" class="t-small t-gold">THEN THE THREAD RUNS ON \u2014 UNBROKEN</text>'}
  ];

  function esc(s){ return s.replace(/</g,'&lt;'); }
  function diagram(r){
    var ins=r.inputs.map(function(t,i){ return '<text x="30" y="'+(52+i*44)+'" font-size="11" fill="#D8D1C0">'+t+'</text><circle cx="196" cy="'+(48+i*44)+'" r="4" fill="none" stroke="'+LN+'"/>'; }).join('');
    var conv=r.inputs.map(function(t,i){ return '<path d="M200 '+(48+i*44)+' C 260 '+(48+i*44)+', 280 118, 330 118" stroke="rgba(244,239,227,.25)" stroke-dasharray="2 6" fill="none"/>'; }).join('');
    var after=r.inputs.map(function(t,i){ return '<path class="draw2" d="M392 '+(48+i*44)+' H560" stroke="rgba(200,169,106,'+(0.65-i*0.1)+')" stroke-width="1.5" fill="none"/><circle cx="566" cy="'+(48+i*44)+'" r="4" fill="'+G+'"/>'; }).join('');
    return '<svg viewBox="0 0 720 250" role="img" aria-label="Before and after diagram for '+esc(r.name)+'">'
      +'<text x="150" y="22" text-anchor="middle" class="t-small">BEFORE \u2014 THROUGH A PERSON</text>'
      + ins + conv
      +'<circle cx="345" cy="118" r="17" fill="none" stroke="'+GH+'" stroke-width="2"/><text x="345" y="160" text-anchor="middle" font-size="11" font-weight="700">'+r.person+'</text>'
      +'<text x="150" y="238" text-anchor="middle" font-size="11" class="t-dim">Everything waits on one chair.</text>'
      +'<text x="480" y="22" text-anchor="middle" class="t-small t-gold">AFTER \u2014 THROUGH THE LAYER</text>'
      +'<rect x="392" y="34" width="14" height="176" fill="rgba(200,169,106,.25)"/>'
      + after
      +'<circle cx="640" cy="60" r="7" fill="'+G+'"/><text x="640" y="86" text-anchor="middle" font-size="10" fill="'+GH+'">'+r.decision+'</text>'
      +'<text x="480" y="238" text-anchor="middle" font-size="11" class="t-dim">The person only touches decision nodes.</text></svg>';
  }
  function diagramMobile(r){
    return '<div class="vm-stack"><div class="vm-card"><b>BEFORE</b><span>EVERYTHING ROUTES THROUGH '+r.person+'</span></div><div class="vm-arrow">\u2193 FABRIC WEAVES IT</div><div class="vm-card gold"><b>AFTER</b><span>THROUGH THE LAYER \u2014 ONLY DECISIONS RISE</span></div><div class="vm-card"><b>'+r.decision+'</b><span>THE ONLY THING THAT REACHES '+r.person+'</span></div></div>';
  }
  function pageHTML(r){
    var chips=r.underneath.map(function(u){ return '<a class="role-chip" href="#/module-'+u[0]+'">'+u[1]+'</a>'; }).join('');
    var day=r.day.map(function(d){ return '<div class="tl-row"><b>'+d[0].toUpperCase()+'</b><p>'+d[1]+'</p></div>'; }).join('');
    var before=r.before.map(function(b){ return '<article class="pain"><p>'+b+'</p></article>'; }).join('');
    var never=r.never.map(function(n){ return '<li>'+n+'</li>'; }).join('');
    var mail='mailto:?subject='+encodeURIComponent('Fabric \u2014 the '+r.name+' page')+'&body='+encodeURIComponent('This is how Fabric runs for the '+r.name+' seat:\nhttps://fabric.stevepeeleii.com/app/#/cases/'+r.slug+'\nThe forwardable one-pager: https://fabric.stevepeeleii.com/app/downloads/role-'+r.slug+'.html');
    return '<section><div class="wrap">'
      +'<a class="backlink" href="#/cases">\u2190 All seats</a>'
      +'<div class="kicker" style="margin-top:18px">Use case \u2014 by role</div><h2>'+r.name+'</h2>'
      +'<p class="role-promise">'+r.promise+'</p>'
      +'<div class="viz" data-viz><div class="viz-head"><b>The world of the '+r.name.toLowerCase()+'</b><span>ILLUSTRATION</span></div><svg viewBox="0 0 720 300" role="img" aria-label="Illustration: '+esc(r.name)+'">'+r.art+'</svg></div>'
      +'<h3 class="role-h">Before</h3><div class="pain-grid">'+before+'</div>'
      +'<h3 class="role-h">A day with Fabric</h3><div class="timeline role-day">'+day+'</div>'
      +'<div class="viz viz-has-mobile" data-viz><div class="viz-head"><b>Before / after \u2014 identical geometry</b><span>ROUTING DIAGRAM</span></div>'+diagram(r)+'<div class="viz-mobile" aria-hidden="true">'+diagramMobile(r)+'</div></div>'
      +'<h3 class="role-h">What runs underneath</h3><div class="role-chips">'+chips+'</div>'
      +'<h3 class="role-h">What you never do again</h3><div class="model-card role-never"><ul>'+never+'</ul></div>'
      +'<div class="role-outcome"><span class="role-outcome-k">THE OUTCOME</span><div class="role-outcome-big">'+r.outcome+'</div><p>'+r.outcomeSub+'</p>'
      +'<p class="role-testimony">\u201c'+r.testimony+'\u201d<span>COMPOSITE TESTIMONY \u2014 A PATTERN VOICE, NOT A NAMED CLIENT</span></p>'
      +'<div class="film-slot" aria-label="Testimony film slot"><span>:20 TESTIMONY FILM \u2014 COMPOSITE \u00b7 SLOT \u00b7 DROPS IN WHEN RENDERED</span></div></div>'
      +'<div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:26px"><a class="btn" href="#/book">Book the 20-Minute Fit Call \u2192</a><a class="btn ghost" href="'+mail+'">Send this page to '+r.sendto+' \u2192</a><a class="btn ghost" href="downloads/role-'+r.slug+'.html">The one-pager (PDF-ready) \u2192</a></div>'
      +'</div></section>';
  }
  var main=document.querySelector('main'); if(!main) return;
  var built={};
  ROLES.forEach(function(r){
    var d=document.createElement('div');
    d.className='page role-page'; d.id='page-cases-'+r.slug; d.setAttribute('data-page','cases-'+r.slug);
    d.innerHTML=pageHTML(r);
    main.appendChild(d); built[r.slug]=d;
  });
  function current(){
    var h=(location.hash||'').replace(/^#\/?/,'');
    return h.indexOf('cases/')===0 ? h.slice(6) : null;
  }
  function render(){
    var slug=current();
    Object.keys(built).forEach(function(k){ built[k].classList.toggle('active', k===slug); });
    if(slug && built[slug]){
      document.querySelectorAll('.page').forEach(function(p){ if(p!==built[slug]) p.classList.remove('active'); });
      document.querySelectorAll('.pagenav a').forEach(function(a){ a.classList.toggle('on', a.getAttribute('data-nav')==='cases'); });
      window.scrollTo(0,0);
      setTimeout(function(){ built[slug].querySelectorAll('[data-viz]').forEach(function(v){ v.classList.add('in'); }); },60);
    }
  }
  window.addEventListener('hashchange',render);
  render();
  window.__FABRIC_ROLES=ROLES;
})();
