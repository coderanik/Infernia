import { NextResponse } from 'next/server';
import { findMultiStopPath } from '@/lib/astar';
import type { PathRequest } from '@/lib/types';

export async function POST(request: Request) {
  try {
    const body: PathRequest = await request.json();
    const result = findMultiStopPath(body.start, body.targets);
    return NextResponse.json({ result });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to find path', details: String(error) },
      { status: 500 }
    );
  }
}
