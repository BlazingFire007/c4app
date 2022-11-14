import { createSignal, For, Match, Switch } from 'solid-js';
import GameOver from './GameOver';
import NewGame from './NewGame';
import { colToLetter } from './util';

type Stone = 'X' | 'O' | ' ';
type Position = Stone[];
type Turn = 'X' | 'O';

interface Board {
  position: Position;
  turn: Turn;
}

interface SquareProps {
  stone: Stone;
  index: number;
  place: (column: number) => void;
}
export default function App() {
  const [history, setHistory] = createSignal<string[]>([]);
  const [board, setBoard] = createSignal<Board>({ turn: 'X', position: Array(42).fill(' ') });
  const [winner, setWinner] = createSignal<'X' | 'O' | 'Tie'>();
  const [newGame, showNewGame] = createSignal<boolean>(true);
  const [waiting, setWaiting] = createSignal<boolean>(false);
  function toggleNewGame() {
    setWinner(undefined);
    setBoard({ turn: 'X', position: Array(42).fill(' ') });
    setHistory([]);
    showNewGame(!newGame());
  }
  async function place(column: number) {
    if (!makeMove(column)) return;
    setWaiting(true);
    console.log('player move', colToLetter(column));
    const response = await fetch('/place', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ history: history().join('') }),
    });
    const { move, pwin, cwin } = await response.json();
    console.log(`server move ${move}`);
    console.log(`pwin ${pwin}`);
    console.log(`cwin ${cwin}`);
    if (pwin) setWinner('X');
    if (cwin) setWinner('O');
    if (board().position.every(stone => stone !== ' ')) setWinner('Tie');
    setWaiting(false);
    makeMove(move);
  }

  function makeMove(column: number) {
    if (waiting()) return false;
    let position = [...board().position];
    let placed = false;
    for (let i = 42; i >= 0; i -= 7) {
      if (position[i + column] === ' ') {
        position[i + column] = board().turn;
        placed = true;
        break;
      }
    }
    if (placed === false) return false;
    setHistory(history => [...history, colToLetter(column)]);
    setBoard({ turn: board().turn === 'X' ? 'O' : 'X', position });
    return true;
  }

  return (
    <Switch>
      <Match when={newGame()}>
        <NewGame showGame={toggleNewGame} />
      </Match>
      <Match when={!newGame()}>
        <main class='grid place-content-center'>
          <h1 class='text-5xl font-bold text-center pt-4 mb-5'>Connect 4</h1>
          <div class='grid place-content-center items-center'>
            <div class='grid grid-cols-7 grid-rows-6' id='game-grid'>
              <For each={board().position}>
                {(stone, index) => <Square stone={stone} index={index()} place={place} />}
              </For>
            </div>
          </div>
          {winner() !== undefined && <GameOver winner={winner} showNewGame={toggleNewGame} />}
        </main>
      </Match>
    </Switch>
  );
}

function Square(props: SquareProps) {
  const column = props.index % 7;
  const color =
    props.stone === 'X' ? 'bg-primary' : props.stone === 'O' ? 'bg-accent' : 'bg-neutral-focus';
  return (
    <div class={`bg-base-300 p-1`}>
      <div
        class={`${color} w-full h-full rounded-full cursor-pointer hover:scale-110 transition-transform duration-200`}
        onClick={() => props.place(column)}
      ></div>
    </div>
  );
}
