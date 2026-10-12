import React, { useEffect, useState } from 'react'
import { motion as Motion, AnimatePresence } from 'framer-motion'

export default function SignatureIntro({ onComplete }) {
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return true
    const urlParams = new URLSearchParams(window.location.search)
    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches && urlParams.get('skipIntro') !== 'true'
  })
  const [exiting, setExiting] = useState(false)

  const finish = () => {
    if (exiting) return
    setExiting(true)
    window.setTimeout(() => {
      setVisible(false)
      onComplete?.()
    }, 450)
  }

  useEffect(() => {
    if (!visible) {
      onComplete?.()
      return undefined
    }

    const timer = window.setTimeout(() => finish(), 3400)
    return () => window.clearTimeout(timer)
  }, [visible]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!visible) return null

  // Swoop flourish Bezier curve matching reference script:
  // moveTo(420, 580) bezierCurveTo(340, 680, 580, 680, 780, 610) bezierCurveTo(1050, 520, 1420, 540, 1550, 500)
  const swoopPath = "M 420 580 C 340 680 580 680 780 610 C 1050 520 1420 540 1550 500"

  return (
    <AnimatePresence>
      {!exiting && (
        <Motion.div
          className="signature-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.99 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Sakshi signature intro"
        >
          <button className="signature-skip" onClick={finish} aria-label="Skip signature intro">
            Skip <span aria-hidden="true">→</span>
          </button>

          <div className="signature-video-container">
            {/* Ambient Radial Vignette */}
            <div className="signature-vignette" />

            <svg
              className="signature-svg-stage"
              viewBox="0 0 1920 1080"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <filter id="neonBlueGlow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="12" result="blur1" />
                  <feGaussianBlur stdDeviation="3" result="blur2" />
                  <feMerge>
                    <feMergeNode in="blur1" />
                    <feMergeNode in="blur2" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* 1. DEV BY subtext */}
              <text
                x="960"
                y="410"
                className="sig-subtext"
                textAnchor="middle"
                fill="rgba(240, 246, 255, 0.88)"
                fontFamily="'Montserrat', sans-serif"
                fontSize="26px"
                fontWeight="500"
                letterSpacing="14px"
                filter="url(#neonBlueGlow)"
              >
                DEV BY
              </text>

              {/* 2. Signature Name ("Sakshi") */}
              <g filter="url(#neonBlueGlow)">
                {/* Stroke animation reveal */}
                <text
                  x="960"
                  y="550"
                  className="sig-text-stroke"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontFamily="'Alex Brush', cursive"
                  fontSize="180px"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  Sakshi
                </text>

                {/* White body fill-in */}
                <text
                  x="960"
                  y="550"
                  className="sig-text-fill"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontFamily="'Alex Brush', cursive"
                  fontSize="180px"
                  fill="#ffffff"
                >
                  Sakshi
                </text>
              </g>

              {/* 3. Underline Swoop Flourish */}
              <path
                d={swoopPath}
                className="sig-swoop-stroke"
                fill="none"
                stroke="#ffffff"
                strokeWidth="3.5"
                strokeLinecap="round"
                filter="url(#neonBlueGlow)"
              />
            </svg>
          </div>
        </Motion.div>
      )}
    </AnimatePresence>
  )
}
