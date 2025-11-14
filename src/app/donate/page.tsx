import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Heart,
  CheckCircle2,
} from 'lucide-react';

export default function DonatePage() {

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header Section */}
      <section className="gradient-bg-dark text-white py-16">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <Heart className="h-16 w-16 mx-auto text-white" />
            <h1 className="text-4xl md:text-5xl font-bold">Doe com Generosidade</h1>
            <p className="text-xl text-gray-200">
              Sua contribuição faz a diferença no Reino de Deus
            </p>
            <p className="text-gray-300">
              &quot;Cada um contribua segundo propôs no seu coração, não com tristeza ou por
              necessidade; porque Deus ama ao que dá com alegria.&quot; - 2 Coríntios 9:7
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {/* 1. Seu Impacto */}
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle>Seu Impacto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <strong>Sustento Pastoral:</strong> Apoio aos líderes que servem nossa
                    comunidade
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <strong>Ação Social:</strong> Ajuda a famílias e pessoas necessitadas
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <strong>Evangelismo:</strong> Levar a mensagem de Cristo a mais pessoas
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <strong>Estrutura:</strong> Manutenção e expansão de nossa igreja
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 2. Formas de Doação */}
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle>Formas de Doação</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div>
                  <strong className="block mb-2">Razão Social:</strong>
                  <p className="text-muted-foreground">
                    IGREJA COMUNIDADE CRISTA MISSAO REDIME
                  </p>
                </div>

                <Separator />

                <div>
                  <strong className="block mb-2">Transferência Bancária:</strong>
                  <p className="text-muted-foreground">
                    Banco Cooperativo Sicredi S.A.
                    <br />
                    Banco: 748
                    <br />
                    Agência: 0258
                    <br />
                    Conta: 00543-4
                  </p>
                </div>

                <Separator />

                <div>
                  <strong className="block mb-2">PIX:</strong>
                  <p className="text-muted-foreground">
                    CNPJ: 49.487.014/0001-70
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
