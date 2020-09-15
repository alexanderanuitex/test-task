import { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import styles from "./TypeLot.module.scss";

import QuestionWrapper from "../QuestionWrapper/QuestionWrapper";

const TypeLot = (props) => {
  const [typeLot, setTypeLot] = useState(props.typeLot);
  const [isValid, setIsValid] = useState(false);

  const getQuestionValue = (e) => {
    const result = +e.target.value;
    setTypeLot(result);
  };

  const validation = () => {
    if(typeLot || typeLot === 0) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }

  useEffect(() => {
    validation();
  }, [typeLot])

  const renderQuestions = () => {
    return props.questions.map((item, index) => {
      return (
        <li key={index} className={styles.homeItem}>
          <input
            onClick={getQuestionValue}
            defaultChecked={item.type === typeLot}
            type="radio"
            name="contact"
            id={`homeItem${index}`}
            value={item.type}
          />
          <label htmlFor={`homeItem${index}`}>
            <div className={styles.radioButtonGroup}>
              <div className={styles.radioButton}></div>
              <span className={styles.radioText}>{item.title}</span>
            </div>
            <img src={item.imgUrl} alt="" />
          </label>
        </li>
      );
    });
  };

  return (
    <QuestionWrapper
      question="What type of lot do you have?"
      questionDescription="This helps us get a better picture of what kind of land we're building on."
      prevStep={props.prevStep}
      nextStep={props.nextStep}
      step={props.step}
      isValid={isValid}
      value={{ typeLot }}
    >
      <ul className={styles.homeList}>{renderQuestions()}</ul>
      <TextField
        className='inputMoreInfo'
        id="standard-basic"
        label="Sometnig else we should know ?"
      />
    </QuestionWrapper>
  );
};

export default TypeLot;
