import "./App.css";
import { useMemoryGame } from "./hooks/useMemoryGame";
import CardList from "./components/CardList/CardList";
import PairsSelector from "./components/PairsSelector/PairsSelector";

function App() {
  const {
    cards,
    pairsCount,
    maxPairs,
    setPairsCount,
    moves,
    isWin,
    onCardClick,
    resetGame,
  } = useMemoryGame({ initialPairsCount: 6, flipBackDelayMs: 1000 });

  return (
    <div className="app">
      <h1 className="title">Mamory game</h1>
      <PairsSelector
        maxPairs={maxPairs}
        pairsCount={pairsCount}
        onDescrement={() => setPairsCount(pairsCount - 1)}
        onIncrement={() => setPairsCount(pairsCount + 1)}
      />
      <div className="stats">
        <div className="moves">Moves: {moves}</div>
        <button type="button" className="restart" onClick={() => resetGame()} aria-label="restart">
          Restart
        </button>
      </div>
      {isWin && <div className="win">You win 🎉</div>}
      <CardList cards={cards} pairsCount={pairsCount} onCardClick={onCardClick} />
    </div>
  );
}

export default App;
