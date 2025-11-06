import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { AdminSidebar } from '@/components/admin/admin-sidebar';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect('/auth/login');
  }

  // Busca dados completos do usuário
  const user = await prisma.user.findUnique({
    where: { id: BigInt(currentUser.userId) },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });

  if (!user) {
    redirect('/auth/login');
  }

  // Serializa para passar como prop
  const userForSidebar = {
    name: user.name,
    email: user.email,
    role: user.role,
  };

  return (
    <div className="flex h-screen gradient-bg-blue-soft">
      <AdminSidebar user={userForSidebar} />
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 pt-20 lg:pt-8">
          {children}
        </div>
      </main>
    </div>
  );
}
