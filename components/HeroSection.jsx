"use client";
import { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { profile } from "@/lib/github";

const Hero3D = dynamic(() => import("./Hero3D"), {
  ssr: false,
  loading: () => null,
});

const WORDS = [
  "Software Engineer",
  "Python Developer",
  "TypeScript Engineer",
  "Automation Builder",
  "DevTools Creator",
];

const HERO_PILLS = ["Tested Code", "Automation First", "Clean Architecture"];

function TypewriterText() {
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    const current = WORDS[wordIdx];
    const timeout = setTimeout(
      () => {
        if (!deleting) {
          setDisplayed(current.slice(0, charIdx + 1));
          setCharIdx((c) => c + 1);
          if (charIdx + 1 === current.length) {
            setTimeout(() => setDeleting(true), 1800);
          }
        } else {
          setDisplayed(current.slice(0, charIdx - 1));
          setCharIdx((c) => c - 1);
          if (charIdx - 1 === 0) {
            setDeleting(false);
            setWordIdx((w) => (w + 1) % WORDS.length);
          }
        }
      },
      deleting ? 45 : 90
    );
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx]);

  return (
    <span className="gradient-text">
      {displayed}
      <span className="animate-blink text-violet-400 ml-0.5">|</span>
    </span>
  );
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
};
const itemVariants = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function HeroSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const handleScroll = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center overflow-hidden px-4 py-20 md:px-8 md:py-24"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0d0a14] to-[#0a0a0a]" />

      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-violet-600/8 blur-[120px] pointer-events-none" />
      <div className="absolute top-2/3 left-1/4 w-[300px] h-[300px] rounded-full bg-blue-600/6 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none" />

      {/* 3D Canvas (desktop only) with reduced opacity */}
      {!isMobile && (
        <div className="absolute inset-0 opacity-40">
          <Hero3D />
        </div>
      )}

      {isMobile && (
        <div className="absolute inset-0 overflow-hidden opacity-40">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-violet-500/20"
              style={{
                width:  Math.random() * 4 + 1 + "px",
                height: Math.random() * 4 + 1 + "px",
                left:   Math.random() * 100 + "%",
                top:    Math.random() * 100 + "%",
                animation: `particle-drift ${Math.random() * 15 + 10}s linear ${Math.random() * 10}s infinite`,
              }}
            />
          ))}
        </div>
      )}

      {/* Content */}
      <motion.div
        className="relative z-10 text-center w-full max-w-4xl mx-auto space-y-6 px-1"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="flex justify-center" variants={itemVariants}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-lg border border-white/10 text-xs font-medium text-white/70">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Available for opportunities
          </span>
        </motion.div>

        <motion.h1
          className="text-4xl md:text-6xl font-bold tracking-tight"
          variants={itemVariants}
        >
          <span className="text-white">Jonathan</span>
          <br />
          <span className="gradient-text">Harrison</span>
        </motion.h1>

        <motion.p
          className="text-xl sm:text-2xl md:text-3xl font-semibold h-10"
          variants={itemVariants}
        >
          <TypewriterText />
        </motion.p>

        <motion.p
          className="text-base sm:text-lg text-white/50 max-w-2xl mx-auto leading-relaxed"
          variants={itemVariants}
        >
          Building scalable systems, automation tools, and developer-first solutions.
          3+ years crafting clean, tested, well-documented software.
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-center gap-4 pt-4"
          variants={itemVariants}
        >
          <button
            id="hero-cta-projects"
            onClick={() => handleScroll("#projects")}
            className="btn-glow group px-7 py-3 rounded-full font-semibold text-sm bg-gradient-to-r from-blue-600 to-violet-600 text-white hover:from-blue-500 hover:to-violet-500 transition-all duration-300 shadow-lg shadow-violet-900/30"
          >
            View Projects
            <span className="ml-2 inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
          </button>

          <a
            id="hero-cta-github"
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glow px-7 py-3 rounded-full font-semibold text-sm bg-white/5 backdrop-blur-lg text-white/80 hover:text-white border border-white/10 flex items-center gap-2 hover:scale-[1.02] transition"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            GitHub
          </a>

          <button
            id="hero-cta-contact"
            onClick={() => handleScroll("#contact")}
            className="btn-glow px-7 py-3 rounded-full font-semibold text-sm bg-white/5 backdrop-blur-lg text-white/80 hover:text-white border border-white/10 hover:scale-[1.02] transition"
          >
            Contact
          </button>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-2 pt-1"
          variants={itemVariants}
        >
          {HERO_PILLS.map((pill) => (
            <span
              key={pill}
              className="px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide text-white/70 bg-white/5 border border-white/10"
            >
              {pill}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
