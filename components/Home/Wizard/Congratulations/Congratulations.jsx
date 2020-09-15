import { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import styles from "./Congratulations.module.scss";
import moment from 'moment';
import QuestionWrapper from "../QuestionWrapper/QuestionWrapper";

const Congratulations = (props) => {
  useEffect(() => {
    props.setIsCongratulations(true);
    return () => {
      props.setIsCongratulations(false);
    };
  });
  let timeMeeting = moment(props.result.selectedDate).format("dddd, MMMM Do YYYY, h:mm a")

  const teamRender = () => {
    return props.questions.team.map((item) => (
      <li className={styles.teamItem}>
        <img className={styles.teamPhoto} src={item.imageUrl} alt="photo" />
        <div className={styles.personInfo}>
          <span className={styles.personName}>{item.fullName}</span>
          <span className={styles.personPost}>{item.position}</span>
        </div>
      </li>
    ));
  };

  return (
    <QuestionWrapper
      question="Congratulations!"
      questionDescription="You`re on your way to a new home."
      prevStep={props.prevStep}
      nextStep={props.nextStep}
      step={props.step}
      btnName={"Pay deposit now"}
    >
      <div className={styles.finalWrapper}>
        <p>
          A Homebound team member will be reaching out shortly to confirm your
          information and discuss next steps.
        </p>
        <ul className={styles.finalList}>
          <li className={[styles.finalItem + " " + styles.active]}>
            <div className={styles.finalTitle}>Kickoff meeting - confirmed</div>
            <span className={styles.finalInfoText}>
              {timeMeeting}
            </span>
          </li>
          <li className={styles.finalItem}>
            <div className={styles.finalTitle}>Due Today: $1,000</div>
            <span className={styles.finalSubtitle}>Fully refundable</span>

            <span className={styles.finalInfoText}>
              For your fastest way home, reserve your project with a $1,000
              deposit today.
            </span>
            <Button
              variant="contained"
              color="primary"
              type="button"
              className={styles.btnPayDeposit}
            >
              Pay deposit now
            </Button>
            <span className={styles.finalInfoText}>
              You can also pay at your kickoff meeting.
            </span>
          </li>
          <li className={styles.finalItem}>
            <div className={styles.finalTitle}>Estimated move-in date</div>
            <span className={styles.finalInfoText}>September 2020</span>
          </li>
        </ul>
      </div>
      <div className={styles.teamContainer}>
        <h3>Meet your team</h3>
        <p>
          We've assembled a custom team of experts to meet the unique needs of
          your project.
        </p>
        <ul className={styles.teamList}>{teamRender()}</ul>
      </div>
    </QuestionWrapper>
  );
};

export default Congratulations;
