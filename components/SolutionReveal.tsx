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
      )}
    </div>
  );
}
