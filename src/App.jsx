import { useEffect, useState } from "react";
import "./styles/App.css";
import Card from "./components/Card";
import ResultBoard from "./components/ResultBoard";

function App() {
  const [cardData, setCardData] = useState([]);
  const [gameStart, setGameStart] = useState(false);
  const [gameLose, setGameLose] = useState(false);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  const shuffle = (array) => {
    return array
      .map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);
  };

  const getCards = async () => {
    const res = await fetch(`https://api.jikan.moe/v4/anime/50139/characters`);
    const resData = await res.json();
    let apiData = resData.data;

    let cards = [];

    apiData.map((data) => {
      const cardData = {
        id: data.character.mal_id,
        name: data.character.name,
        src: data.character.images.webp.image_url,
        clicked: false,
      };
      cards.push(cardData);
    });

    cards = cards.filter((card) => card.id != 191717);
    cards = shuffle(cards);
    cards.length = 10;
    setCardData(cards);
  };

  const handleChoice = (card) => {
    if (card.clicked) {
      setGameLose(true);
    } else {
      card.clicked = true;
      let cards = shuffle(cardData);
      setCardData(cards);
      setScore((prevScore) => prevScore + 1);
    }
  };

  const resetGame = () => {
    if (score >= bestScore) {
      setBestScore(score);
    }

    getCards();
    setGameStart(false);
    setGameLose(false);
    setScore(0);
  };

  useEffect(() => {
    getCards();
  }, []);

  useEffect(() => {
    if (bestScore <= score) {
      setBestScore(score);
    }
  }, [score]);

  return (
    <>
      <div className="screen">
        <ResultBoard score={score} gameLose={gameLose} resetGame={resetGame} />
        <div className={gameLose || score === 10 ? "App stop" : "App"}>
          <div className="game-btn">
            {!gameStart && (
              <button className="refresh-btn" onClick={getCards}>
                Refresh cards
              </button>
            )}
            {!gameStart && (
              <button
                className="start-btn"
                onClick={() => {
                  setGameStart(true);
                }}
              >
                Start Game
              </button>
            )}
          </div>
          <div className="score-board">
            <div>Score : {score}</div>
            <div>Best Score : {bestScore}</div>
          </div>
          <div className="game-setup">
            <h1>Twisted Wonderland Memory Card Game</h1>
            <div className="instruction">
              Do not click on the same card twice!
            </div>
          </div>

          <div className={gameStart ? "game" : "game stop"}>
            <div className="card-grid">
              {cardData
                ? cardData.map((character) => {
                    return (
                      <Card
                        key={character.id}
                        character={character}
                        handleChoice={handleChoice}
                      />
                    );
                  })
                : "Not found"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
