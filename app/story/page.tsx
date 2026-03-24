import Link from 'next/link';

export default function StoryPage() {
  return (
    <div className="relative min-h-screen">
      <div className="fog-layer" />
      <div className="grid-pattern fixed inset-0 pointer-events-none opacity-50" />
      <div
        className="fixed inset-0 pointer-events-none z-10"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 20%, rgba(10,9,8,0.85) 100%)',
        }}
      />

      <header
        className="sticky top-0 z-50 px-6 py-4"
        style={{
          background: 'rgba(10, 9, 8, 0.95)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        <div className="max-w-[1000px] mx-auto flex items-center justify-between">
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
            <Link href="/investigate" className="text-xs uppercase tracking-widest hover:text-[var(--gold-400)] transition-colors" style={{ color: 'var(--text-muted)' }}>
              Investigation Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-20 max-w-[800px] mx-auto px-6 py-16">
        <div className="text-center mb-16 animate-fade-in-up">
          <span className="text-xs tracking-[0.3em] uppercase font-mono mb-4 block" style={{ color: 'var(--gold-600)' }}>
            Case Dossier & Technical Architecture
          </span>
          <h1
            className="text-5xl md:text-7xl font-bold mb-6"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--gold-300)' }}
          >
            The Tale of the Manor
          </h1>
          <div className="victorian-divider mx-auto mb-8">
            <span>◆</span>
          </div>
        </div>

        <section className="animate-fade-in-up prose prose-invert max-w-none space-y-6" style={{ animationDelay: '100ms' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--gold-400)' }} className="text-2xl border-b border-[var(--border-subtle)] pb-2">
            I. The Night in Question
          </h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            Isolated in the fog-bound moors of Victorian England sits <strong>Blackwood Manor</strong>, home to Lord Archibald Blackwood—a ruthless collector, swindler, and keeper of dangerous secrets. At midnight, amidst a torrential thunderstorm, Lord Blackwood is discovered dead. The murder weapon is missing from his side, a window has been shattered from the inside, and a single, cryptic note is pinned to his chest: <em style={{ color: 'var(--crimson-400)' }}>&ldquo;The Serpent has collected its debt.&rdquo;</em>
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            Four guests remain stranded in the Manor, each possessing a severe, undeniable motive for murder. The Vengeful Widow (Lady Ashford) whose husband met a suspicious end working for Blackwood. The Disgraced Scholar (Professor Thorn) whose life's work Blackwood plagiarized. The Desperate Officer (Captain Sterling) facing total financial ruin under Blackwood's blackmail. And the Patient Governess (Miss Clara Whitmore), secretly the heir to an estate Blackwood ruthlessly absorbed.
          </p>

          <h2 style={{ fontFamily: 'var(--font-serif)', color: '#FFD700', marginTop: '3rem' }} className="text-2xl border-b border-[var(--border-subtle)] pb-2 flex items-center gap-2">
            <span>🧠</span> II. The Investigative Architecture
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontStyle: 'italic' }}>
            To untangle the web of lies, alibis, and forensic constraints, Scotland Yard has deployed an experimental analytical engine: The Blackwood Protocol.
          </p>

          <div className="glass-card p-6 mt-6 border-l-4" style={{ borderColor: 'var(--gold-600)' }}>
            <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--gold-400)' }}>1. Constraint Satisfaction Problem (CSP) Solver</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>
              The core deduction engine uses a formal <strong>CSP Backtracking Algorithm</strong>. The mystery is defined by four variables: <strong>Time, Room, Weapon, and Suspect</strong>. 
            </p>
            <ul className="text-sm space-y-2 opacity-80 list-disc ml-5" style={{ color: 'var(--text-secondary)' }}>
              <li><strong>Forward Checking & Pruning:</strong> Immediate impossibility boundaries (like Clue #1 ruling out 8PM and 10PM) are computed and pruned before the search even begins, radically collapsing the search domain.</li>
              <li><strong>Deep Conditionals:</strong> The algorithm continuously validates conditional implications (`if_then`, `if_then_not`) enforcing complex alibis and limitations dynamically. If the chosen sequence directly contradicts a <em>Clue Node</em>, the solver halts that branch, registers an <strong>Inconsistent Hypothesis</strong>, and executes an intelligent backtrack.</li>
            </ul>
          </div>

          <div className="glass-card p-6 mt-4 border-l-4" style={{ borderColor: '#4CAF50' }}>
            <h3 className="text-lg font-bold mb-2" style={{ color: '#4CAF50' }}>2. A* Pathfinding Heuristics</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>
              Solving the mystery isn't enough; the agent must navigate the complex 20x15 geometric blueprint of Blackwood Manor to definitively prove reaching the crime scene was physically possible.
            </p>
            <ul className="text-sm space-y-2 opacity-80 list-disc ml-5" style={{ color: 'var(--text-secondary)' }}>
              <li><strong>Grid-Based Navigation:</strong> The Manor consists of blocked walls, narrow hallways, expansive rooms, and isolated wings mimicking realistic architectural constraints.</li>
              <li><strong>Manhattan Distance:</strong> The Agent employs the <strong>A* Search Algorithm</strong>, utilizing Manhattan heuristic distances to find the guaranteed shortest path from the Inspector's initial entry (the Entrance) straight to the dynamically identified Crime Room.</li>
            </ul>
          </div>

          <div className="glass-card p-6 mt-4 border-l-4" style={{ borderColor: '#2196F3' }}>
            <h3 className="text-lg font-bold mb-2" style={{ color: '#2196F3' }}>3. Model-Based Reflex Agent (PEAS)</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Following foundational AI theory, the Protocol operates entirely as a Model-Based Reflex Agent. It takes in "Percepts" (the initial 12 isolated clues), updates its internal "Model" (the domain maps and assignment constraints), checks for consistency, and then outputs an "Action" (Variable Assignment vs. Backtracking).
            </p>
          </div>

          <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--crimson-400)', marginTop: '3rem' }} className="text-2xl border-b border-[var(--border-subtle)] pb-2 flex items-center gap-2">
            <span>🎭</span> III. The Epilogue
          </h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            Upon successful execution of the complete algorithm, the mathematics confirm a single irrefutable conclusion. Despite the attempts to frame Professor Thorn and Lady Ashford via the "Serpent's Debt", and taking into account Captain Sterling's inebriated alibi, the culprit could only be the one person nobody expected.
          </p>
          <div className="p-6 text-center my-8 rounded-lg" style={{ background: 'rgba(220, 20, 60, 0.1)', border: '1px solid var(--crimson-700)' }}>
            <p className="font-serif italic text-lg mb-2" style={{ color: 'var(--text-primary)' }}>
              &ldquo;The quiet governess, Miss Clara Whitmore, took the Letter Opener from the Library display at exactly 11:00 PM.&rdquo;
            </p>
            <p className="text-xs uppercase tracking-widest font-bold" style={{ color: 'var(--crimson-400)' }}>Q.E.D. — Hypothesis Proven</p>
          </div>

          <div className="text-center mt-12 pb-16">
             <Link href="/investigate" className="btn-gold inline-flex items-center gap-2 text-sm px-8 py-3">
              Observe the Algorithm in Action
            </Link>
          </div>
        </section>
      </main>

      <footer className="relative z-20 text-center py-10 w-full flex flex-col items-center border-t border-[var(--border-subtle)] mt-12">
        <div className="victorian-divider w-full max-w-xl mx-auto mb-6">
          <span>◆</span>
        </div>
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          The Blackwood Protocol • Forensic AI Documentation
        </p>
        <p className="text-[10px] mt-3 flex items-center justify-center gap-1.5" style={{ color: "var(--gold-700)", fontWeight: 500, letterSpacing: '0.05em' }}>
          Build with <span className="text-crimson-500 animate-pulse">❤️</span> by Anik, Yashi, Tanvi
        </p>
      </footer>
    </div>
  );
}
