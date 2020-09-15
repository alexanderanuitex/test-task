import { useState } from "react";

import QuestionWrapper from "./QuestionWrapper/QuestionWrapper";
import TypeHome from "./TypeHome/TypeHome";
import Address from "./Address/Address";
import TypeLot from "./TypeLot/TypeLot";
import ArchitecturalPlan from "./ArchitecturalPlan/ArchitecturalPlan";
import Ideas from "./Ideas/Ideas";
import HomeFeatures from "./HomeFeatures/HomeFeatures";
import HomeStyle from "./HomeStyle/HomeStyle";
import KitchenAndBathrooms from "./KitchenAndBathrooms/KitchenAndBathrooms";
import Congratulations from "./Congratulations/Congratulations";
import Meeting from "./Meeting/Meeting";
import Vision from "./Vision/Vision";
import AboutYou from "./AboutYou/AboutYou";
import FinancePlan from "./FinancePlan/FinancePlan";
import Landscape from "./Landscape/Landscape";
import InteriorFinishing from "./InteriorFinishing/InteriorFinishing";

const Wizard = (props) => {
  return (
    <div>
      {props.step === 1 ? (
        <div>
          {props.isAddress ? (
            <TypeHome
              step={props.step}
              prevStep={props.prevStep}
              nextStep={props.nextStep}
              questions={props.questions.priceList}
              typeHome={props.result.typeHome}
            />
          ) : (
            <Address
              step={props.step}
              prevStep={props.prevStep}
              nextStep={props.nextStep}
            />
          )}
        </div>
      ) : null}

      {props.step === 2 ? (
        <TypeLot
          step={props.step}
          prevStep={props.prevStep}
          nextStep={props.nextStep}
          questions={props.questions.typeLot}
          typeLot={props.result.typeLot}
        />
      ) : null}

      {props.step === 3 ? (
        <ArchitecturalPlan
          step={props.step}
          prevStep={props.prevStep}
          nextStep={props.nextStep}
          questions={props.questions.architecturalPlan}
          plan={props.result.architecturalPlan}
        />
      ) : null}

      {props.step === 4 ? (
        <Ideas
          step={props.step}
          prevStep={props.prevStep}
          nextStep={props.nextStep}
          questions={props.questions.ideas}
          ideas={props.result.ideas}
        />
      ) : null}

      {props.step === 5 ? (
        <HomeStyle
          step={props.step}
          prevStep={props.prevStep}
          nextStep={props.nextStep}
          questions={props.questions.homeStyles}
          homeStyles={props.result.homeStyles}
        />
      ) : null}

      {props.step === 6 ? (
        <HomeFeatures
          step={props.step}
          prevStep={props.prevStep}
          nextStep={props.nextStep}
          questions={{
            homeFeatures: props.questions.homeFeatures,
            garageTypes: props.questions.garageTypes,
          }}
          homeFeatures={props.result.homeFeatures}
          garage={props.result.garage}
          price={props.result.price}
          priceSqFt={props.questions.price}
          estimatedSqFt={props.result.estimatedSqFt}
          getPrice={props.getPrice}
        />
      ) : null}

      {props.step === 7 ? (
        <KitchenAndBathrooms
          step={props.step}
          prevStep={props.prevStep}
          nextStep={props.nextStep}
          questions={props.questions.kitchenLevels}
          kitchenLevel={props.result.kitchenLevel}
          estimatedSqFt={props.result.estimatedSqFt}
          price={props.result.price}
          getPrice={props.getPrice}
        />
      ) : null}

      {props.step === 8 ? (
        <InteriorFinishing
          step={props.step}
          prevStep={props.prevStep}
          nextStep={props.nextStep}
          questions={props.questions.interiorLevels}
          interiorLevel={props.result.interiorLevel}
        />
      ) : null}

      {props.step === 9 ? (
        <Landscape
          step={props.step}
          prevStep={props.prevStep}
          nextStep={props.nextStep}
          questions={props.questions.landscapeLevels}
          landscapeLevel={props.result.landscapeLevel}
        />
      ) : null}

      {props.step === 10 ? (
        <FinancePlan
          step={props.step}
          prevStep={props.prevStep}
          nextStep={props.nextStep}
          questions={props.questions.financePlans}
          financePlans={props.result.financePlans}
        />
      ) : null}

      {props.step === 11 ? (
        <AboutYou
          step={props.step}
          prevStep={props.prevStep}
          nextStep={props.nextStep}
          aboutYou={props.result.aboutYou}
        />
      ) : null}

      {props.step === 12 ? (
        <Vision
          step={props.step}
          prevStep={props.prevStep}
          nextStep={props.nextStep}
          questions={props.questions.visionToLife}
          visionToLife={props.result.visionToLife}
          price={props.result.price}
        />
      ) : null}

      {props.step === 13 ? (
        <Meeting
          step={props.step}
          prevStep={props.prevStep}
          nextStep={props.nextStep}
          questions={props.questions.meetingVariants}
          meetingVariants={props.result.meetingVariants}
          selectedDate={props.result.selectedDate}
          result={props.result}
        />
      ) : null}

      {props.step === 14 ? (
        <Congratulations
          step={props.step}
          prevStep={props.prevStep}
          nextStep={props.nextStep}
          questions={props.questions.successResponse}
          result={props.result}
          setIsCongratulations={props.setIsCongratulations}
        />
      ) : null}
    </div>
  );
};

export default Wizard;
