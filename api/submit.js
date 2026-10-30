// Fabric fit-call form endpoint — SPIIX-1101
// Vercel serverless function. Deploy at project root as api/submit.js.
//
// RE-SCOPE MODE (Steve, 2026-10-30 04:19–04:20 ET — see BOOK-FLOW-RESCOPE.md):
// no transactional email provider is used. When neither RESEND_API_KEY nor
// SENDGRID_API_KEY is set (the intended state), the send jobs below are NOT
// attempted and NOT logged as failures — each is written to fabric_send_log
// with provider "personal-reply" and status "queued_personal_reply". Lauren
// works that queue personally: a reply from lauren@stevepeeleii.com carrying
// the Cal.com booking link + 3 proposed call times, then closes the rows out.
// Scheduling itself is Cal.com-native (BOOKING_LINK) — Cal.com sends its own
// confirmations. If a provider key is ever set, the original provider branch
// below wakes unchanged.
//
// What it does, in order:
//   1. POST-only, JSON body. Honeypot check (field "company_website").
//   2. Best-effort per-IP rate limit (in-memory, per instance).
//   3. Validates + sanitizes the lead.
//   4. Stores the lead in Supabase (public.fabric_leads, insert-only anon access).
//   5. Sends up to three real emails via Resend (RESEND_API_KEY) or
//      SendGrid (SENDGRID_API_KEY), whichever env var is set:
//        a. Visitor auto-response (confirmation + next steps + booking link if set)
//        b. TC/Admin booking kit (only when tc_email was entered)
//        c. Ops notification to OPS_EMAIL (default steve@stevepeeleii.com)
//   6. Logs every send attempt to Supabase (public.fabric_send_log)
//      with provider message id + status. Read the log with:
//        sb-mgmt sql yphcackwchaxguzamyzq "select * from fabric_send_log order by created_at desc;"
//
// Required env (Vercel project "fabric"):
//   RESEND_API_KEY   — from the Resend account created for lauren@stevepeeleii.com
//                      (or SENDGRID_API_KEY from Steve's existing SendGrid account)
// Optional env:
//   EMAIL_FROM       — default "Fabric <leads@stevepeeleii.com>".
//                      NOTE: sending from stevepeeleii.com requires the domain
//                      verified in the provider (SPF/DKIM records at GoDaddy).
//                      For pre-verification testing with Resend, set
//                      EMAIL_FROM="Fabric <onboarding@resend.dev>" — that sender
//                      can only deliver to the Resend account owner's address.
//   OPS_EMAIL        — default "steve@stevepeeleii.com"
//   BOOKING_LINK     — override for the booking link. Default in code is
//                      Steve's verified Cal.com page:
//                      https://cal.com/peele/sprint-call (HTTP 200, live).
//   SUPABASE_URL / SUPABASE_ANON_KEY — defaults below are the public anon
//                      key for the "profolio" project (insert-only by RLS).

const crypto = require('crypto');

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://yphcackwchaxguzamyzq.supabase.co';
const SUPABASE_ANON_KEY =
  process.env.SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwaGNhY2t3Y2hheGd1emFteXpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE2MjkwNTcsImV4cCI6MjEwNzIwNTA1N30.HWMlL_oeMv9yThbwyL-kNe4qzONL2gVbrILH-eP7iA0';
const OPS_EMAIL = process.env.OPS_EMAIL || 'steve@stevepeeleii.com';
const EMAIL_FROM = process.env.EMAIL_FROM || 'Fabric <leads@stevepeeleii.com>';
const BOOKING_LINK = process.env.BOOKING_LINK || 'https://cal.com/peele/sprint-call'; // verified live 2026-10-30 (HTTP 200, "Sprint Booking Call | Steve Peele II")

// ---- rate limit: 5 submissions / 10 min / IP (per warm instance) ----
const hits = new Map();
function rateLimited(ip) {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000;
  const arr = (hits.get(ip) || []).filter((t) => now - t < windowMs);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length > 5;
}

// ---- helpers ----
const clean = (v, max) =>
  String(v == null ? '' : v).replace(/<[^>]*>/g, '').trim().slice(0, max || 300);
const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

async function supabaseInsert(table, row) {
  const r = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal', // insert-only RLS: never ask for the row back
    },
    body: JSON.stringify(row),
  });
  if (!r.ok) throw new Error(`supabase ${table} insert: HTTP ${r.status} ${await r.text()}`);
}

async function logSend(leadId, kind, recipient, provider, providerId, status, error) {
  try {
    await supabaseInsert('fabric_send_log', {
      lead_id: leadId || null,
      kind,
      recipient: recipient || null,
      provider: provider || null,
      provider_id: providerId || null,
      status,
      error: error ? String(error).slice(0, 500) : null,
    });
  } catch (_) {
    /* logging must never break the request path */
  }
}

async function sendEmail({ to, subject, text }) {
  if (process.env.RESEND_API_KEY) {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ from: EMAIL_FROM, to: [to], subject, text }),
    });
    const data = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(`resend HTTP ${r.status}: ${JSON.stringify(data).slice(0, 300)}`);
    return { provider: 'resend', id: data.id || null };
  }
  if (process.env.SENDGRID_API_KEY) {
    const m = EMAIL_FROM.match(/<([^>]+)>/);
    const r = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: to }] }],
        from: { email: m ? m[1] : EMAIL_FROM, name: 'Fabric' },
        subject,
        content: [{ type: 'text/plain', value: text }],
      }),
    });
    if (!r.ok) throw new Error(`sendgrid HTTP ${r.status}: ${(await r.text()).slice(0, 300)}`);
    return { provider: 'sendgrid', id: r.headers.get('x-message-id') || null };
  }
  throw new Error('no email provider key configured (RESEND_API_KEY / SENDGRID_API_KEY)');
}

// ---- email copy (succinctness standard: short claims, no padding) ----
function visitorEmail(lead) {
  const booking = BOOKING_LINK
    ? `\nBook your 20 minutes here: ${BOOKING_LINK}\n`
    : '\nYour scheduling email lands within 1 business hour, Mon–Fri.\n';
  return {
    subject: 'Fabric — we got it. Next step inside.',
    text:
      `${lead.name ? lead.name.split(' ')[0] : 'Hi'} — we got it.\n` +
      `\nYour fit-call request is in for ${lead.brokerage || 'your team'}.\n` +
      booking +
      `\nWhat happens next:\n` +
      `1. The 20-Minute Fit Call. Your numbers, your bottleneck, a straight verdict.\n` +
      `2. Your 48-Hour Private Teardown. Where the work leaks, in writing.\n` +
      `3. If it fits: the 14-Day Proof Sprint. First month paid up front. Nothing breaks.\n` +
      `\nYou run the market. We help you run more.\n— Fabric\n`,
  };
}

function tcKitEmail(lead) {
  return {
    subject: `Fabric booking kit — for ${lead.name || 'your team leader'} (${lead.brokerage || 'Fabric fit call'})`,
    text:
      `Hi — ${lead.name || 'your team leader'} at ${lead.brokerage || 'the brokerage'} asked us to send you this kit.\n` +
      `\nYour one job: book their 20-Minute Fit Call with Fabric.\n` +
      (BOOKING_LINK ? `\nBooking link: ${BOOKING_LINK}\n` : '\nA scheduling email with the booking link lands within 1 business hour, Mon–Fri. Book from that email.\n') +
      `\nWhat Fabric is: the operating layer underneath the team. Listing launches, follow-up, database — run through one framework. The team keeps selling. Nothing breaks.\n` +
      `\nWhat the call covers: their numbers, where the work piles up, and a straight fit verdict. 20 minutes. No pitch deck.\n` +
      `\nStage they're leaning toward: ${lead.stage || 'Not sure yet'}.\n` +
      `\nQuestions? Reply to this email.\n— Fabric\n`,
  };
}

function opsEmail(lead) {
  return {
    subject: `New Fabric fit-call lead — ${lead.brokerage || lead.name || 'unknown'}`,
    text:
      `New lead from fabric.stevepeeleii.com\n\n` +
      `Name: ${lead.name}\nBrokerage/Team: ${lead.brokerage}\nContact: ${lead.contact}\n` +
      `Email: ${lead.email || '(not given)'}\nTC/Admin email: ${lead.tc_email || '(not given)'}\n` +
      `Stage: ${lead.stage || ''}\nLast 12 months: ${lead.volume || ''}\nTeam size: ${lead.team_size || ''}\n` +
      `Biggest time-eater: ${lead.pain || ''}\n\nStored in Supabase fabric_leads (id ${lead.id}).\n`,
  };
}

// ---- handler ----
module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'method_not_allowed' });
    return;
  }
  const ip = (req.headers['x-forwarded-for'] || 'unknown').split(',')[0].trim();
  const ipHash = crypto.createHash('sha256').update(ip).digest('hex').slice(0, 32);

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch (_) { body = {}; }
  }
  body = body || {};

  // Honeypot: real humans never fill this. Fake success, store nothing.
  if (clean(body.company_website, 200)) {
    await logSend(null, 'honeypot', null, null, null, 'dropped', 'honeypot filled');
    res.status(200).json({ ok: true });
    return;
  }
  if (rateLimited(ipHash)) {
    res.status(429).json({ ok: false, error: 'rate_limited' });
    return;
  }

  const lead = {
    id: crypto.randomUUID(),
    name: clean(body.name, 120),
    brokerage: clean(body.brokerage, 160),
    contact: clean(body.contact, 160),
    email: clean(body.email, 160),
    tc_email: clean(body.tc_email, 160),
    stage: clean(body.stage, 60),
    volume: clean(body.volume, 60),
    team_size: clean(body.team_size, 60),
    pain: clean(body.pain, 400),
    source: 'fabric.stevepeeleii.com',
    ip_hash: ipHash,
  };
  if (!lead.name || !lead.brokerage || !lead.contact) {
    res.status(400).json({ ok: false, error: 'missing_required' });
    return;
  }
  if (lead.email && !isEmail(lead.email)) lead.email = '';
  if (lead.tc_email && !isEmail(lead.tc_email)) lead.tc_email = '';
  // The form's contact field is "email or cell" — if it is an email, use it.
  if (!lead.email && isEmail(lead.contact)) lead.email = lead.contact;

  // 1) Store the lead. If storage fails, the request fails — no silent loss.
  try {
    await supabaseInsert('fabric_leads', lead);
  } catch (e) {
    await logSend(lead.id, 'store', null, 'supabase', null, 'failed', e.message);
    res.status(500).json({ ok: false, error: 'store_failed' });
    return;
  }

  // 2) Emails. A failed send is logged, never fatal — the lead is already safe.
  const jobs = [];
  if (lead.email) jobs.push(['visitor_autoresponse', lead.email, visitorEmail(lead)]);
  if (lead.tc_email) jobs.push(['tc_admin_kit', lead.tc_email, tcKitEmail(lead)]);
  jobs.push(['ops_notification', OPS_EMAIL, opsEmail(lead)]);

  const providerConfigured = !!(process.env.RESEND_API_KEY || process.env.SENDGRID_API_KEY);
  const results = [];
  for (const [kind, to, mail] of jobs) {
    if (!providerConfigured) {
      // Re-scope mode: queue the job for Lauren's personal reply. The lead is
      // already stored; the queue row in fabric_send_log is the work ticket.
      await logSend(lead.id, kind, to, 'personal-reply', null, 'queued_personal_reply', null);
      results.push({ kind, status: 'queued_personal_reply' });
      continue;
    }
    try {
      const sent = await sendEmail({ to, subject: mail.subject, text: mail.text });
      await logSend(lead.id, kind, to, sent.provider, sent.id, 'sent', null);
      results.push({ kind, status: 'sent', id: sent.id });
    } catch (e) {
      await logSend(lead.id, kind, to, null, null, 'failed', e.message);
      results.push({ kind, status: 'failed', error: String(e.message).slice(0, 200) });
    }
  }

  res.status(200).json({ ok: true, lead: lead.id, sends: results });
};
