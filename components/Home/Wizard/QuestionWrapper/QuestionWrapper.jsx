import { Button } from "@material-ui/core";
import styles from "./questionwrapper.module.scss";

const QuestionWrapper = (props) => {
  return (
    <div className={styles.questonComponent}>
      <h3>{props.question}</h3>
      <p>{props.questionDescription}</p>
      <div className={styles.questionInner}>{props.children}</div>
      <div className={styles.actionQueston}>
        <Button
          color="primary"
          onClick={() => props.prevStep(props.step - 1)}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          disabled={!props.isValid}
          color="primary"
          onClick={() =>
            props.nextStep(props.step + 1, props.value)
          }
        >
          {props.btnName ? props.btnName : 'Next'}
        </Button>
      </div>
    </div>
  );
};

export default QuestionWrapper;
