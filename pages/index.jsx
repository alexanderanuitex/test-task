import { useState, useEffect, useReducer } from "react";
import ProgressBar from "../components/Home/ProgressBar/ProgressBar";
import Header from '../components/common/Header/Header';
import Summary from "../components/Home/Summary/Summary";
import Wizard from "../components/Home/Wizard/Wizard";
import StartView from "../components/Home/StartView/StartView";
import styles from "./index.module.scss";
import WizardService from "../shared/services/Wizard.service";

const initialState = { step: 0, typeHome: 0 };

const stepReducer = (state, action) => {
  switch (action.type) {
    case "nextStep":
      return { ...state, step: action.payload };
    case "prevStep":
      return { ...state, step: action.payload };
    case "setTypeHome":
      return { ...state, typeHome: action.payload };
    default:
      throw new Error();
  }
};

const Home = ({ questions }) => {
  const [state, dispatch] = useReducer(stepReducer, initialState);
  const [result, setResult] = useState({ typeHome: 1 });
  const [isAddress, setIsAddress] = useState(false);
  const [isCongratulations, setIsCongratulations] = useState(false);
  const [completedStep, setCompletedStep] = useState(0);

  const ADU_TYPE = 0;
  const NEW_HOME = 1;
  const REMODEL = 2;

  let stepCountHome = 100 / 14;
  let stepCountRemodel = 100 / 12;
  let stepCountAdu = 100 / 11;
  useEffect(() => {
    const {
      result,
      step,
      completedStep,
    } = WizardService.getLocalStoregeWizard();
    if (result) {
      setResult({ ...result });
      setCompletedStep(completedStep);
      dispatch({ type: "nextStep", payload: step || 0 });
    }
  }, []);
  useEffect(() => {
    WizardService.setLocalStorge(result, state.step, completedStep);
  }, [result, state.step, completedStep]);

  useEffect(() => {
    if (isCongratulations) {
      setCompletedStep(100);
      return;
    }
  }, [isCongratulations]);

  const setNextProgressBar = () => {
    if (state.typeHome === NEW_HOME) {
      setCompletedStep(completedStep + Math.round(stepCountHome));
      return;
    }
    if (state.typeHome === REMODEL) {
      setCompletedStep(completedStep + Math.round(stepCountRemodel));
      return;
    }
    if (state.typeHome === ADU_TYPE) {
      setCompletedStep(completedStep + Math.round(stepCountAdu));
      return;
    }
  };
  const setPrevProgressBar = () => {
    if (state.typeHome === NEW_HOME) {
      setCompletedStep(completedStep - Math.round(stepCountHome));
      return;
    }
    if (state.typeHome === REMODEL) {
      setCompletedStep(completedStep - Math.round(stepCountRemodel));
      return;
    }
    if (state.typeHome === ADU_TYPE) {
      setCompletedStep(completedStep - Math.round(stepCountAdu));
      return;
    }
  };
  const nextStep = (number, value) => {
    if (value && (value.typeHome || value.typeHome === ADU_TYPE)) {
      dispatch({ type: "setTypeHome", payload: value.typeHome });
    }
    if (value) {
      setResult({
        ...result,
        ...value,
      });
    }
    setNextProgressBar();
    if (
      (value &&
        (value.typeHome === ADU_TYPE || value.typeHome === REMODEL) &&
        state.step === 1) ||
      (state.step === 1 && !isAddress && state.typeHome !== NEW_HOME)
    ) {
      dispatch({ type: "nextStep", payload: 3 });
      return;
    }

    if (state.typeHome === ADU_TYPE && state.step === 4) {
      dispatch({ type: "nextStep", payload: 7 });
      return;
    }
    dispatch({ type: "nextStep", payload: number });
  };
  const prevStep = (number, value) => {
    setPrevProgressBar();

    if ((state.typeHome === ADU_TYPE || state.typeHome === REMODEL) && state.step === 3) {
      dispatch({ type: "prevStep", payload: 1 });
      return;
    }
    if (state.typeHome === ADU_TYPE && state.step === 7) {
      dispatch({ type: "prevStep", payload: 4 });
      return;
    }
    dispatch({ type: "prevStep", payload: number });
  };
  const goToWizard = (address, number, value) => {
    setIsAddress(address);
    nextStep(number, value);
  };
  const getPrice = (number) => {
    setResult({...result, price: number})
  };

  return (
    <div className={styles.mainWrapper}>
      <Header />
      <main className={styles.contentWrapper}>
        {state.step === ADU_TYPE ? (
          <div className={styles.gridContainer}>
            <StartView
              priceList={questions.priceList}
              goToWizard={goToWizard}
              result={result}
            />
          </div>
        ) : (
          <div className={styles.gridContentContainer}>
            <div className={state.step >= 6 ? styles.stepHeader + ' ' + styles.summaryHead : styles.stepHeader }>
              <ProgressBar completedStep={completedStep} />
              {
                state.step >= 6 ? <Summary price={result.price}/> : null 
              }
            </div> 
            <Wizard
              isAddress={isAddress}
              step={state.step}
              nextStep={nextStep}
              prevStep={prevStep}
              setIsCongratulations={setIsCongratulations}
              result={result}
              questions={questions}
              getPrice={getPrice}
            />            
          </div>
        )}
      </main>
    </div>
  );
};

Home.getInitialProps = async () => {
  const questions = await WizardService.getQuestions();
  return { questions };
};
export default Home;
