# Dockerfile para Missão Redime Chapecó - Next.js 15 com Prisma
# Build stage
FROM node:20-alpine AS builder

# Instalar dependências do sistema necessárias
RUN apk add --no-cache \
    libc6-compat \
    python3 \
    make \
    g++ \
    openssl

# Definir diretório de trabalho
WORKDIR /app

# Definir variáveis de ambiente para build
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Copiar arquivos de configuração primeiro
COPY package*.json ./

# Instalar todas as dependências (dev e prod para build)
RUN npm ci && npm cache clean --force

# Copiar Prisma schema
COPY prisma ./prisma/

# Gerar cliente Prisma
RUN npx prisma generate

# Copiar todo o código fonte
COPY . .

# Build da aplicação Next.js (sem Turbopack para estabilidade no Docker)
RUN npm run build

# Production stage
FROM node:20-alpine AS runner

# Instalar dependências do sistema para produção
RUN apk add --no-cache \
    ca-certificates \
    tzdata \
    wget \
    openssl \
    && addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

# Definir timezone
ENV TZ=America/Sao_Paulo

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos necessários do build
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

# Definir permissões
RUN chown -R nextjs:nodejs /app
USER nextjs

# Expor porta
EXPOSE 3000

# Variáveis de ambiente de produção
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/api/health || exit 1

# Comando para iniciar a aplicação
CMD ["node", "server.js"]
