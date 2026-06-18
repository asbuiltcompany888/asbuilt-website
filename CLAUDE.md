# Project memory — As-Built Company website

This file is for me (Claude) to remember context across sessions. Read this first when starting work.

## What this is

Marketing website for **As-Built Company**, owned by **Jonathan** (jonathan@asbuiltcompany.com).

The business: 3D laser scanning and as-built documentation services in California. Equipment includes Leica BLK2GO and Insta360 cameras. Deliverables: point clouds, CAD drawings, Revit/Rhino models, 360° virtual tours.

Team: 2 people. Mailboxes: `hello@` and `jonathan@`.

## Real contact info (use these, don't placeholder)

- Phone: **+1 (626) 625-9249**
- Email: **hello@asbuiltcompany.com**
- Service area: **California**

## Stack

- **Framework**: Astro 5 (static site, zero JS by default)
- **Hosting**: Cloudflare Pages (via Workers Static Assets — the new path)
- **Source**: GitHub at `github.com/asbuiltcompany888/asbuilt-website` (private)
- **Registrar**: Cloudflare Registrar (planned, post-transfer from HostGator)
- **DNS**: Cloudflare
- **Email**: Google Workspace Business Starter ($7/user/mo)
- **CMS**: Pages CMS (https://pagescms.org/) — for Jonathan to edit content without code
- **Contact form**: Web3Forms (250 submissions/mo free) — access key TBD, placeholder in `src/pages/contact.astro`
- **Domain**: asbuiltcompany.com (currently registered at HostGator)
- **Typography**: Inter from Google Fonts (loaded in BaseLayout.astro)

## Design system

Reference: visual style and palette modeled on a brand reference Jonathan provided (June 2026).

**Colors** (defined as CSS vars in `src/styles/global.css`):
- Dark navy background: `#0A1F3D` (header, hero, footer top)
- Deeper navy: `#061629` (footer bg)
- Electric blue accent: `#2C7FF5` (CTAs, highlights, active states)
- Light surface: `#F5F8FC` (alternating sections)
- Subtle blue surface: `#E8F0FA` (tools strip)

**Typography**: Inter, weights 400–800. Headlines tight letter-spacing (-0.02em).

**Brand mark**: Stacked text "AS-BUILT" over wide-spaced "COMPANY". No real logo file yet — favicon is "AB" with a blue underline.

**Hero pattern**: Dark navy gradient with subtle grid overlay + radial glow top-right. Eyebrow label in accent blue, headline with white + accent-blue split (`<span class="accent">`).

**Card patterns**:
- `.icon-card` — service / value cards with icon, title, description
- `.card` — content cards with image area (gradient placeholder), category badge, title, description, footer
- `.video-card` — variant with play button + duration overlay
- `.pricing-card` — pricing tier with optional featured highlight

## Workflow

Jonathan tells me changes → I edit files → he uploads to GitHub → Cloudflare auto-deploys in ~30s.

(Long-term: replace manual upload with direct push from sandbox once we set up a fine-grained PAT.)

## Pages (all live in `src/pages/`)

| Path | File | Status |
|---|---|---|
| `/` | `index.astro` | Hero, 6 services grid, 3 why-us cards, 3 recent projects, CTA strip |
| `/about/` | `about.astro` | Hero, story prose, 3 values cards, CTA |
| `/services/` | `services.astro` | Hero, 9 service icon cards, CTA |
| `/projects/` | `projects.astro` | Hero, 6 project cards (placeholder), CTA |
| `/pricing/` | `pricing.astro` | Hero, 3 pricing tiers (middle featured), FAQ prose, CTA |
| `/resources/` | `resources.astro` | Hero with search + tabs, 4 featured cards, tools strip, 4 video cards, CTA |
| `/contact/` | `contact.astro` | Hero, 3 contact info cards, full form |

## Outstanding work

- [ ] Web3Forms access key (placeholder `YOUR_WEB3FORMS_ACCESS_KEY` in contact.astro)
- [ ] Real social media URLs in footer (currently `#`)
- [ ] Real logo SVG (currently text-based)
- [ ] Real hero/project/video imagery (currently CSS gradient placeholders)
- [ ] Privacy and Terms pages (linked in footer, not yet created)
- [ ] Newsletter signup wiring (currently just visual)
- [ ] Email migrated from HostGator to Google Workspace
- [ ] Domain transferred from HostGator to Cloudflare Registrar (or just nameservers swapped)
- [ ] HostGator cancelled

## Things to remember

- Real contact info is approved — don't placeholder it.
- All page copy is **Claude-written** based on inferred business — Jonathan to review and refine.
- Sandbox can't run `npm install` (registry blocked) — Cloudflare runs the build at deploy time.
- Sandbox can't `git init` cleanly on the mounted Windows folder (permissions on .git lock files). Workaround: web upload to GitHub or have user push from Windows side.

## Recently completed

- Initial Astro scaffold (June 2026)
- Full redesign to match brand reference: dark navy + electric blue palette, 7-page nav, new header/footer, hero patterns, card grids, pricing tiers, resources page (June 2026)
