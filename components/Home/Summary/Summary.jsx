import styles from "./Summary.module.scss";

const Summary = (props) => {
  return (
    <div className={styles.summaryContainer}>
      Construction Cost Est.
      <div className={styles.summaryInner}>
        <div>Estimate price Range:</div>
        <div className={styles.summaryValue}>
          <span>${props.price ? props.price - 250 : 0 }</span>
          <div className={styles.summarySign}>—</div>
          <span>${props.price ? props.price + 250 : 0 }</span>
        </div>
      </div>
    </div>
  );
};

export default Summary;
