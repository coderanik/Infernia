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
          className="flex flex-col sm:flex-row gap-4 animate-fade-in-up"
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
          <a href="#case-briefing" className="btn-ghost" id="read-briefing">
            Read Case Briefing
          </a>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-10 animate-float"
          style={{ animationDelay: "1200ms" }}
        >
          <div className="flex flex-col items-center gap-2">
            <span
              className="text-xs tracking-widest uppercase"
              style={{ color: "var(--text-muted)" }}
            >
              Scroll
            </span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--gold-700)"
              strokeWidth="1.5"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>
        </div>
      </section>

      {/* Case Briefing Section */}
      <section
        id="case-briefing"
        className="relative z-20 px-6 py-24 max-w-6xl mx-auto"
      >
        <div className="victorian-divider">
          <span>◆</span>
        </div>

        <div className="text-center mb-16 animate-fade-in-up">
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "var(--font-serif)", color: "var(--gold-300)" }}
          >
            Case File
          </h2>
          <p style={{ color: "var(--text-secondary)", maxWidth: "600px", margin: "0 auto" }}>
            In the fog-bound hills of Victorian England, Blackwood Manor stands
            as a monument to secrets. Lord Archibald Blackwood has been found
            dead. Four suspects. One killer. Only logic can reveal the truth.
          </p>
        </div>

        {/* Victim Card */}
        <div
          className="glass-card p-8 mb-12 max-w-3xl mx-auto ornament-border animate-fade-in-up"
          style={{ animationDelay: "100ms" }}
        >
          <div className="flex items-start gap-6">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center text-3xl flex-shrink-0"
              style={{
                background: "linear-gradient(135deg, var(--crimson-700), var(--crimson-900))",
                border: "2px solid var(--crimson-500)",
              }}
            >
              💀
            </div>
            <div>
              <h3
                className="text-2xl font-bold mb-1"
                style={{ fontFamily: "var(--font-serif)", color: "var(--crimson-300)" }}
              >
                Lord Archibald Blackwood
              </h3>
              <p
                className="text-sm mb-3"
                style={{ color: "var(--gold-600)", fontStyle: "italic" }}
              >
                The Victim — Collector, Swindler, Keeper of Grudges
              </p>
              <p style={{ color: "var(--text-secondary)", fontSize: "14px", lineHeight: 1.7 }}>
                Found dead in his manor at midnight. A single fatal wound, a
                shattered window, and a cryptic note pinned to his chest:{" "}
                <em style={{ color: "var(--crimson-400)" }}>
                  &ldquo;The Serpent has collected its debt.&rdquo;
                </em>{" "}
                The Serpent&apos;s Coil — an ancient golden amulet he unearthed and
                claimed sole credit for — sits in a glass case in his Study.
              </p>
            </div>
          </div>
        </div>

        {/* Suspects Grid */}
        <h3
          className="text-2xl font-bold text-center mb-8"
          style={{ fontFamily: "var(--font-serif)", color: "var(--gold-400)" }}
        >
          The Suspects
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 stagger-children">
          {SUSPECT_PROFILES.map((suspect) => (
            <div
              key={suspect.name}
              className="glass-card p-6 animate-fade-in-up"
              style={{
                borderLeft: `3px solid ${suspect.color}`,
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-2xl flex-shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${suspect.color}40, ${suspect.color}20)`,
                    border: `1px solid ${suspect.color}60`,
                  }}
                >
                  {suspect.icon}
                </div>
                <div className="flex-1">
                  <h4
                    className="text-lg font-bold mb-0.5"
                    style={{ fontFamily: "var(--font-serif)", color: suspect.color }}
                  >
                    {suspect.name}
                  </h4>
                  <p
                    className="text-xs mb-2"
                    style={{ color: "var(--gold-600)", fontStyle: "italic" }}
                  >
                    {suspect.title}
                  </p>
                  <p
                    className="text-sm mb-2"
                    style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}
                  >
                    {suspect.description}
                  </p>
                  <div
                    className="text-xs px-3 py-1.5 rounded-full inline-block"
                    style={{
                      background: `${suspect.color}15`,
                      border: `1px solid ${suspect.color}30`,
                      color: suspect.color,
                    }}
                  >
                    Motive: {suspect.motive}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Evidence Section */}
        <div className="victorian-divider">
          <span>◆</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {/* Weapons */}
          <div className="glass-card p-6 animate-fade-in-up">
            <h4
              className="text-xl font-bold mb-4 flex items-center gap-2"
              style={{ fontFamily: "var(--font-serif)", color: "var(--gold-400)" }}
            >
              <span>🗡️</span> Weapons Found
            </h4>
            <div className="space-y-3">
              {[
                { weapon: "Revolver", room: "Study", icon: "🔫" },
                { weapon: "Letter Opener", room: "Library", icon: "✉️" },
                { weapon: "Candelabra", room: "Ballroom", icon: "🕯️" },
                { weapon: "Rope", room: "Master Bedroom", icon: "🪢" },
              ].map((item) => (
                <div
                  key={item.weapon}
                  className="flex items-center justify-between py-2 px-3 rounded"
                  style={{ background: "rgba(184, 134, 11, 0.05)" }}
                >
                  <span className="flex items-center gap-2 text-sm" style={{ color: "var(--text-primary)" }}>
                    <span>{item.icon}</span> {item.weapon}
                  </span>
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                    Found in {item.room}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Rooms */}
          <div className="glass-card p-6 animate-fade-in-up">
            <h4
              className="text-xl font-bold mb-4 flex items-center gap-2"
              style={{ fontFamily: "var(--font-serif)", color: "var(--gold-400)" }}
            >
              <span>🏛️</span> Rooms of Interest
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {[
                { room: "Study", icon: "📖" },
                { room: "Library", icon: "📚" },
                { room: "Ballroom", icon: "💃" },
                { room: "Kitchen", icon: "🍷" },
                { room: "Conservatory", icon: "🌿" },
                { room: "Master Bedroom", icon: "🛏️" },
              ].map((item) => (
                <div
                  key={item.room}
                  className="flex items-center gap-2 py-2 px-3 rounded text-sm"
                  style={{
                    background: "rgba(184, 134, 11, 0.05)",
                    color: "var(--text-primary)",
                  }}
                >
                  <span>{item.icon}</span> {item.room}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="glass-card p-6 mt-8 animate-fade-in-up">
          <h4
            className="text-xl font-bold mb-4 flex items-center gap-2"
            style={{ fontFamily: "var(--font-serif)", color: "var(--gold-400)" }}
          >
            <span>⏰</span> Timeline
          </h4>
          <div className="flex items-center justify-between">
            {[
              { time: "8:00 PM", event: "Dinner begins" },
              { time: "8-11 PM", event: "Guests disperse" },
              { time: "Midnight", event: "Body discovered" },
            ].map((item, i) => (
              <div key={item.time} className="flex items-center gap-4 flex-1">
                <div className="text-center flex-1">
                  <div
                    className="text-lg font-bold mb-1"
                    style={{ fontFamily: "var(--font-serif)", color: "var(--gold-300)" }}
                  >
                    {item.time}
                  </div>
                  <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {item.event}
                  </div>
                </div>
                {i < 2 && (
                  <div className="h-px flex-shrink-0 w-12" style={{ background: "var(--gold-800)" }} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Begin Button */}
        <div className="text-center mt-16">
          <Link href="/investigate" className="btn-gold text-lg px-10 py-4" id="begin-investigation-bottom">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            Activate The Protocol
          </Link>
        </div>

        {/* Footer */}
        <footer className="mt-24 text-center">
          <div className="victorian-divider">
            <span>◆</span>
          </div>
          <p className="text-xs mt-6" style={{ color: "var(--text-muted)" }}>
            The Blackwood Protocol • An AI Agent for Intelligent Crime Solving
          </p>
          <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
            CSP Constraint Satisfaction • A* Pathfinding • Model-Based Reflex Agent
          </p>
        </footer>
      </section>
    </div>
  );
}
