import type { CSSProperties } from "react";
import type { Card } from "../../utils/createDeck";
import CardItem from "../CardItem/CardItem";

import styles from "./CardList.module.css";

type CardListProps = {
  cards: Card[];
  pairsCount: number;
  onCardClick: (id: string) => void;
};
const CardList = ({ cards, pairsCount, onCardClick }: CardListProps) => {
  const getCols = (pairsCount: number) => {
    if (pairsCount <= 6) return 3;
    if (pairsCount <= 8) return 4;
    if (pairsCount <= 10) return 5;
    return 6;
  };

  const style = {
    "--cols": getCols(pairsCount),
  } as CSSProperties;

  return (
    <div className={styles.cardList} style={style}>
      {cards.length > 2 &&
        cards.map((card) => {
          return (
            <CardItem
              key={card.id}
              card={card}
              onCardClick={() => onCardClick(card.id)}
            />
          );
        })}
    </div>
  );
};

export default CardList;
