import { useEffect, useRef } from 'react'
import { ArrowRight, Mail, Share2, Globe } from 'lucide-react'
import './CinematicHero.css'

export function CinematicHero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const fadingOutRef = useRef(false)
  const rafRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    const video = videoRef.current
    if (!video) {
      console.warn('Video element not found')
      return
    }

    // Initial fade-in on load
    const fadeIn = (startOpacity: number = 0) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      const startTime = Date.now()
      const duration = 500

      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        video.style.opacity = String(startOpacity + (1 - startOpacity) * progress)

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(animate)
        }
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    // Fade out before video ends
    const fadeOut = () => {
      if (fadingOutRef.current) return
      fadingOutRef.current = true

      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      const startTime = Date.now()
      const startOpacity = parseFloat(video.style.opacity || '1')
      const duration = 500

      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        video.style.opacity = String(startOpacity * (1 - progress))

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(animate)
        }
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    const handleTimeUpdate = () => {
      const timeRemaining = video.duration - video.currentTime
      if (timeRemaining <= 0.55 && !fadingOutRef.current) {
        fadeOut()
      }
    }

    const handleEnded = () => {
      video.style.opacity = '0'
      setTimeout(() => {
        video.currentTime = 0
        video.play()
        fadingOutRef.current = false
        fadeIn(0)
      }, 100)
    }

    // Start with fade-in
    video.style.opacity = '0'
    
    const startPlayback = () => {
      video.play().catch(err => {
        console.warn('Video autoplay failed:', err)
      }).then(() => {
        fadeIn(0)
      })
    }

    // Wait for canplay if video isn't ready
    if (video.readyState >= 2) {
      startPlayback()
    } else {
      video.addEventListener('canplay', startPlayback, { once: true })
    }

    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('ended', handleEnded)

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('ended', handleEnded)
      video.removeEventListener('canplay', startPlayback)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div className="min-h-screen bg-black overflow-hidden relative flex flex-col pt-20">
      {/* Background Video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover translate-y-[17%]"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_115001_bcdaa3b4-03de-47e7-ad63-ae3e392c32d4.mp4"
        muted
        loop={false}
        playsInline
      />

      {/* Hero Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12 text-center -translate-y-[20%]">
        <h1
          className="text-5xl md:text-6xl lg:text-7xl text-white mb-8 tracking-tight whitespace-nowrap"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Let's Connect!
        </h1>

        {/* Email Input & Subtitle */}
        <div className="max-w-xl w-full space-y-4">
          {/* Name Input */}
          <div className="liquid-glass rounded-full pl-6 pr-6 py-3 flex items-center">
            <input
              type="text"
              placeholder="Your name"
              className="flex-1 bg-transparent text-white placeholder:text-white/40 text-base outline-none"
            />
          </div>

          {/* Email Input */}
          <div className="liquid-glass rounded-full pl-6 pr-6 py-3 flex items-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-transparent text-white placeholder:text-white/40 text-base outline-none"
            />
          </div>

          {/* Message Input */}
          <div className="liquid-glass rounded-2xl pl-6 pr-6 py-3 flex items-center">
            <textarea
              placeholder="Your message"
              className="flex-1 bg-transparent text-white placeholder:text-white/40 text-base outline-none resize-none h-24"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-2">
            <button className="liquid-glass rounded-full px-8 py-3 text-white text-sm font-medium hover:bg-white/5 transition-colors flex items-center gap-2">
              Send Message
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Social Icons Footer */}
      <div className="relative z-10 flex justify-center gap-4 pb-12">
        <a
          href="mailto:contact@asme.com"
          aria-label="Email"
          className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all"
        >
          <Mail size={20} />
        </a>
        <a
          href="#"
          aria-label="Share"
          className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all"
        >
          <Share2 size={20} />
        </a>
        <a
          href="#"
          aria-label="Website"
          className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all"
        >
          <Globe size={20} />
        </a>
      </div>
    </div>
  )
}
