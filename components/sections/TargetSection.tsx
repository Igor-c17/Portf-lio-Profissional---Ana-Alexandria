"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { Icon } from "../Icon";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Profile {
  title: string;
  desc: string;
}
const TargetSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    if (sectionRef.current) {
      const heading = sectionRef.current.querySelector("h2");
      const subtitle = sectionRef.current.querySelector(".target-subtitle");
      const textParam = sectionRef.current.querySelector(".target-text");
      const cards = sectionRef.current.querySelectorAll(".audience-card");
      // Timeline mestre!
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      tl.fromTo(
        heading,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      )

        .fromTo(
          subtitle,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
          "-=0.4",
        )

        .fromTo(
          textParam,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
          "-=0.2",
        );

      if (cards.length > 0) {
        tl.fromTo(
          cards,
          { x: -30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            stagger: 0.2,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.1",
        );
      }
    }
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);
  const profiles: Profile[] = [
    {
      title: "Para quem sente bloqueio ou insegurança para falar inglês",
      desc: "Destrave sua fala com um método que prioriza a confiança e elimina o medo de errar.",
    },
    {
      title: "Para quem deseja inglês para viagem",
      desc: "Domine diálogos práticos e situações essenciais para viajar pelo mundo com autonomia.",
    },
    {
      title: "Para quem quer aprender com mais compreensão e menos pressão",
      desc: "Aprenda de forma leve e natural, respeitando seu ritmo e focando na absorção real.",
    },
    {
      title:
        "Para quem busca um programa mais humano, estratégico e personalizado",
      desc: "Planejamento estratégico e suporte humanizado focado exclusivamente nos seus objetivos.",
    },
    {
      title: "Para quem deseja inglês para viagem",
      desc: "Inicie seus estudos de forma direta e assertiva, com foco total na sua meta específica.",
    },
    {
      title: "Para quem quer começar do zero com um objetivo específico",
      desc: "Ascensão profissional com foco em reuniões, apresentações e networking internacional.",
    },
  ];
  return (
    <section
      ref={sectionRef}
      className="section-container mb-40 px-6 overflow-hidden"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col mx-auto text-center items-center justify-between mb-16">
          <div className="max-w-3xl mx-auto text-center items-center">
            <h2 className="text-rose text-3xl md:text-5xl font-serif font-semibold mb-6">
              Para Quem É Este Trabalho?
              <div className="target-subtitle flex items-center justify-center relative top-2">
                <Icon
                  src="/translate.png"
                  alt="Disponibilidade"
                  className="w-5.75 h-5.75 relative left-1 dark:hidden"
                />
                <Icon
                  src="/translate_white.png"
                  alt="Disponibilidade"
                  className="w-5.75 h-5.75 relative left-1 hidden dark:inline-block"
                />
                <p className="text-xl text-muted-foreground ml-2 font-semibold">
                  Who Is This Work Intended For?
                </p>
              </div>
            </h2>
            <p className="target-text text-muted-foreground text-lg">
              Esse trabalho é para quem quer aprender inglês com mais segurança,
              destravar a fala e desenvolver comunicação real de acordo com a
              própria necessidade.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 w-full">
          {profiles.map((profile, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="audience-card group relative dark:bg-[#171717]/80 border border-[#893e70]/20 p-6 md:p-10 rounded-3xl flex flex-col sm:flex-row items-start gap-6 sm:gap-4 sm:justify-between transition-all duration-500 hover:border-[#893e70]/30 hover:shadow-xl hover:shadow-[#893e70]/5"
            >
              <div className="space-y-4 flex-1">
                <h3 className="text-rose text-xl md:text-2xl font-bold group-hover:text-[#893e70] transition-colors leading-tight">
                  {profile.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed max-w-md">
                  {profile.desc}
                </p>
              </div>
              <div className="w-10 h-10 shrink-0 rounded-full text-rose border border-[#893e70]/30 flex items-center justify-center group-hover:bg-[#893e70] group-hover:border-[#893e70] group-hover:text-white transition-all duration-300">
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default TargetSection;
