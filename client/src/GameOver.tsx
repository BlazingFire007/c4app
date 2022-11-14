interface GameOverProps {
  winner: 'X' | 'O' | 'Tie' | undefined;
}

export default function GameOver(props: GameOverProps) {
  return (
    <div class='flex flex-col items-center'>
      <h1 class='text-4xl font-bold text-center text-gray-800'>
        {props.winner === 'Tie' ? 'Tie Game' : `${props.winner} Wins!`}
      </h1>
      <button class='px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600'>
        Play Again
      </button>
    </div>
  );
}
