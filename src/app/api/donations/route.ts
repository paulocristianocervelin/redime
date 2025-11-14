import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    // Por enquanto, vamos aceitar doações sem autenticação obrigatória
    // mas se houver sessão, vamos associar ao usuário
    // const session = await getServerSession();

    const body = await request.json();
    const { amount, type, frequency, message, isAnonymous } = body;

    // Validação básica
    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Valor de doação inválido' },
        { status: 400 }
      );
    }

    if (!type || !['GENERAL', 'MISSIONS', 'BUILDING', 'SPECIAL_PROJECT'].includes(type)) {
      return NextResponse.json(
        { error: 'Tipo de doação inválido' },
        { status: 400 }
      );
    }

    if (!frequency || !['ONE_TIME', 'MONTHLY', 'QUARTERLY', 'YEARLY'].includes(frequency)) {
      return NextResponse.json(
        { error: 'Frequência de doação inválida' },
        { status: 400 }
      );
    }

    // Temporariamente vamos criar um usuário de teste para as doações
    // Em produção, você deve associar ao usuário autenticado
    // ou criar um fluxo diferente para doações de visitantes

    // Verificar se existe um usuário de teste
    let testUser = await prisma.user.findFirst({
      where: {
        email: 'doador@test.com'
      }
    });

    // Se não existir, criar um usuário de teste
    if (!testUser) {
      testUser = await prisma.user.create({
        data: {
          email: 'doador@test.com',
          name: 'Doador Anônimo',
          cpf: '00000000000',
          password: 'none',
          role: 'MEMBER',
        }
      });
    }

    // Criar a doação
    const donation = await prisma.donation.create({
      data: {
        userId: testUser.id,
        amount: parseFloat(amount),
        currency: 'BRL',
        type,
        frequency,
        status: 'PENDING', // Status inicial como PENDING
        message: message || null,
        isAnonymous: isAnonymous || false,
        paymentMethod: null, // Será preenchido quando o pagamento for processado
        transactionId: null, // Será preenchido quando o pagamento for processado
      },
    });

    return NextResponse.json({
      success: true,
      donation: {
        id: donation.id,
        amount: donation.amount,
        type: donation.type,
        frequency: donation.frequency,
      },
    });

  } catch (error) {
    console.error('Error creating donation:', error);
    return NextResponse.json(
      { error: 'Erro ao processar doação' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Buscar todas as doações
    // Em produção, você deve filtrar por usuário autenticado
    const donations = await prisma.donation.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 50, // Limitar a 50 resultados
    });

    return NextResponse.json({
      success: true,
      donations,
    });

  } catch (error) {
    console.error('Error fetching donations:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar doações' },
      { status: 500 }
    );
  }
}
