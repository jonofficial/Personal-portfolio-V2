"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LANG_COLORS = {
  TypeScript:  { bg: "#2563EB20", text: "#3b82f6",  dot: "#2563EB" },
  JavaScript:  { bg: "#F59E0B20", text: "#f59e0b",  dot: "#F59E0B" },
  Python:      { bg: "#10B98120", text: "#10b981",  dot: "#10B981" },
  "C#":        { bg: "#8B5CF620", text: "#8b5cf6",  dot: "#7C3AED" },
  Solidity:    { bg: "#6366F120", text: "#818cf8",  dot: "#4F46E5" },
  Default:     { bg: "#6B728020", text: "#9ca3af",  dot: "#6B7280" },
};

const getLangColor = (lang) => LANG_COLORS[lang] || LANG_COLORS["Default"];

export default function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);
  const langColor = getLangColor(project.language);

  return (
    <motion.article
      id={`project-card-${project.slug}`}
      className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:scale-[1.02] transition overflow-hidden flex flex-col h-full relative group"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="absolute top-0 left-0 h-[2px] w-full"
        style={{
          background: `linear-gradient(90deg, ${langColor.dot}, transparent)`,
          opacity: hovered ? 1 : 0.4,
          transition: "opacity 0.3s",
        }}
      />

      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute inset-0 pointer-events-none z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              background: `radial-gradient(400px circle at 50% 0%, ${langColor.dot}10, transparent 70%)`,
            }}
          />
        )}
      </AnimatePresence>

      <div className="flex flex-col flex-1 relative z-10 justify-between h-full">
        <div>
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-white/40 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
              </svg>
              <h3 className="font-bold text-white text-base leading-tight break-words">{project.name}</h3>
            </div>
            {project.stars > 0 && (
              <span className="flex items-center gap-1 text-xs text-amber-400 shrink-0">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {project.stars}
              </span>
            )}
          </div>

          <p className="text-sm text-white/50 leading-relaxed mb-4">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.topics.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide"
                style={{ background: langColor.bg, color: langColor.text }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-white/6 mt-auto">
          <div className="flex items-center gap-1.5 text-xs text-white/45">
            <span className="w-2 h-2 rounded-full shrink-0" style={{ background: langColor.dot }} />
            <span>{project.language}</span>
          </div>

          <div className="flex gap-2 shrink-0">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              id={`project-github-${project.slug}`}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white/60 hover:text-white bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-all"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              Code
            </a>
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                id={`project-demo-${project.slug}`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-blue-600/80 to-violet-600/80 hover:from-blue-500 hover:to-violet-500 transition-all"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
