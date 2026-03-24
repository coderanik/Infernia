'use client';

import { useEffect, useState, useRef } from 'react';
import type { Solution } from '@/lib/types';

interface SolutionRevealProps {
  solution: Solution | null;
  isRevealing: boolean;
  onRevealComplete?: () => void;
}

export default function SolutionReveal({ solution, isRevealing, onRevealComplete }: SolutionRevealProps) {
  const [revealStage, setRevealStage] = useState(0);
  const [typewriterText, setTypewriterText] = useState('');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isRevealing || !solution) {
      setRevealStage(0);
      setTypewriterText('');
      return;
    }

    // Stage 1: "Analyzing evidence..."
    const stages = [
      { delay: 0, stage: 1 },
      { delay: 1200, stage: 2 },  // Suspect
      { delay: 2400, stage: 3 },  // Weapon
      { delay: 3600, stage: 4 },  // Room
      { delay: 4800, stage: 5 },  // Time
      { delay: 6000, stage: 6 },  // Complete
    ];

    const timers: NodeJS.Timeout[] = [];
    stages.forEach(({ delay, stage }) => {
      const timer = setTimeout(() => {
        setRevealStage(stage);
        if (stage === 6 && onRevealComplete) {
          onRevealComplete();
        }
      }, delay);
      timers.push(timer);
    });

    return () => timers.forEach(clearTimeout);
  }, [isRevealing, solution, onRevealComplete]);

  // Typewriter for verdict
  const [justificationVisible, setJustificationVisible] = useState(false);
  
  useEffect(() => {
    if (revealStage !== 6 || !solution) return;

    const verdict = `The Protocol has identified ${solution.suspect} as the perpetrator. The murder was committed with the ${solution.weapon} in the ${solution.room} at ${solution.time}.`;
    let i = 0;
    setTypewriterText('');

    const interval = setInterval(() => {
      if (i < verdict.length) {
        setTypewriterText(verdict.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => setJustificationVisible(true), 1500); // Wait 1.5s after verdict to show justification
      }
    }, 30);

    return () => clearInterval(interval);
  }, [revealStage, solution]);

  if (!solution) {
    return (
      <div className="glass-card p-8 text-center">
        <div className="text-4xl mb-4">🔍</div>
        <h3
          className="text-xl font-bold mb-2"
          style={{ fontFamily: 'var(--font-serif)', color: 'var(--gold-300)' }}
        >
          Awaiting Analysis
        </h3>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          Submit clues to activate the Protocol.
        </p>
      </div>
    );
  }

  if (!isRevealing) {
    return null;
  }

  const revealItems = [
    {
      label: 'SUSPECT',
      value: solution.suspect,
      icon: '🎭',
      color: 'var(--crimson-400)',
      stage: 2,
    },
    {
      label: 'WEAPON',
      value: solution.weapon,
      icon: '🗡️',
      color: 'var(--gold-400)',
      stage: 3,
    },
    {
      label: 'ROOM',
      value: solution.room,
      icon: '🚪',
      color: 'var(--copper-500)',
      stage: 4,
    },
    {
      label: 'TIME',
      value: solution.time,
      icon: '⏰',
      color: '#4A9EFF',
      stage: 5,
    },
  ];

  return (
    <div className="glass-card p-6 overflow-hidden">
      {/* Header */}
      <div className="text-center mb-6">
        <h3
          className="text-2xl font-bold mb-1"
          style={{
            fontFamily: 'var(--font-serif)',
            color: revealStage >= 6 ? 'var(--crimson-400)' : 'var(--gold-300)',
          }}
        >
          {revealStage < 2 ? (
            <span className="animate-pulse">Analyzing Evidence...</span>
          ) : revealStage < 6 ? (
            'Protocol Decrypting...'
          ) : (
            '⚖️ Verdict Delivered'
          )}
        </h3>
        {revealStage >= 1 && revealStage < 6 && (
          <div className="flex justify-center gap-1 mt-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full animate-pulse"
                style={{
                  background: 'var(--gold-600)',
                  animationDelay: `${i * 200}ms`,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Reveal Grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {revealItems.map((item) => (
          <div
            key={item.label}
            className="relative rounded-lg p-4 text-center transition-all duration-700"
            style={{
              background: revealStage >= item.stage
                ? 'rgba(26, 22, 20, 0.8)'
                : 'rgba(26, 22, 20, 0.3)',
              border: revealStage >= item.stage
                ? `1px solid ${item.color}40`
                : '1px solid var(--border-subtle)',
              opacity: revealStage >= item.stage ? 1 : 0.3,
              transform: revealStage >= item.stage ? 'scale(1)' : 'scale(0.95)',
            }}
          >
            {revealStage >= item.stage ? (
              <>
                <div className="text-2xl mb-1">{item.icon}</div>
                <div
                  className="text-[10px] font-mono tracking-widest mb-1"
                  style={{ color: item.color }}
                >
                  {item.label}
                </div>
                <div
                  className="text-sm font-bold animate-fade-in"
                  style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-primary)' }}
                >
                  {item.value}
                </div>
              </>
            ) : (
              <>
                <div className="text-2xl mb-1" style={{ opacity: 0.3 }}>❓</div>
                <div
                  className="text-[10px] font-mono tracking-widest mb-1"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {item.label}
                </div>
                <div className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  ████████
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Typewriter verdict */}
      {revealStage >= 6 && (
        <div className="space-y-4">
          <div
            className="rounded-lg p-4"
            style={{
              background: 'rgba(220, 20, 60, 0.08)',
              border: '1px solid rgba(220, 20, 60, 0.2)',
            }}
          >
            <p
              className="text-sm leading-relaxed"
              style={{
                fontFamily: 'var(--font-serif)',
                color: 'var(--text-primary)',
                fontStyle: 'italic',
              }}
            >
              {typewriterText}
              <span
                className="inline-block w-0.5 h-4 ml-0.5 align-middle"
                style={{
                  background: 'var(--gold-400)',
                  animation: 'blink-caret 0.75s step-end infinite',
                }}
              />
            </p>
          </div>

          {justificationVisible && (
            <div className="animate-fade-in-up mt-4 max-h-[260px] overflow-y-auto pr-2 custom-scrollbar relative">
              <h4 
                className="text-sm font-bold pb-2 mb-3 flex items-center gap-2 sticky top-0 z-10"
                style={{ 
                  color: 'var(--gold-300)', 
                  fontFamily: 'var(--font-serif)',
                  background: 'linear-gradient(to bottom, var(--bg-card) 85%, transparent)',
                  borderBottom: '1px solid rgba(184, 134, 11, 0.1)'
                }}
              >
                <span>📜</span> Deductive Synthesis
              </h4>
              <ul className="space-y-3">
                <li className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  <strong style={{ color: 'var(--text-primary)' }}>1. Time of Death:</strong> Clue #1 eliminates 8pm & 10pm. If 9pm, it mandates the Rope (Clue #6) in the Master Bedroom (Clue #9). But all suspects are alibied or blocked from using the Rope in the Master Bedroom (Clues #5, #7, #10, #11). Thus, 9pm is logically impossible. The murder must be at <strong style={{color: '#4A9EFF'}}>11pm</strong>.
                </li>
                <li className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  <strong style={{ color: 'var(--text-primary)' }}>2. Crime Scene & Weapon:</strong> Lady Ashford is the only one who uses the Candelabra (Clue #4), but she struck at 9pm if guilty (Clue #12), eliminating the Ballroom. The Rope fails for all remaining suspects at 11pm. Thus, the weapon is the <strong style={{color: 'var(--gold-400)'}}>Letter Opener</strong>, located uniquely in the <strong style={{color: 'var(--copper-500)'}}>Library</strong> (Clue #9).
                </li>
                <li className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  <strong style={{ color: 'var(--text-primary)' }}>3. The Culprit:</strong> With the Library and Letter Opener established at 11pm: Captain Sterling was passed out in the Conservatory (Clue #3). Lady Ashford strictly avoids the Library (Clue #5). Professor Thorn physically cannot use the Letter Opener due to arthritis (Clue #7). Meaning by total elimination, <strong style={{color: 'var(--crimson-400)'}}>Miss Clara Whitmore</strong> is the only remaining possibility.
                </li>
                <li className="text-xs mt-4 pt-3" style={{ borderTop: '1px solid rgba(184, 134, 11, 0.2)', color: 'var(--text-secondary)' }}>
                  <strong style={{ color: 'var(--gold-400)' }}>4. Analytical Constraints Utilized:</strong> 
                  <p className="mt-1">
                    The Protocol achieved this mathematical certainty strictly utilizing <strong style={{color:'var(--text-primary)'}}>Clues #1, #3, #4, #5, #6, #7, #9, #10, #11, and #12</strong>. Clues #2 and #8 represented valid branching logic but were bypassed as their conditional thresholds (Study and Revolver) were natively eliminated by higher-priority domain constraints.
                  </p>
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
