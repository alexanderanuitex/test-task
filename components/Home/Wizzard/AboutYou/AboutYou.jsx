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
  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    phone: false,
    email: false,
  });
  const [isValid, setIsValid] = useState(false);
 const [emailError, setEmailError] = useState(false);
  const emailPattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

  const validationForm = () => {
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
    if (event.target.name === "email") {
      setEmailError(emailPattern.test(event.target.value));
    }
    setAboutYou({
      ...aboutYou,
      [event.target.name]: event.target.value,
    });
  };

  const handleTouch = (event) => {
    if (touched[event.target.name] != true) {
      setTouched({
        ...touched,
        [event.target.name]: true,
      });
    }
  };

  const formRender = () => {
    return userInfo.map((item, index) => {
      return item.name !== "email" ? (
        <TextField
          label={item.label}
          key={index}
          name={item.name}
          error={aboutYou[item.name] === "" && touched[item.name]}
          helperText={aboutYou[item.name] === "" && touched[item.name] ? "Required!" : ""}
          defaultValue={aboutYou ? aboutYou[item.name] : ""}
          onBlur={handleTouch}
          onChange={handleChange}
        />
      ) : (
        <TextField
          label={item.label}
          key={index}
          name={item.name}
          error={!emailError && touched.email}
          helperText={!emailError && touched.email ? "Required!" : ""}
          onBlur={handleTouch}
          defaultValue={aboutYou ? aboutYou[item.name] : ""}
          onChange={handleChange}
        />
      );
    });
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
        className="inputMoreInfo"
        id="standard-basic"
        label="Sometnig else we should know ?"
      />
    </QuestionWrapper>
  );
};

export default AboutYou;
