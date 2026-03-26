"use client";

import { useState, useEffect, useRef } from "react";

// Mock Data
const PROJECTS = [
  {
    id: 1,
    title: "NeuralChain Protocol",
    description: "AI-powered blockchain consensus mechanism with predictive validation. Reduces transaction latency by 40% while maintaining decentralized security.",
    tags: ["Solidity", "Python", "TensorFlow", "Web3"],
    year: "2025",
    status: "Live",
    gradient: "from-cyan-500 to-cyan-400",
  },
  {
    id: 2,
    title: "DeFi Sentinel",
    description: "Real-time threat detection system for decentralized finance protocols. Machine learning models analyze transaction patterns to prevent flash loan attacks.",
    tags: ["Rust", "React", "PostgreSQL", "AWS"],
    year: "2024",
    status: "Live",
    gradient: "from-cyan-500 to-cyan-500",
  },
  {
    id: 3,
    title: "MetaVault DAO",
    description: "Decentralized autonomous organization for NFT governance. Enables community-driven curation of digital art collections.",
    tags: ["TypeScript", "The Graph", "IPFS", "Ethers"],
    year: "2024",
    status: "Live",
    gradient: "from-cyan-400 to-emerald-400",
  },
  {
    id: 4,
    title: "Quantum Key Distribution",
    description: "Post-quantum cryptographic library implementing lattice-based encryption for next-generation blockchain applications.",
    tags: ["Go", "C++", "Kyber", "Dilithium"],
    year: "2023",
    status: "Beta",
    gradient: "from-cyan-400 to-teal-400",
  },
];

const SKILLS = [
  { name: "Solidity", level: 95, category: "Blockchain" },
  { name: "Rust", level: 88, category: "Blockchain" },
  { name: "Python", level: 92, category: "AI/ML" },
  { name: "TensorFlow", level: 85, category: "AI/ML" },
  { name: "TypeScript", level: 94, category: "Frontend" },
  { name: "React/Next.js", level: 90, category: "Frontend" },
  { name: "Go", level: 78, category: "Backend" },
  { name: "GraphQL", level: 82, category: "Backend" },
];

const EXPERIENCE = [
  {
    id: 1,
    role: "Principal AI/Blockchain Engineer",
    company: "Copy Labs",
    period: "2023 - Present",
    description: "Leading architecture for next-gen DeFi protocols with integrated ML components.",
    technologies: ["Solana", "PyTorch", "Rust", "Kafka"],
  },
  {
    id: 2,
    role: "Senior Blockchain Developer",
    company: "ChainForge",
    period: "2021 - 2023",
    description: "Built enterprise-grade smart contracts and cross-chain bridges.",
    technologies: ["Ethereum", "Solidity", "Hardhat", "IPFS"],
  },
  {
    id: 3,
    role: "Full Stack Engineer",
    company: "DataMind AI",
    period: "2019 - 2021",
    description: "Developed ML pipelines and data visualization dashboards.",
    technologies: ["Python", "TensorFlow", "React", "Docker"],
  },
  {
    id: 4,
    role: "Junior Developer",
    company: "TechNova",
    period: "2017 - 2019",
    description: "Started journey building web applications and learning blockchain fundamentals.",
    technologies: ["JavaScript", "Node.js", "MongoDB", "Express"],
  },
];

// Components
function CursorGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };

    const handleMouseLeave = () => setVisible(false);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="cursor-glow"
      style={{
        left: position.x,
        top: position.y,
      }}
    />
  );
}

function AnimatedGradientBackground() {
  return (
    <>
      <div className="gradient-bg">
        <div className="gradient-orb gradient-orb-1" />
        <div className="gradient-orb gradient-orb-2" />
        <div className="gradient-orb gradient-orb-3" />
      </div>
      <div className="grain-overlay" />
    </>
  );
}

function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ["hero", "projects", "skills", "experience", "contact"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "hero", label: "Home" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/50 backdrop-blur-xl border-b border-white/5 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#hero" className="text-xl font-bold tracking-wider">
          <span className="text-[#00e5cc]">Copy</span>
          <span className="text-white">Labs</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`text-sm font-mono tracking-widest transition-all duration-300 ${
                activeSection === item.id
                  ? "text-[#00e5cc] neon-text-subtle"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden grid-pattern"
    >
      {/* Animated particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 15}s`,
            animationDuration: `${15 + Math.random() * 10}s`,
          }}
        />
      ))}

      <div className="max-w-7xl h-dvh flex flex-col justify-center mx-auto px-6 text-center relative z-10">
        <div className="stagger-fade-in" style={{ animationDelay: "0.1s" }}>
          <p className="text-[#00e5cc] font-mono text-sm tracking-[0.3em] mb-6">
            AI / BLOCKCHAIN DEVELOPER
          </p>
        </div>

        <h1
          className="text-6xl md:text-8xl font-bold mb-6 stagger-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          <span className="gradient-text">Bridging</span>
          <br />
          <span className="text-white">Intelligence</span>
        </h1>

        <p
          className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-12 stagger-fade-in"
          style={{ animationDelay: "0.3s" }}
        >
          Crafting the future where artificial intelligence meets decentralized
          systems. Building next-generation protocols that redefine what's
          possible.
        </p>

        <div
          className="flex flex-col md:flex-row gap-6 justify-center stagger-fade-in"
          style={{ animationDelay: "0.4s" }}
        >
          <a href="#projects" className="neon-button">
            View Projects
          </a>
          <a href="#contact" className="neon-button" style={{ borderColor: "#00e5cc", color: "#00e5cc" }}>
            Get In Touch
          </a>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 stagger-fade-in"
          style={{ animationDelay: "0.6s" }}
        >
          <div className="w-6 h-10 border-2 border-slate-600 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-[#00e5cc] rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="glass-card float-card project-card p-6 cursor-pointer"
      style={{
        animationDelay: `${index * 0.2}s`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="project-card-content">
        <div className="flex items-center justify-between mb-4">
          <span
            className={`px-3 py-1 text-xs font-mono rounded-full bg-gradient-to-r ${project.gradient} text-white`}
          >
            {project.status}
          </span>
          <span className="text-slate-500 font-mono text-sm">{project.year}</span>
        </div>

        <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
        <p className="text-slate-400 mb-6 leading-relaxed">{project.description}</p>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-mono bg-white/5 border border-white/10 rounded-full text-slate-300"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Hover glow effect */}
        <div
          className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${project.gradient} opacity-0 transition-opacity duration-500 -z-10 ${
            isHovered ? "opacity-10" : ""
          }`}
        />
      </div>
    </div>
  );
}

function Projects() {
  return (
    <section id="projects" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <p className="text-[#00e5cc] font-mono text-sm tracking-[0.3em] mb-4">
            SELECTED WORK
          </p>
          <h2 className="section-title text-4xl md:text-5xl font-bold text-white">
            Projects
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillBar({ skill, index }: { skill: typeof SKILLS[0]; index: number }) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated) {
          setAnimated(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [animated]);

  return (
    <div ref={ref} className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-white font-medium">{skill.name}</span>
        <span className="text-slate-500 font-mono text-sm">{skill.level}%</span>
      </div>
      <div className="skill-bar">
        <div
          className="skill-bar-fill"
          style={{
            width: animated ? `${skill.level}%` : "0%",
            animationDelay: `${index * 0.15}s`,
          }}
        />
      </div>
    </div>
  );
}

function Skills() {
  return (
    <section id="skills" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <p className="text-[#00e5cc] font-mono text-sm tracking-[0.3em] mb-4">
            TECHNICAL EXPERTISE
          </p>
          <h2 className="section-title text-4xl md:text-5xl font-bold text-white">
            Skills
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="glass-card p-8">
            <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
              <span className="w-2 h-2 bg-[#00e5cc] rounded-full" />
              Technical Stack
            </h3>
            {SKILLS.map((skill, index) => (
              <SkillBar key={skill.name} skill={skill} index={index} />
            ))}
          </div>

          <div className="space-y-6">
            <div className="glass-card p-8 neon-border">
              <h3 className="text-xl font-bold text-white mb-4">Blockchain</h3>
              <p className="text-slate-400 mb-4">
                Deep expertise in smart contract development, DeFi protocols, and
                consensus mechanisms.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Solidity", "Rust", "Solana", "Ethereum", "Cosmos"].map(
                  (tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-sm bg-[#00ff88]/10 border border-[#00ff88]/30 rounded-full text-[#00ff88]"
                    >
                      {tech}
                    </span>
                  )
                )}
              </div>
            </div>

            <div className="glass-card p-8 neon-border">
              <h3 className="text-xl font-bold text-white mb-4">AI/ML</h3>
              <p className="text-slate-400 mb-4">
                Experience building ML models, neural networks, and integrating
                AI into blockchain applications.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Python", "TensorFlow", "PyTorch", "LangChain", "OpenAI"].map(
                  (tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-sm bg-[#00ff88]/10 border border-[#00ff88]/30 rounded-full text-[#00ff88]"
                    >
                      {tech}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({
  item,
  index,
}: {
  item: typeof EXPERIENCE[0];
  index: number;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const isLeft = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`relative flex items-center ${
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      } mb-8 md:mb-0`}
    >
      {/* Content */}
      <div
        className={`md:w-1/2 ${
          isLeft ? "md:pr-12 md:text-right" : "md:pl-12"
        } ${isVisible ? "opacity-100 translate-x-0" : "opacity-0"} transition-all duration-700`}
        style={{
          transform: isVisible
            ? "translateX(0)"
            : isLeft
            ? "translateX(-50px)"
            : "translateX(50px)",
        }}
      >
        <div className="glass-card p-6">
          <span className="text-[#00e5cc] font-mono text-sm">
            {item.period}
          </span>
          <h3 className="text-xl font-bold text-white mt-1">{item.role}</h3>
          <p className="text-[#00e5cc] text-lg mb-2">{item.company}</p>
          <p className="text-slate-400 mb-4">{item.description}</p>
          <div className="flex flex-wrap gap-2 justify-start">
            {item.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-xs bg-white/5 border border-white/10 rounded text-slate-400"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Center dot */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center">
        <div
          className={`timeline-dot ${isVisible ? "active" : ""}`}
          style={{ transitionDelay: `${index * 0.2}s` }}
        />
      </div>

      {/* Empty space for the other side */}
      <div className="hidden md:block md:w-1/2" />
    </div>
  );
}

function Experience() {
  return (
    <section id="experience" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <p className="text-[#8b5cf6] font-mono text-sm tracking-[0.3em] mb-4">
            CAREER JOURNEY
          </p>
          <h2 className="section-title text-4xl md:text-5xl font-bold text-white">
            Experience
          </h2>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block timeline-line" />

          <div className="space-y-12 md:space-y-0">
            {EXPERIENCE.map((item, index) => (
              <TimelineItem key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-32 relative">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="mb-12">
          <p className="text-[#00e5cc] font-mono text-sm tracking-[0.3em] mb-4">
            GET IN TOUCH
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Let's Build the Future
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Always excited to discuss new projects, creative ideas, or
            opportunities to be part of your vision.
          </p>
        </div>

        <div className="glass-card p-8 md:p-12 animated-borde">
          <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
            <a
              href="mailto:hello@nexus.dev"
              className="flex items-center gap-3 text-lg text-slate-300 hover:text-[#00f5ff] transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              hello@copylabs.dev
            </a>

            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-lg text-slate-300 hover:text-white transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              GitHub
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-lg text-slate-300 hover:text-[#00f5ff] transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              Twitter
            </a>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-slate-500 text-sm">
              &copy; {new Date().getFullYear()} CopyLabs. Crafted with passion and code.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ParallaxBackground() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY * 0.3);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none -z-10"
      style={{ transform: `translateY(${offset}px)` }}
    >
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00f5ff] rounded-full opacity-5 blur-3xl"
        style={{ transform: `translateY(${-offset * 0.5}px)` }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00e5cc] rounded-full opacity-5 blur-3xl"
        style={{ transform: `translateY(${-offset * 0.3}px)` }}
      />
    </div>
  );
}

export default function FuturisticPortfolio() {
  return (
    <main className="relative">
      <AnimatedGradientBackground />
      <CursorGlow />
      <ParallaxBackground />
      <Navigation />
      <Hero />
      <Projects />
      <Skills />
      <Experience />
      <Contact />
    </main>
  );
}
