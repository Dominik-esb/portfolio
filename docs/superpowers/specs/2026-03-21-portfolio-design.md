# Portfolio Website — Design Spec

**Date:** 2026-03-21
**Owner:** Dominik Eisenberg
**Stack:** Next.js (App Router), deployed to Vercel

---

## Overview

A personal portfolio site with two distinct domains: IT/DevOps background and a drone photography business. The site is split into three pages — a landing page that acts as a visual gateway, and two subpages with completely different design languages.

---

## Pages

### 1. Landing Page (`/`)

**Layout**
- Full-viewport height, no scroll
- Split into two halves by a steep near-vertical diagonal slash using CSS `clip-path`
- Left half: Drone
- Right half: IT

**Visual Style**
- Light mode
- Sky blue palette (whites, light blues, `#e8f4fd` → `#bfdbfe` range)
- "Dominik" as the name/brand — displayed centered or at the divider

**Interactions**
- Each half brightens/scales slightly on hover (CSS transition)
- Clicking either half navigates to the respective subpage (`/drone` or `/it`)

**Contact**
- GitHub and LinkedIn links in a minimal floating bar or footer
  - GitHub: https://github.com/Dominik-esb
  - LinkedIn: https://www.linkedin.com/in/dominik-eisenberg-93001422b

---

### 2. IT Subpage (`/it`)

**Visual Style**
- Dark theme (contrasts the light landing)
- Background: animated particle/node grid — cyan nodes that drift slowly, connected by faint lines when close (canvas-based animation)
- Glassmorphism cards (`rgba` backgrounds, `backdrop-filter: blur`)

**Content**
- Headline: "Infrastructure & DevOps"
- Subheadline: "Building reliable, observable systems at scale"
- Skill badges grouped by category:
  - Blue: Kubernetes, CI/CD
  - Green: Prometheus, Grafana, Mimir
  - Purple: Open Source / OSS contributions
- Info cards:
  - Observability Stack: Prometheus · Grafana · Mimir · Alertmanager
  - Open Source: github.com/Dominik-esb
- GitHub + LinkedIn links

---

### 3. Drone Subpage (`/drone`)

**Visual Style**
- Bright, cinematic, professional
- Full-bleed aerial photography hero image with dark gradient overlay
- Below hero: clean white/light sections for services

**Content**
- Hero:
  - Eyebrow: "Aerial Services"
  - Headline: "Professional Drone Photography"
  - DOC Certified Pilot badge
- Services section:
  - **Real Estate Photography** — High-resolution aerial imagery for listings, developments & architecture. Equipment: Mavic 4 Pro
  - **Indoor 360° Mapping** — Immersive virtual walkthroughs for properties & commercial spaces. Equipment: Insta360
- GitHub + LinkedIn links

**Future direction (noted):** Can evolve into a deeper real estate business page with property showcase gallery, pricing/packages, client inquiry form, before/after aerial comparisons.

---

## Architecture

```
/
├── app/
│   ├── page.tsx          # Landing page — split diagonal
│   ├── it/
│   │   └── page.tsx      # IT subpage
│   └── drone/
│       └── page.tsx      # Drone subpage
├── components/
│   ├── SplitLanding.tsx  # Diagonal split with hover effects
│   ├── ParticleCanvas.tsx # Animated particle grid (IT bg)
│   └── ContactLinks.tsx  # GitHub + LinkedIn links
└── public/
    └── drone-hero.jpg    # Aerial hero image
```

## Routing
- Next.js App Router
- No external auth, no database — fully static content
- Deploy to Vercel (default Next.js target)

## Styling
- Tailwind CSS for utility classes
- CSS `clip-path` for the diagonal landing split
- `<canvas>` for the particle animation on the IT page
- No UI component library — keep dependencies minimal

## Navigation
- Landing → IT: click right half
- Landing → Drone: click left half
- Subpages → Landing: back link in top-left corner

---

## Out of Scope (for this version)
- Contact form
- Blog / writing section
- Project case studies
- CMS integration
- Analytics
