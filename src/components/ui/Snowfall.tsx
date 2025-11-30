import { useEffect, useRef } from "react"

type SnowfallProps = {
  // Overall density multiplier; 1 = balanced for 1080p
  density?: number
  // Fall speed multiplier; 1 = gentle, 0.6-1.4 recommended
  speed?: number
  // Horizontal drift; negative = left, positive = right
  wind?: number
  // Snowflake radius range in CSS pixels
  size?: { min: number; max: number }
  // Alpha for flakes; lower looks softer
  opacity?: number
}

type Flake = {
  x: number
  y: number
  r: number
  vy: number
  vx: number
  wobbleT: number
  wobbleAmp: number
}

export function Snowfall({
  density = 1,
  speed = 1,
  wind = 0,
  size = { min: 1, max: 3 },
  opacity = 0.9,
}: SnowfallProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = 0
    let height = 0
    let dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1))

    const flakes: Flake[] = []

    const rand = (min: number, max: number) => Math.random() * (max - min) + min

    const countForArea = () => {
      // ~140 flakes on 1920x1080 at density=1
      const base = (width * height) / 15000
      return Math.max(30, Math.floor(base * density))
    }

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1))
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = width + "px"
      canvas.style.height = height + "px"
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // Recreate flakes to fit new area
      const target = countForArea()
      flakes.length = 0
      for (let i = 0; i < target; i++) {
        flakes.push(newFlake(true))
      }
    }

    const newFlake = (anywhere = false): Flake => {
      const r = rand(size.min, size.max)
      const y = anywhere ? rand(0, height) : -r * 2
      const vy = rand(20, 45) / 60 // px per frame at 60fps
      const vx = wind + rand(-0.3, 0.3) // subtle horizontal drift
      return {
        x: rand(0, width),
        y,
        r,
        vy: vy * speed,
        vx,
        wobbleT: rand(0, Math.PI * 2),
        wobbleAmp: rand(0.2, 0.8),
      }
    }

    const step = () => {
      ctx.clearRect(0, 0, width, height)
      ctx.globalAlpha = opacity
      ctx.fillStyle = "#ffffff"

      // Draw and update
      for (let i = 0; i < flakes.length; i++) {
        const f = flakes[i]

        // Wobble side-to-side for a soft float
        f.wobbleT += 0.02
        const wobble = Math.sin(f.wobbleT) * f.wobbleAmp

        f.x += f.vx + wobble * 0.2
        f.y += f.vy

        // Wrap horizontally for continuous drift
        if (f.x < -10) f.x = width + 10
        if (f.x > width + 10) f.x = -10

        // If below screen, respawn at top
        if (f.y - f.r > height) {
          flakes[i] = newFlake(false)
        }

        ctx.beginPath()
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2)
        ctx.fill()
      }

      rafRef.current = requestAnimationFrame(step)
    }

    resize()
    window.addEventListener("resize", resize)
    rafRef.current = requestAnimationFrame(step)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      window.removeEventListener("resize", resize)
    }
  }, [density, speed, wind, size.min, size.max, opacity])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0, // above the gradient (same z-index, later in DOM), below content
        pointerEvents: "none",
      }}
      aria-hidden
    />
  )
}

export default Snowfall
