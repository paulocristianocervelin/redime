import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser, isAdmin } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { serializeBigInt } from '@/lib/bigint-helper';

// GET - Buscar departamento por ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        { error: 'Não autenticado' },
        { status: 401 }
      );
    }

    const department = await prisma.department.findUnique({
      where: { id: BigInt(params.id) },
      include: {
        leader: {
          select: {
            id: true,
            name: true,
            email: true,
            cpf: true,
          },
        },
        members: {
          include: {
            memberProfile: {
              include: {
                user: {
                  select: {
                    id: true,
                    name: true,
                    email: true,
                    cpf: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!department) {
      return NextResponse.json(
        { error: 'Departamento não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({ department: serializeBigInt(department) });
  } catch (error) {
    console.error('Get department error:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar departamento' },
      { status: 500 }
    );
  }
}

// PUT - Atualizar departamento (apenas ADMIN)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
        { error: 'Sem permissão para atualizar departamentos' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { name, description, category, leaderId, imageUrl, active } = body;

    const updateData: any = {};

    if (name !== undefined) {
      updateData.name = name;
      updateData.slug = name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }
    if (description !== undefined) updateData.description = description;
    if (category !== undefined) updateData.category = category;
    if (leaderId !== undefined) updateData.leaderId = leaderId ? BigInt(leaderId) : null;
    if (imageUrl !== undefined) updateData.imageUrl = imageUrl;
    if (active !== undefined) updateData.active = active;

    const department = await prisma.department.update({
      where: { id: BigInt(params.id) },
      data: updateData,
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
      message: 'Departamento atualizado com sucesso',
      department: serializeBigInt(department),
    });
  } catch (error) {
    console.error('Update department error:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar departamento' },
      { status: 500 }
    );
  }
}

// DELETE - Deletar departamento (apenas ADMIN)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
        { error: 'Sem permissão para deletar departamentos' },
        { status: 403 }
      );
    }

    await prisma.department.delete({
      where: { id: BigInt(params.id) },
    });

    return NextResponse.json({
      message: 'Departamento deletado com sucesso',
    });
  } catch (error) {
    console.error('Delete department error:', error);
    return NextResponse.json(
      { error: 'Erro ao deletar departamento' },
      { status: 500 }
    );
  }
}
