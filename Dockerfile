FROM node:alpine AS builder
WORKDIR /app
COPY client .
WORKDIR /app/client
RUN npm i -g pnpm
RUN pnpm install
RUN pnpm build

FROM golang:alpine
WORKDIR /app
COPY --from=builder /app/client ./client
RUN go build -ldflags="-w -s" -o main
EXPOSE 80
CMD ["./main"]