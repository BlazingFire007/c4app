interface DrawProps {
  close: () => void;
}
export default function Draw(props: DrawProps) {
  return (
    <>
      <div class='modal modal-open'>
        <div class={`modal-box bg-secondary text-secondary-content w-3/4 md:w-1/3 lg:w-1/4 p-5`}>
          <h3 class='font-bold text-2xl'>*crickets*</h3>
          <div class='grid grid-rows-1 grid-cols-2 content-center items-center pt-4'>
            <p class='text-lg'>You have drawn.</p>
            <p class='mb-2 -ml-3 text-4xl'>😐</p>
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
