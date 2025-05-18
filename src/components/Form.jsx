import RegularButton from "./RegularButton";
import LevelOptions from "./LevelOptions";

export default function Form({ onStartGame, onSelectLevel, isGameOn }) {
  return (
    !isGameOn && (
      <form className="flex flex-col items-center gap-8">
        <div>Please select a level</div>
        <LevelOptions submitLevel={onSelectLevel} />
        <RegularButton handleClick={onStartGame}>Start Game</RegularButton>
      </form>
    )
  );
}
