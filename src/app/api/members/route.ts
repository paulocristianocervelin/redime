import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser, isLeader, hashPassword } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { serializeBigInt } from '@/lib/bigint-helper';

// GET - Listar todos os membros
export async function GET(request: NextRequest) {
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

    const { searchParams } = new URL(request.url);
    const departmentId = searchParams.get('departmentId');

    const where: {
      active: boolean;
      memberProfile?: {
        departments: {
          some: {
            departmentId: bigint;
          };
        };
      };
    } = { active: true };

    if (departmentId) {
      where.memberProfile = {
        departments: {
          some: {
            departmentId: BigInt(departmentId),
          },
        },
      };
    }

    const members = await prisma.user.findMany({
      where,
      select: {
        id: true,
        name: true,
        email: true,
        cpf: true,
        role: true,
        active: true,
        createdAt: true,
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
      orderBy: {
        name: 'asc',
      },
    });

    return NextResponse.json({ members: serializeBigInt(members) });
  } catch (error) {
    console.error('Get members error:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar membros' },
      { status: 500 }
    );
  }
}

// POST - Criar novo membro (ADMIN e LEADER)
export async function POST(request: NextRequest) {
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
        { error: 'Sem permissão para criar membros' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const {
      name,
      cpf,
      email,
      password,
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

    // Validações obrigatórias
    if (!name || !cpf || !address) {
      return NextResponse.json(
        { error: 'Nome, CPF e endereço são obrigatórios' },
        { status: 400 }
      );
    }

    // Verifica se CPF já existe
    const existingUser = await prisma.user.findUnique({
      where: { cpf },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'CPF já cadastrado' },
        { status: 400 }
      );
    }

    // Verifica se email já existe (se fornecido)
    if (email) {
      const existingEmail = await prisma.user.findUnique({
        where: { email },
      });

      if (existingEmail) {
        return NextResponse.json(
          { error: 'Email já cadastrado' },
          { status: 400 }
        );
      }
    }

    // Hash da senha se fornecida
    const hashedPassword = password ? await hashPassword(password) : null;

    // Criar usuário e perfil
    const member = await prisma.user.create({
      data: {
        name,
        cpf,
        email: email || null,
        password: hashedPassword,
        role: 'MEMBER',
        memberProfile: {
          create: {
            phone: phone || null,
            address,
            number: number || null,
            complement: complement || null,
            city: city || null,
            state: state || null,
            zipCode: zipCode || null,
            birthDate: birthDate ? new Date(birthDate) : null,
            departments: {
              create: departmentIds && Array.isArray(departmentIds)
                ? departmentIds.map((deptId: string) => ({
                    department: {
                      connect: { id: BigInt(deptId) },
                    },
                  }))
                : [],
            },
          },
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

    return NextResponse.json({
      message: 'Membro criado com sucesso',
      member: serializeBigInt(member),
    });
  } catch (error) {
    console.error('Create member error:', error);
    return NextResponse.json(
      { error: 'Erro ao criar membro' },
      { status: 500 }
    );
  }
}
