import React, { useState, useEffect, useMemo } from 'react'
import { FiGithub, FiGitCommit, FiStar, FiGitPullRequest, FiCode, FiExternalLink, FiActivity, FiCalendar } from 'react-icons/fi'
import { useStore } from '../store/useStore'
import fallbackContributions from '../data/githubContributions.json'
import fallbackProfile from '../data/githubProfile.json'

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export default function GitHubActivity({ username = 'sakshisingh62' }) {
  const { darkMode } = useStore()
  const [profile, setProfile] = useState(fallbackProfile)
  const [repos, setRepos] = useState([])
  const [events, setEvents] = useState([])
  const [daysData, setDaysData] = useState(fallbackContributions.days)
  const [totalContribs, setTotalContribs] = useState(fallbackContributions.totalContributions)
  const [mergedPRsCount, setMergedPRsCount] = useState(fallbackProfile.merged_prs)
  const [viewMode, setViewMode] = useState('ecg') // 'ecg' | 'heatmap'
  const [timeRange, setTimeRange] = useState('90') // '30' | '90' | '365'
  const [hoverIndex, setHoverIndex] = useState(null)

  useEffect(() => {
    let isMounted = true

    async function fetchGitHubData() {
      try {
        const [userRes, reposRes, eventsRes, prsRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`).catch(() => null),
          fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`).catch(() => null),
          fetch(`https://api.github.com/users/${username}/events/public?per_page=30`).catch(() => null),
          fetch(`https://api.github.com/search/issues?q=author:${username}+type:pr+is:merged`).catch(() => null),
        ])

        const userData = userRes && userRes.ok ? await userRes.json() : null
        const reposData = reposRes && reposRes.ok ? await reposRes.json() : []
        const eventsData = eventsRes && eventsRes.ok ? await eventsRes.json() : []
        const prsData = prsRes && prsRes.ok ? await prsRes.json() : null

        try {
          const cRes = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}`)
          if (cRes.ok) {
            const cJson = await cRes.json()
            if (cJson && cJson.contributions && cJson.contributions.length > 0) {
              const today = new Date().toISOString().slice(0, 10)
              const sorted = [...cJson.contributions]
                .filter((day) => day.date <= today)
                .sort((a, b) => new Date(a.date) - new Date(b.date))
              const pastYear = sorted.slice(-367)
              if (isMounted) {
                setDaysData(pastYear)
                const sum = pastYear.reduce((acc, curr) => acc + (curr.count || 0), 0)
                setTotalContribs(sum)
              }
            }
          }
        } catch {
          // Graceful fallback to pre-fetched dataset
        }

        if (isMounted) {
          if (userData) setProfile({ ...fallbackProfile, ...userData })
          if (Array.isArray(reposData) && reposData.length > 0) setRepos(reposData)
          if (Array.isArray(eventsData) && eventsData.length > 0) setEvents(eventsData)
          if (prsData && typeof prsData.total_count === 'number') {
            setMergedPRsCount(prsData.total_count)
          }
        }
      } catch (err) {
        console.error('Error fetching GitHub data:', err)
      }
    }

    fetchGitHubData()
    return () => { isMounted = false }
  }, [username])

  const calculatedStars = useMemo(() => {
    return repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0)
  }, [repos])

  const publicReposCount = profile?.public_repos ?? repos.length
  const displayStars = calculatedStars || profile?.totalStars || 0

  const filteredDaysData = useMemo(() => {
    if (!daysData || daysData.length === 0) return []
    const limit = parseInt(timeRange, 10)
    return daysData.slice(-limit)
  }, [daysData, timeRange])

  const topActiveProjects = useMemo(() => {
    const defaultRepos = [
      { name: 'sakshisingh62/sakshi-singh', type: 'Push', date: 'Active' },
      { name: 'sakshisingh62/my-portfolio', type: 'Push', date: 'Active' },
      { name: 'sakshisingh62/project1', type: 'Push', date: 'Active' },
      { name: 'sakshisingh62/ecommerece-site', type: 'Push', date: 'Active' },
    ]

    const seenNames = new Set()
    const list = []

    if (Array.isArray(events) && events.length > 0) {
      for (const evt of events) {
        const repoName = evt.repo?.name
        if (repoName && !seenNames.has(repoName)) {
          seenNames.add(repoName)
          list.push({
            name: repoName,
            type: evt.type?.replace('Event', '') || 'Push',
            date: evt.created_at ? new Date(evt.created_at).toLocaleDateString() : 'Active',
          })
          if (list.length >= 4) break
        }
      }
    }

    if (list.length < 4 && Array.isArray(repos) && repos.length > 0) {
      for (const repo of repos) {
        const repoFullName = repo.full_name || `${username}/${repo.name}`
        if (repoFullName && !seenNames.has(repoFullName)) {
          seenNames.add(repoFullName)
          list.push({
            name: repoFullName,
            type: 'Push',
            date: repo.updated_at ? new Date(repo.updated_at).toLocaleDateString() : 'Active',
          })
          if (list.length >= 4) break
        }
      }
    }

    if (list.length < 4) {
      for (const def of defaultRepos) {
        if (!seenNames.has(def.name)) {
          seenNames.add(def.name)
          list.push(def)
          if (list.length >= 4) break
        }
      }
    }

    return list.slice(0, 4)
  }, [events, repos, username])

  const weeks = useMemo(() => {
    const w = []
    let currentWeek = []
    daysData.forEach((day, index) => {
      currentWeek.push(day)
      if (currentWeek.length === 7 || index === daysData.length - 1) {
        w.push(currentWeek)
        currentWeek = []
      }
    })
    return w
  }, [daysData])

  const monthLabels = useMemo(() => {
    const labels = []
    let lastMonth = -1
    let lastWeekIdx = -4
    weeks.forEach((week, wIdx) => {
      if (week.length > 0 && week[0].date) {
        const parts = week[0].date.split('-')
        const m = parseInt(parts[1], 10) - 1
        if (m !== lastMonth) {
          if (wIdx - lastWeekIdx >= 3) {
            labels.push({ month: MONTH_NAMES[m], weekIndex: wIdx })
            lastWeekIdx = wIdx
          }
          lastMonth = m
        }
      }
    })
    return labels
  }, [weeks])

  const waveformPoints = useMemo(() => {
    if (!filteredDaysData || filteredDaysData.length === 0) return { path: '', area: '', points: [] }

    const svgWidth = 940
    const baselineY = 140
    const paddingX = 30
    const availableWidth = svgWidth - paddingX * 2
    const N = filteredDaysData.length

    const maxCount = Math.max(1, ...filteredDaysData.map(d => d.count || 0))

    const rawPoints = filteredDaysData.map((d, i) => {
      const x = paddingX + (i / (N - 1 || 1)) * availableWidth
      const count = d.count || 0
      let y = baselineY
      if (count > 0) {
        const ratio = count / maxCount
        y = baselineY - (ratio * 95 + 10)
      }
      return { x, y, date: d.date, count }
    })

    if (rawPoints.length === 1) {
      return {
        path: `M ${paddingX} ${baselineY} L ${svgWidth - paddingX} ${baselineY}`,
        area: `M ${paddingX} ${baselineY} L ${svgWidth - paddingX} ${baselineY} Z`,
        points: rawPoints
      }
    }

    let pathD = `M ${rawPoints[0].x.toFixed(1)} ${rawPoints[0].y.toFixed(1)}`
    for (let i = 0; i < rawPoints.length - 1; i++) {
      const p0 = rawPoints[i]
      const p1 = rawPoints[i + 1]
      const cpX = (p0.x + p1.x) / 2
      pathD += ` C ${cpX.toFixed(1)} ${p0.y.toFixed(1)}, ${cpX.toFixed(1)} ${p1.y.toFixed(1)}, ${p1.x.toFixed(1)} ${p1.y.toFixed(1)}`
    }

    const lastP = rawPoints[rawPoints.length - 1]
    const firstP = rawPoints[0]
    const areaD = `${pathD} L ${lastP.x.toFixed(1)} ${baselineY} L ${firstP.x.toFixed(1)} ${baselineY} Z`

    return { path: pathD, area: areaD, points: rawPoints }
  }, [filteredDaysData])

  const getSquareColor = (day) => {
    const count = day.count || 0
    const level = day.level !== undefined ? day.level : (count > 0 ? (count <= 2 ? 1 : count <= 5 ? 2 : count <= 10 ? 3 : 4) : 0)
    if (level === 0) return darkMode ? 'rgba(255,255,255,0.04)' : 'rgba(15,23,42,0.06)'
    if (level === 1) return darkMode ? 'rgba(56, 189, 248, 0.25)' : '#bae6fd'
    if (level === 2) return darkMode ? 'rgba(56, 189, 248, 0.5)' : '#38bdf8'
    if (level === 3) return darkMode ? '#0284c7' : '#0284c7'
    return darkMode ? '#38bdf8' : '#0369a1'
  }

  const activePoint = hoverIndex !== null && waveformPoints.points[hoverIndex] ? waveformPoints.points[hoverIndex] : null

  return (
    <section id="github" className="github-section">
      <div className="container">
        <span className="section-label">OPEN SOURCE & ACTIVITY</span>
        <h2 className="section-title">GitHub Engineering Metrics</h2>
        <p className="section-subtitle">
          Real-time contribution graph, repository statistics, and open-source activities synced with GitHub.
        </p>

        {/* 4 Live Stat Cards Grid */}
        <div className="github-stats-grid">
          <div className="github-stat-card">
            <div className="stat-card-top">
              <FiGithub className="stat-icon" size={20} />
              <span className="stat-badge">REPOS</span>
            </div>
            <div className="stat-value">{publicReposCount}</div>
            <div className="stat-title">Public Repositories</div>
          </div>

          <div className="github-stat-card">
            <div className="stat-card-top">
              <FiGitCommit className="stat-icon" size={20} />
              <span className="stat-badge">COMMITS</span>
            </div>
            <div className="stat-value">{totalContribs}</div>
            <div className="stat-title">Yearly Contributions</div>
          </div>

          <div className="github-stat-card">
            <div className="stat-card-top">
              <FiStar className="stat-icon" size={20} />
              <span className="stat-badge">STARS</span>
            </div>
            <div className="stat-value">{displayStars}</div>
            <div className="stat-title">Stars Earned</div>
          </div>

          <div className="github-stat-card">
            <div className="stat-card-top">
              <FiGitPullRequest className="stat-icon" size={20} />
              <span className="stat-badge">PRS</span>
            </div>
            <div className="stat-value">{mergedPRsCount}</div>
            <div className="stat-title">Merged Pull Requests</div>
          </div>
        </div>

        {/* Main Graph Visualization Card with Moving Wave */}
        <div className="github-graph-card">
          <div className="github-graph-header">
            <div>
              <div className="graph-card-title">
                {totalContribs} Contributions in Past Year
              </div>
              <div className="graph-card-sub">
                Synced from @{username} on GitHub
              </div>
            </div>

            <div className="graph-controls">
              {viewMode === 'ecg' && (
                <div className="pill-group">
                  <button
                    type="button"
                    className={`pill-btn ${timeRange === '30' ? 'active' : ''}`}
                    onClick={() => setTimeRange('30')}
                  >
                    1 Month
                  </button>
                  <button
                    type="button"
                    className={`pill-btn ${timeRange === '90' ? 'active' : ''}`}
                    onClick={() => setTimeRange('90')}
                  >
                    3 Months
                  </button>
                  <button
                    type="button"
                    className={`pill-btn ${timeRange === '365' ? 'active' : ''}`}
                    onClick={() => setTimeRange('365')}
                  >
                    1 Year
                  </button>
                </div>
              )}

              <div className="pill-group">
                <button
                  type="button"
                  className={`pill-btn ${viewMode === 'ecg' ? 'active' : ''}`}
                  onClick={() => setViewMode('ecg')}
                >
                  <FiActivity size={13} /> Waveform
                </button>
                <button
                  type="button"
                  className={`pill-btn ${viewMode === 'heatmap' ? 'active' : ''}`}
                  onClick={() => setViewMode('heatmap')}
                >
                  <FiCalendar size={13} /> Heatmap
                </button>
              </div>

              <a
                href={`https://github.com/${username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-sm"
                style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem' }}
              >
                <FiGithub size={13} /> GitHub Profile <FiExternalLink size={12} />
              </a>
            </div>
          </div>

          {viewMode === 'ecg' && (
            <div style={{ position: 'relative', width: '100%', overflowX: 'auto' }}>
              <div
                style={{ minWidth: '650px', position: 'relative' }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect()
                  const relX = e.clientX - rect.left
                  const pct = Math.max(0, Math.min(1, (relX - 30) / (rect.width - 60)))
                  const idx = Math.round(pct * (filteredDaysData.length - 1))
                  setHoverIndex(idx)
                }}
                onMouseLeave={() => setHoverIndex(null)}
              >
                {/* SVG Container with Animated Flowing Grid Background */}
                <svg
                  viewBox="0 0 940 180"
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    background: 'var(--bg-elevated)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                  }}
                >
                  <defs>
                    <linearGradient id="blueAreaGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--accent-cyan)" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="var(--accent-cyan)" stopOpacity={0.0} />
                    </linearGradient>
                    <filter id="blueGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                    <pattern id="graphGrid" width="40" height="25" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 25" fill="none" stroke="var(--border-subtle)" strokeWidth="1" />
                    </pattern>
                  </defs>

                  <rect width="940" height="180" fill="url(#graphGrid)" />

                  {/* Animated Background Pulse Wave Line */}
                  <path
                    className="moving-wave-line"
                    d="M 0 140 Q 235 125, 470 140 T 940 140"
                    fill="none"
                    stroke="var(--accent-cyan)"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    opacity="0.3"
                  />

                  <line x1="30" y1="140" x2="910" y2="140" stroke="var(--border-color)" strokeWidth="1" strokeDasharray="4 4" />

                  {waveformPoints.area && (
                    <path
                      key={`area-${timeRange}-${viewMode}`}
                      className="animated-draw-area"
                      d={waveformPoints.area}
                      fill="url(#blueAreaGradient)"
                    />
                  )}

                  {waveformPoints.path && (
                    <path
                      key={`line-${timeRange}-${viewMode}`}
                      className="animated-draw-wave"
                      d={waveformPoints.path}
                      fill="none"
                      stroke="var(--accent-cyan)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      filter="url(#blueGlowFilter)"
                    />
                  )}

                  {activePoint && (
                    <g>
                      <line
                        x1={activePoint.x}
                        y1="10"
                        x2={activePoint.x}
                        y2="160"
                        stroke="var(--accent-cyan)"
                        strokeWidth="1"
                        strokeDasharray="2 2"
                        opacity="0.8"
                      />
                      <circle
                        cx={activePoint.x}
                        cy={activePoint.y}
                        r="5"
                        fill="var(--accent-cyan)"
                        stroke="var(--bg-main)"
                        strokeWidth="2"
                        filter="url(#blueGlowFilter)"
                      />
                    </g>
                  )}
                </svg>

                {activePoint && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: `${Math.min(85, Math.max(15, (activePoint.x / 940) * 100))}%`,
                      transform: 'translateX(-50%)',
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--accent-cyan)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '0.35rem 0.75rem',
                      color: 'var(--text-primary)',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      boxShadow: 'var(--shadow-card-hover)',
                      pointerEvents: 'none',
                      whiteSpace: 'nowrap',
                      zIndex: 10,
                    }}
                  >
                    <span style={{ color: 'var(--accent-cyan)', display: 'block', fontSize: '0.72rem' }}>{activePoint.date}</span>
                    <span>{activePoint.count} contribution{activePoint.count === 1 ? '' : 's'}</span>
                  </div>
                )}
              </div>

              <div className="graph-footer-info">
                <span>Viewing {timeRange === '30' ? 'Past Month (30 Days)' : timeRange === '90' ? 'Past 3 Months (90 Days)' : 'Full Year (365 Days)'}</span>
                <span className="live-pulse-label">
                  <span className="status-dot-pulse" style={{ display: 'inline-block', marginRight: '0.35rem' }} />
                  Live Activity Sync Active
                </span>
              </div>
            </div>
          )}

          {viewMode === 'heatmap' && (
            <div style={{ overflowX: 'auto', paddingBottom: '0.5rem' }}>
              <div style={{ display: 'flex', gap: '10px', minWidth: '760px', justifyContent: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingTop: '20px', fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                  <span>Mon</span>
                  <span>Wed</span>
                  <span>Fri</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', position: 'relative', height: '18px', marginBottom: '4px', fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                    {monthLabels.map((lbl, i) => (
                      <span
                        key={i}
                        style={{
                          position: 'absolute',
                          left: `${lbl.weekIndex * 13.5}px`,
                        }}
                      >
                        {lbl.month}
                      </span>
                    ))}
                  </div>

                  <div style={{ display: 'flex', gap: '3px' }}>
                    {weeks.map((week, wIdx) => (
                      <div key={wIdx} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                        {week.map((day) => (
                          <div
                            key={day.date}
                            title={`${day.count > 0 ? day.count : 'No'} contribution${day.count === 1 ? '' : 's'} on ${day.date}`}
                            style={{
                              width: '10.5px',
                              height: '10.5px',
                              borderRadius: '2px',
                              backgroundColor: getSquareColor(day),
                              transition: 'transform 0.15s ease',
                              cursor: 'pointer',
                            }}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '5px', marginTop: '1rem', fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                <span>Less</span>
                <span style={{ width: '10px', height: '10px', borderRadius: '2px', backgroundColor: getSquareColor({ count: 0 }) }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '2px', backgroundColor: getSquareColor({ count: 2 }) }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '2px', backgroundColor: getSquareColor({ count: 5 }) }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '2px', backgroundColor: getSquareColor({ count: 8 }) }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '2px', backgroundColor: getSquareColor({ count: 12 }) }} />
                <span>More</span>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Split: Active Repositories & Tech Stack Breakdown */}
        <div className="github-split-grid">
          <div className="github-sub-card">
            <h3 className="sub-card-title">
              <FiGitCommit className="sub-icon" /> Top Active Repositories
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {topActiveProjects.map((item, idx) => (
                <div key={idx} className="event-row">
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, fontSize: '0.825rem' }}>
                    <span style={{ color: 'var(--text-primary)' }}>{item.type || 'Push'}</span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>
                      {item.date}
                    </span>
                  </div>
                  <a
                    href={`https://github.com/${item.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--accent-cyan)', textDecoration: 'none', fontWeight: 500, fontSize: '0.8rem', display: 'inline-block', marginTop: '0.2rem' }}
                  >
                    {item.name} ↗
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="github-sub-card">
            <h3 className="sub-card-title">
              <FiCode className="sub-icon" /> Core Tech & Language Stack
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { name: 'JavaScript & React', category: 'Full Stack', percent: 45 },
                { name: 'Node.js & Express.js (REST APIs)', category: 'Backend API', percent: 25 },
                { name: 'TypeScript & Next.js', category: 'Frontend / SaaS', percent: 15 },
                { name: 'MongoDB & Database Models', category: 'Database', percent: 10 },
                { name: 'Git & GitHub', category: 'Developer Workflow', percent: 5 },
              ].map((tech) => (
                <div key={tech.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.825rem', marginBottom: '0.25rem', fontWeight: 600 }}>
                    <span style={{ color: 'var(--text-primary)' }}>{tech.name}</span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{tech.category} ({tech.percent}%)</span>
                  </div>
                  <div style={{ height: '6px', borderRadius: '3px', background: 'var(--bg-pill)', overflow: 'hidden', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ width: `${tech.percent * 2}%`, height: '100%', background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-blue))', borderRadius: '3px' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
