"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { profile } from "@/lib/github";

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const contactLinks = [
  {
    id: "contact-email",
    label: "Send an Email",
    sublabel: "contact@jonofficial.dev",
    href: "mailto:contact@jonofficial.dev",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
    gradient: "from-blue-600 to-blue-500",
    glow: "rgba(37,99,235,0.3)",
    primary: true,
  },
  {
    id: "contact-github",
    label: "GitHub",
    sublabel: "@jonofficial",
    href: profile.github,
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
    gradient: "from-gray-700 to-gray-600",
    glow: "rgba(107,114,128,0.25)",
    primary: false,
  },
  {
    id: "contact-linkedin",
    label: "LinkedIn",
    sublabel: "Jonathan Harrison",
    href: profile.linkedin,
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    gradient: "from-blue-700 to-blue-600",
    glow: "rgba(29,78,216,0.25)",
    primary: false,
  },
];

export default function ContactSection() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" ref={ref} className="section-shell">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-violet-600/6 blur-[120px] pointer-events-none" />

      <div className="section-inner relative text-center">
        <motion.div
          className="section-header"
          variants={fadeUp} custom={0} initial="hidden" animate={inView ? "visible" : "hidden"}
        >
          <p className="section-subtitle">
            Contact
          </p>
          <h2 className="section-title">
            Let&apos;s Build Something
          </h2>
          <p className="section-copy max-w-2xl mx-auto">
            Whether you have a project in mind, want to collaborate, or just want to talk tech
            — my inbox is always open.
          </p>
        </motion.div>

        <div className="content-frame grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto mt-8">
          {contactLinks.map(({ id, label, sublabel, href, icon, gradient, glow, primary }, i) => (
            <motion.a
              key={id}
              id={id}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className={`group flex flex-col items-center gap-4 bg-white/5 backdrop-blur-lg rounded-2xl border p-6 hover:scale-[1.02] transition h-full ${
                primary
                  ? "border-blue-500/30 hover:border-blue-500/60"
                  : "border-white/10 hover:border-white/20"
              }`}
              style={primary ? { boxShadow: `0 0 30px ${glow}` } : {}}
              variants={fadeUp} custom={i + 3}
              initial="hidden" animate={inView ? "visible" : "hidden"}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white shrink-0`}>
                {icon}
              </div>
              <div className="text-center mt-2">
                <div className="font-semibold text-white text-base">{label}</div>
                <div className="text-white/40 text-sm mt-1">{sublabel}</div>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          className="flex items-center gap-4 my-12 max-w-3xl mx-auto"
          variants={fadeUp} custom={6}
          initial="hidden" animate={inView ? "visible" : "hidden"}
        >
          <div className="flex-1 h-px bg-white/6" />
          <span className="text-white/25 text-xs font-medium">or</span>
          <div className="flex-1 h-px bg-white/6" />
        </motion.div>

        <motion.div
          className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl px-6 py-4"
          variants={fadeUp} custom={7}
          initial="hidden" animate={inView ? "visible" : "hidden"}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <div className="text-left">
            <p className="text-sm font-semibold text-white">Currently Available</p>
            <p className="text-xs text-white/40">Open to full-time, contract & freelance roles</p>
          </div>
        </motion.div>
      </div>

      <motion.footer
        className="mt-24 text-center text-xs text-white/20"
        variants={fadeUp} custom={8}
        initial="hidden" animate={inView ? "visible" : "hidden"}
      >
        <div className="flex justify-center items-center gap-2 mb-2">
          <div className="w-5 h-5 rounded bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white text-[10px] font-bold">JH</div>
          <span>Jonathan Harrison</span>
        </div>
        <p>Built with Next.js · React Three Fiber · Framer Motion · Tailwind CSS</p>
        <p className="mt-1">© {new Date().getFullYear()} Jonathan Harrison. All rights reserved.</p>
      </motion.footer>
    </section>
  );
}
