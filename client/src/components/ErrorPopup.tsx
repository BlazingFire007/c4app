import { Accessor } from 'solid-js';

interface ErrorProps {
  close: () => void;
}
export default function ErrorPopup(props: ErrorProps) {
  return (
    <>
      <div class='modal modal-open'>
        <div class={`modal-box bg-error text-error-content w-3/4 md:w-1/3 lg:w-1/4 p-5`}>
          <h3 class='font-bold text-2xl'>Illegal Move</h3>
          <div class='grid grid-rows-1 grid-cols-2 content-center items-center pt-4'>
            <p class='text-lg'>This column is full.</p>
            <p class='mb-2 -ml-3 text-4xl'>🚨</p>
          </div>
          <div class={`modal-action`}>
            <button
              class={`btn btn-error border-2 border-error-content hover:scale-110 text-error-content hover:border-2 hover:border-error-content`}
              onClick={props.close}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
