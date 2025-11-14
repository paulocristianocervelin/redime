'use client';

import { use, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Video,
  Calendar,
  User,
  PlayCircle,
  Share2,
  Download,
  BookOpen,
  ChevronLeft,
  Clock,
  Eye,
} from 'lucide-react';
import Link from 'next/link';

// Mock de dados (substituir com dados reais da API)
const MOCK_MESSAGE = {
  id: 1,
  slug: 'poder-da-oracao',
  title: 'O Poder da Oração',
  preacher: 'Pastor João Silva',
  date: '2025-11-03',
  series: 'Vida de Oração',
  category: 'SERMON',
  duration: '45:32',
  views: 1234,
  videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Substituir com URL real
  description:
    'Nesta poderosa mensagem, exploramos o impacto transformador da oração em nossa vida diária. Descubra como desenvolver uma vida de oração consistente e eficaz que move o coração de Deus.',
  scripture: 'Mateus 6:5-13; Tiago 5:16',
  notes: [
    'A oração é comunicação íntima com Deus',
    'Persistência na oração traz resultados',
    'Orar segundo a vontade de Deus',
    'O poder da oração em comunidade',
  ],
  resources: [
    { name: 'Notas do Sermão (PDF)', url: '#' },
    { name: 'Guia de Estudo em Grupo', url: '#' },
  ],
};

const RELATED_MESSAGES = [
  {
    id: 2,
    slug: 'fe-que-move-montanhas',
    title: 'Fé que Move Montanhas',
    preacher: 'Pastora Maria Santos',
    category: 'TEACHING',
    duration: '52:18',
  },
  {
    id: 3,
    slug: 'amor-sem-limites',
    title: 'Amor Sem Limites',
    preacher: 'Pastor João Silva',
    category: 'SERMON',
    duration: '38:45',
  },
  {
    id: 4,
    slug: 'gratidao-em-tudo',
    title: 'Gratidão em Tudo',
    preacher: 'Pastor Carlos Oliveira',
    category: 'DEVOTIONAL',
    duration: '28:15',
  },
];

const CATEGORIES: Record<string, string> = {
  SERMON: 'Sermão',
  TEACHING: 'Ensino',
  DEVOTIONAL: 'Devocional',
  TESTIMONY: 'Testemunho',
};

export default function MessagePage({ params }: { params: Promise<{ slug: string }> }) {
  use(params); // Resolver params para Next.js 15
  const [copied, setCopied] = useState(false);

  // TODO: Buscar dados da mensagem via API usando o slug
  const message = MOCK_MESSAGE;

  const handleShare = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Erro ao copiar:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-bg-gray-soft">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="hover:bg-gray-200 transition-elegant"
          >
            <Link href="/messages">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Voltar para Mensagens
            </Link>
          </Button>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Conteúdo Principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Player de Vídeo */}
            <Card className="shadow-elegant overflow-hidden">
              <CardContent className="p-0">
                <div className="relative w-full aspect-video bg-black">
                  <iframe
                    className="w-full h-full"
                    src={message.videoUrl}
                    title={message.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              </CardContent>
            </Card>

            {/* Informações da Mensagem */}
            <Card className="shadow-elegant">
              <CardContent className="p-6 space-y-6">
                {/* Badges e Título */}
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <Badge variant="outline">{CATEGORIES[message.category]}</Badge>
                    {message.series && <Badge variant="secondary">{message.series}</Badge>}
                    <div className="flex items-center gap-1 text-sm text-gray-500 ml-auto">
                      <Eye className="h-4 w-4" />
                      {message.views.toLocaleString()} visualizações
                    </div>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    {message.title}
                  </h1>
                </div>

                {/* Metadata */}
                <div className="grid sm:grid-cols-3 gap-4 py-4 border-y border-gray-200">
                  <div className="flex items-center gap-2 text-gray-700">
                    <User className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-xs text-gray-500">Pregador</p>
                      <p className="font-medium">{message.preacher}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Calendar className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-xs text-gray-500">Data</p>
                      <p className="font-medium">
                        {new Date(message.date).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Clock className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-xs text-gray-500">Duração</p>
                      <p className="font-medium">{message.duration}</p>
                    </div>
                  </div>
                </div>

                {/* Ações */}
                <div className="flex flex-wrap gap-3">
                  <Button
                    onClick={handleShare}
                    variant="outline"
                    className="flex-1 sm:flex-initial hover:bg-gray-200 transition-elegant"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    {copied ? 'Link Copiado!' : 'Compartilhar'}
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 sm:flex-initial hover:bg-gray-200 transition-elegant"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Baixar Áudio
                  </Button>
                </div>

                <Separator />

                {/* Descrição */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Sobre esta mensagem</h3>
                  <p className="text-gray-700 leading-relaxed">{message.description}</p>
                </div>

                {/* Escrituras */}
                {message.scripture && (
                  <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-l-black">
                    <div className="flex items-start gap-2">
                      <BookOpen className="h-5 w-5 text-black flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Escrituras Referenciadas</p>
                        <p className="font-medium text-gray-900">{message.scripture}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Notas da Mensagem */}
                {message.notes.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Pontos Principais</h3>
                    <ul className="space-y-2">
                      {message.notes.map((note, index) => (
                        <li key={index} className="flex items-start gap-2 text-gray-700">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-black text-white text-xs flex items-center justify-center mt-0.5">
                            {index + 1}
                          </span>
                          <span>{note}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Recursos */}
                {message.resources.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Recursos para Download</h3>
                    <div className="space-y-2">
                      {message.resources.map((resource, index) => (
                        <a
                          key={index}
                          href={resource.url}
                          className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-elegant group"
                        >
                          <span className="text-gray-900 group-hover:text-black font-medium">
                            {resource.name}
                          </span>
                          <Download className="h-4 w-4 text-gray-500 group-hover:text-black transition-elegant" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Chamada para Ação */}
            <Card className="shadow-elegant bg-gradient-bg-primary text-white">
              <CardContent className="p-6 text-center">
                <PlayCircle className="h-12 w-12 text-white mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-white">
                  Assista Ao Vivo
                </h3>
                <p className="text-gray-200 mb-6 text-sm">
                  Participe dos nossos cultos em tempo real e experimente a presença de Deus
                </p>
                <Button
                  asChild
                  className="w-full bg-white text-black border border-gray-200 hover:bg-gray-200 transition-elegant shadow-sm"
                >
                  <Link href="/live">
                    <Video className="h-4 w-4 mr-2" />
                    Ir para Transmissão
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Mensagens Relacionadas */}
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="text-gray-900">Mensagens Relacionadas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {RELATED_MESSAGES.map((related) => (
                  <Link
                    key={related.id}
                    href={`/messages/${related.slug}`}
                    className="block group"
                  >
                    <div className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-elegant">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-16 h-16 bg-gradient-bg-dark rounded flex items-center justify-center">
                          <PlayCircle className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <Badge variant="outline" className="text-xs mb-2">
                            {CATEGORIES[related.category]}
                          </Badge>
                          <h4 className="font-semibold text-gray-900 group-hover:text-black transition-elegant line-clamp-2 mb-1">
                            {related.title}
                          </h4>
                          <p className="text-sm text-gray-600 line-clamp-1">
                            {related.preacher}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">{related.duration}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>

            {/* Série Completa */}
            {message.series && (
              <Card className="shadow-elegant">
                <CardHeader>
                  <CardTitle className="text-gray-900">Série: {message.series}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Esta mensagem faz parte de uma série completa de ensinos
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full hover:bg-gray-200 transition-elegant"
                  >
                    <Link href={`/messages?series=${encodeURIComponent(message.series)}`}>
                      Ver Série Completa
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Mais do Pregador */}
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="text-gray-900">Mais de {message.preacher}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Veja outras mensagens poderosas deste pregador
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="w-full hover:bg-gray-200 transition-elegant"
                >
                  <Link href={`/messages?preacher=${encodeURIComponent(message.preacher)}`}>
                    Ver Todas as Mensagens
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
