"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { profile, featuredProjects } from "@/lib/github";
import { GitHubCalendar } from "react-github-calendar";

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

const langStats = [
  { name: "TypeScript", percent: 42, color: "#2563EB" },
  { name: "JavaScript", percent: 28, color: "#F59E0B" },
  { name: "Python",     percent: 20, color: "#10B981" },
  { name: "Other",      percent: 10, color: "#6B7280" },
];

export default function GithubSection() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const customTheme = {
    light: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
    dark:  ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
  };

  return (
    <section id="github" ref={ref} className="py-24 md:py-32 px-4 md:px-8 relative overflow-hidden mt-24">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="flex flex-col items-center justify-center text-center mb-10"
          variants={fadeUp} custom={0} initial="hidden" animate={inView ? "visible" : "hidden"}
        >
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-violet-400 mb-3">
            GitHub
          </p>
          <h2 className="text-4xl md:text-6xl font-bold text-white max-w-2xl mx-auto mb-4">
            Open Source Activity
          </h2>
          <p className="text-white/45 text-sm max-w-2xl mx-auto">
            A snapshot of my coding activity and public repositories.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-10 mt-10">
          {[
            { label: "Public Repos",    value: profile.publicRepos },
            { label: "Featured Projects", value: featuredProjects.length },
            { label: "Languages Used",  value: "5+"   },
            { label: "Total Stars",     value: "1+"   },
          ].map(({ label, value }, i) => (
            <motion.div
              key={label}
              className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 text-center hover:scale-[1.02] transition h-full"
              variants={fadeUp} custom={i + 3}
              initial="hidden" animate={inView ? "visible" : "hidden"}
            >
              <div className="text-2xl md:text-3xl font-black gradient-text">{value}</div>
              <div className="text-xs text-white/40 mt-1 font-medium">{label}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 mb-6 overflow-hidden w-full flex flex-col items-center"
          variants={fadeUp} custom={7}
          initial="hidden" animate={inView ? "visible" : "hidden"}
        >
          <div className="flex items-center justify-start gap-2 mb-5 w-full">
            <svg className="w-4 h-4 text-violet-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span className="font-semibold text-white/80 text-sm">Contribution Graph</span>
          </div>
          
          <div className="w-full overflow-x-auto pb-4 flex justify-center text-white/70">
            {inView && (
              <GitHubCalendar 
                username="jonofficial" 
                blockSize={12} 
                blockMargin={4} 
                fontSize={12}
                theme={customTheme}
                colorScheme="dark"
              />
            )}
          </div>
        </motion.div>

        <motion.div
          className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6"
          variants={fadeUp} custom={8}
          initial="hidden" animate={inView ? "visible" : "hidden"}
        >
          <div className="flex items-center gap-2 mb-5">
            <svg className="w-4 h-4 text-violet-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            <span className="font-semibold text-white/80 text-sm">Language Distribution</span>
          </div>

          <div className="flex h-2 rounded-full overflow-hidden mb-4 gap-0.5 w-full">
            {langStats.map((l) => (
              <motion.div
                key={l.name}
                className="h-full rounded-full"
                style={{ background: l.color }}
                initial={{ width: 0 }}
                animate={inView ? { width: `${l.percent}%` } : {}}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
              />
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            {langStats.map((l) => (
              <div key={l.name} className="flex items-center gap-1.5 text-xs text-white/55">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: l.color }} />
                <span className="font-medium">{l.name}</span>
                <span className="text-white/30">{l.percent}%</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mt-10 text-center"
          variants={fadeUp} custom={9}
          initial="hidden" animate={inView ? "visible" : "hidden"}
        >
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            id="github-view-profile-btn"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm bg-gradient-to-r from-blue-600 to-violet-600 text-white hover:from-blue-500 hover:to-violet-500 transition-all duration-300 hover:scale-[1.02]"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            View Full GitHub Profile
          </a>
        </motion.div>
      </div>
    </section>
  );
}
