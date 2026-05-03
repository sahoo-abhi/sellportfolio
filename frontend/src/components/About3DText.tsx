import { useEffect, useRef, useState } from 'react'

interface About3DTextProps {
  text?: string
}

export function About3DText({ text = 'About Me' }: About3DTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const initialLoadRef = useRef(true)
  const [state, setState] = useState({
    rotateX: 0,
    rotateY: 0,
    targetRotateX: 0,
    targetRotateY: 0,
    isTouchDevice: false,
    isVisible: false,
    shouldAnimate: false,
  })

  const config = {
    parallaxMaxX: 20,
    parallaxMaxY: 15,
    lerpFactor: 0.08,
    neighborDistance: 2,
    entranceDelay: 70,
  }

  // Touch device detection
  useEffect(() => {
    const isTouchSupported = () => {
      return (
        ('ontouchstart' in window ||
          (window as any).DocumentTouch ||
          navigator.maxTouchPoints > 0 ||
          (navigator as any).msMaxTouchPoints > 0) &&
        !window.matchMedia('(pointer:fine)').matches
      )
    }

    setState((prev) => ({
      ...prev,
      isTouchDevice: isTouchSupported(),
    }))
  }, [])

  // Scroll trigger - Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // On initial page load
        if (initialLoadRef.current) {
          initialLoadRef.current = false
          // If already in view on load, show without animation
          if (entry.isIntersecting) {
            setState((prev) => ({
              ...prev,
              isVisible: true,
              shouldAnimate: false,
            }))
          }
          return
        }

        // After initial load, animate on scroll
        if (entry.isIntersecting) {
          setState((prev) => ({
            ...prev,
            isVisible: true,
            shouldAnimate: true,
          }))
        } else {
          setState((prev) => ({
            ...prev,
            isVisible: false,
            shouldAnimate: false,
          }))
        }
      },
      { threshold: 0.3 }
    )

    if (wrapperRef.current) {
      observer.observe(wrapperRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Mouse tracking & parallax
  useEffect(() => {
    if (state.isTouchDevice) return

    const handleMouseMove = (event: MouseEvent) => {
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2

      const normalizedX = (event.clientX - centerX) / centerX
      const normalizedY = (event.clientY - centerY) / centerY

      setState((prev) => ({
        ...prev,
        targetRotateY: normalizedX * config.parallaxMaxX,
        targetRotateX: -normalizedY * config.parallaxMaxY,
      }))
    }

    const handleMouseLeave = () => {
      setState((prev) => ({
        ...prev,
        targetRotateX: 0,
        targetRotateY: 0,
      }))
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [state.isTouchDevice])

  // Animation loop - lerp interpolation
  useEffect(() => {
    let animationFrameId: number

    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor
    }

    const animate = () => {
      setState((prev) => {
        const newRotateX = lerp(
          prev.rotateX,
          prev.targetRotateX,
          config.lerpFactor
        )
        const newRotateY = lerp(
          prev.rotateY,
          prev.targetRotateY,
          config.lerpFactor
        )

        if (containerRef.current) {
          containerRef.current.style.transform = `rotateX(${newRotateX}deg) rotateY(${newRotateY}deg)`
        }

        return {
          ...prev,
          rotateX: newRotateX,
          rotateY: newRotateY,
        }
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrameId)
  }, [])

  // Hover ripple effect
  const handleLetterHover = (index: number) => {
    const letters = containerRef.current?.querySelectorAll('[data-letter]')
    if (!letters) return

    letters.forEach((letter, i) => {
      const distance = Math.abs(i - index)
      if (distance > 0 && distance <= config.neighborDistance) {
        letter.classList.add('neighbor')
      }
    })
  }

  const handleLetterUnhover = () => {
    const letters = containerRef.current?.querySelectorAll('[data-letter]')
    if (!letters) return

    letters.forEach((letter) => {
      letter.classList.remove('neighbor')
    })
  }

  const handleTouchStart = (index: number) => {
    handleLetterHover(index)
  }

  const handleTouchEnd = () => {
    setTimeout(() => {
      handleLetterUnhover()
    }, 500)
  }

  const letters = text.split('')

  return (
    <>
      <style>{`
        .about-3d-container {
          position: relative;
          display: inline-block;
          font-size: clamp(3rem, 12vw, 9rem);
          font-weight: normal;
          letter-spacing: -0.0615em;
          font-family: 'Instrument Serif', serif;
          transform-style: preserve-3d;
          will-change: transform;
          filter: drop-shadow(0 0 40px rgba(0, 207, 255, 0.3));
        }

        .about-3d-letter {
          display: inline-block;
          position: relative;
          transform-style: preserve-3d;
          will-change: transform;
          transition: all 200ms cubic-bezier(0.23, 1, 0.32, 1);
          cursor: pointer;
          user-select: none;
          color: #ffffff;
          text-shadow:
            1px 1px 0 #f5f0e8,
            2px 2px 0 rgba(255, 255, 255, 0.15),
            3px 3px 0 rgba(200, 200, 200, 0.4),
            4px 4px 0 rgba(180, 180, 180, 0.35),
            5px 5px 0 rgba(160, 160, 160, 0.3),
            6px 6px 0 rgba(140, 140, 140, 0.25),
            7px 7px 0 rgba(120, 120, 120, 0.2),
            8px 8px 0 rgba(100, 100, 100, 0.18),
            9px 9px 0 rgba(80, 80, 80, 0.16),
            10px 10px 0 rgba(60, 60, 60, 0.14),
            11px 11px 0 rgba(40, 40, 40, 0.12),
            12px 12px 0 rgba(20, 20, 20, 0.1),
            13px 13px 0 rgba(10, 10, 10, 0.08),
            14px 14px 0 rgba(0, 0, 0, 0.06),
            15px 15px 8px rgba(0, 0, 0, 0.5),
            16px 16px 12px rgba(0, 0, 0, 0.3);
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.08) 0%,
            transparent 60%
          );
          -webkit-background-clip: text;
          background-clip: text;
        }

        @keyframes about3DLetterEntrance {
          from {
            opacity: 0;
            transform: translateY(-120px) rotateX(90deg) scale(0.6);
          }
          to {
            opacity: 1;
            transform: translateY(0) rotateX(0deg) scale(1);
          }
        }

        @keyframes about3DScrollEntrance {
          from {
            opacity: 0;
            transform: translateZ(-100px) scale(0.5) rotateX(45deg) rotateY(45deg);
          }
          to {
            opacity: 1;
            transform: translateZ(0) scale(1) rotateX(0deg) rotateY(0deg);
          }
        }

        @keyframes about3DFloatLoop {
          0%, 100% {
            transform: translateY(0) rotateX(0deg) rotateY(0deg);
          }
          50% {
            transform: translateY(10px) rotateX(4deg) rotateY(3deg);
          }
        }

        .about-3d-wrapper {
          perspective: 800px;
          transform-style: preserve-3d;
          position: relative;
          padding: 40px;
          will-change: transform;
          opacity: 0;
          transform: translateZ(-100px) scale(0.5) rotateX(45deg) rotateY(45deg);
          transition: none;
        }

        .about-3d-wrapper.visible:not(.in-view) {
          opacity: 1;
          transform: translateZ(0) scale(1) rotateX(0deg) rotateY(0deg);
        }

        .about-3d-wrapper.in-view {
          animation: about3DScrollEntrance 900ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .about-3d-letter {
          animation: 
            about3DLetterEntrance 700ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards,
            about3DFloatLoop 4s ease-in-out 700ms infinite;
        }

        .about-3d-letter:hover {
          color: #00cfff;
          transform: scale(1.3) translateZ(40px) rotateY(15deg) !important;
          text-shadow:
            1px 1px 0 #00cfff,
            2px 2px 0 rgba(0, 207, 255, 0.25),
            3px 3px 0 rgba(0, 207, 255, 0.2),
            4px 4px 0 rgba(0, 207, 255, 0.15),
            5px 5px 0 rgba(0, 207, 255, 0.1),
            6px 6px 0 rgba(0, 207, 255, 0.08),
            7px 7px 0 rgba(0, 207, 255, 0.06),
            8px 8px 0 rgba(0, 207, 255, 0.04),
            9px 9px 8px rgba(0, 207, 255, 0.3),
            10px 10px 12px rgba(0, 207, 255, 0.2) !important;
          filter: drop-shadow(0 0 60px rgba(0, 207, 255, 0.5));
        }

        .about-3d-letter.neighbor {
          color: #ffffff;
          transform: scale(1.1) translateZ(20px) !important;
        }

        @media (max-width: 768px) {
          .about-3d-wrapper {
            padding: 20px;
          }
        }
      `}</style>

      <div 
        ref={wrapperRef}
        className={`about-3d-wrapper ${state.isVisible ? 'visible' : ''} ${state.shouldAnimate ? 'in-view' : ''}`}
      >
        <div className="about-3d-container" ref={containerRef}>
          {letters.map((char, index) => (
            <span
              key={index}
              data-letter
              className="about-3d-letter"
              style={{
                animationDelay: `${index * config.entranceDelay}ms, ${index * config.entranceDelay}ms`,
              }}
              onMouseEnter={() => handleLetterHover(index)}
              onMouseLeave={() => handleLetterUnhover()}
              onTouchStart={() => handleTouchStart(index)}
              onTouchEnd={() => handleTouchEnd()}
            >
              {char}
            </span>
          ))}
        </div>
      </div>
    </>
  )
}
