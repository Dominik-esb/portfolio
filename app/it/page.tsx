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
