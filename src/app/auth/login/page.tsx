'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao fazer login');
      }

      router.push('/admin/dashboard');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient Background - Inspirado no Upper Room */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        {/* Overlay Pattern */}
        <div className="absolute inset-0 opacity-20 bg-[url('/prayer-room-bg.jpg')] bg-cover bg-center" />

        {/* Red Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-primary/10" />

        {/* Animated Gradient Circles */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-4000" />
      </div>

      {/* Login Card */}
      <Card className="relative z-10 w-full max-w-md mx-4 glass border-gray-800 shadow-2xl">
        <CardHeader className="space-y-4 text-center">
          {/* Logo */}
          <div className="flex justify-center mb-2">
            <div className="relative w-48 h-20">
              <Image
                src="/Imagens/logo_Prancheta-red.png"
                alt="Missão Redime Chapecó"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          <CardTitle className="text-2xl font-bold">Painel Administrativo</CardTitle>
          <CardDescription className="text-gray-600">
            Faça login para acessar o sistema
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="flex items-center gap-2 p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                className="bg-white/50 backdrop-blur-sm"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                className="bg-white/50 backdrop-blur-sm"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Entrando...
                </>
              ) : (
                'Entrar'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-sm text-gray-600 hover:text-primary transition-colors"
            >
              Voltar ao site
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Bottom Brand */}
      <div className="absolute bottom-8 left-0 right-0 text-center z-10">
        <p className="text-sm text-gray-400">
          Missão Redime Chapecó
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Amor • Verdade • Mesa & Discipulado
        </p>
      </div>
    </div>
  );
}
