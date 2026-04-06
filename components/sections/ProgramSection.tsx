"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BookOpen, Compass, Briefcase, Globe, Sparkles } from "lucide-react";
import { Icon } from "../Icon";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const scrollToContato = () => {
  gsap.to(window, {
    duration: 1,
    scrollTo: "#contato",
    ease: "power2.out",
  });
};

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
const ProgramsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  useEffect(() => {
    if (sectionRef.current) {
      const heading = sectionRef.current.querySelector("h2");
      const subtitle = sectionRef.current.querySelector(".programs-subtitle");
      const text = sectionRef.current.querySelector(".programs-text");

      const coreCards = cardsRef.current.slice(0, 4);
      const premiumCard = cardsRef.current[4];

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
          text,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
          "-=0.2",
        );

      if (coreCards.length > 0) {
        tl.fromTo(
          coreCards,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.2",
        );
      }

      if (premiumCard) {
        tl.fromTo(
          premiumCard,
          { y: 50, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.2",
        );
      }
    }
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);
  const corePrograms = [
    {
      name: "English Essentials",
      desc: "Programa para quem quer aprender inglês, construir base sólida e destravar a fala com compreensão real do idioma.",
      target:
        "Ideal para quem deseja desenvolver vocabulário, entender estruturas e falar com mais confiança no dia a dia.",
      icon: <BookOpen className="w-6 h-6 text-blue" />,
      cta: "Quero saber mais",
    },
    {
      name: "Travel Essentials",
      desc: "Programa focado em inglês para viagem, com situações práticas e linguagem funcional para aeroporto, hotel, restaurante e interações reais.",
      target:
        "Ideal para quem quer viajar com mais autonomia, segurança e tranquilidade.",
      icon: <Compass className="w-6 h-6 text-blue" />,
      cta: "Quero saber mais",
    },
    {
      name: "Business Essentials",
      desc: "Programa voltado ao inglês profissional, com foco em vocabulário business, comunicação clara e situações reais de trabalho.",
      target:
        "Ideal para quem precisa do inglês para reuniões, calls, apresentações e ambiente profissional.",
      icon: <Briefcase className="w-6 h-6 text-blue" />,
      cta: "Quero saber mais",
    },
    {
      name: "Português para estrangeiros",
      desc: "Aulas personalizadas para desenvolver comunicação em português com mais clareza, segurança e aplicação prática no dia a dia.",
      target:
        "Ideal para estrangeiros que desejam se comunicar melhor no Brasil ou em contextos com falantes de português.",
      icon: <Globe className="w-6 h-6 text-blue" />,
      cta: "Quero saber mais",
    },
  ];
  const premiumProgram = {
    name: "Programa Personalizado",
    desc: "Um programa criado de acordo com a sua demanda, seu nível de inglês e o contexto em que você precisa se comunicar.",
    target:
      "Ideal para quem tem objetivos específicos, como inglês para trabalho, viagem, entrevistas, au pair, atendimento ao público ou qualquer necessidade real de comunicação.",
    icon: <Sparkles className="w-8 h-8 text-blue" />,
    cta: "Personalizar meu programa",
    href: "https://wa.me/558599474570",
  };
  return (
    <section
      id="programas"
      ref={sectionRef}
      className="section-container max-w-6xl mx-auto mt-40 mb-40 px-6"
    >
      <div className="programs-header text-center max-w-3xl mx-auto mb-20 space-y-6">
        <h2 className="text-4xl md:text-5xl text-blue font-serif font-semibold text-text">
          Programas
          <div className="programs-subtitle flex items-center justify-center relative top-2">
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
            <p className="text-xl font-serif text-muted-foreground ml-2 font-semibold">
              Programs
            </p>
          </div>
        </h2>
        <p className="programs-text text-muted-foreground text-lg leading-relaxed">
          Caminhos desenvolvidos para diferentes objetivos, sempre com foco em
          destravar a fala, compreender o idioma e aplicar o inglês na vida
          real.
        </p>
      </div>
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="grid md:grid-cols-2 gap-8">
          {corePrograms.map((program, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="bg-bg-[#171717]/80 p-10 rounded-[30px] border border-blue hover:border-blue/20 hover:shadow-2xl hover:shadow-blue/5 transition-all duration-500 group flex flex-col h-full"
            >
              <div className="w-14 h-14 bg-blue/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue/10 transition-transform duration-500">
                {program.icon}
              </div>
              <h3 className="text-2xl font-serif text-blue font-bold text-text mb-4">
                {program.name}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-8 flex-grow">
                {program.desc}
              </p>
              <div className="pt-6 border-t border-muted-foreground mt-auto">
                <span className="block text-[10px] uppercase tracking-widest font-bold text-blue mb-3">
                  Para quem serve
                </span>
                <p className="text-sm text-muted-foreground font-medium leading-relaxed mb-8">
                  {program.target}
                </p>
                <button
                  onClick={scrollToContato}
                  className="w-full py-4 border text-blue border-blue text-text rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-blue hover:border-blue hover:text-muted-foreground transition-colors duration-300"
                >
                  {program.cta}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div
          ref={(el) => {
            if (el) cardsRef.current[corePrograms.length] = el;
          }}
          className="bg-[#171717] text-muted-foreground p-8 md:p-16 rounded-[40px] shadow-2xl relative overflow-hidden group mt-16 md:mt-24 border border-zinc-800"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue/10 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row gap-8 md:gap-12 items-center text-center md:text-left">
            <div className="flex-grow flex flex-col items-center md:items-start space-y-6">
              <div className="w-16 h-16 bg-blue/20 rounded-2xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-500">
                {premiumProgram.icon}
              </div>
              <h3 className="text-3xl md:text-4xl font-serif font-bold italic text-white flex items-center gap-3">
                {premiumProgram.name}
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
                {premiumProgram.desc}
              </p>
            </div>

            <div className="w-full md:w-auto flex-shrink-0 mt-4 md:mt-0">
              <a
                href={premiumProgram.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full md:w-auto px-6 md:px-10 py-5 bg-blue text-white rounded-full text-xs md:text-sm font-bold uppercase tracking-widest hover:bg-blue/80 hover:shadow-xl hover:shadow-blue/20 transition-all duration-300 active:scale-95 whitespace-normal md:whitespace-nowrap leading-relaxed text-center"
              >
                {premiumProgram.cta}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ProgramsSection;
