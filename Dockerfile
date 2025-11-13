# Dockerfile para Next.js 15 com Prisma
# Build otimizado em multi-stage para produção

# ==========================================
# Stage 1: Dependências
# ==========================================
FROM node:20-alpine AS deps
WORKDIR /app

# Instalar dependências do sistema necessárias para Prisma
RUN apk add --no-cache libc6-compat openssl

# Copiar arquivos de dependências
COPY package.json package-lock.json* ./
COPY prisma ./prisma/

# Instalar dependências
RUN npm ci --only=production && \
    npm cache clean --force

# Gerar Prisma Client
RUN npx prisma generate

# ==========================================
# Stage 2: Builder
# ==========================================
FROM node:20-alpine AS builder
WORKDIR /app

# Instalar dependências do sistema
RUN apk add --no-cache libc6-compat openssl

# Copiar dependências instaladas
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/prisma ./prisma

# Copiar código fonte
COPY . .

# Build da aplicação Next.js
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Build usando webpack (mais estável para Docker)
RUN npm run build

# ==========================================
# Stage 3: Runner (Produção)
# ==========================================
FROM node:20-alpine AS runner
WORKDIR /app

# Instalar dependências do sistema para runtime
RUN apk add --no-cache openssl libc6-compat

# Criar usuário não-root para segurança
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copiar arquivos necessários do builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/next.config.ts ./next.config.ts

# Copiar build do Next.js
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copiar node_modules (incluindo Prisma Client gerado)
COPY --from=deps --chown=nextjs:nodejs /app/node_modules ./node_modules

# Definir variáveis de ambiente
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Expor porta
EXPOSE 3000

# Mudar para usuário não-root
USER nextjs

# Comando para iniciar a aplicação
CMD ["node", "server.js"]
