import RegularButton from "./RegularButton";
import Confetti from "react-confetti";

export default function GameOver({ isGameOver, restartGame, width, height }) {
  return (
    isGameOver && (
      <div>
        <p>You Win!</p>
        <RegularButton handleClick={restartGame}>Restart Game</RegularButton>
        <Confetti width={width} height={height} />
      </div>
    )
  );
}
