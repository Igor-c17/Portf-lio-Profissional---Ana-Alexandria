"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { CheckCircle2, GraduationCap, Globe, Target } from "lucide-react";
import certificado from "@/public/ana.png";
import { Icon } from "../Icon";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const authorityBlocks = [
  {
    id: "block-1",
    category: "Formação acadêmica",
    description: "Psicologia — Williams Baptist University",
    icon: GraduationCap,
    image: certificado.src,
  },
  {
    id: "block-2",
    category: "Experiência internacional",
    description:
      "Cinco anos de vivência nos Estados Unidos, com experiência prática em comunicação, adaptação e uso real do inglês em diferentes contextos.",
    icon: Globe,
  },
  {
    id: "block-3",
    category: "Método aplicado à vida real",
    description:
      "Um trabalho construído para atender diferentes níveis, objetivos e demandas reais de comunicação, com foco em destravamento da fala e compreensão do idioma.",
    icon: Target,
  },
];

const TiltCard = ({ block }: { block: (typeof authorityBlocks)[0] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };
  const IconComponent = block.icon;
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        rotateX,
        rotateY,
      }}
      className="relative bg-none w-full h-full min-h-[400px] mx-auto rounded-2xl cursor-pointer group"
    >
      <div
        className="absolute inset-0 bg-gradient-to-br from-rose-500/40 to-rose-500/40 rounded-2xl blur-xl transition-opacity duration-500"
        style={{ opacity: isHovered ? 0.8 : 0 }}
      />

      <div
        className="absolute inset-0 bg-slate-900 border border-slate-700/50 rounded-2xl flex flex-col overflow-hidden"
        style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />
        <div
          className="absolute top-0 left-0 w-full h-full border border-slate-700/30 rounded-2xl m-[6px] transition-colors pointer-events-none group-hover:border-rose-500/30"
          style={{ width: "calc(100% - 12px)", height: "calc(100% - 12px)" }}
        />
        {block.image && (
          <motion.div
            style={{ transform: "translateZ(20px)" }}
            className="h-32 w-full relative overflow-hidden flex-shrink-0 border-b border-slate-800"
          >
            <div className="absolute inset-0 bg-slate-900/40 z-10" />
            <img
              src={block.image}
              alt="Diploma / Ilustração"
              className="w-full h-full object-cover opacity-60 group-hover:opacity-90 transition-opacity duration-500 mix-blend-luminosity group-hover:mix-blend-normal"
            />
          </motion.div>
        )}
        <div className="p-8 flex flex-col flex-grow items-center text-center relative z-20">
          <motion.div
            style={{ transform: "translateZ(50px)" }}
            className="mt-2 mb-6"
          >
            <div className="w-14 h-14 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center mx-auto mb-4 group-hover:border-rose-500/50 transition-colors">
              <IconComponent className="w-6 h-6 text-rose-400" />
            </div>
          </motion.div>
          <motion.h3
            style={{ transform: "translateZ(60px)" }}
            className="text-xl font-serif text-rose font-bold  leading-tight mb-4"
          >
            {block.category}
          </motion.h3>
          <motion.p
            style={{ transform: "translateZ(40px)" }}
            className="text-sm text-white leading-relaxed max-w-[250px] mx-auto"
          >
            {block.description}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};

export default function CertificationsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    if (sectionRef.current) {
      const heading = sectionRef.current.querySelector("h2");
      const subtitle = sectionRef.current.querySelector(".cert-subtitle");
      const text = sectionRef.current.querySelector(".cert-text");
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

      if (cardsRef.current.length > 0) {
        tl.fromTo(
          cardsRef.current,
          { y: 60, opacity: 0 },
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
    }
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);
  return (
    <section
      id="certificacoes"
      ref={sectionRef}
      className="py-24 relative overflow-hidden bg-muted/30"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-serif text-rose font-bold mb-6">
            Formação e Experiência
            <div className="cert-subtitle flex items-center justify-center relative top-3">
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
                Education And Experience
              </p>
            </div>
          </h2>
          <p className="cert-text text-lg text-muted-foreground font-medium">
            A base técnica e vivencial por trás do método PFC.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto perspective-1000">
          {authorityBlocks.map((block, index) => (
            <div
              key={block.id}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="h-full"
            >
              <TiltCard block={block} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
