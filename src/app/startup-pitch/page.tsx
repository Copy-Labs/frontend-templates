'use client';

import { useEffect, useState } from 'react';

// Get current year dynamically
const currentYear = new Date().getFullYear();

// Mock Data - Revolutionary AI Startup
const navLinks = [
  { label: 'Product', href: '#product' },
  { label: 'Manifesto', href: '#manifesto' },
  { label: 'Traction', href: '#traction' },
  { label: 'Join', href: '#join' },
];

const problems = [
  {
    id: 1,
    title: 'Your Data Is Lying to You',
    description: 'Traditional analytics show what happened. Not why. Not what\'s coming. You\'re flying blind.',
    stat: '73%',
    statLabel: 'of executives don\'t trust their data',
  },
  {
    id: 2,
    title: 'Decisions Take Forever',
    description: 'By the time insights reach decision makers, the opportunity is gone. Speed is everything.',
    stat: '4.2x',
    statLabel: 'slower than optimal decision speed',
  },
  {
    id: 3,
    title: 'Tools Are Built for Engineers',
    description: 'SQL. Python. Tableau. The tools exclude the people who actually know the business.',
    stat: '89%',
    statLabel: 'of employees can\'t access insights',
  },
];

const solutions = [
  {
    id: 1,
    title: 'Predict, Don\'t Report',
    description: 'Neural networks that forecast outcomes, not just summarize history. See around corners.',
    icon: '◈',
  },
  {
    id: 2,
    title: 'Instant Intelligence',
    description: 'Ask anything in plain English. Get answers in milliseconds. No queries, no dashboards.',
    icon: '◇',
  },
  {
    id: 3,
    title: 'Insights That Find You',
    description: 'Passive intelligence that surfaces anomalies and opportunities before you even ask.',
    icon: '△',
  },
];

const features = [
  {
    id: 1,
    title: 'Anomaly Radar',
    description: 'Continuous monitoring detects anomalies in real-time. Sleep better knowing nothing slips through.',
    icon: '◎',
  },
  {
    id: 2,
    title: 'Causal Engine',
    description: 'Not just correlations. We map cause and effect so you know what actually moves the needle.',
    icon: '◉',
  },
  {
    id: 3,
    title: 'Scenario Simulator',
    description: 'Model "what if" scenarios instantly. Test strategies before committing resources.',
    icon: '⬡',
  },
  {
    id: 4,
    title: 'Auto-Discovery',
    description: 'Our agents roam your data landscape finding patterns humans miss. Every day, automatically.',
    icon: '◬',
  },
];

const metrics = [
  { value: '2.4B', label: 'Predictions Made', suffix: '' },
  { value: '94.7%', label: 'Accuracy Rate', suffix: '%' },
  { value: '340%', label: 'Avg. ROI', suffix: '%' },
  { value: '12min', label: 'Time to First Insight', suffix: '' },
];

const testimonials = [
  {
    id: 1,
    quote: 'We stopped guessing. VERITY tells us exactly what will happen before it happens. It\'s like having a crystal ball that actually works.',
    author: 'Alex Vance',
    role: 'Chief Strategy Officer',
    company: 'Nexus Ventures',
    avatar: 'AV',
  },
  {
    id: 2,
    quote: 'I haven\'t written a single query in 6 months. I just ask questions and get answers. My whole team uses it now.',
    author: 'Jordan Kim',
    role: 'VP of Marketing',
    company: 'Quantum Labs',
    avatar: 'JK',
  },
  {
    id: 3,
    quote: 'The causal engine identified a dependency we missed for years. We fixed it and saw 40% lift in revenue within 90 days.',
    author: 'Sam Reeves',
    role: 'CEO',
    company: 'Velocity SaaS',
    avatar: 'SR',
  },
];

const pricingPlans = [
  {
    id: 1,
    name: 'Scout',
    price: '0',
    description: 'Dip your toes in the future. Free forever for small teams.',
    features: ['3 team members', '1,000 predictions/mo', 'Basic anomalies', 'Community support'],
    cta: 'Start Free',
    popular: false,
  },
  {
    id: 2,
    name: 'Commander',
    price: '499',
    description: 'Full power for teams that move fast and think bigger.',
    features: ['25 team members', 'Unlimited predictions', 'Causal engine', 'Scenario simulator', 'Priority support', 'API access'],
    cta: 'Go Commander',
    popular: true,
  },
  {
    id: 3,
    name: 'Empire',
    price: 'Custom',
    description: 'For organizations ready to revolutionize decision making.',
    features: ['Unlimited members', 'Dedicated infrastructure', 'Custom models', '24/7 support', 'SLA guarantee', 'On-premise option'],
    cta: 'Contact Us',
    popular: false,
  },
];

const marqueeItems = [
  'Predict the Future', 'Stop Guessing', 'Know Everything', 'Act First', 'Win Always',
  'Predict the Future', 'Stop Guessing', 'Know Everything', 'Act First', 'Win Always'
];

// Components
function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      padding: '1.5rem 0',
      background: scrolled ? 'rgba(10, 10, 10, 0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--color-border-light)' : 'none',
      transition: 'all var(--transition-base)',
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}>
          <div style={{
            width: 44,
            height: 44,
            background: 'var(--gradient-accent)',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            fontWeight: 700,
            color: 'white',
            fontFamily: 'var(--font-display)',
          }}>
            V
          </div>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.75rem',
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            letterSpacing: '0.1em',
          }}>
            VERITY
          </span>
        </div>

        {/* Desktop Nav */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '3rem',
        }} className="desktop-nav">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                color: 'var(--color-text-secondary)',
                fontWeight: 500,
                fontSize: '0.875rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                transition: 'color var(--transition-fast)',
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent-primary)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}
            >
              {link.label}
            </a>
          ))}
        </div>

        <button className="btn btn-primary desktop-cta">
          Get Early Access
        </button>

        {/* Mobile menu button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            color: 'var(--color-text-primary)',
            fontSize: '1.5rem',
            cursor: 'pointer',
          }}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      paddingTop: '8rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Brutalist background elements */}
      <div style={{
        position: 'absolute',
        top: '10%',
        right: '-5%',
        width: '50%',
        height: '80%',
        background: 'var(--gradient-glow)',
        filter: 'blur(100px)',
        pointerEvents: 'none',
      }} />

      {/* Diagonal lines */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          linear-gradient(135deg, transparent 48%, var(--color-border) 48%, var(--color-border) 52%, transparent 52%)
        `,
        backgroundSize: '100px 100px',
        opacity: 0.3,
        pointerEvents: 'none',
      }} />

      <div className="container">
        <div style={{
          maxWidth: 1000,
          margin: '0 auto',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}>
          {/* Glitch badge */}
          <div className="animate-fade-in-up" style={{
            display: 'inline-block',
            padding: '0.5rem 1.5rem',
            border: '1px solid var(--color-accent-primary)',
            marginBottom: '2rem',
            fontSize: '0.75rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: 'var(--color-accent-primary)',
            position: 'relative',
          }}>
            <span style={{ marginRight: '1rem' }}>●</span>
            Now in Public Beta
            <span style={{ marginLeft: '1rem' }}>●</span>
          </div>

          <h1 className="animate-fade-in-up delay-100" style={{
            marginBottom: '1.5rem',
            lineHeight: 0.95,
            position: 'relative',
          }}>
            Your Data Knows<br />
            The <span className="gradient-text animate-glitch">Future</span>
          </h1>

          <p className="animate-fade-in-up delay-200" style={{
            fontSize: '1.25rem',
            maxWidth: 650,
            margin: '0 auto 3rem',
            lineHeight: 1.7,
            color: 'var(--color-text-secondary)',
          }}>
            VERITY uses neural networks to predict outcomes, not just report history.
            Know what will happen. Before it happens. So you can act first.
          </p>

          <div className="animate-fade-in-up delay-300" style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '4rem',
          }}>
            <button className="btn btn-primary" style={{
              padding: '1.25rem 3rem',
              fontSize: '0.9375rem',
            }}>
              Start Predicting
              <span style={{ marginLeft: '0.5rem' }}>→</span>
            </button>
            <button className="btn btn-secondary" style={{
              padding: '1.25rem 3rem',
              fontSize: '0.9375rem',
            }}>
              See It In Action
            </button>
          </div>

          {/* Stats row */}
          <div className="animate-fade-in-up delay-500" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '2rem',
            paddingTop: '3rem',
            borderTop: '1px solid var(--color-border)',
          }}>
            {metrics.slice(0, 4).map((metric, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                  fontWeight: 700,
                  fontFamily: 'var(--font-display)',
                  color: 'var(--color-text-primary)',
                  lineHeight: 1,
                  marginBottom: '0.5rem',
                }}>
                  {metric.value}{metric.suffix}
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'var(--color-text-muted)',
                }}>
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  return (
    <div className="marquee-container">
      <div className="marquee-content">
        {marqueeItems.map((item, i) => (
          <span key={i} className="marquee-item">{item}</span>
        ))}
      </div>
    </div>
  );
}

function ProblemSection() {
  return (
    <section id="product" className="section" style={{
      background: 'var(--color-bg-secondary)',
    }}>
      <div className="container">
        <div className="section-title">
          <h2 className="animate-fade-in-up" style={{
            textAlign: 'left',
          }}>
            The Old Way<br />
            <span className="gradient-text">Is Broken</span>
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          marginTop: '4rem',
        }}>
          {problems.map((problem, index) => (
            <div
              key={problem.id}
              className={`card animate-fade-in-up delay-${(index + 2) * 100}`}
              style={{
                padding: '2.5rem',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Corner accent */}
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: 80,
                height: 80,
                borderTop: '3px solid var(--color-accent-primary)',
                borderRight: '3px solid var(--color-accent-primary)',
              }} />

              <div style={{
                fontSize: '4rem',
                fontWeight: 700,
                color: 'var(--color-accent-primary)',
                fontFamily: 'var(--font-display)',
                lineHeight: 1,
                marginBottom: '1.5rem',
              }}>
                {problem.stat}
              </div>

              <h3 style={{
                marginBottom: '1rem',
                fontSize: '1.5rem',
              }}>
                {problem.title}
              </h3>

              <p style={{
                lineHeight: 1.7,
                marginBottom: '1.5rem',
              }}>
                {problem.description}
              </p>

              <div style={{
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--color-text-muted)',
                paddingTop: '1rem',
                borderTop: '1px solid var(--color-border)',
              }}>
                {problem.statLabel}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SolutionSection() {
  return (
    <section id="manifesto" className="section">
      <div className="container">
        <div className="section-title">
          <h2 className="animate-fade-in-up" style={{
            textAlign: 'right',
          }}>
            Meet <span className="gradient-text">VERITY</span><br />
            Your Predictive Engine
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gap: '1.5rem',
          marginTop: '4rem',
          maxWidth: 900,
          margin: '4rem auto 0',
        }}>
          {solutions.map((solution, index) => (
            <div
              key={solution.id}
              className={`card animate-fade-in-up delay-${(index + 1) * 100}`}
              style={{
                display: 'flex',
                gap: '2.5rem',
                alignItems: 'center',
                padding: '3rem',
                position: 'relative',
              }}
            >
              <div style={{
                flexShrink: 0,
                width: 80,
                height: 80,
                background: 'var(--color-bg-tertiary)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                color: 'var(--color-accent-primary)',
              }}>
                {solution.icon}
              </div>

              <div style={{ flex: 1 }}>
                <h3 style={{ marginBottom: '0.75rem', fontSize: '1.75rem' }}>{solution.title}</h3>
                <p style={{ fontSize: '1.0625rem' }}>{solution.description}</p>
              </div>

              <div style={{
                position: 'absolute',
                bottom: '-1px',
                left: '3rem',
                right: '3rem',
                height: '3px',
                background: 'var(--gradient-accent)',
                transform: 'scaleX(0)',
                transformOrigin: 'left',
                transition: 'transform 0.5s ease',
              }} className="solution-line" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section className="section" style={{
      background: 'var(--color-bg-secondary)',
    }}>
      <div className="container">
        <div className="section-title">
          <h2 className="animate-fade-in-up">
            Capabilities That<br />
            <span className="gradient-text">Change Everything</span>
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          marginTop: '4rem',
        }}>
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className={`card animate-fade-in-up delay-${(index + 1) * 100}`}
              style={{
                padding: '2.5rem',
                background: index % 2 === 0 ? 'var(--color-bg-card)' : 'var(--color-bg-tertiary)',
                position: 'relative',
              }}
            >
              <div style={{
                fontSize: '2.5rem',
                color: 'var(--color-accent-primary)',
                marginBottom: '1.5rem',
                lineHeight: 1,
              }}>
                {feature.icon}
              </div>
              <h3 style={{
                marginBottom: '0.75rem',
                fontSize: '1.375rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}>
                {feature.title}
              </h3>
              <p style={{ fontSize: '0.9375rem' }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MetricsSection() {
  return (
    <section id="traction" className="section">
      <div className="container">
        <div style={{
          background: 'var(--gradient-accent)',
          borderRadius: 'var(--radius-lg)',
          padding: '5rem 3rem',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Geometric pattern */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
              repeating-linear-gradient(
                45deg,
                transparent,
                transparent 20px,
                rgba(0,0,0,0.1) 20px,
                rgba(0,0,0,0.1) 40px
              )
            `,
          }} />

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '3rem',
            position: 'relative',
            zIndex: 1,
            textAlign: 'center',
          }}>
            {metrics.map((metric, index) => (
              <div
                key={index}
                className={`animate-fade-in-up delay-${(index + 1) * 100}`}
                style={{ color: 'white' }}
              >
                <div style={{
                  fontSize: 'clamp(3rem, 6vw, 4rem)',
                  fontWeight: 700,
                  fontFamily: 'var(--font-display)',
                  lineHeight: 1,
                  marginBottom: '0.5rem',
                }}>
                  {metric.value}
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  opacity: 0.9,
                }}>
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-title">
          <h2 className="animate-fade-in-up">
            Already <span className="gradient-text">Winning</span>
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '2rem',
          marginTop: '4rem',
        }}>
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`card animate-fade-in-up delay-${(index + 1) * 100}`}
              style={{
                padding: '2.5rem',
                background: index % 2 === 0 ? 'var(--color-bg-card)' : 'var(--color-bg-tertiary)',
              }}
            >
              {/* Large quote mark */}
              <div style={{
                fontSize: '6rem',
                color: 'var(--color-accent-primary)',
                opacity: 0.2,
                fontFamily: 'var(--font-display)',
                lineHeight: 0.5,
                marginBottom: '1rem',
              }}>
                "
              </div>

              <p style={{
                fontSize: '1.125rem',
                lineHeight: 1.8,
                marginBottom: '2rem',
                color: 'var(--color-text-primary)',
                fontStyle: 'italic',
              }}>
                "{testimonial.quote}"
              </p>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid var(--color-border)',
              }}>
                <div style={{
                  width: 52,
                  height: 52,
                  background: 'var(--gradient-accent)',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '1rem',
                }}>
                  {testimonial.avatar}
                </div>
                <div>
                  <div style={{
                    fontWeight: 600,
                    color: 'var(--color-text-primary)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    fontSize: '0.875rem',
                  }}>
                    {testimonial.author}
                  </div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
                    {testimonial.role} @ {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section id="pricing" className="section" style={{
      background: 'var(--color-bg-secondary)',
    }}>
      <div className="container">
        <div className="section-title">
          <h2 className="animate-fade-in-up">
            Own the <span className="gradient-text">Future</span>
          </h2>
          <p className="animate-fade-in-up delay-100" style={{ marginTop: '1rem' }}>
            No hidden fees. No surprises. Just results.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          marginTop: '4rem',
          maxWidth: 1100,
          margin: '4rem auto 0',
        }}>
          {pricingPlans.map((plan, index) => (
            <div
              key={plan.id}
              className={`card animate-fade-in-up delay-${(index + 1) * 100}`}
              style={{
                padding: '3rem 2.5rem',
                position: 'relative',
                border: plan.popular ? '2px solid var(--color-accent-primary)' : '1px solid var(--color-border)',
                transform: plan.popular ? 'scale(1.05)' : 'none',
                zIndex: plan.popular ? 1 : 0,
              }}
            >
              {plan.popular && (
                <div style={{
                  position: 'absolute',
                  top: -14,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'var(--gradient-accent)',
                  color: 'white',
                  padding: '0.5rem 1.5rem',
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  borderRadius: '4px',
                }}>
                  Most Popular
                </div>
              )}

              <h3 style={{
                marginBottom: '0.5rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}>
                {plan.name}
              </h3>

              <div style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '0.25rem',
                marginBottom: '0.75rem',
              }}>
                <span style={{
                  fontSize: '3.5rem',
                  fontWeight: 700,
                  fontFamily: 'var(--font-display)',
                  color: 'var(--color-text-primary)',
                  lineHeight: 1,
                }}>
                  {plan.price === 'Custom' ? 'Custom' : `$${plan.price}`}
                </span>
                {plan.price !== 'Custom' && (
                  <span style={{ color: 'var(--color-text-muted)' }}>/mo</span>
                )}
              </div>

              <p style={{ fontSize: '0.9375rem', marginBottom: '2rem' }}>
                {plan.description}
              </p>

              <ul style={{ listStyle: 'none', marginBottom: '2.5rem' }}>
                {plan.features.map((feature) => (
                  <li key={feature} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.625rem 0',
                    fontSize: '0.875rem',
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-primary)" strokeWidth="3">
                      <path d="M20 6L9 17l-5-5"/>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className={`btn ${plan.popular ? 'btn-primary' : 'btn-secondary'}`}
                style={{ width: '100%' }}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section id="join" className="section" style={{
      paddingBottom: '8rem',
    }}>
      <div className="container">
        <div className="animate-fade-in-up" style={{
          background: 'var(--color-bg-tertiary)',
          borderRadius: 'var(--radius-lg)',
          padding: '6rem 3rem',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          border: '1px solid var(--color-border)',
        }}>
          {/* Background glow */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            height: '80%',
            background: 'var(--gradient-glow)',
            filter: 'blur(80px)',
            pointerEvents: 'none',
          }} />

          {/* Corner accents */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 100,
            height: 100,
            borderTop: '3px solid var(--color-accent-primary)',
            borderLeft: '3px solid var(--color-accent-primary)',
          }} />
          <div style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: 100,
            height: 100,
            borderBottom: '3px solid var(--color-accent-primary)',
            borderRight: '3px solid var(--color-accent-primary)',
          }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              marginBottom: '1.5rem',
              lineHeight: 1.1,
            }}>
              Stop Reacting.<br />
              Start <span className="gradient-text">Predicting.</span>
            </h2>
            <p style={{
              fontSize: '1.125rem',
              maxWidth: 500,
              margin: '0 auto 3rem',
              color: 'var(--color-text-secondary)',
            }}>
              Join the waitlist for early access. Be among the first to see around corners.
            </p>
            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: '2rem',
            }}>
              <input
                type="email"
                placeholder="Enter your email"
                style={{
                  padding: '1rem 1.5rem',
                  background: 'var(--color-bg-primary)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--color-text-primary)',
                  fontSize: '1rem',
                  fontFamily: 'var(--font-body)',
                  width: 280,
                  outline: 'none',
                }}
              />
              <button className="btn btn-primary" style={{
                padding: '1rem 2rem',
              }}>
                Join Waitlist
              </button>
            </div>
            <p style={{
              fontSize: '0.75rem',
              color: 'var(--color-text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}>
              Limited spots available for beta
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{
      background: 'var(--color-bg-primary)',
      padding: '5rem 0 2rem',
      borderTop: '1px solid var(--color-border)',
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '3rem',
          marginBottom: '4rem',
        }}>
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1.5rem',
            }}>
              <div style={{
                width: 36,
                height: 36,
                background: 'var(--gradient-accent)',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.25rem',
                fontWeight: 700,
                color: 'white',
              }}>
                V
              </div>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.25rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
              }}>
                VERITY
              </span>
            </div>
            <p style={{
              color: 'var(--color-text-muted)',
              fontSize: '0.875rem',
              lineHeight: 1.7,
              maxWidth: 250,
            }}>
              Predict the future. Know everything. Act first. Win always.
            </p>
          </div>

          <div>
            <h4 style={{
              marginBottom: '1.25rem',
              fontSize: '0.6875rem',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: 'var(--color-text-muted)',
            }}>
              Product
            </h4>
            <ul style={{ listStyle: 'none' }}>
              {['Features', 'Pricing', 'API', 'Integrations', 'Changelog'].map((item) => (
                <li key={item} style={{ marginBottom: '0.75rem' }}>
                  <a href="#" style={{
                    color: 'var(--color-text-secondary)',
                    fontSize: '0.9375rem',
                    transition: 'color var(--transition-fast)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent-primary)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{
              marginBottom: '1.25rem',
              fontSize: '0.6875rem',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: 'var(--color-text-muted)',
            }}>
              Company
            </h4>
            <ul style={{ listStyle: 'none' }}>
              {['About', 'Blog', 'Careers', 'Press', 'Contact'].map((item) => (
                <li key={item} style={{ marginBottom: '0.75rem' }}>
                  <a href="#" style={{
                    color: 'var(--color-text-secondary)',
                    fontSize: '0.9375rem',
                    transition: 'color var(--transition-fast)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent-primary)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{
              marginBottom: '1.25rem',
              fontSize: '0.6875rem',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: 'var(--color-text-muted)',
            }}>
              Connect
            </h4>
            <ul style={{ listStyle: 'none' }}>
              {['Twitter', 'LinkedIn', 'GitHub', 'Discord'].map((item) => (
                <li key={item} style={{ marginBottom: '0.75rem' }}>
                  <a href="#" style={{
                    color: 'var(--color-text-secondary)',
                    fontSize: '0.9375rem',
                    transition: 'color var(--transition-fast)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent-primary)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid var(--color-border)',
          paddingTop: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <p style={{
            color: 'var(--color-text-muted)',
            fontSize: '0.8125rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}>
            © {currentYear} VERITY AI, Inc. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '2rem' }}>
            {['Privacy', 'Terms', 'Cookies'].map((item) => (
              <a key={item} href="#" style={{
                color: 'var(--color-text-muted)',
                fontSize: '0.8125rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}>
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function StartupPitchPage() {
  return (
    <>
      <Navigation />
      <Hero />
      <Marquee />
      <ProblemSection />
      <SolutionSection />
      <FeaturesSection />
      <MetricsSection />
      <TestimonialsSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </>
  );
}
