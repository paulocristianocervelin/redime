'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Heart,
  Send,
  Clock,
  Users,
  CheckCircle2,
  Loader2,
  Filter,
  Search,
} from 'lucide-react';

// Categorias de pedidos de oração
const PRAYER_CATEGORIES = [
  { value: 'HEALTH', label: 'Saúde' },
  { value: 'FAMILY', label: 'Família' },
  { value: 'FINANCE', label: 'Financeiro' },
  { value: 'SPIRITUAL', label: 'Espiritual' },
  { value: 'GUIDANCE', label: 'Direção' },
  { value: 'THANKSGIVING', label: 'Gratidão' },
  { value: 'OTHER', label: 'Outro' },
];

// Mock de pedidos (substituir com dados reais da API)
const MOCK_PRAYERS = [
  {
    id: 1,
    title: 'Pedido de cura para minha mãe',
    category: 'HEALTH',
    prayerCount: 45,
    createdAt: '2 horas atrás',
    answered: false,
  },
  {
    id: 2,
    title: 'Gratidão pela nova oportunidade de emprego',
    category: 'THANKSGIVING',
    prayerCount: 32,
    createdAt: '5 horas atrás',
    answered: true,
  },
  {
    id: 3,
    title: 'Restauração familiar',
    category: 'FAMILY',
    prayerCount: 58,
    createdAt: '1 dia atrás',
    answered: false,
  },
];

export default function PrayerRoomPage() {
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Estado do formulário
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    isAnonymous: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // TODO: Integrar com API
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log('Pedido de oração enviado:', formData);

    // Resetar formulário
    setFormData({
      title: '',
      description: '',
      category: '',
      isAnonymous: false,
    });

    setLoading(false);
    setShowForm(false);

    alert('Seu pedido de oração foi enviado com sucesso! Nossa equipe está orando por você.');
  };

  const handlePray = (prayerId: number) => {
    // TODO: Integrar com API para incrementar contador
    console.log('Orou pelo pedido:', prayerId);
  };

  // Filtrar pedidos
  const filteredPrayers = MOCK_PRAYERS.filter((prayer) => {
    const matchesCategory = selectedCategory === 'all' || prayer.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      prayer.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-bg-gray-soft">
      {/* Hero Section */}
      <section className="gradient-bg-dark text-white py-16 md:py-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <Badge
              variant="outline"
              className="text-white border-white/30 bg-white/10 backdrop-blur-sm text-sm md:text-base px-4 py-1.5"
            >
              <Heart className="h-4 w-4 mr-2 inline" />
              Sala de Oração
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              Ore e Seja Orado
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Compartilhe seus pedidos de oração e una-se a nós em intercessão. Juntos somos mais
              fortes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                onClick={() => setShowForm(true)}
                className="bg-white text-black border border-gray-200 hover:bg-gray-200 transition-elegant shadow-sm"
              >
                <Send className="h-4 w-4 mr-2" />
                Enviar Pedido
              </Button>
              <Button
                onClick={() => {
                  const element = document.getElementById('prayer-list');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                variant="outline"
                className="bg-transparent text-white border-white/30 hover:bg-white/10 transition-elegant"
              >
                <Heart className="h-4 w-4 mr-2" />
                Ver Pedidos
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Estatísticas */}
        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          <Card className="shadow-elegant">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-black mx-auto mb-3" />
              <h3 className="text-3xl font-bold text-gray-900 mb-1">1,234</h3>
              <p className="text-gray-600 text-sm">Pedidos Atendidos</p>
            </CardContent>
          </Card>
          <Card className="shadow-elegant">
            <CardContent className="p-6 text-center">
              <Heart className="h-8 w-8 text-black mx-auto mb-3" />
              <h3 className="text-3xl font-bold text-gray-900 mb-1">3,567</h3>
              <p className="text-gray-600 text-sm">Orações Realizadas</p>
            </CardContent>
          </Card>
          <Card className="shadow-elegant">
            <CardContent className="p-6 text-center">
              <CheckCircle2 className="h-8 w-8 text-black mx-auto mb-3" />
              <h3 className="text-3xl font-bold text-gray-900 mb-1">892</h3>
              <p className="text-gray-600 text-sm">Testemunhos de Resposta</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Formulário de Pedido */}
          <div className="lg:col-span-2 space-y-6">
            {showForm ? (
              <Card className="shadow-elegant">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    <Send className="h-5 w-5 text-black" />
                    Compartilhe Seu Pedido de Oração
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="title">Título do Pedido *</Label>
                      <Input
                        id="title"
                        placeholder="Ex: Oração pela minha família"
                        value={formData.title}
                        onChange={(e) =>
                          setFormData({ ...formData, title: e.target.value })
                        }
                        required
                        className="transition-elegant"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Descrição *</Label>
                      <Textarea
                        id="description"
                        placeholder="Compartilhe os detalhes do seu pedido de oração..."
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({ ...formData, description: e.target.value })
                        }
                        required
                        rows={5}
                        className="transition-elegant resize-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Categoria *</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) =>
                          setFormData({ ...formData, category: value })
                        }
                        required
                      >
                        <SelectTrigger id="category" className="transition-elegant">
                          <SelectValue placeholder="Selecione uma categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          {PRAYER_CATEGORIES.map((cat) => (
                            <SelectItem key={cat.value} value={cat.value}>
                              {cat.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="anonymous"
                        checked={formData.isAnonymous}
                        onCheckedChange={(checked) =>
                          setFormData({ ...formData, isAnonymous: checked as boolean })
                        }
                      />
                      <label
                        htmlFor="anonymous"
                        className="text-sm text-gray-700 cursor-pointer"
                      >
                        Enviar como anônimo
                      </label>
                    </div>

                    <Separator />

                    <div className="flex gap-3">
                      <Button
                        type="submit"
                        disabled={loading}
                        className="flex-1 bg-white text-black border border-gray-200 hover:bg-gray-200 transition-elegant shadow-sm"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Enviando...
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-2" />
                            Enviar Pedido
                          </>
                        )}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowForm(false)}
                        disabled={loading}
                        className="hover:bg-gray-200 transition-elegant"
                      >
                        Cancelar
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            ) : (
              <Card className="shadow-elegant bg-gradient-bg-primary text-white">
                <CardContent className="p-8 text-center">
                  <Heart className="h-12 w-12 text-white mx-auto mb-4" />
                  <h3 className="text-2xl font-semibold mb-3 text-white">
                    Compartilhe Suas Necessidades
                  </h3>
                  <p className="text-gray-200 mb-6 max-w-xl mx-auto">
                    Nossa equipe está comprometida em orar por você. Não enfrente suas lutas
                    sozinho, permita que oremos juntos.
                  </p>
                  <Button
                    onClick={() => setShowForm(true)}
                    className="bg-white text-black border border-gray-200 hover:bg-gray-200 transition-elegant shadow-sm"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Enviar Meu Pedido
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Lista de Pedidos */}
            <div id="prayer-list">
              <Card className="shadow-elegant">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    <Heart className="h-5 w-5 text-black" />
                    Pedidos de Oração ({filteredPrayers.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Filtros */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Buscar pedidos..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 transition-elegant"
                      />
                    </div>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="sm:w-48 transition-elegant">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas Categorias</SelectItem>
                        {PRAYER_CATEGORIES.map((cat) => (
                          <SelectItem key={cat.value} value={cat.value}>
                            {cat.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  {/* Lista */}
                  <div className="space-y-4">
                    {filteredPrayers.length === 0 ? (
                      <div className="text-center py-12">
                        <Heart className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500">Nenhum pedido encontrado</p>
                      </div>
                    ) : (
                      filteredPrayers.map((prayer) => (
                        <div
                          key={prayer.id}
                          className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-elegant"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant="outline" className="text-xs">
                                  {
                                    PRAYER_CATEGORIES.find(
                                      (c) => c.value === prayer.category
                                    )?.label
                                  }
                                </Badge>
                                {prayer.answered && (
                                  <Badge className="bg-green-100 text-green-800 border-0 text-xs">
                                    <CheckCircle2 className="h-3 w-3 mr-1" />
                                    Respondido
                                  </Badge>
                                )}
                              </div>
                              <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                                {prayer.title}
                              </h4>
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {prayer.createdAt}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Heart className="h-3 w-3" />
                                  {prayer.prayerCount} orações
                                </span>
                              </div>
                            </div>
                            <Button
                              size="sm"
                              onClick={() => handlePray(prayer.id)}
                              className="bg-white text-black border border-gray-200 hover:bg-gray-200 transition-elegant shadow-sm flex-shrink-0"
                            >
                              <Heart className="h-4 w-4 mr-2" />
                              Orar
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar - Informações */}
          <div className="space-y-6">
            {/* Como Funciona */}
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="text-gray-900">Como Funciona</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-semibold text-sm">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Compartilhe</h4>
                    <p className="text-sm text-gray-600">
                      Envie seu pedido de oração de forma segura e confidencial
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-semibold text-sm">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Oramos</h4>
                    <p className="text-sm text-gray-600">
                      Nossa equipe e comunidade orarão por você
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-semibold text-sm">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Testemunhe</h4>
                    <p className="text-sm text-gray-600">
                      Compartilhe conosco quando Deus responder sua oração
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Versículo */}
            <Card className="shadow-elegant border-l-4 border-l-black bg-gradient-bg-primary text-white">
              <CardContent className="p-6">
                <p className="text-lg italic mb-3 text-white">
                  &ldquo;Confiem suas preocupações a Deus, pois ele cuida de vocês.&rdquo;
                </p>
                <p className="text-sm text-gray-200 font-medium">1 Pedro 5:7</p>
              </CardContent>
            </Card>

            {/* Privacidade */}
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="text-gray-900 text-base">Sua Privacidade</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Todos os pedidos são moderados e tratados com confidencialidade. Você pode optar
                  por compartilhar anonimamente se preferir.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
