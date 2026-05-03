import { useEffect, useRef } from 'react'

export function StarCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let W = canvas.width
    let H = canvas.height

    const resize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
      makeBgStars()
    }

    // Background starfield
    const bgStars: Array<{
      x: number
      y: number
      r: number
      baseAlpha: number
      twinkleSpeed: number
      twinkleOffset: number
    }> = []

    const makeBgStars = () => {
      bgStars.length = 0
      const count = Math.floor((W * H) / 6000)
      for (let i = 0; i < count; i++) {
        bgStars.push({
          x: Math.random() * W,
          y: Math.random() * H,
          r: Math.random() < 0.85 ? Math.random() * 0.8 + 0.2 : Math.random() * 1.5 + 0.8,
          baseAlpha: Math.random() * 0.35 + 0.08,
          twinkleSpeed: Math.random() * 0.008 + 0.002,
          twinkleOffset: Math.random() * Math.PI * 2,
        })
      }
    }

    // Trail particles
    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      r: number
      life: number
      decay: number
      twinkle: number
    }> = []

    let mouseX = -999
    let mouseY = -999
    let prevX = -999
    let prevY = -999
    let frame = 0
    let spawnTimer = 0

    const spawnParticle = (x: number, y: number) => {
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * 0.9
      const speed = Math.random() * 0.4 + 0.1
      const size = Math.random() * 1.6 + 0.4

      particles.push({
        x: x + (Math.random() - 0.5) * 6,
        y: y + (Math.random() - 0.5) * 6,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        r: size,
        life: 1,
        decay: Math.random() * 0.008 + 0.004,
        twinkle: Math.random() * Math.PI * 2,
      })
    }

    const drawStarDot = (x: number, y: number, r: number, alpha: number) => {
      ctx.save()
      ctx.globalAlpha = alpha

      // Glow halo
      const g = ctx.createRadialGradient(x, y, 0, x, y, r * 5)
      g.addColorStop(0, `rgba(200,215,255,${(alpha * 0.6).toFixed(3)})`)
      g.addColorStop(0.3, `rgba(200,215,255,${(alpha * 0.15).toFixed(3)})`)
      g.addColorStop(1, 'rgba(200,215,255,0)')
      ctx.fillStyle = g
      ctx.beginPath()
      ctx.arc(x, y, r * 5, 0, Math.PI * 2)
      ctx.fill()

      // Core dot
      ctx.beginPath()
      ctx.arc(x, y, r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(240,245,255,${alpha.toFixed(3)})`
      ctx.fill()

      // Diffraction spikes
      if (r > 1.1) {
        const spikeLen = r * 5
        ctx.strokeStyle = `rgba(200,215,255,${(alpha * 0.35).toFixed(3)})`
        ctx.lineWidth = 0.5
        ctx.beginPath()
        ctx.moveTo(x - spikeLen, y)
        ctx.lineTo(x + spikeLen, y)
        ctx.moveTo(x, y - spikeLen)
        ctx.lineTo(x, y + spikeLen)
        ctx.stroke()
      }

      ctx.restore()
    }

    const drawCursor = (x: number, y: number) => {
      if (x < 0) return
      const pulse = 1 + Math.sin(frame * 0.05) * 0.1
      const arm = 14 * pulse
      const width = 2.5 * pulse

      ctx.save()

      // Soft outer glow
      const g = ctx.createRadialGradient(x, y, 0, x, y, arm * 1.8)
      g.addColorStop(0, 'rgba(200,215,255,0.22)')
      g.addColorStop(1, 'rgba(200,215,255,0)')
      ctx.fillStyle = g
      ctx.beginPath()
      ctx.arc(x, y, arm * 1.8, 0, Math.PI * 2)
      ctx.fill()

      // 4-pointed star path
      ctx.beginPath()
      ctx.moveTo(x, y - arm)
      ctx.lineTo(x + width, y - width)
      ctx.lineTo(x + arm, y)
      ctx.lineTo(x + width, y + width)
      ctx.lineTo(x, y + arm)
      ctx.lineTo(x - width, y + width)
      ctx.lineTo(x - arm, y)
      ctx.lineTo(x - width, y - width)
      ctx.closePath()

      // Fill with bright white
      ctx.fillStyle = 'rgba(240,248,255,0.95)'
      ctx.fill()

      // Subtle inner highlight core
      ctx.beginPath()
      ctx.arc(x, y, 2.2 * pulse, 0, Math.PI * 2)
      ctx.fillStyle = '#ffffff'
      ctx.fill()

      ctx.restore()
    }

    const loop = () => {
      frame++

      // Very gentle fade
      ctx.fillStyle = 'rgba(3, 3, 14, 0.08)'
      ctx.fillRect(0, 0, W, H)

      // Background stars
      const t = frame * 0.012
      for (const s of bgStars) {
        const a = s.baseAlpha * (0.6 + 0.4 * Math.sin(t / s.twinkleSpeed + s.twinkleOffset))
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(220,230,255,${a.toFixed(3)})`
        ctx.fill()
      }

      // Trail particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.life -= p.decay
        p.twinkle += 0.06

        if (p.life <= 0) {
          particles.splice(i, 1)
          continue
        }

        const alpha = p.life * p.life
        const r = p.r * (0.5 + p.life * 0.5)
        drawStarDot(p.x, p.y, r, alpha)
      }

      // Spawn
      if (mouseX > 0) {
        spawnTimer++
        const dx = mouseX - prevX
        const dy = mouseY - prevY
        const dist = Math.hypot(dx, dy)

        if (dist > 3) {
          const count = dist > 20 ? 5 : dist > 10 ? 3 : 2
          for (let s = 0; s < count; s++) spawnParticle(mouseX, mouseY)
          spawnTimer = 0
        } else if (spawnTimer > 2) {
          spawnParticle(mouseX, mouseY)
          spawnTimer = 0
        }
      }

      prevX = mouseX
      prevY = mouseY

      drawCursor(mouseX, mouseY)
      requestAnimationFrame(loop)
    }

    resize()
    loop()

    const handleResize = () => resize()
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }
    const handleMouseLeave = () => {
      mouseX = -999
      mouseY = -999
      prevX = -999
      prevY = -999
    }

    window.addEventListener('resize', handleResize)
    document.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ cursor: 'none' }}
    />
  )
}
