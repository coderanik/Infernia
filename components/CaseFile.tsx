'use client';

import { SUSPECT_PROFILES } from '@/lib/constants';
import type { Suspect } from '@/lib/types';

interface SuspectCardProps {
  suspect: (typeof SUSPECT_PROFILES)[number];
  isEliminated: boolean;
  isKiller: boolean;
}

export function SuspectCard({ suspect, isEliminated, isKiller }: SuspectCardProps) {
  return (
    <div
      className="relative rounded-lg p-4 transition-all duration-500"
      style={{
        background: isKiller
          ? `linear-gradient(135deg, ${suspect.color}30, ${suspect.color}10)`
          : isEliminated
            ? 'rgba(26, 22, 20, 0.3)'
            : 'rgba(26, 22, 20, 0.6)',
        border: isKiller
          ? `2px solid ${suspect.color}`
          : `1px solid ${isEliminated ? 'rgba(184, 134, 11, 0.05)' : 'var(--border-subtle)'}`,
        opacity: isEliminated ? 0.4 : 1,
        filter: isEliminated ? 'grayscale(0.8)' : 'none',
        boxShadow: isKiller ? `0 0 24px ${suspect.color}40` : 'none',
      }}
    >
      {/* Killer badge */}
      {isKiller && (
        <div
          className="absolute -top-2 -right-2 text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse-gold"
          style={{
            background: 'var(--crimson-600)',
            color: 'white',
            border: '1px solid var(--crimson-400)',
          }}
        >
          GUILTY
        </div>
      )}

      {/* Eliminated X */}
      {isEliminated && (
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ color: 'var(--crimson-700)', fontSize: '48px', opacity: 0.3 }}
        >
          ✗
        </div>
      )}

      <div className="flex items-center gap-3">
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center text-xl flex-shrink-0"
          style={{
            background: `${suspect.color}25`,
            border: `1px solid ${suspect.color}50`,
          }}
        >
          {suspect.icon}
        </div>
        <div className="min-w-0">
          <h4
            className="text-sm font-bold truncate"
            style={{ fontFamily: 'var(--font-serif)', color: suspect.color }}
          >
            {suspect.name}
          </h4>
          <p
            className="text-[11px] truncate"
            style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}
          >
            {suspect.title}
          </p>
        </div>
      </div>

      <p
        className="text-xs mt-2 line-clamp-2"
        style={{ color: 'var(--text-secondary)', lineHeight: '1.5' }}
      >
        {suspect.motive}
      </p>
    </div>
  );
}

interface CaseFileProps {
  eliminatedSuspects: Suspect[];
  killerSuspect: Suspect | null;
}

export default function CaseFile({ eliminatedSuspects, killerSuspect }: CaseFileProps) {
  return (
    <div className="glass-card p-5">
      <h3
        className="text-lg font-bold flex items-center gap-2 mb-4"
        style={{ fontFamily: 'var(--font-serif)', color: 'var(--gold-300)' }}
      >
        <span>🗂️</span> Case File
      </h3>

      <div className="space-y-3">
        {SUSPECT_PROFILES.map((suspect) => (
          <SuspectCard
            key={suspect.name}
            suspect={suspect}
            isEliminated={eliminatedSuspects.includes(suspect.name)}
            isKiller={killerSuspect === suspect.name}
          />
        ))}
      </div>

      {/* Evidence summary */}
      <div className="mt-5 pt-4" style={{ borderTop: '1px solid var(--border-subtle)' }}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
            Suspects remaining
          </span>
          <span
            className="text-sm font-bold"
            style={{ color: 'var(--gold-400)', fontFamily: 'var(--font-mono)' }}
          >
            {4 - eliminatedSuspects.length} / 4
          </span>
        </div>
        <div className="w-full h-1.5 rounded-full" style={{ background: 'var(--bg-elevated)' }}>
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${((4 - eliminatedSuspects.length) / 4) * 100}%`,
              background: 'linear-gradient(90deg, var(--crimson-600), var(--gold-600))',
            }}
          />
        </div>
      </div>
    </div>
  );
}
