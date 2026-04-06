"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import anaPortrait from "@/public/ana.png";
import { Icon } from "../Icon";
const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }
    if (sectionRef.current) {
      const heading = sectionRef.current.querySelector("h2");
      const subtitle = sectionRef.current.querySelector(".subtitle-container");
      const paragraphs = sectionRef.current.querySelectorAll("p.sobre-texto");
      const imageWrapper = sectionRef.current.querySelector(".image-wrapper");
      const footerArea = sectionRef.current.querySelector(".footer-area");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      if (imageWrapper) {
        gsap.fromTo(
          imageWrapper,
          { x: -60, opacity: 0, scale: 0.95 },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 1.4,
            ease: "power3.out",
            scrollTrigger: {
              trigger: imageWrapper,
              start: "top 80%",
            },
          },
        );
      }

      tl.fromTo(
        heading,
        { x: 40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      )
        .fromTo(
          subtitle,
          { x: 40, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
          "-=0.4",
        )

        .fromTo(
          paragraphs,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.2, ease: "power2.out" },
          "-=0.2",
        )

        .fromTo(
          footerArea,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
          "-=0.2",
        );
    }
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);
  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-container overflow-hidden pt-5 pb-20 px-6 mb-20"
    >
      <div className="grid md:grid-cols-2 gap-20 items-center mx-auto max-w-6xl">
        <div className="relative image-wrapper">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-green/5 rounded-full blur-3xl transition-opacity animate-pulse" />
          <div className="rounded-[20px] overflow-hidden shadow-2xl relative z-10 aspect-4/5">
            <img
              src={
                typeof anaPortrait === "string"
                  ? anaPortrait
                  : (anaPortrait as any).src
              }
              alt="Ana Alexandria"
              className="w-full h-full object-[center_60%] object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-semibold text-green">
            Sobre Ana Alexandria
            <Icon
              src="/flor-de-lotus.png"
              alt="Disponibilidade"
              className="w-8 h-8 inline-block relative -right-[7px] -top-[1.7px] ml-2 dark:hidden responsive_icon"
            />
            <Icon
              src="/flor-de-lotus.png"
              alt="Disponibilidade"
              className="w-8 h-8 hidden relative -right-[7px] -top-[1.7px] dark:inline-block ml-2 responsive_icon"
            />
          </h2>

          <div className="subtitle-container flex items-center justify-center">
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
            <p className="sobre-texto text-xl font-serif text-muted-foreground ml-2 font-semibold">
              Get To Know Me Better
            </p>
          </div>
          <div className="space-y-8 mt-4">
            <p className="sobre-texto text-muted-foreground text-lg leading-relaxed pt-4">
              Sou <span className="font-bold text-text">Ana Alexandria,</span>{" "}
              formada em Psicologia nos Estados Unidos, com inglês fluente,
              experiência internacional e atuação voltada ao ensino de idiomas
              com uma abordagem mais humana, estratégica e funcional.
            </p>
            <p className="sobre-texto text-muted-foreground text-lg leading-relaxed pt-4">
              Desenvolvi o{" "}
              <span className="font-bold text-text">Método PFC </span>
              para ajudar alunos a destravarem a fala, compreenderem melhor o
              idioma e aprenderem com mais segurança e aplicação real. Meu
              trabalho integra{" "}
              <span className="font-bold text-text">
                psicologia, neuroaprendizagem e comunicação
              </span>{" "}
              para tornar o aprendizado mais claro, mais confortável e mais
              eficiente de acordo com a necessidade de cada pessoa.
            </p>
            <p className="sobre-texto text-muted-foreground text-lg leading-relaxed italic border-l-4 border-green/30 pl-4 text-left/md:text-center shadow-sm py-2">
              "Acredito que falar uma nova língua não é apenas sobre
              vocabulário, mas sobre encontrar sua própria voz em qualquer
              contexto. Meu propósito é ajudar você a destravar esse potencial
              com técnica, ciência e humanidade."
            </p>
            <div className="footer-area pt-8 border-t border-muted-foreground/30 flex items-center gap-6">
              <div className="w-12 h-12 rounded-full border-2 border-green/20 flex items-center justify-center font-serif text-green font-bold bg-green/5 shadow-inner">
                AA
              </div>
              <div className="space-y-1 text-left">
                <span className="block font-bold text-green tracking-wide">
                  Ana Alexandria
                </span>
                <span className="block text-xs uppercase tracking-widest text-gray-400 font-bold">
                  Fundadora do Método PFC
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default AboutSection;
