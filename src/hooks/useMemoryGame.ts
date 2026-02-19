import { useCallback, useState } from "react";
import { createDeck, type Card } from "../utils/createDeck";
import { EMOJIS } from "../data/emojis";

type UseMemoryGameOptions = {
  initialPairsCount?: number;
  flipBackDelayMs?: number;
};

export function useMemoryGame(options: UseMemoryGameOptions = {}) {
  const { initialPairsCount = 6, flipBackDelayMs = 1000 } = options;

  const [pairsCount, setPairsCount] = useState(initialPairsCount);
  const [cards, setCards] = useState<Card[]>(() =>
    createDeck(initialPairsCount)
  );
  const [firstPickId, setFirstPickId] = useState<string | null>(null);
  const [secondPickId, setSecondPickId] = useState<string | null>(null);
  const [firstPickPairId, setFirstPickPairId] = useState<string | null>(null);
  const [isLocked, setIsLocked] = useState(false);
  const [moves, setMoves] = useState(0);

  const minPairs = 2;
  const maxPairs = EMOJIS.length;

  const clampPairs = (n: number) => Math.max(minPairs, Math.min(maxPairs, n));

  const resetGame = useCallback(() => {
    setCards(createDeck(pairsCount));
    setFirstPickId(null);
    setFirstPickPairId(null);
    setSecondPickId(null);
    setIsLocked(false);
    setMoves(0);
  }, [pairsCount]);

  const setPairsCountAndReset = useCallback((nextPairsCount: number) => {
    setPairsCount(nextPairsCount);
    const safe = clampPairs(nextPairsCount);

    // повний reset гри одразу тут
    setPairsCount(safe);
    setCards(createDeck(safe));
    setFirstPickId(null);
    setFirstPickPairId(null);
    setSecondPickId(null);
    setIsLocked(false);
    setMoves(0);
  }, []);

  const handleCardClick = useCallback(
    (id: string) => {
      if (isLocked) return;
      if (secondPickId !== null) return;

      const clickedCard = cards.find((card) => card.id === id);
      if (!clickedCard) return;
      if (clickedCard.isMatched) return;
      if (clickedCard.isFlipped) return;

      // flip clicked
      setCards((prev) =>
        prev.map((card) =>
          card.id === id ? { ...card, isFlipped: true } : card
        )
      );

      //First pick
      if (firstPickId === null) {
        setFirstPickId(id);
        setFirstPickPairId(clickedCard.pairId);
        return;
      }

      // Second pick
      setSecondPickId(id);
      setMoves((prev) => prev + 1);

      const firstId = firstPickId;
      const secondId = id;

      // Match
      if (firstPickPairId === clickedCard?.pairId) {
        setCards((prev) =>
          prev.map((card) =>
            card.id === firstId || card.id === secondId
              ? { ...card, isMatched: true, isFlipped: true }
              : card
          )
        );
        setFirstPickId(null);
        setSecondPickId(null);
        setFirstPickPairId(null);
        return;
      }

      // No match
      setIsLocked(true);
      setTimeout(() => {
        setCards((prev) =>
          prev.map((card) =>
            card.id === firstId || card.id === secondId
              ? { ...card, isFlipped: false }
              : card
          )
        );
        setFirstPickId(null);
        setSecondPickId(null);
        setFirstPickPairId(null);
        setIsLocked(false);
      }, flipBackDelayMs);
    },
    [
      cards,
      firstPickId,
      firstPickPairId,
      isLocked,
      secondPickId,
      flipBackDelayMs,
    ]
  );

  const isWin = cards.length > 0 && cards.every((card) => card.isMatched);

  return {
    cards,
    pairsCount,
    maxPairs,
    moves,
    isLocked,
    isWin,
    setPairsCount: setPairsCountAndReset,
    resetGame,
    onCardClick: handleCardClick,
  };
}
