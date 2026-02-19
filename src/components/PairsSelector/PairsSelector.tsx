import styles from "./PairsSelector.module.css";

type PairsSelectorProps = {
  pairsCount: number;
  maxPairs: number;
  onDescrement: () => void;
  onIncrement: () => void;
};

const PairsSelector = ({
  maxPairs,
  pairsCount,
  onDescrement,
  onIncrement,
}: PairsSelectorProps) => {
  return (
    <div className={styles.wrapper}>
      <button
        type="button"
        className={styles.btn}
        onClick={onDescrement}
        disabled={pairsCount <= 2}
      >
        -
      </button>
      <p className={styles.count}>{pairsCount}</p>
      <button
        type="button"
        className={styles.btn}
        onClick={onIncrement}
        disabled={pairsCount >= maxPairs}
      >
        +
      </button>
    </div>
  );
};

export default PairsSelector;
