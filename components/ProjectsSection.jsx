"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { featuredProjects } from "@/lib/github";

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function ProjectsSection() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [showAll, setShowAll] = useState(false);

  const displayed = showAll ? featuredProjects : featuredProjects.slice(0, 4);

  return (
    <section id="projects" ref={ref} className="py-24 md:py-32 px-4 md:px-8 relative overflow-hidden mt-24">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-blue-600/4 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          className="flex flex-col items-center justify-center text-center mb-10"
          variants={fadeUp} custom={0} initial="hidden" animate={inView ? "visible" : "hidden"}
        >
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-violet-400 mb-3">
            Projects
          </p>
          <h2 className="text-4xl md:text-6xl font-bold text-white max-w-2xl mx-auto mb-4">
            Things I've Built
          </h2>
          <p className="text-white/45 text-sm max-w-2xl mx-auto">
            A selection of projects spanning AI, full-stack web, blockchain, and developer tooling.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-10">
          {displayed.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {featuredProjects.length > 4 && (
          <motion.div
            className="mt-10 flex justify-center"
            variants={fadeUp} custom={6}
            initial="hidden" animate={inView ? "visible" : "hidden"}
          >
            <button
              id="projects-toggle-btn"
              onClick={() => setShowAll(!showAll)}
              className="bg-white/5 backdrop-blur-lg border border-white/10 px-6 py-2.5 rounded-full text-sm font-semibold text-white/70 hover:text-white flex items-center gap-2 transition-all hover:scale-[1.02]"
            >
              {showAll ? "Show Less" : `Show ${featuredProjects.length - 4} More`}
              <svg
                className={`w-4 h-4 transition-transform ${showAll ? "rotate-180" : ""}`}
                fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </motion.div>
        )}

        <motion.div
          className="mt-12 text-center"
          variants={fadeUp} custom={7}
          initial="hidden" animate={inView ? "visible" : "hidden"}
        >
          <a
            href="https://github.com/jonofficial"
            target="_blank"
            rel="noopener noreferrer"
            id="projects-view-all-github"
            className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/80 transition-colors group"
          >
            View all repositories on GitHub
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
