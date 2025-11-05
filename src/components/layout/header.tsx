'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      {/* Main navigation */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="h-12 w-32 relative">
              <Image
                src="/Imagens/logo_Prancheta-red.png"
                alt="Redime"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2">
            <NavigationMenu>
              <NavigationMenuList className="gap-1">
                {/* Sobre Nós */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="h-10 px-4 text-sm font-medium">
                    Sobre Nós
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-2 p-4">
                      <ListItem href="/about/new-here" title="Sou Novo Aqui">
                        Bem-vindo! Conheça nossa comunidade
                      </ListItem>
                      <ListItem href="/about/history" title="Nossa História">
                        Como tudo começou
                      </ListItem>
                      <ListItem href="/about/team" title="Nossa Equipe">
                        Conheça quem faz acontecer
                      </ListItem>
                      <ListItem href="/about/leaders" title="Líderes">
                        Nossa liderança pastoral
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Envolva-se */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="h-10 px-4 text-sm font-medium">
                    Envolva-se
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[500px] gap-2 p-4 md:grid-cols-2">
                      <ListItem href="/get-involved/membership" title="Torne-se Membro">
                        Faça parte da nossa família
                      </ListItem>
                      <ListItem href="/get-involved/volunteer" title="Seja Voluntário">
                        Sirva com seus dons
                      </ListItem>
                      <ListItem href="/get-involved/baptism" title="Batismo">
                        Dê seu próximo passo de fé
                      </ListItem>
                      <ListItem href="/ministries" title="Ministérios">
                        Encontre seu lugar
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Recursos */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="h-10 px-4 text-sm font-medium">
                    Recursos
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[450px] gap-2 p-4 md:grid-cols-2">
                      <ListItem href="/messages" title="Mensagens">
                        Assista sermões anteriores
                      </ListItem>
                      <ListItem href="/courses" title="Cursos">
                        Aprenda e cresça na fé
                      </ListItem>
                      <ListItem href="/podcast" title="Podcast">
                        Ouça onde estiver
                      </ListItem>
                      <ListItem href="/blog" title="Blog">
                        Artigos e notícias
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Links simples */}
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/events" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                      Eventos
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/prayer-room" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                      Sala de Oração
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/live" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                      Ao Vivo
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Button asChild size="default" className="ml-4">
              <Link href="/donate">Doar</Link>
            </Button>

            <Button asChild size="default" variant="outline" className="ml-2">
              <Link href="/auth/login">Login</Link>
            </Button>
          </nav>

          {/* Mobile menu button */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-6 mt-8">
                <Link
                  href="/"
                  className="text-lg font-semibold hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Início
                </Link>

                <div className="space-y-3">
                  <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                    Sobre Nós
                  </h3>
                  <div className="flex flex-col gap-3 pl-4 border-l-2 border-gray-200">
                    <Link
                      href="/about/new-here"
                      className="text-sm hover:text-primary transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sou Novo Aqui
                    </Link>
                    <Link
                      href="/about/history"
                      className="text-sm hover:text-primary transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Nossa História
                    </Link>
                    <Link
                      href="/about/team"
                      className="text-sm hover:text-primary transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Nossa Equipe
                    </Link>
                    <Link
                      href="/about/leaders"
                      className="text-sm hover:text-primary transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Líderes
                    </Link>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                    Envolva-se
                  </h3>
                  <div className="flex flex-col gap-3 pl-4 border-l-2 border-gray-200">
                    <Link
                      href="/get-involved/membership"
                      className="text-sm hover:text-primary transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Torne-se Membro
                    </Link>
                    <Link
                      href="/get-involved/volunteer"
                      className="text-sm hover:text-primary transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Seja Voluntário
                    </Link>
                    <Link
                      href="/get-involved/baptism"
                      className="text-sm hover:text-primary transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Batismo
                    </Link>
                    <Link
                      href="/ministries"
                      className="text-sm hover:text-primary transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Ministérios
                    </Link>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                    Recursos
                  </h3>
                  <div className="flex flex-col gap-3 pl-4 border-l-2 border-gray-200">
                    <Link
                      href="/messages"
                      className="text-sm hover:text-primary transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Mensagens
                    </Link>
                    <Link
                      href="/courses"
                      className="text-sm hover:text-primary transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Cursos
                    </Link>
                    <Link
                      href="/podcast"
                      className="text-sm hover:text-primary transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Podcast
                    </Link>
                    <Link
                      href="/blog"
                      className="text-sm hover:text-primary transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Blog
                    </Link>
                  </div>
                </div>

                <div className="border-t pt-4 space-y-3">
                  <Link
                    href="/events"
                    className="block text-base font-medium hover:text-primary transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Eventos
                  </Link>
                  <Link
                    href="/prayer-room"
                    className="block text-base font-medium hover:text-primary transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sala de Oração
                  </Link>
                  <Link
                    href="/live"
                    className="block text-base font-medium hover:text-primary transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Ao Vivo
                  </Link>
                </div>

                <div className="space-y-3">
                  <Button asChild className="w-full" size="lg">
                    <Link href="/donate" onClick={() => setIsMobileMenuOpen(false)}>
                      Doar
                    </Link>
                  </Button>

                  <Button asChild className="w-full" size="lg" variant="outline">
                    <Link href="/auth/login" onClick={() => setIsMobileMenuOpen(false)}>
                      Login
                    </Link>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

const ListItem = ({
  className,
  title,
  children,
  href,
  ...props
}: {
  className?: string;
  title: string;
  children: React.ReactNode;
  href: string;
}) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900',
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
};
