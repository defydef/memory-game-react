import { useEffect } from "react";

export default function Modal({ resumeGame }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        resumeGame(); // Call your function
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Cleanup the event listener on unmount
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [resumeGame]);

  return (
    <dialog id="modal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h2 className="font-bold  text-2xl text-center">Game is Paused</h2>
        <p className="py-4 text-center">
          Press ESC key or click Close button to resume.
        </p>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn" onClick={resumeGame}>
              Close
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
