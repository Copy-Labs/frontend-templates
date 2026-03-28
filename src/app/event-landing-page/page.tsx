"use client";

import { useState, useEffect } from "react";
import "./globals.css";

// Mock Data
const SPEAKERS = [
  {
    id: 1,
    name: "ZARA NEXUS",
    role: "AI Architect",
    company: "Neural Forge",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    topic: "Building Sentient Systems"
  },
  {
    id: 2,
    name: "MARCUS VOID",
    role: "Quantum Developer",
    company: "Dimension Labs",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    topic: "Quantum Computing Revolution"
  },
  {
    id: 3,
    name: "LUNA CYPHER",
    role: "Security Researcher",
    company: "DarkWire",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    topic: "Zero Trust Ecosystems"
  },
  {
    id: 4,
    name: "JAX BREAKER",
    role: "Creative Technologist",
    company: "Synthesis Studio",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    topic: "Human-AI Collaboration"
  }
];

const SCHEDULE = [
  {
    id: 1,
    time: "09:00",
    title: "Opening Chaos",
    speaker: "Host Panel",
    description: "Welcome to the carnival of code"
  },
  {
    id: 2,
    time: "10:30",
    title: "Keynote: The Singularity",
    speaker: "ZARA NEXUS",
    description: "Building sentient systems in 2026"
  },
  {
    id: 3,
    time: "12:00",
    title: "Lunch & Network",
    speaker: "",
    description: "Gourmet chaos catering"
  },
  {
    id: 4,
    time: "13:30",
    title: "Workshop: Quantum Leap",
    speaker: "MARCUS VOID",
    description: "Hands-on quantum computing"
  },
  {
    id: 5,
    time: "15:00",
    title: "Panel: Future of Security",
    speaker: "LUNA CYPHER + Guests",
    description: "Zero trust in an untrusted world"
  },
  {
    id: 6,
    time: "16:30",
    title: "Hackathon Kickoff",
    speaker: "JAX BREAKER",
    description: "48 hours to build the impossible"
  },
  {
    id: 7,
    time: "18:00",
    title: "Closing Ceremony",
    speaker: "All Speakers",
    description: "Awards and revelations"
  }
];

const TICKETS = [
  {
    id: 1,
    name: "CHAOS",
    price: 299,
    originalPrice: 499,
    description: "Perfect for individual attendees",
    features: [
      "Full conference access",
      "Workshop sessions",
      "Networking events",
      "Swag bag",
      "Digital recordings"
    ],
    color: "var(--color-electric-cyan)",
    borderColor: "var(--color-electric-cyan)"
  },
  {
    id: 2,
    name: "CARNIVAL",
    price: 599,
    originalPrice: 999,
    description: "For serious builders",
    popular: true,
    features: [
      "Everything in CHAOS",
      "VIP lounge access",
      "Speaker dinner",
      "Priority seating",
      "1-on-1 mentorship",
      "Exclusive merch"
    ],
    color: "var(--color-hot-pink)",
    borderColor: "var(--color-hot-pink)"
  },
  {
    id: 3,
    name: "MAYHEM",
    price: 1299,
    originalPrice: 1999,
    description: "The ultimate experience",
    features: [
      "Everything in CARNIVAL",
      "Private workshop",
      "Executive networking",
      "Lifetime access pass",
      "Co-working space",
      "Startup showcase"
    ],
    color: "var(--color-electric-yellow)",
    borderColor: "var(--color-electric-yellow)"
  }
];

// Countdown Timer Component
function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date("2026-06-15T09:00:00");

    const timer = setInterval(() => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();

      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { value: timeLeft.days, label: "DAYS" },
    { value: timeLeft.hours, label: "HOURS" },
    { value: timeLeft.minutes, label: "MINS" },
    { value: timeLeft.seconds, label: "SECS" }
  ];

  return (
    <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", justifyContent: "center" }}>
      {timeUnits.map((unit, index) => (
        <div
          key={unit.label}
          className="animate-scale-in"
          style={{
            background: "var(--color-void-light)",
            border: "4px solid var(--color-electric-yellow)",
            padding: "1.5rem 2rem",
            textAlign: "center",
            boxShadow: "8px 8px 0 var(--color-void)",
            animationDelay: `${index * 0.1}s`
          }}
        >
          <div style={{
            fontFamily: "var(--font-display)",
            fontSize: "4rem",
            color: "var(--color-electric-yellow)",
            lineHeight: 1
          }}>
            {String(unit.value).padStart(2, "0")}
          </div>
          <div style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.875rem",
            color: "var(--color-off-white)",
            letterSpacing: "0.2em"
          }}>
            {unit.label}
          </div>
        </div>
      ))}
    </div>
  );
}

// Navigation Component
function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    padding: scrolled ? "1rem 2rem" : "1.5rem 2rem",
    background: scrolled ? "rgba(10, 10, 10, 0.95)" : "transparent",
    backdropFilter: scrolled ? "blur(10px)" : "none",
    borderBottom: scrolled ? "2px solid var(--color-hot-pink)" : "none",
    transition: "all 0.3s ease"
  };

  return (
    <nav style={navStyle}>
      <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontFamily: "var(--font-display)", fontSize: "2rem", color: "var(--color-hot-pink)" }}>
          NEO<span style={{ color: "var(--color-electric-cyan)" }}>CARNIVAL</span>
        </div>
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          {["Speakers", "Schedule", "Tickets", "FAQ"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.875rem",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "var(--color-off-white)",
                transition: "color 0.2s"
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-electric-yellow)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-off-white)")}
            >
              {item}
            </a>
          ))}
          <button className="btn-primary" style={{ padding: "0.75rem 1.5rem", fontSize: "0.875rem" }}>
            Get Tickets
          </button>
        </div>
      </div>
    </nav>
  );
}

// Hero Section
function Hero() {
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        paddingTop: "80px"
      }}
    >
      {/* Background elements */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "radial-gradient(circle, var(--color-hot-pink) 0%, transparent 70%)",
          filter: "blur(80px)",
          opacity: 0.4,
          animation: "float 6s ease-in-out infinite"
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "20%",
          right: "10%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, var(--color-electric-cyan) 0%, transparent 70%)",
          filter: "blur(100px)",
          opacity: 0.3,
          animation: "float 8s ease-in-out infinite 1s"
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, var(--color-electric-yellow) 0%, transparent 70%)",
          filter: "blur(120px)",
          opacity: 0.2,
          animation: "float 10s ease-in-out infinite 2s"
        }}
      />

      <div className="container" style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
        <div className="animate-slide-up" style={{ opacity: 0 }}>
          <div style={{
            display: "inline-block",
            padding: "0.5rem 1.5rem",
            background: "var(--color-hot-pink)",
            color: "var(--color-void)",
            fontFamily: "var(--font-body)",
            fontSize: "0.875rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
            marginBottom: "2rem",
            border: "2px solid var(--color-void)",
            boxShadow: "4px 4px 0 var(--color-void)"
          }}>
            JUNE 15-17, 2026 • TOKYO, JAPAN
          </div>
        </div>

        <h1 className="animate-slide-up" style={{ opacity: 0, animationDelay: "0.1s" }}>
          <span className="gradient-text">NEO</span><br />
          <span style={{ color: "var(--color-white)" }}>CARNIVAL</span>
        </h1>

        <p
          className="animate-slide-up"
          style={{
            opacity: 0,
            animationDelay: "0.2s",
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(1.25rem, 3vw, 1.75rem)",
            color: "var(--color-off-white)",
            maxWidth: "700px",
            margin: "2rem auto",
            fontWeight: 500
          }}
        >
          Where chaos meets celebration. The most electrifying tech conference of the year.
        </p>

        <div className="animate-slide-up" style={{ opacity: 0, animationDelay: "0.3s", marginTop: "3rem" }}>
          <CountdownTimer />
        </div>

        <div
          className="animate-slide-up"
          style={{
            opacity: 0,
            animationDelay: "0.4s",
            display: "flex",
            gap: "1.5rem",
            justifyContent: "center",
            marginTop: "3rem",
            flexWrap: "wrap"
          }}
        >
          <button className="btn-primary">
            Get Your Ticket
            <span style={{ marginLeft: "0.5rem" }}>→</span>
          </button>
          <button className="btn-secondary">
            Watch Trailer
          </button>
        </div>

        {/* Scroll indicator */}
        <div
          className="animate-slide-up"
          style={{
            opacity: 0,
            animationDelay: "0.5s",
            marginTop: "4rem",
            animation: "float 2s ease-in-out infinite"
          }}
        >
          <div style={{
            width: "40px",
            height: "60px",
            border: "3px solid var(--color-off-white)",
            borderRadius: "20px",
            margin: "0 auto",
            position: "relative"
          }}>
            <div style={{
              width: "8px",
              height: "8px",
              background: "var(--color-electric-yellow)",
              borderRadius: "50%",
              position: "absolute",
              top: "10px",
              left: "50%",
              transform: "translateX(-50%)",
              animation: "pulse-glow 2s ease-in-out infinite"
            }} />
          </div>
        </div>
      </div>
    </section>
  );
}

// Speakers Section
function Speakers() {
  return (
    <section id="speakers" className="section section-dots" style={{ background: "var(--color-void)" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <h2 style={{ color: "var(--color-white)" }}>
            <span style={{ color: "var(--color-hot-pink)" }}>THE</span> VOICES
          </h2>
          <p style={{
            fontFamily: "var(--font-body)",
            color: "var(--color-off-white)",
            marginTop: "1rem",
            opacity: 0.8
          }}>
            Learn from the visionaries shaping tomorrow
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2rem"
          }}
        >
          {SPEAKERS.map((speaker, index) => (
            <div
              key={speaker.id}
              className="card animate-scale-in"
              style={{
                opacity: 0,
                animationDelay: `${index * 0.1}s`,
                background: "var(--color-void-light)",
                border: "3px solid var(--color-void)",
                boxShadow: "8px 8px 0 var(--color-hot-pink)",
                cursor: "pointer"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-10px)";
                e.currentTarget.style.boxShadow = "12px 12px 0 var(--color-electric-cyan)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "8px 8px 0 var(--color-hot-pink)";
              }}
            >
              <div style={{
                width: "100%",
                aspectRatio: "1",
                overflow: "hidden",
                border: "3px solid var(--color-void)",
                marginBottom: "1.5rem"
              }}>
                <img
                  src={speaker.image}
                  alt={speaker.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    filter: "grayscale(20%)",
                    transition: "filter 0.3s"
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.filter = "grayscale(0%)")}
                  onMouseLeave={(e) => (e.currentTarget.style.filter = "grayscale(20%)")}
                />
              </div>
              <h3 style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.75rem",
                color: "var(--color-white)",
                marginBottom: "0.5rem"
              }}>
                {speaker.name}
              </h3>
              <p style={{
                fontFamily: "var(--font-body)",
                color: "var(--color-electric-cyan)",
                fontSize: "0.875rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em"
              }}>
                {speaker.role} @ {speaker.company}
              </p>
              <div style={{
                marginTop: "1rem",
                paddingTop: "1rem",
                borderTop: "2px dashed var(--color-void)"
              }}>
                <p style={{
                  fontFamily: "var(--font-body)",
                  color: "var(--color-off-white)",
                  fontSize: "0.875rem",
                  fontStyle: "italic"
                }}>
                  "{speaker.topic}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Schedule Section
function Schedule() {
  return (
    <section id="schedule" className="section section-stripes" style={{ background: "var(--color-void-light)" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <h2 style={{ color: "var(--color-white)" }}>
            <span style={{ color: "var(--color-electric-cyan)" }}>THE</span> JOURNEY
          </h2>
          <p style={{
            fontFamily: "var(--font-body)",
            color: "var(--color-off-white)",
            marginTop: "1rem",
            opacity: 0.8
          }}>
            Three days of pure technological ecstasy
          </p>
        </div>

        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          {SCHEDULE.map((item, index) => (
            <div
              key={item.id}
              className="animate-slide-in-left"
              style={{
                opacity: 0,
                animationDelay: `${index * 0.1}s`,
                display: "grid",
                gridTemplateColumns: "120px 1fr",
                gap: "2rem",
                padding: "2rem",
                background: index % 2 === 0 ? "var(--color-void)" : "var(--color-void-light)",
                border: "3px solid var(--color-void)",
                boxShadow: "6px 6px 0 var(--color-electric-yellow)",
                marginBottom: "1.5rem",
                cursor: "pointer",
                transition: "all 0.3s"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateX(10px)";
                e.currentTarget.style.boxShadow = "10px 10px 0 var(--color-hot-pink)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateX(0)";
                e.currentTarget.style.boxShadow = "6px 6px 0 var(--color-electric-yellow)";
              }}
            >
              <div style={{
                fontFamily: "var(--font-display)",
                fontSize: "2rem",
                color: "var(--color-electric-yellow)"
              }}>
                {item.time}
              </div>
              <div>
                <h3 style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "1.5rem",
                  color: "var(--color-white)",
                  marginBottom: "0.5rem"
                }}>
                  {item.title}
                </h3>
                {item.speaker && (
                  <p style={{
                    fontFamily: "var(--font-body)",
                    color: "var(--color-hot-pink)",
                    fontSize: "0.875rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    marginBottom: "0.5rem"
                  }}>
                    {item.speaker}
                  </p>
                )}
                <p style={{
                  fontFamily: "var(--font-body)",
                  color: "var(--color-off-white)",
                  opacity: 0.8
                }}>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Pricing Section
function Pricing() {
  return (
    <section id="tickets" className="section" style={{ background: "var(--color-void)" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <h2 style={{ color: "var(--color-white)" }}>
            <span style={{ color: "var(--color-lime)" }}>YOUR</span> PASS
          </h2>
          <p style={{
            fontFamily: "var(--font-body)",
            color: "var(--color-off-white)",
            marginTop: "1rem",
            opacity: 0.8
          }}>
            Choose your level of chaos
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2rem",
            alignItems: "center"
          }}
        >
          {TICKETS.map((ticket, index) => (
            <div
              key={ticket.id}
              className="animate-scale-in"
              style={{
                opacity: 0,
                animationDelay: `${index * 0.15}s`,
                background: "var(--color-void-light)",
                border: `4px solid ${ticket.borderColor}`,
                padding: "2.5rem",
                boxShadow: "12px 12px 0 var(--color-void)",
                position: "relative",
                transform: ticket.popular ? "scale(1.05)" : "scale(1)",
                transition: "all 0.3s"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = ticket.popular ? "scale(1.08)" : "scale(1.02)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = ticket.popular ? "scale(1.05)" : "scale(1)";
              }}
            >
              {ticket.popular && (
                <div style={{
                  position: "absolute",
                  top: "-15px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: ticket.color,
                  color: "var(--color-void)",
                  padding: "0.5rem 1.5rem",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  border: "2px solid var(--color-void)",
                  boxShadow: "4px 4px 0 var(--color-void)"
                }}>
                  Most Popular
                </div>
              )}

              <div style={{
                fontFamily: "var(--font-display)",
                fontSize: "3rem",
                color: ticket.color,
                marginBottom: "0.5rem"
              }}>
                {ticket.name}
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <span style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "4rem",
                  color: "var(--color-white)"
                }}>
                  ${ticket.price}
                </span>
                <span style={{
                  fontFamily: "var(--font-body)",
                  color: "var(--color-off-white)",
                  opacity: 0.6,
                  textDecoration: "line-through",
                  marginLeft: "0.5rem"
                }}>
                  ${ticket.originalPrice}
                </span>
              </div>

              <p style={{
                fontFamily: "var(--font-body)",
                color: "var(--color-off-white)",
                marginBottom: "2rem",
                opacity: 0.8
              }}>
                {ticket.description}
              </p>

              <ul style={{ listStyle: "none", marginBottom: "2rem" }}>
                {ticket.features.map((feature) => (
                  <li
                    key={feature}
                    style={{
                      fontFamily: "var(--font-body)",
                      color: "var(--color-off-white)",
                      padding: "0.5rem 0",
                      borderBottom: "1px solid rgba(255,255,255,0.1)",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem"
                    }}
                  >
                    <span style={{ color: ticket.color, fontSize: "1.25rem" }}>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                style={{
                  width: "100%",
                  padding: "1rem",
                  background: ticket.color,
                  color: "var(--color-void)",
                  fontFamily: "var(--font-body)",
                  fontSize: "1rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  border: "3px solid var(--color-void)",
                  boxShadow: "4px 4px 0 var(--color-void)",
                  cursor: "pointer",
                  transition: "all 0.2s"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translate(-2px, -2px)";
                  e.currentTarget.style.boxShadow = "6px 6px 0 var(--color-void)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translate(0, 0)";
                  e.currentTarget.style.boxShadow = "4px 4px 0 var(--color-void)";
                }}
              >
                Get {ticket.name} Pass
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// FAQ Section
function FAQ() {
  const faqs = [
    {
      question: "What's included in my ticket?",
      answer: "All tickets include full conference access, workshop sessions, networking events, and digital recordings. Higher tiers include additional perks like VIP lounge access, speaker dinners, and 1-on-1 mentorship."
    },
    {
      question: "Can I get a refund?",
      answer: "Yes! Full refunds are available up to 30 days before the event. Within 30 days, we offer a 50% refund or full credit for next year's carnival."
    },
    {
      question: "Is there a virtual option?",
      answer: "Absolutely! All keynotes and main sessions will be streamed live. Virtual tickets include access to all digital content for 12 months."
    },
    {
      question: "Do you offer group discounts?",
      answer: "Yes! Teams of 5+ get 15% off, and teams of 10+ get 25% off. Contact us at groups@neocarnival.io for custom packages."
    }
  ];

  return (
    <section id="faq" className="section section-dots" style={{ background: "var(--color-void-light)" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <h2 style={{ color: "var(--color-white)" }}>
            <span style={{ color: "var(--color-burnt-orange)" }}>THE</span> QUESTIONS
          </h2>
          <p style={{
            fontFamily: "var(--font-body)",
            color: "var(--color-off-white)",
            marginTop: "1rem",
            opacity: 0.8
          }}>
            What you might be wondering
          </p>
        </div>

        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="animate-slide-up"
              style={{
                opacity: 0,
                animationDelay: `${index * 0.1}s`,
                background: "var(--color-void)",
                border: "3px solid var(--color-void)",
                padding: "2rem",
                marginBottom: "1.5rem",
                boxShadow: "6px 6px 0 var(--color-burnt-orange)",
                cursor: "pointer",
                transition: "all 0.3s"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "8px 8px 0 var(--color-hot-pink)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "6px 6px 0 var(--color-burnt-orange)";
              }}
            >
              <h3 style={{
                fontFamily: "var(--font-heading)",
                fontSize: "1.25rem",
                color: "var(--color-white)",
                marginBottom: "1rem"
              }}>
                {faq.question}
              </h3>
              <p style={{
                fontFamily: "var(--font-body)",
                color: "var(--color-off-white)",
                opacity: 0.8,
                lineHeight: 1.8
              }}>
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer style={{
      background: "var(--color-void)",
      borderTop: "4px solid var(--color-hot-pink)",
      padding: "4rem 0 2rem"
    }}>
      <div className="container">
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "3rem",
          marginBottom: "3rem"
        }}>
          <div>
            <div style={{
              fontFamily: "var(--font-display)",
              fontSize: "2.5rem",
              color: "var(--color-hot-pink)",
              marginBottom: "1rem"
            }}>
              NEO<span style={{ color: "var(--color-electric-cyan)" }}>CARNIVAL</span>
            </div>
            <p style={{
              fontFamily: "var(--font-body)",
              color: "var(--color-off-white)",
              opacity: 0.7
            }}>
              Where chaos meets celebration. The most electrifying tech conference of the year.
            </p>
          </div>

          <div>
            <h4 style={{
              fontFamily: "var(--font-heading)",
              fontSize: "1.25rem",
              color: "var(--color-white)",
              marginBottom: "1.5rem"
            }}>
              Quick Links
            </h4>
            <ul style={{ listStyle: "none" }}>
              {["Speakers", "Schedule", "Tickets", "Venue", "FAQ"].map((link) => (
                <li key={link} style={{ marginBottom: "0.5rem" }}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    style={{
                      fontFamily: "var(--font-body)",
                      color: "var(--color-off-white)",
                      opacity: 0.7,
                      transition: "opacity 0.2s"
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.7")}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{
              fontFamily: "var(--font-heading)",
              fontSize: "1.25rem",
              color: "var(--color-white)",
              marginBottom: "1.5rem"
            }}>
              Connect
            </h4>
            <div style={{ display: "flex", gap: "1rem" }}>
              {["𝕏", "in", "◆", "◉"].map((social) => (
                <a
                  key={social}
                  href="#"
                  style={{
                    width: "40px",
                    height: "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "var(--color-void-light)",
                    border: "2px solid var(--color-void)",
                    color: "var(--color-off-white)",
                    fontSize: "1.25rem",
                    transition: "all 0.2s"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--color-hot-pink)";
                    e.currentTarget.style.transform = "translateY(-4px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "var(--color-void-light)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div style={{
          borderTop: "2px solid var(--color-void-light)",
          paddingTop: "2rem",
          textAlign: "center"
        }}>
          <p style={{
            fontFamily: "var(--font-body)",
            color: "var(--color-off-white)",
            opacity: 0.5
          }}>
            © 2026 NEOCARNIVAL. All rights reserved. Made with chaos and love.
          </p>
        </div>
      </div>
    </footer>
  );
}

// Main Page Component
export default function EventLandingPage() {
  return (
    <main>
      <Navigation />
      <Hero />
      <Speakers />
      <Schedule />
      <Pricing />
      <FAQ />
      <Footer />
    </main>
  );
}
