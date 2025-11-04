# Contexto de Continuidade - Projeto Redime

**Última Atualização**: 04/11/2024

## Visão Geral do Projeto

Site da **Missão Redime Chapecó** - Uma comunidade transformada pela presença de Deus, fundamentada nos pilares: **AMOR • VERDADE • MESA & DISCIPULADO**.

Inspirado no layout do Upper Room (https://upperroom.co/), com foco em comunidade, adoração contínua e envolvimento dos membros.

## Identidade da Missão

- **Nome**: Missão Redime Chapecó
- **Localização**: Chapecó - SC, Santa Catarina, Brasil
- **Lema**: AMOR • VERDADE • MESA & DISCIPULADO
- **Cores**: Preto, Vermelho e Branco

## Tecnologias Utilizadas

- **Framework**: Next.js 15.5.2 com App Router e Server Components
- **UI**: React 19.1.0 + TypeScript 5
- **Banco de Dados**: PostgreSQL com Prisma ORM 6.18.0
- **Autenticação**: JWT + bcryptjs
- **Styling**: Tailwind CSS 4 + Shadcn/ui + Radix UI
- **Ícones**: Lucide React
- **Temas**: next-themes (suporte dark/light mode)
- **Fontes**: Inter (Google Fonts)

## Estrutura Atual do Projeto

### Database (PostgreSQL + Prisma)
**Status**: ✅ Configurado e funcional

**Configuração**:
- Connection string em `.env`: `postgresql://postgres:@123qwe@safexml.com.br:5433/safehml?schema=redime`
- JWT_SECRET: `@plpsc2025Redime#`
- Schema completo criado em `/prisma/schema.prisma`

**Modelos criados** (15 modelos):
- User (com roles: ADMIN, LEADER, VOLUNTEER, MEMBER)
- MemberProfile
- Message/Sermon
- Event & EventRegistration
- PrayerRequest
- Course & Lesson & CourseEnrollment
- BlogPost
- Comment
- Donation
- Ministry
- TeamMember
- SiteSettings
- LiveStream

**Cliente Prisma**: Configurado em `/src/lib/prisma.ts` com singleton pattern

### Design System
**Status**: ✅ Completo e otimizado

**Cores Principais** (HSL):
- **Primary (Vermelho)**: `0 100% 35%`
- **Accent (Vermelho claro)**: `0 100% 45%`
- **Foreground (Preto)**: `0 0% 10%`
- **Background (Branco)**: `0 0% 100%`
- **Cinzas**: 20%, 50%, 95%

**Variáveis CSS**: Definidas diretamente sem recursividade em `@theme inline`

**Efeitos Visuais Implementados**:
- `.glass` - Glass morphism com backdrop blur
- `.glass-dark` - Versão dark do efeito vidro
- `.transition-smooth` - Transições com cubic-bezier
- `.shadow-subtle` - Sombras delicadas
- `.shadow-elegant` - Sombras elegantes
- `.gradient-text` - Texto com gradiente vermelho

**Otimizações**:
- Font smoothing (antialiased)
- Scroll behavior suave
- Seleção de texto customizada (vermelho transparente)
- Text rendering otimizado

### Componentes Base
**Status**: ✅ Completos e responsivos

#### Header (`/src/components/layout/header.tsx`)
- **Altura**: 80px (h-20)
- **Estilo**: Fundo branco com sombra sutil
- **Logo**: Centralizado à esquerda (versão vermelha)
- **Navegação Desktop**:
  - NavigationMenu com dropdowns
  - Menus: Sobre Nós, Envolva-se, Recursos
  - Links diretos: Eventos, Sala de Oração, Ao Vivo
  - Botão CTA: "Doar" (vermelho)
- **Navegação Mobile**:
  - Sheet lateral responsivo
  - Categorias organizadas com bordas
  - Efeito hover com translate-x
- **Características**:
  - Sticky top
  - Backdrop blur
  - Container max-w-7xl centralizado

#### Footer (`/src/components/layout/footer.tsx`)
- **Fundo**: Degradê preto (`from-gray-900 via-black to-black`)
- **Overlay**: Degradê vermelho horizontal sutil nas laterais
- **Estrutura**: 4 colunas (grid lg:grid-cols-4)
  1. **Logo e Identidade**:
     - Logo branca (com filtros)
     - "MISSÃO REDIME CHAPECÓ" (título)
     - "AMOR • VERDADE • MESA & DISCIPULADO" (lema em vermelho)
     - Redes sociais com efeito scale no hover
  2. **Links Rápidos**: 6 links principais
  3. **Ministérios**: 6 ministérios
  4. **Contato**: Localização, telefone, email
- **Separador**: Linha com degradê horizontal (`via-primary/50`)
- **Bottom Bar**: Copyright e links legais
- **Efeitos**:
  - Links com translate-x no hover
  - Ícones sociais com scale-110
  - Títulos com border-b primary/30

### Página Inicial
**Status**: ✅ Completa com 6 seções

**Seções Implementadas**:

1. **Hero Section**:
   - Badge: "Missão Redime Chapecó"
   - Título: "Amor, Verdade, Mesa & Discipulado"
   - Fundo: Degradê preto para cinza escuro
   - Background overlay (opcional para imagem)
   - CTAs: "Transmissão Ao Vivo" + "Ver Mensagens"

2. **Live & Prayer Room**:
   - 2 cards grandes lado a lado (md:grid-cols-2)
   - Cards com hover shadow
   - Ícones grandes (20x20)
   - Background com degradê

3. **Últimas Mensagens**:
   - Grid 3 colunas (md:grid-cols-3)
   - Cards com badges e thumbnails
   - Botão "Ver Todas as Mensagens"

4. **Destaques**:
   - Grid 4 colunas (lg:grid-cols-4)
   - Cards: Cursos, Eventos, Música, Podcast
   - Ícones circulares com fundo primary/10

5. **Envolva-se (CTA)**:
   - Fundo vermelho (bg-primary)
   - 3 cards brancos (grid sm:grid-cols-3)
   - Torne-se Membro, Seja Voluntário, Conheça Mais

6. **Notícias & Blog**:
   - Grid 3 colunas (lg:grid-cols-3)
   - Cards com badges e preview de texto
   - Botão "Ver Tudo"

### Layout Principal
**Status**: ✅ Configurado

**Arquivo**: `/src/app/layout.tsx`
- **Metadata**:
  - Título: "Missão Redime Chapecó - Amor, Verdade, Mesa & Discipulado"
  - Keywords: igreja, redime, chapecó, missão, discipulado
- **Lang**: pt-BR
- **ThemeProvider**: next-themes (light/dark/system)
- **Estrutura**: Header → Main (flex-1) → Footer
- **Font**: Inter (Google Fonts)

### Container Padrão
**Todas as seções usam**:
```
container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8
```
- **Max width**: 1280px (max-w-7xl)
- **Padding responsivo**:
  - Mobile: px-4 (16px)
  - Tablet: sm:px-6 (24px)
  - Desktop: lg:px-8 (32px)

## Logos e Assets

**Status**: ✅ Organizados

**Localização**: `/public/Imagens/`
- `logo_Prancheta-black.png` - Logo preta
- `logo_Prancheta-red.png` - Logo vermelha (usada no header)
- `logo_Prancheta-w.png` - Logo branca (usada no footer com filtros)

## Estrutura de Pastas

```
redime/
├── .env                          # Variáveis de ambiente
├── CONTEXTO_CONTINUIDADE.md      # Este arquivo
├── ROADMAP.md                    # Planejamento de fases
├── prisma/
│   └── schema.prisma             # Schema do banco (15 modelos)
├── public/
│   └── Imagens/                  # Logos (3 variações)
├── src/
│   ├── app/
│   │   ├── layout.tsx            # Layout principal
│   │   ├── page.tsx              # Home page (6 seções)
│   │   └── globals.css           # Estilos globais otimizados
│   ├── components/
│   │   ├── layout/
│   │   │   ├── header.tsx        # Header responsivo
│   │   │   └── footer.tsx        # Footer com degradê
│   │   └── ui/                   # 47 componentes shadcn
│   └── lib/
│       ├── prisma.ts             # Cliente Prisma
│       └── utils.ts              # Utilitários (cn)
├── package.json
└── tsconfig.json
```

## Status das Funcionalidades

### ✅ Completo (FASE 1)
- [x] Setup inicial (Next.js 15 + TypeScript)
- [x] Prisma + PostgreSQL configurado
- [x] Design System (cores, efeitos, transições)
- [x] Header responsivo e limpo
- [x] Footer com fundo preto e degradês
- [x] Página inicial completa (6 seções)
- [x] Identidade "Missão Redime Chapecó"
- [x] Container centralizado (max-w-7xl)
- [x] Componentes Shadcn/ui (47 componentes)
- [x] Documentação completa

### ⏳ Próximas Etapas (FASE 2)

**Páginas Prioritárias**:
1. `/live` - Transmissão Ao Vivo
2. `/prayer-room` - Sala de Oração
3. `/messages` - Listagem de Mensagens
4. `/messages/[slug]` - Página individual
5. `/events` - Calendário de eventos

**Ver ROADMAP.md para planejamento completo**

## Decisões de Design

### Paleta de Cores Final
- **Primária**: Vermelho `hsl(0, 100%, 35%)`
- **Texto**: Preto `hsl(0, 0%, 10%)`
- **Fundo**: Branco `hsl(0, 0%, 100%)`
- **Bordas**: Cinza claro `hsl(0, 0%, 90%)`
- **Muted**: Cinza médio `hsl(0, 0%, 50%)`

### Hierarquia Tipográfica
- **H1**: 4xl md:6xl (36-60px) - Hero titles
- **H2**: 3xl md:4xl (30-36px) - Section titles
- **H3**: lg (18px) - Card/subsection titles
- **Body**: sm-base (14-16px)

### Espaçamento
- **Seções**: py-12 md:py-20 (48-80px vertical)
- **Cards**: gap-6 md:gap-8 (24-32px)
- **Grid**: grid-cols-1 md:grid-cols-2 lg:grid-cols-3/4

### Responsividade
- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md)
- **Desktop**: > 1024px (lg)

## Comandos Úteis

### Desenvolvimento
```bash
npm run dev          # Servidor de desenvolvimento (porta 3000)
npm run build        # Build de produção
npm run start        # Servidor de produção
npm run lint         # ESLint
```

### Prisma
```bash
npx prisma generate        # Gerar Prisma Client
npx prisma db push         # Aplicar schema ao banco
npx prisma studio          # Interface visual do banco
npx prisma migrate dev     # Criar migration
```

## Considerações Técnicas

### Performance
- Server Components por padrão (Next.js 15)
- Lazy loading de imagens (next/image)
- Código splitting automático
- Font optimization (Google Fonts)

### Acessibilidade
- Componentes Radix UI (acessíveis)
- ARIA labels em ícones sociais
- Contraste WCAG AA
- Navegação por teclado funcional

### SEO
- Metadata otimizada
- Semantic HTML
- Lang pt-BR
- Keywords relevantes

## Notas Importantes

### Informações a Atualizar
- [ ] Telefone de contato (atual: placeholder)
- [ ] Email de contato (atual: contato@redime.com)
- [ ] Endereço completo em Chapecó
- [ ] Links de redes sociais (atual: placeholders)
- [ ] CEP e endereço detalhado

### Assets Necessários
- [ ] Imagem de fundo para Hero Section (prayer-room-bg.jpg)
- [ ] Fotos da equipe/líderes
- [ ] Thumbnails de mensagens/sermões
- [ ] Fotos de eventos

### Decisões Pendentes
- [ ] Plataforma de streaming (YouTube/Vimeo/Custom)
- [ ] Gateway de pagamento para doações
- [ ] Serviço de email (SendGrid/Mailchimp)
- [ ] Hospedagem de vídeos

## Contatos do Projeto

- **Database Host**: safexml.com.br:5433
- **Schema**: redime
- **Email placeholder**: contato@redime.com
- **Localização**: Chapecó - SC, Brasil

## Próximos Passos Imediatos

1. Implementar página `/live` (Transmissão Ao Vivo)
2. Criar página `/prayer-room` (Sala de Oração)
3. Desenvolver sistema de mensagens/sermões
4. Implementar calendário de eventos
5. Adicionar sistema de autenticação

**Ver ROADMAP.md para planejamento detalhado de 7 fases**

---

**Status Geral**: FASE 1 COMPLETA ✅
**Próxima Fase**: FASE 2 - Páginas Principais (4-6 semanas)
