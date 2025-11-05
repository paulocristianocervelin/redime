import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser, isAdmin } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { serializeBigInt } from '@/lib/bigint-helper';

// GET - Listar todos os departamentos
export async function GET() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        { error: 'Não autenticado' },
        { status: 401 }
      );
    }

    const departments = await prisma.department.findMany({
      include: {
        leader: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        _count: {
          select: {
            members: true,
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    });

    return NextResponse.json({ departments: serializeBigInt(departments) });
  } catch (error) {
    console.error('Get departments error:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar departamentos' },
      { status: 500 }
    );
  }
}

// POST - Criar novo departamento (apenas ADMIN)
export async function POST(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        { error: 'Não autenticado' },
        { status: 401 }
      );
    }

    if (!isAdmin(currentUser.role)) {
      return NextResponse.json(
        { error: 'Sem permissão para criar departamentos' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { name, description, category, leaderId, imageUrl } = body;

    if (!name || !description || !category) {
      return NextResponse.json(
        { error: 'Nome, descrição e categoria são obrigatórios' },
        { status: 400 }
      );
    }

    // Gera slug a partir do nome
    const slug = name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const department = await prisma.department.create({
      data: {
        name,
        slug,
        description,
        category,
        leaderId: leaderId ? BigInt(leaderId) : null,
        imageUrl,
      },
      include: {
        leader: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json({
      message: 'Departamento criado com sucesso',
      department: serializeBigInt(department),
    });
  } catch (error) {
    console.error('Create department error:', error);
    return NextResponse.json(
      { error: 'Erro ao criar departamento' },
      { status: 500 }
    );
  }
}
