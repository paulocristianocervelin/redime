'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Heart,
  Globe,
  Building,
  Lightbulb,
  CreditCard,
  Smartphone,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { toast } from 'sonner';

// Tipos baseados no schema do Prisma
type DonationType = 'GENERAL' | 'MISSIONS' | 'BUILDING' | 'SPECIAL_PROJECT';
type DonationFrequency = 'ONE_TIME' | 'MONTHLY' | 'QUARTERLY' | 'YEARLY';

interface DonationFormData {
  amount: string;
  type: DonationType;
  frequency: DonationFrequency;
  message: string;
  isAnonymous: boolean;
}

export default function DonatePage() {
  const [formData, setFormData] = useState<DonationFormData>({
    amount: '',
    type: 'GENERAL',
    frequency: 'ONE_TIME',
    message: '',
    isAnonymous: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<string | null>(null);

  const predefinedAmounts = ['50', '100', '200', '500'];

  const donationTypes = [
    {
      value: 'GENERAL',
      label: 'Dízimos e Ofertas',
      description: 'Contribua para a obra geral da igreja',
      icon: Heart,
    },
    {
      value: 'MISSIONS',
      label: 'Missões',
      description: 'Apoie o trabalho missionário',
      icon: Globe,
    },
    {
      value: 'BUILDING',
      label: 'Construção',
      description: 'Ajude na expansão da igreja',
      icon: Building,
    },
    {
      value: 'SPECIAL_PROJECT',
      label: 'Projeto Especial',
      description: 'Contribua para projetos específicos',
      icon: Lightbulb,
    },
  ];

  const handleAmountClick = (amount: string) => {
    setSelectedAmount(amount);
    setFormData({ ...formData, amount });
  };

  const handleCustomAmount = (value: string) => {
    setSelectedAmount(null);
    setFormData({ ...formData, amount: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      toast.error('Por favor, insira um valor válido');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/donations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: parseFloat(formData.amount),
          type: formData.type,
          frequency: formData.frequency,
          message: formData.message,
          isAnonymous: formData.isAnonymous,
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao processar doação');
      }

      const data = await response.json();

      toast.success('Doação registrada com sucesso!');

      // Reset form
      setFormData({
        amount: '',
        type: 'GENERAL',
        frequency: 'ONE_TIME',
        message: '',
        isAnonymous: false,
      });
      setSelectedAmount(null);
    } catch (error) {
      toast.error('Erro ao processar sua doação. Tente novamente.');
      console.error('Donation error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Donation Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-elegant">
                <CardHeader>
                  <CardTitle className="text-2xl">Faça sua Doação</CardTitle>
                  <CardDescription>
                    Escolha o valor e a finalidade da sua contribuição
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Donation Type */}
                    <div className="space-y-3">
                      <Label className="text-base font-semibold">Tipo de Doação</Label>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {donationTypes.map((type) => {
                          const Icon = type.icon;
                          return (
                            <button
                              key={type.value}
                              type="button"
                              onClick={() =>
                                setFormData({ ...formData, type: type.value as DonationType })
                              }
                              className={`p-4 border-2 rounded-lg text-left transition-all ${
                                formData.type === type.value
                                  ? 'border-black bg-gray-50'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <Icon className="h-6 w-6 mb-2" />
                              <div className="font-semibold">{type.label}</div>
                              <div className="text-sm text-muted-foreground">
                                {type.description}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <Separator />

                    {/* Frequency */}
                    <div className="space-y-3">
                      <Label className="text-base font-semibold">Frequência</Label>
                      <RadioGroup
                        value={formData.frequency}
                        onValueChange={(value) =>
                          setFormData({ ...formData, frequency: value as DonationFrequency })
                        }
                        className="grid grid-cols-2 sm:grid-cols-4 gap-3"
                      >
                        <div>
                          <RadioGroupItem
                            value="ONE_TIME"
                            id="one-time"
                            className="peer sr-only"
                          />
                          <Label
                            htmlFor="one-time"
                            className="flex flex-col items-center justify-center rounded-lg border-2 border-gray-200 bg-white p-4 hover:bg-gray-50 peer-data-[state=checked]:border-black peer-data-[state=checked]:bg-gray-50 cursor-pointer transition-all"
                          >
                            <span className="text-sm font-semibold">Única</span>
                          </Label>
                        </div>
                        <div>
                          <RadioGroupItem value="MONTHLY" id="monthly" className="peer sr-only" />
                          <Label
                            htmlFor="monthly"
                            className="flex flex-col items-center justify-center rounded-lg border-2 border-gray-200 bg-white p-4 hover:bg-gray-50 peer-data-[state=checked]:border-black peer-data-[state=checked]:bg-gray-50 cursor-pointer transition-all"
                          >
                            <span className="text-sm font-semibold">Mensal</span>
                          </Label>
                        </div>
                        <div>
                          <RadioGroupItem
                            value="QUARTERLY"
                            id="quarterly"
                            className="peer sr-only"
                          />
                          <Label
                            htmlFor="quarterly"
                            className="flex flex-col items-center justify-center rounded-lg border-2 border-gray-200 bg-white p-4 hover:bg-gray-50 peer-data-[state=checked]:border-black peer-data-[state=checked]:bg-gray-50 cursor-pointer transition-all"
                          >
                            <span className="text-sm font-semibold">Trimestral</span>
                          </Label>
                        </div>
                        <div>
                          <RadioGroupItem value="YEARLY" id="yearly" className="peer sr-only" />
                          <Label
                            htmlFor="yearly"
                            className="flex flex-col items-center justify-center rounded-lg border-2 border-gray-200 bg-white p-4 hover:bg-gray-50 peer-data-[state=checked]:border-black peer-data-[state=checked]:bg-gray-50 cursor-pointer transition-all"
                          >
                            <span className="text-sm font-semibold">Anual</span>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <Separator />

                    {/* Amount */}
                    <div className="space-y-3">
                      <Label className="text-base font-semibold">Valor da Doação (R$)</Label>
                      <div className="grid grid-cols-4 gap-3">
                        {predefinedAmounts.map((amount) => (
                          <Button
                            key={amount}
                            type="button"
                            variant={selectedAmount === amount ? 'default' : 'outline'}
                            onClick={() => handleAmountClick(amount)}
                            className={
                              selectedAmount === amount
                                ? 'bg-black text-white'
                                : 'hover:bg-gray-100'
                            }
                          >
                            R$ {amount}
                          </Button>
                        ))}
                      </div>
                      <div>
                        <Label htmlFor="custom-amount" className="text-sm text-muted-foreground">
                          Ou insira um valor personalizado
                        </Label>
                        <Input
                          id="custom-amount"
                          type="number"
                          placeholder="0,00"
                          value={formData.amount}
                          onChange={(e) => handleCustomAmount(e.target.value)}
                          className="mt-2"
                          min="0"
                          step="0.01"
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <Label htmlFor="message">Mensagem (opcional)</Label>
                      <Textarea
                        id="message"
                        placeholder="Deixe uma mensagem de fé e esperança..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={4}
                      />
                    </div>

                    {/* Anonymous */}
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="anonymous"
                        checked={formData.isAnonymous}
                        onCheckedChange={(checked) =>
                          setFormData({ ...formData, isAnonymous: checked as boolean })
                        }
                      />
                      <Label
                        htmlFor="anonymous"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Fazer doação anônima
                      </Label>
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-black text-white hover:bg-gray-800 text-lg py-6"
                      size="lg"
                    >
                      {isSubmitting ? (
                        'Processando...'
                      ) : (
                        <>
                          Continuar para Pagamento
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Impact Card */}
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

              {/* Payment Methods */}
              <Card className="shadow-elegant">
                <CardHeader>
                  <CardTitle>Formas de Pagamento</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <CreditCard className="h-5 w-5 text-gray-600" />
                    <span>Cartão de Crédito</span>
                    <Badge variant="secondary" className="ml-auto">
                      Em breve
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Smartphone className="h-5 w-5 text-gray-600" />
                    <span>PIX</span>
                    <Badge variant="secondary" className="ml-auto">
                      Em breve
                    </Badge>
                  </div>
                  <Separator />
                  <p className="text-xs text-muted-foreground">
                    Todas as transações são seguras e criptografadas
                  </p>
                </CardContent>
              </Card>

              {/* Other Ways to Give */}
              <Card className="shadow-elegant">
                <CardHeader>
                  <CardTitle>Outras Formas de Doar</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div>
                    <strong>Transferência Bancária:</strong>
                    <p className="text-muted-foreground mt-1">
                      Banco: Banco do Brasil
                      <br />
                      Agência: 0000-0
                      <br />
                      Conta: 00000-0
                    </p>
                  </div>
                  <Separator />
                  <div>
                    <strong>PIX:</strong>
                    <p className="text-muted-foreground mt-1">CNPJ: 00.000.000/0001-00</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
