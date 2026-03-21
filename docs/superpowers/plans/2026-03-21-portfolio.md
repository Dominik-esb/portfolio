# Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Dominik's personal portfolio site with a split landing page and two distinct subpages (IT/DevOps and Drone Photography) using Next.js and Tailwind CSS.

**Architecture:** Three-page Next.js App Router site — a full-viewport diagonal split landing page, a dark/animated IT subpage, and a cinematic drone subpage. Shared `ContactLinks` component floats on all pages. `ParticleCanvas` runs a canvas-based node animation as the IT page background.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Jest + React Testing Library, Vercel deployment

---

## File Map

| File | Responsibility |
|------|---------------|
| `app/layout.tsx` | Root layout — html/body, global font, metadata |
| `app/globals.css` | Tailwind base directives + CSS custom properties |
| `app/page.tsx` | Landing page — renders `<SplitLanding />` |
| `app/it/page.tsx` | IT subpage — renders particle bg + content |
| `app/drone/page.tsx` | Drone subpage — renders hero + services |
| `components/SplitLanding.tsx` | Diagonal clip-path split, hover state, navigation |
| `components/ParticleCanvas.tsx` | `<canvas>` animation (drifting nodes + connecting lines) |
| `components/ContactLinks.tsx` | Fixed bottom bar with GitHub + LinkedIn links |
| `__tests__/ContactLinks.test.tsx` | Links render with correct hrefs |
| `__tests__/SplitLanding.test.tsx` | Both halves render, links point to /drone and /it |
| `__tests__/it.test.tsx` | IT page content smoke test |
| `__tests__/drone.test.tsx` | Drone page content smoke test |

---

## Task 1: Bootstrap Next.js Project

**Files:**
- Create: `package.json`, `tsconfig.json`, `tailwind.config.ts`, `next.config.ts`, `app/layout.tsx`, `app/globals.css`

- [ ] **Step 1: Scaffold the project**

```bash
cd /Users/dominikeisenberg/Documents/Coding/portfolio
npx create-next-app@latest . \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --no-src-dir \
  --import-alias "@/*"
```

When prompted, accept all defaults. This creates the full Next.js 14 App Router setup with Tailwind and TypeScript.

- [ ] **Step 2: Install React Testing Library**

```bash
npm install --save-dev jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

- [ ] **Step 3: Create Jest config**

Create `jest.config.ts`:

```typescript
import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({ dir: './' })

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
}

export default createJestConfig(config)
```

Create `jest.setup.ts`:

```typescript
import '@testing-library/jest-dom'
```

- [ ] **Step 4: Add test script to package.json**

In `package.json`, add to `"scripts"`:
```json
"test": "jest",
"test:watch": "jest --watch"
```

- [ ] **Step 5: Strip the default Next.js boilerplate**

Replace `app/page.tsx` with a minimal placeholder:
```typescript
export default function Home() {
  return <main />
}
```

Replace `app/globals.css` with:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --sky-50: #f0f9ff;
  --sky-100: #e0f2fe;
  --sky-200: #bae6fd;
  --sky-300: #7dd3fc;
  --navy: #0c4a6e;
}

html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}
```

- [ ] **Step 6: Verify dev server starts**

```bash
npm run dev
```

Expected: Server starts at `http://localhost:3000` with no errors.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: bootstrap Next.js project with Tailwind and Jest"
```

---

## Task 2: ContactLinks Component

**Files:**
- Create: `components/ContactLinks.tsx`
- Create: `__tests__/ContactLinks.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `__tests__/ContactLinks.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react'
import ContactLinks from '@/components/ContactLinks'

describe('ContactLinks', () => {
  it('renders GitHub link with correct href', () => {
    render(<ContactLinks />)
    const github = screen.getByRole('link', { name: /github/i })
    expect(github).toHaveAttribute('href', 'https://github.com/Dominik-esb')
  })

  it('renders LinkedIn link with correct href', () => {
    render(<ContactLinks />)
    const linkedin = screen.getByRole('link', { name: /linkedin/i })
    expect(linkedin).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/dominik-eisenberg-93001422b'
    )
  })

  it('opens links in a new tab', () => {
    render(<ContactLinks />)
    const links = screen.getAllByRole('link')
    links.forEach(link => expect(link).toHaveAttribute('target', '_blank'))
  })
})
```

- [ ] **Step 2: Run test to confirm it fails**

```bash
npm test -- ContactLinks
```

Expected: FAIL — "Cannot find module '@/components/ContactLinks'"

- [ ] **Step 3: Implement ContactLinks**

Create `components/ContactLinks.tsx`:

```typescript
export default function ContactLinks() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center gap-4 py-3 bg-white/70 backdrop-blur-sm border-t border-sky-100">
      <a
        href="https://github.com/Dominik-esb"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
        className="flex items-center gap-2 text-sm text-slate-600 hover:text-sky-700 transition-colors"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
        </svg>
        GitHub
      </a>
      <a
        href="https://www.linkedin.com/in/dominik-eisenberg-93001422b"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        className="flex items-center gap-2 text-sm text-slate-600 hover:text-sky-700 transition-colors"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
        LinkedIn
      </a>
    </div>
  )
}
```

- [ ] **Step 4: Run test to confirm it passes**

```bash
npm test -- ContactLinks
```

Expected: PASS — 3 tests pass

- [ ] **Step 5: Commit**

```bash
git add components/ContactLinks.tsx __tests__/ContactLinks.test.tsx
git commit -m "feat: add ContactLinks component with GitHub and LinkedIn"
```

---

## Task 3: SplitLanding Component

**Files:**
- Create: `components/SplitLanding.tsx`
- Create: `__tests__/SplitLanding.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `__tests__/SplitLanding.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react'
import SplitLanding from '@/components/SplitLanding'

describe('SplitLanding', () => {
  it('renders the Dominik brand name', () => {
    render(<SplitLanding />)
    expect(screen.getByText('Dominik')).toBeInTheDocument()
  })

  it('renders drone link pointing to /drone', () => {
    render(<SplitLanding />)
    const droneLink = screen.getByRole('link', { name: /drone/i })
    expect(droneLink).toHaveAttribute('href', '/drone')
  })

  it('renders IT link pointing to /it', () => {
    render(<SplitLanding />)
    const itLink = screen.getByRole('link', { name: /it/i })
    expect(itLink).toHaveAttribute('href', '/it')
  })
})
```

- [ ] **Step 2: Run test to confirm it fails**

```bash
npm test -- SplitLanding
```

Expected: FAIL — "Cannot find module '@/components/SplitLanding'"

- [ ] **Step 3: Implement SplitLanding**

Create `components/SplitLanding.tsx`:

```typescript
'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function SplitLanding() {
  const [hovered, setHovered] = useState<'drone' | 'it' | null>(null)

  return (
    <div className="relative w-full h-screen overflow-hidden select-none">

      {/* Drone half — left */}
      <Link
        href="/drone"
        aria-label="Drone"
        className="absolute inset-0 block"
        style={{
          clipPath: 'polygon(0 0, 53% 0, 47% 100%, 0 100%)',
          background:
            hovered === 'drone'
              ? 'linear-gradient(160deg, #bae6fd 0%, #7dd3fc 100%)'
              : 'linear-gradient(160deg, #e0f2fe 0%, #bae6fd 100%)',
          transition: 'background 0.3s ease',
          transform: hovered === 'drone' ? 'scale(1.02)' : 'scale(1)',
          transformOrigin: 'left center',
        }}
        onMouseEnter={() => setHovered('drone')}
        onMouseLeave={() => setHovered(null)}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ paddingRight: '8%' }}>
          <span className="text-5xl mb-4">🚁</span>
          <span
            className="text-sm font-bold tracking-[4px] uppercase"
            style={{ color: '#0c4a6e' }}
          >
            Drone
          </span>
        </div>
      </Link>

      {/* IT half — right */}
      <Link
        href="/it"
        aria-label="IT"
        className="absolute inset-0 block"
        style={{
          clipPath: 'polygon(53% 0, 100% 0, 100% 100%, 47% 100%)',
          background:
            hovered === 'it'
              ? 'linear-gradient(160deg, #bae6fd 0%, #7dd3fc 100%)'
              : 'linear-gradient(160deg, #e0f2fe 0%, #bae6fd 100%)',
          transition: 'background 0.3s ease',
          transform: hovered === 'it' ? 'scale(1.02)' : 'scale(1)',
          transformOrigin: 'right center',
        }}
        onMouseEnter={() => setHovered('it')}
        onMouseLeave={() => setHovered(null)}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ paddingLeft: '8%' }}>
          <span className="text-5xl mb-4">⚙️</span>
          <span
            className="text-sm font-bold tracking-[4px] uppercase"
            style={{ color: '#0c4a6e' }}
          >
            IT
          </span>
        </div>
      </Link>

      {/* Center name overlay */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
      >
        <span
          className="text-2xl font-black tracking-widest uppercase"
          style={{
            color: '#0c4a6e',
            textShadow: '0 2px 12px rgba(255,255,255,0.8)',
            letterSpacing: '0.25em',
          }}
        >
          Dominik
        </span>
      </div>

    </div>
  )
}
```

- [ ] **Step 4: Run test to confirm it passes**

```bash
npm test -- SplitLanding
```

Expected: PASS — 3 tests pass

- [ ] **Step 5: Wire up the landing page**

Replace `app/page.tsx`:

```typescript
import SplitLanding from '@/components/SplitLanding'
import ContactLinks from '@/components/ContactLinks'

export default function Home() {
  return (
    <>
      <SplitLanding />
      <ContactLinks />
    </>
  )
}
```

- [ ] **Step 6: Verify visually**

```bash
npm run dev
```

Open `http://localhost:3000`. You should see the diagonal split with "Dominik" at center. Hovering each half should brighten it. Clicking navigates (pages don't exist yet — 404 is fine for now).

- [ ] **Step 7: Commit**

```bash
git add components/SplitLanding.tsx __tests__/SplitLanding.test.tsx app/page.tsx
git commit -m "feat: add split landing page with diagonal hover navigation"
```

---

## Task 4: ParticleCanvas Component

**Files:**
- Create: `components/ParticleCanvas.tsx`

No unit test needed — canvas drawing relies on browser APIs not available in jsdom. Visual verification is the test here.

- [ ] **Step 1: Implement ParticleCanvas**

Create `components/ParticleCanvas.tsx`:

```typescript
'use client'

import { useEffect, useRef } from 'react'

interface Dot {
  x: number
  y: number
  ox: number
  oy: number
  vx: number
  vy: number
  r: number
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let dots: Dot[] = []

    function resize() {
      if (!canvas) return
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      initDots()
    }

    function initDots() {
      if (!canvas) return
      dots = []
      const cols = 16
      const rows = 12
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = (i / (cols - 1)) * canvas.width
          const y = (j / (rows - 1)) * canvas.height
          dots.push({
            x, y, ox: x, oy: y,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            r: Math.random() * 1.5 + 0.5,
          })
        }
      }
    }

    function draw() {
      if (!canvas || !ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = '#0d1520'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      dots.forEach(d => {
        d.x += d.vx
        d.y += d.vy
        if (Math.abs(d.x - d.ox) > 20) d.vx *= -1
        if (Math.abs(d.y - d.oy) > 20) d.vy *= -1
      })

      const maxDist = 90
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x
          const dy = dots[i].y - dots[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < maxDist) {
            ctx.beginPath()
            ctx.moveTo(dots[i].x, dots[i].y)
            ctx.lineTo(dots[j].x, dots[j].y)
            ctx.strokeStyle = `rgba(56,189,248,${0.15 * (1 - dist / maxDist)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      dots.forEach(d => {
        ctx.beginPath()
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(148,210,252,0.6)'
        ctx.fill()
      })

      animId = requestAnimationFrame(draw)
    }

    resize()
    draw()

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    return () => {
      cancelAnimationFrame(animId)
      ro.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: 'block' }}
    />
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/ParticleCanvas.tsx
git commit -m "feat: add animated particle canvas for IT page background"
```

---

## Task 5: IT Subpage

**Files:**
- Create: `app/it/page.tsx`
- Create: `__tests__/it.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `__tests__/it.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react'
import ITPage from '@/app/it/page'

describe('IT page', () => {
  it('renders the main headline', () => {
    render(<ITPage />)
    expect(screen.getByText('Infrastructure & DevOps')).toBeInTheDocument()
  })

  it('renders all skill badges', () => {
    render(<ITPage />)
    expect(screen.getByText('Kubernetes')).toBeInTheDocument()
    expect(screen.getByText('Grafana')).toBeInTheDocument()
    expect(screen.getByText('Prometheus')).toBeInTheDocument()
    expect(screen.getByText('Mimir')).toBeInTheDocument()
    expect(screen.getByText('CI/CD')).toBeInTheDocument()
  })

  it('renders back link to home', () => {
    render(<ITPage />)
    const back = screen.getByRole('link', { name: /back|dominik|home/i })
    expect(back).toHaveAttribute('href', '/')
  })
})
```

- [ ] **Step 2: Run test to confirm it fails**

```bash
npm test -- it.test
```

Expected: FAIL — "Cannot find module '@/app/it/page'"

- [ ] **Step 3: Implement IT page**

Create `app/it/page.tsx`:

```typescript
import Link from 'next/link'
import ParticleCanvas from '@/components/ParticleCanvas'
import ContactLinks from '@/components/ContactLinks'

const skills = [
  { label: 'Kubernetes', color: 'blue' },
  { label: 'CI/CD', color: 'blue' },
  { label: 'Prometheus', color: 'green' },
  { label: 'Grafana', color: 'green' },
  { label: 'Mimir', color: 'green' },
  { label: 'Open Source', color: 'purple' },
] as const

const colorMap = {
  blue:   { bg: 'rgba(37,99,235,0.15)',   text: '#93c5fd', border: 'rgba(37,99,235,0.4)' },
  green:  { bg: 'rgba(22,163,74,0.15)',   text: '#86efac', border: 'rgba(22,163,74,0.4)' },
  purple: { bg: 'rgba(124,58,237,0.15)',  text: '#c4b5fd', border: 'rgba(124,58,237,0.4)' },
}

export default function ITPage() {
  return (
    <div className="relative min-h-screen w-full" style={{ background: '#0d1520' }}>
      <ParticleCanvas />

      <div className="relative z-10 min-h-screen flex flex-col px-8 py-10 max-w-2xl mx-auto">
        {/* Back nav */}
        <Link
          href="/"
          aria-label="Back to Dominik home"
          className="text-slate-500 text-sm hover:text-slate-300 transition-colors mb-12 self-start"
        >
          ← Dominik
        </Link>

        {/* Headline */}
        <h1 className="text-4xl font-extrabold text-slate-100 tracking-tight mb-2">
          Infrastructure &amp; DevOps
        </h1>
        <p className="text-sky-400 text-sm tracking-wide mb-10">
          Building reliable, observable systems at scale
        </p>

        {/* Skill badges */}
        <div className="flex flex-wrap gap-2 mb-10">
          {skills.map(({ label, color }) => {
            const c = colorMap[color]
            return (
              <span
                key={label}
                className="px-3 py-1 rounded-full text-xs font-semibold border"
                style={{ background: c.bg, color: c.text, borderColor: c.border }}
              >
                {label}
              </span>
            )
          })}
        </div>

        {/* Glass cards */}
        <div className="flex flex-col gap-4">
          <div
            className="rounded-xl p-5 border"
            style={{
              background: 'rgba(255,255,255,0.04)',
              borderColor: 'rgba(255,255,255,0.08)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <p className="text-xs uppercase tracking-widest text-slate-500 mb-2">
              Observability Stack
            </p>
            <p className="text-slate-200 text-sm">
              Prometheus · Grafana · Mimir · Alertmanager
            </p>
          </div>

          <div
            className="rounded-xl p-5 border"
            style={{
              background: 'rgba(255,255,255,0.04)',
              borderColor: 'rgba(255,255,255,0.08)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <p className="text-xs uppercase tracking-widest text-slate-500 mb-2">
              Open Source
            </p>
            <p className="text-slate-200 text-sm">github.com/Dominik-esb</p>
          </div>
        </div>
      </div>

      <ContactLinks />
    </div>
  )
}
```

- [ ] **Step 4: Run test to confirm it passes**

```bash
npm test -- it.test
```

Expected: PASS — 3 tests pass

- [ ] **Step 5: Verify visually**

Open `http://localhost:3000/it`. You should see the dark background with animated particles, skill badges, and glassmorphism cards.

- [ ] **Step 6: Commit**

```bash
git add app/it/page.tsx __tests__/it.test.tsx
git commit -m "feat: add IT subpage with particle animation and skill badges"
```

---

## Task 6: Drone Subpage

**Files:**
- Create: `app/drone/page.tsx`
- Create: `__tests__/drone.test.tsx`

Note: `public/drone-hero.jpg` must exist before production build. During development, use a URL from Unsplash (see Step 3). Replace with a real photo before deploying.

- [ ] **Step 1: Write the failing test**

Create `__tests__/drone.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react'
import DronePage from '@/app/drone/page'

describe('Drone page', () => {
  it('renders the main headline', () => {
    render(<DronePage />)
    expect(screen.getByText('Professional Drone Photography')).toBeInTheDocument()
  })

  it('renders DOC certified pilot badge', () => {
    render(<DronePage />)
    expect(screen.getByText(/DOC Certified/i)).toBeInTheDocument()
  })

  it('renders both services', () => {
    render(<DronePage />)
    expect(screen.getByText('Real Estate Photography')).toBeInTheDocument()
    expect(screen.getByText('Indoor 360° Mapping')).toBeInTheDocument()
  })

  it('renders equipment tags', () => {
    render(<DronePage />)
    expect(screen.getByText('Mavic 4 Pro')).toBeInTheDocument()
    expect(screen.getByText('Insta360')).toBeInTheDocument()
  })

  it('renders back link to home', () => {
    render(<DronePage />)
    const back = screen.getByRole('link', { name: /back|dominik|home/i })
    expect(back).toHaveAttribute('href', '/')
  })
})
```

- [ ] **Step 2: Run test to confirm it fails**

```bash
npm test -- drone.test
```

Expected: FAIL — "Cannot find module '@/app/drone/page'"

- [ ] **Step 3: Implement Drone page**

Create `app/drone/page.tsx`:

```typescript
import Link from 'next/link'
import Image from 'next/image'
import ContactLinks from '@/components/ContactLinks'

// Replace HERO_SRC with '/drone-hero.jpg' once you add a real photo to /public
const HERO_SRC = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=85'

const services = [
  {
    icon: '🏠',
    title: 'Real Estate Photography',
    description:
      'High-resolution aerial imagery for listings, developments & architecture.',
    tag: 'Mavic 4 Pro',
  },
  {
    icon: '🔄',
    title: 'Indoor 360° Mapping',
    description:
      'Immersive virtual walkthroughs for properties & commercial spaces.',
    tag: 'Insta360',
  },
]

export default function DronePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <Image
          src={HERO_SRC}
          alt="Aerial photography"
          fill
          className="object-cover"
          priority
          unoptimized={HERO_SRC.startsWith('https://')}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.65) 100%)',
          }}
        />

        {/* Back nav */}
        <Link
          href="/"
          aria-label="Back to Dominik home"
          className="absolute top-6 left-6 text-white/60 text-sm hover:text-white transition-colors z-10"
        >
          ← Dominik
        </Link>

        {/* Hero text */}
        <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
          <p className="text-sky-300 text-xs font-semibold tracking-[3px] uppercase mb-2">
            Aerial Services
          </p>
          <h1 className="text-white text-4xl font-extrabold leading-tight mb-4">
            Professional Drone Photography
          </h1>
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-white text-xs font-semibold border border-white/25"
            style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)' }}
          >
            ✈ DOC Certified Pilot
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="max-w-2xl mx-auto px-8 py-12 pb-24">
        <p className="text-xs font-semibold tracking-[3px] uppercase text-slate-400 mb-6">
          Services
        </p>
        <div className="flex flex-col gap-4">
          {services.map(({ icon, title, description, tag }) => (
            <div
              key={title}
              className="flex items-start gap-4 p-5 rounded-xl border border-slate-100 shadow-sm"
            >
              <div className="w-11 h-11 rounded-xl bg-sky-50 flex items-center justify-center text-xl flex-shrink-0">
                {icon}
              </div>
              <div>
                <h2 className="text-slate-900 font-bold text-sm mb-1">{title}</h2>
                <p className="text-slate-500 text-xs leading-relaxed mb-2">
                  {description}
                </p>
                <span className="inline-block bg-sky-50 text-sky-700 text-xs font-semibold px-2 py-0.5 rounded">
                  {tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ContactLinks />
    </div>
  )
}
```

- [ ] **Step 4: Run test to confirm it passes**

```bash
npm test -- drone.test
```

Expected: PASS — 5 tests pass

- [ ] **Step 5: Verify visually**

Open `http://localhost:3000/drone`. You should see the cinematic aerial photo hero with overlay text, DOC badge, and the two service cards below.

- [ ] **Step 6: Commit**

```bash
git add app/drone/page.tsx __tests__/drone.test.tsx
git commit -m "feat: add drone subpage with cinematic hero and service cards"
```

---

## Task 7: Root Layout, Metadata & Final Polish

**Files:**
- Modify: `app/layout.tsx`
- Modify: `next.config.ts`

- [ ] **Step 1: Update root layout with metadata**

Replace `app/layout.tsx`:

```typescript
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dominik — Drone & IT',
  description:
    'Personal portfolio of Dominik Eisenberg — Infrastructure & DevOps engineer and professional drone photographer.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
```

- [ ] **Step 2: Allow external image domain in next.config.ts**

This is needed during development when using the Unsplash placeholder URL.

Replace `next.config.ts`:

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
}

export default nextConfig
```

- [ ] **Step 3: Run full test suite**

```bash
npm test
```

Expected: All tests pass, no failures.

- [ ] **Step 4: Run production build to catch any type errors**

```bash
npm run build
```

Expected: Build completes successfully.

- [ ] **Step 5: Commit**

```bash
git add app/layout.tsx next.config.ts
git commit -m "feat: add metadata, font, and image config for production"
```

---

## Task 8: Deploy to Vercel

- [ ] **Step 1: Push to GitHub**

```bash
git remote add origin https://github.com/Dominik-esb/<repo-name>.git
git push -u origin main
```

- [ ] **Step 2: Import project on Vercel**

Go to [vercel.com](https://vercel.com) → "Add New Project" → Import the GitHub repo. Framework preset will auto-detect Next.js. Click Deploy.

- [ ] **Step 3: Verify deployed site**

Open the Vercel URL. Check all three pages work: `/`, `/it`, `/drone`.

- [ ] **Step 4: (Optional) Add real drone hero photo**

Replace the Unsplash URL in `app/drone/page.tsx`:
1. Add your photo to `public/drone-hero.jpg`
2. Change `HERO_SRC` to `'/drone-hero.jpg'`
3. Remove `unoptimized` prop from the `<Image>` component
4. Commit and push — Vercel auto-deploys
