import { NextResponse } from 'next/server';
import { solve } from '@/lib/csp';
import { BLACKWOOD_CLUES } from '@/lib/clues';
import type { SolveRequest } from '@/lib/types';

export async function POST(request: Request) {
  try {
    const body: SolveRequest = await request.json();
    const clues = body.clues && body.clues.length > 0 ? body.clues : BLACKWOOD_CLUES;
    const result = solve(clues);
    return NextResponse.json({ result });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to solve case', details: String(error) },
      { status: 500 }
    );
  }
}
