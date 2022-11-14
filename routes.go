package main

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
	"werichardson.com/goc4/src/board"
)

type Move struct {
	History string `json:"history" xml:"history" form:"history"`
}

func startGame(c *fiber.Ctx) error {
	b := board.Board{Bitboards: [2]board.Bitboard{0, 0}, Turn: 1, Hash: 0}
	b.Move('D')
	return c.JSON(fiber.Map{
		"move": 'D',
	})
}

func place(c *fiber.Ctx) error {
	move := new(Move)
	if err := c.BodyParser(move); err != nil {
		return err
	}
	b := board.Board{Bitboards: [2]board.Bitboard{0, 0}, Turn: 1, Hash: 0}
	b.Load(move.History)
	fmt.Println(move.History)
	cmove := engine.Root(b, float64(5))
	b.Move(cmove)
	pwin := board.CheckAlign(b.Bitboards[1])
	cwin := board.CheckAlign(b.Bitboards[0])
	board.Print(b)
	return c.JSON(fiber.Map{
		"move": cmove,
		"pwin": pwin,
		"cwin": cwin,
	})
}
