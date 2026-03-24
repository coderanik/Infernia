import type { PathNode, PathResult, GridCell } from './types';
import { buildGrid, GRID_COLS, GRID_ROWS } from './mansion';

// ─── A* Search with Manhattan Distance Heuristic ─────────────────────────────

export function findPath(
  startX: number,
  startY: number,
  goalX: number,
  goalY: number
): PathResult {
  const grid = buildGrid();

  const openSet: PathNode[] = [];
  const closedSet = new Set<string>();

  const startNode: PathNode = {
    x: startX,
    y: startY,
    g: 0,
    h: manhattan(startX, startY, goalX, goalY),
    f: manhattan(startX, startY, goalX, goalY),
    parent: null,
  };

  openSet.push(startNode);

  while (openSet.length > 0) {
    // Find node with lowest f
    openSet.sort((a, b) => a.f - b.f);
    const current = openSet.shift()!;

    // Goal reached
    if (current.x === goalX && current.y === goalY) {
      return reconstructPath(current, grid);
    }

    closedSet.add(key(current.x, current.y));

    // Expand neighbors (4-directional)
    const neighbors = getNeighbors(current, grid);
    for (const neighbor of neighbors) {
      const nKey = key(neighbor.x, neighbor.y);
      if (closedSet.has(nKey)) continue;

      const tentativeG = current.g + 1;

      const existing = openSet.find((n) => n.x === neighbor.x && n.y === neighbor.y);
      if (existing) {
        if (tentativeG < existing.g) {
          existing.g = tentativeG;
          existing.f = tentativeG + existing.h;
          existing.parent = current;
        }
      } else {
        const h = manhattan(neighbor.x, neighbor.y, goalX, goalY);
        openSet.push({
          x: neighbor.x,
          y: neighbor.y,
          g: tentativeG,
          h,
          f: tentativeG + h,
          parent: current,
        });
      }
    }
  }

  // No path found
  return { path: [], cost: -1, roomsVisited: [] };
}

// ─── Multi-Stop Routing ──────────────────────────────────────────────────────

export function findMultiStopPath(
  start: { x: number; y: number },
  targets: { x: number; y: number }[]
): PathResult {
  if (targets.length === 0) {
    return { path: [start], cost: 0, roomsVisited: [] };
  }

  let currentPos = start;
  const fullPath: { x: number; y: number }[] = [start];
  let totalCost = 0;
  const allRoomsVisited: string[] = [];

  // Greedy nearest-neighbor ordering
  const remaining = [...targets];

  while (remaining.length > 0) {
    // Find nearest unvisited target
    let nearestIdx = 0;
    let nearestDist = Infinity;
    for (let i = 0; i < remaining.length; i++) {
      const d = manhattan(currentPos.x, currentPos.y, remaining[i].x, remaining[i].y);
      if (d < nearestDist) {
        nearestDist = d;
        nearestIdx = i;
      }
    }

    const target = remaining.splice(nearestIdx, 1)[0];
    const segment = findPath(currentPos.x, currentPos.y, target.x, target.y);

    if (segment.cost === -1) continue; // Skip unreachable

    // Append path segment (skip first point to avoid duplicates)
    fullPath.push(...segment.path.slice(1));
    totalCost += segment.cost;
    allRoomsVisited.push(...segment.roomsVisited);

    currentPos = target;
  }

  // Deduplicate rooms
  const uniqueRooms = [...new Set(allRoomsVisited)];

  return {
    path: fullPath,
    cost: totalCost,
    roomsVisited: uniqueRooms,
  };
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function manhattan(x1: number, y1: number, x2: number, y2: number): number {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

function key(x: number, y: number): string {
  return `${x},${y}`;
}

function getNeighbors(node: PathNode, grid: GridCell[][]): { x: number; y: number }[] {
  const dirs = [
    { dx: 0, dy: -1 }, // up
    { dx: 0, dy: 1 },  // down
    { dx: -1, dy: 0 }, // left
    { dx: 1, dy: 0 },  // right
  ];

  const neighbors: { x: number; y: number }[] = [];
  for (const { dx, dy } of dirs) {
    const nx = node.x + dx;
    const ny = node.y + dy;
    if (nx >= 0 && nx < GRID_COLS && ny >= 0 && ny < GRID_ROWS && grid[ny][nx].walkable) {
      neighbors.push({ x: nx, y: ny });
    }
  }
  return neighbors;
}

function reconstructPath(node: PathNode, grid: GridCell[][]): PathResult {
  const path: { x: number; y: number }[] = [];
  const roomsVisited: string[] = [];
  let current: PathNode | null = node;

  while (current) {
    path.unshift({ x: current.x, y: current.y });
    const cell = grid[current.y][current.x];
    if (cell.room !== 'Hallway' && cell.room !== 'Wall' && cell.room !== 'Entrance') {
      if (!roomsVisited.includes(cell.room)) {
        roomsVisited.unshift(cell.room);
      }
    }
    current = current.parent;
  }

  return {
    path,
    cost: path.length - 1,
    roomsVisited,
  };
}
