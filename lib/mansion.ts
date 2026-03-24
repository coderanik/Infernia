import type { GridCell, Room } from './types';

// ─── Complex Mansion Grid (20 columns x 15 rows) ────────────────────────────
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

// Row-major layout, 20x15
const GRID_MAP: string[][] = [
  ['W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W'],
  ['W', 'S', 'S', 'S', 'S', 'W', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'W', 'L', 'L', 'L', 'L', 'W'],
  ['W', 'S', 'S', 'S', 'S', 'W', 'H', 'H', 'W', 'W', 'W', 'W', 'W', 'H', 'W', 'L', 'L', 'L', 'L', 'W'],
  ['W', 'S', 'S', 'S', 'S', 'H', 'H', 'H', 'W', 'C', 'C', 'C', 'W', 'H', 'H', 'L', 'L', 'L', 'L', 'W'],
  ['W', 'W', 'W', 'H', 'W', 'W', 'H', 'H', 'W', 'C', 'C', 'C', 'W', 'W', 'H', 'W', 'W', 'H', 'W', 'W'],
  ['W', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'W', 'C', 'C', 'C', 'W', 'H', 'H', 'H', 'H', 'H', 'H', 'W'],
  ['W', 'H', 'W', 'W', 'W', 'W', 'H', 'H', 'W', 'W', 'H', 'W', 'W', 'H', 'W', 'W', 'W', 'W', 'H', 'W'],
  ['W', 'H', 'H', 'H', 'H', 'W', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'W', 'K', 'K', 'K', 'H', 'W'],
  ['W', 'B', 'B', 'B', 'H', 'W', 'W', 'H', 'H', 'W', 'W', 'W', 'W', 'H', 'W', 'K', 'K', 'K', 'H', 'W'],
  ['W', 'B', 'B', 'B', 'H', 'H', 'H', 'H', 'H', 'H', 'E', 'E', 'H', 'H', 'H', 'K', 'K', 'K', 'H', 'W'],
  ['W', 'B', 'B', 'B', 'B', 'B', 'W', 'W', 'H', 'H', 'E', 'E', 'H', 'H', 'W', 'W', 'W', 'W', 'W', 'W'],
  ['W', 'W', 'W', 'W', 'W', 'B', 'W', 'H', 'H', 'H', 'W', 'W', 'H', 'H', 'W', 'M', 'M', 'M', 'W', 'W'],
  ['W', 'H', 'H', 'H', 'H', 'H', 'W', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'W', 'M', 'M', 'M', 'H', 'W'],
  ['W', 'H', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'M', 'M', 'M', 'H', 'W'],
  ['W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W'],
];

export const GRID_COLS = 20;
export const GRID_ROWS = 15;

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
  'Study':          { x: 3, y: 2 },
  'Library':        { x: 17, y: 2 },
  'Conservatory':   { x: 10, y: 4 },
  'Ballroom':       { x: 2, y: 9 },
  'Kitchen':        { x: 16, y: 8 },
  'Entrance':       { x: 10, y: 9 },
  'Master Bedroom': { x: 16, y: 12 },
};

// ─── Room Colors for Rendering ───────────────────────────────────────────────

export const ROOM_COLORS: Record<string, string> = {
  'Study':          '#8B4513',
  'Library':        '#2D5016',
  'Ballroom':       '#8B1A4A',
  'Kitchen':        '#4A3B7A',
  'Conservatory':   '#006D6F',
  'Master Bedroom': '#5C2D1A',
  'Hallway':        '#2A241D',
  'Wall':           '#15110D',
  'Entrance':       '#B8860B',
};
