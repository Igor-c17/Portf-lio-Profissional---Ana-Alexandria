import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeaderSection from "./sections/HeaderSection";
import HeroSection from "./sections/HeroSection";
import AuthorityLine from "./sections/AuthorityLine";
import AboutSection from "./sections/AboutSection";
import MethodSection from "./sections/MethodSection";
import TargetSection from "./sections/TargetSection";
import BenefitSection from "./sections/BenefitsSection";
import ProgramsSection from "./sections/ProgramSection";
import ExperienceSection from "./sections/ExperienceSection";
import TestimonialSection from "./sections/TestmonialSection";
import ContactSection from "./sections/ContactSection";
import FooterSection from "./sections/FooterSection";

gsap.registerPlugin(ScrollTrigger);

async function PortfolioContent() {
  return (
    <>
      <HeaderSection />
      <HeroSection />
      <AuthorityLine />
      <AboutSection />
      <MethodSection />
      <TargetSection />
      <BenefitSection />
      <ProgramsSection />
      <ExperienceSection />
      <TestimonialSection />
      <ContactSection />
      <FooterSection />
    </>
  );
}

export default PortfolioContent;
