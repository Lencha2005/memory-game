import type { Card } from "../../utils/createDeck";

import styles from "./CardItem.module.css";

type CardItemProps = {
  card: Card;
  onCardClick: () => void;
};

const CardItem = ({ card, onCardClick }: CardItemProps) => {
  const isFlipped = card.isFlipped || card.isMatched;

  return (
    <button
      type="button"
      className={styles.card}
      onClick={onCardClick}
      aria-label="card"
    >
      <div className={`${styles.cardInner} ${isFlipped ? styles.flipped : ""}`}>
        <div className={styles.cardFront}>❓</div>
        <div className={styles.cardBack}>{card.emoji}</div>
      </div>
    </button>
  );
};

export default CardItem;
