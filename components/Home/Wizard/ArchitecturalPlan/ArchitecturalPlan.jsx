import { useState, useEffect } from "react";
import QuestionWrapper from "../QuestionWrapper/QuestionWrapper";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const ArchitecturalPlan = (props) => {
  const [plan, setPlan] = useState(props.plan || 0);
  const [isValid, setIsValid] = useState(false);

  const planChange = (e) => {
    setPlan(+e.target.value);
  };

  const validation = () => {
    if (plan || plan === 0) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  useEffect(() => {
    validation();
  }, [plan]);

  const renderQuestions = () => {
    return props.questions.map((item, index) => {
      return (
        <FormControlLabel
          value={item.type}
          control={<Radio />}
          label={item.text}
          key={index}
        />
      );
    });
  };

  return (
    <QuestionWrapper
      question="Do you need architectural plans?"
      questionDescription="We can work with you at any stage."
      prevStep={props.prevStep}
      nextStep={props.nextStep}
      step={props.step}
      isValid={isValid}
      value={{ architecturalPlan: plan }}
    >
      <RadioGroup value={plan} onChange={planChange}>
        {renderQuestions()}
      </RadioGroup>
    </QuestionWrapper>
  );
};

export default ArchitecturalPlan;
