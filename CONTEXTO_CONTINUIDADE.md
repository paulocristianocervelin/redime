# Contexto de Continuidade - Projeto Redime

**Última Atualização**: 07/11/2025
# Seguir este contexto
## Visão Geral do Projeto

Site da **Missão Redime Chapecó** - Uma comunidade transformada pela presença de Deus, fundamentada nos pilares: **AMOR • VERDADE • MESA & DISCIPULADO**.

Inspirado no layout do Upper Room (https://upperroom.co/), com foco em comunidade, adoração contínua e envolvimento dos membros.

## Identidade da Missão

- **Nome**: Missão Redime Chapecó
- **Localização**: Chapecó - SC, Santa Catarina, Brasil
- **Lema**: AMOR • VERDADE • MESA & DISCIPULADO
- **Cores Tema Atual**: Preto e Tons de Cinza (modernização concluída)
- **Cores Originais**: Preto, Vermelho e Branco

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

**Cores Principais** (HSL) - TEMA MODERNIZADO (Preto e Cinza):
- **Primary (Preto)**: `0 0% 10%`
- **Secondary (Cinza claro)**: `0 0% 96%`
- **Foreground (Preto)**: `0 0% 10%`
- **Background (Branco)**: `0 0% 100%`
- **Cinzas**: 10%, 20%, 50%, 96%, 98%

**Variáveis CSS**: Definidas diretamente sem recursividade em `@theme inline`

**Efeitos Visuais Implementados**:
- `.glass` - Glass morphism com backdrop blur
- `.glass-dark` - Versão dark do efeito vidro
- `.transition-elegant` - Transições lineares (0.2s linear) - PADRONIZADO
- `.transition-smooth` - Transições com cubic-bezier
- `.shadow-subtle` - Sombras delicadas
- `.shadow-elegant` - Sombras elegantes
- `.shadow-modern` - Sombras modernas
- `.gradient-bg-dark` - Gradiente preto/cinza escuro
- `.gradient-bg-gray-soft` - Gradiente cinza claro
- `.gradient-bg-primary` - Gradiente preto para cinza
- `.hover-lift` - Efeito de elevação no hover

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
  - Botão CTA: "Doar" (preto com hover cinza escuro)
  - Botão Login: (branco com hover cinza claro)
- **Navegação Mobile**:
  - Sheet lateral responsivo
  - Categorias organizadas com bordas
  - Efeito hover com translate-x
- **Características**:
  - Sticky top
  - Backdrop blur
  - Container max-w-7xl centralizado
  - **Hover Padronizado**: `hover:bg-gray-100` em TODOS os links/botões (sem mudança de cor de texto)

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
**Status**: ✅ Completa com 6 seções - MODERNIZADA

**Seções Implementadas**:

1. **Hero Section**:
   - Badge: "Missão Redime Chapecó"
   - Título: "Amor, Verdade, Mesa & Discipulado" (texto branco)
   - Fundo: Degradê preto para cinza escuro (`.gradient-bg-dark`)
   - Background overlay (opcional para imagem)
   - CTAs: Botões brancos com `hover:bg-gray-100`

2. **Live & Prayer Room**:
   - 2 cards grandes lado a lado (md:grid-cols-2)
   - Cards com hover shadow modern
   - Ícones grandes (20x20)
   - Background com degradê cinza suave
   - Botões padronizados (branco com hover cinza)

3. **Últimas Mensagens**:
   - Grid 3 colunas (md:grid-cols-3)
   - Cards com badges e thumbnails
   - Botão "Ver Todas as Mensagens" (padrão branco/cinza)

4. **Destaques**:
   - Grid 4 colunas (lg:grid-cols-4)
   - Cards: Cursos, Eventos, Música, Podcast
   - Ícones circulares com fundo cinza claro
   - Botões padronizados

5. **Envolva-se (CTA)**:
   - Fundo: Degradê preto (`.gradient-bg-primary`)
   - Texto: Branco para contraste
   - 3 cards BRANCOS OPACOS (bg-white) com texto PRETO
   - Cards: Torne-se Membro, Seja Voluntário, Conheça Mais
   - Ícones e títulos: `text-black` explícito
   - Espaçamento padronizado: pb-3, pt-0
   - Botões: brancos com `hover:bg-gray-100`

6. **Notícias & Blog**:
   - Grid 3 colunas (lg:grid-cols-3)
   - Cards com badges e preview de texto
   - Botão "Ver Tudo" (padrão branco/cinza)

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

## ÚLTIMAS ALTERAÇÕES (07/11/2025)

### ✅ Modernização do Design - CONCLUÍDA
**Inspiração**: https://upperroom.co/

**Mudanças Implementadas**:

1. **Tema de Cores - Preto e Cinza**:
   - Removido tema azul inicial (erro corrigido)
   - Implementado tema preto e tons de cinza
   - Primary: `hsl(0 0% 10%)` (preto)
   - Secondary: `hsl(0 0% 96%)` (cinza claro)
   - Gradientes: `.gradient-bg-dark`, `.gradient-bg-gray-soft`, `.gradient-bg-primary`

2. **Padronização de Botões**:
   - **Padrão**: `bg-white text-black border border-gray-200 hover:bg-gray-100 transition-elegant shadow-sm`
   - Aplicado em TODAS as seções do site público
   - Consistência visual em toda a aplicação

3. **Padronização de Hover - CRÍTICO**:
   - **Padrão**: `hover:bg-gray-100` com `transition-elegant`
   - Aplicado em:
     - Header: Todos os NavigationMenuTrigger
     - Header: Todos os links simples (Eventos, Sala de Oração, Ao Vivo)
     - Header: ListItem component (dropdowns)
     - Header: Links mobile
     - Header: Botões Doar e Login
     - Admin Sidebar: Todos os links de navegação
     - Admin Sidebar: Botão de logout
   - **Removido**: `hover:text-primary`, `hover:bg-primary/5`, mudanças de cor no hover
   - **Objetivo**: Overlay cinza sutil e consistente em TODOS os elementos interativos

4. **Seção Envolva-se - Múltiplas Correções**:
   - Cards totalmente opacos: `bg-white` (sem transparência)
   - Texto preto explícito: `text-black` em títulos e ícones
   - Espaçamento padronizado: `pb-3`, `pt-0`
   - Tamanhos uniformes: `text-lg font-semibold`
   - Contraste perfeito para legibilidade

5. **Contraste de Texto em Fundos Escuros**:
   - Hero section: `text-white` e `text-gray-200`
   - Seção Envolva-se: Fundo preto com texto branco, cards brancos com texto preto
   - Todas as seções com fundos escuros usando texto claro

### 🔐 Sistema de Autenticação

**Arquivo**: `src/lib/auth.ts`

**Configuração JWT**:
- **Secret**: `@plpsc2025Redime#` (env: JWT_SECRET)
- **Algoritmo**: HS256
- **Validade do Token**: **8 HORAS** (atualizado em 07/11/2025)
  - `.setExpirationTime('8h')` - linha 21
  - `maxAge: 60 * 60 * 8` - linha 89
- **Cookie Name**: `redime-auth-token`
- **Cookie Settings**: httpOnly, secure (prod), sameSite: lax

**Funções Disponíveis**:
- `createToken(payload)` - Criar JWT
- `verifyToken(token)` - Verificar JWT
- `getCurrentUser()` - Obter usuário do cookie
- `login(email, password)` - Login com bcrypt
- `logout()` - Remover cookie
- `hashPassword(password)` - Hash com bcryptjs
- `hasPermission(role, required)` - Verificar permissões
- `isAdmin(role)`, `isLeader(role)`, `isMember(role)` - Helpers de role

**Roles Disponíveis**:
- ADMIN - Administrador total
- LEADER - Líder de departamento
- VOLUNTEER - Voluntário
- MEMBER - Membro

### 📁 Painel Administrativo

**Arquivo Sidebar**: `src/components/admin/admin-sidebar.tsx`

**Estilização Padronizada**:
- **Item Ativo**: `bg-black text-white shadow-sm font-semibold`
- **Item Inativo**: `text-gray-700 hover:bg-gray-100 transition-elegant`
- **Logout**: `hover:bg-gray-100 transition-elegant`

**Páginas Admin Implementadas**:
- `/admin/members` - Gerenciamento de membros
- `/admin/departments` - Gerenciamento de departamentos
- Dashboard e outras páginas

### 👥 Gerenciamento de Membros

**Arquivo**: `src/app/admin/members/page.tsx`

**Funcionalidades**:
- CRUD completo de membros
- **CEP Auto-fill**: Integração com ViaCEP API
- **Formatação de Campos**:
  - CPF: `000.000.000-00`
  - Telefone: `(00) 00000-0000`
  - CEP: `00000-000`
- **Departamentos**: Checkbox múltiplo (many-to-many)
- **Validações**: Inline no dialog (não fecha em erro)
- **Focus Management**: useRef para navegação correta de campos

**Custom Formatters** (sem bibliotecas externas):
```typescript
formatCPF(value: string): string
formatPhone(value: string): string
formatCEP(value: string): string
```

### 🗄️ Database Schema - Relacionamentos

**Many-to-Many**: Membros ↔ Departamentos

**Model**: `MemberDepartment`
```prisma
model MemberDepartment {
  id              BigInt        @id @default(autoincrement())
  memberProfileId BigInt
  memberProfile   MemberProfile @relation(...)
  departmentId    BigInt
  department      Department    @relation(...)
  joinedAt        DateTime      @default(now())

  @@unique([memberProfileId, departmentId])
}
```

**Features**:
- Membros podem estar em 0, 1 ou múltiplos departamentos
- Administradores podem ser líderes de departamento
- Cascade delete habilitado

### 🎨 Padrões de Design Estabelecidos

**Botões**:
```typescript
className="bg-white text-black border border-gray-200 hover:bg-gray-100 transition-elegant shadow-sm"
```

**Links/Navegação**:
```typescript
className="hover:bg-gray-100 transition-elegant"
```

**Cards com Elevação**:
```typescript
className="hover:shadow-modern transition-elegant hover-lift"
```

**Active State (Admin)**:
```typescript
className="bg-black text-white shadow-sm"
```

---

**Status Geral**: FASE 1 COMPLETA + MODERNIZAÇÃO CONCLUÍDA ✅
**Próxima Fase**: FASE 2 - Páginas Principais (4-6 semanas)
