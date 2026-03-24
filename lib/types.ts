// ─── Domain Types ────────────────────────────────────────────────────────────

export type Suspect = 'Lady Eleanor Ashford' | 'Professor Alistair Thorn' | 'Miss Clara Whitmore' | 'Captain James Sterling';

export type Weapon = 'Revolver' | 'Letter Opener' | 'Candelabra' | 'Rope';

export type Room = 'Study' | 'Library' | 'Ballroom' | 'Kitchen' | 'Conservatory' | 'Master Bedroom';

export type Time = '8pm' | '9pm' | '10pm' | '11pm';

// ─── Clue Types ──────────────────────────────────────────────────────────────

export type ClueCategory = 'suspect' | 'weapon' | 'room' | 'time';

export type ClueType =
  | 'is'            // X is Y
  | 'is_not'        // X is not Y
  | 'if_then'       // If X then Y
  | 'if_then_not'   // If X then not Y
  | 'weapon_room_link' // Weapon found in Room
  | 'alibi'         // Suspect was in Room from Time to Time
  | 'sighting'      // Suspect was seen at Room at Time
  | 'compound';     // Combined constraint

export interface Clue {
  id: number;
  type: ClueType;
  description: string;
  constraint: ClueConstraint;
}

export type ClueConstraint =
  | IsConstraint
  | IsNotConstraint
  | IfThenConstraint
  | IfThenNotConstraint
  | WeaponRoomLinkConstraint
  | AlibiConstraint
  | SightingConstraint
  | CompoundConstraint;

export interface IsConstraint {
  type: 'is';
  category: ClueCategory;
  value: string;
}

export interface IsNotConstraint {
  type: 'is_not';
  category: ClueCategory;
  value: string;
}

export interface IfThenConstraint {
  type: 'if_then';
  ifCategory: ClueCategory;
  ifValue: string;
  thenCategory: ClueCategory;
  thenValue: string;
}

export interface IfThenNotConstraint {
  type: 'if_then_not';
  ifCategory: ClueCategory;
  ifValue: string;
  thenCategory: ClueCategory;
  thenValue: string;
}

export interface WeaponRoomLinkConstraint {
  type: 'weapon_room_link';
  weapon: Weapon;
  room: Room;
}

export interface AlibiConstraint {
  type: 'alibi';
  suspect: Suspect;
  room: Room;
  fromTime: Time;
  toTime: Time;
}

export interface SightingConstraint {
  type: 'sighting';
  suspect: Suspect;
  room: Room;
  time: Time;
}

export interface CompoundConstraint {
  type: 'compound';
  constraints: ClueConstraint[];
}

// ─── Solution ────────────────────────────────────────────────────────────────

export interface Solution {
  suspect: Suspect;
  weapon: Weapon;
  room: Room;
  time: Time;
}

// ─── CSP Solver ──────────────────────────────────────────────────────────────

export interface CSPVariable {
  name: ClueCategory;
  domain: string[];
}

export interface CSPAssignment {
  suspect?: Suspect;
  weapon?: Weapon;
  room?: Room;
  time?: Time;
}

export interface ReasoningStep {
  step: number;
  action: 'try' | 'consistent' | 'inconsistent' | 'backtrack' | 'solution' | 'prune';
  variable?: ClueCategory;
  value?: string;
  clueId?: number;
  message: string;
}

export interface SolverResult {
  solution: Solution | null;
  steps: ReasoningStep[];
  totalSteps: number;
  backtracks: number;
  success: boolean;
}

// ─── A* Pathfinding ──────────────────────────────────────────────────────────

export interface GridCell {
  x: number;
  y: number;
  walkable: boolean;
  room: Room | 'Hallway' | 'Wall' | 'Entrance';
}

export interface PathNode {
  x: number;
  y: number;
  g: number; // cost from start
  h: number; // heuristic to goal
  f: number; // g + h
  parent: PathNode | null;
}

export interface PathResult {
  path: { x: number; y: number }[];
  cost: number;
  roomsVisited: string[];
}

// ─── Suspect Profile ─────────────────────────────────────────────────────────

export interface SuspectProfile {
  name: Suspect;
  title: string;
  description: string;
  motive: string;
  connection: string;
  color: string;
  icon: string;
}

// ─── PEAS Table (Agent Framing) ──────────────────────────────────────────────

export interface PEASEntry {
  category: 'Performance' | 'Environment' | 'Actuators' | 'Sensors';
  description: string;
  details: string[];
}

// ─── API Types ───────────────────────────────────────────────────────────────

export interface SolveRequest {
  clues: Clue[];
}

export interface SolveResponse {
  result: SolverResult;
}

export interface PathRequest {
  start: { x: number; y: number };
  targets: { x: number; y: number }[];
}

export interface PathResponse {
  result: PathResult;
}
