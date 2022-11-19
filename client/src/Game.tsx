import { createSignal, For, Match, Switch } from 'solid-js';

import Cell from './components/Cell';
import Lose from './components/LosePopup';
import Win from './components/WinPopup';
import ErrorPopup from './components/ErrorPopup';
import Draw from './components/DrawPopup';
import { colToLetter } from './util';

type Stone = 'X' | 'O' | ' ';
type MoveChar = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';

type Board = Array<Stone>;
type Memory = Array<MoveChar>;

type Color = 'primary' | 'accent';
type Popup = 'win' | 'lose' | 'draw' | 'error' | 'none';

type Move = number;

export default function Game() {
  const [board, setBoard] = createSignal<Board>(Array(42).fill(' '));
  const [memory, setMemory] = createSignal<Memory>([]);
  const [buttonDisable, setButtonDisable] = createSignal<boolean>(false);
  const [showNG, setShowNG] = createSignal<boolean>(true);
  const [color, setColor] = createSignal<Color>('primary');
  // const [showLoader, setShowLoader] = createSignal<boolean>(false);
  const [showPopup, setShowPopup] = createSignal<Popup>('none');

  function newGame() {
    setBoard(Array(42).fill(' '));
    setMemory([]);
    setButtonDisable(false);
    setShowNG(false);
    setShowPopup('none');
    setShowNG(false);
    if (color() === 'accent') {
      setBoard(b => {
        const nb = [...b];
        nb[lowestEmpty(3)] = 'X';
        return nb;
      });
      setMemory(m => [...m, 'D']);
    }
  }
  function close() {
    setShowPopup('none');
  }
  function youWin() {
    setShowNG(true);
    setShowPopup('win');
  }
  function youLose() {
    setShowNG(true);
    setShowPopup('lose');
  }
  function lowestEmpty(col: Move): number {
    for (let i = 42; i >= 0; i--) {
      if (board()[i] === ' ' && i % 7 === col) {
        return i;
      }
    }
    return -1;
  }
  function place(col: Move) {
    if (showNG()) return;
    if (buttonDisable()) return;
    const potential = lowestEmpty(col);
    if (potential === -1) {
      return setShowPopup('error');
    }
    setBoard(b => {
      const nb = [...b];
      nb[potential] = color() === 'primary' ? 'X' : 'O';
      return nb;
    });
    setMemory(m => {
      const nm = [...m];
      nm.push(colToLetter(col));
      return nm;
    });
    fetchMove();
  }

  async function fetchMove() {
    // setShowLoader(true);
    setButtonDisable(true);
    // @ts-expect-error
    const move = await SearchMove(memory().join(''));
    setBoard(b => {
      const nb = [...b];
      nb[lowestEmpty(move)] = color() === 'primary' ? 'O' : 'X';
      return nb;
    });
    console.log(move);
    setMemory(m => {
      const nm = [...m];
      nm.push(colToLetter(move % 7));
      return nm;
    });
    // setShowLoader(false);
    setButtonDisable(false);
    if (pwin && color() === 'primary') {
      return youWin();
    } else if (pwin && color() === 'accent') {
      return youLose();
    }
    if (cwin && color() === 'accent') {
      return youWin();
    } else if (cwin && color() === 'primary') {
      return youLose();
    }
    if (board().every(s => s !== ' ')) return setShowPopup('draw');
  }

  return (
    <>
      <div class='flex justify-center w-min p-1 mx-auto mt-1 rounded-md'>
        <div class='grid grid-rows-6 grid-cols-7 gap-1' id='game-grid'>
          <For each={board()}>
            {(cell, index) => (
              <Cell
                col={index() % 7}
                place={place}
                bgColor={`${
                  cell === 'X' ? 'bg-primary' : cell === 'O' ? 'bg-accent' : 'bg-neutral-focus'
                }`}
              />
            )}
          </For>
        </div>
      </div>
      <Switch>
        <Match when={showNG() === true}>
          <div class='flex mx-auto w-2/3 justify-center mt-2'>
            <button class={`btn btn-${color()} text-${color()}-content`} onClick={newGame}>
              New Game
            </button>

            <div class={`ml-3 flex justify-center`}>
              <label class='swap swap-flip'>
                <input
                  type='checkbox'
                  onClick={() => setColor(color() === 'primary' ? 'accent' : 'primary')}
                />
                <div class='swap-on'>
                  <div class='w-10 h-10'>
                    <div class='bg-accent w-full h-full flex rounded-full justify-center items-center my-auto text-lg border-black border-[1px]'></div>
                  </div>
                </div>
                <div class='swap-off'>
                  <div class='w-10 h-10'>
                    <div class='bg-primary w-full h-full flex rounded-full justify-center items-center my-auto text-lg border-black border-[1px]'></div>
                  </div>
                </div>
              </label>
            </div>
          </div>
        </Match>
      </Switch>
      <Switch>
        <Match when={showPopup() === 'lose'}>
          <Lose close={close} />
        </Match>
        <Match when={showPopup() === 'win'}>
          <Win close={close} />
        </Match>
        <Match when={showPopup() === 'draw'}>
          <Draw close={close} />
        </Match>
        <Match when={showPopup() === 'error'}>
          <ErrorPopup close={close} />
        </Match>
      </Switch>
    </>
  );
}
