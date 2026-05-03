import { useEffect, useRef, useMemo } from 'react'

interface ScrollTriggeredImageProps {
  src: string
  alt: string
  imgClassName: string
  positionClassName: string
  delay?: number
  direction?: 'left' | 'right'
  triggerThreshold?: number
}

export function ScrollTriggeredImage({
  src,
  alt,
  imgClassName,
  positionClassName,
  delay = 0,
  direction = 'left',
  triggerThreshold = 0.3,
}: ScrollTriggeredImageProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const uniqueId = useMemo(() => Math.random().toString(36).substr(2, 9), [])
  const className = `scroll-trigger-${uniqueId}`

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('scroll-animate-in')
        } else {
          entry.target.classList.remove('scroll-animate-in')
        }
      },
      { threshold: triggerThreshold }
    )

    if (wrapperRef.current) {
      observer.observe(wrapperRef.current)
    }

    return () => observer.disconnect()
  }, [triggerThreshold])

  const baseStyles = `
    .${className} {
      opacity: 0;
      transform: ${direction === 'left' ? 'translateX(-80px)' : 'translateX(80px)'};
      transition: none;
    }

    .${className}.scroll-animate-in {
      animation: scrollIconSlideIn-${uniqueId} 800ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
      animation-delay: ${delay}ms;
    }

    @keyframes scrollIconSlideIn-${uniqueId} {
      from {
        opacity: 0;
        transform: ${direction === 'left' ? 'translateX(-80px)' : 'translateX(80px)'};
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
  `

  return (
    <>
      <style>{baseStyles}</style>
      <div ref={wrapperRef} className={`${className} ${positionClassName}`}>
        <img src={src} alt={alt} className={imgClassName} />
      </div>
    </>
  )
}
