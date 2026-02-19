import type { Card } from "../../utils/createDeck";

import styles from "./CardItem.module.css";

type CardItemProps = {
  card: Card;
  onCardClick: () => void;
};

const CardItem = ({ card, onCardClick }: CardItemProps) => {
  return (
    <button className={styles.card} onClick={onCardClick}>
      {card.isFlipped || card.isMatched ? card.emoji : "❓"}
    </button>
  );
};

export default CardItem;
