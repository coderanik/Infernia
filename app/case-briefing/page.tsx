'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { SUSPECT_PROFILES } from "@/lib/constants";

export default function CaseBriefingPage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <div className="relative min-h-screen">
      <div className="fog-layer" />
      <div className="grid-pattern fixed inset-0 pointer-events-none opacity-50" />
      <div
        className="fixed inset-0 pointer-events-none z-10"
        style={{
          background: "radial-gradient(ellipse at center, transparent 20%, rgba(10,9,8,0.85) 100%)",
        }}
      />

      {/* Top Navigation Bar */}
      <div className="sticky top-4 z-50 w-full px-4 flex justify-center pointer-events-none transition-all duration-300">
        <header
          className={`pointer-events-auto rounded-full w-full transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
            isScrolled ? 'max-w-[800px] px-5 py-3' : 'max-w-[1000px] px-6 py-4'
          }`}
          style={{
            background: "rgba(15, 13, 12, 0.75)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(184, 134, 11, 0.2)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
          }}
        >
          <div className="flex items-center justify-between w-full">
          <Link
            href="/"
            className="flex items-center gap-2 group"
            style={{ textDecoration: 'none' }}
          >
            <span className="text-lg">🔍</span>
            <span
              className="text-sm font-bold tracking-wider uppercase"
              style={{ fontFamily: 'var(--font-serif)', color: 'var(--gold-400)' }}
            >
              Blackwood Protocol
            </span>
          </Link>
          <div className="flex gap-4">
            <Link href="/" className="text-xs uppercase tracking-widest hover:text-[var(--gold-400)] transition-colors" style={{ color: 'var(--text-muted)' }}>
              Home
            </Link>
            <Link href="/investigate" className="text-xs uppercase tracking-widest hover:text-[var(--gold-400)] transition-colors" style={{ color: 'var(--text-muted)' }}>
              Dashboard
            </Link>
          </div>
        </div>
        </header>
      </div>

      <main className="relative z-20 max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-16 animate-fade-in-up">
          <span className="text-xs tracking-[0.3em] uppercase font-mono mb-4 block" style={{ color: 'var(--gold-600)' }}>
            Confidential Case Dossier
          </span>
          <h1
            className="text-5xl md:text-6xl font-bold mb-4"
            style={{ fontFamily: "var(--font-serif)", color: "var(--gold-300)" }}
          >
            Case Briefing
          </h1>
          <p style={{ color: "var(--text-secondary)", maxWidth: "600px", margin: "0 auto" }}>
            Lord Archibald Blackwood has been found dead. Four suspects. One killer. 
            Review the evidence before initiating the investigative protocol.
          </p>
        </div>

        <div className="victorian-divider">
          <span>◆</span>
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

        <div className="text-center mt-16">
          <Link href="/investigate" className="btn-gold text-lg px-10 py-4">
            Begin Investigation
          </Link>
        </div>

        <footer className="mt-24 text-center pb-12 w-full flex flex-col items-center border-t border-[var(--border-subtle)] pt-12">
          <div className="victorian-divider w-full max-w-xl mx-auto mb-6">
            <span>◆</span>
          </div>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            The Blackwood Protocol • Official Case Briefing
          </p>
          <p className="text-[10px] sm:text-xs mt-4 flex items-center justify-center gap-1.5" style={{ color: "var(--gold-700)", fontWeight: 500, letterSpacing: '0.05em' }}>
            Build with <span className="text-crimson-500 animate-pulse">❤️</span> by Anik, Yashi, Tanvi
          </p>
        </footer>
      </main>
    </div>
  );
}
