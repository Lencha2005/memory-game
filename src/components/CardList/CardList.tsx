import type { Card } from "../../utils/createDeck";
import CardItem from "../CardItem/CardItem";

import styles from "./CardList.module.css";

type CardListProps = {
  cards: Card[];
  onCardClick: (id: string) => void;
};
const CardList = ({ cards, onCardClick }: CardListProps) => {
  return (
    <div className={styles.cardList}>
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
