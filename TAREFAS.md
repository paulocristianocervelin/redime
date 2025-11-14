# Tarefas - Projeto Redime

**Última Atualização**: 07/11/2025 - 18:30

## ✅ Tarefas Concluídas Recentemente

### FASE 2 - Páginas Principais (07/11/2025) 🎉
- [x] **Página de Transmissão Ao Vivo (`/live`)** - COMPLETA
  - [x] Layout completo com player de vídeo (YouTube embed)
  - [x] Informações do culto atual com metadata
  - [x] Horários de transmissão (Domingo, Quarta, Sexta)
  - [x] Badge animado "AO VIVO" quando em transmissão
  - [x] Placeholder quando sem transmissão
  - [x] Seção de mensagens recentes
  - [x] Card de chamada para Sala de Oração
  - [x] Sidebar com horários, avisos e localização
  - [x] Responsividade mobile completa

- [x] **Sala de Oração (`/prayer-room`)** - COMPLETA
  - [x] Layout completo da página
  - [x] Formulário de pedidos de oração funcional
  - [x] Categorias de pedidos (7 categorias)
  - [x] Opção de envio anônimo (checkbox)
  - [x] Sistema de listagem de pedidos com filtros
  - [x] Busca de pedidos por texto
  - [x] Filtro por categoria
  - [x] Contador de orações por pedido
  - [x] Badge para pedidos respondidos
  - [x] Estatísticas (pedidos atendidos, orações, testemunhos)
  - [x] Seção "Como Funciona" (3 passos)
  - [x] Versículo bíblico destacado
  - [x] Informações de privacidade

- [x] **Sistema de Mensagens/Sermões (`/messages`)** - COMPLETA
  - [x] Página de listagem com grid responsivo
  - [x] Filtros completos (categoria, pregador, série)
  - [x] Sistema de busca por título/pregador
  - [x] Ordenação (recentes, populares, alfabética)
  - [x] Estatísticas no topo (total mensagens, pregadores, séries, views)
  - [x] Seção de mensagens em destaque
  - [x] Cards com thumbnail, duração e visualizações
  - [x] Badges de categoria e série
  - [x] Paginação (placeholder)
  - [x] CTA para transmissão ao vivo
  - [x] Página individual `/messages/[slug]`
  - [x] Player de vídeo integrado
  - [x] Metadata completa (pregador, data, duração, views)
  - [x] Botões de compartilhar e download
  - [x] Descrição e escrituras referenciadas
  - [x] Pontos principais da mensagem
  - [x] Recursos para download (PDF, guias)
  - [x] Mensagens relacionadas
  - [x] Links para série completa e mais do pregador

### Modernização do Design (07/11/2025)
- [x] Implementar tema preto e tons de cinza
- [x] Remover tema azul incorreto
- [x] Padronizar todos os botões (branco com hover cinza)
- [x] Padronizar efeitos de hover em navegação (overlay cinza apenas)
- [x] Corrigir visibilidade dos cards da seção "Envolva-se"
- [x] Ajustar contraste de texto em fundos escuros
- [x] Aplicar hover padronizado no header (site público)
- [x] Aplicar hover padronizado no admin sidebar
- [x] Aplicar hover padronizado nos dropdowns
- [x] Aplicar hover padronizado no menu mobile

### Sistema de Autenticação (07/11/2025)
- [x] Ajustar validade do token JWT para 8 horas
- [x] Configurar cookie settings (httpOnly, secure, sameSite)
- [x] Corrigir queries Prisma com relacionamento many-to-many

### Gerenciamento de Membros (Concluído anteriormente)
- [x] Implementar CRUD de membros
- [x] Integração com ViaCEP para auto-fill de endereço
- [x] Formatação customizada de CPF, telefone e CEP
- [x] Seleção múltipla de departamentos (checkbox)
- [x] Permitar admin como líder de departamento
- [x] Validação inline (não fecha dialog em erro)
- [x] Focus management correto após CEP

### Página de Ministérios (14/11/2025)
- [x] **Página de Ministérios (`/ministries`)** - COMPLETA
  - [x] Listagem dinâmica de ministérios do banco de dados
  - [x] Layout responsivo em grid (1/2/3 colunas)
  - [x] Cards com informações completas (nome, descrição, líder, membros)
  - [x] Badges coloridos por categoria (15 categorias)
  - [x] Suporte para imagens de ministérios
  - [x] Contador de membros por ministério
  - [x] Informações do líder
  - [x] Estado vazio quando não há ministérios
  - [x] Ordenação automática por categoria e nome
  - [x] Hover effects e sombras elegantes

---

## 🔄 Tarefas em Andamento

_Nenhuma tarefa em andamento no momento_

---

## 📋 Próximas Tarefas Prioritárias

### 🎥 INTEGRAÇÃO YOUTUBE DATA API V3 - PENDENTE

#### Visão Geral
Sistema de sincronização automática de vídeos do YouTube com o site, eliminando necessidade de cadastro manual.

**Benefícios:**
- ✅ 100% Gratuito (até 10.000 requisições/dia - uso estimado: ~5.400/dia)
- ✅ Sincronização automática de vídeos do canal
- ✅ Detecção de lives ao vivo em tempo real
- ✅ Cache no banco de dados para melhor performance
- ✅ Sem custos adicionais para volume de igreja

#### Pré-requisitos (Ação do Usuário)

**1. Criar API Key do YouTube:**
- Acessar: https://console.cloud.google.com/
- Criar projeto: "Missão Redime Site"
- Ativar "YouTube Data API v3"
- Criar credenciais → API Key
- Configurar restrições de segurança:
  - HTTP referrers: `https://seudominio.com/*`
  - API restrictions: Apenas "YouTube Data API v3"

**2. Obter Channel ID:**
- URL do canal: `youtube.com/channel/UCxxxxxxxxxxxxxxxxxxxxx`
- Ou em: https://www.youtube.com/account_advanced

**3. Obter Playlist IDs (opcional):**
- Playlist de Mensagens: `PLxxxxxxxxxxxxxxxxxxxxx`
- Playlist de Lives: `PLxxxxxxxxxxxxxxxxxxxxx`

#### Implementação Técnica

**Estrutura do Banco de Dados:**
- [ ] Adicionar tabela `Video` no Prisma Schema
  - Campos: videoId, title, description, thumbnail, publishedAt, category, duration, viewCount, cachedAt
  - Enums: VideoCategory (GENERAL, MESSAGE, LIVE, WORSHIP, TESTIMONY, TEACHING)
- [ ] Executar migration: `npx prisma migrate dev --name add_youtube_videos`

**Backend (API Routes):**
- [ ] Criar `src/lib/youtube.ts` - Utilitário de integração com YouTube API
  - fetchChannelVideos(channelId, maxResults)
  - fetchPlaylistVideos(playlistId, maxResults)
  - checkLiveStream(channelId)
- [ ] Criar `/api/youtube/sync` - Sincroniza vídeos (POST, apenas ADMIN)
- [ ] Criar `/api/youtube/videos` - Lista vídeos do cache (GET, público)
- [ ] Criar `/api/youtube/live` - Verifica live ao vivo (GET, público)

**Frontend:**
- [ ] Atualizar `/live` - Detectar e exibir live automaticamente
- [ ] Atualizar `/messages` - Listar vídeos do cache com paginação
- [ ] Criar `/admin/youtube` - Painel de sincronização manual

**Variáveis de Ambiente (.env):**
```env
YOUTUBE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXX
YOUTUBE_CHANNEL_ID=UCxxxxxxxxxxxxxxxxxxxxx
YOUTUBE_PLAYLIST_MESSAGES=PLxxxxxxxxxxxxxxxxxxxxx
YOUTUBE_CACHE_TTL=1800  # 30 minutos
```

**Uso de Quota (Estimativa diária):**
| Operação | Custo/unidade | Frequência | Total |
|----------|---------------|------------|-------|
| Listar vídeos | 100 | 4x/dia | 400 |
| Verificar live | 100 | 48x/dia | 4.800 |
| Detalhes vídeos | 1 | 200x/dia | 200 |
| **TOTAL** | - | - | **5.400/10.000** ✅ |

**Segurança:**
- ✅ API Key apenas no servidor (não exposta ao cliente)
- ✅ Restrições de IP/Referenciador no Google Cloud
- ✅ Endpoint de sync protegido (apenas ADMIN)
- ✅ Cache reduz chamadas à API

**Status:** Aguardando credenciais do YouTube para implementação

---

### FASE 2 - Páginas Principais (Continuação)

#### 4. Calendário de Eventos (`/events`) - PRÓXIMA PRIORIDADE
- [ ] Criar página de eventos `/events`
- [ ] Implementar calendário visual
- [ ] Cards de eventos (grid view)
- [ ] Filtros (tipo, data, ministério)
- [ ] Sistema de inscrição em eventos
- [ ] Página individual de evento `/events/[id]`
- [ ] Informações detalhadas (local, horário, descrição)
- [ ] Galeria de fotos do evento
- [ ] Contador de inscritos
- [ ] Email de confirmação

#### 5. Página "Sou Novo Aqui" (`/about/new-here`)
- [ ] Criar layout acolhedor
- [ ] Informações sobre a igreja
- [ ] O que esperar no primeiro culto
- [ ] Formulário de primeiro contato
- [ ] FAQ para visitantes
- [ ] Vídeo de boas-vindas
- [ ] Mapa de localização

### FASE 2.5 - Páginas Secundárias

#### 6. Página "Nossa História" (`/about/our-story`)
- [ ] Timeline da igreja
- [ ] Missão, visão e valores
- [ ] Fotos históricas
- [ ] Conquistas e marcos

#### 7. Página "Liderança" (`/about/leadership`)
- [ ] Grid de líderes
- [ ] Cards com foto e biografia
- [ ] Informações de contato
- [ ] Áreas de atuação

#### 8. Página "Declaração de Fé" (`/about/beliefs`)
- [ ] Listagem de doutrinas
- [ ] Formatação clara e legível
- [ ] Referências bíblicas
- [ ] Design clean

#### 9. Página "Torne-se Membro" (`/get-involved/membership`)
- [ ] Processo de membresia
- [ ] Requisitos
- [ ] Formulário de interesse
- [ ] Próximas turmas/eventos
- [ ] FAQ sobre membresia

#### 10. Página "Seja Voluntário" (`/get-involved/volunteer`)
- [ ] Áreas de voluntariado
- [ ] Descrição de cada ministério
- [ ] Formulário de inscrição
- [ ] Perfil de voluntário ideal
- [ ] Depoimentos de voluntários

---

## 🎯 Melhorias e Otimizações

### Performance
- [ ] Otimizar imagens (next/image em todas)
- [ ] Lazy loading de componentes pesados
- [ ] Implementar cache de API routes
- [ ] Minificar assets
- [ ] Análise de bundle size

### SEO
- [ ] Adicionar meta tags em todas as páginas
- [ ] Implementar Open Graph tags
- [ ] Criar sitemap.xml
- [ ] Adicionar robots.txt
- [ ] Schema.org markup para eventos
- [ ] Schema.org markup para organização

### Acessibilidade
- [ ] Auditoria com Lighthouse
- [ ] Adicionar labels em todos os forms
- [ ] Melhorar navegação por teclado
- [ ] Testar com screen readers
- [ ] Contraste de cores WCAG AAA

### UX/UI
- [ ] Adicionar loading states em formulários
- [ ] Implementar skeleton loaders
- [ ] Toast notifications para ações
- [ ] Animações de entrada suaves
- [ ] Micro-interações em botões

---

## 🔐 Sistema de Autenticação e Permissões

### Autenticação
- [x] Sistema JWT básico (8 horas de validade)
- [ ] Página de login (`/auth/login`)
- [ ] Página de registro (`/auth/register`)
- [ ] Recuperação de senha
- [ ] Email de verificação
- [ ] Perfil de usuário (`/profile`)
- [ ] Edição de perfil
- [ ] Alteração de senha

### Permissões por Role
- [ ] Middleware de proteção de rotas
- [ ] Dashboard específico por role
- [ ] ADMIN: Acesso total ao painel
- [ ] LEADER: Gestão de departamento
- [ ] VOLUNTEER: Acesso limitado
- [ ] MEMBER: Área do membro

---

## 📱 Painel Administrativo - Expansão

### Dashboard
- [ ] Estatísticas gerais (membros, eventos, doações)
- [ ] Gráficos de crescimento
- [ ] Últimas atividades
- [ ] Tarefas pendentes
- [ ] Avisos importantes

### Gerenciamento
- [x] Membros (CRUD completo)
- [x] Departamentos (CRUD completo)
- [ ] Mensagens/Sermões (CRUD)
- [ ] Eventos (CRUD)
- [ ] Pedidos de Oração (moderação)
- [ ] Blog Posts (CRUD)
- [ ] Cursos (CRUD)
- [ ] Doações (visualização e relatórios)

### Relatórios
- [ ] Relatório de membros por departamento
- [ ] Relatório de frequência em eventos
- [ ] Relatório financeiro (doações)
- [ ] Relatório de novos membros
- [ ] Exportação em PDF/Excel

---

## 💰 Sistema de Doações

### Página Pública
- [ ] Criar página `/donate`
- [ ] Formulário de doação
- [ ] Valores sugeridos
- [ ] Doação customizada
- [ ] Opções de recorrência (única, mensal, anual)
- [ ] Informações fiscais (recibo)

### Integração de Pagamento
- [ ] Definir gateway (PagSeguro, Mercado Pago, Stripe)
- [ ] Integrar API de pagamento
- [ ] Processar webhooks
- [ ] Gerar recibos automáticos
- [ ] Email de confirmação

### Admin
- [ ] Dashboard de doações
- [ ] Listagem de transações
- [ ] Filtros (data, valor, tipo)
- [ ] Gráficos de doações
- [ ] Exportação de relatórios

---

## 📚 Sistema de Cursos

### Páginas Públicas
- [ ] Listagem de cursos (`/courses`)
- [ ] Página de curso individual (`/courses/[slug]`)
- [ ] Inscrição em cursos
- [ ] Área do aluno (`/my-courses`)
- [ ] Player de aulas
- [ ] Progresso do curso
- [ ] Certificado de conclusão

### Admin
- [ ] CRUD de cursos
- [ ] CRUD de aulas
- [ ] Upload de vídeos
- [ ] Materiais complementares
- [ ] Gerenciar alunos matriculados
- [ ] Emissão de certificados

---

## 📝 Blog/Notícias

### Páginas Públicas
- [ ] Listagem de posts (`/blog`)
- [ ] Página de post individual (`/blog/[slug]`)
- [ ] Categorias
- [ ] Tags
- [ ] Busca de posts
- [ ] Comentários (opcional)
- [ ] Compartilhamento social

### Admin
- [ ] CRUD de posts
- [ ] Editor rich text
- [ ] Upload de imagens
- [ ] SEO por post (meta description, etc.)
- [ ] Agendamento de publicação
- [ ] Rascunhos

---

## 🎵 Ministério de Música

### Páginas
- [ ] Página do ministério (`/ministries/music`)
- [ ] Discografia/Álbuns
- [ ] Player de músicas
- [ ] Letras de músicas
- [ ] Acordes (cifras)
- [ ] Agenda de ensaios (para membros)

---

## 📧 Sistema de Email

### Configuração
- [ ] Escolher serviço (SendGrid, AWS SES, etc.)
- [ ] Configurar SMTP
- [ ] Templates de email
- [ ] Email de boas-vindas
- [ ] Confirmação de inscrição em eventos
- [ ] Newsletter
- [ ] Lembretes de eventos

---

## 🔔 Notificações

### Sistema
- [ ] Notificações in-app
- [ ] Push notifications (PWA)
- [ ] Email notifications
- [ ] Preferências de notificação (usuário)

---

## 🌐 Internacionalização (Futuro)

- [ ] Suporte multi-idioma (i18n)
- [ ] Português (padrão)
- [ ] Inglês
- [ ] Espanhol

---

## 📱 Progressive Web App (PWA)

- [ ] Configurar service worker
- [ ] Manifest.json
- [ ] Ícones para todas as plataformas
- [ ] Splash screens
- [ ] Offline mode básico
- [ ] Install prompt

---

## 🧪 Testes

### Testes Unitários
- [ ] Configurar Jest
- [ ] Testes de componentes
- [ ] Testes de utils/helpers
- [ ] Coverage mínimo 80%

### Testes E2E
- [ ] Configurar Playwright/Cypress
- [ ] Fluxo de autenticação
- [ ] Fluxo de cadastro de membro
- [ ] Fluxo de criação de evento
- [ ] Fluxo de doação

---

## 📊 Analytics

- [ ] Google Analytics 4
- [ ] Facebook Pixel (opcional)
- [ ] Hotjar/Microsoft Clarity
- [ ] Monitoramento de conversões
- [ ] Dashboards customizados

---

## 🚀 Deploy e DevOps

### Ambiente de Produção
- [ ] Escolher hospedagem (Vercel, AWS, etc.)
- [ ] Configurar domínio
- [ ] SSL/HTTPS
- [ ] CDN para assets
- [ ] Backup automático do banco

### CI/CD
- [ ] GitHub Actions
- [ ] Testes automáticos
- [ ] Build automático
- [ ] Deploy automático
- [ ] Ambiente de staging

### Monitoramento
- [ ] Sentry (error tracking)
- [ ] Uptime monitoring
- [ ] Performance monitoring
- [ ] Logs centralizados

---

## 📝 Documentação

- [x] CONTEXTO_CONTINUIDADE.md
- [x] TAREFAS.md
- [ ] README.md atualizado
- [ ] API Documentation
- [ ] Guia de contribuição
- [ ] Style guide
- [ ] Documentação de componentes (Storybook?)

---

## 🔧 Manutenção

### Atualizações
- [ ] Atualizar dependências regularmente
- [ ] Security patches
- [ ] Next.js updates
- [ ] Node.js LTS updates

### Backup
- [ ] Estratégia de backup do banco
- [ ] Backup de uploads/mídia
- [ ] Plano de disaster recovery

---

## Prioridades para Próxima Sessão

1. **Alta Prioridade**:
   - Página `/live` (Transmissão Ao Vivo)
   - Página `/prayer-room` (Sala de Oração)
   - Sistema de mensagens/sermões

2. **Média Prioridade**:
   - Calendário de eventos
   - Página "Sou Novo Aqui"
   - Sistema de doações

3. **Baixa Prioridade** (pode ser adiado):
   - Blog/Notícias
   - Sistema de cursos
   - PWA

---

**Notas**:
- Sempre consultar o usuário antes de implementar funcionalidades complexas
- Manter o padrão de design estabelecido (preto/cinza, hover padronizado)
- Testar em mobile antes de considerar concluído
- Documentar decisões importantes
