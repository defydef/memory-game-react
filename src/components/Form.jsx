import RegularButton from "./RegularButton";
import LevelOptions from "./LevelOptions";
import IconType from "./IconType";

export default function Form({
  onStartGame,
  onSelectLevel,
  onSelectIconType,
  isGameOn,
  level,
  iconGroup,
}) {
  return (
    !isGameOn && (
      <form className="flex flex-col items-center gap-8 pt-2">
        <div>Please select a level</div>
        <LevelOptions submitLevel={onSelectLevel} level={level} />
        <IconType submitIconType={onSelectIconType} />
        <RegularButton handleClick={onStartGame} iconGroup={iconGroup}>
          Start Game
        </RegularButton>
      </form>
    )
  );
}
