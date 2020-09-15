import { useState, useEffect } from "react";
import QuestionWrapper from "../QuestionWrapper/QuestionWrapper";
import TextField from "@material-ui/core/TextField";
import styles from "./Landscape.module.scss";

const Landscape = (props) => {
  const [landscapeLevel, setLandscapeLevel] = useState(props.landscapeLevel || 0);
  const [isValid, setIsValid] = useState(false);

  const levelChange = (e) => {
    setLandscapeLevel(+e.target.value);
  };

  const validation = () => {
    if (landscapeLevel || landscapeLevel === 0) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  useEffect(() => {
    validation();
  }, [landscapeLevel]);

  const questionsRender = () => {
    return props.questions.map((item, index) => (
      <li className={styles.homeItem} key={index}>
        <input
          type="radio"
          name="contact"
          id={item.type}
          value={item.type}          
          defaultChecked={item.type === landscapeLevel ? true : false} 
          onChange={(e) => levelChange(e)}
        />
        <label htmlFor={item.type}>
          <div className={styles.radioButtonGroup}>
            <div className={styles.radioButton}></div>
            <span className={styles.radioText}>{item.title}</span>
          </div>
          {item && item.descriptions.length > 0 ? (
            <div className={styles.cardInfo}>
              <img src={item.imageUrl} alt="" />
              <nav>
                <span>{item.text}</span>
                <ul>
                  {item.descriptions.map((desc, index) => (
                     <li key={'landscape' + index}>{desc}</li>
                  ))}
                </ul>
              </nav>
            </div>
          ) : null}
        </label>
      </li>
    ));
  };

  return (
    <QuestionWrapper
      question="Landscaping"
      questionDescription=""
      prevStep={props.prevStep}
      nextStep={props.nextStep}
      step={props.step}
      isValid={isValid}
      value={{ landscapeLevel: landscapeLevel }}
    >
      <div className={styles.kitchenGrid}>
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

export default Landscape;
