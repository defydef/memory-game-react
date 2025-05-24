export default function Modal() {
  return (
    <dialog id="modal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h2 className="font-bold  text-2xl text-center">Game is Paused</h2>
        <p className="py-4 text-center">
          Press ESC key or click outside to resume
        </p>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
