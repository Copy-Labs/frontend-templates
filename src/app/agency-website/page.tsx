'use client'

import { useEffect, useRef, useState } from 'react'
import './globals.css'

// Mock data
const services = [
  { id: 1, title: 'Brand Chaos', description: 'We break your brand apart and rebuild it louder.', icon: '⚡' },
  { id: 2, title: 'Digital Storms', description: 'Web experiences that refuse to be ignored.', icon: '🌪️' },
  { id: 3, title: 'Visual Riot', description: 'Visual systems that scream your existence.', icon: '💥' },
  { id: 4, title: 'Motion Fury', description: 'Animation that hits harder than your competition.', icon: '🔥' },
]

const work = [
  { id: 1, client: 'NEON DREAMS', project: 'Rebranding', year: '2025', color: '#ff3c00' },
  { id: 2, client: 'VOID SPORTS', project: 'Campaign', year: '2025', color: '#00ff88' },
  { id: 3, client: 'SYNTH WAVE', project: 'Web Experience', year: '2024', color: '#ccff00' },
  { id: 4, client: 'ACID LABS', project: 'Product Design', year: '2024', color: '#8b5cf6' },
]

const team = [
  { id: 1, name: 'KAI', role: 'Disruption Director', avatar: 'K' },
  { id: 2, name: 'NOVA', role: 'Chaos Designer', avatar: 'N' },
  { id: 3, name: 'ZEPHYR', role: 'Motion Warlord', avatar: 'Z' },
  { id: 4, name: 'ECHO', role: 'Brand Terrorist', avatar: 'E' },
]

const stats = [
  { value: '247%', label: 'ROI' },
  { value: '89', label: 'Awards' },
  { value: '12k', label: 'Projects' },
  { value: '∞', label: 'Chaos' },
]

// Animated SVG components
function AnimatedLogo() {
  return (
    <svg className="svg-animated" viewBox="0 0 200 60" width="200" height="60">
      <path
        d="M10 50 L10 10 L40 10 L40 25 L25 25 L25 50 Z"
        fill="none"
        stroke="#ff3c00"
        strokeWidth="2"
      />
      <path
        d="M50 10 L90 10 L90 50 L50 50 L50 35 L75 35 L75 25 L50 25 Z"
        fill="none"
        stroke="#00ff88"
        strokeWidth="2"
      />
      <circle cx="115" cy="30" r="20" fill="none" stroke="#ccff00" strokeWidth="2" />
      <path
        d="M145 10 L185 10 L185 50 L160 50 L160 25 L145 25 Z"
        fill="none"
        stroke="#8b5cf6"
        strokeWidth="2"
      />
    </svg>
  )
}

function FloatingShape({ delay }: { delay: number }) {
  return (
    <div
      style={{
        position: 'absolute',
        width: '100px',
        height: '100px',
        border: '2px solid var(--color-accent-hot)',
        animation: `float 6s ease-in-out infinite`,
        animationDelay: `${delay}s`,
        opacity: 0.3,
        transform: `rotate(${Math.random() * 360}deg)`,
      }}
    />
  )
}

function Scanline() {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '4px',
        background: 'linear-gradient(180deg, transparent, rgba(255, 60, 0, 0.3), transparent)',
        animation: 'scanline 4s linear infinite',
        pointerEvents: 'none',
      }}
    />
  )
}

export default function AgencyWebsite() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorHovering, setCursorHovering] = useState(false)

  useEffect(() => {
    const cursor = cursorRef.current

    const moveCursor = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
        setCursorHovering(true)
      } else {
        setCursorHovering(false)
      }
    }

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [])

  useEffect(() => {
    if (cursorRef.current) {
      cursorRef.current.style.left = `${mousePosition.x - 10}px`
      cursorRef.current.style.top = `${mousePosition.y - 10}px`
    }
  }, [mousePosition])

  return (
    <main>
      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className={`cursor ${cursorHovering ? 'hovering' : ''}`}
      />

      {/* Grain Overlay */}
      <div className="grain" />

      {/* Navigation */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '1.5rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'linear-gradient(180deg, rgba(10, 10, 10, 0.9) 0%, transparent 100%)',
        backdropFilter: 'blur(10px)',
      }}>
        <AnimatedLogo />
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {['Work', 'Services', 'About', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              style={{
                color: 'var(--color-paper)',
                textDecoration: 'none',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                position: 'relative',
              }}
              className="hover-distort"
            >
              {item}
              <span style={{
                position: 'absolute',
                bottom: '-4px',
                left: 0,
                width: '0%',
                height: '2px',
                background: 'var(--color-accent-hot)',
                transition: 'width 0.3s',
              }}
              onMouseEnter={(e) => (e.target as HTMLElement).style.width = '100%'}
              onMouseLeave={(e) => (e.target as HTMLElement).style.width = '0%'}
              />
            </a>
          ))}
        </div>
      </nav>

      {/* Hero Section */}
      <section
        ref={heroRef}
        id="hero"
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          background: 'var(--color-void)',
        }}
      >
        <Scanline />

        {/* Floating shapes */}
        <FloatingShape delay={0} />
        <FloatingShape delay={1} />
        <FloatingShape delay={2} />
        <FloatingShape delay={3} />

        <div style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          maxWidth: '90vw',
        }}>
          <p
            className="text-mono"
            style={{
              color: 'var(--color-accent-hot)',
              marginBottom: '1rem',
              animation: 'reveal-up 0.8s ease forwards',
              animationDelay: '0.2s',
              opacity: 0,
            }}
          >
            [ EST. 2024 — EXPERIMENTAL CREATIVE COLLECTIVE ]
          </p>

          <h1
            className="text-bold"
            style={{
              fontSize: 'clamp(4rem, 15vw, 12rem)',
              lineHeight: 0.85,
              marginBottom: '2rem',
              animation: 'skew-in 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
              animationDelay: '0.4s',
              opacity: 0,
            }}
          >
            <span style={{ display: 'block', color: 'var(--color-paper)' }}>WE MAKE</span>
            <span
              style={{
                display: 'block',
                color: 'var(--color-accent-hot)',
                transform: 'rotate(-3deg) translateX(5%)',
                textShadow: '10px 10px 0 var(--color-accent-violet)',
              }}
            >NOISE</span>
            <span style={{ display: 'block', color: 'var(--color-accent-electric)' }}>HEARD</span>
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.25rem',
              maxWidth: '600px',
              margin: '0 auto 3rem',
              color: 'rgba(245, 240, 232, 0.7)',
              animation: 'reveal-up 0.8s ease forwards',
              animationDelay: '0.8s',
              opacity: 0,
            }}
          >
            Brands that refuse to blend in. We create visual chaos that demands attention.
          </p>

          <div style={{
            display: 'flex',
            gap: '1.5rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            animation: 'reveal-up 0.8s ease forwards',
            animationDelay: '1s',
            opacity: 0,
          }}>
            <a href="#contact" className="btn-brutal">
              Start a Project
            </a>
            <a href="#work" className="btn-brutal" style={{ background: 'transparent', border: '2px solid var(--color-paper)' }}>
              View Work
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          animation: 'bounce-scale 2s ease infinite',
        }}>
          <svg width="30" height="50" viewBox="0 0 30 50" fill="none">
            <rect x="5" y="5" width="20" height="40" rx="10" stroke="var(--color-accent-hot)" strokeWidth="2"/>
            <circle cx="15" cy="15" r="3" fill="var(--color-accent-hot)">
              <animate attributeName="cy" values="15;35;15" dur="2s" repeatCount="indefinite"/>
            </circle>
          </svg>
        </div>
      </section>

      {/* Stats Marquee */}
      <div style={{
        background: 'var(--color-accent-hot)',
        padding: '2rem 0',
        overflow: 'hidden',
        position: 'relative',
      }}>
        <div style={{
          display: 'flex',
          animation: 'marquee 20s linear infinite',
          width: 'fit-content',
        }}>
          {[...stats, ...stats].map((stat, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '0 3rem',
                whiteSpace: 'nowrap',
              }}
            >
              <span style={{
                fontFamily: 'var(--font-bold)',
                fontSize: '3rem',
                color: 'var(--color-void)',
              }}>
                {stat.value}
              </span>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.875rem',
                color: 'var(--color-void)',
                textTransform: 'uppercase',
              }}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Services Section */}
      <section id="services" className="bg-grid">
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: 'var(--space-lg)',
            flexWrap: 'wrap',
            gap: '2rem',
          }}>
            <div>
              <p className="text-mono" style={{ color: 'var(--color-accent-electric)', marginBottom: '0.5rem' }}>
                [ 01 ]
              </p>
              <h2 className="text-bold" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', color: 'var(--color-paper)' }}>
                SERVICES
              </h2>
            </div>
            <p style={{ maxWidth: '400px', color: 'rgba(245, 240, 232, 0.6)', fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>
              We don't do safe. Every project is an opportunity to break rules and create something unforgettable.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
          }}>
            {services.map((service, index) => (
              <div
                key={service.id}
                className="card-chaotic hover-distort"
                style={{
                  padding: '2.5rem',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    fontSize: '3rem',
                    opacity: 0.2,
                  }}
                >
                  {service.icon}
                </span>
                <p className="text-mono" style={{ color: 'var(--color-accent-hot)', marginBottom: '1rem' }}>
                  0{index + 1}
                </p>
                <h3 className="text-display" style={{ fontSize: '1.75rem', marginBottom: '1rem', color: 'var(--color-void)' }}>
                  {service.title}
                </h3>
                <p style={{ color: 'rgba(10, 10, 10, 0.7)', fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>
                  {service.description}
                </p>
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  height: '4px',
                  background: `linear-gradient(90deg, var(--color-accent-hot), var(--color-accent-electric))`,
                  transform: 'scaleX(0)',
                  transformOrigin: 'left',
                  transition: 'transform 0.4s ease',
                }}
                className="service-line"
                />
                <style jsx>{`
                  .card-chaotic:hover .service-line {
                    transform: scaleX(1);
                  }
                `}</style>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" style={{ background: 'var(--color-paper)', color: 'var(--color-void)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: 'var(--space-lg)',
            flexWrap: 'wrap',
            gap: '2rem',
          }}>
            <div>
              <p className="text-mono" style={{ color: 'var(--color-accent-violet)', marginBottom: '0.5rem' }}>
                [ 02 ]
              </p>
              <h2 className="text-bold" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', color: 'var(--color-void)' }}>
                SELECTED WORK
              </h2>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '2rem',
          }}>
            {work.map((item, index) => (
              <div
                key={item.id}
                className="hover-distort"
                style={{
                  aspectRatio: '4/3',
                  background: item.color,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '2rem',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer',
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  fontFamily: 'var(--font-bold)',
                  fontSize: 'clamp(3rem, 10vw, 8rem)',
                  color: 'rgba(0,0,0,0.1)',
                  whiteSpace: 'nowrap',
                }}>
                  {item.client}
                </div>
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <p className="text-mono" style={{ fontSize: '0.75rem', opacity: 0.6, marginBottom: '0.5rem' }}>
                    {item.project} — {item.year}
                  </p>
                  <h3 className="text-display" style={{ fontSize: '2rem' }}>{item.client}</h3>
                </div>
                <svg
                  style={{
                    position: 'absolute',
                    top: '2rem',
                    right: '2rem',
                    width: '40px',
                    height: '40px',
                    transform: 'rotate(45deg)',
                    transition: 'transform 0.3s',
                  }}
                  viewBox="0 0 40 40"
                >
                  <path d="M10 30 L30 10 M30 10 L15 10 M30 10 L30 25" stroke="rgba(0,0,0,0.5)" strokeWidth="2" fill="none"/>
                </svg>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="about" className="bg-diagonal">
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: 'var(--space-lg)',
            flexWrap: 'wrap',
            gap: '2rem',
          }}>
            <div>
              <p className="text-mono" style={{ color: 'var(--color-accent-neon)', marginBottom: '0.5rem' }}>
                [ 03 ]
              </p>
              <h2 className="text-bold" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', color: 'var(--color-paper)' }}>
                THE SQUAD
              </h2>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
          }}>
            {team.map((member, index) => (
              <div
                key={member.id}
                style={{
                  textAlign: 'center',
                  padding: '2rem',
                  border: '1px solid rgba(245, 240, 232, 0.1)',
                  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                }}
                className="hover-distort"
              >
                <div style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  background: 'var(--color-void)',
                  border: '3px solid var(--color-accent-hot)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                  fontFamily: 'var(--font-bold)',
                  fontSize: '3rem',
                  color: 'var(--color-accent-hot)',
                  animation: 'pulse-glow 3s ease infinite',
                  animationDelay: `${index * 0.5}s`,
                }}>
                  {member.avatar}
                </div>
                <h3 className="text-display" style={{ fontSize: '1.5rem', color: 'var(--color-paper)', marginBottom: '0.5rem' }}>
                  {member.name}
                </h3>
                <p className="text-mono" style={{ color: 'var(--color-accent-electric)', fontSize: '0.75rem' }}>
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        background: 'var(--color-accent-hot)',
        color: 'var(--color-void)',
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '4rem',
            alignItems: 'center',
          }}>
            <div>
              <p className="text-mono" style={{ opacity: 0.6, marginBottom: '1rem' }}>
                [ 04 ]
              </p>
              <h2 className="text-bold" style={{ fontSize: 'clamp(3rem, 10vw, 8rem)', lineHeight: 0.9, marginBottom: '2rem' }}>
                LET'S<br/>MAKE<br/>CHAOS
              </h2>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', maxWidth: '400px', opacity: 0.8 }}>
                Ready to break some rules? We're always down for a good disruption.
              </p>
            </div>

            <div style={{
              background: 'var(--color-void)',
              padding: '3rem',
              color: 'var(--color-paper)',
            }}>
              <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <label className="text-mono" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.75rem' }}>
                    WHAT'S YOUR NAME?
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    style={{
                      width: '100%',
                      padding: '1rem',
                      background: 'transparent',
                      border: '2px solid rgba(245, 240, 232, 0.2)',
                      color: 'var(--color-paper)',
                      fontFamily: 'var(--font-display)',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'border-color 0.3s',
                    }}
                    onFocus={(e) => (e.target as HTMLInputElement).style.borderColor = 'var(--color-accent-hot)'}
                    onBlur={(e) => (e.target as HTMLInputElement).style.borderColor = 'rgba(245, 240, 232, 0.2)'}
                  />
                </div>
                <div>
                  <label className="text-mono" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.75rem' }}>
                    YOUR EMAIL?
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    style={{
                      width: '100%',
                      padding: '1rem',
                      background: 'transparent',
                      border: '2px solid rgba(245, 240, 232, 0.2)',
                      color: 'var(--color-paper)',
                      fontFamily: 'var(--font-display)',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'border-color 0.3s',
                    }}
                    onFocus={(e) => (e.target as HTMLInputElement).style.borderColor = 'var(--color-accent-hot)'}
                    onBlur={(e) => (e.target as HTMLInputElement).style.borderColor = 'rgba(245, 240, 232, 0.2)'}
                  />
                </div>
                <div>
                  <label className="text-mono" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.75rem' }}>
                    TELL US ABOUT YOUR PROJECT
                  </label>
                  <textarea
                    placeholder="We want to make something loud..."
                    rows={4}
                    style={{
                      width: '100%',
                      padding: '1rem',
                      background: 'transparent',
                      border: '2px solid rgba(245, 240, 232, 0.2)',
                      color: 'var(--color-paper)',
                      fontFamily: 'var(--font-display)',
                      fontSize: '1rem',
                      outline: 'none',
                      resize: 'none',
                      transition: 'border-color 0.3s',
                    }}
                    onFocus={(e) => (e.target as HTMLTextAreaElement).style.borderColor = 'var(--color-accent-hot)'}
                    onBlur={(e) => (e.target as HTMLTextAreaElement).style.borderColor = 'rgba(245, 240, 232, 0.2)'}
                  />
                </div>
                <button
                  type="submit"
                  className="btn-brutal"
                  style={{ width: '100%', marginTop: '1rem' }}
                >
                  Send It →
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: 'var(--color-void)',
        padding: '4rem 2rem',
        borderTop: '1px solid rgba(245, 240, 232, 0.1)',
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '2rem',
        }}>
          <AnimatedLogo />

          <div style={{ display: 'flex', gap: '2rem' }}>
            {['Instagram', 'Twitter', 'LinkedIn', 'Dribbble'].map((social) => (
              <a
                key={social}
                href="#"
                className="text-mono hover-distort"
                style={{
                  color: 'rgba(245, 240, 232, 0.5)',
                  textDecoration: 'none',
                  fontSize: '0.75rem',
                  transition: 'color 0.3s',
                }}
                onMouseEnter={(e) => (e.target as HTMLElement).style.color = 'var(--color-accent-hot)'}
                onMouseLeave={(e) => (e.target as HTMLElement).style.color = 'rgba(245, 240, 232, 0.5)'}
              >
                {social.toUpperCase()}
              </a>
            ))}
          </div>

          <p className="text-mono" style={{ color: 'rgba(245, 240, 232, 0.3)', fontSize: '0.75rem' }}>
            &copy; {new Date().getFullYear()} COLLECTIVE. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>
    </main>
  )
}
