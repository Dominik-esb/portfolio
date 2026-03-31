import Link from 'next/link'
import Image from 'next/image'

const HERO_SRC = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=85'

const DOTS: [number, number][] = [
  [8, 4], [22, 7], [45, 2], [65, 5], [80, 3], [93, 8],
  [3, 16], [16, 21], [30, 14], [55, 19], [72, 16], [88, 23],
  [7, 33], [25, 39], [42, 31], [60, 37], [78, 32], [95, 39],
  [12, 50], [35, 54], [50, 47], [68, 53], [85, 49],
  [2, 64], [20, 69], [40, 62], [58, 67], [75, 71], [90, 65],
  [6, 81], [28, 84], [48, 77], [65, 87], [82, 81],
  [15, 94], [55, 91], [78, 95],
]

const services = [
  {
    icon: '🏠',
    title: 'Real Estate Photography',
    description: 'High-resolution aerial imagery for listings, developments & architecture.',
    tag: 'Mavic 4 Pro',
  },
  {
    icon: '🔄',
    title: 'Indoor 360° Mapping',
    description: 'Immersive virtual walkthroughs for properties & commercial spaces.',
    tag: 'Insta360',
  },
]

export default function DronePage() {
  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      {/* Dot scatter background */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        {DOTS.map(([x, y], i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-slate-200"
            style={{ left: `${x}%`, top: `${y}%` }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-8">
        {/* Back nav pill */}
        <div className="pt-6 pb-10">
          <Link
            href="/"
            aria-label="Back to Dominik home"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm text-slate-800 text-sm font-bold hover:bg-slate-50 transition-colors"
          >
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
              <path d="M7.05 7.05a1 1 0 0 0 0 1.41l1.41 1.41a1 1 0 1 0 1.41-1.41L8.46 7.05a1 1 0 0 0-1.41 0zM15.54 7.05a1 1 0 0 0-1.41 0l-1.41 1.41a1 1 0 1 0 1.41 1.41l1.41-1.41a1 1 0 0 0 0-1.41zM7.05 16.95a1 1 0 0 0 1.41 0l1.41-1.41a1 1 0 1 0-1.41-1.41l-1.41 1.41a1 1 0 0 0 0 1.41zM15.54 16.95a1 1 0 0 0 0-1.41l-1.41-1.41a1 1 0 1 0-1.41 1.41l1.41 1.41a1 1 0 0 0 1.41 0z" />
              <circle cx="4.5" cy="4.5" r="2" />
              <circle cx="19.5" cy="4.5" r="2" />
              <circle cx="4.5" cy="19.5" r="2" />
              <circle cx="19.5" cy="19.5" r="2" />
            </svg>
            Dominik
          </Link>
        </div>

        {/* Eyebrow label */}
        <p className="text-slate-400 text-xs font-bold tracking-[3px] uppercase mb-3">
          Aerial Services
        </p>

        {/* Giant heading */}
        <h1
          className="text-slate-900 font-black leading-[1.05] mb-6"
          style={{ fontSize: 'clamp(2.5rem, 10vw, 4rem)' }}
        >
          Professional
          <br />
          Drone
          <br />
          <span className="underline decoration-sky-500 decoration-[5px] underline-offset-4">
            Photography
          </span>
        </h1>

        {/* Certified badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-700 text-sm font-semibold mb-10">
          ✈ DOC Certified Pilot
        </div>

        {/* Hero image as rounded card */}
        <div className="relative h-56 rounded-2xl overflow-hidden mb-12 shadow-md">
          <Image
            src={HERO_SRC}
            alt="Aerial photography"
            fill
            className="object-cover"
            priority
            unoptimized={HERO_SRC.startsWith('https://')}
          />
        </div>

        {/* Services */}
        <p className="text-xs font-bold tracking-[3px] uppercase text-slate-400 mb-5">
          Services
        </p>
        <div className="flex flex-col gap-4 mb-12">
          {services.map(({ icon, title, description, tag }) => (
            <div
              key={title}
              className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm"
            >
              <div className="w-11 h-11 rounded-xl bg-sky-50 flex items-center justify-center text-xl flex-shrink-0">
                {icon}
              </div>
              <div>
                <h2 className="text-slate-900 font-bold text-sm mb-1">{title}</h2>
                <p className="text-slate-500 text-xs leading-relaxed mb-2">{description}</p>
                <span className="inline-block bg-sky-50 text-sky-700 text-xs font-semibold px-2 py-0.5 rounded">
                  {tag}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Contact icon buttons */}
        <p className="text-xs font-bold tracking-[3px] uppercase text-slate-400 mb-5">
          Connect
        </p>
        <div className="flex gap-4 pb-16">
          <a
            href="https://github.com/Dominik-esb"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-100 text-slate-800 hover:bg-slate-200 transition-colors"
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/dominik-eisenberg-93001422b"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-100 text-slate-800 hover:bg-slate-200 transition-colors"
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}
