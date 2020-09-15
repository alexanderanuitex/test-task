import { useState } from "react";
import AddressComplete from '../../../common/AddressComplete/AddressComplete';

import QuestionWrapper from "../QuestionWrapper/QuestionWrapper";

const Address = (props) => {
  const [address, setAddress] = useState('');
  const newAddress = (value) => {
    setAddress(value)
  }
  return (
    <QuestionWrapper
      question="Where do you want to build"
      prevStep={props.prevStep}
      nextStep={props.nextStep}
      step={props.step}
      isValid={true}
      value={{address}}
    >
      <AddressComplete  newAddress={newAddress}/>
    </QuestionWrapper>
  );
};

export default Address;
