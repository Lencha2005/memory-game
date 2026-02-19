import { EMOJIS } from "../data/emojis";
import { shuffle } from "./shuffle";

export type Card = {
  id: string;
  pairId: string;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
};

export function createDeck(pairsCount: number): Card[] {
  if (pairsCount < 2) throw new Error("pairsCount count must be at least 2");
  if (pairsCount > EMOJIS.length) {
    throw new Error(`pairsCount is too large. Max is ${EMOJIS.length}`);
  }

  const chosen = EMOJIS.slice(0, pairsCount);

  const deck: Card[] = chosen.flatMap((emoji, idx) => {
    const pairId = `pair-${idx}-${emoji}`;
    return [
      {
        id: crypto.randomUUID(),
        pairId,
        emoji,
        isFlipped: false,
        isMatched: false,
      },
      {
        id: crypto.randomUUID(),
        pairId,
        emoji,
        isFlipped: false,
        isMatched: false,
      },
    ];
  });
  return shuffle(deck);
}
