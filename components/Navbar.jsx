"use client";
import { useEffect, useState } from "react";
import { profile } from "@/lib/github";

const navLinks = [
  { href: "#about",       label: "About"    },
  { href: "#skills",      label: "Skills"   },
  { href: "#projects",    label: "Projects" },
  { href: "#philosophy",  label: "Values"   },
  { href: "#github",      label: "GitHub"   },
  { href: "#contact",     label: "Contact"  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const [active, setActive]     = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleNav = (href) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 h-16 flex items-center justify-between ${
        scrolled ? "backdrop-blur-xl bg-black/40 border-b border-white/10" : "bg-transparent"
      }`}
    >
      <div className="max-w-[80rem] mx-auto w-full px-4 md:px-6 flex items-center justify-between">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 group"
          aria-label="Scroll to top"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-sm font-bold text-white shadow-lg transition-transform hover:scale-105">
            JH
          </div>
          <span className="font-semibold text-sm tracking-wide hidden sm:block text-white/80 group-hover:text-white transition-colors">
            jonofficial
          </span>
        </button>

        <ul className="hidden md:flex gap-6 items-center" role="list">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <button
                onClick={() => handleNav(href)}
                className={`text-sm font-medium transition-colors duration-200 ${
                  active === href.slice(1)
                    ? "text-white"
                    : "text-white/55 hover:text-white"
                }`}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium text-white bg-white/5 backdrop-blur-lg border border-white/10 hover:scale-[1.02] transition"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            GitHub
          </a>
        </div>

        <button
          className="md:hidden text-white/70 hover:text-white p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <div className="w-5 flex flex-col gap-1">
            <span className={`h-px bg-current transition-all duration-300 ${open ? "rotate-45 translate-y-1.5" : ""}`} />
            <span className={`h-px bg-current transition-all duration-300 ${open ? "opacity-0" : ""}`} />
            <span className={`h-px bg-current transition-all duration-300 ${open ? "-rotate-45 -translate-y-1.5" : ""}`} />
          </div>
        </button>
      </div>

      <div
        className={`fixed top-16 left-0 w-full transition-all duration-300 overflow-hidden md:hidden ${
          open ? "max-h-96 opacity-100 backdrop-blur-xl bg-black/80 border-b border-white/10" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="px-4 py-4 flex flex-col gap-2">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <button
                onClick={() => handleNav(href)}
                className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition-all"
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
