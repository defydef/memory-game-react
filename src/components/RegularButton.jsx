export default function RegularButton({ children, handleClick }) {
  return (
    <button
      className="btn btn-accent text-2xl w-fit py-8"
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
