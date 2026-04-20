import HeroSection      from "@/components/HeroSection";
import AboutSection     from "@/components/AboutSection";
import SkillsSection    from "@/components/SkillsSection";
import ProjectsSection  from "@/components/ProjectsSection";
import PhilosophySection from "@/components/PhilosophySection";
import GithubSection    from "@/components/GithubSection";
import ContactSection   from "@/components/ContactSection";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <PhilosophySection />
      <GithubSection />
      <ContactSection />
    </div>
  );
}
