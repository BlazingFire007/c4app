FROM golang:alpine
WORKDIR /app
COPY . .
RUN go build -ldflags="-w -s" -o main
EXPOSE 80
CMD ["./main"]