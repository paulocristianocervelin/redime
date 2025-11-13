'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Video,
  Search,
  Filter,
  Calendar,
  User,
  PlayCircle,
  Clock,
  TrendingUp,
} from 'lucide-react';
import Link from 'next/link';

// Mock de mensagens (substituir com dados reais da API)
const MOCK_MESSAGES = [
  {
    id: 1,
    slug: 'poder-da-oracao',
    title: 'O Poder da Oração',
    preacher: 'Pastor João Silva',
    date: '2025-11-03',
    series: 'Vida de Oração',
    category: 'SERMON',
    duration: '45:32',
    views: 1234,
    featured: true,
    thumbnail: null,
  },
  {
    id: 2,
    slug: 'fe-que-move-montanhas',
    title: 'Fé que Move Montanhas',
    preacher: 'Pastora Maria Santos',
    date: '2025-10-27',
    series: 'Fundamentos da Fé',
    category: 'TEACHING',
    duration: '52:18',
    views: 892,
    featured: true,
    thumbnail: null,
  },
  {
    id: 3,
    slug: 'amor-sem-limites',
    title: 'Amor Sem Limites',
    preacher: 'Pastor João Silva',
    date: '2025-10-20',
    series: null,
    category: 'SERMON',
    duration: '38:45',
    views: 756,
    featured: false,
    thumbnail: null,
  },
  {
    id: 4,
    slug: 'gratidao-em-tudo',
    title: 'Gratidão em Tudo',
    preacher: 'Pastor Carlos Oliveira',
    date: '2025-10-13',
    series: null,
    category: 'DEVOTIONAL',
    duration: '28:15',
    views: 645,
    featured: false,
    thumbnail: null,
  },
  {
    id: 5,
    slug: 'testemunho-transformacao',
    title: 'Testemunho de Transformação',
    preacher: 'Ana Paula Costa',
    date: '2025-10-06',
    series: null,
    category: 'TESTIMONY',
    duration: '15:30',
    views: 523,
    featured: false,
    thumbnail: null,
  },
  {
    id: 6,
    slug: 'proposito-divino',
    title: 'Descobrindo Seu Propósito Divino',
    preacher: 'Pastor João Silva',
    date: '2025-09-29',
    series: 'Vida com Propósito',
    category: 'TEACHING',
    duration: '48:22',
    views: 1105,
    featured: false,
    thumbnail: null,
  },
];

const CATEGORIES = [
  { value: 'SERMON', label: 'Sermão' },
  { value: 'TEACHING', label: 'Ensino' },
  { value: 'DEVOTIONAL', label: 'Devocional' },
  { value: 'TESTIMONY', label: 'Testemunho' },
];

const PREACHERS = Array.from(new Set(MOCK_MESSAGES.map((m) => m.preacher)));
const SERIES = Array.from(
  new Set(MOCK_MESSAGES.filter((m) => m.series).map((m) => m.series as string))
);

export default function MessagesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPreacher, setSelectedPreacher] = useState<string>('all');
  const [selectedSeries, setSelectedSeries] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('recent');

  // Filtrar e ordenar mensagens
  const filteredMessages = useMemo(() => {
    let filtered = MOCK_MESSAGES.filter((message) => {
      const matchesSearch =
        searchQuery === '' ||
        message.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        message.preacher.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'all' || message.category === selectedCategory;

      const matchesPreacher =
        selectedPreacher === 'all' || message.preacher === selectedPreacher;

      const matchesSeries =
        selectedSeries === 'all' || message.series === selectedSeries;

      return matchesSearch && matchesCategory && matchesPreacher && matchesSeries;
    });

    // Ordenar
    if (sortBy === 'recent') {
      filtered = [...filtered].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (sortBy === 'popular') {
      filtered = [...filtered].sort((a, b) => b.views - a.views);
    } else if (sortBy === 'title') {
      filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
    }

    return filtered;
  }, [searchQuery, selectedCategory, selectedPreacher, selectedSeries, sortBy]);

  const featuredMessages = MOCK_MESSAGES.filter((m) => m.featured);

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
              <Video className="h-4 w-4 mr-2 inline" />
              Mensagens e Sermões
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              Seja Edificado pela Palavra
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Acesse nossa biblioteca completa de mensagens, ensinos e testemunhos que transformam
              vidas.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Estatísticas */}
        <div className="grid sm:grid-cols-4 gap-4 mb-12">
          <Card className="shadow-elegant">
            <CardContent className="p-6 text-center">
              <Video className="h-8 w-8 text-black mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-gray-900">{MOCK_MESSAGES.length}</h3>
              <p className="text-gray-600 text-sm">Mensagens</p>
            </CardContent>
          </Card>
          <Card className="shadow-elegant">
            <CardContent className="p-6 text-center">
              <User className="h-8 w-8 text-black mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-gray-900">{PREACHERS.length}</h3>
              <p className="text-gray-600 text-sm">Pregadores</p>
            </CardContent>
          </Card>
          <Card className="shadow-elegant">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 text-black mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-gray-900">{SERIES.length}</h3>
              <p className="text-gray-600 text-sm">Séries</p>
            </CardContent>
          </Card>
          <Card className="shadow-elegant">
            <CardContent className="p-6 text-center">
              <PlayCircle className="h-8 w-8 text-black mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-gray-900">
                {MOCK_MESSAGES.reduce((acc, m) => acc + m.views, 0).toLocaleString()}
              </h3>
              <p className="text-gray-600 text-sm">Visualizações</p>
            </CardContent>
          </Card>
        </div>

        {/* Mensagens em Destaque */}
        {featuredMessages.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Em Destaque</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredMessages.map((message) => (
                <Card
                  key={message.id}
                  className="overflow-hidden hover:shadow-modern transition-elegant hover-lift group"
                >
                  <div className="relative aspect-video bg-gradient-bg-dark">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <PlayCircle className="h-16 w-16 text-white opacity-80 group-hover:opacity-100 transition-elegant group-hover:scale-110" />
                    </div>
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-red-600 text-white border-0">Destaque</Badge>
                    </div>
                    <div className="absolute bottom-3 right-3 bg-black/80 text-white text-xs px-2 py-1 rounded">
                      {message.duration}
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="outline" className="text-xs">
                        {CATEGORIES.find((c) => c.value === message.category)?.label}
                      </Badge>
                      {message.series && (
                        <Badge variant="secondary" className="text-xs">
                          {message.series}
                        </Badge>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-black transition-elegant line-clamp-2">
                      {message.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {message.preacher}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(message.date).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    <Button
                      asChild
                      className="w-full bg-white text-black border border-gray-200 hover:bg-gray-100 transition-elegant shadow-sm"
                    >
                      <Link href={`/messages/${message.slug}`}>
                        <PlayCircle className="h-4 w-4 mr-2" />
                        Assistir Agora
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Filtros e Busca */}
        <Card className="shadow-elegant mb-8">
          <CardContent className="p-6">
            <div className="grid gap-4">
              {/* Busca */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar por título ou pregador..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 transition-elegant"
                />
              </div>

              {/* Filtros */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="transition-elegant">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas Categorias</SelectItem>
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedPreacher} onValueChange={setSelectedPreacher}>
                  <SelectTrigger className="transition-elegant">
                    <User className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Pregador" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos Pregadores</SelectItem>
                    {PREACHERS.map((preacher) => (
                      <SelectItem key={preacher} value={preacher}>
                        {preacher}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedSeries} onValueChange={setSelectedSeries}>
                  <SelectTrigger className="transition-elegant">
                    <Video className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Série" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas Séries</SelectItem>
                    {SERIES.map((series) => (
                      <SelectItem key={series} value={series}>
                        {series}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="transition-elegant">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Ordenar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Mais Recentes</SelectItem>
                    <SelectItem value="popular">Mais Populares</SelectItem>
                    <SelectItem value="title">Ordem Alfabética</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setSelectedPreacher('all');
                    setSelectedSeries('all');
                    setSortBy('recent');
                  }}
                  className="hover:bg-gray-100 transition-elegant"
                >
                  Limpar Filtros
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resultados */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {filteredMessages.length === MOCK_MESSAGES.length
              ? 'Todas as Mensagens'
              : `${filteredMessages.length} ${
                  filteredMessages.length === 1 ? 'Resultado' : 'Resultados'
                }`}
          </h2>
        </div>

        {/* Grid de Mensagens */}
        {filteredMessages.length === 0 ? (
          <Card className="shadow-elegant">
            <CardContent className="p-12 text-center">
              <Video className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Nenhuma mensagem encontrada
              </h3>
              <p className="text-gray-600 mb-6">
                Tente ajustar os filtros ou realizar uma nova busca
              </p>
              <Button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedPreacher('all');
                  setSelectedSeries('all');
                }}
                className="bg-white text-black border border-gray-200 hover:bg-gray-100 transition-elegant shadow-sm"
              >
                Limpar Filtros
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMessages.map((message) => (
              <Card
                key={message.id}
                className="overflow-hidden hover:shadow-modern transition-elegant hover-lift group"
              >
                <div className="relative aspect-video bg-gradient-bg-dark">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <PlayCircle className="h-12 w-12 text-white opacity-70 group-hover:opacity-100 transition-elegant group-hover:scale-110" />
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                    {message.duration}
                  </div>
                  <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                    <PlayCircle className="h-3 w-3" />
                    {message.views.toLocaleString()}
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs">
                      {CATEGORIES.find((c) => c.value === message.category)?.label}
                    </Badge>
                    {message.series && (
                      <Badge variant="secondary" className="text-xs">
                        {message.series}
                      </Badge>
                    )}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-black transition-elegant line-clamp-2">
                    {message.title}
                  </h3>
                  <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
                    <span className="flex items-center gap-1 line-clamp-1">
                      <User className="h-3 w-3 flex-shrink-0" />
                      {message.preacher}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                    <Calendar className="h-3 w-3" />
                    {new Date(message.date).toLocaleDateString('pt-BR')}
                  </div>
                  <Button
                    asChild
                    size="sm"
                    className="w-full bg-white text-black border border-gray-200 hover:bg-gray-100 transition-elegant shadow-sm"
                  >
                    <Link href={`/messages/${message.slug}`}>
                      <PlayCircle className="h-4 w-4 mr-2" />
                      Assistir
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Paginação - Placeholder */}
        {filteredMessages.length > 0 && (
          <div className="flex justify-center mt-12">
            <div className="flex gap-2">
              <Button
                variant="outline"
                disabled
                className="hover:bg-gray-100 transition-elegant"
              >
                Anterior
              </Button>
              <Button className="bg-black text-white hover:bg-gray-800 transition-elegant">
                1
              </Button>
              <Button variant="outline" className="hover:bg-gray-100 transition-elegant">
                2
              </Button>
              <Button variant="outline" className="hover:bg-gray-100 transition-elegant">
                3
              </Button>
              <Button variant="outline" className="hover:bg-gray-100 transition-elegant">
                Próximo
              </Button>
            </div>
          </div>
        )}

        {/* CTA Final */}
        <Card className="shadow-elegant bg-gradient-bg-primary text-white mt-16">
          <CardContent className="p-8 text-center">
            <Clock className="h-12 w-12 text-white mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-3 text-white">
              Não Perca Nossos Cultos Ao Vivo
            </h3>
            <p className="text-gray-200 mb-6 max-w-xl mx-auto">
              Participe em tempo real e experimente a presença de Deus com nossa comunidade
            </p>
            <Button
              asChild
              className="bg-white text-black border border-gray-200 hover:bg-gray-100 transition-elegant shadow-sm"
            >
              <Link href="/live">
                <Video className="h-4 w-4 mr-2" />
                Ver Transmissão Ao Vivo
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
