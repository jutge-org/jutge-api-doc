FROM oven/bun:1 AS base

# dependencies
FROM base AS deps
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV DOCKER_BUILD=true
RUN bun run build

# runner
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN groupadd --system --gid 1001 appuser
RUN useradd --system --uid 1001 --gid appuser appuser
COPY --from=builder --chown=appuser:appuser /app/.next/standalone ./
COPY --from=builder --chown=appuser:appuser /app/.next/static ./.next/static
COPY --from=builder --chown=appuser:appuser /app/public ./public
COPY --from=builder --chown=appuser:appuser /app/jutge-api-clients ./jutge-api-clients
USER appuser
EXPOSE 8008

ENV PORT=8008
ENV HOSTNAME="0.0.0.0"

# Start the app
CMD ["bun", "server.js"]