import { useEffect, useRef } from 'react'

const MILESTONES = [
  {
    year: '2015',
    title: 'First Design Project',
    body: 'Started my journey in digital design with a passion for creating beautiful user experiences.',
    tag: 'Start',
  },
  {
    year: '2017',
    title: 'Web Design Specialization',
    body: 'Focused on web design and learned the craft of creating engaging digital interfaces.',
    tag: 'Growth',
  },
  {
    year: '2019',
    title: 'UX/UI Certification',
    body: 'Completed professional certification in UX/UI design, deepening expertise in user-centered design.',
    tag: 'Achievement',
  },
  {
    year: '2021',
    title: 'Advanced Animation',
    body: 'Mastered motion design and advanced animations for web and interactive experiences.',
    tag: 'Skill',
  },
  {
    year: '2023',
    title: 'Full-Stack Designer',
    body: 'Expanded into development, combining design thinking with technical implementation.',
    tag: 'Evolution',
  },
  {
    year: '2024',
    title: 'Creative Director',
    body: 'Leading design initiatives and mentoring the next generation of designers.',
    tag: 'Present',
  },
]

export function EducationSection() {
  const spineDrawnRef = useRef<HTMLDivElement>(null)
  const spineNibRef = useRef<HTMLDivElement>(null)
  const milestonesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollY = () => {
      const wh = window.innerHeight
      const nodes = document.querySelectorAll('[data-node]')
      const cards = document.querySelectorAll('[data-card]')

      if (spineDrawnRef.current && spineNibRef.current) {
        const st = document.getElementById('timeline')?.getBoundingClientRect().top || 0
        const prog = Math.max(0, Math.min(1, (wh - st) / (wh + document.getElementById('timeline')?.clientHeight || 0)))
        const timelineHeight = document.getElementById('timeline')?.clientHeight || 1
        const spineHeight = timelineHeight * prog

        spineDrawnRef.current.style.height = `${spineHeight}px`
        spineNibRef.current.style.top = `${Math.min(spineHeight, timelineHeight - 10)}px`
      }

      nodes.forEach((node, i) => {
        const card = cards[i]
        if (!card) return

        const rect = card.getBoundingClientRect()
        const isActive = rect.top < wh * 0.7 && rect.top > -rect.height

        if (isActive) {
          node.classList.add('active')
          card.classList.add('arrived')
        } else {
          node.classList.remove('active')
          card.classList.remove('arrived')
        }
      })
    }

    window.addEventListener('scroll', scrollY)
    window.addEventListener('resize', scrollY)
    scrollY()

    return () => {
      window.removeEventListener('scroll', scrollY)
      window.removeEventListener('resize', scrollY)
    }
  }, [])

  return (
    <>
      <style>{`
        :root {
          --accent: 139, 92, 246;
          --accent-hex: #8B5CF6;
          --bg: #0C0C0C;
          --text-primary: rgba(255,255,255,0.92);
          --text-secondary: rgba(255,255,255,0.45);
          --text-muted: rgba(255,255,255,0.18);
        }

        /* ── HERO ── */
        .edu-hero {
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 2rem;
          position: relative;
          z-index: 1;
        }
        .edu-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 60% 50% at 50% 60%, rgba(var(--accent),0.14) 0%, transparent 70%);
          pointer-events: none;
        }
        .hero-eyebrow {
          font-size: 11px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(var(--accent),0.7);
          margin-bottom: 1.5rem;
          opacity: 0;
          animation: fadeUp 1s 0.3s forwards;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
        }
        .hero-title {
          font-size: clamp(2.5rem, 6vw, 5rem);
          font-weight: 300;
          line-height: 1.1;
          letter-spacing: -0.0615em;
          opacity: 0;
          animation: fadeUp 1s 0.5s forwards;
          font-family: 'Instrument Serif', serif;
        }
        .hero-title em {
          font-style: normal;
          color: rgba(var(--accent),0.9);
        }
        .hero-sub {
          margin-top: 1.5rem;
          font-size: 1rem;
          color: var(--text-secondary);
          max-width: 420px;
          line-height: 1.7;
          opacity: 0;
          animation: fadeUp 1s 0.7s forwards;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
        }
        .scroll-hint {
          position: absolute;
          bottom: 2.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
          opacity: 0;
          animation: fadeUp 1s 1.2s forwards;
        }
        .scroll-hint-label {
          position: relative;
          font-size: 11px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: transparent;
          overflow: hidden;
        }
        .scroll-hint-label::before {
          content: 'scroll to explore';
          position: absolute;
          inset: 0;
          color: var(--text-muted);
        }
        .scroll-hint-label::after {
          content: 'scroll to explore';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(var(--accent),0.9) 40%, white 55%, rgba(var(--accent),0.9) 70%, transparent 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          background-size: 220% 100%;
          animation: shimmerText 2.8s ease-in-out infinite;
        }
        @keyframes shimmerText {
          0% {
            background-position: 200% center;
          }
          100% {
            background-position: -40% center;
          }
        }
        .scroll-mouse {
          width: 22px;
          height: 34px;
          border: 1.5px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          position: relative;
          display: flex;
          justify-content: center;
        }
        .scroll-mouse::after {
          content: '';
          width: 3px;
          height: 7px;
          background: rgba(var(--accent), 0.9);
          border-radius: 2px;
          position: absolute;
          top: 6px;
          animation: mouseWheel 1.8s ease-in-out infinite;
          box-shadow: 0 0 6px rgba(var(--accent), 0.8);
        }
        @keyframes mouseWheel {
          0% {
            top: 6px;
            opacity: 1;
          }
          60% {
            top: 16px;
            opacity: 0.2;
          }
          61% {
            top: 6px;
            opacity: 0;
          }
          100% {
            top: 6px;
            opacity: 1;
          }
        }
        .scroll-chevrons {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
        }
        .scroll-chevrons span {
          display: block;
          width: 10px;
          height: 10px;
          border-right: 1.5px solid rgba(var(--accent), 0.8);
          border-bottom: 1.5px solid rgba(var(--accent), 0.8);
          transform: rotate(45deg);
          animation: chevronFade 1.8s ease-in-out infinite;
        }
        .scroll-chevrons span:nth-child(1) {
          animation-delay: 0s;
          opacity: 0.3;
        }
        .scroll-chevrons span:nth-child(2) {
          animation-delay: 0.2s;
          opacity: 0.3;
        }
        .scroll-chevrons span:nth-child(3) {
          animation-delay: 0.4s;
          opacity: 0.3;
        }
        @keyframes chevronFade {
          0%,
          100% {
            opacity: 0.15;
          }
          50% {
            opacity: 0.9;
          }
        }

        /* ── TIMELINE SECTION ── */
        #timeline {
          position: relative;
          padding: 8rem 0 12rem;
          z-index: 1;
        }

        /* ── NEBULA BLOBS ── */
        .nebula {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(80px);
          opacity: 0.07;
          z-index: 0;
        }

        /* ── SPINE ── */
        .spine-track {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 2px;
          transform: translateX(-50%);
          z-index: 2;
        }
        .spine-base {
          position: absolute;
          inset: 0;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 2px;
        }
        .spine-drawn {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 0;
          background: linear-gradient(to bottom, rgba(var(--accent), 1) 0%, rgba(var(--accent), 0.65) 60%, rgba(255, 255, 255, 0.95) 100%);
          border-radius: 2px;
        }
        .spine-nib {
          position: absolute;
          left: 50%;
          transform: translateX(-50%) translateY(-50%);
          width: 4px;
          height: 20px;
          background: white;
          border-radius: 2px;
          box-shadow: 0 0 14px 5px rgba(var(--accent), 0.95), 0 0 30px 10px rgba(var(--accent), 0.35);
          transition: top 0.04s linear;
        }

        /* ── MILESTONE ── */
        .milestone {
          position: relative;
          display: grid;
          grid-template-columns: 1fr 80px 1fr;
          align-items: start;
          min-height: 220px;
          padding: 0 max(2rem, calc(50% - 560px));
          margin-bottom: 2rem;
          z-index: 3;
        }
        .milestone:nth-child(odd) .ms-card {
          grid-column: 1;
          text-align: right;
        }
        .milestone:nth-child(odd) .ms-spine {
          grid-column: 2;
        }
        .milestone:nth-child(odd) .ms-empty {
          grid-column: 3;
        }
        .milestone:nth-child(even) .ms-empty {
          grid-column: 1;
        }
        .milestone:nth-child(even) .ms-spine {
          grid-column: 2;
        }
        .milestone:nth-child(even) .ms-card {
          grid-column: 3;
          text-align: left;
        }
        .ms-spine {
          display: flex;
          justify-content: center;
          padding-top: 32px;
          position: relative;
        }

        /* ── NODE ── */
        .node {
          position: relative;
          width: 14px;
          height: 14px;
          flex-shrink: 0;
        }
        .node-ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 2px solid rgba(255, 255, 255, 0.14);
          transition: border-color 0.4s ease;
        }
        .node-fill {
          position: absolute;
          inset: 2px;
          border-radius: 50%;
          background: rgba(var(--accent), 1);
          transform: scale(0);
          transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .node-pulse {
          position: absolute;
          inset: -6px;
          border-radius: 50%;
          border: 1.5px solid rgba(var(--accent), 0.6);
          opacity: 0;
          pointer-events: none;
        }
        .node-glow {
          position: absolute;
          inset: -8px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(var(--accent), 0.4) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        .node.active .node-ring {
          border-color: rgba(var(--accent), 0.9);
        }
        .node.active .node-fill {
          transform: scale(1);
        }
        .node.active .node-glow {
          opacity: 1;
        }
        .node.active .node-pulse {
          animation: pulseRing 700ms ease-out forwards;
        }
        @keyframes pulseRing {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(3.5);
            opacity: 0;
          }
        }

        /* ── CARD ── */
        .ms-card {
          padding: 0 1.5rem;
          padding-top: 24px;
          opacity: 0;
          will-change: transform, opacity;
        }
        .milestone:nth-child(odd) .ms-card {
          transform: translateX(-28px);
        }
        .milestone:nth-child(even) .ms-card {
          transform: translateX(28px);
        }
        .ms-card.arrived {
          opacity: 1;
          transform: translateX(0);
          transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .card-year {
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(var(--accent), 0.7);
          margin-bottom: 0.5rem;
          font-weight: 500;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
        }
        .card-title {
          font-size: 1.15rem;
          font-weight: 500;
          line-height: 1.3;
          margin-bottom: 0.6rem;
          letter-spacing: -0.01em;
          font-family: 'Instrument Serif', serif;
        }
        .card-body {
          font-size: 0.875rem;
          line-height: 1.7;
          color: var(--text-secondary);
          max-width: 300px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
        }
        .milestone:nth-child(odd) .card-body {
          margin-left: auto;
        }
        .card-tag {
          display: inline-block;
          margin-top: 0.75rem;
          padding: 3px 10px;
          border-radius: 20px;
          border: 1px solid rgba(var(--accent), 0.25);
          font-size: 11px;
          letter-spacing: 0.08em;
          color: rgba(var(--accent), 0.7);
          background: rgba(var(--accent), 0.07);
        }

        /* ── YEAR GHOST ── */
        .year-float {
          position: absolute;
          font-size: clamp(5rem, 12vw, 9rem);
          font-weight: 700;
          letter-spacing: -0.05em;
          color: rgba(255, 255, 255, 0.022);
          pointer-events: none;
          user-select: none;
          will-change: transform;
          z-index: 0;
          line-height: 1;
        }

        /* ── CONNECTOR ── */
        .ms-connector {
          position: absolute;
          top: 38px;
          height: 1px;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.6s ease 0.3s;
        }
        .milestone:nth-child(odd) .ms-connector {
          right: calc(50% + 40px);
          left: 0;
          background: linear-gradient(to left, transparent, rgba(var(--accent), 0.18), transparent);
        }
        .milestone:nth-child(even) .ms-connector {
          left: calc(50% + 40px);
          right: 0;
          background: linear-gradient(to right, transparent, rgba(var(--accent), 0.18), transparent);
        }
        .ms-card.arrived ~ .ms-connector {
          opacity: 1;
        }
        .node.active ~ .ms-connector {
          opacity: 1;
        }

        /* ── FOOTER ── */
        .timeline-end {
          text-align: center;
          padding: 4rem 2rem 8rem;
          color: var(--text-muted);
          font-size: 0.875rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          position: relative;
          z-index: 2;
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 680px) {
          .spine-track {
            left: 40px;
            transform: none;
          }
          .milestone {
            grid-template-columns: 60px 1fr;
            padding: 0 1.25rem;
            min-height: 160px;
            margin-bottom: 0;
          }
          .milestone:nth-child(odd) .ms-card,
          .milestone:nth-child(even) .ms-card {
            grid-column: 2;
            grid-row: 1;
            text-align: left;
            transform: translateX(20px);
          }
          .milestone:nth-child(odd) .ms-spine,
          .milestone:nth-child(even) .ms-spine {
            grid-column: 1;
            grid-row: 1;
            justify-content: flex-end;
            padding-right: 18px;
          }
          .milestone:nth-child(odd) .ms-empty,
          .milestone:nth-child(even) .ms-empty {
            display: none;
          }
          .card-body {
            max-width: none;
          }
          .ms-connector,
          .year-float {
            display: none;
          }
        }
      `}</style>

      {/* Hero Section */}
      <section className="edu-hero">
        <p className="hero-eyebrow">The story so far</p>
        <h1 className="hero-title">
          A decade of<br />
          <em>making things</em>
        </h1>
        <p className="hero-sub">
          Scroll to travel through the milestones that shaped a practice built on craft, curiosity, and the relentless pursuit of the right thing.
        </p>
        <div className="scroll-hint">
          <div className="scroll-hint-label"></div>
          <div className="scroll-mouse"></div>
          <div className="scroll-chevrons">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section id="timeline" className="relative bg-[#0C0C0C]">
        {/* Nebula blobs */}
        <div
          className="nebula"
          style={{ width: '600px', height: '600px', background: 'rgba(var(--accent),1)', top: '5%', left: '-10%' }}
        />
        <div className="nebula" style={{ width: '500px', height: '500px', background: '#1a4fff', top: '35%', right: '-8%' }} />
        <div
          className="nebula"
          style={{ width: '700px', height: '400px', background: 'rgba(var(--accent),1)', top: '65%', left: '20%' }}
        />

        {/* Spine track */}
        <div className="spine-track">
          <div className="spine-base"></div>
          <div className="spine-drawn" ref={spineDrawnRef}></div>
          <div className="spine-nib" ref={spineNibRef}></div>
        </div>

        {/* Milestones */}
        <div ref={milestonesRef}>
          {MILESTONES.map((m, i) => (
            <div key={i} className="milestone">
              {i % 2 === 0 ? (
                <>
                  <div className="ms-card" data-card={i}>
                    <div className="card-year">{m.year}</div>
                    <div className="card-title">{m.title}</div>
                    <div className="card-body">{m.body}</div>
                    <span className="card-tag">{m.tag}</span>
                  </div>
                  <div className="ms-spine">
                    <div className="node" data-node={i}>
                      <div className="node-glow"></div>
                      <div className="node-ring"></div>
                      <div className="node-fill"></div>
                      <div className="node-pulse"></div>
                    </div>
                    <div className="ms-connector"></div>
                  </div>
                  <div className="ms-empty"></div>
                </>
              ) : (
                <>
                  <div className="ms-empty"></div>
                  <div className="ms-spine">
                    <div className="node" data-node={i}>
                      <div className="node-glow"></div>
                      <div className="node-ring"></div>
                      <div className="node-fill"></div>
                      <div className="node-pulse"></div>
                    </div>
                    <div className="ms-connector"></div>
                  </div>
                  <div className="ms-card" data-card={i}>
                    <div className="card-year">{m.year}</div>
                    <div className="card-title">{m.title}</div>
                    <div className="card-body">{m.body}</div>
                    <span className="card-tag">{m.tag}</span>
                  </div>
                </>
              )}
              <div className="year-float" style={i % 2 === 0 ? { right: 'calc(50% + 80px)', top: '0' } : { left: 'calc(50% + 80px)', top: '0' }}>
                {m.year}
              </div>
            </div>
          ))}
        </div>

        <div className="timeline-end">Present day</div>
      </section>
    </>
  )
}
