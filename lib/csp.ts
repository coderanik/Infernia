import type {
  Clue,
  ClueConstraint,
  CSPAssignment,
  ClueCategory,
  ReasoningStep,
  Solution,
  SolverResult,
  Suspect,
  Weapon,
  Room,
  Time,
} from './types';
import { SUSPECTS, WEAPONS, ROOMS, TIMES, WEAPON_ROOM_MAP, timeInRange } from './constants';

// ─── CSP Solver with Backtracking + Forward Checking ─────────────────────────

export function solve(clues: Clue[]): SolverResult {
  const steps: ReasoningStep[] = [];
  let stepCount = 0;
  let backtracks = 0;

  // Variable ordering: time -> room -> weapon -> suspect (most constrained first)
  const variableOrder: ClueCategory[] = ['time', 'room', 'weapon', 'suspect'];

  // Initial domains
  const domains: Record<ClueCategory, string[]> = {
    suspect: [...SUSPECTS],
    weapon: [...WEAPONS],
    room: [...ROOMS],
    time: [...TIMES],
  };

  // ─── Pre-prune domains with unary constraints ──────────────────────────
  for (const clue of clues) {
    pruneDomains(domains, clue, steps, stepCount);
  }

  function log(step: Omit<ReasoningStep, 'step'>): void {
    stepCount++;
    steps.push({ step: stepCount, ...step });
  }

  // ─── Check if an assignment is consistent with all clues ───────────────
  function isConsistent(assignment: CSPAssignment, clues: Clue[]): { consistent: boolean; violatedClue?: number } {
    for (const clue of clues) {
      if (!checkConstraint(assignment, clue.constraint)) {
        return { consistent: false, violatedClue: clue.id };
      }
    }
    return { consistent: true };
  }

  // ─── Check a single constraint ─────────────────────────────────────────
  function checkConstraint(assignment: CSPAssignment, constraint: ClueConstraint): boolean {
    switch (constraint.type) {
      case 'is': {
        const val = assignment[constraint.category];
        if (val !== undefined && val !== constraint.value) return false;
        return true;
      }
      case 'is_not': {
        const val = assignment[constraint.category];
        if (val !== undefined && val === constraint.value) return false;
        return true;
      }
      case 'weapon_room_link': {
        // If both weapon and room are assigned, the weapon must match its room
        if (assignment.weapon && assignment.room) {
          // Clue 9 enforcement: weapon-room must be consistent
          if (assignment.weapon === constraint.weapon && assignment.room !== constraint.room) {
            // If the murder weapon IS this weapon, the room must be this room
          }
          if (assignment.room === constraint.room && assignment.weapon !== constraint.weapon) {
            // If the murder room IS this room, the weapon must be this weapon
          }
        }
        return true; // weapon-room links are informational; clue 9 enforces matching
      }
      case 'alibi': {
        // If the assignment matches this suspect and the time falls within alibied range,
        // the suspect cannot be the killer (unless crime room = alibi room)
        if (assignment.suspect === constraint.suspect && assignment.time) {
          const t = assignment.time as Time;
          if (timeInRange(t, constraint.fromTime, constraint.toTime)) {
            // Suspect was in alibi room at this time; can't be killer unless room matches alibi room
            if (assignment.room && assignment.room !== constraint.room) {
              return false;
            }
            if (!assignment.room) {
              // Room not yet assigned; suspect could still be killer if room = alibi room
              return true;
            }
          }
        }
        return true;
      }
      case 'sighting': {
        // Places suspect near a room at a time — informational, doesn't constrain directly
        return true;
      }
      case 'compound': {
        for (const sub of constraint.constraints) {
          if (!checkConstraint(assignment, sub)) return false;
        }
        return true;
      }
      case 'if_then': {
        const ifVal = assignment[constraint.ifCategory];
        if (ifVal === constraint.ifValue) {
          const thenVal = assignment[constraint.thenCategory];
          if (thenVal !== undefined && thenVal !== constraint.thenValue) return false;
        }
        return true;
      }
      case 'if_then_not': {
        const ifVal = assignment[constraint.ifCategory];
        if (ifVal === constraint.ifValue) {
          const thenVal = assignment[constraint.thenCategory];
          if (thenVal !== undefined && thenVal === constraint.thenValue) return false;
        }
        return true;
      }
      default:
        return true;
    }
  }

  // ─── Enforce Clue 9: weapon must match the room it was found in ────────
  function enforceWeaponRoomMatch(assignment: CSPAssignment): boolean {
    if (assignment.weapon && assignment.room) {
      const expectedRoom = WEAPON_ROOM_MAP[assignment.weapon as Weapon];
      if (expectedRoom && expectedRoom !== assignment.room) {
        return false;
      }
    }
    return true;
  }

  // ─── Backtracking Search ───────────────────────────────────────────────
  function backtrack(assignment: CSPAssignment, varIndex: number): CSPAssignment | null {
    if (varIndex === variableOrder.length) {
      // All variables assigned — verify complete solution
      const result = isConsistent(assignment, clues);
      if (result.consistent && enforceWeaponRoomMatch(assignment)) {
        log({
          action: 'solution',
          message: `✓ Solution found: ${assignment.suspect}, ${assignment.weapon}, ${assignment.room}, ${assignment.time}`,
        });
        return { ...assignment };
      }
      return null;
    }

    const variable = variableOrder[varIndex];
    const domain = domains[variable];

    for (const value of domain) {
      log({
        action: 'try',
        variable,
        value,
        message: `Trying ${variable} = ${value}`,
      });

      const newAssignment = { ...assignment, [variable]: value };

      // Check weapon-room constraint (Clue 9)
      if (!enforceWeaponRoomMatch(newAssignment)) {
        log({
          action: 'inconsistent',
          variable,
          value,
          clueId: 9,
          message: `✗ ${variable} = ${value} inconsistent with Clue #9 (weapon must match crime room). Backtracking.`,
        });
        backtracks++;
        continue;
      }

      // Check consistency with all clues
      const result = isConsistent(newAssignment, clues);
      if (result.consistent) {
        log({
          action: 'consistent',
          variable,
          value,
          message: `✓ ${variable} = ${value} is consistent with all clues so far.`,
        });

        const solution = backtrack(newAssignment, varIndex + 1);
        if (solution) return solution;
      } else {
        log({
          action: 'inconsistent',
          variable,
          value,
          clueId: result.violatedClue,
          message: `✗ ${variable} = ${value} violates Clue #${result.violatedClue}. Backtracking.`,
        });
        backtracks++;
      }
    }

    log({
      action: 'backtrack',
      variable,
      message: `↩ All values for ${variable} exhausted. Backtracking to previous variable.`,
    });
    backtracks++;
    return null;
  }

  const solution = backtrack({}, 0);

  return {
    solution: solution as Solution | null,
    steps,
    totalSteps: stepCount,
    backtracks,
    success: solution !== null,
  };
}

// ─── Domain Pruning (unary constraints) ──────────────────────────────────────

function pruneDomains(
  domains: Record<ClueCategory, string[]>,
  clue: Clue,
  steps: ReasoningStep[],
  stepCount: number
): void {
  const c = clue.constraint;

  if (c.type === 'is_not') {
    const before = domains[c.category].length;
    domains[c.category] = domains[c.category].filter((v) => v !== c.value);
    if (domains[c.category].length < before) {
      steps.push({
        step: ++stepCount,
        action: 'prune',
        variable: c.category,
        value: c.value,
        clueId: clue.id,
        message: `Pruned ${c.value} from ${c.category} domain (Clue #${clue.id}: "${clue.description}")`,
      });
    }
  }

  if (c.type === 'compound') {
    for (const sub of c.constraints) {
      if (sub.type === 'is_not') {
        const before = domains[sub.category].length;
        domains[sub.category] = domains[sub.category].filter((v) => v !== sub.value);
        if (domains[sub.category].length < before) {
          steps.push({
            step: ++stepCount,
            action: 'prune',
            variable: sub.category,
            value: sub.value,
            clueId: clue.id,
            message: `Pruned ${sub.value} from ${sub.category} domain (Clue #${clue.id}: "${clue.description}")`,
          });
        }
      }
    }
  }
}
