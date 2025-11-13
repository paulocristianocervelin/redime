#!/bin/bash

# Script de backup do banco de dados PostgreSQL
# Cria backup com timestamp no nome

set -e

# Configurações
BACKUP_DIR="./backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="redime_backup_${TIMESTAMP}.sql"

# Cores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}📦 Iniciando backup do banco de dados...${NC}"

# Criar diretório de backups se não existir
mkdir -p $BACKUP_DIR

# Executar backup
echo -e "${BLUE}💾 Criando backup: ${BACKUP_FILE}${NC}"
docker-compose exec -T postgres pg_dump -U redime redime_db > "${BACKUP_DIR}/${BACKUP_FILE}"

# Comprimir backup
echo -e "${BLUE}🗜️  Comprimindo backup...${NC}"
gzip "${BACKUP_DIR}/${BACKUP_FILE}"

# Limpar backups antigos (manter últimos 7 dias)
find $BACKUP_DIR -name "*.sql.gz" -mtime +7 -delete

echo -e "${GREEN}✅ Backup criado: ${BACKUP_DIR}/${BACKUP_FILE}.gz${NC}"
echo -e "${BLUE}📊 Tamanho: $(du -h ${BACKUP_DIR}/${BACKUP_FILE}.gz | cut -f1)${NC}"
