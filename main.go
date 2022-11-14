package main

import (
	"github.com/gofiber/fiber/v2"
)

func main() {
	app := fiber.New()
	app.Static("/", "./client/dist")
	app.Post("/start", startGame)
	app.Post("/place", place)
	app.Listen("0.0.0.0:80")
}
