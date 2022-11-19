package main

import (
	"fmt"

	"syscall/js"

	"github.com/eli-rich/goc4/src/board"
)

func main() {

	select {}
}

func SearchMove() js.Func {
	return js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		fmt.Println("SearchMove")
		history := args[0].String()
		fmt.Println(history)
		b := board.Board{}

		return nil
	})
}
