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

  /* ─── canvas resize ───────────────────────────────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      const idx = currentFrameRef.current
      if (idx >= 0) drawFrameIdx(idx)
    }

    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /* ─── draw ────────────────────────────────────────────────────── */
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

  /* ─── preload ─────────────────────────────────────────────────── */
  useEffect(() => {
    const images: HTMLImageElement[] = new Array(FRAME_COUNT)
    let count = 0

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image()
      img.src = frameSrc(i + 1)
      img.onload = () => {
        count++
        setLoadedCount(count)
        if (i === 0 && currentFrameRef.current < 0) {
          currentFrameRef.current = 0
          drawFrameIdx(0)
        }
      }
      images[i] = img
    }

    framesRef.current = images
    return () => { for (const img of images) img.onload = null }
  }, [drawFrameIdx])

  /* ─── scroll ──────────────────────────────────────────────────── */
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

  /* ─── re-draw on full load ────────────────────────────────────── */
  useEffect(() => {
    if (isReady && currentFrameRef.current >= 0) drawFrameIdx(currentFrameRef.current)
  }, [isReady, drawFrameIdx])

  // Text fades/rises in first 25% of scroll — only opacity + transform (no colors)
  const textOpacity = Math.max(0, 1 - scrollProgress * 4)
  const textY = scrollProgress * -80

  return (
    <section ref={sectionRef} style={{ height: '400vh', position: 'relative' }}>
      <div
        className="sticky top-0 h-screen overflow-hidden bg-[#0d0d0d]"
        style={{ position: 'sticky' }}
      >
        {/* Frame canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 block" />

        {/* Loading overlay — only shown until all frames ready */}
        {!isReady && (
          <div className="absolute inset-0 bg-[#0d0d0d] flex flex-col items-center justify-center gap-5 z-20">
            <p className="text-white/30 text-[0.65rem] tracking-[0.25em] uppercase font-sans">
              Loading
            </p>
            <div className="w-44 h-[1.5px] bg-white/[0.08] rounded-sm">
              <div
                className="h-full bg-sky-400 rounded-sm transition-[width] duration-150 ease-linear"
                style={{ width: `${loadPct * 100}%` }}
              />
            </div>
            <p className="text-white/20 text-[0.6rem] tracking-[0.1em] font-sans">
              {Math.round(loadPct * 100)}%
            </p>
          </div>
        )}

        {/* Bottom gradient vignette */}
        <div
          className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0a0a0a]/85 via-[#0a0a0a]/30 to-transparent"
          aria-hidden="true"
        />

        {/* Hero text overlay — fades out as user scrolls */}
        <div
          className="absolute inset-0 flex flex-col justify-end p-[clamp(2rem,4vw,4rem)] pb-[clamp(3rem,6vw,5rem)]"
          style={{
            opacity: textOpacity,
            transform: `translateY(${textY}px)`,
            pointerEvents: scrollProgress > 0.1 ? 'none' : 'auto',
          }}
        >
          <p className="text-sky-400 text-[0.65rem] font-bold tracking-[0.3em] uppercase mb-3.5">
            Aerial Services
          </p>

          <h1
            className="text-white font-black leading-none mb-6 tracking-[-0.02em] drone-h1-shadow"
            style={{ fontSize: 'clamp(2.75rem, 9vw, 5.5rem)' }}
          >
            Professional
            <br />
            Drone
            <br />
            <span className="text-sky-400">Photography</span>
          </h1>

          <p
            className="text-white/55 mb-9 max-w-[400px] leading-relaxed"
            style={{ fontSize: 'clamp(0.875rem, 1.5vw, 1.05rem)' }}
          >
            Cinematic aerial imagery for real estate, events&nbsp;&amp;&nbsp;architecture.
          </p>

          <div className="flex gap-5 items-center flex-wrap">
            <a
              href="#services"
              className="px-7 py-3 bg-sky-400 text-[#0a0a0a] rounded-full text-sm font-bold tracking-[0.01em] no-underline pointer-events-auto"
              style={{ pointerEvents: 'auto' }}
            >
              View Services
            </a>
            <span className="text-white/35 text-[0.7rem] tracking-[0.2em] uppercase">
              ✈ DOC Certified Pilot
            </span>
          </div>
        </div>

        {/* Scroll hint */}
        <div
          className="absolute bottom-9 right-[clamp(1.5rem,3vw,3rem)] flex flex-col items-center gap-2 pointer-events-none transition-opacity duration-300"
          style={{ opacity: scrollProgress < 0.04 ? 1 : 0 }}
          aria-hidden="true"
        >
          <span
            className="text-white/30 text-[0.6rem] tracking-[0.25em] uppercase"
            style={{ writingMode: 'vertical-rl' }}
          >
            Scroll
          </span>
          <div className="w-px h-12 bg-white/15 rounded-sm overflow-hidden relative">
            <div className="drone-scroll-line" />
          </div>
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/[0.04]" aria-hidden="true">
          <div
            className="h-full bg-sky-400/50 transition-[width] duration-[50ms] ease-linear"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
      </div>
    </section>
  )
}
