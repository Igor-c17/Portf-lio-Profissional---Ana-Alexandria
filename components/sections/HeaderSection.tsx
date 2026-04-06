"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Menu, X, Moon, Sun } from "lucide-react";
import logo from "@/public/logo.png";
import { AnimatePresence, motion } from "motion/react";
// Imports para o Theme
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui//dropdown-menu";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
const navItems = [
  { label: "Início", id: "home" },
  { label: "Método PFC", id: "metodo" },
  { label: "Programas", id: "programas" },
  { label: "Sobre", id: "about" },
  { label: "Contato", id: "contato" },
];

function IntegratedModeToggle() {
  const { setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="relative w-12 h-12 sm:w-14 sm:h-14 shrink-0 pointer-events-auto rounded-full bg-white/20 dark:bg-black/30 hover:bg-white/30 dark:hover:bg-black/40 backdrop-blur-xl border border-white/30 dark:border-white/20 hover:border-white/40 dark:hover:border-white/30 shadow-[0_8px_32px_0_rgba(0,0,0,0.15)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] flex items-center justify-center text-slate-500 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-neutral-200 transition-all duration-300 active:scale-95"
          aria-label="Toggle theme"
        >
          <Sun className="h-5 w-5 sm:h-6 sm:w-6 transition-all duration-500 scale-100 rotate-0 dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-5 w-5 sm:h-6 sm:w-6 transition-all duration-500 scale-0 rotate-90 dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="z-[110] relative mt-2 rounded-2xl border-white/10 shadow-2xl"
      >
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="cursor-pointer font-medium hover:bg-slate-100 dark:hover:bg-white/10 rounded-xl transition-colors"
        >
          Claro
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="cursor-pointer font-medium hover:bg-slate-100 dark:hover:bg-white/10 rounded-xl transition-colors"
        >
          Escuro
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="cursor-pointer font-medium hover:bg-slate-100 dark:hover:bg-white/10 rounded-xl transition-colors"
        >
          Padrão
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const HeaderOne: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const whatsappLink: string = "https://wa.me/+558599474570";
  const scrollToSection = (id: string): void => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };
  useEffect(() => {
    if (!headerRef.current) return;
    const showAnim = gsap
      .from(headerRef.current, {
        yPercent: -100,
        paused: true,
        duration: 0.3,
        ease: "power2.out",
      })
      .progress(1);
    ScrollTrigger.create({
      start: "top top",
      end: 99999,
      onUpdate: (self) => {
        if (self.direction === -1) {
          showAnim.play();
        } else {
          showAnim.reverse();
          setIsMobileMenuOpen(false);
        }
      },
    });

    gsap.fromTo(
      headerRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "expo.out", delay: 0.5 },
    );
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);
  return (
    <div
      ref={headerRef}
      className={`fixed top-0 left-0 w-full z-[100] px-4 py-4 sm:px-6 sm:py-6 transition-all duration-300 pointer-events-none`}
    >
      <div className="max-w-7xl mx-auto relative z-20">
        <div className="flex items-center justify-between pointer-events-auto">
          <div
            className="cursor-pointer group flex items-center gap-3"
            onClick={() => scrollToSection("home")}
          >
            <div className="liquid-glass shadow-lg w-14 h-14 sm:w-16 sm:h-16 bg-none rounded-full flex items-center justify-center transition-transform group-hover:scale-105 active:scale-95 overflow-hidden">
              <img
                src={logo.src}
                alt="PFC Logo"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <nav
            ref={navRef}
            className="liquid-glass-nav hidden lg:flex gap-1 nav_hidden"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-slate-800 dark:text-white hover:text-slate-900 dark:hover:text-white font-medium text-sm transition-all hover:scale-105 active:opacity-70 lg:px-4"
              >
                {item.label}
              </button>
            ))}
          </nav>
          {/* Área Direita: Botão Fale Comigo, Toggle Theme e Menu Toggle Mobile */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* O ModeToggle agora é vizinho do CTA ou Menu, sendo 100% responsivo para o lugar certo */}
            <IntegratedModeToggle />
            {/* CTA Desktop & Tablet */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden liquid-glass md:flex items-center gap-2 px-6 py-3 liquid-glass text-slate-900 dark:text-white rounded-full text-sm font-semibold hover:bg-slate-800/10 dark:hover:bg-white/10 transition-all active:scale-95 shadow-xl shadow-slate-200/50 dark:shadow-none group "
            >
              Fale Comigo
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            {/* Mobile/Tablet Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden liquid-glass w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-slate-900 dark:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors active:scale-95 shadow-lg shadow-black/5"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isMobileMenuOpen ? "close" : "menu"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {isMobileMenuOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>
        {/* Dropdown Menu - Mobile/Tablet */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1], // Spring-like ease out
              }}
              className="lg:hidden absolute top-[calc(100%+16px)] left-0 w-full z-10 origin-top pointer-events-auto"
            >
              <div className="liquid-glass rounded-3xl p-5 flex flex-col gap-3 shadow-2xl shadow-black/10 dark:shadow-black/50 border border-white/20 dark:border-white/10 bg-white/40 dark:bg-black/30 backdrop-blur-xl">
                <nav className="flex flex-col gap-1">
                  {navItems.map((item, i) => (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: i * 0.05 + 0.1,
                        duration: 0.4,
                        ease: "easeOut",
                      }}
                      onClick={() => scrollToSection(item.id)}
                      className="text-left text-slate-800 dark:text-white/90 hover:text-slate-900 dark:hover:text-white text-lg font-medium px-4 py-3 rounded-2xl hover:bg-white/50 dark:hover:bg-white/10 transition-colors active:scale-95"
                    >
                      {item.label}
                    </motion.button>
                  ))}
                </nav>
                {/* CTA Mobile -> Visível apenas no Mobile (escondido a partir de md) */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: navItems.length * 0.05 + 0.1,
                    duration: 0.4,
                  }}
                  className="pt-3 border-t border-slate-300/40 dark:border-white/10 md:hidden mt-2 "
                >
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-between items-center w-full px-6 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-semibold text-base hover:opacity-90 transition-opacity active:scale-95 "
                  >
                    Fale Comigo Agora
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
export default HeaderOne;
