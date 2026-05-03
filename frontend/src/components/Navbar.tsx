import { cn } from '../lib/utils'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export function Navbar() {
  return (
    <nav className="relative z-10 w-full">
      <div className="flex flex-row justify-between items-center px-8 py-6 max-w-7xl mx-auto w-full">
        {/* Logo */}
        <div
          className="text-3xl tracking-tight text-foreground select-none"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Atisheel
        </div>

        {/* Nav links — hidden on mobile */}
        <div className="hidden md:flex flex-row items-center gap-7">
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className={cn(
                'text-2xl transition-colors duration-200 text-muted-foreground hover:text-foreground',
              )}
              style={{ fontFamily: "'Instrument Serif', serif", letterSpacing: '-0.0615em' }}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
