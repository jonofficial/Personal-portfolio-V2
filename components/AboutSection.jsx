"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { profile } from "@/lib/github";
import Image from "next/image";

const stats = [
  { value: "3+",  label: "Years Experience" },
  { value: "15+", label: "Projects Shipped"  },
  { value: "5",   label: "Languages"          },
  { value: "∞",   label: "Coffee Consumed"   },
];

const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function AboutSection() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="py-24 md:py-32 px-4 md:px-8 max-w-7xl mx-auto">
      <motion.div
        className="flex flex-col items-center justify-center text-center mb-10"
        variants={fadeUp} custom={0} initial="hidden" animate={inView ? "visible" : "hidden"}
      >
        <p className="text-xs font-semibold tracking-[0.25em] uppercase text-violet-400 mb-3">
          About
        </p>
        <h2 className="text-4xl md:text-6xl font-bold text-white max-w-2xl mx-auto">
          The Developer Behind the Code
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-10 items-center mt-10">
        <motion.div
          className="flex flex-col items-center gap-8"
          variants={fadeUp} custom={2} initial="hidden" animate={inView ? "visible" : "hidden"}
        >
          <div className="relative">
            <div className="w-64 h-64 rounded-2xl overflow-hidden bg-white/5 backdrop-blur-lg border border-white/10 shadow-2xl shadow-violet-900/30">
              <Image
                src={profile.avatar}
                alt={profile.name}
                width={256}
                height={256}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <div className="absolute inset-0 rounded-2xl ring-2 ring-violet-500/30 pointer-events-none" />
            <div className="absolute -bottom-3 -right-3 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl px-3 py-1.5 text-xs font-semibold text-white flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Open to Work
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
            {stats.map(({ value, label }, i) => (
              <motion.div
                key={label}
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 text-center hover:scale-[1.02] transition"
                variants={fadeUp} custom={3 + i * 0.5}
                initial="hidden" animate={inView ? "visible" : "hidden"}
              >
                <div className="text-2xl font-black gradient-text">{value}</div>
                <div className="text-xs text-white/45 mt-0.5 font-medium">{label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="flex flex-col space-y-6">
          {[
            {
              icon: "👋",
              title: "Who I Am",
              body: "Hi, I'm Jonathan Harrison — a detail-oriented software engineer based in the UK, passionate about writing software that actually works, is well-documented, and can be maintained without pain.",
            },
            {
              icon: "💡",
              title: "What I Do",
              body: "I specialise in Python, TypeScript, and SQL, with a strong focus on automation, developer tooling, and clean architecture. I've shipped full-stack apps, internal tools, AI-powered systems, and blockchain projects.",
            },
            {
              icon: "🎯",
              title: "How I Work",
              body: "I believe in documentation-first development, comprehensive testing, and continuous integration. Every PR should leave the codebase better than it found it — and CI/CD pipelines should make that easy.",
            },
          ].map(({ icon, title, body }, i) => (
            <motion.div
              key={title}
              className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 relative overflow-hidden hover:scale-[1.02] transition"
              variants={fadeUp} custom={2 + i * 0.5}
              initial="hidden" animate={inView ? "visible" : "hidden"}
            >
              <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-2xl bg-gradient-to-b from-blue-500 to-violet-600" />
              <div className="flex items-start gap-4 pl-2">
                <span className="text-2xl mt-0.5">{icon}</span>
                <div>
                  <h3 className="font-bold text-white text-base mb-1.5">{title}</h3>
                  <p className="text-white/55 text-sm leading-relaxed">{body}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
