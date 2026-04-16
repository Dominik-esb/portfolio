'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

const FRAME_COUNT = 240
const frameSrc = (n: number) =>
  `/drone-frames/frame-${String(n).padStart(3, '0')}.jpg`

export default function DroneFrameHero() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const framesRef = useRef<HTMLImageElement[]>([])
  const currentFrameRef = useRef(-1)
  const rafRef = useRef<number>(0)

  const [loadedCount, setLoadedCount] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)

  const isReady = loadedCount >= FRAME_COUNT
  const loadPct = loadedCount / FRAME_COUNT

  /* ─── canvas resize ────────────────────────────────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      // redraw current frame after resize
      const idx = currentFrameRef.current
      if (idx >= 0) drawFrameIdx(idx)
    }

    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /* ─── draw helper ───────────────────────────────────────────────── */
  const drawFrameIdx = useCallback((index: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const img = framesRef.current[index]
    if (!img?.complete || !img.naturalWidth) return

    const cw = canvas.width
    const ch = canvas.height
    const imgAR = img.naturalWidth / img.naturalHeight
    const canvasAR = cw / ch

    // object-fit: cover
    let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight
    if (canvasAR > imgAR) {
      sh = img.naturalWidth / canvasAR
      sy = (img.naturalHeight - sh) / 2
    } else {
      sw = img.naturalHeight * canvasAR
      sx = (img.naturalWidth - sw) / 2
    }

    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch)
  }, [])

  /* ─── preload ───────────────────────────────────────────────────── */
  useEffect(() => {
    const images: HTMLImageElement[] = new Array(FRAME_COUNT)
    let count = 0

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image()
      img.src = frameSrc(i + 1)
      img.onload = () => {
        count++
        setLoadedCount(count)
        // draw first frame as soon as it's ready
        if (i === 0 && currentFrameRef.current < 0) {
          currentFrameRef.current = 0
          drawFrameIdx(0)
        }
      }
      images[i] = img
    }

    framesRef.current = images
    return () => {
      for (const img of images) img.onload = null
    }
  }, [drawFrameIdx])

  /* ─── scroll ────────────────────────────────────────────────────── */
  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current
      if (!section) return

      const rect = section.getBoundingClientRect()
      const scrollable = rect.height - window.innerHeight
      const progress = Math.max(0, Math.min(1, -rect.top / scrollable))

      setScrollProgress(progress)

      const target = Math.min(FRAME_COUNT - 1, Math.floor(progress * FRAME_COUNT))
      if (target !== currentFrameRef.current) {
        currentFrameRef.current = target
        cancelAnimationFrame(rafRef.current)
        rafRef.current = requestAnimationFrame(() => drawFrameIdx(target))
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => {
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(rafRef.current)
    }
  }, [drawFrameIdx])

  /* ─── re-draw last frame once fully loaded ──────────────────────── */
  useEffect(() => {
    if (isReady && currentFrameRef.current >= 0) {
      drawFrameIdx(currentFrameRef.current)
    }
  }, [isReady, drawFrameIdx])

  // Overlay text fades out in first 25% of scroll, translates up
  const textOpacity = Math.max(0, 1 - scrollProgress * 4)
  const textY = scrollProgress * -80

  return (
    <section
      ref={sectionRef}
      style={{ height: '400vh', position: 'relative' }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          background: '#0d0d0d',
        }}
      >
        {/* Frame canvas */}
        <canvas
          ref={canvasRef}
          style={{ position: 'absolute', inset: 0, display: 'block' }}
        />

        {/* Loading overlay */}
        {!isReady && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: '#0d0d0d',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1.25rem',
              zIndex: 20,
            }}
          >
            <p
              style={{
                color: 'rgba(255,255,255,0.3)',
                fontSize: '0.65rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-inter, sans-serif)',
              }}
            >
              Loading
            </p>
            <div
              style={{
                width: 180,
                height: 1.5,
                background: 'rgba(255,255,255,0.08)',
                borderRadius: 2,
              }}
            >
              <div
                style={{
                  height: '100%',
                  background: '#38bdf8',
                  borderRadius: 2,
                  width: `${loadPct * 100}%`,
                  transition: 'width 0.15s linear',
                }}
              />
            </div>
            <p
              style={{
                color: 'rgba(255,255,255,0.2)',
                fontSize: '0.6rem',
                letterSpacing: '0.1em',
                fontFamily: 'var(--font-inter, sans-serif)',
              }}
            >
              {Math.round(loadPct * 100)}%
            </p>
          </div>
        )}

        {/* Bottom gradient + hero text */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to top, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.3) 45%, transparent 70%)',
            pointerEvents: 'none',
          }}
          aria-hidden="true"
        />

        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: 'clamp(2rem, 4vw, 4rem)',
            paddingBottom: 'clamp(3rem, 6vw, 5rem)',
            opacity: textOpacity,
            transform: `translateY(${textY}px)`,
            pointerEvents: scrollProgress > 0.1 ? 'none' : 'auto',
          }}
        >
          <p
            style={{
              color: '#38bdf8',
              fontSize: '0.65rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              marginBottom: '0.875rem',
              fontFamily: 'var(--font-inter, sans-serif)',
              fontWeight: 700,
            }}
          >
            Aerial Services
          </p>

          <h1
            style={{
              color: '#fff',
              fontSize: 'clamp(2.75rem, 9vw, 5.5rem)',
              fontWeight: 900,
              lineHeight: 1.0,
              marginBottom: '1.5rem',
              fontFamily: 'var(--font-inter, sans-serif)',
              textShadow: '0 2px 32px rgba(0,0,0,0.6)',
              letterSpacing: '-0.02em',
            }}
          >
            Professional
            <br />
            Drone
            <br />
            <span style={{ color: '#38bdf8' }}>Photography</span>
          </h1>

          <p
            style={{
              color: 'rgba(255,255,255,0.55)',
              fontSize: 'clamp(0.875rem, 1.5vw, 1.05rem)',
              marginBottom: '2.25rem',
              maxWidth: '400px',
              lineHeight: 1.6,
              fontFamily: 'var(--font-inter, sans-serif)',
            }}
          >
            Cinematic aerial imagery for real estate,
            events&nbsp;&amp;&nbsp;architecture.
          </p>

          <div
            style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', flexWrap: 'wrap' }}
          >
            <a
              href="#services"
              style={{
                padding: '0.75rem 1.875rem',
                background: '#38bdf8',
                color: '#0a0a0a',
                borderRadius: '100px',
                fontSize: '0.875rem',
                fontWeight: 700,
                textDecoration: 'none',
                pointerEvents: 'auto',
                letterSpacing: '0.01em',
                fontFamily: 'var(--font-inter, sans-serif)',
              }}
            >
              View Services
            </a>
            <span
              style={{
                color: 'rgba(255,255,255,0.35)',
                fontSize: '0.7rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-inter, sans-serif)',
              }}
            >
              ✈ DOC Certified Pilot
            </span>
          </div>
        </div>

        {/* Scroll hint */}
        <div
          style={{
            position: 'absolute',
            bottom: '2.25rem',
            right: 'clamp(1.5rem, 3vw, 3rem)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
            opacity: scrollProgress < 0.04 ? 1 : 0,
            transition: 'opacity 0.4s',
            pointerEvents: 'none',
          }}
          aria-hidden="true"
        >
          <span
            style={{
              color: 'rgba(255,255,255,0.3)',
              fontSize: '0.6rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-inter, sans-serif)',
              writingMode: 'vertical-rl',
            }}
          >
            Scroll
          </span>
          <div
            style={{
              width: 1,
              height: 48,
              background: 'rgba(255,255,255,0.15)',
              borderRadius: 1,
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <div className="drone-scroll-line" />
          </div>
        </div>

        {/* Progress bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 2,
            background: 'rgba(255,255,255,0.04)',
          }}
          aria-hidden="true"
        >
          <div
            style={{
              height: '100%',
              background: 'rgba(56,189,248,0.5)',
              width: `${scrollProgress * 100}%`,
              transition: 'width 0.05s linear',
            }}
          />
        </div>
      </div>
    </section>
  )
}
