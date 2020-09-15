import styles from "./ProgressBar.module.scss";

const ProgressBar = (props) => {
  return (
    <div className={styles.progressContainer}>
      <div className={styles.progressTitle}>Get a free quote to build on your plot of land in Silicon Valley.</div>
      <div className={styles.progressBarWrapper}>
        <div
          className={styles.innerProgressBar}
          style={{ width: `${props.completedStep}%` }}
        >
          {props.completedStep}%
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
