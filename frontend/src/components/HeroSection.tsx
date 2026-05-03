export function HeroSection() {
  return (
    <section className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 py-[90px] pt-2 pb-60">
      {/* Headline */}
      <h1
        className="text-5xl sm:text-7xl md:text-8xl leading-[0.95] max-w-7xl font-normal text-foreground animate-fade-rise"
        style={{
          fontFamily: "'Instrument Serif', serif",
          letterSpacing: '-0.0615em',
        }}
      >
        Where{' '}
        <em className="not-italic text-muted-foreground">dreams</em> rise{' '}
        <br className="hidden sm:block" />
        <em className="not-italic text-muted-foreground">
          through the silence.
        </em>
      </h1>
    </section>
  )
}
