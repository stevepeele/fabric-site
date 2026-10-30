# fabric-site

The Fabric site tree (fabric.stevepeeleii.com) — deploy-by-push source for the
Vercel project `fabric` (prj_7G7JQSR9FQ9rLPTY6PHBTxisGAQK). Private.
Architecture of record: `FABRIC-BUILD-DOC.md` §10aa (Media + Deploy
Architecture, Steve, 2026-10-30 04:23 ET) in the Fabric workspace.

## Provenance

Initial commit mirrors CURRENT live production: deploy19-script1
(dpl_DctnEPs3g58aFgGsyo5DmC9HkbYz, shipped 2026-10-30 04:44 ET — the
deploy18 unified tree + the app/script1.js personal-reply fix), plus the
staged module teasers. Synced 2026-10-30 by the SPIIX-1118 lane; text-tree
parity vs the deploy19 payload verified zero-diff (media paths excluded).
`app/script5.js` references the teasers at local paths
(`app/assets/videos/teaser-*.mp4`) and the flagship at
`app/assets/videos/fabric-film.mp4` (DEFAULT_FILM).

## Media state — READ BEFORE PUSHING TO main

The initial commit carries the TEXT tree only. The GitHub connector used to
seed this repo validates UTF-8 text snapshots and cannot carry binaries, and
no git-capable transport (SSH / authenticated git) is available in the agent
environment. These 12 binary files exist in the workspace tree
(`~/workspace/fabric/fabric-site-repo/`) but are NOT yet in this repo:

- app/assets/asset0.jpg (90,399 B — currently LIVE; a push-deploy without it regresses it to 404)
- app/assets/fabric-film-poster.jpg (12,832 B — currently LIVE; same warning)
- app/assets/videos/teaser-*.mp4 ×10 (548 KB–1.45 MB each; the staged teasers)
- app/assets/videos/fabric-film.mp4 — flagship original (18,475,279 B) is at
  `~/workspace/fabric/deploy7/assets/videos/fabric-film.mp4`; not yet copied in.

**Until the binaries are committed (one `git add` + push from any
git-authenticated machine), do NOT push to main once this repo is linked to
Vercel** — a push-deploy of the text-only tree would take the two live JPGs
down. Complete the media commit first, then link, then push.

## Lanes (§10aa)

- Pushes to `main` deploy production once linked (route-inventory gate:
  verify zero routes lost after any push-deploy).
- Dropbox hosts film previews via public links (dl.dropboxusercontent.com
  raw streams) for review and for any page that must stream media.
- The Vercel connector route remains for small text-only deploys
  (< ~96 KB raw per file — MAX_ARG_STRLEN ceiling; media can never ride it).
