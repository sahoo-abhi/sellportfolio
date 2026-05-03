import { AnimatedText } from './AnimatedText'
import { ContactButton } from './ContactButton'
import { About3DText } from './About3DText'
import { ScrollTriggeredImage } from './ScrollTriggeredImage'

const ABOUT_TEXT =
  "With more than five years of experience in design, i focus on branding, web design, and user experience, i truly enjoy working with businesses that aim to stand out and present their best image. Let's build something incredible together!"

export function AboutSection() {
  return (
    <section className="relative bg-[#0C0C0C] flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-12 font-kanit">
      {/* Top Icons - Moon and Lego */}
      <ScrollTriggeredImage
        src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
        alt="moon"
        imgClassName="w-[120px] sm:w-[160px] md:w-[210px]"
        positionClassName="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] z-0"
        delay={0}
        direction="left"
      />

      <ScrollTriggeredImage
        src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
        alt="lego"
        imgClassName="w-[120px] sm:w-[160px] md:w-[210px]"
        positionClassName="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] z-0"
        delay={80}
        direction="right"
      />

      {/* Bottom Icons - 3D Object and 3D Group */}
      <ScrollTriggeredImage
        src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
        alt="3d-object"
        imgClassName="w-[100px] sm:w-[140px] md:w-[180px]"
        positionClassName="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] z-0"
        delay={0}
        direction="left"
        triggerThreshold={0.7}
      />

      <ScrollTriggeredImage
        src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
        alt="3d-group"
        imgClassName="w-[130px] sm:w-[170px] md:w-[220px]"
        positionClassName="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] z-0"
        delay={80}
        direction="right"
        triggerThreshold={0.7}
      />

      {/* Heading + text */}
      <div className="relative z-10 flex flex-col items-center gap-6 sm:gap-8 md:gap-10 text-center">
        <About3DText text="About Me" />

        <AnimatedText
          text={ABOUT_TEXT}
          className="text-[#D7E2EA] font-medium leading-relaxed max-w-[560px]"
          style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
        />
      </div>

      {/* Contact button */}
      <div className="relative z-10 mt-8 sm:mt-10 md:mt-12">
        <ContactButton />
      </div>
    </section>
  )
}
