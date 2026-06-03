# ==========================================
# Stage 1: Builder
# ==========================================
FROM node:22-alpine AS builder

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app

# Instala TODAS as dependências (dev + prod necessárias para build)
COPY package*.json ./
RUN npm ci

# Copia o restante dos arquivos
COPY --chown=node:node . .

# Gera o Prisma client
RUN DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy" npx prisma generate

# Compila o Next.js
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Remove devDependencies para reduzir o tamanho da imagem de produção
# (prisma continua presente pois é agora uma dependency normal)
RUN npm prune --omit=dev

# ==========================================
# Stage 2: Production
# ==========================================
FROM node:22-alpine AS production

ENV NEXT_TELEMETRY_DISABLED=1 \
    NODE_ENV=production

USER node
WORKDIR /home/node/app

# Copia o build compilado do Next.js
COPY --from=builder --chown=node:node /home/node/app/.next ./.next

# Copia node_modules (prunado — apenas production deps, inclui prisma CLI)
COPY --from=builder --chown=node:node /home/node/app/node_modules ./node_modules

# Copia arquivos necessários para next start e prisma
COPY --from=builder --chown=node:node /home/node/app/package.json ./package.json
# COPY --from=builder --chown=node:node /home/node/app/public ./public
COPY --from=builder --chown=node:node /home/node/app/prisma ./prisma
COPY --from=builder --chown=node:node /home/node/app/prisma.config.ts ./prisma.config.ts
# COPY --from=builder --chown=node:node /home/node/app/generated ./generated

EXPOSE 3000

# Aplica migrations e inicia o servidor Next.js
CMD ["sh", "-c", "node_modules/.bin/prisma migrate deploy && node_modules/.bin/next start"]
