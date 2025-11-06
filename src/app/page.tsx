import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Play,
  Heart,
  Users,
  BookOpen,
  Calendar,
  Music,
  GraduationCap,
  Podcast,
} from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative gradient-bg-dark text-white py-8 md:py-12">
        <div className="absolute inset-0 bg-[url('/prayer-room-bg.jpg')] bg-cover bg-center opacity-20" />
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <div className="relative w-96 h-40 md:w-[600px] md:h-60 lg:w-[800px] lg:h-80">
                <Image
                  src="/Imagens/logo_Prancheta-w.png"
                  alt="Missão Redime Chapecó"
                  fill
                  className="object-contain brightness-0 invert"
                  priority
                />
              </div>
            </div>

            <h1 className="text-lg md:text-2xl lg:text-3xl font-bold tracking-tight text-white">
              Amor, Verdade,
              <br />
              <span className="text-gray-200">Mesa & Discipulado</span>
            </h1>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" asChild className="text-lg bg-white text-black hover:bg-gray-100 shadow-modern transition-elegant">
                <Link href="/live">
                  <Play className="mr-2 h-5 w-5" />
                  Transmissão Ao Vivo
                </Link>
              </Button>
              <Button size="lg" asChild className="text-lg bg-white text-black border border-white hover:bg-gray-100 transition-elegant shadow-modern">
                <Link href="/messages">
                  Ver Mensagens
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Live Stream & Prayer Room Section */}
      <section className="py-12 md:py-20 gradient-bg-gray-soft">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="overflow-hidden hover:shadow-elegant transition-elegant hover-lift">
              <div className="aspect-video gradient-bg-primary flex items-center justify-center">
                <Play className="h-20 w-20 text-white" />
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">Transmissão Ao Vivo</CardTitle>
                <CardDescription>
                  Participe dos nossos cultos e momentos de adoração em tempo real
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full bg-white text-black border border-gray-200 hover:bg-gray-100 transition-elegant shadow-sm">
                  <Link href="/live">Assistir Agora</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-elegant transition-elegant hover-lift">
              <div className="aspect-video gradient-bg-dark flex items-center justify-center">
                <Heart className="h-20 w-20 text-white" />
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">Sala de Oração</CardTitle>
                <CardDescription>
                  Adoração e oração 24/7 - Junte-se a nós em comunhão contínua
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full bg-white text-black border border-gray-200 hover:bg-gray-100 transition-elegant shadow-sm">
                  <Link href="/prayer-room">Entrar na Sala</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Latest Messages */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Últimas Mensagens</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Assista aos sermões mais recentes e seja edificado pela Palavra de Deus
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden hover:shadow-elegant transition-elegant hover-lift">
                <div className="aspect-video bg-gray-100 flex items-center justify-center">
                  <Play className="h-12 w-12 text-gray-700" />
                </div>
                <CardHeader>
                  <Badge className="w-fit mb-2">Sermão</Badge>
                  <CardTitle>Título da Mensagem {i}</CardTitle>
                  <CardDescription>Pastor João Silva • 15 de Outubro, 2024</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full bg-white text-black border border-gray-200 hover:bg-gray-100 transition-elegant shadow-sm">
                    <Link href={`/messages/${i}`}>Assistir Mensagem</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button asChild size="lg" className="bg-white text-black border border-gray-200 hover:bg-gray-100 transition-elegant shadow-sm">
              <Link href="/messages">Ver Todas as Mensagens</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-12 md:py-20 gradient-bg-gray-soft">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text-dark">Destaques</h2>
            <p className="text-lg text-muted-foreground">
              Descubra as oportunidades de crescimento e envolvimento
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-elegant transition-elegant hover-lift">
              <CardHeader>
                <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-black flex items-center justify-center">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Cursos Online</CardTitle>
                <CardDescription>
                  Aprenda e cresça na fé com nossos cursos práticos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="bg-white text-black border border-gray-200 hover:bg-gray-100 transition-elegant shadow-sm">
                  <Link href="/courses">Explorar Cursos</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-elegant transition-elegant hover-lift">
              <CardHeader>
                <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-black flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Eventos</CardTitle>
                <CardDescription>
                  Participe de conferências e momentos especiais
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="bg-white text-black border border-gray-200 hover:bg-gray-100 transition-elegant shadow-sm">
                  <Link href="/events">Ver Eventos</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-elegant transition-elegant hover-lift">
              <CardHeader>
                <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-black flex items-center justify-center">
                  <Music className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Música</CardTitle>
                <CardDescription>
                  Ouça nossas músicas e adorações ao vivo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="bg-white text-black border border-gray-200 hover:bg-gray-100 transition-elegant shadow-sm">
                  <Link href="/ministries/music">Conhecer Música</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-elegant transition-elegant hover-lift">
              <CardHeader>
                <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-black flex items-center justify-center">
                  <Podcast className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Podcast</CardTitle>
                <CardDescription>
                  Escute onde estiver, quando quiser
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="bg-white text-black border border-gray-200 hover:bg-gray-100 transition-elegant shadow-sm">
                  <Link href="/podcast">Ouvir Podcast</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Get Involved CTA */}
      <section className="py-12 md:py-20 gradient-bg-primary text-white">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Envolva-se</h2>
            <p className="text-xl text-white/95">
              Seja parte de uma comunidade vibrante e comprometida com o Reino de Deus
            </p>
            <div className="grid sm:grid-cols-3 gap-6 pt-4">
              <Card className="bg-white text-foreground border-white hover:shadow-modern transition-elegant hover-lift shadow-elegant">
                <CardHeader className="text-center pb-3">
                  <Users className="h-10 w-10 text-black mx-auto mb-3" />
                  <CardTitle className="text-lg font-semibold text-black">Torne-se Membro</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button asChild className="w-full bg-white text-black border border-gray-200 hover:bg-gray-100 transition-elegant shadow-sm">
                    <Link href="/get-involved/membership">Saiba Mais</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white text-foreground border-white hover:shadow-modern transition-elegant hover-lift shadow-elegant">
                <CardHeader className="text-center pb-3">
                  <Heart className="h-10 w-10 text-black mx-auto mb-3" />
                  <CardTitle className="text-lg font-semibold text-black">Seja Voluntário</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button asChild className="w-full bg-white text-black border border-gray-200 hover:bg-gray-100 transition-elegant shadow-sm">
                    <Link href="/get-involved/volunteer">Servir</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white text-foreground border-white hover:shadow-modern transition-elegant hover-lift shadow-elegant">
                <CardHeader className="text-center pb-3">
                  <BookOpen className="h-10 w-10 text-black mx-auto mb-3" />
                  <CardTitle className="text-lg font-semibold text-black">Conheça Mais</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button asChild className="w-full bg-white text-black border border-gray-200 hover:bg-gray-100 transition-elegant shadow-sm">
                    <Link href="/about/new-here">Sou Novo</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Blog/News Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Notícias & Blog</h2>
              <p className="text-lg text-muted-foreground">
                Fique por dentro das novidades da comunidade
              </p>
            </div>
            <Button asChild className="bg-white text-black border border-gray-200 hover:bg-gray-100 transition-elegant shadow-sm">
              <Link href="/blog">Ver Tudo</Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden hover:shadow-elegant transition-elegant hover-lift">
                <div className="aspect-video bg-gray-100" />
                <CardHeader>
                  <Badge className="w-fit mb-2" variant="secondary">
                    Notícia
                  </Badge>
                  <CardTitle className="line-clamp-2">
                    Título da Notícia ou Artigo do Blog {i}
                  </CardTitle>
                  <CardDescription>10 de Novembro, 2024</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                    Resumo breve da notícia ou artigo que será exibido aqui para dar uma prévia do
                    conteúdo completo...
                  </p>
                  <Button asChild className="bg-white text-black border border-gray-200 hover:bg-gray-100 transition-elegant shadow-sm">
                    <Link href={`/blog/${i}`}>Ler Mais</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
