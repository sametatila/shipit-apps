# ============================================
# ShipIt Apps - Multi-stage Docker Build
# Next.js Standalone Output
# ============================================
# Kullanım:
#   docker build --build-arg APP_NAME=education-demo -f docker/Dockerfile .
#   docker build --build-arg APP_NAME=web -f docker/Dockerfile .

# Stage 1: Dependencies
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

RUN corepack enable pnpm

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml* ./

# Tüm app ve package manifest'lerini kopyala
COPY apps/web/package.json ./apps/web/
COPY apps/education-demo/package.json ./apps/education-demo/
COPY packages/ui/package.json ./packages/ui/
COPY packages/seo/package.json ./packages/seo/
COPY packages/analytics/package.json ./packages/analytics/
COPY packages/email/package.json ./packages/email/
COPY packages/config-tailwind/package.json ./packages/config-tailwind/
COPY packages/config-typescript/package.json ./packages/config-typescript/
COPY packages/config-eslint/package.json ./packages/config-eslint/

RUN pnpm install --frozen-lockfile

# Stage 2: Build
FROM node:20-alpine AS builder
WORKDIR /app

RUN corepack enable pnpm

ARG APP_NAME=web

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/${APP_NAME}/node_modules ./apps/${APP_NAME}/node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV STANDALONE=true

RUN pnpm build --filter=@shipit/${APP_NAME}

# Stage 3: Production
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

ARG APP_NAME=web
ENV APP_NAME=${APP_NAME}

COPY --from=builder /app/apps/${APP_NAME}/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/apps/${APP_NAME}/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/${APP_NAME}/.next/static ./apps/${APP_NAME}/.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD node apps/${APP_NAME}/server.js
