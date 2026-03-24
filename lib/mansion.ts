import type { GridCell, Room } from './types';

// ─── Mansion Grid (12 columns x 10 rows) ────────────────────────────────────
// Legend:
//   W = Wall, H = Hallway, E = Entrance
//   S = Study, L = Library, B = Ballroom
//   K = Kitchen, C = Conservatory, M = Master Bedroom

const GRID_LEGEND: Record<string, Room | 'Hallway' | 'Wall' | 'Entrance'> = {
  W: 'Wall',
  H: 'Hallway',
  E: 'Entrance',
  S: 'Study',
  L: 'Library',
  B: 'Ballroom',
  K: 'Kitchen',
  C: 'Conservatory',
  M: 'Master Bedroom',
};

// Row-major layout, 12 columns x 10 rows
const GRID_MAP: string[][] = [
  ['W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W'],
  ['W', 'S', 'S', 'S', 'W', 'H', 'H', 'W', 'L', 'L', 'L', 'W'],
  ['W', 'S', 'S', 'S', 'H', 'H', 'H', 'H', 'L', 'L', 'L', 'W'],
  ['W', 'S', 'S', 'S', 'W', 'H', 'H', 'W', 'L', 'L', 'L', 'W'],
  ['W', 'W', 'H', 'W', 'W', 'H', 'H', 'W', 'W', 'H', 'W', 'W'],
  ['W', 'B', 'H', 'B', 'W', 'H', 'H', 'W', 'K', 'H', 'K', 'W'],
  ['W', 'B', 'B', 'B', 'H', 'H', 'H', 'H', 'K', 'K', 'K', 'W'],
  ['W', 'B', 'B', 'B', 'W', 'H', 'E', 'W', 'K', 'K', 'K', 'W'],
  ['W', 'W', 'W', 'W', 'W', 'C', 'C', 'W', 'W', 'W', 'W', 'W'],
  ['W', 'M', 'M', 'M', 'W', 'C', 'C', 'W', 'W', 'W', 'W', 'W'],
];

export const GRID_COLS = 12;
export const GRID_ROWS = 10;

// ─── Build Grid ──────────────────────────────────────────────────────────────

export function buildGrid(): GridCell[][] {
  const grid: GridCell[][] = [];
  for (let y = 0; y < GRID_ROWS; y++) {
    const row: GridCell[] = [];
    for (let x = 0; x < GRID_COLS; x++) {
      const symbol = GRID_MAP[y][x];
      const roomType = GRID_LEGEND[symbol];
      row.push({
        x,
        y,
        walkable: roomType !== 'Wall',
        room: roomType,
      });
    }
    grid.push(row);
  }
  return grid;
}

// ─── Room Centers (for pathfinding targets) ──────────────────────────────────

export const ROOM_CENTERS: Record<Room | 'Entrance', { x: number; y: number }> = {
  'Study':          { x: 2, y: 2 },
  'Library':        { x: 9, y: 2 },
  'Ballroom':       { x: 2, y: 6 },
  'Kitchen':        { x: 9, y: 6 },
  'Conservatory':   { x: 5, y: 8 },
  'Master Bedroom': { x: 2, y: 9 },
  'Entrance':       { x: 6, y: 7 },
};

// ─── Room Colors for Rendering ───────────────────────────────────────────────

export const ROOM_COLORS: Record<string, string> = {
  'Study':          '#8B4513',
  'Library':        '#2D5016',
  'Ballroom':       '#8B1A4A',
  'Kitchen':        '#4A3B7A',
  'Conservatory':   '#006D6F',
  'Master Bedroom': '#5C2D1A',
  'Hallway':        '#3D3226',
  'Wall':           '#1A1510',
  'Entrance':       '#B8860B',
};
