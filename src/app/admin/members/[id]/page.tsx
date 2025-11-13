'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  ArrowLeft,
  UserCircle,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building2,
  CreditCard,
  Loader2,
  Edit,
  Shield,
} from 'lucide-react';
import Link from 'next/link';

interface Member {
  id: string;
  name: string;
  email: string | null;
  cpf: string;
  role: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  memberProfile: {
    id: string;
    userId: string;
    phone: string | null;
    address: string;
    city: string | null;
    state: string | null;
    zipCode: string | null;
    birthDate: string | null;
    department: {
      id: string;
      name: string;
      slug: string;
      category: string;
    } | null;
  } | null;
  leaderOfDepartments: {
    id: string;
    name: string;
    slug: string;
  }[];
}

const ROLE_LABELS: Record<string, string> = {
  ADMIN: 'Administrador',
  LEADER: 'Líder',
  MEMBER: 'Membro',
};

const ROLE_COLORS: Record<string, string> = {
  ADMIN: 'bg-red-100 text-red-800',
  LEADER: 'bg-blue-100 text-blue-800',
  MEMBER: 'bg-gray-100 text-gray-800',
};

export default function MemberDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchMember = async () => {
    try {
      const response = await fetch(`/api/members/${params.id}`);
      if (!response.ok) {
        throw new Error('Membro não encontrado');
      }
      const data = await response.json();
      setMember(data.member);
    } catch (error) {
      console.error('Error fetching member:', error);
      alert('Erro ao carregar membro');
      router.push('/admin/members');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params.id) {
      fetchMember();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!member) {
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
            onClick={() => router.push('/admin/members')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{member.name}</h1>
            <div className="flex items-center gap-2 mt-2">
              <Badge className={ROLE_COLORS[member.role]}>
                {ROLE_LABELS[member.role] || member.role}
              </Badge>
              <Badge variant={member.active ? 'default' : 'secondary'}>
                {member.active ? 'Ativo' : 'Inativo'}
              </Badge>
            </div>
          </div>
        </div>
        <Link href={`/admin/members`}>
          <Button variant="outline">
            <Edit className="h-4 w-4 mr-2" />
            Editar
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Informações Pessoais */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCircle className="h-5 w-5 text-blue-600" />
              Informações Pessoais
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Nome Completo</h3>
              <p className="text-gray-900 font-semibold">{member.name}</p>
            </div>

            <Separator />

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">CPF</h3>
              <div className="flex items-center gap-2 text-gray-900">
                <CreditCard className="h-4 w-4 text-gray-400" />
                <span className="font-mono">{member.cpf}</span>
              </div>
            </div>

            {member.memberProfile?.birthDate && (
              <>
                <Separator />
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Data de Nascimento</h3>
                  <div className="flex items-center gap-2 text-gray-900">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>
                      {new Date(member.memberProfile.birthDate).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                </div>
              </>
            )}

            <Separator />

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Cadastrado em</h3>
              <div className="flex items-center gap-2 text-gray-900">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span>
                  {new Date(member.createdAt).toLocaleDateString('pt-BR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Informações de Contato */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-green-600" />
              Informações de Contato
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {member.email ? (
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Email</h3>
                <div className="flex items-center gap-2 text-gray-900">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <a
                    href={`mailto:${member.email}`}
                    className="text-blue-600 hover:underline"
                  >
                    {member.email}
                  </a>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Email</h3>
                <p className="text-gray-400 text-sm">Não informado</p>
              </div>
            )}

            <Separator />

            {member.memberProfile?.phone ? (
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Telefone</h3>
                <div className="flex items-center gap-2 text-gray-900">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <a
                    href={`tel:${member.memberProfile.phone}`}
                    className="text-blue-600 hover:underline"
                  >
                    {member.memberProfile.phone}
                  </a>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Telefone</h3>
                <p className="text-gray-400 text-sm">Não informado</p>
              </div>
            )}

            <Separator />

            {member.memberProfile?.address && (
              <>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Endereço</h3>
                  <div className="flex items-start gap-2 text-gray-900">
                    <MapPin className="h-4 w-4 text-gray-400 mt-1" />
                    <div className="space-y-1">
                      <p>{member.memberProfile.address}</p>
                      {(member.memberProfile.city || member.memberProfile.state) && (
                        <p className="text-sm text-gray-600">
                          {member.memberProfile.city}
                          {member.memberProfile.city && member.memberProfile.state && ', '}
                          {member.memberProfile.state}
                        </p>
                      )}
                      {member.memberProfile.zipCode && (
                        <p className="text-sm text-gray-600">
                          CEP: {member.memberProfile.zipCode}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Informações de Departamento e Liderança */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Departamento */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-purple-600" />
              Departamento
            </CardTitle>
          </CardHeader>
          <CardContent>
            {member.memberProfile?.department ? (
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {member.memberProfile.department.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Membro do departamento
                    </p>
                  </div>
                  <Link href={`/admin/departments/${member.memberProfile.department.id}`}>
                    <Button variant="outline" size="sm">
                      Ver Departamento
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Building2 className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                <p>Não vinculado a nenhum departamento</p>
                <Link href="/admin/members">
                  <Button variant="outline" size="sm" className="mt-4">
                    Editar Membro
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Liderança */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-orange-600" />
              Liderança
            </CardTitle>
          </CardHeader>
          <CardContent>
            {member.leaderOfDepartments && member.leaderOfDepartments.length > 0 ? (
              <div className="space-y-3">
                {member.leaderOfDepartments.map((dept) => (
                  <div
                    key={dept.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-orange-200 bg-orange-50/50 hover:bg-orange-100/50 transition-all group"
                  >
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 group-hover:text-orange-700">
                        {dept.name}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Líder do departamento
                      </p>
                    </div>
                    <Link href={`/admin/departments/${dept.id}`}>
                      <Button variant="ghost" size="sm">
                        Ver Departamento
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Shield className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                <p>Não é líder de nenhum departamento</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
