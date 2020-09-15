import { useState } from "react";
import QuestionWrapper from "../QuestionWrapper/QuestionWrapper";
import styles from "./Vision.module.scss";

const Vision = (props) => {
  return (
    <QuestionWrapper
      question="Let's bring your vision to life."
      questionDescription=""
      prevStep={props.prevStep}
      nextStep={props.nextStep}
      step={props.step}
      isValid={true}
      btnName={'Schedule kickoff'}
    >
      <div className={styles.visionWrapper}>
        <img src="/images/graph-price.png" />
        <div className={styles.priceWrapper}>
          <div>
            <p>${props.price ? props.price - 250 : 0}</p>
            <span>BASELINE</span>
          </div>
          <div>
            <p>${props.price ? props.price + 250 : 0}</p>
            <span>HIGH END</span>
          </div>
        </div>
        <p className={styles.priceDesc}>
          We'll refine your estimate as you continue to design your home. Don't
          worry — you can change your mind on any of these selections later.
        </p>
      </div>
    </QuestionWrapper>
  );
};

export default Vision;
