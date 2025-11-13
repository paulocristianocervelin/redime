import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Health check endpoint para monitoramento
export async function GET() {
  try {
    // Testar conexão com banco de dados
    await prisma.$queryRaw`SELECT 1`;

    return NextResponse.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      database: 'connected',
      service: 'Missão Redime Chapecó',
    });
  } catch (error) {
    console.error('Health check failed:', error);

    return NextResponse.json(
      {
        status: 'error',
        timestamp: new Date().toISOString(),
        database: 'disconnected',
        service: 'Missão Redime Chapecó',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 503 }
    );
  }
}
