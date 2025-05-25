export default function Header({ isGameOn, onPause, onRestart }) {
  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-200 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {isGameOn && (
              <li>
                <button onClick={onRestart}>Restart</button>
              </li>
            )}
            <li>
              <a>About</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost text-3xl">Memory ✨</a>
      </div>
      <div className="navbar-end">
        {isGameOn && (
          <div className="text-right pr-6 pt-2">
            <button
              className="cursor-pointer underline underline-offset-4"
              onClick={onPause}
            >
              Pause (F9)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
