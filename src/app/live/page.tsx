import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Video,
  Calendar,
  Clock,
  MapPin,
  Users,
  Radio,
  AlertCircle,
  MessageCircle,
} from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Transmissão Ao Vivo | Missão Redime Chapecó',
  description:
    'Assista aos cultos e eventos ao vivo da Missão Redime Chapecó. Participe da nossa comunidade online.',
  keywords: [
    'transmissão ao vivo',
    'culto online',
    'igreja ao vivo',
    'redime chapecó',
    'live streaming',
  ],
};

// Horários de transmissão (configurável)
const SCHEDULE = [
  {
    day: 'Domingo',
    times: ['09:00', '18:00'],
    description: 'Culto de Celebração',
  },
  {
    day: 'Quarta-feira',
    times: ['19:30'],
    description: 'Culto de Oração e Ensino',
  },
  {
    day: 'Sexta-feira',
    times: ['20:00'],
    description: 'Culto Jovem',
  },
];

export default function LivePage() {
  // TODO: Integrar com API para verificar se há transmissão ao vivo
  const isLive = false; // Alterar dinamicamente com dados reais

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
              <Radio className="h-4 w-4 mr-2 inline" />
              Transmissão Ao Vivo
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              Participe dos Nossos Cultos Online
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Junte-se a nós em tempo real, onde quer que você esteja. Experimente a presença de
              Deus e a comunhão com nossa família.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Player Principal */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-elegant overflow-hidden">
              <CardContent className="p-0">
                {/* Player de Vídeo */}
                <div className="relative w-full aspect-video bg-black">
                  {isLive ? (
                    <>
                      {/* Badge de AO VIVO */}
                      <div className="absolute top-4 left-4 z-10">
                        <Badge className="bg-red-600 text-white border-0 px-3 py-1.5 text-sm font-semibold animate-pulse">
                          <span className="flex items-center gap-2">
                            <span className="h-2 w-2 bg-white rounded-full"></span>
                            AO VIVO
                          </span>
                        </Badge>
                      </div>

                      {/* Player do YouTube - Substituir com URL real */}
                      <iframe
                        className="w-full h-full"
                        src="https://www.youtube.com/embed/live_stream?channel=YOUR_CHANNEL_ID&autoplay=1"
                        title="Transmissão Ao Vivo - Missão Redime Chapecó"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      ></iframe>
                    </>
                  ) : (
                    // Placeholder quando não há transmissão
                    <div className="w-full h-full flex flex-col items-center justify-center text-white p-8">
                      <Video className="h-20 w-20 text-gray-500 mb-6" />
                      <h3 className="text-2xl font-semibold mb-3 text-gray-300">
                        Sem Transmissão no Momento
                      </h3>
                      <p className="text-gray-400 text-center max-w-md mb-6">
                        Não há transmissão ao vivo agora. Confira nossos horários abaixo e volte no
                        próximo culto!
                      </p>
                      <Button
                        asChild
                        className="bg-white text-black border border-gray-200 hover:bg-gray-200 transition-elegant shadow-sm"
                      >
                        <Link href="/messages">Ver Mensagens Anteriores</Link>
                      </Button>
                    </div>
                  )}
                </div>

                {/* Informações do Culto Atual */}
                {isLive && (
                  <div className="p-6 space-y-4 bg-white">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Culto de Celebração
                      </h2>
                      <p className="text-gray-600">
                        Bem-vindo ao nosso culto! Que a presença de Deus transforme sua vida hoje.
                      </p>
                    </div>

                    <Separator />

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3 text-gray-700">
                        <Calendar className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">Data</p>
                          <p className="font-medium">Domingo, 07 de Novembro</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-gray-700">
                        <Clock className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">Horário</p>
                          <p className="font-medium">18:00</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-gray-700">
                        <MapPin className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">Local</p>
                          <p className="font-medium">Chapecó - SC</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-gray-700">
                        <Users className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">Assistindo</p>
                          <p className="font-medium">125 pessoas</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Chamada para Ação */}
            <Card className="bg-gradient-bg-primary text-white shadow-elegant">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="flex-shrink-0">
                    <MessageCircle className="h-12 w-12 text-white" />
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-xl font-semibold mb-2 text-white">
                      Compartilhe um Pedido de Oração
                    </h3>
                    <p className="text-gray-200">
                      Nossa equipe está pronta para orar por você. Compartilhe suas necessidades
                      conosco.
                    </p>
                  </div>
                  <Button
                    asChild
                    className="bg-white text-black border border-gray-200 hover:bg-gray-200 transition-elegant shadow-sm flex-shrink-0"
                  >
                    <Link href="/prayer-room">Enviar Pedido</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Horários e Informações */}
          <div className="space-y-6">
            {/* Horários de Transmissão */}
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Clock className="h-5 w-5 text-black" />
                  Horários de Transmissão
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {SCHEDULE.map((item, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-elegant"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{item.day}</h4>
                      <Badge variant="outline" className="text-xs">
                        {item.times.length} {item.times.length === 1 ? 'culto' : 'cultos'}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.times.map((time, idx) => (
                        <span
                          key={idx}
                          className="text-sm font-medium text-black bg-gray-100 px-3 py-1 rounded-full"
                        >
                          {time}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Aviso Importante */}
            <Card className="shadow-elegant border-l-4 border-l-black">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-black flex-shrink-0 mt-0.5" />
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">Informações Importantes</h4>
                    <ul className="text-sm text-gray-600 space-y-1.5">
                      <li>• Transmissões iniciam 10 minutos antes</li>
                      <li>• Use fones para melhor experiência</li>
                      <li>• Interaja pelo chat ao vivo</li>
                      <li>• Compartilhe com sua família</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Localização */}
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <MapPin className="h-5 w-5 text-black" />
                  Venha Nos Visitar
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 text-sm">
                  Nada substitui o calor da comunhão presencial. Você é muito bem-vindo em nossos
                  cultos!
                </p>
                <div className="space-y-2 text-sm">
                  <p className="font-medium text-gray-900">Missão Redime Chapecó</p>
                  <p className="text-gray-600">Chapecó - SC</p>
                  <p className="text-gray-600">Santa Catarina, Brasil</p>
                </div>
                <Separator />
                <div className="flex flex-col gap-2">
                  <Button
                    asChild
                    className="w-full bg-white text-black border border-gray-200 hover:bg-gray-200 transition-elegant shadow-sm"
                  >
                    <Link href="/about/new-here">Sou Novo Aqui</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full hover:bg-gray-200 transition-elegant"
                  >
                    <Link href="/events">Ver Próximos Eventos</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Seção de Mensagens Recentes */}
        <section className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Mensagens Recentes</h2>
              <p className="text-gray-600 mt-2">
                Assista novamente aos cultos anteriores e seja edificado
              </p>
            </div>
            <Button
              asChild
              className="bg-white text-black border border-gray-200 hover:bg-gray-200 transition-elegant shadow-sm"
            >
              <Link href="/messages">Ver Todas</Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Cards de mensagens - Placeholder */}
            {[1, 2, 3].map((item) => (
              <Card
                key={item}
                className="overflow-hidden hover:shadow-modern transition-elegant hover-lift group"
              >
                <div className="relative aspect-video bg-gray-200">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Video className="h-12 w-12 text-gray-400" />
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                    45:32
                  </div>
                </div>
                <CardContent className="p-4">
                  <Badge variant="outline" className="mb-2 text-xs">
                    Sermão
                  </Badge>
                  <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-black transition-elegant line-clamp-2">
                    Título da Mensagem {item}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">Pastor João Silva</p>
                  <Button
                    asChild
                    size="sm"
                    className="w-full bg-white text-black border border-gray-200 hover:bg-gray-200 transition-elegant shadow-sm"
                  >
                    <Link href={`/messages/${item}`}>Assistir</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
