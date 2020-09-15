import { useState, useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import styles from "./HomeFeatures.module.scss";

import QuestionWrapper from "../QuestionWrapper/QuestionWrapper";

const HomeFeatures = (props) => {
  const oneSqFtPrice = props.priceSqFt.oneSqFt;
  const [homeFeatures, setHomeFeatures] = useState(
    props.homeFeatures || props.questions.homeFeatures
  );
  const [resultPrice, setResultPrice] = useState(props.price || 0);
  const [estimatedSqFt, setEstimatedSqFt] = useState(props.estimatedSqFt || 0);
  const [garage, setGarage] = useState(props.garage || 0);
  const [isValid, setIsValid] = useState(false);

  const getPrice = () => {
    let price = 0;
    let resultSqFt = 0;
    homeFeatures.forEach((item) => {
      if (item.value > 0) {
        resultSqFt = resultSqFt + item.value * 40;
        price = price + (item.value * 40) * oneSqFtPrice;
      }
    });
    setEstimatedSqFt(resultSqFt);
    setResultPrice(price);
    props.getPrice(price);
  };
  useEffect(() => {
    getPrice();
    setIsValid(true);
  }, [homeFeatures]);

  const handleChangeHomeFeatures = (number, type) => {
    if (number < 0) {
      return;
    }
    const currentQuestion = homeFeatures.find((item) => item.type === type);
    currentQuestion.value = number;
    setHomeFeatures((prevState) => {
      const questions = [...prevState];
      questions[questions.find((item) => item.type === type)] = currentQuestion;
      return [...questions];
    });
  };
  const handeChangeGarage = (e) => {
    setGarage(+e.target.value);
  };

  const renderHomeFeatures = () => {
    return homeFeatures.map((item, index) => {
      return (
        <div key={index}>
          <ListItem className={styles.listItem}>
            <div>{item.text}</div>
            <div>
              <IconButton
                onClick={(e) =>
                  handleChangeHomeFeatures(item.value - 1, item.type)
                }
                aria-label="remove"
              >
                <RemoveIcon fontSize="small" />
              </IconButton>
              <span>{item.value}</span>
              <IconButton
                aria-label="add"
                onClick={(e) =>
                  handleChangeHomeFeatures(item.value + 1, item.type)
                }
              >
                <AddIcon fontSize="small" />
              </IconButton>
            </div>
          </ListItem>
          <Divider />
        </div>
      );
    });
  };
  const renderRadio = () => {
    return props.questions.garageTypes.map((item, index) => {
      return (
        <FormControlLabel
          key={index}
          value={item.type}
          control={<Radio />}
          label={item.text}
        />
      );
    });
  };

  return (
    <QuestionWrapper
      question="What are the key features of your home?"
      questionDescription="All floor plans include a kitchen, pantry, living room, and clining room."
      prevStep={props.prevStep}
      nextStep={props.nextStep}
      step={props.step}
      isValid={isValid}
      value={{ homeFeatures, garage, price: resultPrice, estimatedSqFt }}
    >
      <List component="nav" aria-label="mailbox folders">
        {renderHomeFeatures()}
      </List>
      <div>
        <RadioGroup
          aria-label="garage"
          name="garage"
          value={garage}
          onClick={handeChangeGarage}
          row
        >
          {renderRadio()}
        </RadioGroup>
      </div>
      <div className={styles.estimatedBlock}>
        Estimated sq. ft.
        <div>
          {estimatedSqFt > 0 ? estimatedSqFt - 20 : 0} -{" "}
          {estimatedSqFt > 0 ? estimatedSqFt + 20 : 0}
        </div>
      </div>
      <div className={styles.inputGroup}>
        <TextField id="standard-basic1" label="Desired sq. ft. (optional)" />
        <TextField
          id="standard-basic2"
          label="Something else we should know ?"
        />
      </div>
    </QuestionWrapper>
  );
};

export default HomeFeatures;
