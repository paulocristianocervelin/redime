#!/bin/bash

# Script de deploy para Missão Redime Chapecó
# Execute este script para fazer deploy da aplicação

set -e  # Parar em caso de erro

echo "🚀 Iniciando deploy da Missão Redime Chapecó..."

# Cores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 1. Verificar se arquivo .env existe
echo -e "${BLUE}📋 Verificando variáveis de ambiente...${NC}"
if [ ! -f .env.production ]; then
    echo -e "${RED}❌ Erro: Arquivo .env.production não encontrado!${NC}"
    echo "Copie .env.production.example para .env.production e configure as variáveis"
    exit 1
fi

# 2. Parar containers existentes
echo -e "${BLUE}🛑 Parando containers existentes...${NC}"
docker-compose down

# 3. Limpar builds antigos (opcional)
read -p "Deseja limpar builds antigos? (s/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Ss]$ ]]; then
    echo -e "${BLUE}🧹 Limpando builds antigos...${NC}"
    docker-compose rm -f
    docker volume prune -f
fi

# 4. Build da aplicação
echo -e "${BLUE}🔨 Construindo imagem Docker...${NC}"
docker-compose build --no-cache

# 5. Iniciar serviços
echo -e "${BLUE}🚀 Iniciando serviços...${NC}"
docker-compose up -d

# 6. Aguardar banco de dados estar pronto
echo -e "${BLUE}⏳ Aguardando banco de dados...${NC}"
sleep 5

# 7. Executar migrations
echo -e "${BLUE}📦 Executando migrations do Prisma...${NC}"
docker-compose exec app npx prisma migrate deploy

# 8. (Opcional) Seed do banco de dados
read -p "Deseja popular o banco com dados iniciais? (s/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Ss]$ ]]; then
    echo -e "${BLUE}🌱 Populando banco de dados...${NC}"
    docker-compose exec app npx prisma db seed
fi

# 9. Verificar status
echo -e "${BLUE}✅ Verificando status dos containers...${NC}"
docker-compose ps

# 10. Mostrar logs
echo -e "${GREEN}✨ Deploy concluído com sucesso!${NC}"
echo -e "${BLUE}📝 Logs da aplicação:${NC}"
docker-compose logs -f app
