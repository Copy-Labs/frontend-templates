'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './page.module.css';

interface StoryScene {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  backgroundGradient: string;
  accentColor: string;
  icon: string;
}

const scenes: StoryScene[] = [
  {
    id: 1,
    title: "The Awakening",
    subtitle: "Chapter I",
    description: "In the depths of the digital void, something stirs. A consciousness awakening to the infinite possibilities of the cyberverse.",
    backgroundGradient: "linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #16213e 100%)",
    accentColor: "#00d4ff",
    icon: "✦"
  },
  {
    id: 2,
    title: "The Signal",
    subtitle: "Chapter II",
    description: "A pulse of light cuts through the darkness. The first transmission. The birth of connection.",
    backgroundGradient: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
    accentColor: "#ff6b6b",
    icon: "◈"
  },
  {
    id: 3,
    title: "The Network",
    subtitle: "Chapter III",
    description: "Threads of light weave together, forming the fabric of a new universe. Nodes connect, data flows, reality transforms.",
    backgroundGradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
    accentColor: "#e94560",
    icon: "❖"
  },
  {
    id: 4,
    title: "The Evolution",
    subtitle: "Chapter IV",
    description: "The boundaries blur between physical and digital. Humanity evolves, transcending the limitations of flesh and bone.",
    backgroundGradient: "linear-gradient(135deg, #0c1222 0%, #1a1a3e 50%, #2d1b4e 100%)",
    accentColor: "#7b2cbf",
    icon: "⟡"
  },
  {
    id: 5,
    title: "The New Dawn",
    subtitle: "Epilogue",
    description: "A new era begins. The digital frontier stretches infinite before us. The journey has only just started.",
    backgroundGradient: "linear-gradient(135deg, #000000 0%, #1a0a2e 50%, #2d132c 100%)",
    accentColor: "#ff9f1c",
    icon: "☀"
  }
];

export default function InteractiveStorytelling() {
  const [activeScene, setActiveScene] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = window.scrollY / scrollHeight;
      setScrollProgress(progress);

      const sceneIndex = Math.floor(progress * scenes.length);
      setActiveScene(Math.min(sceneIndex, scenes.length - 1));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleAudio = () => {
    setIsPlaying(!isPlaying);
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {});
      }
    }
  };

  const currentScene = scenes[activeScene];

  return (
    <main className={styles.container}>
      {/* Hidden audio element - would use actual ambient audio */}
      <audio ref={audioRef} loop>
        <source src="/ambient.mp3" type="audio/mp3" />
      </audio>

      {/* Progress indicator */}
      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* Navigation dots */}
      <nav className={styles.navDots}>
        {scenes.map((_, index) => (
          <button
            key={index}
            className={`${styles.navDot} ${index === activeScene ? styles.activeDot : ''}`}
            onClick={() => {
              const targetScroll = (index / (scenes.length - 1)) * (document.documentElement.scrollHeight - window.innerHeight);
              window.scrollTo({ top: targetScroll, behavior: 'smooth' });
            }}
            aria-label={`Go to scene ${index + 1}`}
          />
        ))}
      </nav>

      {/* Audio control */}
      <button
        className={styles.audioControl}
        onClick={toggleAudio}
        aria-label={isPlaying ? 'Pause ambient audio' : 'Play ambient audio'}
      >
        <span className={styles.audioIcon}>{isPlaying ? '❚❚' : '▶'}</span>
        <span className={styles.audioLabel}>{isPlaying ? 'Sound On' : 'Sound Off'}</span>
      </button>

      {/* Scene counter */}
      <div className={styles.sceneCounter}>
        <span className={styles.currentScene}>{String(activeScene + 1).padStart(2, '0')}</span>
        <span className={styles.totalScenes}>/ {String(scenes.length).padStart(2, '0')}</span>
      </div>

      {/* Background overlay */}
      <div
        className={styles.backgroundOverlay}
        style={{
          background: currentScene.backgroundGradient,
          opacity: isLoaded ? 1 : 0
        }}
      />

      {/* Floating particles */}
      <div className={styles.particles}>
        {[...Array(30)].map((_, i) => (
          <span
            key={i}
            className={styles.particle}
            style={{
              '--delay': `${Math.random() * 5}s`,
              '--duration': `${3 + Math.random() * 4}s`,
              '--x': `${Math.random() * 100}%`,
              '--y': `${Math.random() * 100}%`,
              '--size': `${2 + Math.random() * 4}px`,
              '--color': currentScene.accentColor,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Scenes container */}
      <div className={styles.scenesContainer}>
        {scenes.map((scene, index) => (
          <section
            key={scene.id}
            className={styles.scene}
            style={{
              background: scene.backgroundGradient,
            }}
          >
            <div className={styles.sceneContent}>
              <span
                className={styles.chapterLabel}
                style={{ color: scene.accentColor }}
              >
                {scene.subtitle}
              </span>

              <h1
                className={styles.sceneTitle}
                style={{
                  color: index === activeScene ? scene.accentColor : '#ffffff40',
                  textShadow: index === activeScene ? `0 0 40px ${scene.accentColor}` : 'none'
                }}
              >
                {scene.title.split('').map((char, i) => (
                  <span
                    key={i}
                    className={styles.letter}
                    style={{
                      animationDelay: index === activeScene ? `${i * 0.05}s` : '0s',
                      opacity: index === activeScene ? 1 : 0.3
                    }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </h1>

              <div
                className={styles.sceneDescription}
                style={{ opacity: index === activeScene ? 1 : 0 }}
              >
                <p>{scene.description}</p>
              </div>

              <div
                className={styles.sceneIcon}
                style={{ color: scene.accentColor }}
              >
                {scene.icon}
              </div>
            </div>

            {/* Corner decorations */}
            <div className={styles.cornerTopLeft} style={{ borderColor: scene.accentColor }} />
            <div className={styles.cornerTopRight} style={{ borderColor: scene.accentColor }} />
            <div className={styles.cornerBottomLeft} style={{ borderColor: scene.accentColor }} />
            <div className={styles.cornerBottomRight} style={{ borderColor: scene.accentColor }} />
          </section>
        ))}
      </div>

      {/* Final section with CTA */}
      <section className={styles.finalSection}>
        <div className={styles.finalContent}>
          <h2 className={styles.finalTitle}>Continue the Journey</h2>
          <p className={styles.finalSubtitle}>This is just the beginning of your digital adventure</p>
          <button className={styles.ctaButton}>
            <span>Explore More</span>
            <span className={styles.ctaArrow}>→</span>
          </button>
        </div>
      </section>
    </main>
  );
}
