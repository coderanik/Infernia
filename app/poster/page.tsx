'use client';

import Link from 'next/link';

export default function PosterPage() {
  return (
    <div className="min-h-screen bg-[#0a0908] text-[#e0e0e0] flex flex-col items-center py-12 px-6">
      {/* Back Button */}
      <div className="max-w-[1000px] w-full mb-8">
        <Link href="/" className="text-[var(--gold-400)] no-underline flex items-center gap-2 hover:opacity-80 transition-opacity">
            <span>←</span> Back to Protocol
        </Link>
      </div>

      {/* Main Poster Container */}
      <article className="max-w-[1100px] w-full bg-[#141210] border border-[var(--gold-900)] shadow-[0_0_100px_rgba(184,134,11,0.15)] rounded-lg overflow-hidden flex flex-col relative pb-20">
        
        {/* Top Section: Hero & Header */}
        <section className="relative h-[650px] w-full">
          <div className="absolute inset-0 overflow-hidden">
            <img 
              src="/assets/hero.png" 
              className="w-full h-full object-cover opacity-80" 
              alt="Infernia Hero"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#141210]" />
          </div>
          
          <div className="absolute bottom-10 left-0 w-full px-12 z-10 text-center">
            <h1 className="text-8xl font-black tracking-tighter uppercase mb-2" style={{ fontFamily: 'var(--font-serif)', color: 'var(--gold-400)', textShadow: '0 4px 20px rgba(0,0,0,0.9)' }}>
              INFERNIA
            </h1>
            <p className="text-2xl font-bold tracking-[0.4em] uppercase opacity-90 text-white" style={{ fontFamily: 'var(--font-serif)', textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
              The Blackwood Protocol • Formal Logic Engine
            </p>
          </div>
        </section>

        {/* Overview & Problem Statement Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 px-12 py-16 border-b border-[var(--border-subtle)]">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🧠</span>
              <h2 className="text-2xl font-bold uppercase tracking-widest text-[var(--gold-400)]">Project Overview</h2>
            </div>
            <div className="p-6 bg-black/40 rounded-xl border border-[var(--border-subtle)]">
              <h3 className="text-lg font-bold mb-3 text-white">The Challenge</h3>
              <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                Most AI in gaming relies on scripted triggers or probabilistic LLMs that lack formal consistency. <span className="text-white font-bold">Infernia</span> solves this by treating a murder mystery as a pure <strong>categorical optimization problem</strong>, requiring 100% mathematical certainty for a verdict.
              </p>
            </div>
            <div className="p-6 bg-[var(--gold-950)]/10 rounded-xl border border-[rgba(184,134,11,0.2)]">
              <h3 className="text-lg font-bold mb-3 text-[var(--gold-400)]">Why it matters</h3>
              <ul className="text-xs space-y-3 leading-tight opacity-90">
                <li className="flex gap-2"><span>◆</span> <strong>Explainable AI:</strong> Every deduction must provide a clear evidence trace.</li>
                <li className="flex gap-2"><span>◆</span> <strong>Hybrid Search:</strong> Combining symbolic logic (CSP) with physical navigation (A*).</li>
                <li className="flex gap-2"><span>◆</span> <strong>Real-World Relevance:</strong> Logic engines like this power supply chain optimization and security auditing.</li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🗂️</span>
              <h2 className="text-2xl font-bold uppercase tracking-widest text-[var(--gold-400)]">The Case Study</h2>
            </div>
            <div className="glass-card p-8 border-l-4 border-[var(--gold-700)] shadow-inner">
                <p className="italic text-lg mb-4 text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-serif)' }}>
                  "Lord Blackwood is dead. A window shattered, a missing weapon, and four guests with blood on their hands. Pure logic is the only witness that cannot lie."
                </p>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="text-center p-3 bg-black/40 rounded border border-[var(--border-subtle)]">
                    <div className="text-[var(--gold-400)] font-bold text-xl">12</div>
                    <div className="text-[10px] uppercase tracking-widest opacity-60">Overlapping Clues</div>
                  </div>
                  <div className="text-center p-3 bg-black/40 rounded border border-[var(--border-subtle)]">
                    <div className="text-[var(--gold-400)] font-bold text-xl">256</div>
                    <div className="text-[10px] uppercase tracking-widest opacity-60">Search Permutations</div>
                  </div>
                </div>
            </div>
          </div>
        </section>

        {/* Core Algorithms Section */}
        <section className="px-12 py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold uppercase tracking-tighter" style={{ fontFamily: 'var(--font-serif)', color: 'var(--gold-400)' }}>⚙️ The Core Architecture</h2>
            <div className="victorian-divider max-w-[300px] mx-auto opacity-40"><span>◆</span></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* CSP Card */}
            <div className="p-8 rounded-2xl bg-black/60 border border-[var(--border-strong)] flex flex-col">
              <div className="h-12 w-12 rounded-lg bg-[var(--gold-800)]/20 flex items-center justify-center text-2xl mb-6 self-start">⛓️</div>
              <h3 className="text-xl font-bold mb-4 text-white uppercase tracking-widest">CSP Solver</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-6">
                Constraint Satisfaction Problem: The engine maps the crime to variables (Suspect, Weapon, Room, Time) and prunes domains using backtracking.
              </p>
              <div className="mt-auto pt-4 border-t border-[var(--border-subtle)]">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--gold-500)] font-bold">Strategy: Backtracking + Forward Checking</span>
              </div>
            </div>

            {/* A* Card */}
            <div className="p-8 rounded-2xl bg-black/60 border border-[var(--border-strong)] flex flex-col">
              <div className="h-12 w-12 rounded-lg bg-[var(--gold-800)]/20 flex items-center justify-center text-2xl mb-6 self-start">🧭</div>
              <h3 className="text-xl font-bold mb-4 text-white uppercase tracking-widest">A* Search</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-6">
                Calculating the shortest navigable path on a 24×16 grid. Uses Manhattan distance heuristics to simulate the investigator's movement.
              </p>
              <div className="mt-auto pt-4 border-t border-[var(--border-subtle)]">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--gold-500)] font-bold">Optimization: Manhattan Heuristic</span>
              </div>
            </div>

            {/* PEAS Card */}
            <div className="p-8 rounded-2xl bg-black/60 border border-[var(--border-strong)] flex flex-col">
              <div className="h-12 w-12 rounded-lg bg-[var(--gold-800)]/20 flex items-center justify-center text-2xl mb-6 self-start">🤖</div>
              <h3 className="text-xl font-bold mb-4 text-white uppercase tracking-widest">PEAS Model</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-6">
                A Model-Based Reflex Agent architecture. It maintains an internal map of evidence (Sensors) and updates the UI state (Actuators).
              </p>
              <div className="mt-auto pt-4 border-t border-[var(--border-subtle)]">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--gold-500)] font-bold">Agent: Model-Based Rational Agent</span>
              </div>
            </div>
          </div>
        </section>

        {/* Visual Proof Section */}
        <section className="px-12 py-16 bg-black/20">
          <h2 className="text-2xl font-bold uppercase tracking-widest text-center mb-12 text-[var(--gold-400)]">📊 Investigative Evidence (Architecture)</h2>
          
          <div className="space-y-12 max-w-[900px] mx-auto">
            {/* Architecture Row */}
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1 rounded-xl overflow-hidden shadow-2xl border border-[var(--border-strong)] bg-black/40">
                <img src="/assets/peas_table.png" className="w-full grayscale hover:grayscale-0 transition-all duration-700" alt="Architecture" />
              </div>
              <div className="w-full md:w-[350px] space-y-4">
                <div className="px-4 py-1.5 rounded-full bg-[var(--gold-900)]/20 border border-[var(--gold-800)]/30 text-[10px] font-bold uppercase tracking-[0.3em] inline-block text-[var(--gold-400)]">System Logic</div>
                <h3 className="text-2xl font-bold leading-tight">Relational Logic Mapping</h3>
                <p className="text-xs leading-relaxed text-[var(--text-muted)]">
                  The model bridges human-readable testimony with formal logic constructs. These screenshots prove the mapping between suspect alibis and physical world constraints.
                </p>
              </div>
            </div>

            {/* Dashboard Row */}
            <div className="flex flex-col md:flex-row-reverse gap-8 items-center">
              <div className="flex-1 rounded-xl overflow-hidden shadow-2xl border border-[var(--border-strong)] bg-black/40">
                <img src="/assets/dashboard_full.png" className="w-full" alt="Dashboard" />
              </div>
              <div className="w-full md:w-[350px] space-y-4">
                <div className="px-4 py-1.5 rounded-full bg-[var(--gold-900)]/20 border border-[var(--gold-800)]/30 text-[10px] font-bold uppercase tracking-[0.3em] inline-block text-[var(--gold-400)]">The Visualizer</div>
                <h3 className="text-2xl font-bold leading-tight">Deductive Interface Unit</h3>
                <p className="text-xs leading-relaxed text-[var(--text-muted)]">
                  The visual map provides spatial grounding for the logic. Observing the investigator traverse rooms based on A* verifies that the agent is aware of the environment's physics.
                </p>
              </div>
            </div>

            {/* Verdict Row */}
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1 rounded-xl overflow-hidden shadow-2xl border border-[var(--border-strong)] bg-black/40">
                <img src="/assets/verdict_synthesis.jpg" className="w-full" alt="Verdict" />
              </div>
              <div className="w-full md:w-[350px] space-y-4">
                <div className="px-4 py-1.5 rounded-full bg-[var(--gold-900)]/20 border border-[var(--gold-800)]/30 text-[10px] font-bold uppercase tracking-[0.3em] inline-block text-[var(--gold-400)]">Final Synthesis</div>
                <h3 className="text-2xl font-bold leading-tight">100% Deterministic Verdicts</h3>
                <p className="text-xs leading-relaxed text-[var(--text-muted)]">
                  The final synthesis provides a narrative reconstruction by tracing back through the CSP assignment's proof path. No hallucinations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Highlights Section */}
        <section className="px-12 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold uppercase tracking-widest text-[var(--gold-400)]">🚀 Key Features</h2>
              <ul className="space-y-4">
                <li className="p-4 rounded-xl bg-[var(--gold-950)]/10 border border-[rgba(184,134,11,0.2)]">
                  <div className="text-sm font-bold text-white mb-1">Dynamic Constraint Propagation</div>
                  <p className="text-[10px] opacity-70">Prunes ~90% of the search space before testing, reducing backtracks from hundreds to dozens.</p>
                </li>
                <li className="p-4 rounded-xl bg-black/40 border border-[var(--border-subtle)]">
                  <div className="text-sm font-bold text-white mb-1">Synchronized Narrative Flow</div>
                  <p className="text-[10px] opacity-70">The reasoning log and pathfinding movement are synchronized millisecond-perfect for immersion.</p>
                </li>
                <li className="p-4 rounded-xl bg-black/40 border border-[var(--border-subtle)]">
                  <div className="text-sm font-bold text-white mb-1">Procedural Sound & Visuals</div>
                  <p className="text-[10px] opacity-70">A fully responsive 2D canvas engine built with vanilla Javascript logic and Next.js React hydration.</p>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-bold uppercase tracking-widest text-[var(--gold-400)]">📈 Results & Performance</h2>
              <div className="p-6 bg-black/60 border border-[var(--border-strong)] rounded-2xl relative overflow-hidden">
                <div className="grid grid-cols-2 gap-8 relative z-10">
                  <div className="text-center">
                    <div className="text-4xl font-mono text-[#4CAF50] font-bold">12ms</div>
                    <div className="text-[8px] uppercase tracking-widest opacity-60">Avg. CSP Solve Time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-mono text-[var(--gold-400)] font-bold">100%</div>
                    <div className="text-[8px] uppercase tracking-widest opacity-60">Deductive Accuracy</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-mono text-[#4CAF50] font-bold">4</div>
                    <div className="text-[8px] uppercase tracking-widest opacity-60">Parallel Domains</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-mono text-[var(--crimson-400)] font-bold">39</div>
                    <div className="text-[8px] uppercase tracking-widest opacity-60">Avg. Backtracks</div>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-black rounded-xl border border-[var(--border-subtle)] mt-4">
                 <h3 className="text-xs uppercase tracking-widest font-bold mb-4 opacity-70">Tech Stack</h3>
                 <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-[#1a1a1a] border border-[#333] rounded-md text-[9px] font-mono">Next.js 15 (App Router)</span>
                    <span className="px-3 py-1 bg-[#1a1a1a] border border-[#333] rounded-md text-[9px] font-mono">TypeScript 5</span>
                    <span className="px-3 py-1 bg-[#1a1a1a] border border-[#333] rounded-md text-[9px] font-mono">Tailwind CSS 4</span>
                    <span className="px-3 py-1 bg-[#1a1a1a] border border-[#333] rounded-md text-[9px] font-mono">HTML5 Canvas API</span>
                    <span className="px-3 py-1 bg-[#1a1a1a] border border-[#333] rounded-md text-[9px] font-mono">Framer Motion</span>
                 </div>
              </div>
            </div>
        </section>

        {/* Footer */}
        <footer className="text-center border-t border-[var(--border-strong)] py-12 bg-black/40">
           <h2 className="text-sm font-bold uppercase tracking-[0.5em] text-[var(--gold-500)] mb-4">Developed for AI Systems 2026</h2>
           <p className="text-[10px] text-[var(--text-muted)] max-w-sm mx-auto">
             Anik, Yashi, and Tanvi. A research project exploring the bounds of deterministic reasoning within interactive game-states.
           </p>
           <div className="mt-8">
              <Link href="/investigate" className="btn-gold py-4 px-12 rounded-full uppercase tracking-widest text-xs font-bold no-underline inline-block">
                Launch Live Protocol
              </Link>
           </div>
        </footer>

      </article>

      {/* Decorative Side Elements */}
      <div className="fixed top-20 left-10 pointer-events-none opacity-10 text-9xl hidden xl:block" style={{ fontFamily: 'var(--font-serif)' }}>01</div>
      <div className="fixed bottom-20 right-10 pointer-events-none opacity-10 text-9xl hidden xl:block" style={{ fontFamily: 'var(--font-serif)' }}>A*</div>
    </div>
  );
}
