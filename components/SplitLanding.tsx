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
        aria-label="Go to Drone"
        className="absolute inset-0 block group"
        style={{
          clipPath: 'polygon(0 0, 53% 0, 47% 100%, 0 100%)',
          background:
            hovered === 'drone'
              ? 'linear-gradient(160deg, #bae6fd 0%, #7dd3fc 100%)'
              : 'linear-gradient(160deg, #e0f2fe 0%, #bae6fd 100%)',
          transition: 'background 0.3s ease',
        }}
        onMouseEnter={() => setHovered('drone')}
        onMouseLeave={() => setHovered(null)}
      >
        <div
          className="absolute inset-0 flex flex-col items-center justify-center rounded-lg group-focus-visible:ring-2 group-focus-visible:ring-sky-700 group-focus-visible:ring-inset"
          style={{
            paddingRight: '8%',
            transform: hovered === 'drone' ? 'scale(1.02)' : 'scale(1)',
            transformOrigin: 'left center',
            transition: 'transform 0.3s ease',
          }}
        >
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
        aria-label="Go to IT"
        className="absolute inset-0 block group"
        style={{
          clipPath: 'polygon(53% 0, 100% 0, 100% 100%, 47% 100%)',
          background:
            hovered === 'it'
              ? 'linear-gradient(160deg, #bae6fd 0%, #7dd3fc 100%)'
              : 'linear-gradient(160deg, #e0f2fe 0%, #bae6fd 100%)',
          transition: 'background 0.3s ease',
        }}
        onMouseEnter={() => setHovered('it')}
        onMouseLeave={() => setHovered(null)}
      >
        <div
          className="absolute inset-0 flex flex-col items-center justify-center rounded-lg group-focus-visible:ring-2 group-focus-visible:ring-sky-700 group-focus-visible:ring-inset"
          style={{
            paddingLeft: '8%',
            transform: hovered === 'it' ? 'scale(1.02)' : 'scale(1)',
            transformOrigin: 'right center',
            transition: 'transform 0.3s ease',
          }}
        >
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
