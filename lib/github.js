// Static GitHub profile data (sourced from API + enriched)
export const GITHUB_USERNAME = "jonofficial";

export const profile = {
  name: "Jonathan Harrison",
  login: "jonofficial",
  bio: "Detail-oriented software engineer with 3+ years of experience. Building scalable systems, automation tools, and developer-first solutions.",
  avatar: "https://avatars.githubusercontent.com/u/121378843?v=4",
  github: "https://github.com/jonofficial",
  email: "mailto:contact@jonofficial.dev",
  linkedin: "https://linkedin.com/in/jonofficial",
  publicRepos: 18,
  followers: 12,
};

export const featuredProjects = [
  {
    id: 1,
    name: "AI Powered Interview Prep",
    slug: "AI_Powered_Interview_Prep",
    description:
      "A full-stack web app that helps you prepare for tech interviews with role-specific, AI-generated Q&A. Features real-time AI coaching and personalized question banks.",
    language: "TypeScript",
    languageColor: "#2563EB",
    stars: 0,
    topics: ["AI", "Next.js", "Interview", "OpenAI"],
    github: "https://github.com/jonofficial/AI_Powered_Interview_Prep",
    demo: "https://ai-powered-interview-p-git-84b52a-s-jonathan-harrisons-projects.vercel.app/",
    featured: true,
  },
  {
    id: 2,
    name: "AI Customer Chatbot",
    slug: "AI-Customer-Chatbot",
    description:
      "Intelligent customer support chatbot with FAQ matching, sentiment analysis, contextual memory, and intelligent escalation to human agents.",
    language: "TypeScript",
    languageColor: "#2563EB",
    stars: 0,
    topics: ["AI", "NLP", "TypeScript", "Chatbot"],
    github: "https://github.com/jonofficial/AI-Customer-Chatbot",
    demo: "https://ai-customer-chatbot-pi.vercel.app",
    featured: true,
  },
  {
    id: 3,
    name: "Resume Analyzer",
    slug: "Resume_Analyzer",
    description:
      "AI-powered Applicant Tracking System that analyzes resumes against job descriptions, scores compatibility, and provides actionable improvement suggestions.",
    language: "JavaScript",
    languageColor: "#F59E0B",
    stars: 1,
    topics: ["AI", "ATS", "Python", "JavaScript"],
    github: "https://github.com/jonofficial/Resume_Analyzer",
    demo: null,
    featured: true,
  },
  {
    id: 4,
    name: "Github Repo Analyzer",
    slug: "Github_Repo_Analyzer",
    description:
      "Web app that visualizes a repository's structure and provides AI-powered explanations for each file — a developer's X-ray vision for any codebase.",
    language: "TypeScript",
    languageColor: "#2563EB",
    stars: 0,
    topics: ["GitHub API", "AI", "TypeScript", "DevTools"],
    github: "https://github.com/jonofficial/Github_Repo_Analyzer",
    demo: "https://github-jonofficial-repo-analyzer-one.vercel.app/",
    featured: true,
  },
  {
    id: 5,
    name: "Job Portal",
    slug: "Job_Portal",
    description:
      "Dockerized MERN stack job portal deployed on Amazon EC2, with full auth, job posting, and applicant management features.",
    language: "JavaScript",
    languageColor: "#F59E0B",
    stars: 0,
    topics: ["MERN", "Docker", "AWS EC2", "Full-Stack"],
    github: "https://github.com/jonofficial/Job_Portal",
    demo: "https://job-portal-five-tau.vercel.app",
    featured: false,
  },
  {
    id: 6,
    name: "LedgerLink",
    slug: "LedgerLink",
    description:
      "Decentralised insurance system using Raspberry Pi and blockchain technology for transparent, tamper-proof policy management.",
    language: "TypeScript",
    languageColor: "#2563EB",
    stars: 0,
    topics: ["Blockchain", "IoT", "Raspberry Pi", "DeFi"],
    github: "https://github.com/jonofficial/LedgerLink",
    demo: null,
    featured: false,
  },
];

export const skills = {
  Languages: [
    { name: "Python",     icon: "🐍", level: 95 },
    { name: "TypeScript", icon: "📘", level: 90 },
    { name: "JavaScript", icon: "✨", level: 88 },
    { name: "SQL",        icon: "🗄️", level: 82 },
    { name: "Nim",        icon: "👑", level: 72 },
    { name: "C#",         icon: "🔷", level: 65 },
  ],
  "Tools & Platforms": [
    { name: "Git",            icon: "⚙️", level: 95 },
    { name: "GitHub Actions", icon: "🔄", level: 88 },
    { name: "Docker",         icon: "🐳", level: 80 },
    { name: "AWS",            icon: "☁️", level: 75 },
    { name: "Next.js",        icon: "▲",  level: 88 },
    { name: "Node.js",        icon: "🟢", level: 85 },
  ],
  Concepts: [
    { name: "CI/CD",           icon: "🔁", level: 88 },
    { name: "Automation",      icon: "🤖", level: 92 },
    { name: "Testing",         icon: "✅", level: 85 },
    { name: "Clean Arch",      icon: "🏛️", level: 88 },
    { name: "API Design",      icon: "🔌", level: 85 },
    { name: "Documentation",   icon: "📝", level: 90 },
  ],
};

export const philosophy = [
  {
    icon: "📖",
    title: "Documentation First",
    description:
      "Great code without documentation is a ticking time bomb. I believe in writing docs as a form of thinking clearly.",
  },
  {
    icon: "🧪",
    title: "Test Everything",
    description:
      "Tests are a safety net and a design tool. I write tests that increase confidence, not just coverage numbers.",
  },
  {
    icon: "🔄",
    title: "Continuous Improvement",
    description:
      "Every PR is an opportunity to leave the codebase better than you found it. Small, consistent improvements compound.",
  },
  {
    icon: "🤝",
    title: "Clear Communication",
    description:
      "The best technical decisions are communicated in ways that non-technical stakeholders can understand and trust.",
  },
  {
    icon: "⚡",
    title: "Automation Mindset",
    description:
      "If I do something twice, I automate it. Repetitive work is wasted human potential and a source of errors.",
  },
  {
    icon: "🏛️",
    title: "Clean Architecture",
    description:
      "Maintainability is a feature. I design systems that the next developer — or future me — will actually enjoy working in.",
  },
];

// Generate a stable fake contribution grid (52 weeks × 7 days)
export function generateContributionData() {
  const weeks = [];
  const now = new Date();
  for (let w = 51; w >= 0; w--) {
    const days = [];
    for (let d = 0; d < 7; d++) {
      const date = new Date(now);
      date.setDate(date.getDate() - (w * 7 + (6 - d)));
      // Create realistic distribution with some busy periods
      const seed = (date.getMonth() * 31 + date.getDate() + date.getFullYear()) % 100;
      let count = 0;
      if (seed > 75) count = Math.floor(Math.random() * 4) + 5;
      else if (seed > 55) count = Math.floor(Math.random() * 4) + 2;
      else if (seed > 35) count = Math.floor(Math.random() * 3) + 1;
      else if (seed > 60) count = 1;

      // Skip weekends sometimes
      if ((d === 0 || d === 6) && Math.random() > 0.35) count = 0;

      days.push({ date: date.toISOString().split("T")[0], count });
    }
    weeks.push(days);
  }
  return weeks;
}

export function getContribColor(count) {
  if (count === 0) return "#161b22";
  if (count <= 2) return "#0d4429";
  if (count <= 4) return "#006d32";
  if (count <= 6) return "#26a641";
  return "#39d353";
}
