import { useState, useEffect } from "react";
import QuestionWrapper from "../QuestionWrapper/QuestionWrapper";
import TextField from "@material-ui/core/TextField";
import styles from "./KitchenAndBathrooms.module.scss";

const KitchenAndBathrooms = (props) => {
  const [kitchenLevel, setKitchenLevel] = useState(props.kitchenLevel || 0);
  const [newPrice, setNewPrice] = useState(props.price);
  const [isValid, setIsValid] = useState(false);

  const updatePrice = () => {
    let newPrice = 0;
  
    if(kitchenLevel === 0) {
      newPrice = props.estimatedSqFt * 300
    }else if(kitchenLevel === 1) {
      newPrice = props.estimatedSqFt * 350
    }else if(kitchenLevel === 2) {
      newPrice = props.estimatedSqFt * 400
    };

    setNewPrice(newPrice)
    props.getPrice(newPrice)
  }
  useEffect(() => {
    updatePrice();
  },[kitchenLevel])

  const levelChange = (e) => {
    setKitchenLevel(+e.target.value);
  };

  const validation = () => {
    if (kitchenLevel || kitchenLevel === 0) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  useEffect(() => {
    validation();
  }, [kitchenLevel]);

  const questionsRender = () => {
    return props.questions.map((item, index) => (
      <li className={styles.homeItem} key={index}>
        <input
          type="radio"
          name="contact"
          id={item.type}
          value={item.type}
          defaultChecked={item.type === kitchenLevel ? true : false}
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
                  <li key={"kitchen" + index}>{desc}</li>
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
      question="Kitchens and bathrooms"
      questionDescription="Select the level of finish that matches your lifestyle."
      prevStep={props.prevStep}
      nextStep={props.nextStep}
      step={props.step}
      isValid={isValid}
      value={{ kitchenLevel: kitchenLevel, price: newPrice }}
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

export default KitchenAndBathrooms;
