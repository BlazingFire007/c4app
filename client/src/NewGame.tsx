interface NGProps {
  showGame: () => void;
}
export default function NewGame(props: NGProps) {
  return (
    <div class='w-1/3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
      <div class={`modal-box bg-secondary text-secondary-content p-5`}>
        <h3 class='font-bold text-2xl'>New Game</h3>
        <div class='grid grid-rows-1 grid-cols-2 content-center items-center pt-4'>
          <p class='text-lg'>Play a game!</p>
        </div>
        <div class={`modal-action`}>
          <button class={`btn btn-accent border-2 border-accent-focus`} onClick={props.showGame}>
            New Game
          </button>
        </div>
      </div>
    </div>
  );
}
