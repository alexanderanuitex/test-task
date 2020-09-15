import { useState, useEffect } from "react";
import QuestionWrapper from "../QuestionWrapper/QuestionWrapper";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";

const FinancePlan = (props) => {
  const [financePlans, setFinancePlans] = useState(
    props.financePlans || {
      0: false,
      1: false,
      2: false,
      3: false,
    }
  );
  const [isValid, setIsValid] = useState(false);

  const validation = () => {
    if (Object.values(financePlans).find((item) => item === true)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  useEffect(() => {
    validation();
  }, [financePlans]);

  const handleChange = (event) => {
    setFinancePlans({
      ...financePlans,
      [event.target.name]: event.target.checked,
    });
  };

  const questionsRender = () => {
    return props.questions.map((item, index) => {
      return (
        <FormControlLabel
          value={item.type}
          control={<Checkbox />}
          label={item.text}
          name={`${item.type}`}
          key={index}
          checked={financePlans[`${item.type}`]}
          onChange={handleChange}
        />
      );
    });
  };

  return (
    <QuestionWrapper
      question="How do you plan to finance the build of your new home?"
      questionDescription="Select all that apply."
      prevStep={props.prevStep}
      nextStep={props.nextStep}
      step={props.step}
      isValid={isValid}
      value={{ financePlans }}
    >
      <FormGroup>{questionsRender()}</FormGroup>
      <TextField
        className='inputMoreInfo'
        id="standard-basic"
        label="Sometnig else we should know ?"
      />
    </QuestionWrapper>
  );
};

export default FinancePlan;
