import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const butterflyRef = useRef(null)
  const rigRef = useRef(null)
  const wingLRef = useRef(null)
  const wingRRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    const butterfly = butterflyRef.current
    const rig = rigRef.current
    const wingL = wingLRef.current
    const wingR = wingRRef.current
    const canvas = canvasRef.current

    if (!butterfly || !rig || !wingL || !wingR || !canvas) return undefined

    // Canvas particle engine
    const ctx = canvas.getContext('2d')
    if (!ctx) return undefined

    function resizeCanvas() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let currentX = mouseX
    let currentY = mouseY
    let currentAngle = 0
    let bankRoll = 0

    let time = 0
    let flapPhase = 0
    let wingAngle = 20
    let animationFrameId

    const handleMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }
    window.addEventListener('mousemove', handleMouseMove)

    function lerp(start, end, factor) {
      return start + (end - start) * factor
    }

    // Particle Array
    const particles = []
    const colors = [
      'rgba(165, 243, 252, ', // Ice cyan
      'rgba(56, 189, 248, ',  // Electric sky
      'rgba(14, 165, 233, ',  // Vivid azure
      'rgba(255, 255, 255, '  // Bright white sparkle
    ]

    function spawnParticle(x, y, speed) {
      // Disperse slightly along wing breadth
      const spread = (Math.random() - 0.5) * 22
      particles.push({
        x: x + spread,
        y: y + (Math.random() - 0.5) * 14,
        vx: (Math.random() - 0.5) * 0.8,
        vy: 0.4 + Math.random() * 0.9, // Gentle downward drift
        size: Math.random() * 2.4 + 1.2,
        life: 1.0,
        decay: Math.random() * 0.015 + 0.012, // Lasts ~1 to 1.5 seconds
        colorPrefix: colors[Math.floor(Math.random() * colors.length)],
        twinkleSpeed: Math.random() * 0.2 + 0.1
      })
    }

    function updateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.life -= p.decay

        if (p.life <= 0) {
          particles.splice(i, 1)
          continue
        }

        // Shimmer opacity
        const twinkle = Math.sin(p.life * 25 * p.twinkleSpeed)
        const alpha = Math.max(0, p.life * (0.7 + twinkle * 0.3))

        // Draw glowing particle
        ctx.save()
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2)
        ctx.fillStyle = p.colorPrefix + alpha + ')'
        ctx.shadowBlur = 8
        ctx.shadowColor = '#38bdf8'
        ctx.fill()
        ctx.restore()
      }
    }

    function animate() {
      time += 0.02

      // 1. Organic drifting float
      const driftX = Math.sin(time * 1.8) * 12 + Math.cos(time * 0.9) * 6
      const driftY = Math.cos(time * 1.5) * 10 + Math.sin(time * 1.1) * 5

      const targetX = mouseX + driftX
      const targetY = mouseY + driftY

      const prevX = currentX
      const prevY = currentY
      currentX = lerp(currentX, targetX, 0.045)
      currentY = lerp(currentY, targetY, 0.045)

      const vx = currentX - prevX
      const vy = currentY - prevY
      const speed = Math.hypot(vx, vy)

      // 2. Flap & Glide
      const pulseCycle = Math.sin(time * 2.8)
      const isActivelyFlapping = speed > 0.8 || pulseCycle > 0.2

      if (isActivelyFlapping) {
        flapPhase += Math.max(0.18, Math.min(0.36, speed * 0.04 + 0.18))
        wingAngle = 28 + Math.sin(flapPhase) * 45
      } else {
        wingAngle = lerp(wingAngle, 18 + Math.sin(time * 3) * 5, 0.08)
      }

      wingL.style.transform = `rotateY(${wingAngle}deg) rotateZ(${-wingAngle * 0.15}deg)`
      wingR.style.transform = `rotateY(${-wingAngle}deg) rotateZ(${wingAngle * 0.15}deg)`

      // 3. Spawning Fairy Dust Trail
      // Emits 1-2 dust particles per frame while gliding, ramps up when actively flying/turning
      const spawnCount = isActivelyFlapping ? (speed > 1.8 ? 3 : 2) : 1
      for (let i = 0; i < spawnCount; i++) {
        spawnParticle(currentX, currentY, speed)
      }

      // 4. Inertial rotation
      if (speed > 0.35) {
        const targetAngle = (Math.atan2(vy, vx) * 180) / Math.PI + 90

        let angleDiff = (targetAngle - currentAngle) % 360
        if (angleDiff > 180) angleDiff -= 360
        if (angleDiff < -180) angleDiff += 360

        currentAngle += angleDiff * 0.06
        const targetBank = Math.max(-25, Math.min(25, angleDiff * 1.2))
        bankRoll = lerp(bankRoll, targetBank, 0.08)
      } else {
        bankRoll = lerp(bankRoll, 0, 0.05)
      }

      const lift = Math.cos(flapPhase) * (isActivelyFlapping ? 3.5 : 0.8)

      butterfly.style.transform = `translate3d(${currentX - 38}px, ${currentY - 38 + lift}px, 0) rotate(${currentAngle}deg)`
      rig.style.transform = `rotateY(${bankRoll}deg)`

      updateParticles()
      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      window.cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <>
      {/* Particle Canvas */}
      <canvas id="trail-canvas" ref={canvasRef} />

      {/* Butterfly */}
      <div className="butterfly-container custom-cursor" id="butterfly" ref={butterflyRef} aria-hidden="true">
        <div className="butterfly-rig" id="rig" ref={rigRef}>
          {/* Left Wing */}
          <div className="wing-side left" id="wingL" ref={wingLRef}>
            <svg className="wing-svg" viewBox="0 0 65 115" preserveAspectRatio="none">
              <defs>
                <radialGradient id="morphoGradL" cx="88%" cy="46%" r="85%">
                  <stop offset="0%" stopColor="#70d6ff" />
                  <stop offset="22%" stopColor="#0080ff" />
                  <stop offset="58%" stopColor="#0038b8" />
                  <stop offset="84%" stopColor="#001140" />
                  <stop offset="100%" stopColor="#02040a" />
                </radialGradient>
              </defs>
              <path
                d="M 63 56 C 52 32, 16 10, 3 1 C -2 24, 6 48, 22 62 C 2 72, 8 106, 29 112 C 48 114, 61 88, 63 56 Z"
                fill="url(#morphoGradL)"
              />
              <path
                d="M 63 56 Q 38 28 8 9 M 63 56 Q 32 40 18 56 M 63 56 Q 32 72 26 104 M 42 33 Q 24 22 12 28 M 45 74 Q 30 84 25 90"
                stroke="rgba(0, 0, 0, 0.55)"
                strokeWidth="1.2"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="8" cy="18" r="1.3" fill="#ffffff" opacity="0.9" />
              <circle cx="15" cy="42" r="1.3" fill="#ffffff" opacity="0.9" />
              <circle cx="26" cy="88" r="1.3" fill="#ffffff" opacity="0.9" />
              <circle cx="36" cy="106" r="1.1" fill="#ffffff" opacity="0.8" />
            </svg>
          </div>

          <div className="butterfly-body" />

          {/* Right Wing */}
          <div className="wing-side right" id="wingR" ref={wingRRef}>
            <svg className="wing-svg" viewBox="0 0 65 115" preserveAspectRatio="none">
              <defs>
                <radialGradient id="morphoGradR" cx="12%" cy="46%" r="85%">
                  <stop offset="0%" stopColor="#70d6ff" />
                  <stop offset="22%" stopColor="#0080ff" />
                  <stop offset="58%" stopColor="#0038b8" />
                  <stop offset="84%" stopColor="#001140" />
                  <stop offset="100%" stopColor="#02040a" />
                </radialGradient>
              </defs>
              <path
                d="M 2 56 C 13 32, 49 10, 62 1 C 67 24, 59 48, 43 62 C 63 72, 57 106, 36 112 C 17 114, 4 88, 2 56 Z"
                fill="url(#morphoGradR)"
              />
              <path
                d="M 2 56 Q 27 28 57 9 M 2 56 Q 33 40 47 56 M 2 56 Q 33 72 39 104 M 23 33 Q 41 22 53 28 M 20 74 Q 35 84 40 90"
                stroke="rgba(0, 0, 0, 0.55)"
                strokeWidth="1.2"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="57" cy="18" r="1.3" fill="#ffffff" opacity="0.9" />
              <circle cx="50" cy="42" r="1.3" fill="#ffffff" opacity="0.9" />
              <circle cx="39" cy="88" r="1.3" fill="#ffffff" opacity="0.9" />
              <circle cx="29" cy="106" r="1.1" fill="#ffffff" opacity="0.8" />
            </svg>
          </div>
        </div>
      </div>
    </>
  )
}
