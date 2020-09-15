import { useState, useEffect } from "react";
import MomentUtils from "@date-io/moment";
import QuestionWrapper from "../QuestionWrapper/QuestionWrapper";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import styles from "./Meeting.module.scss";
import {
  KeyboardTimePicker,
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

const Meeting = (props) => {
  const [meeting, setMeeting] = useState(props.meetingVariants || 0);

  const [selectedDate, setSelectedDate] = useState(
    props.selectedDate || new Date()
  );
  const [isValid, setIsValid] = useState(false);

  const validation = () => {
    if (selectedDate !== "" && meeting !== "") {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  useEffect(() => {
    validation();
  }, [selectedDate, meeting]);
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleChange = (event) => {
    setMeeting(+event.target.value);
  };

  const questionsRender = () => {
    return props.questions.map((item, index) => (
      <FormControlLabel
        value={item.type}
        key={index}
        control={<Radio />}
        label={
          <div>
            <div>{item.text}</div>
            {item.text == "My current residence" ? (
              <TextField
                disabled={meeting !== 0}
                id="standard-disabled"
                defaultValue="Enter Your Address"
                className={styles.inputField}
              />
            ) : (
              <span className={styles.itemAddress}>{item.address}</span>
            )}
          </div>
        }
      />
    ));
  };

  return (
    <QuestionWrapper
      question="Let's schedule your kickoff meeting."
      questionDescription="After your meeting we`ll finalize pricing."
      prevStep={props.prevStep}
      nextStep={props.nextStep}
      step={props.step}
      isValid={isValid}
      value={{meetingVariants: meeting, selectedDate: selectedDate}}
      btnName={'Confirm Meeting'}
    >
      <div className={styles.whenSelectContainer}>
        <span className={styles.schedule}>When</span>
        <div className={styles.whenSelect}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Date picker dialog"
              format="MM/dd/yyyy"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
            <KeyboardTimePicker
              margin="normal"
              id="time-picker"
              label="Time picker"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change time",
              }}
            />
          </MuiPickersUtilsProvider>
        </div>
      </div>
      <div className={styles.whereRadioContainer}>
        <span className={styles.schedule}>Where</span>
        <RadioGroup value={meeting} onChange={handleChange} className={styles.radioGroup}>
          {questionsRender()}
        </RadioGroup>
      </div>
    </QuestionWrapper>
  );
};

export default Meeting;
