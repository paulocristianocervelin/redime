'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Edit, Trash2, Users, Loader2, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Department {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  active: boolean;
  leader?: {
    id: string;
    name: string;
    email: string | null;
  } | null;
  _count?: {
    members: number;
  };
}

const DEPARTMENT_CATEGORIES = [
  { value: 'CHILDREN', label: 'Crianças' },
  { value: 'YOUTH', label: 'Jovens' },
  { value: 'YOUNG_ADULTS', label: 'Jovens Adultos' },
  { value: 'WOMEN', label: 'Mulheres' },
  { value: 'MEN', label: 'Homens' },
  { value: 'MUSIC', label: 'Música' },
  { value: 'PRAYER', label: 'Oração' },
  { value: 'MISSIONS', label: 'Missões' },
  { value: 'OUTREACH', label: 'Evangelismo' },
  { value: 'MEDIA', label: 'Mídia' },
  { value: 'ADMINISTRATION', label: 'Administração' },
  { value: 'TECHNOLOGY', label: 'Tecnologia' },
  { value: 'HOSPITALITY', label: 'Hospitalidade' },
  { value: 'SECURITY', label: 'Segurança' },
  { value: 'OTHER', label: 'Outro' },
];

interface Leader {
  id: string;
  name: string;
  role: string;
}

export default function DepartmentsPage() {
  const router = useRouter();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingDept, setEditingDept] = useState<Department | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    leaderId: '',
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchDepartments();
    fetchLeaders();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await fetch('/api/departments');
      const data = await response.json();
      setDepartments(data.departments || []);
    } catch (error) {
      console.error('Error fetching departments:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLeaders = async () => {
    try {
      const response = await fetch('/api/members');
      const data = await response.json();
      // Filtra apenas LEADER e ADMIN
      const leadersList = (data.members || []).filter(
        (m: Leader) => m.role === 'LEADER' || m.role === 'ADMIN'
      );
      setLeaders(leadersList);
    } catch (error) {
      console.error('Error fetching leaders:', error);
    }
  };

  const handleOpenDialog = (dept?: Department) => {
    if (dept) {
      setEditingDept(dept);
      setFormData({
        name: dept.name,
        description: dept.description,
        category: dept.category,
        leaderId: dept.leader?.id?.toString() || 'null',
      });
    } else {
      setEditingDept(null);
      setFormData({
        name: '',
        description: '',
        category: '',
        leaderId: 'null',
      });
    }
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Validação manual da categoria
    if (!formData.category) {
      alert('Por favor, selecione uma categoria');
      setSubmitting(false);
      return;
    }

    try {
      const url = editingDept
        ? `/api/departments/${editingDept.id}`
        : '/api/departments';

      const method = editingDept ? 'PUT' : 'POST';

      // Converter "null" string para null real
      const submitData = {
        ...formData,
        leaderId: formData.leaderId === 'null' || formData.leaderId === '' ? null : formData.leaderId,
      };

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erro ao salvar departamento');
      }

      setDialogOpen(false);
      fetchDepartments();
      router.refresh();
    } catch (error) {
      console.error('Error saving department:', error);
      alert(error instanceof Error ? error.message : 'Erro ao salvar departamento');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja deletar este departamento?')) {
      return;
    }

    try {
      const response = await fetch(`/api/departments/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erro ao deletar departamento');
      }

      fetchDepartments();
      router.refresh();
    } catch (error) {
      console.error('Error deleting department:', error);
      alert('Erro ao deletar departamento');
    }
  };

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
          <h1 className="text-3xl font-bold text-gray-900">Departamentos</h1>
          <p className="text-gray-600 mt-2">
            Gerencie os departamentos e ministérios da igreja
          </p>
        </div>
        <Button onClick={() => handleOpenDialog()} className="gradient-bg-primary hover-lift shadow-modern text-white border-0">
          <Plus className="h-4 w-4 mr-2" />
          Novo Departamento
        </Button>
      </div>

      {/* Departments Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {departments.map((dept) => (
          <Card key={dept.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="text-lg">{dept.name}</span>
                <div className="flex gap-2">
                  <Link href={`/admin/departments/${dept.id}`}>
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
                    onClick={() => handleOpenDialog(dept)}
                    title="Editar"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(dept.id)}
                    title="Deletar"
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600 line-clamp-2">
                {dept.description}
              </p>

              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Categoria:</span>
                  <span className="font-medium">
                    {DEPARTMENT_CATEGORIES.find(c => c.value === dept.category)?.label || dept.category}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Líder:</span>
                  <span className="font-medium">
                    {dept.leader?.name || 'Sem líder'}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t">
                  <span className="flex items-center gap-2 text-gray-500">
                    <Users className="h-4 w-4" />
                    Membros:
                  </span>
                  <span className="font-bold text-primary">
                    {dept._count?.members || 0}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {departments.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-gray-500">Nenhum departamento cadastrado</p>
            <Button
              onClick={() => handleOpenDialog()}
              variant="outline"
              className="mt-4"
            >
              Criar primeiro departamento
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Dialog */}
      <Dialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) {
            // Reset form quando fechar
            setEditingDept(null);
            setFormData({
              name: '',
              description: '',
              category: '',
              leaderId: 'null',
            });
          }
        }}
      >
        <DialogContent
          key={editingDept?.id || 'new'}
          className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto"
        >
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>
                {editingDept ? 'Editar Departamento' : 'Novo Departamento'}
              </DialogTitle>
              <DialogDescription>
                Preencha as informações do departamento
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome *</Label>
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
                <Label htmlFor="description">Descrição *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Categoria *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData({ ...formData, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {DEPARTMENT_CATEGORIES.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="leader">Líder</Label>
                <Select
                  value={formData.leaderId}
                  onValueChange={(value) =>
                    setFormData({ ...formData, leaderId: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um líder (opcional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="null">Sem líder</SelectItem>
                    {leaders.map((leader) => (
                      <SelectItem
                        key={leader.id.toString()}
                        value={leader.id.toString()}
                      >
                        {leader.name} ({leader.role})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
