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
    prisma.memberDepartment.findMany({
      distinct: ['memberProfileId'],
      select: { memberProfileId: true },
    }),
    prisma.user.count({
      where: {
        active: true,
        role: 'LEADER',
      },
    }),
  ]);

  const [totalMembers, totalDepartments, membersWithDepartments, totalLeaders] = stats;
  const membersInDepartments = membersWithDepartments.length;

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
          departments: {
            include: {
              department: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
    },
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-lg border p-6">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Bem-vindo ao painel administrativo, <span className="font-semibold text-gray-900">{currentUser.name}</span>
        </p>
        <div className="mt-4">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            currentUser.role === 'ADMIN'
              ? 'bg-red-100 text-red-800'
              : currentUser.role === 'LEADER'
              ? 'bg-blue-100 text-blue-800'
              : 'bg-gray-100 text-gray-800'
          }`}>
            {currentUser.role}
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-blue-500 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total de Membros</CardTitle>
            <div className="p-2 bg-blue-50 rounded-lg">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{totalMembers}</div>
            <p className="text-sm text-gray-500 mt-2">
              <span className="font-medium text-blue-600">{membersInDepartments}</span> em departamentos
            </p>
          </CardContent>
        </Card>

        {isAdmin && (
          <Card className="border-l-4 border-l-purple-500 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Departamentos</CardTitle>
              <div className="p-2 bg-purple-50 rounded-lg">
                <Building2 className="h-5 w-5 text-purple-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{totalDepartments}</div>
              <p className="text-sm text-gray-500 mt-2">Ativos no sistema</p>
            </CardContent>
          </Card>
        )}

        <Card className="border-l-4 border-l-green-500 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Líderes</CardTitle>
            <div className="p-2 bg-green-50 rounded-lg">
              <UserPlus className="h-5 w-5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{totalLeaders}</div>
            <p className="text-sm text-gray-500 mt-2">Líderes ativos</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Taxa de Vinculação</CardTitle>
            <div className="p-2 bg-orange-50 rounded-lg">
              <Activity className="h-5 w-5 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">
              {totalMembers > 0
                ? Math.round((membersInDepartments / totalMembers) * 100)
                : 0}
              %
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Membros em departamentos
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Sections */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Departments */}
        {isAdmin && (
          <Card className="shadow-sm">
            <CardHeader className="border-b bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-purple-600" />
                  <CardTitle className="text-lg">Departamentos Recentes</CardTitle>
                </div>
                <Link href="/admin/departments">
                  <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700 hover:bg-purple-50">
                    Ver todos →
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-3">
                {recentDepartments.map((dept) => (
                  <div
                    key={dept.id.toString()}
                    className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50/50 transition-all group"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 group-hover:text-purple-700">{dept.name}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Líder: <span className="font-medium">{dept.leader?.name || 'Não definido'}</span>
                      </p>
                    </div>
                    <div className="text-right ml-4">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 rounded-full group-hover:bg-purple-100">
                        <Users className="h-4 w-4 text-gray-600 group-hover:text-purple-600" />
                        <span className="text-sm font-semibold text-gray-700 group-hover:text-purple-700">{dept._count.members}</span>
                      </div>
                    </div>
                  </div>
                ))}
                {recentDepartments.length === 0 && (
                  <div className="text-center py-12">
                    <Building2 className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">Nenhum departamento cadastrado</p>
                    <Link href="/admin/departments">
                      <Button variant="outline" size="sm" className="mt-4">
                        Criar primeiro departamento
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recent Members */}
        <Card className="shadow-sm">
          <CardHeader className="border-b bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                <CardTitle className="text-lg">Membros Recentes</CardTitle>
              </div>
              <Link href="/admin/members">
                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                  Ver todos →
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-3">
              {recentMembers.map((member) => (
                <div
                  key={member.id.toString()}
                  className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all group"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 group-hover:text-blue-700">{member.name}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {member.memberProfile?.departments && member.memberProfile.departments.length > 0
                        ? member.memberProfile.departments.map(d => d.department.name).join(', ')
                        : 'Sem departamento'}
                    </p>
                  </div>
                  <div className="text-right ml-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        member.role === 'ADMIN'
                          ? 'bg-red-100 text-red-700 group-hover:bg-red-200'
                          : member.role === 'LEADER'
                          ? 'bg-blue-100 text-blue-700 group-hover:bg-blue-200'
                          : 'bg-gray-100 text-gray-700 group-hover:bg-gray-200'
                      }`}
                    >
                      {member.role}
                    </span>
                  </div>
                </div>
              ))}
              {recentMembers.length === 0 && (
                <div className="text-center py-12">
                  <Users className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">Nenhum membro cadastrado</p>
                  <Link href="/admin/members">
                    <Button variant="outline" size="sm" className="mt-4">
                      Adicionar primeiro membro
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
