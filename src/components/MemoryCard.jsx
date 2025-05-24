export default function MemoryCard({
  handleClick,
  data,
  selectedCards,
  matchingCards,
  isGameOn,
}) {
  const emojiEl = data.map((emoji, index) => {
    const isSelectedCard =
      selectedCards.find((card) => card.index === index) !== undefined;
    const isMatchingCard =
      matchingCards.find((cardArr) => cardArr[0].name === emoji.annotation) !==
      undefined;

    const cardStyle = isMatchingCard
      ? `card-item--matched`
      : isSelectedCard
      ? `card-item--selected`
      : ``;

    const btnStyle = isMatchingCard
      ? `btn--emoji__back--matched`
      : isSelectedCard
      ? `btn--emoji__back--selected`
      : `btn--emoji__front`;

    return (
      isGameOn && (
        <li key={index} className={`card-item ${cardStyle}`}>
          <button
            className={`emoji btn--emoji ${btnStyle}`}
            onClick={() => handleClick(emoji.annotation, index)}
          >
            {isSelectedCard || isMatchingCard ? emoji.emoji : `?`}
          </button>
        </li>
      )
    );
  });

  return <ul className="card-container">{emojiEl}</ul>;
}
