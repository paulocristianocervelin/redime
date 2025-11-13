import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { serializeBigInt } from '@/lib/bigint-helper';

export async function GET() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        { error: 'Não autenticado' },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: BigInt(currentUser.userId) }, // Converte string para BigInt
      select: {
        id: true,
        email: true,
        name: true,
        cpf: true,
        role: true,
        active: true,
        memberProfile: {
          include: {
            departments: {
              include: {
                department: true,
              },
            },
          },
        },
        leaderOfDepartments: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({ user: serializeBigInt(user) });
  } catch (error) {
    console.error('Get current user error:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar usuário' },
      { status: 500 }
    );
  }
}
