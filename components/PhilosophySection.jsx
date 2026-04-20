"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { philosophy } from "@/lib/github";

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function PhilosophySection() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="philosophy" ref={ref} className="section-shell">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/8 to-transparent pointer-events-none" />

      <div className="section-inner relative">
        <motion.div
          className="section-header"
          variants={fadeUp} custom={0} initial="hidden" animate={inView ? "visible" : "hidden"}
        >
          <p className="section-subtitle">
            Philosophy
          </p>
          <h2 className="section-title">
            How I Think About Software
          </h2>
          <p className="section-copy">
            Principles that guide every line of code I write.
          </p>
        </motion.div>

        <div className="content-frame grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-8">
          {philosophy.map(({ icon, title, description }, i) => (
            <motion.div
              key={title}
              className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 relative overflow-hidden group hover:scale-[1.02] transition h-full flex flex-col"
              variants={fadeUp} custom={i + 3}
              initial="hidden" animate={inView ? "visible" : "hidden"}
            >
              <div className="absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-violet-500/15 to-transparent rounded-tr-2xl" />
              </div>

              <div className="text-3xl mb-4">{icon}</div>
              <h3 className="font-bold text-white text-base mb-2">{title}</h3>
              <p className="text-white/50 text-sm leading-relaxed flex-grow">{description}</p>

              <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-500 transition-all duration-500 w-0 group-hover:w-full" />
            </motion.div>
          ))}
        </div>

        <motion.blockquote
          className="content-frame mt-24 max-w-3xl mx-auto text-center relative pt-10 flex flex-col items-center"
          variants={fadeUp} custom={9}
          initial="hidden" animate={inView ? "visible" : "hidden"}
        >
          <div className="text-5xl font-serif text-violet-400/40 mb-2 leading-none">&quot;</div>
          <p className="text-white/65 text-lg sm:text-xl font-medium leading-relaxed italic text-center max-w-2xl mx-auto">
            Build software that future-you will thank you for. Write code as if the person
            who maintains it knows where you live.
          </p>
          <div className="mt-4 text-xs text-white/30 font-semibold tracking-[0.15em] uppercase text-center">
            — Jonathan Harrison, Dev Manifesto
          </div>
        </motion.blockquote>
      </div>
    </section>
  );
}
