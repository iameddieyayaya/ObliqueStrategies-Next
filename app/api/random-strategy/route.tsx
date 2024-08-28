import { NextResponse } from 'next/server';
import { edition1 } from '@/strategies/edition-1';
import { edition2 } from '@/strategies/edition-2';
import { edition3 } from '@/strategies/edition-3';
import { edition4 } from '@/strategies/edition-4';
import { edition5 } from '@/strategies/edition-5';
import { edition6 } from '@/strategies/edition-6';

const editions = [
  edition1,
  edition2,
  edition3,
  edition4,
  edition5,
  edition6,
];

export async function GET() {
  const randomEditionIndex = Math.floor(Math.random() * editions.length);
  const randomEdition = editions[randomEditionIndex];

  const randomStrategyIndex = Math.floor(Math.random() * randomEdition.strategies.length);
  const randomStrategy = randomEdition.strategies[randomStrategyIndex];

  return NextResponse.json({ strategy: randomStrategy });
}
