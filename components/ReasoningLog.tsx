'use client';

import { useEffect, useRef, useState } from 'react';
import type { ReasoningStep } from '@/lib/types';

interface ReasoningLogProps {
  steps: ReasoningStep[];
  isAutoScrolling?: boolean;
}

export default function ReasoningLog({ steps, isAutoScrolling = true }: ReasoningLogProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    if (isAutoScrolling && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [steps, isAutoScrolling]);

  const getStepColor = (action: string) => {
    switch (action) {
      case 'try': return 'var(--gold-400)';
      case 'consistent': return '#4CAF50';
      case 'inconsistent': return 'var(--crimson-400)';
      case 'backtrack': return '#FF9800';
      case 'solution': return '#FFD700';
      case 'prune': return '#9C27B0';
      default: return 'var(--text-muted)';
    }
  };

  const getStepIcon = (action: string) => {
    switch (action) {
      case 'try': return '→';
      case 'consistent': return '✓';
      case 'inconsistent': return '✗';
      case 'backtrack': return '↩';
      case 'solution': return '★';
      case 'prune': return '✂';
      default: return '•';
    }
  };

  const filteredSteps = filter === 'all'
    ? steps
    : steps.filter((s) => s.action === filter);

  const stats = {
    total: steps.length,
    tries: steps.filter((s) => s.action === 'try').length,
    backtracks: steps.filter((s) => s.action === 'backtrack' || s.action === 'inconsistent').length,
    prunes: steps.filter((s) => s.action === 'prune').length,
  };

  return (
    <div className="glass-card p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3
          className="text-lg font-bold flex items-center gap-2 cursor-pointer"
          style={{ fontFamily: 'var(--font-serif)', color: 'var(--gold-300)' }}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span>🧠</span> Reasoning Log
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--text-muted)"
            strokeWidth="2"
            style={{
              transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)',
              transition: 'transform 0.2s',
            }}
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </h3>

        {steps.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
              {stats.total} steps
            </span>
          </div>
        )}
      </div>

      {isExpanded && (
        <>
          {/* Stats bar */}
          {steps.length > 0 && (
            <div className="flex gap-3 mb-3 flex-wrap">
              {[
                { label: 'All', count: stats.total, value: 'all', color: 'var(--gold-400)' },
                { label: 'Tried', count: stats.tries, value: 'try', color: 'var(--gold-400)' },
                { label: 'Failed', count: stats.backtracks, value: 'inconsistent', color: 'var(--crimson-400)' },
                { label: 'Pruned', count: stats.prunes, value: 'prune', color: '#9C27B0' },
              ].map((item) => (
                <button
                  key={item.value}
                  className="text-[10px] px-2 py-1 rounded font-mono transition-all"
                  style={{
                    background: filter === item.value ? `${item.color}20` : 'transparent',
                    color: filter === item.value ? item.color : 'var(--text-muted)',
                    border: `1px solid ${filter === item.value ? `${item.color}40` : 'var(--border-subtle)'}`,
                    cursor: 'pointer',
                  }}
                  onClick={() => setFilter(item.value)}
                >
                  {item.label} ({item.count})
                </button>
              ))}
            </div>
          )}

          {/* Log entries */}
          <div
            ref={scrollRef}
            className="max-h-[400px] overflow-y-auto space-y-0.5 font-mono text-xs pr-1"
          >
            {filteredSteps.length === 0 ? (
              <div className="text-center py-8" style={{ color: 'var(--text-muted)' }}>
                <p className="text-sm mb-1">No reasoning steps yet.</p>
                <p className="text-xs">Click &quot;Solve Case&quot; to begin.</p>
              </div>
            ) : (
              filteredSteps.map((step, i) => {
                const color = getStepColor(step.action);
                const icon = getStepIcon(step.action);

                return (
                  <div
                    key={`${step.step}-${i}`}
                    className="flex items-start gap-2 py-1.5 px-2 rounded transition-all"
                    style={{
                      background: step.action === 'solution'
                        ? 'rgba(255, 215, 0, 0.08)'
                        : 'transparent',
                      borderLeft: `2px solid ${color}`,
                    }}
                  >
                    <span
                      className="flex-shrink-0 w-4 text-center"
                      style={{ color }}
                    >
                      {icon}
                    </span>
                    <span
                      className="text-[10px] opacity-40 flex-shrink-0 w-6 text-right"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {step.step}
                    </span>
                    <span
                      className="flex-1"
                      style={{
                        color: step.action === 'solution'
                          ? '#FFD700'
                          : 'var(--text-secondary)',
                        fontWeight: step.action === 'solution' ? 700 : 400,
                      }}
                    >
                      {step.message}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </>
      )}
    </div>
  );
}
