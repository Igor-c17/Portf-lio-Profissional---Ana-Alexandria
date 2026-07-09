import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import AuthorityLine from "./sections/AuthorityLine";
import HeaderSection from "./sections/HeaderSection";
import HeroSection from "./sections/HeroSection";

// Seções abaixo da dobra carregadas dinamicamente
const AboutSection = dynamic(() => import("./sections/AboutSection"));
const MethodSection = dynamic(() => import("./sections/MethodSection"));
const TargetSection = dynamic(() => import("./sections/TargetSection"));
const BenefitSection = dynamic(() => import("./sections/BenefitsSection"));
const ProgramsSection = dynamic(() => import("./sections/ProgramSection"));
const ExperienceSection = dynamic(() => import("./sections/ExperienceSection"));
const TestimonialSection = dynamic(
  () => import("./sections/TestmonialSection"),
);
const ContactSection = dynamic(() => import("./sections/ContactSection"));
const FooterSection = dynamic(() => import("./sections/FooterSection"));

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
