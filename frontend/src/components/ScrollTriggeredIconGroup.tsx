import { useEffect, useRef } from 'react'

interface IconConfig {
  src: string
  alt: string
  imgClassName: string
  positionClassName: string
  direction?: 'left' | 'right'
  delay?: number
}

interface ScrollTriggeredIconGroupProps {
  icons: IconConfig[]
  triggerThreshold?: number
}

export function ScrollTriggeredIconGroup({
  icons,
  triggerThreshold = 0.3,
}: ScrollTriggeredIconGroupProps) {
  const iconRefs = useRef<(HTMLDivElement | null)[]>([])
  const triggerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Animate all icons when trigger point comes into view
          iconRefs.current.forEach((icon) => {
            if (icon) {
              icon.classList.add('scroll-animate-in')
            }
          })
        } else {
          // Reset animations when scrolling away
          iconRefs.current.forEach((icon) => {
            if (icon) {
              icon.classList.remove('scroll-animate-in')
            }
          })
        }
      },
      { threshold: triggerThreshold }
    )

    if (triggerRef.current) {
      observer.observe(triggerRef.current)
    }

    return () => observer.disconnect()
  }, [triggerThreshold])

  const baseStyles = `
    .scroll-trigger-icon-item {
      opacity: 0;
      transform: translateX(0);
      transition: none;
    }

    .scroll-trigger-icon-item.scroll-animate-in {
      animation: scrollIconSlideIn 800ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    }

    @keyframes scrollIconSlideIn {
      from {
        opacity: 0;
        transform: var(--icon-slide-transform);
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
      <div ref={triggerRef} style={{ position: 'absolute', width: '1px', height: '1px', pointerEvents: 'none' }} />
      {icons.map((icon, index) => (
        <div
          key={index}
          ref={(el) => {
            iconRefs.current[index] = el
          }}
          className={`scroll-trigger-icon-item ${icon.positionClassName}`}
          style={{
            '--icon-slide-transform':
              icon.direction === 'right' ? 'translateX(80px)' : 'translateX(-80px)',
            animationDelay: `${(icon.delay || 0) + index * 80}ms`,
          } as React.CSSProperties & { '--icon-slide-transform': string }}
        >
          <img src={icon.src} alt={icon.alt} className={icon.imgClassName} />
        </div>
      ))}
    </>
  )
}
