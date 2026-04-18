"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { skills } from "@/lib/github";

const CATEGORY_COLORS = {
  "Languages":         { bg: "rgba(59,130,246,0.12)",  border: "rgba(59,130,246,0.3)",  text: "#3b82f6"  },
  "Tools & Platforms": { bg: "rgba(139,92,246,0.12)",  border: "rgba(139,92,246,0.3)",  text: "#8b5cf6"  },
  "Concepts":          { bg: "rgba(6,182,212,0.12)",   border: "rgba(6,182,212,0.3)",   text: "#06b6d4"  },
};

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

function SkillBar({ level, color, inView }) {
  return (
    <div className="mt-3 h-2 bg-white/10 rounded-full overflow-hidden w-full">
      <motion.div
        className="h-full rounded-full"
        style={{ background: color }}
        initial={{ width: 0 }}
        animate={inView ? { width: `${level}%` } : { width: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      />
    </div>
  );
}

function SkillCard({ skill, color, inView, i }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-4 cursor-pointer hover:scale-[1.02] transition"
      style={
        hovered
          ? { borderColor: color.border, background: color.bg }
          : {}
      }
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      variants={fadeUp}
      custom={i}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-2">
          <span className="text-xl">{skill.icon}</span>
          <span className="font-semibold text-sm text-white/90">{skill.name}</span>
        </div>
        <span className="text-xs font-mono" style={{ color: color.text }}>
          {skill.level}%
        </span>
      </div>
      <SkillBar level={skill.level} color={color.text} inView={inView} />
    </motion.div>
  );
}

export default function SkillsSection() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" ref={ref} className="py-24 md:py-32 px-4 md:px-8 relative overflow-hidden mt-24">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          className="flex flex-col items-center justify-center text-center mb-10"
          variants={fadeUp} custom={0} initial="hidden" animate={inView ? "visible" : "hidden"}
        >
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-violet-400 mb-3">
            Skills
          </p>
          <h2 className="text-4xl md:text-6xl font-bold text-white max-w-2xl mx-auto mb-4">
            Technology Stack
          </h2>
          <p className="text-white/45 text-sm max-w-2xl mx-auto">
            Languages, tools, and concepts I use to build production-grade software.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-10">
          {Object.entries(skills).map(([category, skillList], ci) => {
            const color = CATEGORY_COLORS[category];
            return (
              <motion.div
                key={category}
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 h-full flex flex-col hover:scale-[1.02] transition"
                style={{ borderColor: color.border }}
                variants={fadeUp} custom={ci + 2}
                initial="hidden" animate={inView ? "visible" : "hidden"}
              >
                <div
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-5 self-start"
                  style={{ background: color.bg, color: color.text, border: `1px solid ${color.border}` }}
                >
                  {ci === 0 ? "⌨️" : ci === 1 ? "🛠️" : "🧠"}
                  <span>{category}</span>
                </div>

                <div className="flex flex-col gap-3 flex-grow">
                  {skillList.map((skill, i) => (
                    <SkillCard
                      key={skill.name}
                      skill={skill}
                      color={color}
                      inView={inView}
                      i={ci * 6 + i + 3}
                    />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
