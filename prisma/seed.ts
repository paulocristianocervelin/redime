import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Hash da senha
  const hashedPassword = await bcrypt.hash('@123qwe', 10);

  // Criar usuário admin
  const admin = await prisma.user.upsert({
    where: { email: 'teste@teste.com.br' },
    update: {},
    create: {
      email: 'teste@teste.com.br',
      name: 'Administrador',
      cpf: '00000000000',
      password: hashedPassword,
      role: 'ADMIN',
      active: true,
      memberProfile: {
        create: {
          address: 'Endereço padrão',
          phone: '(49) 99999-9999',
          city: 'Chapecó',
          state: 'SC',
        },
      },
    },
  });

  console.log('✅ Admin user created:', {
    email: admin.email,
    name: admin.name,
    role: admin.role,
  });

  console.log('\n📧 Login credentials:');
  console.log('Email: teste@teste.com.br');
  console.log('Password: @123qwe');
  console.log('\n🚀 You can now login at /auth/login');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
