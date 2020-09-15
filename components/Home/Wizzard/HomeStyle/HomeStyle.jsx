import { useState, useEffect } from "react";
import QuestionWrapper from "../QuestionWrapper/QuestionWrapper";
import TextField from "@material-ui/core/TextField";
import styles from "./HomeStyle.module.scss";

const HomeStyle = (props) => {
  const [homeStyles, setHomeStyles] = useState(props.homeStyles);
  const [isValid, setIsValid] = useState(false);

  const getQuestionValue = (e) => {
    const result = +e.target.value;
    setHomeStyles(result);
  };

  const validation = () => {
    if (homeStyles || homeStyles === 0) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  useEffect(() => {validation()}, [homeStyles]);
  const questionsRender = () => {
    return props.questions.map((item, index) => {
      return (
        <li className={styles.homeItem} key={index}>
          <input
            onClick={getQuestionValue}
            defaultChecked={item.type === homeStyles}
            type="radio"
            name="contact"
            id={`homeItem${index}`}
            value={item.type}
          />
          <label htmlFor={`homeItem${index}`}>
            <div className={styles.radioButtonGroup}>
              <div className={styles.radioButton}></div>
              <span className={styles.radioText}>
                Bungalow, Craftsman, or Cottage
              </span>
            </div>
            <img src={item.imageUrl} alt="" />
          </label>
        </li>
      );
    });
  };

  return (
    <QuestionWrapper
      question="What style of home do you want?"
      questionDescription="Select the style that best matches your dream home"
      prevStep={props.prevStep}
      nextStep={props.nextStep}
      step={props.step}
      isValid={isValid}
      value={{ homeStyles }}
    >
      <ul className={styles.homeList}>{questionsRender()}</ul>

      <TextField
        className='inputMoreInfo'
        id="standard-basic"
        label="Sometnig else we should know ?"
      />
    </QuestionWrapper>
  );
};

export default HomeStyle;
