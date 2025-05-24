export default function Header({ isGameOn, onPause }) {
  return (
    <div className="grid grid-cols-6 gap-4 pb-8">
      <div className="flex items-center pl-6 cursor-pointer text-2xl">
        <p>&#9776;&nbsp;Menu</p>
      </div>
      <div className="col-span-4 col-start-2 flex justify-center pt-8">
        <h1 className="uppercase tracking-wider text-5xl">
          Memory<span className=" text-md">✨</span>
        </h1>
      </div>
      {isGameOn && (
        <div className="text-right pr-6 pt-2">
          <button
            className="cursor-pointer underline underline-offset-4"
            onClick={onPause}
          >
            Pause
          </button>
        </div>
      )}
    </div>
  );
}
