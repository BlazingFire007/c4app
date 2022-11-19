package main

import (
	"fmt"

	"syscall/js"

	"github.com/eli-rich/goc4/src/board"
	"github.com/eli-rich/goc4/src/engine"
)

func main() {

	select {}
}

func SearchMove() js.Func {
	return js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		fmt.Println("SearchMove")
		history := args[0].String()
		fmt.Println(history)
		b := board.Board{Bitboards: [2]board.Bitboard{0, 0}, Turn: 1, Hash: 0}
		b.Load(history)
		cmove := engine.Root(b, 5)

		return nil
	})
}
