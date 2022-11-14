package main

import (
	"fmt"
	"os"

	"github.com/gofiber/fiber/v2"
)

func main() {
	app := fiber.New()
	app.Static("/", "./client/dist")
	app.Post("/start", startGame)
	app.Post("/place", place)
	ls, _ := os.ReadDir(".")
	for _, f := range ls {
		fmt.Println(f.Name())
	}
	app.Listen("0.0.0.0:80")
}
