import { useState, useEffect } from "react";
import { useWindowSize } from "@reactuses/core";
import Form from "../src/components/Form";
import MemoryCard from "../src/components/MemoryCard";
import Header from "./components/Header";
import GameOver from "./components/GameOver";
import Main from "./components/Main";
import Modal from "./components/Modal";

export default function App() {
  const [isGameOn, setIsGameOn] = useState(false);
  const [emojisData, setEmojisData] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchingCards, setMatchingCards] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [level, setLevel] = useState("easy");
  const [isPaused, setIsPaused] = useState(false);
  const [iconGroup, setIconGroup] = useState("");

  const { width, height } = useWindowSize();
  const numOfPairs =
    level === "easy" ? 5 : level === "medium" ? 10 : level === "hard" ? 20 : -1;

  useEffect(() => {
    // check if the annotation in selected cards are matching
    function checkName() {
      if (selectedCards.length === 2) {
        if (selectedCards[0].name === selectedCards[1].name) {
          setMatchingCards((prevMatchingCards) => [
            ...prevMatchingCards,
            selectedCards,
          ]);
        }
      }
    }
    checkName();
  }, [selectedCards]);

  useEffect(() => {
    // set game over when the length of matchingCards has reached numOfPairs
    if (matchingCards.length === numOfPairs) {
      setIsGameOver(true);
      setIsPaused(false);
    }
  }, [matchingCards, numOfPairs]);

  async function startGame(e) {
    setLevel(level);
    e.preventDefault();
    if (!isPaused) {
      try {
        const response = await fetch(
          `/api/emojis?group=${encodeURIComponent(iconGroup)}`
        );

        if (!response.ok) {
          throw new Error("Could not fetch data from API");
        }

        const data = await response.json();
        const dataSlice = getDataSlice(data, numOfPairs);
        const emojisArray = getEmojisArray(dataSlice);

        setEmojisData(emojisArray);
        setIsGameOn(true);
      } catch (err) {
        console.error(err);
      }
    } else {
      setIsGameOn(true);
    }
  }

  function getDataSlice(data, numOfPairs) {
    const randomIndices = getRandomIndices(data, numOfPairs);

    const dataSlice = randomIndices.reduce((array, index) => {
      array.push(data[index]);
      return array;
    }, []);

    return dataSlice;
  }

  function getRandomIndices(data, numOfPairs) {
    const randomIndicesArray = [];

    for (let i = 0; i < numOfPairs; i++) {
      const randomNum = Math.floor(Math.random() * data.length);
      if (!randomIndicesArray.includes(randomNum)) {
        randomIndicesArray.push(randomNum);
      } else {
        i--;
      }
    }

    return randomIndicesArray;
  }

  function getEmojisArray(data) {
    const pairedEmojisArray = [...data, ...data];

    for (let i = pairedEmojisArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = pairedEmojisArray[i];
      pairedEmojisArray[i] = pairedEmojisArray[j];
      pairedEmojisArray[j] = temp;
    }

    return pairedEmojisArray;
  }

  function turnCard(name, index) {
    const selectedCardEntry = selectedCards.find(
      (card) => card.index === index
    );

    const matchingCardEntry = matchingCards.find(
      (card) => card[0].index === index
    );

    if (!selectedCardEntry && selectedCards.length < 2 && !matchingCardEntry) {
      setSelectedCards((prevSelectedCards) => [
        ...prevSelectedCards,
        { name: name, index: index },
      ]);
    }
    if (
      !selectedCardEntry &&
      selectedCards.length === 2 &&
      !matchingCardEntry
    ) {
      setSelectedCards([{ name: name, index: index }]);
    }
  }

  function pauseGame() {
    setIsPaused(true);
    document.getElementById("modal").showModal();
  }

  function restartGame() {
    setIsGameOn(false);
    setIsGameOver(false);
    setSelectedCards([]);
    setMatchingCards([]);
    setLevel("easy");
  }

  const handleRadioChange = (e) => {
    setLevel(e.target.value);
  };

  const handleIconGroupChange = (e) => {
    setIconGroup(e.target.value);
  };

  return (
    <Main>
      <Header isGameOn={isGameOn} onPause={pauseGame} />
      <Form
        onStartGame={startGame}
        onSelectLevel={handleRadioChange}
        onSelectIconType={handleIconGroupChange}
        isGameOn={isGameOn}
        level={level}
        iconGroup={iconGroup}
      />
      <MemoryCard
        handleClick={turnCard}
        data={emojisData}
        selectedCards={selectedCards}
        matchingCards={matchingCards}
        isGameOn={isGameOn}
      />
      <GameOver
        width={width}
        height={height}
        isGameOver={isGameOver}
        onStartGame={restartGame}
      />
      <Modal />
    </Main>
  );
}
