
/* Share kit (Send to your TC or Admin) */
var kitOverlay=document.getElementById('kitOverlay');
var kitText=document.getElementById('kitText').textContent;
document.getElementById('kitMail').href="mailto:?subject="+encodeURIComponent("Please submit this for me — Fabric 20-Minute Fit Call")+"&body="+encodeURIComponent(kitText);
document.querySelectorAll('.kit-open').forEach(function(b){ b.addEventListener('click',function(){ kitOverlay.classList.add('open'); }); });
function closeKit(){ kitOverlay.classList.remove('open'); }
document.getElementById('kitClose').addEventListener('click',closeKit);
document.getElementById('kitSelf').addEventListener('click',closeKit);
kitOverlay.addEventListener('click',function(e){ if(e.target===kitOverlay){ closeKit(); } });
document.getElementById('kitCopy').addEventListener('click',function(){
  var btn=document.getElementById('kitCopy');
  if(navigator.clipboard){ navigator.clipboard.writeText(kitText).then(function(){ btn.textContent='Copied ✓'; setTimeout(function(){ btn.textContent='Copy the Kit'; },2200); }); }
});
document.querySelectorAll('[data-pkg]').forEach(function(a){
  a.addEventListener('click',function(){
    var sel=document.getElementById('f-pkg');
    for(var i=0;i<sel.options.length;i++){ if(sel.options[i].text.indexOf(a.getAttribute('data-pkg').split(' —')[0])===0){ sel.selectedIndex=i; break; } }
  });
});
var form=document.getElementById('fitForm');
form.addEventListener('submit',function(e){
  e.preventDefault();
  var name=document.getElementById('f-name').value.trim();
  var brok=document.getElementById('f-brokerage').value.trim();
  var contact=document.getElementById('f-contact').value.trim();
  var pkg=document.getElementById('f-pkg').value;
  var vol=document.getElementById('f-vol').value;
  var team=document.getElementById('f-team').value;
  var pain=document.getElementById('f-pain').value;
  if(!name||!brok||!contact){ return; }

  var upfront = pkg.indexOf('Start')===0 ? 'the first month of Start ($1,950)' : (pkg.indexOf('Full')===0 ? 'the first month of Full ($3,950)' : 'the first month of your chosen product at pilot pricing');

  var emailText =
"Subject: Received — " + brok + " Fit Call Request | Fabric Market Movers\n\n" +
"✓ You're in, " + name + ". Your fit call request has been received — here's exactly what we got and what happens next.\n\n" +
"WHAT WE RECEIVED\n" +
"• Name: " + name + "\n" +
"• Brokerage / Team: " + brok + "\n" +
"• Best contact: " + contact + "\n" +
"• Stage leaning: " + pkg + "\n" +
"• Last 12 months: " + vol + "\n" +
"• Team size: " + team + "\n" +
"• Biggest time drain: " + pain + "\n\n" +
"WHAT HAPPENS NEXT\n" +
"1. Every submission gets a personal reply: a scheduling email with a calendar link + 3 call times in the next 2 business days. Your Market Movers spot hold runs 5 business days from that email.\n" +
"2. You pick a time → calendar invite arrives immediately, video link + your numbers attached.\n" +
"3. The 20-minute fit call: your numbers, where the work piles up, a straight fit verdict.\n" +
"4. Within 48 hours after the call: your Private Teardown by email (scored one-page PDF + walkthrough video) — yours to keep either way.\n" +
"5. If it's a fit: pay " + upfront + " up front by secure link (pilot pricing, no separate start fee) → 14-Day Proof Sprint kicks off within 3 business days. Nothing breaks.\n\n" +
"No spam, no sales sequence. One scheduling email, one call, one teardown.\n\n" +
"— Fabric · pros.signalsbyspii.com · also at pros.stevepeeleii.com";

  var res=document.getElementById('result');
  res.innerHTML =
    '<h3>✓ You\'re in, ' + name.replace(/</g,'&lt;') + '. Request received for ' + brok.replace(/</g,'&lt;') + '.</h3>' +
    '<p style="margin:0">This is your confirmation — the same text is on its way to <b>' + contact.replace(/</g,'&lt;') + '</b>. Use “Send via Email” below to deliver it instantly if your mail app is handy; either way, we have what we need.</p>' +
    '<h4>WHAT WE RECEIVED</h4><ul>' +
    '<li><b>Stage leaning:</b> ' + pkg.replace(/</g,'&lt;') + '</li>' +
    '<li><b>Last 12 months:</b> ' + vol.replace(/</g,'&lt;') + '</li>' +
    '<li><b>Team size:</b> ' + team.replace(/</g,'&lt;') + '</li>' +
    '<li><b>Biggest time drain:</b> ' + pain.replace(/</g,'&lt;') + '</li></ul>' +
    '<h4>WHAT HAPPENS NEXT</h4><ol>' +
    '<li><b>Every submission gets a personal reply:</b> scheduling email with calendar link + 3 times in the next 2 business days. Market Movers spot hold: 5 business days.</li>' +
    '<li><b>You pick a time</b> → invite arrives immediately with video link and your numbers attached.</li>' +
    '<li><b>20-minute fit call</b> → straight fit verdict on the call.</li>' +
    '<li><b>Within 48 hours after the call:</b> your Private Teardown (scored PDF + walkthrough video) — yours to keep either way.</li>' +
    '<li><b>If it\'s a fit:</b> pay ' + upfront + ' up front by secure link (pilot pricing, no separate start fee) → 14-Day Proof Sprint starts within 3 business days, Proof live by Day 14 — nothing broken.</li></ol>' +
    '<p class="fineprint">No spam, no sales sequence. One scheduling email, one call, one teardown. — Fabric · pros.signalsbyspii.com · pros.stevepeeleii.com</p>';
  res.classList.add('show');
  var actions=document.getElementById('resultActions'); actions.style.display='flex';
  document.getElementById('mailtoBtn').href="mailto:hello@signalsbyspii.com?subject="+encodeURIComponent("Fit Call Request — "+brok+" (Fabric Market Movers)")+"&body="+encodeURIComponent(emailText);
  document.getElementById('copyBtn').onclick=function(){
    if(navigator.clipboard){ navigator.clipboard.writeText(emailText).then(function(){ document.getElementById('copyBtn').textContent='Copied ✓'; }); }
  };
  res.scrollIntoView({behavior:'smooth',block:'nearest'});
});
