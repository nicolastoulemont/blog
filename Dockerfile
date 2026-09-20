FROM ghcr.io/pnpm/pnpm:12.3.4 AS build

RUN pnpm runtime set node 24 -g

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN --mount=type=cache,id=blog-pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm exec playwright install --with-deps chromium

COPY . .
RUN pnpm build

FROM nginx:alpine AS runtime

COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080
