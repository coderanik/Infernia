import type { Clue } from './types';

// ─── The 12 Blackwood Case Clues ─────────────────────────────────────────────
// Solution: Captain Sterling, Revolver, Study, 10pm

export const BLACKWOOD_CLUES: Clue[] = [
  {
    id: 1,
    type: 'is_not',
    description: 'The murder did not take place in the Library.',
    constraint: {
      type: 'is_not',
      category: 'room',
      value: 'Library',
    },
  },
  {
    id: 2,
    type: 'alibi',
    description: 'Lady Ashford was in the Ballroom from 9pm to 11pm.',
    constraint: {
      type: 'alibi',
      suspect: 'Lady Eleanor Ashford',
      room: 'Ballroom',
      fromTime: '9pm',
      toTime: '11pm',
    },
  },
  {
    id: 3,
    type: 'weapon_room_link',
    description: 'The Revolver was found in the Study.',
    constraint: {
      type: 'weapon_room_link',
      weapon: 'Revolver',
      room: 'Study',
    },
  },
  {
    id: 4,
    type: 'is_not',
    description: 'Professor Thorn is not the killer.',
    constraint: {
      type: 'is_not',
      category: 'suspect',
      value: 'Professor Alistair Thorn',
    },
  },
  {
    id: 5,
    type: 'alibi',
    description: 'Clara Whitmore was in the Kitchen from 8pm to 10pm.',
    constraint: {
      type: 'alibi',
      suspect: 'Miss Clara Whitmore',
      room: 'Kitchen',
      fromTime: '8pm',
      toTime: '10pm',
    },
  },
  {
    id: 6,
    type: 'weapon_room_link',
    description: 'The Rope was found in the Master Bedroom.',
    constraint: {
      type: 'weapon_room_link',
      weapon: 'Rope',
      room: 'Master Bedroom',
    },
  },
  {
    id: 7,
    type: 'is_not',
    description: 'The Candelabra was not the murder weapon.',
    constraint: {
      type: 'is_not',
      category: 'weapon',
      value: 'Candelabra',
    },
  },
  {
    id: 8,
    type: 'sighting',
    description: 'Captain Sterling was seen leaving the Study at 9pm.',
    constraint: {
      type: 'sighting',
      suspect: 'Captain James Sterling',
      room: 'Study',
      time: '9pm',
    },
  },
  {
    id: 9,
    type: 'compound',
    description: 'The killer used the weapon found in the crime room.',
    constraint: {
      type: 'compound',
      constraints: [
        // This is a meta-constraint: weapon must match the room it was placed in.
        // Enforced in the solver by checking WEAPON_ROOM_MAP
      ],
    },
  },
  {
    id: 10,
    type: 'compound',
    description: 'The murder did not occur at 8pm or 11pm.',
    constraint: {
      type: 'compound',
      constraints: [
        { type: 'is_not', category: 'time', value: '8pm' },
        { type: 'is_not', category: 'time', value: '11pm' },
      ],
    },
  },
  {
    id: 11,
    type: 'weapon_room_link',
    description: 'The Letter Opener was found in the Library.',
    constraint: {
      type: 'weapon_room_link',
      weapon: 'Letter Opener',
      room: 'Library',
    },
  },
  {
    id: 12,
    type: 'compound',
    description: 'No one heard a disturbance before 10pm.',
    constraint: {
      type: 'compound',
      constraints: [
        { type: 'is_not', category: 'time', value: '8pm' },
        { type: 'is_not', category: 'time', value: '9pm' },
      ],
    },
  },
];
