import { NextResponse } from 'next/server';

export async function GET() {
  // Simula a busca de eventos do banco de dados
  const events = [
    {
      id: 1,
      title: 'Plantão Emergência',
      start: new Date(2023, 5, 15, 8, 0),
      end: new Date(2023, 5, 15, 20, 0),
    },
    {
      id: 2,
      title: 'Plantão UTI',
      start: new Date(2023, 5, 20, 9, 0),
      end: new Date(2023, 5, 20, 21, 0),
    },
  ];

  return NextResponse.json(events);
}

