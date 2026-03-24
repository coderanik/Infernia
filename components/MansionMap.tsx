'use client';

import { useEffect, useRef, useState } from 'react';
import { buildGrid, GRID_COLS, GRID_ROWS, ROOM_CENTERS, ROOM_COLORS } from '@/lib/mansion';
import type { Room } from '@/lib/types';

interface MansionMapProps {
  highlightRoom?: Room | null;
  path?: { x: number; y: number }[];
  isAnimating?: boolean;
}

export default function MansionMap({ highlightRoom, path, isAnimating }: MansionMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [animationProgress, setAnimationProgress] = useState(0);
  const animationRef = useRef<number>(0);

  const CELL_SIZE = 48;
  const PADDING = 16;
  const canvasWidth = GRID_COLS * CELL_SIZE + PADDING * 2;
  const canvasHeight = GRID_ROWS * CELL_SIZE + PADDING * 2;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas resolution for Retina
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvasWidth * dpr;
    canvas.height = canvasHeight * dpr;
    ctx.scale(dpr, dpr);

    const grid = buildGrid();

    // Clear
    ctx.fillStyle = '#0A0908';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Draw grid cells
    for (let y = 0; y < GRID_ROWS; y++) {
      for (let x = 0; x < GRID_COLS; x++) {
        const cell = grid[y][x];
        const px = x * CELL_SIZE + PADDING;
        const py = y * CELL_SIZE + PADDING;

        const baseColor = ROOM_COLORS[cell.room] || '#1A1510';
        const isHighlight = highlightRoom && cell.room === highlightRoom;

        ctx.fillStyle = isHighlight
          ? adjustBrightness(baseColor, 40)
          : baseColor;
        ctx.fillRect(px, py, CELL_SIZE, CELL_SIZE);

        // Grid lines
        ctx.strokeStyle = 'rgba(184, 134, 11, 0.08)';
        ctx.lineWidth = 0.5;
        ctx.strokeRect(px, py, CELL_SIZE, CELL_SIZE);

        // Highlight glow
        if (isHighlight) {
          ctx.shadowColor = 'rgba(184, 134, 11, 0.3)';
          ctx.shadowBlur = 12;
          ctx.fillStyle = 'rgba(184, 134, 11, 0.1)';
          ctx.fillRect(px, py, CELL_SIZE, CELL_SIZE);
          ctx.shadowBlur = 0;
        }
      }
    }

    // Draw room labels
    ctx.font = '11px Inter, system-ui';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    for (const [roomName, center] of Object.entries(ROOM_CENTERS)) {
      const px = center.x * CELL_SIZE + PADDING + CELL_SIZE / 2;
      const py = center.y * CELL_SIZE + PADDING + CELL_SIZE / 2;

      // Room label background
      const label = roomName === 'Master Bedroom' ? 'Master\nBedroom' : roomName;
      const lines = label.split('\n');

      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      const bgWidth = Math.max(...lines.map(l => ctx.measureText(l).width)) + 12;
      const bgHeight = lines.length * 14 + 8;
      ctx.fillRect(px - bgWidth / 2, py - bgHeight / 2, bgWidth, bgHeight);

      ctx.fillStyle = highlightRoom === roomName
        ? '#FFD54F'
        : 'rgba(232, 220, 200, 0.7)';

      lines.forEach((line, i) => {
        const lineY = py + (i - (lines.length - 1) / 2) * 14;
        ctx.fillText(line, px, lineY);
      });
    }

    // Draw path
    if (path && path.length > 1) {
      const totalPoints = isAnimating ? Math.floor(path.length * animationProgress) : path.length;

      ctx.strokeStyle = '#FFD54F';
      ctx.lineWidth = 3;
      ctx.setLineDash([6, 4]);
      ctx.shadowColor = 'rgba(255, 213, 79, 0.5)';
      ctx.shadowBlur = 8;

      ctx.beginPath();
      for (let i = 0; i < totalPoints && i < path.length; i++) {
        const px = path[i].x * CELL_SIZE + PADDING + CELL_SIZE / 2;
        const py = path[i].y * CELL_SIZE + PADDING + CELL_SIZE / 2;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.shadowBlur = 0;

      // Draw start and end markers
      if (path.length > 0 && totalPoints > 0) {
        // Start marker
        const startPx = path[0].x * CELL_SIZE + PADDING + CELL_SIZE / 2;
        const startPy = path[0].y * CELL_SIZE + PADDING + CELL_SIZE / 2;
        ctx.fillStyle = '#4CAF50';
        ctx.beginPath();
        ctx.arc(startPx, startPy, 6, 0, Math.PI * 2);
        ctx.fill();

        // Current position or end marker
        const endIdx = Math.min(totalPoints - 1, path.length - 1);
        const endPx = path[endIdx].x * CELL_SIZE + PADDING + CELL_SIZE / 2;
        const endPy = path[endIdx].y * CELL_SIZE + PADDING + CELL_SIZE / 2;
        ctx.fillStyle = '#FF5722';
        ctx.beginPath();
        ctx.arc(endPx, endPy, 6, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }, [highlightRoom, path, animationProgress, isAnimating, canvasWidth, canvasHeight]);

  // Path animation
  useEffect(() => {
    if (!isAnimating || !path || path.length === 0) {
      setAnimationProgress(1);
      return;
    }

    setAnimationProgress(0);
    const startTime = performance.now();
    const duration = Math.max(1500, path.length * 80);

    function animate(time: number) {
      const progress = Math.min((time - startTime) / duration, 1);
      setAnimationProgress(progress);
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    }

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [isAnimating, path]);

  return (
    <div className="glass-card p-5">
      <h3
        className="text-lg font-bold flex items-center gap-2 mb-4"
        style={{ fontFamily: 'var(--font-serif)', color: 'var(--gold-300)' }}
      >
        <span>🏰</span> Blackwood Manor
      </h3>

      <div className="flex justify-center overflow-auto">
        <canvas
          ref={canvasRef}
          style={{
            width: canvasWidth,
            height: canvasHeight,
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
          }}
        />
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mt-4 justify-center">
        {Object.entries(ROOM_COLORS)
          .filter(([name]) => name !== 'Wall')
          .map(([name, color]) => (
            <div key={name} className="flex items-center gap-1.5">
              <div
                className="w-3 h-3 rounded-sm"
                style={{ background: color }}
              />
              <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
                {name}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}

function adjustBrightness(hex: string, amount: number): string {
  const r = Math.min(255, parseInt(hex.slice(1, 3), 16) + amount);
  const g = Math.min(255, parseInt(hex.slice(3, 5), 16) + amount);
  const b = Math.min(255, parseInt(hex.slice(5, 7), 16) + amount);
  return `rgb(${r}, ${g}, ${b})`;
}
