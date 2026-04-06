"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import logo from "@/public/logo.png";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (footerRef.current) {
      const brand = footerRef.current.querySelector(".footer-brand");
      const nav = footerRef.current.querySelector(".footer-nav");
      const contact = footerRef.current.querySelector(".footer-contact");
      const legal = footerRef.current.querySelector(".footer-legal");
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 95%",
        },
      });

      tl.fromTo(
        brand,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      )

        .fromTo(
          nav,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.6",
        )

        .fromTo(
          contact,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.6",
        )

        .fromTo(
          legal,
          { opacity: 0 },
          { opacity: 1, duration: 1, ease: "power2.out" },
          "-=0.2",
        );
    }
  }, []);

  const premiumHoverEffect =
    "relative inline-block transition-transform duration-300 hover:-translate-y-[2px] " +
    "after:content-[''] after:absolute after:w-full after:h-[2px] after:-bottom-1 after:left-0 " +
    "after:bg-current after:scale-x-0 after:origin-bottom-right after:transition-transform " +
    "after:duration-500 after:ease-[cubic-bezier(0.86,0,0.07,1)] " +
    "hover:after:scale-x-100 hover:after:origin-bottom-left hover:text-slate-900 dark:hover:text-white";
  return (
    <footer
      ref={footerRef}
      className="bg-slate-50 dark:bg-muted/30 py-20 px-6 border-t border-slate-200 dark:border-white/5 transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-12 text-center md:text-left">
        <div className="footer-brand space-y-6 max-w-sm flex flex-col items-center md:items-start">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14  rounded-xl flex items-center justify-center text-white font-bold text-xl ">
              <img
                src={logo.src}
                alt="PFC Logo"
                className="w-full h-full object-cover"
              />
            </div>

            <span className="font-serif text-2xl font-bold italic text-slate-800 dark:text-muted-foreground tracking-tighter">
              Ana Alexandria
            </span>
          </div>
          <p className="text-slate-500 dark:text-muted-foreground text-sm leading-relaxed font-medium text-balance">
            Clareza, regulação e comunicação com propósito. O equilíbrio entre
            neurociência e humanidade.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-16 md:gap-24 text-left">
          <div className="footer-nav space-y-6">
            <span className="block text-xs uppercase tracking-[0.2em] font-bold text-slate-400 dark:text-muted-foreground/60">
              Navegação
            </span>
            <nav className="flex flex-col items-start gap-5 text-sm text-slate-600 dark:text-muted-foreground font-medium">
              <a href="#home" className={premiumHoverEffect}>
                Início
              </a>
              <a href="#metodo" className={premiumHoverEffect}>
                Método PFC
              </a>
              <a href="#programas" className={premiumHoverEffect}>
                Programas
              </a>
              <a href="#about" className={premiumHoverEffect}>
                Sobre
              </a>
            </nav>
          </div>

          <div className="footer-contact space-y-6">
            <span className="block text-xs uppercase tracking-[0.2em] font-bold text-slate-400 dark:text-muted-foreground/60">
              Contato
            </span>
            <div className="flex flex-col items-start gap-5 text-sm text-slate-600 dark:text-muted-foreground font-medium">
              <a
                href="https://wa.me/558599474570"
                className={premiumHoverEffect}
              >
                WhatsApp
              </a>
              <a
                href="https://www.instagram.com/pfc.mindset/"
                className={premiumHoverEffect}
              >
                Instagram
              </a>
              <a
                href="mailto:Alexandria29402@williamsbu.edu"
                className={premiumHoverEffect}
              >
                Email
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-legal max-w-7xl mx-auto mt-20 pt-10 border-t border-slate-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <span className="text-xs text-slate-400 dark:text-muted-foreground/70 uppercase tracking-widest font-semibold text-center md:text-left">
          © {new Date().getFullYear()} PFC — Ana Alexandria. Todos os direitos
          reservados.
        </span>
      </div>
    </footer>
  );
};
export default Footer;
