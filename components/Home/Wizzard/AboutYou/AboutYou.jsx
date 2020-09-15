import { useState, useEffect } from "react";
import QuestionWrapper from "../QuestionWrapper/QuestionWrapper";
import TextField from "@material-ui/core/TextField";
import styles from "./AboutYou.module.scss";

let userInfo = [
  {
    label: "First Name",
    name: "firstName",
  },
  {
    label: "Last Name",
    name: "lastName",
  },
  {
    label: "Phone",
    name: "phone",
  },
  {
    label: "Email",
    name: "email",
  },
];

const AboutYou = (props) => {
  const [aboutYou, setAboutYou] = useState(
    props.aboutYou || {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
    }
  );
  const [isValid, setIsValid] = useState(false);

  const validationForm = () => {
    const emailPattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if (
      aboutYou.firstName !== "" &&
      aboutYou.lastName !== "" &&
      aboutYou.phone !== "" &&
      emailPattern.test(aboutYou.email)
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  useEffect(() => {
    validationForm();
  }, [aboutYou]);

  const handleChange = (event) => {
    setAboutYou({ ...aboutYou, [event.target.name]: event.target.value });
  };

  const formRender = () => {
    return userInfo.map((item, index) => (
      <TextField
        label={item.label}
        key={index}
        name={item.name}
        defaultValue={aboutYou ? aboutYou[item.name] : ""}
        onChange={handleChange}
      />
    ));
  };

  return (
    <QuestionWrapper
      question="About you"
      questionDescription="We will only use your information to respond to your request."
      prevStep={props.prevStep}
      nextStep={props.nextStep}
      step={props.step}
      value={{ aboutYou }}
      isValid={isValid}
    >
      <form className={styles.aboutForm} noValidate autoComplete="off">
        {formRender()}
      </form>
      <TextField
        className='inputMoreInfo'
        id="standard-basic"
        label="Sometnig else we should know ?"
      />
    </QuestionWrapper>
  );
};

export default AboutYou;
