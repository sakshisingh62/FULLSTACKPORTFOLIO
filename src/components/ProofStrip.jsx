import React from 'react'

export default function ProofStrip() {
  const proofs = [
    {
      label: 'FRONTEND EXPERIENCE',
      value: 'Neximprove · 6 months',
    },
    {
      label: 'FULL-STACK EXPERIENCE',
      value: 'Neximprove · 2 months present',
    },
    {
      label: 'COMMUNITY EXPERIENCE',
      value: 'Navgurukul Jury Member',
    },
    {
      label: 'FEATURED PROJECT',
      value: 'Neighbourhood Helper',
    },
  ]

  return (
    <div className="proof-strip">
      <div className="container">
        <div className="proof-grid">
          {proofs.map((item, idx) => (
            <div key={idx} className="proof-item">
              <span className="proof-tag">{item.label}</span>
              <div className="proof-val">{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
