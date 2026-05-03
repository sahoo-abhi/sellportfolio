import { useEffect, useRef } from 'react'
import './SkillsWheel.css'

interface Skill {
  name: string
  xp: string
  level: string
  bar: number
  grad: string
  icon: string
}

const SKILLS: Skill[] = [
  {
    name: 'UI Design',
    xp: '6 yrs',
    level: 'Expert',
    bar: 95,
    grad: 'linear-gradient(135deg,#1a1a2e,#16213e)',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="3"/>
      <path d="M3 9h18M9 21V9"/>
      <circle cx="16" cy="15" r="2" fill="currentColor" stroke="none"/>
    </svg>`,
  },
  {
    name: 'React',
    xp: '5 yrs',
    level: 'Expert',
    bar: 92,
    grad: 'linear-gradient(135deg,#0d1b2a,#0e2d40)',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#61DAFB" stroke-width="1.4">
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(0 12 12)"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/>
      <circle cx="12" cy="12" r="1.8" fill="#61DAFB" stroke="none"/>
    </svg>`,
  },
  {
    name: 'Three.js',
    xp: '3 yrs',
    level: 'Advanced',
    bar: 80,
    grad: 'linear-gradient(135deg,#111,#1e1e2e)',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="12,2 22,20 2,20" fill="rgba(255,255,255,0.08)" stroke="white" stroke-width="1.4"/>
      <polygon points="12,7 18,18 6,18" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.5)" stroke-width="1"/>
      <polygon points="12,11 15.5,17 8.5,17" fill="rgba(255,255,255,0.25)" stroke="rgba(255,255,255,0.7)" stroke-width="0.8"/>
    </svg>`,
  },
  {
    name: 'Motion',
    xp: '4 yrs',
    level: 'Advanced',
    bar: 85,
    grad: 'linear-gradient(135deg,#0a2e1a,#1b6940)',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path d="M5 12h14" stroke="#4ade80" stroke-width="1.8"/>
      <path d="M5 7 Q9 7 12 12 Q15 17 19 17" stroke="rgba(74,222,128,0.5)" stroke-width="1.4"/>
      <path d="M15 8l4 4-4 4" stroke="#4ade80" stroke-width="1.8"/>
      <circle cx="5" cy="12" r="2" fill="#4ade80"/>
      <circle cx="19" cy="12" r="2" fill="#4ade80"/>
    </svg>`,
  },
  {
    name: 'TypeScript',
    xp: '4 yrs',
    level: 'Expert',
    bar: 88,
    grad: 'linear-gradient(135deg,#1a2744,#1e3a5f)',
    icon: `<svg viewBox="0 0 24 24">
      <rect x="2" y="2" width="20" height="20" rx="3" fill="#3178C6"/>
      <text x="4.5" y="15.5" font-family="monospace" font-weight="700" font-size="8" fill="white">TS</text>
    </svg>`,
  },
  {
    name: 'WebGL',
    xp: '2 yrs',
    level: 'Proficient',
    bar: 68,
    grad: 'linear-gradient(135deg,#2e0a1a,#691b3d)',
    icon: `<svg viewBox="0 0 24 24" fill="none">
      <path d="M12 2L2 7l10 5 10-5-10-5z" fill="rgba(255,100,150,0.3)" stroke="#ff6496" stroke-width="1.3" stroke-linejoin="round"/>
      <path d="M2 17l10 5 10-5" stroke="#ff6496" stroke-width="1.3" stroke-linecap="round"/>
      <path d="M2 12l10 5 10-5" stroke="rgba(255,100,150,0.5)" stroke-width="1.3" stroke-linecap="round"/>
    </svg>`,
  },
  {
    name: 'Branding',
    xp: '5 yrs',
    level: 'Expert',
    bar: 90,
    grad: 'linear-gradient(135deg,#0a1a2e,#1b3d69)',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="9"/>
      <path d="M9 12l2 2 4-4"/>
      <path d="M12 3v2M12 19v2M3 12h2M19 12h2"/>
      <circle cx="12" cy="12" r="2" fill="#60a5fa" stroke="none"/>
    </svg>`,
  },
  {
    name: 'Node.js',
    xp: '3 yrs',
    level: 'Advanced',
    bar: 76,
    grad: 'linear-gradient(135deg,#0a2010,#1a4020)',
    icon: `<svg viewBox="0 0 24 24" fill="none">
      <path d="M12 2L3 7v10l9 5 9-5V7L12 2z" fill="rgba(104,197,68,0.15)" stroke="#68c544" stroke-width="1.4" stroke-linejoin="round"/>
      <path d="M12 6v6l5 3" stroke="#68c544" stroke-width="1.6" stroke-linecap="round"/>
      <circle cx="12" cy="12" r="2" fill="#68c544"/>
    </svg>`,
  },
]

const CFG = {
  CARD_COUNT: 8,
  PHASE1_END: 0.35,
  PHASE3_START: 0.40,
  CARD_DELAY: 0.05,
  FLIP_DUR_MS: 550,
  BAR_DELAY_MS: 150,
  MOBILE_BP: 600,
}

export function SkillsWheel() {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardsContainerRef = useRef<HTMLDivElement>(null)
  const state = {
    scrollY: 0,
    progress: 0,
    p1: 0,
    p3: 0,
    sectionTop: 0,
    scrollDist: 0,
    flipped: new Array(CFG.CARD_COUNT).fill(false),
    allFlipped: false,
  }
  const stateRef = useRef(state)
  const rafRef = useRef<number | undefined>(undefined)
  const cardsRef = useRef<HTMLElement[]>([])
  const barsRef = useRef<HTMLElement[]>([])
  const orbitRef = useRef({ angle: 0, active: false, lastTime: 0 })

  // Helper functions
  const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v))
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t
  const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
  const easedSub = (global: number, delay: number, span: number) =>
    easeInOutCubic(clamp((global - delay) / span, 0, 1))
  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

  const getRadius = () => {
    const w = window.innerWidth
    if (w <= 600) return clamp(80, 0.25 * w, 120)
    if (w <= 900) return clamp(100, 0.18 * w, 160)
    return clamp(120, 0.16 * window.innerWidth, 200)
  }

  const measure = () => {
    const outer = containerRef.current?.querySelector('#skills-outer') as HTMLElement
    if (!outer) return
    const rect = outer.getBoundingClientRect()
    const sectionTop = rect.top + window.scrollY
    const scrollDist = Math.max(outer.offsetHeight - window.innerHeight, 1) // Prevent division by zero
    stateRef.current.sectionTop = sectionTop
    stateRef.current.scrollDist = scrollDist
  }

  const updateCenterOrb = (t: number) => {
    const orb = containerRef.current?.querySelector('#center-orb') as HTMLElement
    if (orb) {
      if (t > 0.8) orb.classList.add('visible')
      else orb.classList.remove('visible')
    }
  }

  const updateScrollHint = (p: number) => {
    const el = containerRef.current?.querySelector('#scroll-hint') as HTMLElement
    if (el) {
      if (p > 0.05) el.classList.add('hidden')
      else el.classList.remove('hidden')
    }
  }

  const updateStackToCircle = (t: number) => {
    const R = getRadius()
    const wrap = containerRef.current?.querySelector('#circle-wrap') as HTMLElement
    if (!wrap) return

    const cw = wrap.offsetWidth / 2
    const ch = wrap.offsetHeight / 2
    const cardW = cardsRef.current[0]?.offsetWidth || 200
    const cardH = cardsRef.current[0]?.offsetHeight || 250

    cardsRef.current.forEach((card, i) => {
      const delay = i * CFG.CARD_DELAY
      const cardT = easedSub(t, delay, 0.85)

      const angle = (i / CFG.CARD_COUNT) * Math.PI * 2 - Math.PI / 2
      const txTarget = Math.cos(angle) * R
      const tyTarget = Math.sin(angle) * R

      const overshoot = 1 + (1 - Math.abs(cardT * 2 - 1)) * 0.1

      const tx = lerp(0, txTarget * overshoot, cardT)
      const ty = lerp(i * 5, tyTarget * overshoot, cardT)
      const stackRot = (i % 2 === 0 ? 1 : -1) * i * 1.5
      const circleRot = (angle * 180) / Math.PI + 90
      const rot = lerp(stackRot, circleRot, cardT)
      const sc = lerp(1 - i * 0.02, 1, cardT)

      const settle = t > 0.9 ? 1 + (1 - easeOutCubic((t - 0.9) / 0.1)) * 0.04 : 1

      const baseX = cw - cardW / 2
      const baseY = ch - cardH / 2

      const rotateY = stateRef.current.flipped[i] ? 'rotateY(180deg)' : ''
      card.style.transform = `translate(${baseX + tx}px,${baseY + ty}px) rotate(${rot}deg) scale(${sc * settle}) ${rotateY}`
      
      // Z-index based on Y position - cards higher on screen get higher z-index
      const zIndex = Math.round(100 - tyTarget / 2) + (stateRef.current.flipped[i] ? 20 : 0)
      card.style.zIndex = String(zIndex)
    })
  }

  const updateOrbit = (ts: number) => {
    const orbit = orbitRef.current
    if (!orbit.active) return

    const dt = ts - orbit.lastTime
    orbit.lastTime = ts
    orbit.angle += dt * 0.00018

    const wrap = containerRef.current?.querySelector('#circle-wrap') as HTMLElement
    if (!wrap) return

    const cw = wrap.offsetWidth / 2
    const ch = wrap.offsetHeight / 2
    const R = getRadius()

    cardsRef.current.forEach((card, i) => {
      const cardW = card.offsetWidth || 200
      const cardH = card.offsetHeight || 250
      const baseAngle = (i / CFG.CARD_COUNT) * Math.PI * 2 - Math.PI / 2
      const a = baseAngle + orbit.angle

      const bobY = Math.sin(Date.now() * 0.001 + i * 0.9) * 7
      const bobS = 1 + Math.sin(Date.now() * 0.0008 + i * 1.1) * 0.025

      const tx = Math.cos(a) * R
      const ty = Math.sin(a) * R + bobY
      const rot = (a * 180) / Math.PI + 90

      const rotY = stateRef.current.flipped[i] ? 'rotateY(180deg)' : ''
      card.style.transition = 'none'
      card.style.transform = `translate(${cw - cardW / 2 + tx}px,${ch - cardH / 2 + ty}px) rotate(${rot}deg) scale(${bobS}) ${rotY}`
      
      // Z-index based on Y position - cards higher on screen get higher z-index
      const zIndex = Math.round(100 - ty / 2) + (stateRef.current.flipped[i] ? 20 : 0)
      card.style.zIndex = String(zIndex)
    })
  }

  const flipCard = (i: number) => {
    const wrap = containerRef.current?.querySelector('#circle-wrap') as HTMLElement
    if (!wrap) return

    const card = cardsRef.current[i]
    const cw = wrap.offsetWidth / 2
    const ch = wrap.offsetHeight / 2
    const cardW = card.offsetWidth || 200
    const cardH = card.offsetHeight || 250
    const R = getRadius()
    const angle = (i / CFG.CARD_COUNT) * Math.PI * 2 - Math.PI / 2
    const tx = Math.cos(angle) * R
    const ty = Math.sin(angle) * R
    const rot = (angle * 180) / Math.PI + 90

    card.style.transition = `transform ${CFG.FLIP_DUR_MS}ms cubic-bezier(0.34,1.56,0.64,1)`
    card.style.transform = `translate(${cw - cardW / 2 + tx}px,${ch - cardH / 2 + ty}px) rotate(${rot}deg) scale(1.12) rotateY(90deg)`

    setTimeout(() => {
      card.style.transform = `translate(${cw - cardW / 2 + tx}px,${ch - cardH / 2 + ty}px) rotate(${rot}deg) scale(1) rotateY(180deg)`
      const bar = card.querySelector('.bar-fill') as HTMLElement
      if (bar) {
        setTimeout(() => {
          bar.style.width = bar.dataset.target + '%'
        }, CFG.BAR_DELAY_MS)
      }
    }, CFG.FLIP_DUR_MS / 2)
  }

  const updateCardReveals = (t: number) => {
    if (stateRef.current.allFlipped) return

    let all = true
    cardsRef.current.forEach((_, i) => {
      const threshold = i / CFG.CARD_COUNT
      if (t >= threshold && !stateRef.current.flipped[i]) {
        stateRef.current.flipped[i] = true
        flipCard(i)
      }
      if (!stateRef.current.flipped[i]) all = false
    })

    if (all && !stateRef.current.allFlipped) {
      stateRef.current.allFlipped = true
      const completionText = containerRef.current?.querySelector('#completion-text') as HTMLElement
      if (completionText) completionText.classList.add('visible')
    }
  }

  const tick = (ts: number) => {
    const scrollY = window.scrollY
    const progress = clamp((scrollY - stateRef.current.sectionTop) / stateRef.current.scrollDist, 0, 1)
    const p1 = clamp(progress / CFG.PHASE1_END, 0, 1)
    const p3 = clamp((progress - CFG.PHASE3_START) / 0.67, 0, 1)

    // Update state ref with current values
    stateRef.current.p1 = p1
    stateRef.current.progress = progress

    if (p1 > 0.92 && !orbitRef.current.active) {
      orbitRef.current.active = true
      orbitRef.current.lastTime = ts
    }
    if (p1 < 0.85 && orbitRef.current.active) {
      orbitRef.current.active = false
    }

    if (orbitRef.current.active) {
      updateOrbit(ts)
    } else {
      updateStackToCircle(p1)
    }

    updateCardReveals(p3)
    updateScrollHint(progress)
    updateCenterOrb(p1)

    // Update float class
    const wrap = containerRef.current?.querySelector('#circle-wrap') as HTMLElement
    if (wrap) {
      if (progress < 0.02) {
        wrap.classList.add('stack-float')
      } else {
        wrap.classList.remove('stack-float')
      }
    }

    rafRef.current = requestAnimationFrame(tick)
  }

  // Initialize on mount
  useEffect(() => {
    if (!containerRef.current) return

    // Collect all card elements
    const cards = Array.from(containerRef.current.querySelectorAll('.skill-card')) as HTMLElement[]
    cardsRef.current = cards

    // Collect all bar elements
    const bars = Array.from(containerRef.current.querySelectorAll('.bar-fill')) as HTMLElement[]
    barsRef.current = bars

    measure()

    // Pre-position cards
    const wrap = containerRef.current.querySelector('#circle-wrap') as HTMLElement
    if (wrap) {
      const cw = wrap.offsetWidth / 2
      const ch = wrap.offsetHeight / 2

      cardsRef.current.forEach((card, i) => {
        const cardW = card.offsetWidth || 200
        const cardH = card.offsetHeight || 250
        const rot = (i % 2 === 0 ? 1 : -1) * i * 1.5
        card.style.transform = `translate(${cw - cardW / 2}px,${ch - cardH / 2 + i * 5}px) rotate(${rot}deg) scale(${1 - i * 0.02})`
        card.style.zIndex = String(CFG.CARD_COUNT - i)
      })

      wrap.classList.add('stack-float')
    }

    measure()
    rafRef.current = requestAnimationFrame(tick)

    // Add card event listeners
    cardsRef.current.forEach((card, i) => {
      card.addEventListener('mouseenter', () => {
        if (stateRef.current.p1 < 0.5) return
        if (!stateRef.current.flipped[i]) {
          card.style.transition = 'box-shadow .2s ease'
          card.style.boxShadow = `0 0 30px rgba(124, 106, 250, 0.35)`
        } else {
          cardsRef.current.forEach((c, j) => {
            if (j !== i) c.style.opacity = '0.65'
          })
        }
      })

      card.addEventListener('mouseleave', () => {
        card.style.boxShadow = ''
        cardsRef.current.forEach(c => {
          c.style.opacity = '1'
        })
      })

      card.addEventListener('click', () => {
        if (!stateRef.current.flipped[i]) return
        const inner = card.querySelector('.card-back') as HTMLElement
        if (inner) {
          card.style.transition = `transform .3s ease`
          card.style.transform = card.style.transform.replace(/rotateY\([^)]*\)/, '') + ' rotateY(0deg)'
          setTimeout(() => {
            card.style.transition = `transform .3s ease`
            card.style.transform = card.style.transform.replace(/rotateY\([^)]*\)/, '') + ' rotateY(180deg)'
          }, 320)
        }
      })
    })

    const handleScroll = () => {
      stateRef.current.scrollY = window.scrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    const resizeObserver = new ResizeObserver(() => {
      measure()
    })
    const skillsOuter = containerRef.current.querySelector('#skills-outer')
    if (skillsOuter) {
      resizeObserver.observe(skillsOuter)
    }

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      resizeObserver.disconnect()
    }
  }, [])

  return (
    <div ref={containerRef} className="skills-wheel-container">
      <div className="skills-heading">
        <p className="eyebrow">What I bring to the table</p>
        <h2 className="main-heading">My Skills</h2>
        <p className="subtext">Scroll to unpack the deck.</p>
      </div>

      <div id="skills-outer">
        <div id="skills-stage">
          <div id="circle-wrap">
            <div id="center-orb">
              <svg viewBox="-50 -50 100 100" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <radialGradient id="starGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                    <stop offset="35%" stopColor="rgba(124,106,250,1)" stopOpacity="1" />
                    <stop offset="100%" stopColor="rgba(124,106,250,0)" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="coreGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#c4baff" />
                  </radialGradient>
                </defs>
                <polygon
                  points="0,-38 3.5,-3.5 38,0 3.5,3.5 0,38 -3.5,3.5 -38,0 -3.5,-3.5"
                  fill="url(#starGrad)"
                  opacity="0.9"
                />
                <polygon
                  points="0,-28 2.5,-2.5 28,0 2.5,2.5 0,28 -2.5,2.5 -28,0 -2.5,-2.5"
                  fill="url(#starGrad)"
                  opacity="0.6"
                  transform="rotate(45)"
                />
                <line x1="0" y1="-44" x2="0" y2="44" stroke="rgba(255,255,255,0.18)" strokeWidth="0.6" />
                <line x1="-44" y1="0" x2="44" y2="0" stroke="rgba(255,255,255,0.18)" strokeWidth="0.6" />
                <line x1="-31" y1="-31" x2="31" y2="31" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                <line x1="31" y1="-31" x2="-31" y2="31" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                <circle cx="0" cy="0" r="5" fill="url(#coreGrad)" />
                <circle cx="0" cy="0" r="2.5" fill="white" />
              </svg>
            </div>
            <div ref={cardsContainerRef} id="cards-container" style={{ position: 'absolute', inset: 0 }}>
              {SKILLS.map((skill, i) => (
                <div key={i} className="skill-card" data-index={i}>
                  <div className="face card-back">
                    <div className="card-back-mark" dangerouslySetInnerHTML={{ __html: skill.icon }} />
                    <div className="card-tooltip">scroll to reveal →</div>
                  </div>
                  <div className="face card-front" style={{ background: skill.grad }}>
                    <div className="skill-icon" dangerouslySetInnerHTML={{ __html: skill.icon }} />
                    <div className="skill-name">{skill.name}</div>
                    <div className="skill-level">{skill.level}</div>
                    <div className="bar-track">
                      <div className="bar-fill" data-target={skill.bar} />
                    </div>
                    <div className="skill-xp">{skill.xp}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div id="scroll-hint">
            <div className="hint-text">scroll to reveal</div>
            <div className="hint-mouse"></div>
            <div className="hint-chevrons">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>

      <div className="after-spacer"></div>
    </div>
  )
}
