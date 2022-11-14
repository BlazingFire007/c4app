import { Accessor, Match, Switch } from 'solid-js';

interface LoseProps {
  close: () => void;
}
export default function Lose(props: LoseProps) {
  return (
    <>
      <div class='modal modal-open'>
        <div class={`modal-box bg-secondary text-secondary-content w-3/4 md:w-1/3 lg:w-1/4 p-5`}>
          <h3 class='font-bold text-2xl'>Better Luck Next Time</h3>
          <div class='grid grid-rows-1 grid-cols-2 content-center items-center pt-4'>
            <p class='text-lg'>You have lost.</p>
            <p class='mb-2 -ml-3 text-4xl'>😔</p>
          </div>
          <div class={`modal-action`}>
            <button class={`btn btn-accent border-2 border-accent-focus`} onClick={props.close}>
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
