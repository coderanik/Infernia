import type { Clue } from './types';

// ─── The 12 Complex Blackwood Case Clues ─────────────────────────────────────
// Solution: Miss Clara Whitmore, Letter Opener, Library, 11pm
// Designed to maximize CSP backtracking by using deep conditional logic.

export const BLACKWOOD_CLUES: Clue[] = [
  {
    id: 1,
    type: 'compound',
    description: 'The medical examiner determined the murder did NOT occur at 8pm or 10pm.',
    constraint: {
      type: 'compound',
      constraints: [
        { type: 'is_not', category: 'time', value: '8pm' },
        { type: 'is_not', category: 'time', value: '10pm' },
      ],
    },
  },
  {
    id: 2,
    type: 'if_then',
    description: 'If the victim was killed in the Study, the murder must have happened at 9pm.',
    constraint: {
      type: 'if_then',
      ifCategory: 'room',
      ifValue: 'Study',
      thenCategory: 'time',
      thenValue: '9pm',
    },
  },
  {
    id: 3,
    type: 'alibi',
    description: 'Captain Sterling was heavily intoxicated and passed out in the Conservatory from 10pm to 11pm.',
    constraint: {
      type: 'alibi',
      suspect: 'Captain James Sterling',
      room: 'Conservatory',
      fromTime: '10pm',
      toTime: '11pm',
    },
  },
  {
    id: 4,
    type: 'if_then',
    description: 'If the murder weapon was the Candelabra, then the killer must have been Lady Ashford.',
    constraint: {
      type: 'if_then',
      ifCategory: 'weapon',
      ifValue: 'Candelabra',
      thenCategory: 'suspect',
      thenValue: 'Lady Eleanor Ashford',
    },
  },
  {
    id: 5,
    type: 'compound',
    description: 'Lady Ashford avoids the Library due to painful memories, and she certainly would not soil her hands with the coarse Rope.',
    constraint: {
      type: 'compound',
      constraints: [
        {
          type: 'if_then_not',
          ifCategory: 'suspect',
          ifValue: 'Lady Eleanor Ashford',
          thenCategory: 'room',
          thenValue: 'Library',
        },
        {
          type: 'if_then_not',
          ifCategory: 'suspect',
          ifValue: 'Lady Eleanor Ashford',
          thenCategory: 'weapon',
          thenValue: 'Rope',
        },
      ],
    },
  },
  {
    id: 6,
    type: 'if_then',
    description: 'Forensics indicate that if the murder occurred at 9pm, the victim was strangled with the Rope.',
    constraint: {
      type: 'if_then',
      ifCategory: 'time',
      ifValue: '9pm',
      thenCategory: 'weapon',
      thenValue: 'Rope',
    },
  },
  {
    id: 7,
    type: 'compound',
    description: 'Professor Thorn\'s severe arthritis prevents him from gripping the Letter Opener or exerting force with the Rope.',
    constraint: {
      type: 'compound',
      constraints: [
        {
          type: 'if_then_not',
          ifCategory: 'suspect',
          ifValue: 'Professor Alistair Thorn',
          thenCategory: 'weapon',
          thenValue: 'Letter Opener',
        },
        {
          type: 'if_then_not',
          ifCategory: 'suspect',
          ifValue: 'Professor Alistair Thorn',
          thenCategory: 'weapon',
          thenValue: 'Rope',
        },
      ],
    },
  },
  {
    id: 8,
    type: 'if_then',
    description: 'The Revolver is incredibly loud; if it was fired, it had to be at 9pm when the thunderstorm masked the noise.',
    constraint: {
      type: 'if_then',
      ifCategory: 'weapon',
      ifValue: 'Revolver',
      thenCategory: 'time',
      thenValue: '9pm',
    },
  },
  {
    id: 9,
    type: 'compound',
    description: 'The killer struck using the weapon uniquely displayed in the very room where the body was found. (Meta-Clue)',
    constraint: {
      type: 'compound',
      constraints: [],
    },
  },
  {
    id: 10,
    type: 'if_then_not',
    description: 'If Miss Clara Whitmore is the culprit, she absolutely did not commit the crime in the Master Bedroom.',
    constraint: {
      type: 'if_then_not',
      ifCategory: 'suspect',
      ifValue: 'Miss Clara Whitmore',
      thenCategory: 'room',
      thenValue: 'Master Bedroom',
    },
  },
  {
    id: 11,
    type: 'if_then',
    description: 'If Captain Sterling committed the murder, he waited until 11pm to make his move.',
    constraint: {
      type: 'if_then',
      ifCategory: 'suspect',
      ifValue: 'Captain James Sterling',
      thenCategory: 'time',
      thenValue: '11pm',
    },
  },
  {
    id: 12,
    type: 'if_then',
    description: 'If Lady Ashford is the killer, she must have struck early during the chaos at 9pm.',
    constraint: {
      type: 'if_then',
      ifCategory: 'suspect',
      ifValue: 'Lady Eleanor Ashford',
      thenCategory: 'time',
      thenValue: '9pm',
    },
  },
];
