export default function LevelOptions({ submitLevel }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex">
        <input
          type="radio"
          value="easy"
          id="easy"
          onChange={submitLevel}
          name="level"
          className="radio radio-accent"
          defaultChecked
        />
        <label htmlFor="easy" className="cursor-pointer">
          &nbsp;Easy
        </label>
      </div>
      <div className="flex">
        <input
          type="radio"
          value="medium"
          id="medium"
          onChange={submitLevel}
          name="level"
          className="radio radio-accent"
        />
        <label htmlFor="medium" className="cursor-pointer">
          &nbsp;Medium
        </label>
      </div>
      <div className="flex">
        <input
          type="radio"
          value="hard"
          id="hard"
          onChange={submitLevel}
          name="level"
          className="radio radio-accent"
        />
        <label htmlFor="hard" className="cursor-pointer">
          &nbsp;Hard
        </label>
      </div>
    </div>
  );
}
