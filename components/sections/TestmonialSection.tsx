"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { Icon } from "../Icon";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};

const testimonialsData: Testimonial[] = [
  {
    quote:
      "Ana é uma terapeuta excelente. Com empatia e profissionalismo, me ajudou a superar a ansiedade, enfrentar desafios difíceis e construir um novo direcionamento de forma mais saudável. Além disso, atende com excelência em inglês e português.",
    name: "Michael",
    designation: "Empreendedor no Exterior",
    src: "/michael.png",
  },
  {
    quote:
      "Ana tem contribuído significativamente para o meu desenvolvimento pessoal e emocional, especialmente no manejo da ansiedade. Com seu apoio, ganhei mais confiança, destravei minha comunicação e aprofundei meu conhecimento em inglês e em mim mesma. Recomendo fortemente o seu trabalho.",
    name: "Heloa",
    designation: "Estudante PFC - Kids",
    src: "/heloa.png",
  },
  {
    quote:
      "Ana é uma professora dedicada e atenta às necessidades do aluno. Suas aulas são personalizadas, com materiais próprios, e contribuíram significativamente para a melhoria do meu português. Recomendo com confiança. ",
    name: "Alton",
    designation: "Coordenador",
    src: "/alton.png",
  },
  {
    quote:
      "Mesmo com pouco tempo disponível e muita ansiedade, Ana conseguiu estruturar uma rotina eficiente de aprendizado. Em pouco tempo, tive avanços significativos, especialmente na compreensão do inglês. O método PFC transformou minha forma de entender e falar o idioma. Sou muito grata pelo incentivo e profissionalismo. Recomendo fortemente. ",
    name: "Douglas",
    designation: "Personal Trainer",
    src: "/douglas.png",
  },
];
const AUTOPLAY_DELAY = 8000;
const AnimatedTestimonials = ({
  testimonials,
}: {
  testimonials: Testimonial[];
}) => {
  const [active, setActive] = useState(0);
  const timeoutRef = useRef<number | null>(null);
  const clearTimer = useCallback(() => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);
  const scheduleNext = useCallback(() => {
    clearTimer();
    if (testimonials.length <= 1) return;
    timeoutRef.current = window.setTimeout(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, AUTOPLAY_DELAY);
  }, [testimonials.length, clearTimer]);
  const handleNext = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);
  const handlePrev = useCallback(() => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);
  useEffect(() => {
    scheduleNext();
    return clearTimer;
  }, [active, scheduleNext, clearTimer]);
  const isActive = (index: number) => index === active;
  const getRotateY = (index: number) => {
    const rotations = [-6, 4, -3, 5, -5];
    return rotations[index % rotations.length];
  };
  return (
    <div className="relative w-full test-carousel">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <div className="relative h-96 w-full lg:h-[500px] perspective-1000">
          <AnimatePresence mode="popLayout">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.src}
                initial={{
                  opacity: 0,
                  scale: 0.9,
                  z: -100,
                  rotate: getRotateY(index),
                }}
                animate={{
                  opacity: isActive(index) ? 1 : 0.4,
                  scale: isActive(index) ? 1 : 0.9,
                  z: isActive(index) ? 0 : -100,
                  rotate: isActive(index) ? 0 : getRotateY(index),
                  zIndex: isActive(index)
                    ? 40
                    : testimonials.length + 2 - index,
                  y: isActive(index) ? [0, -40, 0] : 0,
                  x: isActive(index) ? 0 : (index - active) * 15,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
                  z: 100,
                  rotate: getRotateY(index),
                }}
                transition={{
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="absolute inset-0 origin-bottom"
              >
                {isActive(index) && (
                  <div className="absolute inset-0 bg-green-500/20 blur-2xl rounded-[3rem] -z-10 animate-pulse" />
                )}
                <img
                  src={testimonial.src}
                  alt={testimonial.name}
                  draggable={false}
                  className="h-full w-full rounded-[2.5rem] object-cover object-center shadow-2xl border-4 border-white/10 dark:border-slate-800"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="flex flex-col justify-center">
          <Quote className="w-12 h-12 text-green/30 mb-6" />
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <motion.p className="text-xl md:text-2xl font-serif text-slate-800 dark:text-slate-200 leading-relaxed min-h-[160px]">
                {testimonials[active].quote.split(" ").map((word, index) => (
                  <motion.span
                    key={index}
                    initial={{ filter: "blur(8px)", opacity: 0, y: 10 }}
                    animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      ease: "easeOut",
                      delay: 0.03 * index,
                    }}
                    className="inline-block"
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
              </motion.p>
              <div className="mt-8 flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-muted-foreground">
                    {testimonials[active].name}
                  </h3>
                  <p className="text-sm font-medium text-green">
                    {testimonials[active].designation}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="flex gap-4 mt-12">
            <button
              onClick={handlePrev}
              className="group flex h-12 w-12 items-center justify-center rounded-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-md border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <ArrowLeft className="h-5 w-5 text-slate-700 dark:text-slate-300 transition-transform duration-300 group-hover:-translate-x-1 group-active:scale-75" />
            </button>
            <button
              onClick={handleNext}
              className="group flex h-12 w-12 items-center justify-center rounded-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-md border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <ArrowRight className="h-5 w-5 text-slate-700 dark:text-slate-300 transition-transform duration-300 group-hover:translate-x-1 group-active:scale-75" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default function TestimonialsSection() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  useEffect(() => {
    if (containerRef.current) {
      const heading = containerRef.current.querySelector(".test-heading");
      const subtitle = containerRef.current.querySelector(".test-subtitle");
      const carousel = containerRef.current.querySelector(".test-carousel");
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
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
          carousel,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
          "-=0.2",
        );
    }
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);
  return (
    <section
      ref={containerRef}
      id="historias"
      className="relative py-24 px-6 bg-warm-50 overflow-hidden"
    >
      <motion.div
        style={{ y, opacity }}
        className="absolute top-0 right-0 -mr-[20%] -mt-[10%] w-[600px] h-[600px] bg-green-500/10 dark:bg-green-500/5 rounded-full blur-[100px] pointer-events-none"
      />
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-left mb-16 max-w-3xl">
          <h2 className="test-heading text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 text-green">
            O que dizem sobre o <br className="hidden md:block" />
            método na prática.
            <div className="test-subtitle flex items-center relative top-2">
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
        </div>

        <AnimatedTestimonials testimonials={testimonialsData} />
      </div>
    </section>
  );
}
