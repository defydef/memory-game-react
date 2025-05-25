export default function Timer({ time, isGameOn }) {
  const minutes = Math.floor(time / 60);
  const secs = time % 60;

  return (
    isGameOn && (
      <div className="flex flex-col items-center pb-8 text-secondary">
        <h2 className="text-2xl">Time Left:</h2>
        <span className="countdown font-mono text-2xl font-bold">
          <span
            style={{ "--value": minutes } /* as React.CSSProperties */}
            aria-live="polite"
            aria-label={minutes}
          >
            {minutes}
          </span>
          :
          <span
            style={{ "--value": secs } /* as React.CSSProperties */}
            aria-live="polite"
            aria-label={secs}
          >
            {secs}
          </span>
        </span>
      </div>
    )
  );
}
