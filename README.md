# 🙏 Missão Redime Chapecó

Sistema web completo para gerenciamento da igreja Missão Redime Chapecó, desenvolvido com Next.js 15, TypeScript, Prisma ORM e PostgreSQL.

## ✨ Funcionalidades

### 🎯 Área Pública
- **Landing Page** - Apresentação da igreja
- **Mensagens** - Biblioteca de sermões e estudos bíblicos
- **Eventos** - Agenda de eventos e cultos
- **Sala de Oração** - Espaço para pedidos de oração
- **Transmissão Ao Vivo** - Cultos online
- **Departamentos** - Informações sobre ministérios

### 🔐 Área Administrativa
- **Dashboard** - Painel de controle
- **Gestão de Membros** - CRUD completo de membros
- **Gestão de Departamentos** - Organização de ministérios
- **Controle de Permissões** - Sistema de roles (Admin, Líder, Membro)
- **Autenticação JWT** - Sistema seguro de login

## 🛠️ Tecnologias

- **Framework:** Next.js 15.5.2 (App Router)
- **Linguagem:** TypeScript 5
- **Estilização:** Tailwind CSS 4
- **Componentes:** shadcn/ui + Radix UI
- **ORM:** Prisma
- **Banco de Dados:** PostgreSQL
- **Autenticação:** JWT (jose)
- **Deploy:** Docker + Docker Compose

## 🚀 Deploy em Produção

### Início Rápido

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/redime.git
cd redime

# 2. Configure variáveis de ambiente
cp .env.production.example .env.production
nano .env.production  # Edite com suas configurações

# 3. Execute o deploy
chmod +x scripts/deploy.sh
./scripts/deploy.sh
```

### Configuração Manual

```bash
# 1. Configure .env.production com:
DATABASE_URL="postgresql://usuario:senha@postgres:5432/redime_db"
JWT_SECRET="sua-chave-secreta-aqui"
NEXT_PUBLIC_APP_URL="https://seudominio.com"

# 2. Build e start
docker-compose up -d --build

# 3. Execute migrations
docker-compose exec app npx prisma migrate deploy
```

📖 **Documentação completa:** [DEPLOY.md](./DEPLOY.md)

## 💻 Desenvolvimento Local

### Pré-requisitos

- Node.js 20+
- PostgreSQL 14+
- npm ou yarn

### Instalação

```bash
# 1. Clone e instale dependências
git clone https://github.com/seu-usuario/redime.git
cd redime
npm install

# 2. Configure .env
cp .env.example .env
nano .env

# 3. Configure banco de dados
npx prisma migrate dev
npx prisma db seed  # Dados iniciais (opcional)

# 4. Execute em desenvolvimento
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000)

### Scripts Disponíveis

```bash
npm run dev          # Desenvolvimento
npm run build        # Build para produção
npm start            # Servidor de produção
npm run lint         # Verificar linting
```

## 📁 Estrutura do Projeto

```
redime/
├── src/
│   ├── app/              # App Router (Next.js 15)
│   │   ├── admin/        # Área administrativa
│   │   ├── api/          # API Routes
│   │   ├── auth/         # Autenticação
│   │   ├── messages/     # Mensagens públicas
│   │   └── ...
│   ├── components/       # Componentes React
│   │   ├── admin/        # Componentes admin
│   │   ├── layout/       # Layout components
│   │   └── ui/           # shadcn/ui components
│   └── lib/              # Utilitários e configurações
│       ├── auth.ts       # Lógica de autenticação
│       ├── prisma.ts     # Cliente Prisma
│       └── utils.ts      # Funções utilitárias
├── prisma/
│   ├── schema.prisma     # Schema do banco de dados
│   └── migrations/       # Migrations
├── public/               # Arquivos estáticos
├── scripts/              # Scripts de deploy e manutenção
├── Dockerfile            # Configuração Docker
├── docker-compose.yml    # Orquestração de containers
└── next.config.ts        # Configuração Next.js
```

## 🗄️ Schema do Banco de Dados

### Principais Modelos

- **User** - Usuários do sistema (membros, líderes, admins)
- **MemberProfile** - Perfil detalhado dos membros
- **Department** - Departamentos/Ministérios
- **MemberDepartment** - Relação many-to-many (membros ↔ departamentos)

### Enums

- **UserRole**: ADMIN, LEADER, VOLUNTEER, MEMBER
- **DepartmentCategory**: CHILDREN, YOUTH, MUSIC, PRAYER, etc.

## 🔒 Segurança

- ✅ Autenticação JWT com tokens de 8 horas
- ✅ Senhas hasheadas com bcrypt
- ✅ Validação de permissões em todas as rotas da API
- ✅ Proteção contra SQL Injection (Prisma ORM)
- ✅ HTTPS obrigatório em produção

## 📦 Backup e Manutenção

### Backup Automático

```bash
# Executar backup
./scripts/backup-db.sh

# Backups são salvos em ./backups/
# Arquivos antigos (>7 dias) são automaticamente removidos
```

### Restaurar Backup

```bash
gunzip -c backups/redime_backup_YYYYMMDD_HHMMSS.sql.gz | \
  docker-compose exec -T postgres psql -U redime -d redime_db
```

## 🐛 Troubleshooting

### Aplicação não inicia

```bash
# Ver logs
docker-compose logs app

# Rebuild sem cache
docker-compose build --no-cache
docker-compose up -d
```

### Erro de conexão com DB

```bash
# Verificar PostgreSQL
docker-compose ps postgres
docker-compose logs postgres
```

## 📝 Licença

Desenvolvido especialmente para a Missão Redime Chapecó.

---

**Desenvolvido com ❤️ para a Missão Redime Chapecó**

*Amor • Verdade • Mesa & Discipulado*
