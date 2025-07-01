# Stage 1: Build фронта
FROM node:20.18.0-alpine AS builder

WORKDIR /app
COPY . .
RUN yarn install --frozen-lockfile
RUN yarn build

# Stage 2: Nginx для отдачи статики
FROM nginx:alpine

# Копируем билд из предыдущего этапа
COPY --from=builder /app/build /usr/share/nginx/html

# Кастомный nginx конфиг
COPY default.conf /etc/nginx/conf.d/default.conf
