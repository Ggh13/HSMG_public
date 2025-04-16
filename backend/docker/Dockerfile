FROM golang:1.23.6-alpine3.21 as builder

# Set destination for COPY
WORKDIR /app

# Download Go modules
COPY . .
RUN go mod download

# Build
RUN CGO_ENABLED=0 GOOS=linux go build -o /HSMGweb ./cmd/main.go

FROM alpine:3.21

WORKDIR /app

COPY --from=builder /HSMGweb .

EXPOSE 8080
EXPOSE 8081

# Run
CMD ["./HSMGweb"]