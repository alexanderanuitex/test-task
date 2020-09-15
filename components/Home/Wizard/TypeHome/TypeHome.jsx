import { useState, useEffect } from "react";

import QuestionWrapper from "../QuestionWrapper/QuestionWrapper";
import { RadioGroup, FormControlLabel, Radio } from "@material-ui/core";

const TypeHome = (props) => {
  const [newBuild, setNewBuild] = useState(props.typeHome);
  const [isValid, setIsValid] = useState(false);
  const newBuildChange = (e) => {
    setNewBuild(+e.target.value);
  };

  const validation = () => {
    if (newBuild || newBuild === 0) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  useEffect(() => {validation()}, [newBuild]);

  return (
    <QuestionWrapper
      question="What do you want to build?"
      prevStep={props.prevStep}
      nextStep={props.nextStep}
      step={props.step}
      isValid={isValid}
      value={{ typeHome: newBuild }}
    >
      <RadioGroup name="build" value={newBuild} onChange={newBuildChange}>
        <FormControlLabel
          value={1}
          control={<Radio />}
          label="Build a new house"
        />
        <FormControlLabel
          value={2}
          control={<Radio />}
          label="Remodel Existing Home"
        />
        <FormControlLabel
          value={0}
          control={<Radio />}
          label="Accessory Dwelling Unit"
        />
      </RadioGroup>
    </QuestionWrapper>
  );
};

export default TypeHome;
