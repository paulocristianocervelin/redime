import Link from 'next/link';
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
      <section className="relative bg-gradient-to-b from-black to-gray-900 text-white py-20 md:py-32">
        <div className="absolute inset-0 bg-[url('/prayer-room-bg.jpg')] bg-cover bg-center opacity-20" />
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <Badge variant="outline" className="border-primary text-primary bg-primary/10">
              Missão Redime Chapecó
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Amor, Verdade,
              <br />
              <span className="text-primary">Mesa & Discipulado</span>
            </h1>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" asChild className="text-lg">
                <Link href="/live">
                  <Play className="mr-2 h-5 w-5" />
                  Transmissão Ao Vivo
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg border-white text-white hover:bg-white hover:text-black">
                <Link href="/messages">
                  Ver Mensagens
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Live Stream & Prayer Room Section */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gradient-to-br from-primary to-red-700 flex items-center justify-center">
                <Play className="h-20 w-20 text-white" />
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">Transmissão Ao Vivo</CardTitle>
                <CardDescription>
                  Participe dos nossos cultos e momentos de adoração em tempo real
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link href="/live">Assistir Agora</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                <Heart className="h-20 w-20 text-primary" />
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">Sala de Oração</CardTitle>
                <CardDescription>
                  Adoração e oração 24/7 - Junte-se a nós em comunhão contínua
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/prayer-room">Entrar na Sala</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Latest Messages */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Últimas Mensagens</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Assista aos sermões mais recentes e seja edificado pela Palavra de Deus
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  <Play className="h-12 w-12 text-gray-500" />
                </div>
                <CardHeader>
                  <Badge className="w-fit mb-2">Sermão</Badge>
                  <CardTitle>Título da Mensagem {i}</CardTitle>
                  <CardDescription>Pastor João Silva • 15 de Outubro, 2024</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="ghost" className="w-full">
                    <Link href={`/messages/${i}`}>Assistir Mensagem</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button asChild variant="outline" size="lg">
              <Link href="/messages">Ver Todas as Mensagens</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Destaques</h2>
            <p className="text-lg text-muted-foreground">
              Descubra as oportunidades de crescimento e envolvimento
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Cursos Online</CardTitle>
                <CardDescription>
                  Aprenda e cresça na fé com nossos cursos práticos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="link">
                  <Link href="/courses">Explorar Cursos</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Eventos</CardTitle>
                <CardDescription>
                  Participe de conferências e momentos especiais
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="link">
                  <Link href="/events">Ver Eventos</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Music className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Música</CardTitle>
                <CardDescription>
                  Ouça nossas músicas e adorações ao vivo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="link">
                  <Link href="/ministries/music">Conhecer Música</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Podcast className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Podcast</CardTitle>
                <CardDescription>
                  Escute onde estiver, quando quiser
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="link">
                  <Link href="/podcast">Ouvir Podcast</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Get Involved CTA */}
      <section className="py-12 md:py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Envolva-se</h2>
            <p className="text-xl opacity-90">
              Seja parte de uma comunidade vibrante e comprometida com o Reino de Deus
            </p>
            <div className="grid sm:grid-cols-3 gap-4 pt-4">
              <Card className="bg-white text-foreground">
                <CardHeader>
                  <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                  <CardTitle>Torne-se Membro</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/get-involved/membership">Saiba Mais</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white text-foreground">
                <CardHeader>
                  <Heart className="h-8 w-8 text-primary mx-auto mb-2" />
                  <CardTitle>Seja Voluntário</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/get-involved/volunteer">Servir</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white text-foreground">
                <CardHeader>
                  <BookOpen className="h-8 w-8 text-primary mx-auto mb-2" />
                  <CardTitle>Conheça Mais</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/about/new-here">Sou Novo</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Blog/News Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Notícias & Blog</h2>
              <p className="text-lg text-muted-foreground">
                Fique por dentro das novidades da comunidade
              </p>
            </div>
            <Button asChild variant="outline">
              <Link href="/blog">Ver Tudo</Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300" />
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
                  <Button asChild variant="ghost">
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
