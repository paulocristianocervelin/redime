import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { prisma } from '@/lib/prisma';
import { Users, UserCheck } from 'lucide-react';
import Image from 'next/image';

// Mapeamento de categorias para labels em português
const categoryLabels: Record<string, string> = {
  CHILDREN: 'Infantil',
  YOUTH: 'Adolescentes',
  YOUNG_ADULTS: 'Jovens',
  WOMEN: 'Mulheres',
  MEN: 'Homens',
  MUSIC: 'Música',
  PRAYER: 'Oração',
  MISSIONS: 'Missões',
  OUTREACH: 'Evangelismo',
  MEDIA: 'Mídia',
  ADMINISTRATION: 'Administração',
  TECHNOLOGY: 'Tecnologia',
  HOSPITALITY: 'Hospitalidade',
  SECURITY: 'Segurança',
  OTHER: 'Outros',
};

// Mapeamento de cores para badges de categorias
const categoryColors: Record<string, string> = {
  CHILDREN: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
  YOUTH: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  YOUNG_ADULTS: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  WOMEN: 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200',
  MEN: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
  MUSIC: 'bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200',
  PRAYER: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
  MISSIONS: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  OUTREACH: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200',
  MEDIA: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200',
  ADMINISTRATION: 'bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-200',
  TECHNOLOGY: 'bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-200',
  HOSPITALITY: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  SECURITY: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  OTHER: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
};

export default async function MinistriesPage() {
  // Buscar todos os ministérios ativos do banco de dados
  const departments = await prisma.department.findMany({
    where: {
      active: true,
    },
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
    orderBy: [
      { category: 'asc' },
      { name: 'asc' },
    ],
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header Section */}
      <section className="gradient-bg-dark text-white py-16">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <Users className="h-16 w-16 mx-auto text-white" />
            <h1 className="text-4xl md:text-5xl font-bold">Nossos Ministérios</h1>
            <p className="text-xl text-gray-200">
              Encontre seu lugar e sirva com seus dons
            </p>
            <p className="text-gray-300">
              &quot;E ele mesmo concedeu uns para apóstolos, outros para profetas, outros para
              evangelistas e outros para pastores e mestres, com o fim de preparar os santos
              para a obra do ministério...&quot; - Efésios 4:11-12
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {departments.length === 0 ? (
            <div className="text-center py-12">
              <Users className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Nenhum ministério cadastrado
              </h3>
              <p className="text-gray-500">
                Os ministérios aparecerão aqui assim que forem cadastrados.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {departments.map((department) => (
                <Card
                  key={department.id.toString()}
                  className="shadow-elegant hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                >
                  {/* Imagem do Ministério */}
                  {department.imageUrl && (
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={department.imageUrl}
                        alt={department.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-xl">{department.name}</CardTitle>
                      <Badge
                        className={
                          categoryColors[department.category] ||
                          categoryColors.OTHER
                        }
                        variant="secondary"
                      >
                        {categoryLabels[department.category] || department.category}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Descrição */}
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {department.description}
                    </p>

                    {/* Informações do Líder e Membros */}
                    <div className="flex items-center justify-between pt-4 border-t">
                      {department.leader && (
                        <div className="flex items-center gap-2 text-sm">
                          <UserCheck className="h-4 w-4 text-gray-500" />
                          <div>
                            <p className="text-xs text-gray-500">Líder</p>
                            <p className="font-medium">{department.leader.name}</p>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4 text-gray-500" />
                        <div className="text-right">
                          <p className="text-xs text-gray-500">Membros</p>
                          <p className="font-medium">{department._count.members}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
