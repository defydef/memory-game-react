import { useState, useEffect } from "react";
import { useWindowSize } from "@reactuses/core";
import Form from "../src/components/Form";
import MemoryCard from "../src/components/MemoryCard";
import Header from "./components/Header";
import GameOver from "./components/GameOver";
import Main from "./components/Main";
import Modal from "./components/Modal";
import Timer from "./components/Timer";

export default function App() {
  const [isGameOn, setIsGameOn] = useState(false);
  const [emojisData, setEmojisData] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchingCards, setMatchingCards] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [level, setLevel] = useState("easy");
  const [isPaused, setIsPaused] = useState(false);
  const [iconGroup, setIconGroup] = useState("");
  const [time, setTime] = useState(120); // countdown starts from second 120
  const [result, setResult] = useState("");

  const { width, height } = useWindowSize();
  const numOfPairs =
    level === "easy" ? 5 : level === "medium" ? 10 : level === "hard" ? 20 : -1;

  // Pause timer when game is paused
  useEffect(() => {
    let timer;

    if (isGameOn && !isGameOver && !isPaused && time > 0) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }

    if (time === 0 && isGameOn && !isPaused) {
      setIsGameOver(true);
      setResult("lose");
    }

    return () => clearInterval(timer);
  }, [isGameOn, isGameOver, isPaused, time]);

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
      setResult("win");
      setIsPaused(false);
    }
  }, [matchingCards, numOfPairs]);

  // Pause game when pressing on F9
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "F9") {
        pauseGame(); // Call your function
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Cleanup the event listener on unmount
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [pauseGame]);

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

  function resumeGame() {
    setIsPaused(false);
  }

  function restartGame() {
    setIsPaused(false);
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
      <Header
        isGameOn={isGameOn}
        onPause={pauseGame}
        onRestart={() => {
          setIsPaused(true);
          document.getElementById("modal_restart").showModal();
        }}
      />
      <Timer time={time} isGameOn={isGameOn} />
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
        result={result}
      />
      <Modal resumeGame={resumeGame} />
      <dialog id="modal_restart" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h2 className="font-bold  text-2xl text-center">Restart Game?</h2>
          <p className="py-4 text-center">You'll lose all your game progress</p>
          <div className="modal-action">
            <form method="dialog" className="flex gap-4">
              <button
                className="btn btn-outline btn-secondary"
                onClick={restartGame}
              >
                Yes, I'm sure
              </button>
              <button
                className="btn btn-active btn-secondary"
                onClick={resumeGame}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </Main>
  );
}
