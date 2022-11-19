package main

import (
	"fmt"

	"syscall/js"

	"github.com/eli-rich/goc4/src/board"
	"github.com/eli-rich/goc4/src/engine"
)

func main() {

	js.Global().Set("SearchMove", SearchMove())
	js.Global().Set("CheckWin", CheckWin())
	select {}
}

func SearchMove() js.Func {
	return js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		history := args[0].String()
		handler := js.FuncOf(func(this js.Value, args []js.Value) interface{} {
			resolve := args[0]
			go func() {
				fmt.Println("SearchMove")
				fmt.Println(history)
				b := board.Board{Bitboards: [2]board.Bitboard{0, 0}, Turn: 1, Hash: 0}
				b.Load(history)
				cmove := engine.Root(b, 5)
				resolve.Invoke(int(cmove))
			}()
			return nil
		})
		return js.Global().Get("Promise").New(handler)
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
		winner := js.Global().Get("Object")
		winner.Set("cwin", cwin)
		winner.Set("pwin", pwin)
		return winner
	})
}
