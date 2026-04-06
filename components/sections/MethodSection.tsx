"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Brain, Heart, MessageCircle, Lightbulb } from "lucide-react";
import { Icon } from "../Icon";
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
const MethodSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    if (sectionRef.current) {
      const heading = sectionRef.current.querySelector("h2");
      const subtitle = sectionRef.current.querySelector(".method-subtitle");
      const paragraphs = sectionRef.current.querySelectorAll(".method-text");
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
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
          "-=0.4",
        )

        .fromTo(
          paragraphs,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.2, ease: "power2.out" },
          "-=0.2",
        )

        .fromTo(
          cardsRef.current,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.2,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.2",
        );
    }
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);
  const pilares = [
    {
      title: "Aprendizagem personalizada",
      desc: "Cada processo é ajustado de acordo com o nível do aluno, sua demanda e o contexto em que ele precisa usar o inglês.",
      icon: <Heart className="w-6 h-6 text-blue" />,
    },
    {
      title: "Prática guiada com aplicação real",
      desc: "As aulas trabalham conversações reais, vocabulário funcional, situações do cotidiano e prática direcionada.",
      icon: <Brain className="w-6 h-6 text-blue" />,
    },
    {
      title: "Destravamento da fala",
      desc: "O método foi criado para ajudar o aluno a sair do bloqueio e desenvolver mais confiança para se comunicar em inglês.",
      icon: <MessageCircle className="w-6 h-6 text-blue" />,
    },
    {
      title: "Compreensão real do idioma",
      desc: "Mais do que decorar frases, o aluno aprende a entender estruturas, vocabulário e funcionamento da língua.",
      icon: <Lightbulb className="w-6 h-6 text-blue" />,
    },
  ];
  return (
    <section
      id="metodo"
      ref={sectionRef}
      className="section-container mx-auto max-w-6xl mb-40 px-6"
    >
      <div className="text-center gap-20 items-center container  mb-20">
        <h2 className="text-4xl md:text-5xl font-serif font-semibold mb-6 text-blue">
          O Método PFC
          <div className="method-subtitle flex items-center justify-center relative top-2">
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
              The PFC Method
            </p>
          </div>
        </h2>
        <p className="method-text text-muted-foreground text-lg">
          O Método PFC foi desenvolvido para ajudar pessoas a aprender inglês
          com mais confiança, compreensão e fluidez. Ele integra psicologia,
          neuroaprendizagem e comunicação real para reduzir ansiedade, medo de
          errar e bloqueios que dificultam a fala.
        </p>
        <p className="method-text text-muted-foreground text-lg leading-relaxed italic pt-7">
          "O foco não é apenas estudar inglês, mas destravar a comunicação,
          entender a lógica do idioma e desenvolver segurança para falar em
          situações reais."
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 ">
        {pilares.map((pilar, index) => (
          <div
            key={index}
            ref={(el) => {
              if (el) cardsRef.current[index] = el;
            }}
            className="premium-card group cursor-pointer dark:bg-[#171717]/80 border border-blue/20 rounded-2xl p-5"
          >
            <div className="w-14 h-14 bg-blue/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue/20 transition-all duration-500">
              {pilar.icon}
            </div>
            <h3 className="text-xl font-bold mb-4 text-blue">{pilar.title}</h3>
            <p className="text-muted-foreground leading-relaxed text-sm">
              {pilar.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
export default MethodSection;
