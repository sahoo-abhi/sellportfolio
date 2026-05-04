
import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, cubicBezier } from 'framer-motion'

const PROJECTS = [
  {
    num: '01',
    category: 'Client',
    name: 'Nextlevel Studio',
    col1: [
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85',
    ],
    col2: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85',
  },
  {
    num: '02',
    category: 'Personal',
    name: 'Aura Brand Identity',
    col1: [
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85',
    ],
    col2: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85',
  },
  {
    num: '03',
    category: 'Client',
    name: 'Solaris Digital',
    col1: [
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85',
    ],
    col2: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85',
  },
]

const TOTAL = PROJECTS.length

function ProjectCard({
  project,
  index,
  containerProgress,
}: {
  project: (typeof PROJECTS)[0]
  index: number
  containerProgress: ReturnType<typeof useScroll>['scrollYProgress']
}) {
  const [isHovered, setIsHovered] = useState(false)
  
  const targetScale = 1 - (TOTAL - 1 - index) * 0.03
  const scale = useTransform(
    containerProgress,
    [index / TOTAL, 1],
    [1, targetScale],
  )

  // Scroll-based animations
  const cardOpacity = useTransform(
    containerProgress,
    [Math.max(0, index / TOTAL - 0.15), index / TOTAL + 0.1],
    [0.6, 1]
  )

  const cardY = useTransform(
    containerProgress,
    [Math.max(0, index / TOTAL - 0.1), index / TOTAL + 0.1],
    [50, 0]
  )

  const numberRotate = useTransform(
    containerProgress,
    [index / TOTAL, index / TOTAL + 0.2],
    [-15, 0]
  )

  const numberScale = useTransform(
    containerProgress,
    [Math.max(0, index / TOTAL - 0.1), index / TOTAL + 0.1],
    [0.8, 1]
  )

  const textX = useTransform(
    containerProgress,
    [Math.max(0, index / TOTAL - 0.1), index / TOTAL + 0.15],
    [40, 0]
  )

  const imgRadius = 'clamp(24px, 3.5vw, 60px)'

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: cubicBezier(0.25, 0.1, 0.25, 1),
      },
    }),
  }

  return (
    <div className="h-[85vh] flex items-start justify-center" style={{ paddingTop: `${index * 28}px` }}>
      <motion.div
        className="sticky top-24 md:top-32 w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 origin-top shadow-2xl"
        style={{ scale, opacity: cardOpacity, y: cardY }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Top row */}
        <motion.div 
          className="flex flex-wrap items-center justify-between gap-3 mb-4 sm:mb-6"
          style={{ x: textX }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <div className="flex items-baseline gap-3 sm:gap-4">
            <motion.span
              className="font-black text-[#D7E2EA] leading-none font-kanit"
              style={{ 
                fontSize: 'clamp(2.5rem, 8vw, 120px)',
                rotate: numberRotate,
                scale: numberScale,
              }}
            >
              {project.num}
            </motion.span>
            <motion.div 
              className="flex flex-col"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span
                className="text-[#D7E2EA] opacity-50 uppercase tracking-widest font-kanit"
                style={{ fontSize: 'clamp(0.65rem, 1vw, 0.9rem)' }}
              >
                {project.category}
              </span>
              <span
                className="text-[#D7E2EA] font-medium uppercase font-kanit"
                style={{ fontSize: 'clamp(1rem, 2.5vw, 2rem)' }}
              >
                {project.name}
              </span>
            </motion.div>
          </div>

          <motion.button 
            className="rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base font-kanit transition-all duration-300"
            whileHover={{ 
              backgroundColor: 'rgba(215, 226, 234, 0.15)',
              scale: 1.05,
              borderColor: 'rgba(215, 226, 234, 0.8)',
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Live Project
          </motion.button>
        </motion.div>

        {/* Image grid */}
        <motion.div 
          className="flex gap-3 sm:gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Left col — 40% */}
          <div className="flex flex-col gap-3 sm:gap-4" style={{ width: '40%' }}>
            <motion.div 
              className="relative overflow-hidden"
              style={{
                height: 'clamp(130px, 16vw, 230px)',
              }}
              variants={imageVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
            >
              <motion.img
                src={project.col1[0]}
                alt=""
                className="w-full h-full object-cover"
                style={{
                  borderRadius: imgRadius,
                }}
                whileHover={{ scale: isHovered ? 1.08 : 1 }}
                transition={{ duration: 0.4, ease: cubicBezier(0.25, 0.1, 0.25, 1) }}
              />
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, rgba(215, 226, 234, 0.1) 0%, transparent 100%)',
                  borderRadius: imgRadius,
                }}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
            
            <motion.div 
              className="relative overflow-hidden"
              style={{
                height: 'clamp(160px, 22vw, 340px)',
              }}
              variants={imageVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
            >
              <motion.img
                src={project.col1[1]}
                alt=""
                className="w-full h-full object-cover"
                style={{
                  borderRadius: imgRadius,
                }}
                whileHover={{ scale: isHovered ? 1.08 : 1 }}
                transition={{ duration: 0.4, ease: cubicBezier(0.25, 0.1, 0.25, 1) }}
              />
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, rgba(215, 226, 234, 0.1) 0%, transparent 100%)',
                  borderRadius: imgRadius,
                }}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </div>

          {/* Right col — 60% */}
          <motion.div 
            style={{ width: '60%' }}
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
          >
            <div className="relative overflow-hidden"
              style={{
                height: 'clamp(310px, 39vw, 590px)',
              }}
            >
              <motion.img
                src={project.col2}
                alt=""
                className="w-full h-full object-cover"
                style={{
                  borderRadius: imgRadius,
                }}
                whileHover={{ scale: isHovered ? 1.08 : 1 }}
                transition={{ duration: 0.4, ease: cubicBezier(0.25, 0.1, 0.25, 1) }}
              />
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, rgba(215, 226, 234, 0.1) 0%, transparent 100%)',
                  borderRadius: imgRadius,
                }}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const titleScale = useTransform(scrollYProgress, [0, 0.1], [1, 1.08])
  const titleY = useTransform(scrollYProgress, [0, 0.1], [0, -30])
  const bgOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 0.05])

  // Letter-by-letter animation for heading
  const headingText = 'Project'
  const letters = headingText.split('')

  return (
    <section
      ref={sectionRef}
      className="bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-10 px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-20 font-kanit overflow-hidden"
    >
      {/* Animated background glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(215, 226, 234, 0.08) 0%, transparent 70%)',
          opacity: bgOpacity,
        }}
      />

      <motion.div style={{ scale: titleScale, y: titleY }}>
        <div
          className="font-black uppercase text-center leading-none tracking-tight mb-16 sm:mb-20 md:mb-24 flex justify-center flex-wrap"
          style={{ 
            fontSize: 'clamp(3rem, 12vw, 160px)',
            fontFamily: "'Instrument Serif', serif",
            letterSpacing: '-0.0615em',
          }}
        >
          {letters.map((letter, i) => {
            const letterProgress = useTransform(
              sectionProgress,
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

      <div ref={containerRef} className="relative">
        {PROJECTS.map((project, i) => (
          <ProjectCard
            key={project.num}
            project={project}
            index={i}
            containerProgress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  )
}
