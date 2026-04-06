"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle, Shield, UserCheck, Zap, Heart } from "lucide-react";
import { Icon } from "../Icon";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Benefit {
  title: string;
  icon: React.ReactNode;
}
const BenefitSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (sectionRef.current) {
      const heading = sectionRef.current.querySelector("h2");
      const subtitle = sectionRef.current.querySelector(".benefit-subtitle");
      const text = sectionRef.current.querySelector(".benefit-text");
      const items = sectionRef.current.querySelectorAll(".benefit-item");
      const bigBox = sectionRef.current.querySelector(".benefit-box");

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

      if (items.length > 0) {
        tl.fromTo(
          items,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.1",
        );
      }

      if (bigBox) {
        tl.fromTo(
          bigBox,
          { x: 40, opacity: 0, scale: 0.95 },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.6",
        );
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const benefits: Benefit[] = [
    {
      title: "Mais clareza emocional",
      icon: <Heart className="w-5 h-5 text-green" />,
    },
    {
      title: "Mais confiança para se comunicar",
      icon: <Shield className="w-5 h-5 text-green" />,
    },
    {
      title: "Mais organização mental e foco",
      icon: <Zap className="w-5 h-5 text-green" />,
    },
    {
      title: "Mais autonomia no idioma",
      icon: <UserCheck className="w-5 h-5 text-green" />,
    },
    {
      title: "Aprendizagem mais leve e humana",
      icon: <CheckCircle className="w-5 h-5 text-green" />,
    },
  ];
  return (
    <section
      ref={sectionRef}
      className="section-container relative z-10 pb-30 pt-20 bg-muted/30 px-6"
    >
      <div className="grid lg:grid-cols-2 gap-20 items-center container mx-auto max-w-6xl">
        <div className="space-y-8">
          <h2 className="text-4xl text-green font-serif md:text-5xl font-semibold leading-tight flex flex-col items-start">
            <span>
              Benefícios E{" "}
              <span className="text-green italic">Transformação</span>
            </span>
            <div className="benefit-subtitle flex items-center relative top-2">
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
                Benefits And Transformation
              </p>
            </div>
          </h2>
          <p className="benefit-text text-muted-foreground text-lg leading-relaxed">
            O resultado de um trabalho que integra mente e linguagem é uma vida
            com mais presença e autoexpressão real.
          </p>
          <div className="space-y-4 pt-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="benefit-item flex items-center gap-4 p-5 dark:bg-[#171717]/80 border border-green/20 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 bg-green/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  {benefit.icon}
                </div>
                <span className="font-medium text-muted-foreground text-lg">
                  {benefit.title}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="benefit-box relative group overflow-hidden rounded-[40px]">
          <div className="aspect-square bg-green/5 p-12 transition-all duration-700 group-hover:scale-105">
            <div className="w-full h-full border-2 border-dashed border-green/20 rounded-[40px] flex items-center justify-center p-12">
              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-green rounded-full mx-auto flex items-center justify-center text-white shadow-xl shadow-green/20">
                  <Shield className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-serif font-bold italic text-green ring-offset-4 decoration-green decoration-2 underline">
                  Segurança real
                </h3>
                <p className="text-gray-400 text-sm max-w-xs mx-auto leading-relaxed uppercase tracking-widest font-bold">
                  A transformação de dentro para fora.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default BenefitSection;
