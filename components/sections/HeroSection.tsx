import Image from "next/image";
import ProfileImageSource from "@/public/ProfileImage.png";
import { BackgroundRippleEffect } from "../ui/background-ripple-effect";
import TextFlip from "../ui/layout-text-flip";
import Link from "next/link";

function HeroSection() {
  const profile = {
    firstName: "Ana",
    lastName: "Alexandria",
    words: ["comunicação", "mente"],
    description: `Ajudo brasileiros a aprender inglês de forma mais humana,
                  estratégica e funcional, com um método que reduz bloqueios,
                  fortalece a confiança para falar e desenvolve compreensão real
                  do idioma para situações do dia a dia, viagem, trabalho e
                  objetivos específicos.`,
    university: "Williams Baptist University • Experiência Internacional",
    tags: "Psicologia • Neuroaprendizado • Comunicação",
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-6 pt-32 0 pb-0 overflow-hidden"
    >
      <BackgroundRippleEffect rows={8} cols={27} cellSize={56} />

      <div className="relative z-10 container mx-auto max-w-6xl">
        <div className="@container">
          <div className="grid grid-cols-1 @3xl:grid-cols-2 gap-8 @lg:gap-12 items-center">
            {/* Text Content */}
            <div className="@container/hero space-y-4 @md/hero:space-y-6">
              <h1 className="text-5xl md:text-7xl leading-[1.1] font-semibold font-serif text-rose">
                Destrave sua{" "}
                <TextFlip
                  words={profile.words}
                  className="text-rose italic"
                />{" "}
              </h1>

              <p className="text-base @md/hero:text-lg text-muted-foreground leading-relaxed">
                {profile.description}
              </p>

              <div className="relative lg:top-7 div_social icons_hero flex flex-wrap gap-4">
                <Link
                  href="https://www.instagram.com/pfc.mindset/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 @md/hero:px-6 @md/hero:py-3 rounded-lg hover:bg-accent text-rose bg-[rgba(183,94,203,0.1)] border-[1px] border-solid border-[rgba(160,75,129,0.5)] transition-colors text-sm @md/hero:text-base button_social"
                >
                  Instagram
                </Link>
                <Link
                  href="https://wa.me/+558599474570"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 @md/hero:px-6 @md/hero:py-3 rounded-lg hover:bg-accent text-rose bg-[rgba(183,94,203,0.1)] border-[1px] border-solid border-[rgba(160,75,129,0.5)] transition-colors text-sm @md/hero:text-base button_social"
                >
                  Fale Comigo
                </Link>
                <Link
                  href="#programas"
                  rel="noopener noreferrer"
                  className="px-4 py-2 @md/hero:px-6 @md/hero:py-3 rounded-lg hover:bg-accent text-rose bg-[rgba(183,94,203,0.1)] border-[1px] border-solid border-[rgba(160,75,129,0.5)] transition-colors text-sm @md/hero:text-base button_social"
                >
                  Ver Programas
                </Link>
              </div>

              <div className="pt-8 relative left-2 top-2 flex items-center gap-4 text-sm text-green authority_green">
                <span className="font-semibold text-green">
                  {profile.firstName} {profile.lastName}
                </span>
                <span className="w-8 h-px bg-green/30" />
                <span>{profile.university}</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green/10 rounded-xl flex items-center justify-center green_icon">
                  <div className="w-3 h-3 bg-green rounded-full animate-pulse" />
                </div>
                <span className="uppercase tracking-[0.2em] text-xs font-bold text-green">
                  {profile.tags}
                </span>
              </div>
            </div>

            <div className="relative flex justify-center items-center">
              <Image
                src={ProfileImageSource}
                alt={`${profile.firstName} ${profile.lastName}`}
                width={600}
                height={600}
                priority
                className="rounded-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
