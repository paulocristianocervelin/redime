'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  ArrowLeft,
  Building2,
  Users,
  UserCircle,
  Mail,
  Phone,
  MapPin,
  Loader2,
  Edit,
} from 'lucide-react';
import Link from 'next/link';

interface Department {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  active: boolean;
  leader: {
    id: string;
    name: string;
    email: string | null;
    cpf: string;
  } | null;
  members: {
    id: string;
    userId: string;
    phone: string | null;
    address: string;
    city: string | null;
    state: string | null;
    user: {
      id: string;
      name: string;
      email: string | null;
      cpf: string;
      role: string;
    };
  }[];
}

const DEPARTMENT_CATEGORIES: Record<string, string> = {
  CHILDREN: 'Crianças',
  YOUTH: 'Jovens',
  YOUNG_ADULTS: 'Jovens Adultos',
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
  OTHER: 'Outro',
};

export default function DepartmentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [department, setDepartment] = useState<Department | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchDepartment();
    }
  }, [params.id]);

  const fetchDepartment = async () => {
    try {
      const response = await fetch(`/api/departments/${params.id}`);
      if (!response.ok) {
        throw new Error('Departamento não encontrado');
      }
      const data = await response.json();
      setDepartment(data.department);
    } catch (error) {
      console.error('Error fetching department:', error);
      alert('Erro ao carregar departamento');
      router.push('/admin/departments');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!department) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push('/admin/departments')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{department.name}</h1>
            <p className="text-gray-600 mt-1">
              {DEPARTMENT_CATEGORIES[department.category] || department.category}
            </p>
          </div>
        </div>
        <Link href={`/admin/departments`}>
          <Button variant="outline">
            <Edit className="h-4 w-4 mr-2" />
            Editar
          </Button>
        </Link>
      </div>

      {/* Informações Gerais */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-purple-600" />
            Informações do Departamento
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Descrição</h3>
            <p className="text-gray-900">{department.description}</p>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Categoria</h3>
              <Badge variant="outline" className="text-sm">
                {DEPARTMENT_CATEGORIES[department.category] || department.category}
              </Badge>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Status</h3>
              <Badge
                variant={department.active ? 'default' : 'secondary'}
                className="text-sm"
              >
                {department.active ? 'Ativo' : 'Inativo'}
              </Badge>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Total de Membros</h3>
              <p className="text-2xl font-bold text-purple-600">
                {department.members.length}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Líder do Departamento */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCircle className="h-5 w-5 text-blue-600" />
            Líder do Departamento
          </CardTitle>
        </CardHeader>
        <CardContent>
          {department.leader ? (
            <div className="bg-blue-50 rounded-lg p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-3 flex-1">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {department.leader.name}
                    </h3>
                    <p className="text-sm text-gray-600">CPF: {department.leader.cpf}</p>
                  </div>

                  {department.leader.email && (
                    <div className="flex items-center gap-2 text-gray-700">
                      <Mail className="h-4 w-4" />
                      <span className="text-sm">{department.leader.email}</span>
                    </div>
                  )}
                </div>

                <Link href={`/admin/members`}>
                  <Button variant="outline" size="sm">
                    Ver Perfil
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <UserCircle className="h-12 w-12 mx-auto mb-2 text-gray-300" />
              <p>Nenhum líder designado para este departamento</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Membros do Departamento */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-green-600" />
            Membros ({department.members.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {department.members.length > 0 ? (
            <div className="space-y-3">
              {department.members.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50/50 transition-all group"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 group-hover:text-green-700">
                          {member.user.name}
                        </h4>
                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                          {member.user.email && (
                            <div className="flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              {member.user.email}
                            </div>
                          )}
                          {member.phone && (
                            <div className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {member.phone}
                            </div>
                          )}
                        </div>
                        {member.city && member.state && (
                          <div className="flex items-center gap-1 mt-1 text-sm text-gray-500">
                            <MapPin className="h-3 w-3" />
                            {member.city}, {member.state}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Badge
                      variant={
                        member.user.role === 'ADMIN'
                          ? 'destructive'
                          : member.user.role === 'LEADER'
                          ? 'default'
                          : 'secondary'
                      }
                    >
                      {member.user.role}
                    </Badge>
                    <Link href={`/admin/members`}>
                      <Button variant="ghost" size="sm">
                        Ver Perfil
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <Users className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p>Nenhum membro vinculado a este departamento</p>
              <Link href="/admin/members">
                <Button variant="outline" size="sm" className="mt-4">
                  Adicionar Membros
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
