"use client";

import { Russo_One, Archivo_Narrow } from 'next/font/google';
import { motion } from 'framer-motion';

const russoOne = Russo_One({ subsets: ['latin'], weight: ['400'] });
const archivoNarrow = Archivo_Narrow({ subsets: ['latin'], weight: ['400', '600'] });

const examples = [
  { id: 1, title: "Futuristic Web3 Portfolio", href: "/futuristic-web3-portfolio", description: "Dive into a neon-drenched portfolio for digital nomads." },
  { id: 2, title: "Minimalist SaaS Dashboard", href: "/minimalist-saas-dashboard", description: "Sleek data visualization meets clean design." },
  { id: 3, title: "Web3 Wallet Dashboard", href: "/web3-wallet-dashboard", description: "Crypto management with futuristic flair." },
  { id: 4, title: "Interactive Storytelling", href: "/interactive-storytelling", description: "Narratives that bend reality." },
  { id: 5, title: "Agency Website", href: "/agency-website", description: "Bold branding for creative agencies." },
  { id: 6, title: "Personal Knowledge Base", href: "/personal-knowledge-base", description: "Organize chaos into wisdom." },
  { id: 7, title: "E-commerce Product Page", href: "/e-commerce-product", description: "Shopping elevated to art." },
  { id: 8, title: "Startup Pitch Page", href: "/startup-pitch", description: "Pitch perfection in pixels." },
  { id: 9, title: "ChatGPT Retro", href: "/chatgpt-retro", description: "AI chat with vintage vibes." },
  { id: 10, title: "AI Chat Interface", href: "/ai-chat-interface", description: "Conversations with cutting-edge UI." },
  { id: 11, title: "Event Landing Page", href: "/event-landing-page", description: "Events that explode with energy." },
  { id: 12, title: "Music Streaming Page", href: "/music-streaming", description: "Tunes flowing through space." },
  // { id: 13, title: "News Aggregator", href: "/news-aggregator", description: "Information overload, beautifully." },
];

const gradients = [
  "from-pink-400 via-purple-500 to-blue-500",
  "from-green-400 via-teal-500 to-cyan-500",
  "from-yellow-400 via-orange-500 to-red-500",
  "from-indigo-400 via-blue-500 to-purple-500",
  "from-pink-500 via-red-500 to-yellow-500",
  "from-cyan-400 via-blue-500 to-indigo-500",
  "from-lime-400 via-green-500 to-teal-500",
  "from-orange-400 via-red-500 to-pink-500",
  "from-purple-400 via-pink-500 to-red-500",
  "from-teal-400 via-cyan-500 to-blue-500",
  "from-yellow-500 via-orange-500 to-red-500",
  "from-blue-400 via-indigo-500 to-purple-500",
  "from-green-500 via-lime-500 to-cyan-500",
];

const blobClasses = [
  "blob-animate-1",
  "blob-animate-2",
  "blob-animate-3",
  "blob-animate-4",
  "blob-animate-5",
  "blob-animate-1",
  "blob-animate-2",
  "blob-animate-3",
  "blob-animate-4",
  "blob-animate-5",
  "blob-animate-1",
  "blob-animate-2",
  "blob-animate-3",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
};

const itemVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 100,
      duration: 0.6
    }
  }
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Grain texture overlay */}
      <div className="grain-overlay" />

      {/* Colourful background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 w-16 h-16 border-4 border-pink-500 rotate-45 opacity-20"
          animate={{ rotate: [45, 60, 45] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-32 right-32 w-12 h-12 bg-green-400 rounded-full opacity-20"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-8 h-20 bg-yellow-400 skew-x-12 opacity-30"
          animate={{ skewX: [12, 0, 12] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.main
        className="relative z-10 py-12 px-4 sm:py-16 sm:px-6 md:py-20 md:px-8 max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className={`text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-black mb-8 sm:mb-10 md:mb-12 text-center leading-tight ${russoOne.className}`}
          variants={itemVariants}
        >
          WILD FRONTEND
        </motion.h1>

        <motion.p
          className={`text-lg sm:text-xl md:text-2xl text-gray-600 text-center mb-16 sm:mb-20 md:mb-24 max-w-4xl mx-auto font-medium leading-relaxed ${archivoNarrow.className}`}
          variants={itemVariants}
        >
          Explore these outrageous, boundary-pushing interfaces that redefine what's possible on the web.
        </motion.p>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-16 gap-x-8"
          variants={containerVariants}
        >
          {examples.map((example, index) => (
            <motion.a
              key={example.id}
              href={example.href}
              variants={itemVariants}
              whileHover={{
                scale: 1.03,
                y: -6,
              }}
              whileTap={{ scale: 0.98 }}
              className="group relative bg-white/70 backdrop-blur-xl p-6 sm:p-7 rounded-lg transition-all duration-300 overflow-clip border border-white/50 shadow-sm h-80 hover:shadow-xl"
              style={{
                transform: index % 2 === 0 ? 'rotate(0.5deg)' : 'rotate(-0.5deg)',
              }}
            >
              {/* CSS-based organic blob - smaller size */}
              <div
                className={`absolute left-1/2 -translate-x-1/2 top-12 w-64 h-64 bg-gradient-to-br ${gradients[index % gradients.length]} opacity-15 ${blobClasses[index % blobClasses.length]}`}
                style={{ zIndex: -1, filter: 'blur(10px)' }}
              />
              <div className="grain-overlay" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-5 pt-8">
                  <span className="text-base font-bold tracking-widest text-gray-400 uppercase">
                    {String(index+1).padStart(2, '0')}
                  </span>
                  {/*<div className="w-2 h-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500" />*/}
                </div>

                <h2 className={`text-4xl sm:text-xl font-bold mb-3 text-gray-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-600 transition-all ${archivoNarrow.className}`}>
                  {example.title}
                </h2>

                <p className={`text-gray-600 group-hover:text-gray-800 transition-colors leading-relaxed text-lg ${archivoNarrow.className}`}>
                  {example.description}
                </p>

                <div className="mt-12 flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-500 group-hover:text-blue-500 transition-colors">
                    View Project
                  </span>
                  <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </motion.main>
    </div>
  );
}
