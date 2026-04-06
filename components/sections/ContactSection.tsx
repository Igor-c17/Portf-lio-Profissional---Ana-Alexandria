"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DottedMap from "dotted-map";
import { Send, Mail, Phone, Sparkles } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface MapProps {
  dots?: Array<{
    start: { lat: number; lng: number };
    end: { lat: number; lng: number };
  }>;
  lineColor?: string;
}
const WorldMap = ({ dots = [], lineColor = "#00bae2" }: MapProps) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const svgMap = useMemo(() => {
    if (!mounted) return "";
    const map = new DottedMap({ height: 100, grid: "diagonal" });
    return map.getSVG({
      radius: 0.22,
      color: "rgba(255, 255, 255, 1)",
      shape: "circle",
      backgroundColor: "transparent",
    });
  }, [mounted]);
  const projectPoint = (lat: number, lng: number) => {
    const x = (lng + 180) * (800 / 360);
    const y = (90 - lat) * (400 / 180);
    return { x, y };
  };
  const createCurvedPath = (
    start: { x: number; y: number },
    end: { x: number; y: number },
  ) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 50;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };
  return (
    <div className="w-full aspect-[21/9] rounded-[2rem] relative font-sans overflow-hidden border border-slate-200 dark:border-slate-800/50 bg-white/40 dark:bg-slate-900/30 backdrop-blur-xl shadow-2xl">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-primary-500/10 blur-[120px] rounded-full pointer-events-none" />
      {mounted && (
        <img
          src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
          className="h-full w-full [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] pointer-events-none select-none invert opacity-10 dark:invert-0 dark:opacity-40"
          alt="world map"
          draggable={false}
        />
      )}
      <svg
        viewBox="0 0 800 400"
        className="w-full h-full absolute inset-0 pointer-events-none select-none drop-shadow-[0_0_10px_rgba(0,186,226,0.5)]"
      >
        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="20%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="80%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>

        {dots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng);
          const endPoint = projectPoint(dot.end.lat, dot.end.lng);
          return (
            <g key={`path-group-${i}`}>
              <motion.path
                d={createCurvedPath(startPoint, endPoint)}
                fill="none"
                stroke="url(#path-gradient)"
                strokeWidth="1.5"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 1.5,
                  delay: 0.2 * i,
                  ease: "easeInOut",
                }}
              />
            </g>
          );
        })}
        {dots.map((dot, i) => (
          <g key={`points-group-${i}`}>
            <g>
              <circle
                cx={projectPoint(dot.start.lat, dot.start.lng).x}
                cy={projectPoint(dot.start.lat, dot.start.lng).y}
                r="2.5"
                fill={lineColor}
              />
              <circle
                cx={projectPoint(dot.start.lat, dot.start.lng).x}
                cy={projectPoint(dot.start.lat, dot.start.lng).y}
                r="2.5"
                fill={lineColor}
                opacity="0.5"
              >
                <animate
                  attributeName="r"
                  from="2"
                  to="12"
                  dur="2s"
                  begin="0s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  from="0.6"
                  to="0"
                  dur="2s"
                  begin="0s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
            <g>
              <circle
                cx={projectPoint(dot.end.lat, dot.end.lng).x}
                cy={projectPoint(dot.end.lat, dot.end.lng).y}
                r="2.5"
                fill={lineColor}
              />
              <circle
                cx={projectPoint(dot.end.lat, dot.end.lng).x}
                cy={projectPoint(dot.end.lat, dot.end.lng).y}
                r="2.5"
                fill={lineColor}
                opacity="0.5"
              >
                <animate
                  attributeName="r"
                  from="2"
                  to="12"
                  dur="2s"
                  begin="1s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  from="0.6"
                  to="0"
                  dur="2s"
                  begin="1s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          </g>
        ))}
      </svg>
    </div>
  );
};

export function ContactForm() {
  const [isPending, setIsPending] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setStatus({ type: null, message: "" });
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setStatus({
      type: "success",
      message: "Obrigado! Sua mensagem foi enviada com sucesso.",
    });
    (e.target as HTMLFormElement).reset();
    setIsPending(false);
    setTimeout(() => {
      setStatus({ type: null, message: "" });
    }, 5000);
  };
  return (
    <div className="bg-white/80 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-[2rem] p-8 md:p-10 shadow-xl dark:shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-500/5 dark:bg-primary-500/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <h3 className="text-2xl font-serif font-bold mb-8 text-blue-400">
        Envie uma mensagem
      </h3>
      <AnimatePresence>
        {status.type && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`mb-6 p-4 rounded-xl text-sm font-medium border ${
              status.type === "success"
                ? "bg-emerald-100 border-emerald-200 text-emerald-800 dark:bg-emerald-500/10 dark:border-emerald-500/20 dark:text-emerald-400"
                : "bg-red-100 border-red-200 text-red-800 dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400"
            }`}
          >
            {status.message}
          </motion.div>
        )}
      </AnimatePresence>
      <form className="space-y-5 relative z-10" onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label
              htmlFor="name"
              className="text-sm font-medium text-blue-400 ml-1"
            >
              Nome
            </label>
            <input
              type="text"
              id="name"
              required
              disabled={isPending}
              className="w-full px-5 py-3.5 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-xl text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all disabled:opacity-50 shadow-sm dark:shadow-none"
              placeholder="Como quer ser chamado?"
            />
          </div>
          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="text-sm font-medium text-blue-400 ml-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              disabled={isPending}
              className="w-full px-5 py-3.5 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-xl text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all disabled:opacity-50 shadow-sm dark:shadow-none"
              placeholder="seu.email@exemplo.com"
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <label
            htmlFor="subject"
            className="text-sm font-medium text-blue-400 ml-1"
          >
            Assunto
          </label>
          <input
            type="text"
            id="subject"
            required
            disabled={isPending}
            className="w-full px-5 py-3.5 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-xl text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all disabled:opacity-50 shadow-sm dark:shadow-none"
            placeholder="Mentoria, Consultoria, Aulas..."
          />
        </div>
        <div className="space-y-1.5">
          <label
            htmlFor="message"
            className="text-sm font-medium text-blue-400 ml-1"
          >
            Mensagem
          </label>
          <textarea
            id="message"
            rows={4}
            required
            disabled={isPending}
            className="w-full px-5 py-3.5 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-xl text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all resize-none disabled:opacity-50 shadow-sm dark:shadow-none"
            placeholder="Me conte sobre suas necessidades..."
          />
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="relative overflow-hidden group w-full py-4 rounded-xl bg-blue-600 text-white font-bold text-base hover:shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300 disabled:opacity-70 disabled:cursor-wait mt-4"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-slate-200/50 to-transparent -translate-x-[150%] skew-x-[-20deg] group-hover:animate-[shine_1.5s_infinite]" />
          <span className="relative z-10 flex items-center justify-center gap-2">
            {isPending ? "Enviando..." : "Enviar Mensagem"}
            {!isPending && (
              <Send className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1 group-active:translate-x-2" />
            )}
          </span>
        </button>
      </form>
    </div>
  );
}

const mockProfile = {
  email: "Alexandria29402@williamsbu.edu",
  phone: "+55 85 9947-4570",
  location: "América do Norte & Brasil",
};
export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (sectionRef.current) {
      const badge = sectionRef.current.querySelector(".contact-badge");
      const heading = sectionRef.current.querySelector("h2");
      const text = sectionRef.current.querySelector(".contact-text");
      const mapCanvas = sectionRef.current.querySelector(".contact-map");
      const leftCol = sectionRef.current.querySelector(".contact-left");
      const rightCol = sectionRef.current.querySelector(".contact-right");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
      tl.fromTo(
        badge,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
      )
        .fromTo(
          heading,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
          "-=0.4",
        )
        .fromTo(
          text,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
          "-=0.4",
        )
        .fromTo(
          mapCanvas,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
          "-=0.2",
        );

      if (leftCol && rightCol) {
        const tlBottom = gsap.timeline({
          scrollTrigger: {
            trigger: leftCol,
            start: "top 85%",
          },
        });
        tlBottom
          .fromTo(
            leftCol,
            { x: -40, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          )
          .fromTo(
            rightCol,
            { x: 40, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
            "-=0.8",
          );
      }
    }
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);
  return (
    <section
      id="contato"
      ref={sectionRef}
      className="py-24 relative overflow-hidden transition-colors duration-500"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-[#08060d] dark:to-[#08060d] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="contact-badge inline-flex items-center gap-2 px-4 py-2 bg-slate-900/5 dark:bg-white/5 border border-slate-900/10 dark:border-white/10 rounded-full mb-6 font-semibold text-xs text-blue-600 dark:text-blue-400 tracking-widest uppercase shadow-sm dark:shadow-none">
            <Sparkles className="w-4 h-4" />
            Global Reach
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-blue-400 mb-6">
            Entre em contato
          </h2>
          <p className="contact-text text-lg text-muted-foreground font-medium max-w-2xl mx-auto">
            Se você quer aprender inglês com mais confiança, destravar a fala e
            encontrar um caminho que faça sentido para a sua realidade, vamos
            conversar.
          </p>
        </div>

        <div className="contact-map mb-20">
          <WorldMap
            dots={[
              {
                start: { lat: 34.0522, lng: -118.2437 },
                end: { lat: -23.5505, lng: -46.6333 },
              },
              {
                start: { lat: 40.7128, lng: -74.006 },
                end: { lat: 51.5074, lng: -0.1278 },
              },
              {
                start: { lat: -23.5505, lng: -46.6333 },
                end: { lat: 38.7223, lng: -9.1393 },
              },
              {
                start: { lat: 40.7128, lng: -74.006 },
                end: { lat: -15.7975, lng: -47.8919 },
              },
              {
                start: { lat: 48.8566, lng: 2.3522 },
                end: { lat: 25.2048, lng: 55.2708 },
              },
            ]}
          />
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="contact-left lg:col-span-5 space-y-10 lg:sticky lg:top-32">
            <div>
              <h3 className="text-3xl font-serif font-bold text-blue-400 mb-4">
                Pronto para avançar?
              </h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Seja para alinhar um processo individual, aulas focadas em
                expatriados ou para tirar dúvidas sobre qual das nossas soluções
                se adapta ao seu momento.
              </p>
            </div>
            <div className="space-y-6">
              <a
                href={`mailto:${mockProfile.email}`}
                className="flex items-center gap-6 group hover:bg-slate-100 dark:hover:bg-white/5 p-4 -ml-4 rounded-2xl transition-colors"
              >
                <div className="w-14 h-14 rounded-full bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform group-hover:bg-primary-50 dark:group-hover:bg-primary-500/20 group-hover:border-primary-200 dark:group-hover:border-primary-500/30">
                  <Mail className="w-6 h-6 text-slate-700 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-blue-400 uppercase tracking-widest mb-1">
                    Email Direto
                  </p>
                  <p className="text-lg text-muted-foreground group-hover:text-slate-900 dark:group-hover:text-white font-medium">
                    {mockProfile.email}
                  </p>
                </div>
              </a>

              <a
                href={`tel:${mockProfile.phone}`}
                className="flex items-center gap-6 group hover:bg-slate-100 dark:hover:bg-white/5 p-4 -ml-4 rounded-2xl transition-colors"
              >
                <div className="w-14 h-14 rounded-full bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform group-hover:bg-primary-50 dark:group-hover:bg-primary-500/20 group-hover:border-primary-200 dark:group-hover:border-primary-500/30">
                  <Phone className="w-6 h-6 text-slate-700 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-blue-400 uppercase tracking-widest mb-1">
                    Telefone (WhatsApp)
                  </p>
                  <p className="text-lg text-muted-foreground group-hover:text-slate-900 dark:group-hover:text-white font-medium">
                    {mockProfile.phone}
                  </p>
                </div>
              </a>
            </div>
          </div>

          <div className="contact-right lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
      <style>{`
        @keyframes shine {
          100% { transform: translateX(100%) skewX(-20deg); }
        }
      `}</style>
    </section>
  );
}
