'use client';

import { PEAS_TABLE } from '@/lib/constants';

export default function PEASTable() {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Performance': return '🎯';
      case 'Environment': return '🌍';
      case 'Actuators': return '⚙️';
      case 'Sensors': return '👁️';
      default: return '•';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Performance': return '#FFD700';
      case 'Environment': return '#4CAF50';
      case 'Actuators': return '#FF9800';
      case 'Sensors': return '#2196F3';
      default: return 'var(--text-muted)';
    }
  };

  return (
    <div className="glass-card p-5">
      <h3
        className="text-lg font-bold flex items-center gap-2 mb-1"
        style={{ fontFamily: 'var(--font-serif)', color: 'var(--gold-300)' }}
      >
        <span>🤖</span> Agent Architecture (PEAS)
      </h3>
      <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>
        Model-Based Reflex Agent — uses internal state to track deductions
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {PEAS_TABLE.map((entry) => {
          const color = getCategoryColor(entry.category);
          const icon = getCategoryIcon(entry.category);

          return (
            <div
              key={entry.category}
              className="rounded-lg p-3 transition-all"
              style={{
                background: 'rgba(26, 22, 20, 0.5)',
                border: `1px solid ${color}20`,
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{icon}</span>
                <div>
                  <h4
                    className="text-sm font-bold"
                    style={{ fontFamily: 'var(--font-serif)', color }}
                  >
                    {entry.category}
                  </h4>
                  <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
                    {entry.description}
                  </p>
                </div>
              </div>

              <ul className="space-y-1">
                {entry.details.map((detail, i) => (
                  <li
                    key={i}
                    className="text-xs flex items-start gap-1.5"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <span
                      className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0"
                      style={{ background: `${color}60` }}
                    />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
