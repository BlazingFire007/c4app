package main

import (
	"fmt"

	"syscall/js"

	"github.com/eli-rich/goc4/src/board"
	"github.com/eli-rich/goc4/src/engine"
)

func main() {

	js.Global().Set("SearchMove", SearchMove())
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
		return int(cmove)
	})
}

func CheckWin() js.Func {
	return js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		fmt.Println("CheckWin")
		history := args[0].String()
		fmt.Println(history)
		b := board.Board{Bitboards: [2]board.Bitboard{0, 0}, Turn: 1, Hash: 0}
		b.Load(history)
		cwin := board.CheckAlign(b.Bitboards[0])
		pwin := board.CheckAlign(b.Bitboards[1])
		if cwin {
			return 1
		} else if pwin {
			return 2
		} else {
			return 0
		}
	})
}
