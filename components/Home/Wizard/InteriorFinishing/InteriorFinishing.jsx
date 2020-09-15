import { useState, useEffect } from "react";
import QuestionWrapper from "../QuestionWrapper/QuestionWrapper";
import TextField from "@material-ui/core/TextField";
import styles from "./InteriorFinishing.module.scss";

const InteriorFinishing = (props) => {
  const [interiorLevel, setInteriorLevel] = useState(props.interiorLevel || 0);
  const [isValid, setIsValid] = useState(false);
  
  const levelChange = (e) => {
    setInteriorLevel(+e.target.value);
  };

  const validation = () => {
    if (interiorLevel || interiorLevel === 0) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  useEffect(() => {
    validation();
  }, [interiorLevel]);

  const questionsRender = () => {
    return props.questions.map((item, index) => (
      <li className={styles.homeItem} key={index}>
        <input
          type="radio"
          name="contact"
          id={item.type}
          value={item.type}
          defaultChecked={item.type === interiorLevel ? true : false}
          onChange={(e) => levelChange(e)}
        />
        <label htmlFor={item.type}>
          <div className={styles.radioButtonGroup}>
            <div className={styles.radioButton}></div>
            <span className={styles.radioText}>{item.title}</span>
          </div>
          <div className={styles.cardInfo}>
            <img src={item.imageUrl} alt="" />
            <nav>
              <span>{item.text}</span>
              <ul>
                {item.descriptions.map((desc, index) => (
                  <li key={"interior" + index}>{desc}</li>
                ))}
              </ul>
            </nav>
          </div>
        </label>
      </li>
    ));
  };

  return (
    <QuestionWrapper
      question="Interior finishings"
      questionDescription=""
      prevStep={props.prevStep}
      nextStep={props.nextStep}
      step={props.step}
      isValid={isValid}
      value={{ interiorLevel: interiorLevel }}
    >
      <div className={styles.interiorGrid}>
        <ul className={styles.homeList}>{questionsRender()}</ul>
        <span className={styles.subinfoList}>
          Photos are for example purposes only
        </span>

        <TextField
          className='inputMoreInfo'
          id="standard-basic"
          label="Sometnig else we should know ?"
        />
      </div>
    </QuestionWrapper>
  );
};

export default InteriorFinishing;
