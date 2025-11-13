import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser, isLeader, isAdmin, hashPassword } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { serializeBigInt } from '@/lib/bigint-helper';
import { UserRole } from '@prisma/client';

// GET - Buscar membro por ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        { error: 'Não autenticado' },
        { status: 401 }
      );
    }

    if (!isLeader(currentUser.role)) {
      return NextResponse.json(
        { error: 'Sem permissão para visualizar membros' },
        { status: 403 }
      );
    }

    const { id } = await params;
    const member = await prisma.user.findUnique({
      where: { id: BigInt(id) },
      select: {
        id: true,
        name: true,
        email: true,
        cpf: true,
        role: true,
        active: true,
        createdAt: true,
        updatedAt: true,
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

    if (!member) {
      return NextResponse.json(
        { error: 'Membro não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({ member: serializeBigInt(member) });
  } catch (error) {
    console.error('Get member error:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar membro' },
      { status: 500 }
    );
  }
}

// PUT - Atualizar membro (ADMIN e LEADER)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        { error: 'Não autenticado' },
        { status: 401 }
      );
    }

    if (!isLeader(currentUser.role)) {
      return NextResponse.json(
        { error: 'Sem permissão para atualizar membros' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const {
      name,
      email,
      password,
      role,
      active,
      phone,
      address,
      number,
      complement,
      city,
      state,
      zipCode,
      departmentIds,
      birthDate,
    } = body;

    const { id } = await params;
    const memberId = BigInt(id);

    // Verifica se o membro existe
    const existingMember = await prisma.user.findUnique({
      where: { id: memberId },
      include: { memberProfile: true },
    });

    if (!existingMember) {
      return NextResponse.json(
        { error: 'Membro não encontrado' },
        { status: 404 }
      );
    }

    // Apenas ADMIN pode alterar role
    if (role !== undefined && !isAdmin(currentUser.role)) {
      return NextResponse.json(
        { error: 'Apenas administradores podem alterar o papel do membro' },
        { status: 403 }
      );
    }

    // Preparar dados de atualização do usuário
    const userData: {
      name?: string;
      email?: string;
      password?: string;
      role?: UserRole;
      active?: boolean;
    } = {};
    if (name !== undefined) userData.name = name;
    if (email !== undefined) userData.email = email;
    if (password) userData.password = await hashPassword(password);
    if (role !== undefined) userData.role = role as UserRole;
    if (active !== undefined) userData.active = active;

    // Preparar dados de atualização do perfil
    const profileData: {
      phone?: string;
      address?: string;
      number?: string;
      complement?: string;
      city?: string;
      state?: string;
      zipCode?: string;
      birthDate?: Date | null;
    } = {};
    if (phone !== undefined) profileData.phone = phone;
    if (address !== undefined) profileData.address = address;
    if (number !== undefined) profileData.number = number;
    if (complement !== undefined) profileData.complement = complement;
    if (city !== undefined) profileData.city = city;
    if (state !== undefined) profileData.state = state;
    if (zipCode !== undefined) profileData.zipCode = zipCode;
    if (birthDate !== undefined) profileData.birthDate = birthDate ? new Date(birthDate) : null;

    // Atualizar usuário e perfil
    const member = await prisma.user.update({
      where: { id: memberId },
      data: {
        ...userData,
        memberProfile: {
          update: profileData,
        },
      },
      include: {
        memberProfile: {
          include: {
            departments: {
              include: {
                department: true,
              },
            },
          },
        },
      },
    });

    // Atualizar departamentos se fornecidos
    if (departmentIds !== undefined && Array.isArray(departmentIds) && existingMember.memberProfile) {
      // Remover todos os departamentos atuais
      await prisma.memberDepartment.deleteMany({
        where: { memberProfileId: existingMember.memberProfile.id },
      });

      // Adicionar novos departamentos
      if (departmentIds.length > 0) {
        await prisma.memberDepartment.createMany({
          data: departmentIds.map((deptId: string) => ({
            memberProfileId: existingMember.memberProfile!.id,
            departmentId: BigInt(deptId),
          })),
        });
      }
    }

    return NextResponse.json({
      message: 'Membro atualizado com sucesso',
      member: serializeBigInt(member),
    });
  } catch (error) {
    console.error('Update member error:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar membro' },
      { status: 500 }
    );
  }
}

// DELETE - Deletar membro (apenas ADMIN)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
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
        { error: 'Apenas administradores podem deletar membros' },
        { status: 403 }
      );
    }

    const { id } = await params;
    await prisma.user.delete({
      where: { id: BigInt(id) },
    });

    return NextResponse.json({
      message: 'Membro deletado com sucesso',
    });
  } catch (error) {
    console.error('Delete member error:', error);
    return NextResponse.json(
      { error: 'Erro ao deletar membro' },
      { status: 500 }
    );
  }
}
