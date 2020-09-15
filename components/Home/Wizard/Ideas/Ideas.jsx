import { useState, useEffect } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import QuestionWrapper from "../QuestionWrapper/QuestionWrapper";

const Ideas = (props) => {
  const [ideas, setIdeas] = useState(
    props.ideas || {
      0: false,
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
    }
  );
  const [isValid, setIsValid] = useState(false);

  const validation = () => {
    if (Object.values(ideas).find(item => item === true)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  useEffect(() => {
    validation();
  }, [ideas]);

  const handleChange = (event) => {
    setIdeas({ ...ideas, [event.target.name]: event.target.checked });
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
          checked={ideas[`${item.type}`]}
          onChange={handleChange}
        />
      );
    });
  };

  return (
    <QuestionWrapper
      question="Do you have any ideas, drawings, sketches, or pictures?"
      questionDescription="Select all that apply."
      prevStep={props.prevStep}
      nextStep={props.nextStep}
      step={props.step}
      isValid={isValid}
      value={{ ideas }}
    >
      <FormGroup>{questionsRender()}</FormGroup>
    </QuestionWrapper>
  );
};

export default Ideas;
