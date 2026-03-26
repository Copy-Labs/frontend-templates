"use client";

import { useState, useEffect } from "react";

// Mock Data
const features = [
  {
    id: 1,
    title: "Real-time Collaboration",
    description: "Work together seamlessly with your team in real-time. See changes as they happen.",
    icon: "◈",
    color: "var(--color-sage)",
  },
  {
    id: 2,
    title: "Smart Automation",
    description: "Automate repetitive tasks and workflows to save time and reduce errors.",
    icon: "⚡",
    color: "var(--color-peach)",
  },
  {
    id: 3,
    title: "Advanced Analytics",
    description: "Gain actionable insights with powerful analytics and customizable dashboards.",
    icon: "◉",
    color: "var(--color-lavender)",
  },
  {
    id: 4,
    title: "Secure by Design",
    description: "Enterprise-grade security with end-to-end encryption and compliance tools.",
    icon: "◇",
    color: "var(--color-sky)",
  },
  {
    id: 5,
    title: "Seamless Integrations",
    description: "Connect with your favorite tools through our extensive integration marketplace.",
    icon: "⬡",
    color: "var(--color-rose)",
  },
  {
    id: 6,
    title: "Global CDN",
    description: "Lightning-fast performance worldwide with our distributed content network.",
    icon: "◎",
    color: "var(--color-blush)",
  },
];

const pricingPlans = [
  {
    id: 1,
    name: "Starter",
    price: "$0",
    period: "/month",
    description: "Perfect for individuals and small projects",
    features: [
      "Up to 3 projects",
      "Basic analytics",
      "Community support",
      "1GB storage",
      "API access",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    id: 2,
    name: "Pro",
    price: "$29",
    period: "/month",
    description: "Best for growing teams and businesses",
    features: [
      "Unlimited projects",
      "Advanced analytics",
      "Priority support",
      "50GB storage",
      "API access",
      "Custom integrations",
      "Team collaboration",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    id: 3,
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large organizations with custom needs",
    features: [
      "Everything in Pro",
      "Dedicated account manager",
      "SLA guarantee",
      "Unlimited storage",
      "On-premise deployment",
      "Custom contracts",
      "24/7 phone support",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

const testimonials = [
  {
    id: 1,
    quote: "Flow has transformed how our team collaborates. We've cut our project delivery time by 40% and the quality has improved dramatically.",
    author: "Sarah Chen",
    role: "Product Lead at Stripe",
    avatar: "SC",
  },
  {
    id: 2,
    quote: "The best SaaS tool we've adopted this year. Clean interface, powerful features, and incredible support team.",
    author: "Marcus Johnson",
    role: "CTO at Figma",
    avatar: "MJ",
  },
  {
    id: 3,
    quote: "Finally, a tool that actually understands what teams need. Simple enough to use, powerful enough to scale.",
    author: "Emily Rodriguez",
    role: "Engineering Manager at Vercel",
    avatar: "ER",
  },
];

const navLinks = [
  { name: "Features", href: "#features" },
  { name: "Pricing", href: "#pricing" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "About", href: "#about" },
];

// Components
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "var(--space-md) 0",
        background: scrolled ? "rgba(250, 248, 245, 0.9)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid var(--color-border)" : "none",
        transition: "all var(--transition-base)",
      }}
    >
      <div className="container">
        <div
          className="flex flex-between"
          style={{ maxWidth: "1200px", margin: "0 auto" }}
        >
          <a
            href="#"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "var(--color-text-primary)",
              display: "flex",
              alignItems: "center",
              gap: "var(--space-sm)",
            }}
          >
            <span
              style={{
                width: "32px",
                height: "32px",
                background: "var(--color-text-primary)",
                borderRadius: "var(--radius-md)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--color-bg-primary)",
                fontSize: "1rem",
              }}
            >
              ◈
            </span>
            Flow
          </a>

          {/* Desktop Navigation */}
          <div className="flex gap-xl" style={{ display: "none", alignItems: "center" }} className="desktop-nav">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                style={{
                  color: "var(--color-text-secondary)",
                  fontSize: "0.9375rem",
                  fontWeight: 500,
                  transition: "color var(--transition-fast)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-text-primary)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-secondary)")}
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex gap-md" style={{ display: "none", alignItems: "center" }} className="desktop-cta">
            <a
              href="#"
              style={{
                color: "var(--color-text-secondary)",
                fontSize: "0.9375rem",
                fontWeight: 500,
              }}
            >
              Log in
            </a>
            <a
              href="#pricing"
              className="btn btn-primary"
              style={{ padding: "var(--space-sm) var(--space-lg)", fontSize: "0.875rem" }}
            >
              Get Started
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: "none",
              flexDirection: "column",
              gap: "5px",
              padding: "var(--space-sm)",
            }}
            className="mobile-menu-btn"
          >
            <span
              style={{
                width: "24px",
                height: "2px",
                background: "var(--color-text-primary)",
                transition: "all var(--transition-fast)",
                transform: mobileMenuOpen ? "rotate(45deg) translate(5px, 5px)" : "none",
              }}
            />
            <span
              style={{
                width: "24px",
                height: "2px",
                background: "var(--color-text-primary)",
                transition: "all var(--transition-fast)",
                opacity: mobileMenuOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                width: "24px",
                height: "2px",
                background: "var(--color-text-primary)",
                transition: "all var(--transition-fast)",
                transform: mobileMenuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none",
              }}
            />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            className="animate-fade-in-up"
            style={{
              position: "absolute",
              top: "100%",
              height: "100dvh",
              left: 0,
              right: 0,
              background: "var(--color-bg-primary)",
              padding: "var(--space-xl)",
              borderBottom: "1px solid var(--color-border)",
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-md)",
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                style={{
                  color: "var(--color-text-secondary)",
                  fontSize: "1rem",
                  fontWeight: 500,
                  padding: "var(--space-sm) 0",
                }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#pricing"
              className="btn btn-primary"
              style={{ marginTop: "var(--space-sm)", textAlign: "center" }}
              onClick={() => setMobileMenuOpen(false)}
            >
              Get Started
            </a>
          </div>
        )}
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-nav, .desktop-cta {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
        }
      `}</style>
    </nav>
  );
}

function Hero() {
  return (
    <section
      className="section bg-pattern"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        paddingTop: "calc(var(--space-4xl) + 80px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative Elements */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "5%",
          width: "300px",
          height: "300px",
          background: "var(--color-sage)",
          borderRadius: "50%",
          filter: "blur(80px)",
          opacity: 0.3,
        }}
        className="animate-scale-in delay-200"
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "10%",
          width: "400px",
          height: "400px",
          background: "var(--color-lavender)",
          borderRadius: "50%",
          filter: "blur(100px)",
          opacity: 0.3,
        }}
        className="animate-scale-in delay-400"
      />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          {/* Badge */}
          <div
            className="animate-fade-in-up"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "var(--space-sm)",
              padding: "var(--space-xs) var(--space-md)",
              background: "var(--color-bg-card)",
              borderRadius: "var(--radius-full)",
              // border: "1px solid var(--color-border)",
              fontSize: "0.875rem",
              color: "var(--color-text-secondary)",
              marginBottom: "var(--space-xl)",
            }}
          >
            {/*<span
              style={{
                width: "6px",
                height: "6px",
                background: "var(--color-accent-teal)",
                borderRadius: "50%",
              }}
            />*/}
            Now in public beta
          </div>

          {/* Main Headline */}
          <h1
            className="animate-fade-in-up delay-100"
            style={{
              marginBottom: "var(--space-xl)",
              lineHeight: 1.1,
            }}
          >
            Ship products faster{" "}
            <span
              style={{
                background: "linear-gradient(135deg, var(--color-accent-coral) 0%, var(--color-accent-teal) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              with less chaos
            </span>
          </h1>

          {/* Subheadline */}
          <p
            className="animate-fade-in-up delay-200"
            style={{
              fontSize: "1.25rem",
              color: "var(--color-text-secondary)",
              maxWidth: "600px",
              margin: "0 auto var(--space-2xl)",
              lineHeight: 1.7,
            }}
          >
            The minimalist platform that helps modern teams collaborate, automate workflows, and deliver exceptional products on time.
          </p>

          {/* CTA Buttons */}
          <div
            className="animate-fade-in-up delay-300"
            style={{
              display: "flex",
              gap: "var(--space-md)",
              justifyContent: "center",
              flexWrap: "wrap",
              marginBottom: "var(--space-3xl)",
            }}
          >
            <a href="#pricing" className="btn btn-primary" style={{ padding: "var(--space-md) var(--space-2xl)" }}>
              Start Free Trial
              <span style={{ fontSize: "1.1em" }}>→</span>
            </a>
            <a href="#features" className="btn btn-secondary" style={{ padding: "var(--space-md) var(--space-2xl)" }}>
              See How It Works
            </a>
          </div>

          {/* Stats */}
          <div
            className="animate-fade-in-up delay-500"
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "var(--space-3xl)",
              paddingTop: "var(--space-2xl)",
              borderTop: "1px solid var(--color-border)",
            }}
          >
            {[
              { value: "50K+", label: "Teams" },
              { value: "2M+", label: "Projects" },
              { value: "99.9%", label: "Uptime" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "2rem",
                    fontWeight: 700,
                    color: "var(--color-text-primary)",
                  }}
                >
                  {stat.value}
                </div>
                <div style={{ fontSize: "0.875rem", color: "var(--color-text-muted)" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dashboard Preview */}
        <div
          className="animate-fade-in-up delay-600"
          style={{
            marginTop: "var(--space-4xl)",
            position: "relative",
          }}
        >
          <div
            style={{
              background: "var(--color-bg-card)",
              borderRadius: "var(--radius-xl)",
              boxShadow: "var(--shadow-xl)",
              padding: "var(--space-lg)",
              border: "1px solid var(--color-border)",
            }}
          >
            {/* Mock Dashboard Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--space-sm)",
                marginBottom: "var(--space-lg)",
                paddingBottom: "var(--space-md)",
                borderBottom: "1px solid var(--color-border)",
              }}
            >
              <div style={{ display: "flex", gap: "6px" }}>
                <span style={{ width: "12px", height: "12px", background: "#ff5f57", borderRadius: "50%" }} />
                <span style={{ width: "12px", height: "12px", background: "#febc2e", borderRadius: "50%" }} />
                <span style={{ width: "12px", height: "12px", background: "#28c840", borderRadius: "50%" }} />
              </div>
              <div
                style={{
                  flex: 1,
                  textAlign: "center",
                  fontSize: "0.875rem",
                  color: "var(--color-text-muted)",
                }}
              >
                Flow Dashboard
              </div>
            </div>

            {/* Mock Dashboard Content */}
            <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "var(--space-lg)" }}>
              {/* Sidebar */}
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-sm)" }}>
                {["Overview", "Projects", "Analytics", "Team", "Settings"].map((item, i) => (
                  <div
                    key={item}
                    style={{
                      padding: "var(--space-sm) var(--space-md)",
                      borderRadius: "var(--radius-md)",
                      fontSize: "0.875rem",
                      color: i === 0 ? "var(--color-text-primary)" : "var(--color-text-secondary)",
                      background: i === 0 ? "var(--color-bg-secondary)" : "transparent",
                      cursor: "pointer",
                      transition: "all var(--transition-fast)",
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>

              {/* Main Content */}
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
                {/* Stats Cards */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--space-md)" }}>
                  {[
                    { label: "Total Projects", value: "24", change: "+12%" },
                    { label: "Active Tasks", value: "156", change: "+8%" },
                    { label: "Team Members", value: "12", change: "+2" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      style={{
                        background: "var(--color-bg-secondary)",
                        padding: "var(--space-md)",
                        borderRadius: "var(--radius-md)",
                      }}
                    >
                      <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", marginBottom: "4px" }}>
                        {stat.label}
                      </div>
                      <div style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 600 }}>
                        {stat.value}
                      </div>
                      <div style={{ fontSize: "0.75rem", color: "var(--color-accent-teal)" }}>
                        {stat.change}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chart Placeholder */}
                <div
                  style={{
                    background: "var(--color-bg-secondary)",
                    padding: "var(--space-lg)",
                    borderRadius: "var(--radius-md)",
                    flex: 1,
                    minHeight: "200px",
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "space-around",
                  }}
                >
                  {[65, 45, 80, 55, 90, 70, 85, 60, 75, 95, 80, 70].map((height, i) => (
                    <div
                      key={i}
                      style={{
                        width: "30px",
                        height: `${height}%`,
                        background: "linear-gradient(180deg, var(--color-accent-teal) 0%, var(--color-sage) 100%)",
                        borderRadius: "var(--radius-sm) var(--radius-sm) 0 0",
                        transition: "height var(--transition-base)",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="features" className="section" style={{ background: "var(--color-bg-secondary)" }}>
      <div className="container">
        {/* Section Header */}
        <div className="text-center" style={{ maxWidth: "600px", margin: "0 auto var(--space-3xl)" }}>
          <div
            className="animate-fade-in-up"
            style={{
              fontSize: "0.875rem",
              fontWeight: 500,
              color: "var(--color-accent-coral)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: "var(--space-md)",
            }}
          >
            Features
          </div>
          <h2 className="animate-fade-in-up delay-100" style={{ marginBottom: "var(--space-lg)" }}>
            Everything you need to ship faster
          </h2>
          <p className="animate-fade-in-up delay-200" style={{ fontSize: "1.125rem" }}>
            Powerful features designed to streamline your workflow and help your team focus on what matters.
          </p>
        </div>

        {/* Bento Grid */}
        <div
          className="bento-grid animate-fade-in-up delay-300"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gridTemplateRows: "repeat(2, 1fr)",
            gap: "var(--space-md)",
            maxWidth: "1000px",
            margin: "0 auto",
            minHeight: "560px",
          }}
        >
          {/* Large Feature - Real-time Collaboration */}
          <div
            className="bento-large"
            style={{
              gridColumn: "span 2",
              gridRow: "span 2",
              background: "linear-gradient(135deg, var(--color-sage) 0%, #b8d4b8 100%)",
              borderRadius: "var(--radius-xl)",
              padding: "var(--space-xl)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                right: "-20px",
                top: "-20px",
                width: "200px",
                height: "200px",
                background: "rgba(255,255,255,0.15)",
                borderRadius: "50%",
              }}
            />
            <div
              style={{
                width: "56px",
                height: "56px",
                background: "rgba(255,255,255,0.3)",
                borderRadius: "var(--radius-lg)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "var(--space-lg)",
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--color-text-primary)" }}>
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <div>
              <h3 style={{ fontSize: "1.5rem", marginBottom: "var(--space-sm)", color: "var(--color-text-primary)" }}>
                Real-time Collaboration
              </h3>
              <p style={{ fontSize: "1rem", color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
                Work together seamlessly with your team in real-time. See changes as they happen with zero latency.
              </p>
            </div>
            <div
              style={{
                display: "flex",
                gap: "var(--space-xs)",
                marginTop: "var(--space-lg)",
              }}
            >
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  style={{
                    width: "32px",
                    height: "32px",
                    background: i === 1 ? "var(--color-text-primary)" : "rgba(255,255,255,0.4)",
                    borderRadius: "50%",
                    border: "2px solid white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.625rem",
                    fontWeight: 600,
                    color: i === 1 ? "white" : "var(--color-text-primary)",
                    marginLeft: i > 1 ? "-8px" : 0,
                    zIndex: 6 - i,
                  }}
                >
                  {["SC", "MJ", "ER", "AK", "+2"][i - 1]}
                </div>
              ))}
            </div>
          </div>

          {/* Small Feature - Smart Automation */}
          <div
            className="bento-small"
            style={{
              background: "var(--color-bg-card)",
              borderRadius: "var(--radius-xl)",
              padding: "var(--space-lg)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              // border: "1px solid var(--color-border)",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                // background: "var(--color-peach)",
                borderRadius: "var(--radius-md)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--color-accent-amber)" }}>
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
              </svg>
            </div>
            <div>
              <h4 style={{ fontSize: "1.125rem", marginBottom: "var(--space-xs)" }}>Smart Automation</h4>
              <p style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)" }}>
                Automate workflows
              </p>
            </div>
          </div>

          {/* Small Feature - Advanced Analytics */}
          <div
            className="bento-small"
            style={{
              background: "var(--color-bg-card)",
              borderRadius: "var(--radius-xl)",
              padding: "var(--space-lg)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              // border: "1px solid var(--color-border)",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                // background: "var(--color-lavender)",
                borderRadius: "var(--radius-md)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "#9070c0" }}>
                <line x1="18" y1="20" x2="18" y2="10"/>
                <line x1="12" y1="20" x2="12" y2="4"/>
                <line x1="6" y1="20" x2="6" y2="14"/>
              </svg>
            </div>
            <div>
              <h4 style={{ fontSize: "1.125rem", marginBottom: "var(--space-xs)" }}>Advanced Analytics</h4>
              <p style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)" }}>
                Gain insights
              </p>
            </div>
          </div>

          {/* Medium Feature - Secure by Design */}
          <div
            className="bento-medium"
            style={{
              gridColumn: "span 2",
              gridRow: "span 2",
              background: "linear-gradient(135deg, var(--color-sky) 0%, #c8d8e8 100%)",
              borderRadius: "var(--radius-xl)",
              padding: "var(--space-xl)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                right: -10,
                top: 50,
                transform: "translateY(-50%)",
                width: "144px",
                height: "144px",
                border: "3px solid rgba(255,255,255,0.4)",
                borderRadius: "50%",
              }}
            />
            <div
              style={{
                position: "absolute",
                right: 1,
                top: 50,
                transform: "translateY(-50%)",
                width: "100px",
                height: "100px",
                border: "3px solid rgba(255,255,255,0.3)",
                borderRadius: "50%",
              }}
            />
            <div style={{ maxWidth: "280px", position: "relative", zIndex: 1 }}>
              <h3 style={{ fontSize: "1.375rem", marginBottom: "var(--space-sm)", color: "var(--color-text-primary)" }}>
                Secure by Design
              </h3>
              <p style={{ fontSize: "0.9375rem", color: "var(--color-text-secondary)" }}>
                Enterprise-grade security with end-to-end encryption and compliance tools built in.
              </p>
            </div>
            <div
              style={{
                position: "absolute",
                top: 24,
                right: 24,
                zIndex: 1,
                width: "48px",
                height: "48px",
                background: "rgba(255,255,255,0.3)",
                borderRadius: "var(--radius-lg)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--color-text-primary)" }}>
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>
          </div>

          {/* Small Feature - Seamless Integrations */}
          <div
            className="bento-small"
            style={{
              background: "var(--color-bg-card)",
              borderRadius: "var(--radius-xl)",
              padding: "var(--space-lg)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              // border: "1px solid var(--color-border)",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                // background: "var(--color-rose)",
                borderRadius: "var(--radius-md)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "#c07080" }}>
                <polyline points="16 18 22 12 16 6"/>
                <polyline points="8 6 2 12 8 18"/>
              </svg>
            </div>
            <div>
              <h4 style={{ fontSize: "1.125rem", marginBottom: "var(--space-xs)" }}>Integrations</h4>
              <p style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)" }}>
                Connect tools
              </p>
            </div>
          </div>

          {/* Small Feature - Global CDN */}
          <div
            className="bento-small"
            style={{
              background: "var(--color-bg-card)",
              borderRadius: "var(--radius-xl)",
              padding: "var(--space-lg)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              // border: "1px solid var(--color-border)",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                // background: "var(--color-blush)",
                borderRadius: "var(--radius-md)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--color-accent-coral)" }}>
                <circle cx="12" cy="12" r="10"/>
                <line x1="2" y1="12" x2="22" y2="12"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
            </div>
            <div>
              <h4 style={{ fontSize: "1.125rem", marginBottom: "var(--space-xs)" }}>Global CDN</h4>
              <p style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)" }}>
                Lightning fast
              </p>
            </div>
          </div>
        </div>

        <style jsx>{`
          @media (max-width: 900px) {
            .bento-grid {
              grid-template-columns: repeat(2, 1fr) !important;
              grid-template-rows: auto !important;
              minHeight: auto !important;
            }
            .bento-large {
              grid-column: span 2 !important;
              grid-row: span 1 !important;
              min-height: 320px;
            }
            .bento-medium {
              grid-column: span 2 !important;
            }
          }
          @media (max-width: 640px) {
            .bento-grid {
              grid-template-columns: 1fr !important;
            }
            .bento-large,
            .bento-medium {
              grid-column: span 1 !important;
            }
            .bento-large {
              min-height: 360px;
            }
            .bento-medium {
              flex-direction: column;
              align-items: flex-start;
              gap: var(--space-lg);
            }
            .bento-medium > div:first-of-type,
            .bento-medium > div:last-of-type {
              position: static !important;
              transform: none !important;
            }
          }
        `}</style>
      </div>
    </section>
  );
}

function Pricing() {
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null);

  return (
    <section id="pricing" className="section bg-pattern">
      <div className="container">
        {/* Section Header */}
        <div className="text-center" style={{ maxWidth: "600px", margin: "0 auto var(--space-3xl)" }}>
          <div
            className="animate-fade-in-up"
            style={{
              fontSize: "0.875rem",
              fontWeight: 500,
              color: "var(--color-accent-coral)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: "var(--space-md)",
            }}
          >
            Pricing
          </div>
          <h2 className="animate-fade-in-up delay-100" style={{ marginBottom: "var(--space-lg)" }}>
            Simple, transparent pricing
          </h2>
          <p className="animate-fade-in-up delay-200" style={{ fontSize: "1.125rem" }}>
            Choose the plan that fits your needs. No hidden fees, cancel anytime.
          </p>
        </div>

        {/* Pricing Cards */}
        <div
          className="grid grid-3"
          style={{
            maxWidth: "1000px",
            margin: "0 auto",
            alignItems: "center",
          }}
        >
          {pricingPlans.map((plan, index) => (
            <div
              key={plan.id}
              className="animate-fade-in-up"
              style={{
                animationDelay: `${(index + 1) * 150}ms`,
                position: "relative",
                background: "var(--color-bg-card)",
                borderRadius: "var(--radius-xl)",
                padding: "var(--space-xl)",
                border: plan.popular ? "2px solid var(--color-accent-teal)" : "1px solid var(--color-border)",
                boxShadow: plan.popular ? "var(--shadow-lg)" : "var(--shadow-sm)",
                transform: hoveredPlan === plan.id ? "scale(1.02)" : "scale(1)",
                transition: "all var(--transition-base)",
                cursor: "pointer",
              }}
              onMouseEnter={() => setHoveredPlan(plan.id)}
              onMouseLeave={() => setHoveredPlan(null)}
            >
              {plan.popular && (
                <div
                  style={{
                    position: "absolute",
                    top: "-12px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "var(--color-accent-teal)",
                    color: "white",
                    padding: "var(--space-xs) var(--space-md)",
                    borderRadius: "var(--radius-full)",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Most Popular
                </div>
              )}

              <div style={{ marginBottom: "var(--space-xl)" }}>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.5rem",
                    fontWeight: 600,
                    marginBottom: "var(--space-sm)",
                  }}
                >
                  {plan.name}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "var(--space-xs)",
                    marginBottom: "var(--space-sm)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "3rem",
                      fontWeight: 700,
                      color: "var(--color-text-primary)",
                    }}
                  >
                    {plan.price}
                  </span>
                  <span style={{ color: "var(--color-text-muted)", fontSize: "1rem" }}>{plan.period}</span>
                </div>
                <p style={{ fontSize: "0.9375rem", color: "var(--color-text-secondary)" }}>
                  {plan.description}
                </p>
              </div>

              <ul style={{ marginBottom: "var(--space-xl)", display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "var(--space-sm)",
                      fontSize: "0.9375rem",
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    <span
                      style={{
                        width: "20px",
                        height: "20px",
                        background: "var(--color-sage)",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.75rem",
                        color: "var(--color-accent-teal)",
                        flexShrink: 0,
                      }}
                    >
                      ✓
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href="#"
                className="btn"
                style={{
                  width: "100%",
                  justifyContent: "center",
                  background: plan.popular ? "var(--color-text-primary)" : "transparent",
                  color: plan.popular ? "var(--color-bg-primary)" : "var(--color-text-primary)",
                  border: plan.popular ? "none" : "1.5px solid var(--color-border)",
                }}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section id="testimonials" className="section" style={{ background: "var(--color-bg-primary)" }}>
      <div className="container">
        {/* Section Header */}
        <div className="text-center" style={{ maxWidth: "600px", margin: "0 auto var(--space-3xl)" }}>
          <div
            className="animate-fade-in-up"
            style={{
              fontSize: "0.875rem",
              fontWeight: 500,
              color: "var(--color-accent-coral)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: "var(--space-md)",
            }}
          >
            Testimonials
          </div>
          <h2 className="animate-fade-in-up delay-100" style={{ marginBottom: "var(--space-lg)" }}>
            Loved by teams everywhere
          </h2>
          <p className="animate-fade-in-up delay-200" style={{ fontSize: "1.125rem" }}>
            See what our customers have to say about their experience with Flow.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="card animate-fade-in-up"
              style={{
                animationDelay: `${(index + 1) * 150}ms`,
                background: "var(--color-bg-card)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              {/* Quote Icon */}
              <div
                style={{
                  fontSize: "3rem",
                  lineHeight: 1,
                  color: "var(--color-mist)",
                  fontFamily: "Georgia, serif",
                  marginBottom: "var(--space-md)",
                }}
              >
                "
              </div>

              <p
                style={{
                  fontSize: "1.0625rem",
                  lineHeight: 1.7,
                  color: "var(--color-text-primary)",
                  marginBottom: "var(--space-xl)",
                  fontStyle: "italic",
                }}
              >
                {testimonial.quote}
              </p>

              <div className="flex gap-md" style={{ alignItems: "center" }}>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    background: "linear-gradient(135deg, var(--color-lavender) 0%, var(--color-sage) 100%)",
                    borderRadius: "var(--radius-full)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    color: "var(--color-text-primary)",
                  }}
                >
                  {testimonial.avatar}
                </div>
                <div>
                  <div
                    style={{
                      fontWeight: 600,
                      color: "var(--color-text-primary)",
                      fontSize: "0.9375rem",
                    }}
                  >
                    {testimonial.author}
                  </div>
                  <div style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)" }}>
                    {testimonial.role}
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

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Column */}
          <div>
            <a
              href="#"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "var(--color-text-primary)",
                display: "flex",
                alignItems: "center",
                gap: "var(--space-sm)",
                marginBottom: "var(--space-md)",
              }}
            >
              <span
                style={{
                  width: "32px",
                  height: "32px",
                  background: "var(--color-text-primary)",
                  borderRadius: "var(--radius-md)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--color-bg-primary)",
                  fontSize: "1rem",
                }}
              >
                ◈
              </span>
              Flow
            </a>
            <p style={{ fontSize: "0.9375rem", color: "var(--color-text-secondary)", maxWidth: "280px" }}>
              The minimalist platform that helps modern teams collaborate, automate workflows, and deliver exceptional products.
            </p>
          </div>

          {/* Links Columns */}
          {[
            {
              title: "Product",
              links: ["Features", "Pricing", "Integrations", "Changelog", "Roadmap"],
            },
            {
              title: "Company",
              links: ["About", "Blog", "Careers", "Press", "Partners"],
            },
            {
              title: "Resources",
              links: ["Documentation", "Help Center", "Community", "Templates", "API"],
            },
          ].map((column) => (
            <div key={column.title}>
              <div
                style={{
                  fontWeight: 600,
                  color: "var(--color-text-primary)",
                  marginBottom: "var(--space-md)",
                  fontSize: "0.9375rem",
                }}
              >
                {column.title}
              </div>
              <ul style={{ display: "flex", flexDirection: "column", gap: "var(--space-sm)" }}>
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      style={{
                        fontSize: "0.875rem",
                        color: "var(--color-text-secondary)",
                        transition: "color var(--transition-fast)",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-text-primary)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-secondary)")}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Footer */}
        <div
          className="footer-bottom"
          style={{
            paddingTop: "var(--space-xl)",
            borderTop: "1px solid var(--color-border)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "var(--space-md)",
          }}
        >
          <div style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)" }}>
            &copy; {new Date().getFullYear()} Flow. All rights reserved.
          </div>
          <div className="flex gap-lg">
            {["Privacy Policy", "Terms of Service", "Cookies"].map((link) => (
              <a
                key={link}
                href="#"
                style={{
                  fontSize: "0.8125rem",
                  color: "var(--color-text-muted)",
                  transition: "color var(--transition-fast)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-text-primary)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-muted)")}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Pricing />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
