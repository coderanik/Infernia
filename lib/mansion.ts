import type { GridCell, Room } from './types';

// ─── Highly Complex Mansion Grid (24 columns x 16 rows) ─────────────────────
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

// Row-major layout, 24x16
const GRID_MAP: string[][] = [
  ['W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W'],
  ['W','S','S','S','S','S','W','H','H','H','W','L','L','L','L','L','L','W','H','H','H','H','H','W'],
  ['W','S','S','S','S','S','W','H','W','H','W','L','L','L','L','L','L','W','H','W','W','W','H','W'],
  ['W','S','S','S','S','S','H','H','W','H','H','H','H','L','L','L','L','W','H','H','H','W','H','W'],
  ['W','S','S','W','W','W','W','W','W','W','W','W','H','W','W','W','W','W','W','W','H','W','H','W'],
  ['W','H','H','H','H','H','H','H','H','H','H','H','H','H','H','H','H','H','H','H','H','H','H','W'],
  ['W','H','W','W','W','W','W','W','H','W','W','W','W','W','H','W','W','W','W','W','W','W','H','W'],
  ['W','H','W','B','B','B','B','W','H','W','K','K','K','W','H','W','C','C','C','C','C','W','H','W'],
  ['W','H','H','B','B','B','B','W','H','W','K','K','K','W','H','H','H','H','C','C','C','W','H','W'],
  ['W','W','H','B','B','B','B','W','H','W','K','K','K','W','W','W','W','H','W','W','W','W','H','W'],
  ['W','H','H','B','B','B','B','W','H','W','K','K','K','K','K','K','H','H','H','H','H','H','H','W'],
  ['W','H','W','W','W','W','W','W','H','W','W','W','W','W','W','W','W','W','W','W','W','W','H','W'],
  ['W','H','H','H','H','H','H','H','H','H','H','E','E','H','H','H','H','H','H','M','M','M','H','W'],
  ['W','W','W','W','H','W','W','W','W','W','W','E','E','W','W','W','W','W','H','M','M','M','H','W'],
  ['W','M','M','M','H','M','M','M','M','M','H','E','E','H','H','H','H','H','H','M','M','M','H','W'],
  ['W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W'],
];

export const GRID_COLS = 24;
export const GRID_ROWS = 16;

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
  'Library':        { x: 14, y: 2 },
  'Conservatory':   { x: 18, y: 8 },
  'Ballroom':       { x: 5, y: 9 },
  'Kitchen':        { x: 12, y: 9 },
  'Entrance':       { x: 11, y: 13 },
  'Master Bedroom': { x: 20, y: 13 },
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
