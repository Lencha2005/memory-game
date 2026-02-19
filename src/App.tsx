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
    <div>
      <h1>Mamory game</h1>
      <PairsSelector
        maxPairs={maxPairs}
        pairsCount={pairsCount}
        onDescrement={() => setPairsCount(pairsCount - 1)}
        onIncrement={() => setPairsCount(pairsCount + 1)}
      />
      <div>Moves: {moves}</div>
      <button type="button" onClick={() => resetGame()}>
        Restart
      </button>
      {isWin && <div>You win 🎉</div>}
      <CardList cards={cards} onCardClick={onCardClick} />
    </div>
  );
}

export default App;
