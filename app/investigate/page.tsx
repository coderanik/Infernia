'use client';

import { useState, useCallback } from 'react';
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

      const stepInterval = setInterval(() => {
        if (currentStep < allSteps.length) {
          const step = allSteps[currentStep];
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
        } else {
          clearInterval(stepInterval);

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

            // Trigger path animation
            const roomCenter = ROOM_CENTERS[result.solution.room as Room];
            const entrance = ROOM_CENTERS['Entrance'];
            if (roomCenter && entrance) {
              fetchPath(entrance, roomCenter);
            }
          }

          setIsSolving(false);
          setActiveClueId(null);
        }
      }, 60); // Speed: steps per 60ms

      return () => clearInterval(stepInterval);
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
  };

  return (
    <div className="min-h-screen relative">
      <div className="grid-pattern fixed inset-0 pointer-events-none" />
      <div className="fog-layer" />

      {/* Top Navigation Bar */}
      <header
        className="sticky top-0 z-50 px-6 py-3"
        style={{
          background: 'rgba(10, 9, 8, 0.9)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
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
            <ClueBoard
              clues={clues}
              onCluesChange={() => {}}
              activeClueId={activeClueId}
            />
          </div>

          {/* Center Column: Map + Solution */}
          <div className="col-span-12 lg:col-span-5 space-y-5">
            <MansionMap
              highlightRoom={highlightRoom}
              path={path}
              isAnimating={isPathAnimating}
            />
            <SolutionReveal
              solution={solution}
              isRevealing={isRevealing}
            />
          </div>

          {/* Right Column: Reasoning Log */}
          <div className="col-span-12 lg:col-span-4 space-y-5">
            <ReasoningLog steps={steps} />

            {/* Algorithm Info Cards */}
            <div className="glass-card p-5">
              <h3
                className="text-lg font-bold flex items-center gap-2 mb-3"
                style={{ fontFamily: 'var(--font-serif)', color: 'var(--gold-300)' }}
              >
                <span>⚙️</span> Algorithms
              </h3>

              <div className="space-y-3">
                <div
                  className="rounded-lg p-3"
                  style={{
                    background: 'rgba(26, 22, 20, 0.5)',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold" style={{ color: 'var(--gold-400)' }}>
                      Unit 3: CSP Solver
                    </span>
                  </div>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                    Backtracking search with forward checking. Domain pruning on unary constraints. Variable ordering: time → room → weapon → suspect.
                  </p>
                </div>

                <div
                  className="rounded-lg p-3"
                  style={{
                    background: 'rgba(26, 22, 20, 0.5)',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold" style={{ color: '#4CAF50' }}>
                      Unit 2: A* Pathfinding
                    </span>
                  </div>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                    Manhattan distance heuristic on 12×10 grid. Multi-stop routing with nearest-neighbor ordering from entrance to crime scene.
                  </p>
                </div>

                <div
                  className="rounded-lg p-3"
                  style={{
                    background: 'rgba(26, 22, 20, 0.5)',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold" style={{ color: '#2196F3' }}>
                      Unit 1: Intelligent Agent
                    </span>
                  </div>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                    Model-based reflex agent. Maintains internal state via CSP assignment. PEAS framework defines performance measures.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        className="relative z-20 text-center py-6"
        style={{ borderTop: '1px solid var(--border-subtle)' }}
      >
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
          The Blackwood Protocol • CSP + A* + Model-Based Agent • AI Course Project
        </p>
      </footer>
    </div>
  );
}
