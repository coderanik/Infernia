import type { Suspect, Weapon, Room, Time, SuspectProfile, PEASEntry } from './types';

// ─── Domain Constants ────────────────────────────────────────────────────────

export const SUSPECTS: Suspect[] = [
  'Lady Eleanor Ashford',
  'Professor Alistair Thorn',
  'Miss Clara Whitmore',
  'Captain James Sterling',
];

export const WEAPONS: Weapon[] = [
  'Revolver',
  'Letter Opener',
  'Candelabra',
  'Rope',
];

export const ROOMS: Room[] = [
  'Study',
  'Library',
  'Ballroom',
  'Kitchen',
  'Conservatory',
  'Master Bedroom',
];

export const TIMES: Time[] = ['8pm', '9pm', '10pm', '11pm'];

// ─── Weapon-Room Placement Map ───────────────────────────────────────────────

export const WEAPON_ROOM_MAP: Record<Weapon, Room> = {
  'Revolver': 'Study',
  'Letter Opener': 'Library',
  'Candelabra': 'Ballroom',
  'Rope': 'Master Bedroom',
};

// ─── Suspect Profiles ────────────────────────────────────────────────────────

export const SUSPECT_PROFILES: SuspectProfile[] = [
  {
    name: 'Lady Eleanor Ashford',
    title: 'The Vengeful Widow',
    description:
      'Widow of Sir Reginald Ashford, Blackwood\'s expedition partner, who died under suspicious circumstances during the dig. She believes Blackwood murdered her husband to steal the Serpent\'s Coil.',
    motive: 'Vengeance and reclamation of the Serpent\'s Coil',
    connection: 'Came to dinner demanding its return.',
    color: '#8B1A4A',
    icon: '👑',
  },
  {
    name: 'Professor Alistair Thorn',
    title: 'The Disgraced Scholar',
    description:
      'Once a respected Egyptologist who co-authored the paper on the Coil\'s discovery. Blackwood removed his name and published alone, destroying Thorn\'s academic career.',
    motive: 'Ruined reputation and obsession with the artifact',
    connection: 'Was recently seen purchasing rare poisons in London.',
    color: '#2D5016',
    icon: '📚',
  },
  {
    name: 'Miss Clara Whitmore',
    title: 'The Patient Governess',
    description:
      'The manor\'s governess, quiet and watchful. Her family once owned the land Blackwood Manor sits on — land acquired through forged documents.',
    motive: 'Stolen inheritance and proximity to revenge',
    connection: 'Has worked in the house for two years. Waiting.',
    color: '#4A3B7A',
    icon: '🕯️',
  },
  {
    name: 'Captain James Sterling',
    title: 'The Desperate Officer',
    description:
      'Retired cavalry officer, decorated but broken. Owes Blackwood 12,000 pounds from gambling debts. Blackwood threatened to expose his debts publicly.',
    motive: 'Financial desperation and self-preservation',
    connection: 'Exposure would end his engagement to a wealthy heiress.',
    color: '#8B4513',
    icon: '⚔️',
  },
];

// ─── PEAS Table ──────────────────────────────────────────────────────────────

export const PEAS_TABLE: PEASEntry[] = [
  {
    category: 'Performance',
    description: 'How the agent\'s success is measured',
    details: [
      'Correctly identifies the killer, weapon, room, and time',
      'Minimizes backtracking steps during constraint solving',
      'Finds optimal pathways through the mansion',
      'Provides clear reasoning trace for each deduction',
    ],
  },
  {
    category: 'Environment',
    description: 'The world the agent operates in',
    details: [
      'Blackwood Manor - 6 rooms with interconnected hallways',
      'Victorian-era murder mystery setting',
      '4 suspects, 4 weapons, 6 rooms, 4 time slots',
      'Partially observable (clues reveal limited information)',
      'Deterministic (clues have fixed logical outcomes)',
      'Static (environment doesn\'t change during solving)',
    ],
  },
  {
    category: 'Actuators',
    description: 'How the agent acts on the environment',
    details: [
      'CSP solver: assigns and revises variable-value pairs',
      'A* pathfinder: plans routes through mansion grid',
      'Reasoning logger: records deduction steps',
      'Solution announcer: presents final verdict',
    ],
  },
  {
    category: 'Sensors',
    description: 'How the agent perceives the environment',
    details: [
      'Clue parser: interprets natural-language witness statements',
      'Constraint extractor: converts clues to formal constraints',
      'Consistency checker: validates partial assignments',
      'Grid reader: perceives room layout and obstacles',
    ],
  },
];

// ─── Time Helpers ────────────────────────────────────────────────────────────

export const TIME_ORDER: Record<Time, number> = {
  '8pm': 0,
  '9pm': 1,
  '10pm': 2,
  '11pm': 3,
};

export function timeInRange(time: Time, from: Time, to: Time): boolean {
  return TIME_ORDER[time] >= TIME_ORDER[from] && TIME_ORDER[time] <= TIME_ORDER[to];
}
