import RegularButton from "./RegularButton";
import Confetti from "react-confetti";

export default function GameOver({
  isGameOver,
  onStartGame,
  width,
  height,
  result,
}) {
  return (
    isGameOver && (
      <div className="flex flex-col items-center gap-8 pt-10">
        {result === "win" && (
          <>
            <p className="text-2xl">You Win! 🥳</p>
            <RegularButton handleClick={onStartGame}>
              Restart Game
            </RegularButton>
            <Confetti width={width} height={height} />
          </>
        )}
        {result === "lose" && (
          <>
            <p className="text-2xl">You Lose 😔</p>
            <RegularButton handleClick={onStartGame}>
              Restart Game
            </RegularButton>
          </>
        )}
      </div>
    )
  );
}
