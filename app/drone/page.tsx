import Link from 'next/link'
import DroneFrameHero from '@/components/DroneFrameHero'

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
    <div className="bg-[#0a0a0a] min-h-screen text-white">

      {/* Fixed back nav */}
      <div className="fixed top-6 left-6 z-50">
        <Link
          href="/"
          aria-label="Back to Dominik home"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.07] border border-white/10 backdrop-blur-md text-white/75 text-[0.8rem] font-bold no-underline tracking-[0.02em] transition-colors hover:bg-white/10"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
          Dominik
        </Link>
      </div>

      {/* Scroll-driven frame animation hero */}
      <DroneFrameHero />

      {/* Services */}
      <section
        id="services"
        className="max-w-[680px] mx-auto px-[clamp(1.5rem,4vw,2.5rem)] py-[clamp(4rem,8vw,7rem)]"
      >
        <p className="text-sky-400 text-[0.65rem] font-bold tracking-[0.3em] uppercase mb-10">
          Services
        </p>

        <div className="flex flex-col gap-4">
          {services.map(({ icon, title, description, tag }) => (
            <div
              key={title}
              className="flex items-start gap-5 p-6 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-md"
            >
              <div className="w-11 h-11 rounded-xl bg-sky-400/10 flex items-center justify-center text-xl shrink-0">
                {icon}
              </div>
              <div>
                <h2 className="text-white font-bold text-[0.9rem] mb-1.5 tracking-[-0.01em]">
                  {title}
                </h2>
                <p className="text-white/45 text-[0.8rem] leading-[1.65] mb-3">
                  {description}
                </p>
                <span className="inline-block bg-sky-400/[0.12] text-sky-400 text-[0.7rem] font-semibold px-2.5 py-1 rounded-full tracking-[0.02em]">
                  {tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Connect */}
      <section className="max-w-[680px] mx-auto px-[clamp(1.5rem,4vw,2.5rem)] pb-[clamp(5rem,10vw,8rem)]">
        <p className="text-sky-400 text-[0.65rem] font-bold tracking-[0.3em] uppercase mb-6">
          Connect
        </p>

        <div className="h-px bg-white/[0.06] mb-6" aria-hidden="true" />

        <div className="flex gap-3">
          <a
            href="https://github.com/Dominik-esb"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="flex items-center justify-center w-14 h-14 rounded-[0.875rem] bg-white/[0.06] border border-white/[0.08] text-white/60 transition-colors hover:bg-white/10 hover:text-white/80"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>

          <a
            href="https://www.linkedin.com/in/dominik-eisenberg-93001422b"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="flex items-center justify-center w-14 h-14 rounded-[0.875rem] bg-white/[0.06] border border-white/[0.08] text-white/60 transition-colors hover:bg-white/10 hover:text-white/80"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        </div>
      </section>
    </div>
  )
}
