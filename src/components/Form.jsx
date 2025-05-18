import RegularButton from "./RegularButton";
import LevelOptions from "./LevelOptions";

export default function Form({ onStartGame, onSelectLevel, isGameOn, level }) {
  return (
    !isGameOn && (
      <form className="flex flex-col items-center gap-8">
        <div>Please select a level</div>
        <LevelOptions submitLevel={onSelectLevel} level={level} />
        <RegularButton handleClick={onStartGame}>Start Game</RegularButton>
      </form>
    )
  );
}
