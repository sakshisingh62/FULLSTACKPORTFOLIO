import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const butterflyRef = useRef(null)
  const rigRef = useRef(null)
  const leftWingRef = useRef(null)
  const rightWingRef = useRef(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return undefined

    const butterfly = butterflyRef.current
    const rig = rigRef.current
    const leftWing = leftWingRef.current
    const rightWing = rightWingRef.current
    if (!butterfly || !rig || !leftWing || !rightWing) return undefined

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let mouseX = -120
    let mouseY = -120
    let currentX = mouseX
    let currentY = mouseY
    let currentAngle = 0
    let bankRoll = 0
    let time = 0
    let flapPhase = 0
    let wingAngle = 18
    let previousTime = performance.now()
    let frameId

    const lerp = (start, end, factor) => start + (end - start) * factor

    const handleMouseMove = (event) => {
      mouseX = event.clientX
      mouseY = event.clientY
      butterfly.style.opacity = '1'
    }

    const handleMouseLeave = () => {
      butterfly.style.opacity = '0'
    }

    const animate = (now) => {
      const frameScale = Math.min((now - previousTime) / 16.67, 2)
      previousTime = now
      time += 0.02 * frameScale

      const driftX = Math.sin(time * 1.8) * 8 + Math.cos(time * 0.9) * 4
      const driftY = Math.cos(time * 1.5) * 7 + Math.sin(time * 1.1) * 4
      const targetX = mouseX + 30 + driftX
      const targetY = mouseY - 28 + driftY
      const previousX = currentX
      const previousY = currentY

      currentX = lerp(currentX, targetX, 0.07 * frameScale)
      currentY = lerp(currentY, targetY, 0.07 * frameScale)

      const velocityX = currentX - previousX
      const velocityY = currentY - previousY
      const speed = Math.hypot(velocityX, velocityY)
      const flapping = !reduceMotion && (speed > 0.7 || Math.sin(time * 2.8) > 0.2)

      if (flapping) {
        flapPhase += Math.max(0.18, Math.min(0.36, speed * 0.04 + 0.18)) * frameScale
        wingAngle = 28 + Math.sin(flapPhase) * 45
      } else {
        wingAngle = lerp(wingAngle, 18 + Math.sin(time * 3) * (reduceMotion ? 0 : 4), 0.08 * frameScale)
      }

      leftWing.style.transform = `rotateY(${wingAngle}deg) rotateZ(${-wingAngle * 0.15}deg)`
      rightWing.style.transform = `rotateY(${-wingAngle}deg) rotateZ(${wingAngle * 0.15}deg)`

      if (speed > 0.3) {
        const targetAngle = (Math.atan2(velocityY, velocityX) * 180) / Math.PI + 90
        let angleDifference = (targetAngle - currentAngle) % 360
        if (angleDifference > 180) angleDifference -= 360
        if (angleDifference < -180) angleDifference += 360

        currentAngle += angleDifference * 0.06 * frameScale
        bankRoll = lerp(bankRoll, Math.max(-25, Math.min(25, angleDifference * 1.2)), 0.08 * frameScale)
      } else {
        bankRoll = lerp(bankRoll, 0, 0.05 * frameScale)
      }

      const lift = reduceMotion ? 0 : Math.cos(flapPhase) * (flapping ? 3.5 : 0.8)
      butterfly.style.transform = `translate3d(${currentX - 38}px, ${currentY - 38 + lift}px, 0) rotate(${currentAngle}deg)`
      rig.style.transform = `rotateY(${bankRoll}deg)`
      frameId = window.requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    frameId = window.requestAnimationFrame(animate)

    return () => {
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div ref={butterflyRef} className="custom-cursor" aria-hidden="true">
      <div ref={rigRef} className="butterfly-rig">
        <div ref={leftWingRef} className="wing-side wing-side--left">
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
            <path d="M63 56C52 32 16 10 3 1c-5 23 3 47 19 61C2 72 8 106 29 112c19 2 32-24 34-56Z" fill="url(#morphoGradL)" />
            <path d="M63 56Q38 28 8 9M63 56Q32 40 18 56M63 56Q32 72 26 104M42 33Q24 22 12 28M45 74Q30 84 25 90" fill="none" stroke="rgba(0, 0, 0, 0.55)" strokeLinecap="round" strokeWidth="1.2" />
            <circle cx="8" cy="18" r="1.3" fill="#fff" opacity="0.9" />
            <circle cx="15" cy="42" r="1.3" fill="#fff" opacity="0.9" />
            <circle cx="26" cy="88" r="1.3" fill="#fff" opacity="0.9" />
          </svg>
        </div>

        <div className="butterfly-body" />

        <div ref={rightWingRef} className="wing-side wing-side--right">
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
            <path d="M2 56C13 32 49 10 62 1c5 23-3 47-19 61 20 10 14 44-7 50-19 2-32-24-34-56Z" fill="url(#morphoGradR)" />
            <path d="M2 56Q27 28 57 9M2 56Q33 40 47 56M2 56Q33 72 39 104M23 33Q41 22 53 28M20 74Q35 84 40 90" fill="none" stroke="rgba(0, 0, 0, 0.55)" strokeLinecap="round" strokeWidth="1.2" />
            <circle cx="57" cy="18" r="1.3" fill="#fff" opacity="0.9" />
            <circle cx="50" cy="42" r="1.3" fill="#fff" opacity="0.9" />
            <circle cx="39" cy="88" r="1.3" fill="#fff" opacity="0.9" />
          </svg>
        </div>
      </div>
    </div>
  )
}
