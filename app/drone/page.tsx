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
          aria-hidden="true"
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
