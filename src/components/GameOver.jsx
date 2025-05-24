import RegularButton from "./RegularButton";
import Confetti from "react-confetti";

export default function GameOver({ isGameOver, onStartGame, width, height }) {
  return (
    isGameOver && (
      <div className="flex flex-col items-center gap-8 pt-10">
        <p>You Win!</p>
        <RegularButton handleClick={onStartGame}>Restart Game</RegularButton>
        <Confetti width={width} height={height} />
      </div>
    )
  );
}
