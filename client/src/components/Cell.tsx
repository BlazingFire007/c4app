interface CellProps {
  bgColor: string;
  col: number;
  place: (col: number) => void;
}

export default function Cell(props: CellProps) {
  const col = props.col;
  return (
    <>
      <div class='w-full h-full'>
        <div
          onClick={() => props.place(col)}
          class={`${props.bgColor} w-full h-full flex rounded-full cursor-pointer text-neutral-content my-auto text-lg hover:scale-105 transition-transform duration-200`}
        ></div>
      </div>
    </>
  );
}
