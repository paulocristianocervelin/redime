'use client';

import { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus, Edit, Trash2, Loader2, Search, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Funções de formatação de input
const formatCPF = (value: string): string => {
  const numbers = value.replace(/\D/g, '').slice(0, 11);
  if (numbers.length <= 3) return numbers;
  if (numbers.length <= 6) return `${numbers.slice(0, 3)}.${numbers.slice(3)}`;
  if (numbers.length <= 9) return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`;
  return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9)}`;
};

const formatPhone = (value: string): string => {
  const numbers = value.replace(/\D/g, '').slice(0, 11);
  if (numbers.length <= 2) return numbers;
  if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
  if (numbers.length <= 11) return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
  return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
};

const formatCEP = (value: string): string => {
  const numbers = value.replace(/\D/g, '').slice(0, 8);
  if (numbers.length <= 5) return numbers;
  return `${numbers.slice(0, 5)}-${numbers.slice(5)}`;
};

interface Member {
  id: string;
  name: string;
  cpf: string;
  email: string | null;
  role: string;
  active: boolean;
  createdAt: string;
  memberProfile?: {
    phone: string | null;
    address: string;
    number: string | null;
    complement: string | null;
    city: string | null;
    state: string | null;
    zipCode: string | null;
    departments: {
      department: {
        id: string;
        name: string;
      };
    }[];
  } | null;
}

export default function MembersPage() {
  const router = useRouter();
  const addressInputRef = useRef<HTMLInputElement>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loadingCep, setLoadingCep] = useState(false);
  const [cepError, setCepError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    cpf: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    number: '',
    complement: '',
    city: '',
    state: '',
    zipCode: '',
    departmentIds: [] as string[],
    role: 'MEMBER',
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchMembers();
    fetchDepartments();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await fetch('/api/members');
      const data = await response.json();
      setMembers(data.members || []);
    } catch (error) {
      console.error('Error fetching members:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await fetch('/api/departments');
      const data = await response.json();
      setDepartments(data.departments || []);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const handleCepBlur = async () => {
    const cep = formData.zipCode.replace(/\D/g, '');

    if (cep.length !== 8) {
      return;
    }

    setCepError('');
    setLoadingCep(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (!data.erro) {
        setFormData((prev) => ({
          ...prev,
          address: data.logradouro || '',
          city: data.localidade || '',
          state: data.uf || '',
        }));
        setCepError('');

        // Após atualizar os dados, foca no campo de endereço
        setTimeout(() => {
          addressInputRef.current?.focus();
        }, 100);
      } else {
        setCepError('CEP não encontrado');
      }
    } catch (error) {
      console.error('Error fetching CEP:', error);
      setCepError('Erro ao buscar CEP');
    } finally {
      setLoadingCep(false);
    }
  };

  const handleOpenDialog = (member?: Member) => {
    if (member) {
      setEditingMember(member);
      const memberDepartmentIds = member.memberProfile?.departments?.map(
        (d) => d.department.id.toString()
      ) || [];
      setFormData({
        name: member.name,
        cpf: member.cpf,
        email: member.email || '',
        password: '',
        phone: member.memberProfile?.phone || '',
        address: member.memberProfile?.address || '',
        number: member.memberProfile?.number || '',
        complement: member.memberProfile?.complement || '',
        city: member.memberProfile?.city || '',
        state: member.memberProfile?.state || '',
        zipCode: member.memberProfile?.zipCode || '',
        departmentIds: memberDepartmentIds,
        role: member.role,
      });
    } else {
      setEditingMember(null);
      setFormData({
        name: '',
        cpf: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        number: '',
        complement: '',
        city: '',
        state: '',
        zipCode: '',
        departmentIds: [],
        role: 'MEMBER',
      });
    }
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const url = editingMember
        ? `/api/members/${editingMember.id}`
        : '/api/members';

      const method = editingMember ? 'PUT' : 'POST';

      // Remove password do payload se estiver vazio na edição
      const payload = { ...formData };
      if (editingMember && !payload.password) {
        delete (payload as any).password;
      }

      // Converter "null" string para null real no departmentId
      if (payload.departmentId === 'null' || payload.departmentId === '') {
        (payload as any).departmentId = null;
      }

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erro ao salvar membro');
      }

      setDialogOpen(false);
      fetchMembers();
      router.refresh();
    } catch (error) {
      console.error('Error saving member:', error);
      alert(error instanceof Error ? error.message : 'Erro ao salvar membro');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja deletar este membro?')) {
      return;
    }

    try {
      const response = await fetch(`/api/members/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erro ao deletar membro');
      }

      fetchMembers();
      router.refresh();
    } catch (error) {
      console.error('Error deleting member:', error);
      alert('Erro ao deletar membro');
    }
  };

  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.cpf.includes(searchTerm) ||
      member.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Membros</h1>
          <p className="text-gray-600 mt-2">
            Gerencie os membros da igreja
          </p>
        </div>
        <Button onClick={() => handleOpenDialog()} className="gradient-bg-primary hover-lift shadow-modern text-white border-0">
          <Plus className="h-4 w-4 mr-2" />
          Novo Membro
        </Button>
      </div>

      {/* Search */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar por nome, CPF ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Members Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>CPF</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Departamento</TableHead>
                <TableHead>Papel</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="font-medium">{member.name}</TableCell>
                  <TableCell>{member.cpf}</TableCell>
                  <TableCell>{member.email || '-'}</TableCell>
                  <TableCell>
                    {member.memberProfile?.departments && member.memberProfile.departments.length > 0
                      ? member.memberProfile.departments.map(d => d.department.name).join(', ')
                      : '-'}
                  </TableCell>
                  <TableCell>
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
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/members/${member.id}`}>
                        <Button
                          variant="ghost"
                          size="icon"
                          title="Visualizar"
                        >
                          <Eye className="h-4 w-4 text-blue-600" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleOpenDialog(member)}
                        title="Editar"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(member.id)}
                        title="Deletar"
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredMembers.length === 0 && (
            <div className="py-12 text-center text-gray-500">
              {searchTerm
                ? 'Nenhum membro encontrado'
                : 'Nenhum membro cadastrado'}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialog */}
      <Dialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) {
            // Reset form quando fechar
            setEditingMember(null);
            setCepError('');
            setFormData({
              name: '',
              cpf: '',
              email: '',
              password: '',
              phone: '',
              address: '',
              number: '',
              complement: '',
              city: '',
              state: '',
              zipCode: '',
              departmentIds: [],
              role: 'MEMBER',
            });
          }
        }}
      >
        <DialogContent
          key={editingMember?.id || 'new'}
          className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto"
        >
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>
                {editingMember ? 'Editar Membro' : 'Novo Membro'}
              </DialogTitle>
              <DialogDescription>
                Preencha as informações do membro. Campos com * são obrigatórios.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="name">Nome Completo *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cpf">CPF *</Label>
                  <Input
                    id="cpf"
                    value={formData.cpf}
                    onChange={(e) =>
                      setFormData({ ...formData, cpf: formatCPF(e.target.value) })
                    }
                    disabled={!!editingMember}
                    required
                    placeholder="000.000.000-00"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: formatPhone(e.target.value) })
                    }
                    placeholder="(00) 00000-0000"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">
                    Senha {!editingMember && '*'}
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    required={!editingMember}
                    placeholder={editingMember ? 'Deixe em branco para manter' : ''}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="zipCode">CEP</Label>
                  <div className="relative">
                    <Input
                      id="zipCode"
                      value={formData.zipCode}
                      onChange={(e) => {
                        setFormData({ ...formData, zipCode: formatCEP(e.target.value) });
                        setCepError('');
                      }}
                      onBlur={handleCepBlur}
                      placeholder="00000-000"
                      className={cepError ? 'border-red-500' : ''}
                    />
                    {loadingCep && (
                      <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-gray-400" />
                    )}
                  </div>
                  {cepError && (
                    <p className="text-sm text-red-500">{cepError}</p>
                  )}
                </div>

                <div className="space-y-2 col-span-2">
                  <Label htmlFor="address">Endereço *</Label>
                  <Input
                    ref={addressInputRef}
                    id="address"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    required
                    disabled={loadingCep}
                    placeholder="Rua, Avenida, etc"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="number">Número</Label>
                  <Input
                    id="number"
                    value={formData.number}
                    onChange={(e) =>
                      setFormData({ ...formData, number: e.target.value })
                    }
                    placeholder="Ex: 123"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="complement">Complemento</Label>
                  <Input
                    id="complement"
                    value={formData.complement}
                    onChange={(e) =>
                      setFormData({ ...formData, complement: e.target.value })
                    }
                    placeholder="Apto, Bloco, etc"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">Cidade</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    disabled={loadingCep}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">Estado</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) =>
                      setFormData({ ...formData, state: e.target.value })
                    }
                    maxLength={2}
                    placeholder="SC"
                    disabled={loadingCep}
                  />
                </div>

                <div className="space-y-2 col-span-2">
                  <Label>Departamentos (opcional)</Label>
                  <div className="border rounded-md p-4 max-h-[200px] overflow-y-auto space-y-3">
                    {departments.length === 0 ? (
                      <p className="text-sm text-gray-500">Nenhum departamento cadastrado</p>
                    ) : (
                      departments.map((dept) => (
                        <div key={dept.id.toString()} className="flex items-center space-x-2">
                          <Checkbox
                            id={`dept-${dept.id}`}
                            checked={formData.departmentIds.includes(dept.id.toString())}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setFormData({
                                  ...formData,
                                  departmentIds: [...formData.departmentIds, dept.id.toString()],
                                });
                              } else {
                                setFormData({
                                  ...formData,
                                  departmentIds: formData.departmentIds.filter(
                                    (id) => id !== dept.id.toString()
                                  ),
                                });
                              }
                            }}
                          />
                          <label
                            htmlFor={`dept-${dept.id}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                          >
                            {dept.name}
                          </label>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Papel</Label>
                  <Select
                    value={formData.role}
                    onValueChange={(value) =>
                      setFormData({ ...formData, role: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MEMBER">Membro</SelectItem>
                      <SelectItem value="LEADER">Líder</SelectItem>
                      <SelectItem value="ADMIN">Administrador</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
                disabled={submitting}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="outline"
                disabled={submitting}
                className="hover:bg-primary hover:text-white transition-colors"
              >
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  'Salvar'
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
