import { Accessor } from 'solid-js';

interface GameOverProps {
  winner: Accessor<'X' | 'O' | 'Tie' | undefined>;
  showNewGame: () => void;
}

export default function GameOver(props: GameOverProps) {
  const titleText =
    props.winner() === 'Tie' ? 'Tie Game' : props.winner() === 'X' ? 'You Win' : 'You Lose';
  const descText =
    props.winner() === 'Tie'
      ? 'No one wins'
      : props.winner() === 'X'
      ? 'You have won.'
      : 'You have lost.';
  const emoji = props.winner() === 'Tie' ? '😐' : props.winner() === 'X' ? '😎' : '😭';
  return (
    <>
      <div class='w-1/3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        <div class={`modal-box bg-secondary text-secondary-content p-5`}>
          <h3 class='font-bold text-2xl'>{titleText}</h3>
          <div class='grid grid-rows-1 grid-cols-2 content-center items-center pt-4'>
            <p class='text-lg'>{descText}</p>
            <p class='mb-2 -ml-3 text-4xl'>{emoji}</p>
          </div>
          <div class={`modal-action`}>
            <button
              class={`btn btn-accent border-2 border-accent-focus`}
              onClick={props.showNewGame}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
