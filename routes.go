package main

import (
	"github.com/gofiber/fiber/v2"
	"werichardson.com/c4/game/board"
	"werichardson.com/c4/game/engine"
)

func startGame(c *fiber.Ctx) error {
	b := board.Board{Bitboards: [2]board.Bitboard{0, 0}, Turn: 1, Hash: 0}
	cmove := engine.Root(b, float64(5))
	b.Move(cmove)
	p1, p2 := board.Serialize(b)
	return c.JSON(fiber.Map{
		"p1": p1,
		"p2": p2,
	})
}
