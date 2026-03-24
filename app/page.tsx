import Link from "next/link";
import { SUSPECT_PROFILES } from "@/lib/constants";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background layers */}
      <div className="fog-layer" />
      <div className="grid-pattern fixed inset-0 pointer-events-none" />

      {/* Vignette overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-10"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)",
        }}
      />

      {/* Hero Section */}
      <section className="relative z-20 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        {/* Decorative top ornament */}
        <div className="animate-fade-in" style={{ animationDelay: "0ms" }}>
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[var(--gold-700)]" />
            <span className="text-[var(--gold-600)] text-xs tracking-[0.3em] uppercase font-mono">
              Scotland Yard Protocol No. 7
            </span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[var(--gold-700)]" />
          </div>
        </div>

        {/* Main title */}
        <div className="animate-fade-in-up" style={{ animationDelay: "200ms" }}>
          <h1
            className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight mb-2"
            style={{
              fontFamily: "var(--font-serif)",
              background: "linear-gradient(180deg, var(--gold-200) 0%, var(--gold-600) 50%, var(--gold-800) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "none",
              filter: "drop-shadow(0 4px 24px rgba(184, 134, 11, 0.15))",
            }}
          >
            THE
          </h1>
        </div>

        <div className="animate-fade-in-up" style={{ animationDelay: "400ms" }}>
          <h1
            className="text-7xl md:text-9xl lg:text-[10rem] font-black tracking-tighter leading-none mb-2"
            style={{
              fontFamily: "var(--font-serif)",
              background: "linear-gradient(180deg, var(--gold-100) 0%, var(--gold-400) 40%, var(--gold-700) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 4px 32px rgba(184, 134, 11, 0.2))",
            }}
          >
            BLACKWOOD
          </h1>
        </div>

        <div className="animate-fade-in-up" style={{ animationDelay: "600ms" }}>
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-[0.2em] mb-8"
            style={{
              fontFamily: "var(--font-serif)",
              background: "linear-gradient(180deg, var(--gold-300) 0%, var(--gold-700) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 4px 24px rgba(184, 134, 11, 0.15))",
            }}
          >
            PROTOCOL
          </h1>
        </div>

        {/* Subtitle */}
        <div className="animate-fade-in-up" style={{ animationDelay: "800ms" }}>
          <p
            className="text-lg md:text-xl max-w-2xl mb-4"
            style={{
              color: "var(--text-secondary)",
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
            }}
          >
            &ldquo;The Serpent has collected its debt.&rdquo;
          </p>
          <p
            className="text-sm md:text-base max-w-xl mb-12"
            style={{ color: "var(--text-muted)" }}
          >
            An experimental computational agent built to analyze evidence
            through pure logic. Process witness statements, physical clues, and
            contradictions to identify the killer.
          </p>
        </div>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 animate-fade-in-up mt-8 items-center"
          style={{ animationDelay: "1000ms" }}
        >
          <Link href="/investigate" className="btn-gold" id="begin-investigation">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            Begin Investigation
          </Link>
          <Link href="/case-briefing" className="btn-ghost text-sm flex items-center justify-center px-6" id="read-briefing">
            📄 Read Case Briefing
          </Link>
          <Link href="/story" className="btn-ghost flex items-center justify-center px-6 text-sm" style={{ border: '1px solid var(--border-subtle)' }}>
            📖 Read The Full Story
          </Link>
        </div>

        {/* Footer */}
        <footer className="mt-20 text-center pb-12 w-full">
          <div className="victorian-divider max-w-xl mx-auto">
            <span>◆</span>
          </div>
          <p className="text-xs mt-6" style={{ color: "var(--text-muted)" }}>
            The Blackwood Protocol • An AI Agent for Intelligent Crime Solving
          </p>
          <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
            CSP Constraint Satisfaction • A* Pathfinding • Model-Based Reflex Agent
          </p>
          <p className="text-[10px] sm:text-xs mt-4 flex items-center justify-center gap-1.5" style={{ color: "var(--gold-700)", fontWeight: 500, letterSpacing: '0.05em' }}>
            Build with <span className="text-crimson-500 animate-pulse">❤️</span> by Anik, Yashi, Tanvi
          </p>
        </footer>
      </section>
    </div>
  );
}
