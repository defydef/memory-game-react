export default function RegularButton({ children, handleClick, iconGroup }) {
  const disabledButton = iconGroup === "" ? "btn-disabled" : "";

  return (
    <button
      className={`btn btn-accent text-2xl w-fit py-8 ${disabledButton}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
