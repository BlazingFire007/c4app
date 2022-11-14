import { createSignal, For } from 'solid-js';
import { colToLetter, letterToCol } from './util';

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
  const [placers, setPlacers] = createSignal<Board>({ turn: 'X', position: Array(7).fill('X') });
  async function initGame() {
    const response = await fetch('/start', {
      method: 'POST',
    });
    const { move } = await response.json();

    setHistory(history => [...history, move]);
  }
  async function place(column: number) {
    makeMove(column);
    console.log('player move', colToLetter(column));
    const response = await fetch('/place', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ history: history().join('') }),
    });
    const { move } = await response.json();
    console.log('computer move', colToLetter(move));
    makeMove(move);
  }

  function makeMove(column: number) {
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
  }

  return (
    <main class='max-w-fit mx-auto'>
      <h1 class='text-5xl font-bold text-center pt-4 mb-5'>Connect 4</h1>
      <div class='grid place-content-center items-center'>
        <div class='grid grid-cols-7 grid-rows-6' id='game-grid'>
          <For each={board().position}>
            {(stone, index) => <Square stone={stone} index={index()} place={place} />}
          </For>
        </div>
      </div>
    </main>
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
