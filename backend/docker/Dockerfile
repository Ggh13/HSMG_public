FROM golang:1.23.6-alpine AS builder

WORKDIR /app

# Копируем сначала зависимости для кэширования
COPY go.mod go.sum ./
RUN go mod download

# Копируем весь проект
COPY . .

# Билдим приложение
RUN CGO_ENABLED=0 GOOS=linux go build -o /main ./cmd/main.go

# Финальный образ
FROM alpine:latest

WORKDIR /app

# Копируем бинарник и конфиг
COPY --from=builder /main .
COPY ./config/config.yaml ./config/

# Переменная для пути к конфигу
ENV CONFIG_PATH=/app/config/config.yaml

EXPOSE 8081

CMD ["./main"]