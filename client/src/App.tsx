import { createSignal, For } from 'solid-js';

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
  const [board, setBoard] = createSignal<Board>({ turn: 'X', position: Array(42).fill(' ') });
  const [placers, setPlacers] = createSignal<Board>({ turn: 'X', position: Array(7).fill('X') });
  async function place(column: number) {
    const response = await fetch('/start', {
      method: 'POST',
    });
    const { p1, p2 } = await response.json();
    let position: Stone[] = Array(42).fill(' ');
    position = position.map((stone, index) => {
      if (p1.includes(index)) return 'X';
      if (p2.includes(index)) return 'O';
      return ' ';
    });
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
        class={`${color} w-full h-full rounded-full cursor-pointer`}
        onClick={() => props.place(column)}
      ></div>
    </div>
  );
}
