import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Building2, UserPlus, Activity } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default async function DashboardPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return null;
  }

  const isAdmin = currentUser.role === 'ADMIN';

  // Estatísticas
  const stats = await Promise.all([
    prisma.user.count({ where: { active: true } }),
    prisma.department.count({ where: { active: true } }),
    prisma.user.count({
      where: {
        active: true,
        memberProfile: {
          departmentId: { not: null },
        },
      },
    }),
    prisma.user.count({
      where: {
        active: true,
        role: 'LEADER',
      },
    }),
  ]);

  const [totalMembers, totalDepartments, membersInDepartments, totalLeaders] = stats;

  // Departamentos recentes
  const recentDepartments = await prisma.department.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: {
      leader: {
        select: {
          name: true,
        },
      },
      _count: {
        select: {
          members: true,
        },
      },
    },
  });

  // Membros recentes
  const recentMembers = await prisma.user.findMany({
    take: 5,
    where: { active: true },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      memberProfile: {
        select: {
          department: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Bem-vindo ao painel administrativo, {currentUser.name}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Membros</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMembers}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {membersInDepartments} em departamentos
            </p>
          </CardContent>
        </Card>

        {isAdmin && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Departamentos</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalDepartments}</div>
              <p className="text-xs text-muted-foreground mt-1">Ativos no sistema</p>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Líderes</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLeaders}</div>
            <p className="text-xs text-muted-foreground mt-1">Líderes ativos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Vinculação</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalMembers > 0
                ? Math.round((membersInDepartments / totalMembers) * 100)
                : 0}
              %
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Membros em departamentos
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Sections */}
      <div className="grid gap-8 md:grid-cols-2">
        {/* Recent Departments */}
        {isAdmin && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Departamentos Recentes</CardTitle>
                <Link href="/admin/departments">
                  <Button variant="ghost" size="sm">
                    Ver todos
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentDepartments.map((dept) => (
                  <div
                    key={dept.id.toString()}
                    className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{dept.name}</p>
                      <p className="text-sm text-gray-500">
                        {dept.leader?.name || 'Sem líder'}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{dept._count.members}</p>
                      <p className="text-xs text-gray-500">membros</p>
                    </div>
                  </div>
                ))}
                {recentDepartments.length === 0 && (
                  <p className="text-center text-gray-500 py-4">
                    Nenhum departamento cadastrado
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recent Members */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Membros Recentes</CardTitle>
              <Link href="/admin/members">
                <Button variant="ghost" size="sm">
                  Ver todos
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentMembers.map((member) => (
                <div
                  key={member.id.toString()}
                  className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <div>
                    <p className="font-medium text-gray-900">{member.name}</p>
                    <p className="text-sm text-gray-500">
                      {member.memberProfile?.department?.name || 'Sem departamento'}
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        member.role === 'ADMIN'
                          ? 'bg-red-100 text-red-700'
                          : member.role === 'LEADER'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {member.role}
                    </span>
                  </div>
                </div>
              ))}
              {recentMembers.length === 0 && (
                <p className="text-center text-gray-500 py-4">Nenhum membro cadastrado</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
