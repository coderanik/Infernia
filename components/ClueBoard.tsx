'use client';

import { useState } from 'react';
import type { Clue, ReasoningStep } from '@/lib/types';
import { BLACKWOOD_CLUES } from '@/lib/clues';

interface ClueBoardProps {
  clues: Clue[];
  onCluesChange: (clues: Clue[]) => void;
  activeClueId: number | null;
}

export default function ClueBoard({ clues, onCluesChange, activeClueId }: ClueBoardProps) {
  const [expandedClue, setExpandedClue] = useState<number | null>(null);

  const getClueTypeColor = (type: string) => {
    switch (type) {
      case 'is': return 'var(--gold-400)';
      case 'is_not': return 'var(--crimson-400)';
      case 'weapon_room_link': return 'var(--copper-500)';
      case 'alibi': return '#4A9EFF';
      case 'sighting': return '#9B59B6';
      case 'compound': return 'var(--gold-600)';
      case 'if_then': return '#4CAF50';
      case 'if_then_not': return 'var(--crimson-500)';
      default: return 'var(--text-muted)';
    }
  };

  const getClueTypeIcon = (type: string) => {
    switch (type) {
      case 'is': return '✓';
      case 'is_not': return '✗';
      case 'weapon_room_link': return '🔗';
      case 'alibi': return '🕐';
      case 'sighting': return '👁';
      case 'compound': return '⚙';
      case 'if_then': return '⇒';
      case 'if_then_not': return '⇏';
      default: return '•';
    }
  };

  const getClueTypeLabel = (type: string) => {
    switch (type) {
      case 'is': return 'POSITIVE';
      case 'is_not': return 'NEGATIVE';
      case 'weapon_room_link': return 'LINK';
      case 'alibi': return 'ALIBI';
      case 'sighting': return 'SIGHTING';
      case 'compound': return 'COMPOUND';
      case 'if_then': return 'CONDITIONAL';
      case 'if_then_not': return 'EXCLUSION';
      default: return type.toUpperCase();
    }
  };

  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3
          className="text-lg font-bold flex items-center gap-2"
          style={{ fontFamily: 'var(--font-serif)', color: 'var(--gold-300)' }}
        >
          <span>📋</span> Clue Board
        </h3>
        <span
          className="text-xs px-2 py-1 rounded"
          style={{ background: 'var(--bg-elevated)', color: 'var(--text-muted)' }}
        >
          {clues.length} clues
        </span>
      </div>

      <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
        {clues.map((clue) => {
          const isActive = activeClueId === clue.id;
          const isExpanded = expandedClue === clue.id;
          const color = getClueTypeColor(clue.type);

          return (
            <div
              key={clue.id}
              className={`relative rounded-lg transition-all cursor-pointer ${isActive ? 'animate-pulse' : ''}`}
              style={{
                background: isActive
                  ? 'rgba(184, 134, 11, 0.15)'
                  : 'rgba(26, 22, 20, 0.5)',
                border: `1px solid ${isActive ? 'var(--gold-400)' : 'var(--border-subtle)'}`,
                boxShadow: isActive ? '0 0 20px rgba(184, 134, 11, 0.3), inset 0 0 10px rgba(184, 134, 11, 0.1)' : 'none',
                transform: isActive ? 'scale(1.02)' : 'scale(1)',
                zIndex: isActive ? 10 : 1,
              }}
              onClick={() => setExpandedClue(isExpanded ? null : clue.id)}
            >
              <div className="flex items-start gap-3 p-3">
                {/* Clue number */}
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
                  style={{
                    background: isActive ? 'var(--gold-500)' : `${color}20`,
                    color: isActive ? '#000' : color,
                    border: `1px solid ${color}40`,
                  }}
                >
                  {clue.id}
                </div>

                <div className="flex-1 min-w-0">
                  {/* Type badge */}
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span
                        className="text-[10px] px-1.5 py-0.5 rounded font-mono uppercase tracking-wider"
                        style={{
                          background: `${color}15`,
                          color: color,
                          border: `1px solid ${color}25`,
                        }}
                      >
                        {getClueTypeIcon(clue.type)} {getClueTypeLabel(clue.type)}
                      </span>
                    </div>
                    {isActive && (
                       <span className="text-[10px] font-bold text-yellow-400 tracking-widest animate-pulse">
                         ► EVALUATING
                       </span>
                    )}
                  </div>

                  {/* Description */}
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: isActive ? 'var(--gold-100)' : 'var(--text-primary)' }}
                  >
                    {clue.description}
                  </p>

                  {/* Expanded constraint info */}
                  {isExpanded && (
                    <div
                      className="mt-2 pt-2 text-[10px] leading-tight font-mono"
                      style={{
                        borderTop: '1px solid var(--border-subtle)',
                        color: 'var(--text-muted)',
                      }}
                    >
                      Constraint: {clue.constraint.type}
                      {clue.constraint.type === 'is_not' && (
                        <span> → {clue.constraint.category} ≠ {clue.constraint.value}</span>
                      )}
                      {clue.constraint.type === 'weapon_room_link' && (
                        <span> → {clue.constraint.weapon} ↔ {clue.constraint.room}</span>
                      )}
                      {clue.constraint.type === 'alibi' && (
                        <span> → {clue.constraint.suspect} @ {clue.constraint.room} [{clue.constraint.fromTime}–{clue.constraint.toTime}]</span>
                      )}
                      {clue.constraint.type === 'if_then' && (
                        <span> → if {clue.constraint.ifCategory}={clue.constraint.ifValue} then {clue.constraint.thenCategory}={clue.constraint.thenValue}</span>
                      )}
                      {clue.constraint.type === 'if_then_not' && (
                        <span> → if {clue.constraint.ifCategory}={clue.constraint.ifValue} then {clue.constraint.thenCategory}≠{clue.constraint.thenValue}</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
