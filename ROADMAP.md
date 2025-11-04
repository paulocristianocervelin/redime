# Roadmap de Desenvolvimento - Projeto Redime

## Legenda de Status
- ✅ Concluído
- 🚧 Em Progresso
- ⏳ Pendente
- ⚠️ Bloqueado/Requer Atenção

---

## FASE 1: Fundação e Estrutura Base ✅

### 1.1 Setup Inicial ✅
- [x] Configurar Next.js 15 com TypeScript
- [x] Instalar e configurar Tailwind CSS 4
- [x] Adicionar componentes Shadcn/ui
- [x] Configurar estrutura de pastas

### 1.2 Database e ORM ✅
- [x] Criar schema do Prisma
- [x] Configurar conexão com PostgreSQL
- [x] Gerar Prisma Client
- [x] Criar arquivo de configuração do cliente

### 1.3 Design System ✅
- [x] Definir paleta de cores (preto, vermelho, branco)
- [x] Configurar variáveis CSS
- [x] Implementar dark mode
- [x] Documentar guidelines de design

### 1.4 Componentes de Layout ✅
- [x] Header com navegação completa
- [x] Footer com links e informações
- [x] Layout principal (RootLayout)
- [x] Configurar fontes (Inter)

### 1.5 Página Inicial ✅
- [x] Hero section
- [x] Seção Live Stream & Prayer Room
- [x] Últimas Mensagens
- [x] Destaques (Cursos, Eventos, Música, Podcast)
- [x] CTA Envolva-se
- [x] Notícias & Blog

---

## FASE 2: Páginas Principais e Funcionalidades Core 🚧

### 2.1 Transmissão Ao Vivo ⏳
**Prioridade**: Alta
**Rota**: `/live`

**Tarefas**:
- [ ] Criar página `/app/live/page.tsx`
- [ ] Implementar player de vídeo (YouTube embed ou custom)
- [ ] Adicionar chat ao vivo (opcional - Socket.io ou Firebase)
- [ ] Criar componente de status (LIVE/OFFLINE)
- [ ] Implementar contador de visualizadores
- [ ] Adicionar schedule de transmissões
- [ ] Criar API route para controle de stream (`/api/live`)

**Dependências**:
- Decidir plataforma de streaming (YouTube, Vimeo, custom)
- Configurar CDN para vídeo (se custom)

### 2.2 Sala de Oração ⏳
**Prioridade**: Alta
**Rota**: `/prayer-room`

**Tarefas**:
- [ ] Criar página `/app/prayer-room/page.tsx`
- [ ] Player de vídeo 24/7
- [ ] Formulário de pedidos de oração
- [ ] Listagem de pedidos públicos
- [ ] Sistema de categorias de oração
- [ ] Implementar privacidade (anônimo/público)
- [ ] API routes:
  - `POST /api/prayer-requests` (criar pedido)
  - `GET /api/prayer-requests` (listar públicos)
  - `PATCH /api/prayer-requests/[id]` (marcar como respondido)

**Modelo relacionado**: `PrayerRequest`

### 2.3 Mensagens/Sermões ⏳
**Prioridade**: Alta
**Rotas**: `/messages`, `/messages/[slug]`

**Tarefas**:
- [ ] Criar `/app/messages/page.tsx` (listagem)
- [ ] Criar `/app/messages/[slug]/page.tsx` (individual)
- [ ] Implementar filtros (categoria, série, pregador, data)
- [ ] Sistema de busca
- [ ] Player de vídeo/áudio
- [ ] Downloads (PDF de anotações, MP3)
- [ ] Comentários
- [ ] Compartilhamento social
- [ ] Contador de visualizações
- [ ] API routes:
  - `GET /api/messages` (listagem paginada)
  - `GET /api/messages/[slug]` (buscar por slug)
  - `POST /api/messages/[slug]/views` (incrementar views)
  - `POST /api/messages/[slug]/comments` (adicionar comentário)

**Modelos relacionados**: `Message`, `Comment`

### 2.4 Eventos ⏳
**Prioridade**: Média-Alta
**Rotas**: `/events`, `/events/[slug]`, `/events/[slug]/register`

**Tarefas**:
- [ ] Criar `/app/events/page.tsx` (calendário/lista)
- [ ] Criar `/app/events/[slug]/page.tsx` (detalhes do evento)
- [ ] Criar `/app/events/[slug]/register/page.tsx` (inscrição)
- [ ] Implementar calendário visual (react-day-picker)
- [ ] Formulário de inscrição
- [ ] Sistema de pagamento (se evento pago)
- [ ] Confirmação por email
- [ ] Gerenciamento de capacidade
- [ ] Filtros (tipo, data, localização)
- [ ] API routes:
  - `GET /api/events` (listar eventos)
  - `GET /api/events/[slug]` (detalhes)
  - `POST /api/events/[slug]/register` (inscrever)
  - `GET /api/events/[slug]/availability` (vagas disponíveis)

**Modelos relacionados**: `Event`, `EventRegistration`

### 2.5 Cursos Online ⏳
**Prioridade**: Média
**Rotas**: `/courses`, `/courses/[slug]`, `/courses/[slug]/lessons/[lessonId]`

**Tarefas**:
- [ ] Criar `/app/courses/page.tsx` (catálogo)
- [ ] Criar `/app/courses/[slug]/page.tsx` (detalhes do curso)
- [ ] Criar `/app/courses/[slug]/lessons/[lessonId]/page.tsx` (aula)
- [ ] Sistema de progresso
- [ ] Player de vídeo com marcadores
- [ ] Quiz/avaliações (opcional)
- [ ] Certificados (opcional)
- [ ] Filtros (categoria, nível, duração)
- [ ] API routes:
  - `GET /api/courses` (listar)
  - `POST /api/courses/[slug]/enroll` (inscrever)
  - `PATCH /api/courses/[slug]/progress` (atualizar progresso)
  - `GET /api/courses/[slug]/lessons` (listar aulas)

**Modelos relacionados**: `Course`, `Lesson`, `CourseEnrollment`

---

## FASE 3: Páginas Institucionais ⏳

### 3.1 Sobre Nós ⏳
**Prioridade**: Média
**Rotas**: `/about/*`

**Páginas**:
- [ ] `/about/new-here` - Sou Novo Aqui
- [ ] `/about/history` - Nossa História
- [ ] `/about/team` - Nossa Equipe
- [ ] `/about/leaders` - Líderes

**Tarefas**:
- [ ] Criar páginas estáticas
- [ ] Adicionar fotos da equipe
- [ ] Timeline da história
- [ ] Formulário "Sou Novo" (integrar com CRM)
- [ ] API route: `POST /api/new-visitor` (registrar novo visitante)

**Modelo relacionado**: `TeamMember`

### 3.2 Ministérios ⏳
**Prioridade**: Média
**Rotas**: `/ministries`, `/ministries/[slug]`

**Ministérios**:
- Crianças (`/ministries/children`)
- Jovens (`/ministries/youth`)
- Jovens Adultos (`/ministries/young-adults`)
- Mulheres (`/ministries/women`)
- Música (`/ministries/music`)
- Missões (`/ministries/missions`)
- Sala de Oração (`/ministries/prayer`)

**Tarefas**:
- [ ] Criar página de overview (`/ministries`)
- [ ] Criar template para páginas individuais
- [ ] Adicionar fotos e descrições
- [ ] Formulário de interesse/participação
- [ ] API route: `POST /api/ministries/[slug]/join` (manifestar interesse)

**Modelo relacionado**: `Ministry`

### 3.3 Envolva-se ⏳
**Prioridade**: Alta
**Rotas**: `/get-involved/*`

**Páginas**:
- [ ] `/get-involved/membership` - Torne-se Membro
- [ ] `/get-involved/volunteer` - Seja Voluntário
- [ ] `/get-involved/baptism` - Batismo

**Tarefas**:
- [ ] Formulários de cadastro/interesse
- [ ] Processo de aprovação (workflow)
- [ ] Emails de confirmação
- [ ] API routes:
  - `POST /api/membership/apply`
  - `POST /api/volunteer/apply`
  - `POST /api/baptism/request`

### 3.4 Blog e Notícias ⏳
**Prioridade**: Média
**Rotas**: `/blog`, `/blog/[slug]`

**Tarefas**:
- [ ] Criar `/app/blog/page.tsx` (listagem)
- [ ] Criar `/app/blog/[slug]/page.tsx` (post individual)
- [ ] Sistema de categorias e tags
- [ ] Busca
- [ ] Comentários
- [ ] Compartilhamento social
- [ ] Newsletter signup
- [ ] API routes:
  - `GET /api/blog` (listar posts)
  - `GET /api/blog/[slug]` (buscar post)
  - `POST /api/blog/[slug]/comments` (adicionar comentário)

**Modelo relacionado**: `BlogPost`, `Comment`

---

## FASE 4: Sistema de Autenticação e Usuários ⏳

### 4.1 Autenticação ⏳
**Prioridade**: Alta

**Tarefas**:
- [ ] Criar middleware de autenticação
- [ ] Implementar login (`/login`)
- [ ] Implementar cadastro (`/register`)
- [ ] Recuperação de senha (`/forgot-password`)
- [ ] Verificação de email
- [ ] Integração com JWT
- [ ] Proteção de rotas
- [ ] API routes:
  - `POST /api/auth/login`
  - `POST /api/auth/register`
  - `POST /api/auth/logout`
  - `POST /api/auth/forgot-password`
  - `POST /api/auth/reset-password`
  - `POST /api/auth/verify-email`
  - `GET /api/auth/me` (perfil atual)

**Modelo relacionado**: `User`

### 4.2 Perfil de Usuário ⏳
**Prioridade**: Média
**Rota**: `/profile`, `/profile/edit`

**Tarefas**:
- [ ] Página de perfil
- [ ] Edição de informações
- [ ] Upload de foto
- [ ] Histórico de atividades
- [ ] Inscrições em eventos
- [ ] Progresso em cursos
- [ ] Pedidos de oração
- [ ] API routes:
  - `GET /api/profile` (buscar perfil)
  - `PATCH /api/profile` (atualizar)
  - `POST /api/profile/photo` (upload foto)

**Modelo relacionado**: `MemberProfile`

### 4.3 Painel Admin ⏳
**Prioridade**: Baixa (pode usar Prisma Studio inicialmente)
**Rota**: `/admin/*`

**Páginas**:
- [ ] Dashboard
- [ ] Gerenciar Mensagens
- [ ] Gerenciar Eventos
- [ ] Gerenciar Cursos
- [ ] Gerenciar Blog
- [ ] Gerenciar Usuários
- [ ] Gerenciar Doações
- [ ] Gerenciar Pedidos de Oração
- [ ] Configurações do Site

**Nota**: Considerar usar CMS como Payload CMS ou Sanity

---

## FASE 5: Funcionalidades Avançadas ⏳

### 5.1 Sistema de Doações ⏳
**Prioridade**: Alta
**Rota**: `/donate`

**Tarefas**:
- [ ] Criar página de doação
- [ ] Integração com gateway de pagamento (Stripe/Mercado Pago)
- [ ] Doações únicas e recorrentes
- [ ] Escolha de destino (geral, missões, construção, etc.)
- [ ] Histórico de doações (para usuários logados)
- [ ] Recibos por email
- [ ] Dashboard de doações (admin)
- [ ] API routes:
  - `POST /api/donations/create`
  - `POST /api/donations/webhook` (confirmação de pagamento)
  - `GET /api/donations/history` (histórico do usuário)

**Modelo relacionado**: `Donation`

**Dependências**:
- Escolher gateway de pagamento
- Configurar conta no gateway
- Implementar webhook para confirmações

### 5.2 Podcast ⏳
**Prioridade**: Baixa
**Rota**: `/podcast`

**Tarefas**:
- [ ] Criar página de podcast
- [ ] Player de áudio
- [ ] Listagem de episódios
- [ ] RSS feed para plataformas
- [ ] Integração com Spotify/Apple Podcasts
- [ ] API route: `GET /api/podcast/feed.xml` (RSS)

### 5.3 Recursos Bíblicos ⏳
**Prioridade**: Baixa
**Rota**: `/resources/*`

**Páginas**:
- [ ] `/resources/bible-plans` - Planos de Leitura
- [ ] `/resources/books` - Livros Recomendados
- [ ] `/resources/devotionals` - Devocionais

### 5.4 Newsletter ⏳
**Prioridade**: Média

**Tarefas**:
- [ ] Formulário de signup (footer/modal)
- [ ] Integração com serviço de email (Mailchimp/SendGrid)
- [ ] Templates de email
- [ ] Gerenciamento de listas
- [ ] API routes:
  - `POST /api/newsletter/subscribe`
  - `POST /api/newsletter/unsubscribe`

### 5.5 Busca Global ⏳
**Prioridade**: Média
**Rota**: `/search`

**Tarefas**:
- [ ] Implementar busca full-text
- [ ] Buscar em: Mensagens, Eventos, Cursos, Blog
- [ ] Filtros avançados
- [ ] Sugestões de busca
- [ ] API route: `GET /api/search?q=termo`

**Considerar**: Algolia ou ElasticSearch para busca avançada

---

## FASE 6: Otimização e Deploy ⏳

### 6.1 Performance ⏳
**Tarefas**:
- [ ] Implementar caching (Redis)
- [ ] Otimizar imagens (Next Image optimization)
- [ ] Code splitting adicional
- [ ] Lazy loading de componentes pesados
- [ ] Implementar ISR (Incremental Static Regeneration)
- [ ] Configurar CDN para assets
- [ ] Análise com Lighthouse
- [ ] Web Vitals tracking

### 6.2 SEO ⏳
**Tarefas**:
- [ ] Implementar metadata dinâmica em todas as páginas
- [ ] Criar sitemap.xml
- [ ] Criar robots.txt
- [ ] Implementar Schema.org markup (JSON-LD)
- [ ] Open Graph tags
- [ ] Twitter Card tags
- [ ] Configurar Google Analytics
- [ ] Configurar Google Search Console
- [ ] Implementar breadcrumbs

### 6.3 Segurança ⏳
**Tarefas**:
- [ ] Implementar rate limiting
- [ ] Adicionar CSRF protection
- [ ] Configurar Content Security Policy
- [ ] Sanitizar inputs (XSS prevention)
- [ ] Implementar SQL injection prevention
- [ ] Configurar HTTPS
- [ ] Implementar 2FA (opcional)
- [ ] Audit de segurança

### 6.4 Testes ⏳
**Tarefas**:
- [ ] Configurar Jest + React Testing Library
- [ ] Testes unitários para componentes
- [ ] Testes de integração para API routes
- [ ] Testes E2E com Playwright
- [ ] Cobertura de código >80%

### 6.5 Deploy ⏳
**Tarefas**:
- [ ] Configurar variáveis de ambiente de produção
- [ ] Escolher plataforma (Vercel, AWS, DigitalOcean)
- [ ] Configurar CI/CD (GitHub Actions)
- [ ] Configurar domínio personalizado
- [ ] Implementar monitoramento (Sentry, Datadog)
- [ ] Configurar backups do banco
- [ ] Documentar processo de deploy

---

## FASE 7: Pós-Lançamento e Manutenção ⏳

### 7.1 Funcionalidades Adicionais
- [ ] App mobile (React Native/PWA)
- [ ] Notificações push
- [ ] Sistema de grupos/células
- [ ] Calendário pessoal sincronizado
- [ ] Integração com app de Bíblia
- [ ] Sistema de mentoria/discipulado
- [ ] Sala de oração com video conferência
- [ ] Biblioteca de recursos digitais

### 7.2 Integrações
- [ ] Integração com sistema de gestão de igrejas (CCB, Planning Center)
- [ ] Integração com redes sociais (auto-post)
- [ ] Integração com YouTube (sync automático)
- [ ] Integração com Spotify (podcasts)
- [ ] Integração com Google Calendar

### 7.3 Análise e Métricas
- [ ] Dashboard de analytics
- [ ] Relatórios de engajamento
- [ ] Heatmaps (Hotjar)
- [ ] A/B testing
- [ ] Feedback de usuários

---

## Dependências Externas a Definir

### Serviços de Terceiros
1. **Streaming de Vídeo**: YouTube Live / Vimeo / Custom (Mux)
2. **Gateway de Pagamento**: Stripe / Mercado Pago / PagSeguro
3. **Email Marketing**: Mailchimp / SendGrid / Amazon SES
4. **Email Transacional**: SendGrid / Postmark / Amazon SES
5. **Hospedagem de Vídeos**: YouTube / Vimeo / Bunny CDN
6. **CDN**: Cloudflare / AWS CloudFront
7. **Storage de Imagens**: AWS S3 / Cloudinary
8. **Busca**: Algolia / Meilisearch / ElasticSearch (opcional)
9. **Analytics**: Google Analytics / Plausible / Fathom
10. **Error Tracking**: Sentry / Rollbar
11. **Chat ao Vivo**: Firebase / Socket.io / Pusher

### Integrações Opcionais
- Planning Center (gestão de igreja)
- Slack (notificações internas)
- Zapier (automações)

---

## Estimativa de Tempo

### Por Fase
- **FASE 1** (Fundação): ✅ 1 semana - COMPLETO
- **FASE 2** (Páginas Principais): 🚧 3-4 semanas
- **FASE 3** (Páginas Institucionais): ⏳ 2 semanas
- **FASE 4** (Autenticação): ⏳ 2 semanas
- **FASE 5** (Funcionalidades Avançadas): ⏳ 3-4 semanas
- **FASE 6** (Otimização e Deploy): ⏳ 1-2 semanas
- **FASE 7** (Pós-Lançamento): ⏳ Contínuo

**Total Estimado**: 12-15 semanas para MVP completo

### Priorização para MVP (Minimum Viable Product)
**Prazo**: 6-8 semanas

**Incluir**:
1. ✅ Página Inicial
2. Transmissão Ao Vivo
3. Sala de Oração (básica)
4. Mensagens/Sermões (listagem + individual)
5. Eventos (listagem + inscrição)
6. Páginas Sobre Nós
7. Sistema de Doações
8. Blog básico
9. Autenticação simples

**Deixar para depois do MVP**:
- Cursos Online
- Painel Admin completo
- Podcast
- Newsletter avançada
- App Mobile
- Funcionalidades avançadas

---

## Notas Importantes

### Decisões Pendentes
1. Qual plataforma de streaming usar?
2. Qual gateway de pagamento implementar?
3. Usar CMS ou construir admin próprio?
4. Implementar chat ao vivo na transmissão?
5. App mobile nativo ou PWA?

### Riscos Identificados
1. Integração com gateway de pagamento pode demorar mais
2. Streaming ao vivo requer infraestrutura robusta
3. Volume de vídeos pode impactar storage/custos
4. Necessidade de moderação de conteúdo (comentários, pedidos de oração)

### Recomendações
1. Começar com integrações simples (YouTube para vídeos)
2. Usar serviços SaaS quando possível (reduz complexidade)
3. Implementar analytics desde o início
4. Fazer testes com usuários reais o quanto antes
5. Documentar decisões técnicas importantes

---

## Atualizado em: 04/11/2024
**Próxima Revisão**: Semanalmente ou ao finalizar cada fase
