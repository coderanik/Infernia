'use client';

import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import ClueBoard from '@/components/ClueBoard';
import CaseFile from '@/components/CaseFile';
import MansionMap from '@/components/MansionMap';
import SolutionReveal from '@/components/SolutionReveal';
import ReasoningLog from '@/components/ReasoningLog';
import PEASTable from '@/components/PEASTable';
import { BLACKWOOD_CLUES } from '@/lib/clues';
import { ROOM_CENTERS } from '@/lib/mansion';
import type { Clue, ReasoningStep, Solution, Suspect, Room } from '@/lib/types';

export default function InvestigatePage() {
  const [clues] = useState<Clue[]>(BLACKWOOD_CLUES);
  const [solution, setSolution] = useState<Solution | null>(null);
  const [steps, setSteps] = useState<ReasoningStep[]>([]);
  const [isRevealing, setIsRevealing] = useState(false);
  const [isSolving, setIsSolving] = useState(false);
  const [hasSolved, setHasSolved] = useState(false);
  const [activeClueId, setActiveClueId] = useState<number | null>(null);
  const [eliminatedSuspects, setEliminatedSuspects] = useState<Suspect[]>([]);
  const [highlightRoom, setHighlightRoom] = useState<Room | null>(null);
  const [path, setPath] = useState<{ x: number; y: number }[]>([]);
  const [isPathAnimating, setIsPathAnimating] = useState(false);
  const [showPEAS, setShowPEAS] = useState(false);
  const [solverStats, setSolverStats] = useState<{ totalSteps: number; backtracks: number } | null>(null);
  const [isMaximized, setIsMaximized] = useState(false);
  const [investigatorSpeech, setInvestigatorSpeech] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when maximized
  useEffect(() => {
    if (isMaximized) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMaximized]);

  const handleSolve = useCallback(async () => {
    if (isSolving) return;
    setIsSolving(true);
    setHasSolved(false);
    setSolution(null);
    setSteps([]);
    setEliminatedSuspects([]);
    setIsRevealing(false);
    setPath([]);
    setHighlightRoom(null);
    setIsMaximized(true);
    setInvestigatorSpeech(null);

    try {
      const response = await fetch('/api/solve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clues }),
      });

      const data = await response.json();
      const result = data.result;

      // Animate steps appearing one by one
      const allSteps: ReasoningStep[] = result.steps;
      let currentStep = 0;
      let lastRoom: Room | 'Entrance' = 'Entrance';

      const executeStepDelay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

      const runNextStep = async () => {
        if (currentStep < allSteps.length) {
          const step = allSteps[currentStep];

          // Determine if we need to walk based on step evaluation
          let targetRoom: Room | 'Entrance' | null = null;
          let speech: string | null = null;

          if (step.action === 'try' || step.action === 'inconsistent' || step.action === 'prune') {
             if (step.variable === 'room' && step.value) targetRoom = step.value as Room;
             else if (step.variable === 'suspect') {
                if (step.value === 'Captain James Sterling') targetRoom = 'Conservatory';
                if (step.value === 'Lady Eleanor Ashford') targetRoom = 'Ballroom';
                if (step.value === 'Professor Alistair Thorn') targetRoom = 'Study';
                if (step.value === 'Miss Clara Whitmore') targetRoom = 'Library';
                speech = step.action === 'inconsistent' 
                  ? `Ah! I've cleared ${step.value} here!` 
                  : step.action === 'prune' 
                    ? `Impossible! ${step.value} is cleared!`
                    : `Let's question ${step.value}...`;
             }
             else if (step.variable === 'weapon') {
                if (step.value === 'Revolver') targetRoom = 'Study';
                if (step.value === 'Letter Opener') targetRoom = 'Library';
                if (step.value === 'Candelabra') targetRoom = 'Ballroom';
                if (step.value === 'Rope') targetRoom = 'Master Bedroom';
                speech = `Forensics indicates the ${step.value}...`;
             }
          }

          if (targetRoom && targetRoom !== lastRoom) {
             const startC = ROOM_CENTERS[lastRoom];
             const targetC = ROOM_CENTERS[targetRoom];
             setInvestigatorSpeech(null);
             try {
               const pRes = await fetch('/api/path', {
                  method: 'POST', body: JSON.stringify({ start: startC, targets: [targetC] })
               });
               const pData = await pRes.json();
               if (pData.result?.path) {
                 setPath(pData.result.path);
                 setIsPathAnimating(true);
                 lastRoom = targetRoom;
                 const walkTime = Math.max(1000, pData.result.path.length * 60);
                 await executeStepDelay(walkTime);
                 setIsPathAnimating(false);
               }
             } catch(e) {}
          }

          if (speech) setInvestigatorSpeech(speech);

          setSteps((prev) => [...prev, step]);

          // Highlight active clue
          if (step.clueId) {
            setActiveClueId(step.clueId);
          }

          // Track eliminations during animation
          if (step.action === 'prune' && step.variable === 'suspect') {
            setEliminatedSuspects((prev) =>
              prev.includes(step.value as Suspect) ? prev : [...prev, step.value as Suspect]
            );
          }

          currentStep++;
          
          let delay = 600;
          if (step.action === 'backtrack' || step.action === 'inconsistent') delay = 1500;
          if (step.action === 'prune') delay = 1200;
          if (step.action === 'solution') delay = 3500;

          setTimeout(runNextStep, delay);
        } else {
          setIsMaximized(false);
          setInvestigatorSpeech(null);
          
          if (result.success && result.solution) {
            setSolution(result.solution);
            setIsRevealing(true);
            setHasSolved(true);
            setHighlightRoom(result.solution.room);
            setSolverStats({
              totalSteps: result.totalSteps,
              backtracks: result.backtracks,
            });

            // Mark non-killer suspects as eliminated
            const killerName = result.solution.suspect;
            const eliminated: Suspect[] = [
              'Lady Eleanor Ashford',
              'Professor Alistair Thorn',
              'Miss Clara Whitmore',
              'Captain James Sterling',
            ].filter((s) => s !== killerName) as Suspect[];
            setEliminatedSuspects(eliminated);

            // Trigger final path animation to crime scene
            const roomCenter = ROOM_CENTERS[result.solution.room as Room];
            const entrance = ROOM_CENTERS['Entrance'];
            if (roomCenter && entrance) {
              fetchPath(entrance, roomCenter);
            }
          }

          setIsSolving(false);
          setActiveClueId(null);
        }
      };

      // Start the recursive loop
      setTimeout(runNextStep, 800);
    } catch (error) {
      console.error('Solve error:', error);
      setIsSolving(false);
    }
  }, [clues, isSolving]);

  const fetchPath = async (
    start: { x: number; y: number },
    target: { x: number; y: number }
  ) => {
    try {
      const response = await fetch('/api/path', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ start, targets: [target] }),
      });
      const data = await response.json();
      if (data.result && data.result.path.length > 0) {
        setPath(data.result.path);
        setIsPathAnimating(true);
        setTimeout(() => setIsPathAnimating(false), 3000);
      }
    } catch (error) {
      console.error('Path error:', error);
    }
  };

  const handleReset = () => {
    setSolution(null);
    setSteps([]);
    setIsRevealing(false);
    setIsSolving(false);
    setHasSolved(false);
    setActiveClueId(null);
    setEliminatedSuspects([]);
    setHighlightRoom(null);
    setPath([]);
    setIsPathAnimating(false);
    setSolverStats(null);
    setIsMaximized(false);
    setInvestigatorSpeech(null);
  };

  const liveDeductionUI = (
    <div className="glass-card p-5">
      <h3
        className="text-lg font-bold flex items-center gap-2 mb-3"
        style={{ fontFamily: 'var(--font-serif)', color: 'var(--gold-300)' }}
      >
        <span>💡</span> Live Deduction Engine
      </h3>
      
      <div className="space-y-3">
        {steps.length === 0 && (
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            Awaiting protocol activation to analyze clues...
          </p>
        )}
        
        {steps.length > 0 && steps[steps.length - 1] && (
          <div
            className="rounded-lg p-4 animate-fade-in transition-all"
            style={{
              background: 'rgba(26, 22, 20, 0.7)',
              border: `1px solid ${
                steps[steps.length - 1].action === 'inconsistent' ? 'var(--crimson-600)' : 
                steps[steps.length - 1].action === 'solution' ? '#FFD700' :
                steps[steps.length - 1].action === 'prune' ? '#9C27B0' : 'var(--gold-600)40'
              }`,
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
            }}
          >
            <div className="text-[10px] font-mono mb-2 tracking-widest" style={{ color: 'var(--text-muted)' }}>
              STEP {steps[steps.length-1].step} • {steps[steps.length-1].action.toUpperCase()}
            </div>
            
            {steps[steps.length-1].action === 'inconsistent' && steps[steps.length-1].clueId ? (
              <>
                <div className="text-sm font-bold mb-1" style={{ color: 'var(--crimson-400)' }}>
                  Hypothesis Invalidated
                </div>
                <p className="text-xs mb-3" style={{ color: 'var(--text-secondary)' }}>
                  Testing <strong style={{color:'var(--text-primary)'}}>{steps[steps.length-1].variable} = {steps[steps.length-1].value}</strong> fails due to a direct contradiction with known evidence.
                </p>
                <div className="p-3 rounded bg-black/40 border border-red-900/30">
                  <span className="text-[10px] font-bold tracking-widest uppercase mb-1 block" style={{ color: 'var(--crimson-600)' }}>Contradicting Clue #{steps[steps.length-1].clueId}</span>
                  <span className="text-xs italic" style={{ color: 'var(--gold-500)' }}>
                    &quot;{clues.find(c => c.id === steps[steps.length-1].clueId)?.description}&quot;
                  </span>
                </div>
                <p className="text-[10px] mt-3 uppercase tracking-wider font-bold animate-pulse" style={{ color: 'var(--crimson-500)' }}>
                  ↳ Pruning branch. Initiating backtrack.
                </p>
              </>
            ) : steps[steps.length-1].action === 'solution' ? (
              <>
                <div className="text-sm font-bold mb-2" style={{ color: '#FFD700' }}>
                  ✓ Absolute Mathematical Certainty Reached
                </div>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  All 12 constraints satisfied simultaneously. The mystery has precisely one unique solution.
                </p>
              </>
            ) : steps[steps.length-1].action === 'prune' ? (
               <>
                <div className="text-sm font-bold mb-1" style={{ color: '#9C27B0' }}>
                  Domain Reduction
                </div>
                <p className="text-xs mb-2" style={{ color: 'var(--text-secondary)' }}>
                  Pre-emptively removing <strong style={{color:'var(--text-primary)'}}>{steps[steps.length-1].value}</strong> to optimize search space.
                </p>
                <div className="p-3 rounded bg-black/40 border border-purple-900/30">
                  <span className="text-[10px] font-bold tracking-widest uppercase mb-1 block" style={{ color: '#9C27B0' }}>Based on Clue #{steps[steps.length-1].clueId}</span>
                  <span className="text-xs italic" style={{ color: 'var(--gold-500)' }}>
                    &quot;{clues.find(c => c.id === steps[steps.length-1].clueId)?.description}&quot;
                  </span>
                </div>
               </>
            ) : (
              <>
                <div className="text-sm font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                  Exploring Decision Tree...
                </div>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  {steps[steps.length-1].message}
                </p>
              </>
            )}
          </div>
        )}
      </div>

      {hasSolved && (
        <div className="mt-6 pt-4 border-t border-[var(--border-subtle)] animate-fade-in">
          <h4 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#4CAF50' }}>Applied AI Concepts</h4>
          <ul className="text-[10px] space-y-3" style={{ color: 'var(--text-secondary)' }}>
            <li><strong className="text-[var(--text-primary)]">Constraint Satisfaction (CSP):</strong> Utilized backtracking and forward checking to prune branches (Steps 1-6) and locate the unique valid theorem mapping.</li>
            <li><strong className="text-[var(--text-primary)]">A* Pathfinding Search:</strong> Powered the investigator's movement grid-by-grid using Manhattan Heuristics, visually validating distance limits.</li>
            <li><strong className="text-[var(--text-primary)]">PEAS Model-Based Agent:</strong> The entire process ran autonomously following percept updates mapping the 12 semantic clues to internal domains.</li>
          </ul>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen relative">
      <div className="grid-pattern fixed inset-0 pointer-events-none" />
      <div className="fog-layer" />

      {/* Top Navigation Bar */}
      <div className="sticky top-4 z-50 w-full px-4 flex justify-center pointer-events-none transition-all duration-300">
        <header
          className={`pointer-events-auto rounded-3xl w-full transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
            isScrolled ? 'max-w-[1000px] px-5 py-2.5' : 'max-w-[1440px] px-6 py-3'
          }`}
          style={{
            background: 'rgba(15, 13, 12, 0.75)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(184, 134, 11, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
          }}
        >
          <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 group"
              style={{ textDecoration: 'none' }}
            >
              <span className="text-lg">🔍</span>
              <span
                className="text-sm font-bold tracking-wider uppercase"
                style={{
                  fontFamily: 'var(--font-serif)',
                  color: 'var(--gold-400)',
                }}
              >
                Blackwood Protocol
              </span>
            </Link>
            <div className="h-4 w-px" style={{ background: 'var(--border-subtle)' }} />
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
              Investigation Dashboard
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              className="text-xs px-3 py-1.5 rounded transition-all"
              style={{
                background: showPEAS ? 'var(--gold-700)20' : 'transparent',
                color: showPEAS ? 'var(--gold-400)' : 'var(--text-muted)',
                border: `1px solid ${showPEAS ? 'var(--gold-700)' : 'var(--border-subtle)'}`,
                cursor: 'pointer',
              }}
              onClick={() => setShowPEAS(!showPEAS)}
            >
              🤖 Agent Info
            </button>

            {hasSolved && (
              <button
                className="btn-ghost text-xs py-1.5 px-3"
                onClick={handleReset}
              >
                🔄 Reset
              </button>
            )}

            <button
              className="btn-gold text-xs py-2 px-4"
              onClick={handleSolve}
              disabled={isSolving}
              style={{ opacity: isSolving ? 0.6 : 1 }}
            >
              {isSolving ? (
                <>
                  <span className="animate-spin inline-block">⚙️</span> Solving...
                </>
              ) : hasSolved ? (
                <>🔄 Re-analyze</>
              ) : (
                <>⚡ Solve Case</>
              )}
            </button>
          </div>
        </div>
        </header>
      </div>

      {/* PEAS Table Modal */}
      {showPEAS && (
        <div className="relative z-40 max-w-4xl mx-auto px-6 pt-4 animate-fade-in-up">
          <PEASTable />
        </div>
      )}

      {/* Main Content */}
      <main className="relative z-20 max-w-[1440px] mx-auto px-6 py-6">
        {/* Solver Stats */}
        {solverStats && (
          <div
            className="flex items-center gap-6 mb-4 px-4 py-2 rounded-lg animate-fade-in"
            style={{
              background: 'rgba(184, 134, 11, 0.06)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <div className="flex items-center gap-2">
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                Total Steps:
              </span>
              <span
                className="text-sm font-bold font-mono"
                style={{ color: 'var(--gold-400)' }}
              >
                {solverStats.totalSteps}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                Backtracks:
              </span>
              <span
                className="text-sm font-bold font-mono"
                style={{ color: 'var(--crimson-400)' }}
              >
                {solverStats.backtracks}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                Clues Processed:
              </span>
              <span
                className="text-sm font-bold font-mono"
                style={{ color: '#4CAF50' }}
              >
                {clues.length}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                Verdict:
              </span>
              <span
                className="text-sm font-bold font-mono"
                style={{ color: solution ? '#FFD700' : 'var(--crimson-400)' }}
              >
                {solution ? 'SOLVED' : 'UNSOLVED'}
              </span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-12 gap-5">
          {/* Left Column: Case File + Clue Board */}
          <div className="col-span-12 lg:col-span-3 space-y-5">
            <CaseFile
              eliminatedSuspects={eliminatedSuspects}
              killerSuspect={solution?.suspect ?? null}
            />
            {!isMaximized && (
              steps.length > 0 ? (
                <ClueBoard
                  clues={clues}
                  onCluesChange={() => {}}
                  activeClueId={activeClueId}
                />
              ) : (
                <div className="glass-card p-10 text-center animate-fade-in border-dashed border-[var(--border-strong)] flex flex-col items-center justify-center min-h-[300px]">
                  <div className="w-16 h-16 rounded-full bg-black/40 flex items-center justify-center text-3xl mb-4 border border-[var(--gold-800)]/30">🔒</div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-[var(--gold-400)] mb-2" style={{ fontFamily: 'var(--font-serif)' }}>Evidence Classified</h4>
                  <p className="text-[10px] text-[var(--text-muted)] max-w-[180px] leading-relaxed">
                    Access to case evidence is restricted until the <span className="text-[var(--gold-600)]">Investigation Protocol</span> is formally initiated.
                  </p>
                </div>
              )
            )}
          </div>

          {/* Center Column: Map + Solution */}
          <div className="col-span-12 lg:col-span-5 space-y-5">
            <MansionMap
              highlightRoom={highlightRoom}
              path={path}
              isAnimating={isPathAnimating}
              investigatorSpeech={investigatorSpeech}
            />
            <SolutionReveal
              solution={solution}
              isRevealing={isRevealing}
            />
          </div>

          {/* Right Column: Reasoning Log */}
          <div className="col-span-12 lg:col-span-4 space-y-5">
            <ReasoningLog steps={steps} />
            {!isMaximized && liveDeductionUI}
          </div>
        </div>
      </main>

      {/* Maximized Field Investigation Overlay */}
        {isMaximized && (
          <div className="fixed inset-0 z-[100] p-6 lg:p-10 flex flex-col lg:flex-row gap-8 backdrop-blur-3xl animate-fade-in-up" style={{ background: 'rgba(10, 9, 8, 0.85)' }}>
            {/* Left side: Huge map and Active Clue */}
            <div className="flex-1 flex flex-col justify-center items-center h-full relative">
              <div className="absolute top-0 left-0 w-full flex flex-col xl:flex-row justify-between xl:items-start gap-4 z-10">
                <div className="glass-card px-6 py-4 rounded-2xl border border-[var(--border-subtle)] bg-black/40 backdrop-blur-md">
                  <h2 className="text-3xl font-bold mb-1 flex items-center gap-3" style={{ fontFamily: 'var(--font-serif)', color: 'var(--gold-400)' }}>
                    <span className="animate-spin" style={{ animationDuration: '4s' }}>⚙️</span> Field Investigation
                  </h2>
                  <p className="text-[10px] text-[var(--text-muted)] tracking-[0.2em] uppercase ml-10">Agent visually mapping contradictions</p>
                </div>
                
                {/* Highlighted Active Clue Display */}
                {activeClueId && (
                  <div className="w-full xl:max-w-md p-5 rounded-2xl border shadow-2xl animate-fade-in-down"
                       style={{ 
                         background: 'rgba(20, 16, 14, 0.95)', 
                         backdropFilter: 'blur(16px)',
                         borderColor: 'rgba(184, 134, 11, 0.4)',
                         boxShadow: '0 10px 40px rgba(0,0,0,0.8), 0 0 20px rgba(184,134,11,0.1) inset'
                       }}>
                    {(() => {
                      const activeClue = clues.find(c => c.id === activeClueId);
                      if (!activeClue) return null;
                      return (
                        <>
                          <div className="flex items-center gap-3 mb-3 border-b border-[rgba(184,134,11,0.2)] pb-2">
                            <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold bg-[#1a1a1a] text-white border border-[var(--border-subtle)] shadow-inner">
                              {activeClue.id}
                            </span>
                            <span className="text-[10px] uppercase font-bold tracking-widest text-[#4CAF50] animate-pulse">
                              Processing Evidence...
                            </span>
                          </div>
                          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                            {activeClue.description}
                          </p>
                        </>
                      );
                    })()}
                  </div>
                )}
              </div>
              
              <div className="scale-100 lg:scale-[1.1] transform origin-center transition-transform mt-24">
                <MansionMap
                  highlightRoom={highlightRoom}
                  path={path}
                  isAnimating={isPathAnimating}
                  investigatorSpeech={investigatorSpeech}
                />
              </div>
            </div>
            
            {/* Right side: Live Deduction & ClueBoard */}
            <div className="w-full lg:w-[450px] flex flex-col gap-5 overflow-y-auto custom-scrollbar pr-4 pb-12 h-full">
              {liveDeductionUI}
              <ClueBoard clues={clues} onCluesChange={() => {}} activeClueId={activeClueId} />
            </div>
          </div>
        )}
      {/* Footer */}
      <footer className="relative z-20 text-center py-10 w-full flex flex-col items-center border-t border-[var(--border-subtle)] mt-12">
        <div className="victorian-divider w-full max-w-xl mx-auto mb-6">
          <span>◆</span>
        </div>
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          The Blackwood Protocol • CSP + A* + Model-Based Agent • AI Course Project
        </p>
        <p className="text-[10px] mt-3 flex items-center justify-center gap-1.5" style={{ color: "var(--gold-700)", fontWeight: 500, letterSpacing: '0.05em' }}>
          Build with <span className="text-crimson-500 animate-pulse">❤️</span> by Anik, Yashi, Tanvi
        </p>
      </footer>
    </div>
  );
}
