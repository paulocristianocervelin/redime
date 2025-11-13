# 🚀 Guia de Deploy - Missão Redime Chapecó

Este guia fornece instruções completas para fazer deploy da aplicação em produção.

## 📋 Pré-requisitos

- Docker e Docker Compose instalados
- Git (para clonar o repositório)
- Servidor com pelo menos 2GB de RAM
- Domínio configurado (opcional, mas recomendado)

## 🔧 Configuração Inicial

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/redime.git
cd redime
```

### 2. Configure as variáveis de ambiente

```bash
# Copie o arquivo de exemplo
cp .env.production.example .env.production

# Edite o arquivo com suas configurações
nano .env.production
```

**Variáveis OBRIGATÓRIAS:**

```env
# Database
DATABASE_URL="postgresql://redime:SUA_SENHA_AQUI@postgres:5432/redime_db"
POSTGRES_PASSWORD=SUA_SENHA_AQUI

# JWT Secret (gere com: openssl rand -base64 32)
JWT_SECRET=sua_chave_jwt_super_secreta_aqui

# URL da aplicação
NEXT_PUBLIC_APP_URL=https://seudominio.com
```

### 3. Gere senhas seguras

```bash
# Para JWT_SECRET
openssl rand -base64 32

# Para POSTGRES_PASSWORD
openssl rand -base64 24
```

## 🐳 Deploy com Docker

### Deploy Simples

```bash
# Construir e iniciar
docker-compose up -d --build

# Ver logs
docker-compose logs -f app
```

### Deploy com Script (Recomendado)

```bash
# Dar permissão de execução
chmod +x scripts/deploy.sh

# Executar deploy
./scripts/deploy.sh
```

## 📦 Comandos Úteis

### Gerenciar Containers

```bash
# Iniciar aplicação
docker-compose up -d

# Parar aplicação
docker-compose down

# Reiniciar aplicação
docker-compose restart app

# Ver logs
docker-compose logs -f app

# Ver status
docker-compose ps
```

### Banco de Dados

```bash
# Executar migrations
docker-compose exec app npx prisma migrate deploy

# Resetar banco (CUIDADO em produção!)
docker-compose exec app npx prisma migrate reset

# Abrir Prisma Studio
docker-compose exec app npx prisma studio

# Acessar PostgreSQL
docker-compose exec postgres psql -U redime -d redime_db
```

### Backup e Restore

```bash
# Fazer backup
chmod +x scripts/backup-db.sh
./scripts/backup-db.sh

# Restaurar backup
gunzip -c backups/redime_backup_YYYYMMDD_HHMMSS.sql.gz | \
  docker-compose exec -T postgres psql -U redime -d redime_db
```

## 🌐 Configurar Domínio e HTTPS

### Opção 1: Nginx + Let's Encrypt (Recomendado)

1. **Instalar Nginx:**

```bash
sudo apt update
sudo apt install nginx certbot python3-certbot-nginx
```

2. **Criar configuração Nginx:**

```bash
sudo nano /etc/nginx/sites-available/redime
```

```nginx
server {
    listen 80;
    server_name seudominio.com www.seudominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

3. **Ativar site e obter certificado SSL:**

```bash
sudo ln -s /etc/nginx/sites-available/redime /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# Obter certificado SSL
sudo certbot --nginx -d seudominio.com -d www.seudominio.com
```

### Opção 2: Cloudflare (Mais Simples)

1. Adicione seu domínio ao Cloudflare
2. Configure DNS para apontar para IP do servidor
3. Ative SSL/TLS (modo "Full")
4. Ative "Always Use HTTPS"

## 🔐 Segurança em Produção

### Checklist de Segurança

- [ ] Alterar todas as senhas padrão
- [ ] Gerar JWT_SECRET aleatório e forte
- [ ] Configurar firewall (permitir apenas portas 80, 443, 22)
- [ ] Ativar HTTPS
- [ ] Configurar backup automático
- [ ] Limitar acesso SSH (chaves, não senhas)
- [ ] Manter sistema e Docker atualizados

### Configurar Firewall (Ubuntu/Debian)

```bash
# Permitir apenas portas necessárias
sudo ufw allow 22/tcp   # SSH
sudo ufw allow 80/tcp   # HTTP
sudo ufw allow 443/tcp  # HTTPS
sudo ufw enable
```

## 📊 Monitoramento

### Ver uso de recursos

```bash
# CPU e Memória
docker stats

# Espaço em disco
df -h
docker system df
```

### Logs da aplicação

```bash
# Últimas 100 linhas
docker-compose logs --tail=100 app

# Seguir logs em tempo real
docker-compose logs -f app

# Logs com timestamp
docker-compose logs -t app
```

## 🔄 Atualizações

### Atualizar aplicação

```bash
# 1. Fazer backup
./scripts/backup-db.sh

# 2. Baixar atualizações
git pull origin main

# 3. Rebuild e restart
docker-compose down
docker-compose up -d --build

# 4. Executar novas migrations
docker-compose exec app npx prisma migrate deploy
```

## 🆘 Troubleshooting

### Aplicação não inicia

```bash
# Ver logs detalhados
docker-compose logs app

# Verificar variáveis de ambiente
docker-compose config

# Rebuild sem cache
docker-compose build --no-cache
docker-compose up -d
```

### Erro de conexão com banco

```bash
# Verificar se PostgreSQL está rodando
docker-compose ps postgres

# Ver logs do PostgreSQL
docker-compose logs postgres

# Testar conexão
docker-compose exec postgres psql -U redime -d redime_db -c "SELECT 1"
```

### Banco de dados corrompido

```bash
# Parar aplicação
docker-compose down

# Remover volume (ATENÇÃO: perderá dados!)
docker volume rm redime_postgres_data

# Restaurar backup
docker-compose up -d postgres
gunzip -c backups/ultimo_backup.sql.gz | \
  docker-compose exec -T postgres psql -U redime -d redime_db

# Reiniciar aplicação
docker-compose up -d
```

## 📞 Suporte

Para problemas ou dúvidas:
- Abra uma issue no GitHub
- Entre em contato com a equipe de desenvolvimento

---

**Desenvolvido para Missão Redime Chapecó** ❤️
