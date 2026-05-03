import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import './ServicesSection.css'

const SERVICES = [
  {
    num: '01',
    name: '3D Modeling',
    desc: 'Creation of detailed objects, characters, or environments tailored to specific client needs, ideal for games, products, and visualizations.',
  },
  {
    num: '02',
    name: 'Rendering',
    desc: 'High-quality, photorealistic renders that showcase designs with custom lighting, textures, and materials to bring concepts to life.',
  },
  {
    num: '03',
    name: 'Motion Design',
    desc: 'Dynamic animations and motion graphics that add energy and storytelling to brands, products, and digital experiences.',
  },
  {
    num: '04',
    name: 'Branding',
    desc: 'Crafting cohesive visual identities — from logos to full brand systems — that communicate a clear and memorable presence.',
  },
  {
    num: '05',
    name: 'Web Design',
    desc: 'Designing clean, modern, and conversion-focused websites with attention to layout, typography, and user experience.',
  },
]

export function ServicesSection() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const bgOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 0.02])
  const titleScale = useTransform(scrollYProgress, [0, 0.15], [1, 1.05])
  const titleY = useTransform(scrollYProgress, [0, 0.15], [0, -20])

  // Letter-by-letter animation
  const headingText = 'Services'
  const letters = headingText.split('')

  return (
    <section
      ref={containerRef}
      className="services-section bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 relative overflow-hidden"
    >
      {/* Animated background glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(12, 12, 12, 0.05) 0%, transparent 70%)',
          opacity: bgOpacity,
        }}
      />

      <motion.div style={{ scale: titleScale, y: titleY }}>
        <div
          className="font-normal uppercase text-center leading-none tracking-tight text-[#0C0C0C] mb-16 sm:mb-20 md:mb-28 flex justify-center flex-wrap"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)', fontFamily: "'Instrument Serif', serif" }}
        >
          {letters.map((letter, i) => {
            const letterProgress = useTransform(
              scrollYProgress,
              [0.02 + i * 0.01, 0.15 + i * 0.01],
              [0, 1]
            )
            return (
              <motion.span
                key={i}
                style={{
                  opacity: letterProgress,
                  x: useTransform(letterProgress, [0, 1], [-50, 0]),
                }}
                className="inline-block"
              >
                {letter}
              </motion.span>
            )
          })}
        </div>
      </motion.div>

      <div className="max-w-5xl mx-auto perspective">
        {SERVICES.map(({ num, name, desc }, i) => {
          const offset = i * 0.18
          const rotateX = useTransform(
            scrollYProgress,
            [offset, offset + 0.25],
            [50, 0]
          )
          const y = useTransform(
            scrollYProgress,
            [offset, offset + 0.25],
            [-40 - i * 15, 0]
          )
          const opacity = useTransform(
            scrollYProgress,
            [Math.max(0, offset - 0.05), offset + 0.15],
            [0, 1]
          )
          const zIndex = useTransform(
            scrollYProgress,
            [offset, offset + 0.1],
            [SERVICES.length - i, 0]
          )

          // Additional scroll animations
          const numScale = useTransform(
            scrollYProgress,
            [offset, offset + 0.25],
            [0.7, 1]
          )
          const numRotate = useTransform(
            scrollYProgress,
            [offset, offset + 0.25],
            [-10, 0]
          )
          const descX = useTransform(
            scrollYProgress,
            [offset - 0.05, offset + 0.25],
            [30, 0]
          )
          return (
            <motion.div
              key={num}
              style={{
                rotateX,
                y,
                opacity,
                zIndex: zIndex as any,
                transformPerspective: 1200,
                originY: 0,
              }}
              className="will-change-transform relative"
            >
              <motion.div
                className="flex flex-row items-start gap-4 sm:gap-6 md:gap-8 py-8 sm:py-10 md:py-12"
              >
                {/* Number */}
                <motion.span
                  className="font-black text-[#0C0C0C] leading-none shrink-0"
                  style={{
                    fontSize: 'clamp(3rem, 10vw, 140px)',
                    scale: numScale,
                    rotate: numRotate,
                  }}
                >
                  {num}
                </motion.span>

                {/* Name + desc */}
                <motion.div
                  className="flex flex-col justify-center gap-2 pt-1 sm:pt-2 md:pt-3"
                  style={{ x: descX }}
                >
                  <motion.p
                    className="font-medium uppercase text-[#0C0C0C]"
                    style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '50px' }}
                    transition={{ delay: 0.1, duration: 0.6 }}
                  >
                    {name}
                  </motion.p>
                  <motion.p
                    className="font-light leading-relaxed max-w-2xl text-[#0C0C0C]"
                    style={{
                      fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)',
                      opacity: 0.6,
                    }}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 0.6, y: 0 }}
                    viewport={{ once: true, margin: '50px' }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                  >
                    {desc}
                  </motion.p>
                </motion.div>
              </motion.div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
