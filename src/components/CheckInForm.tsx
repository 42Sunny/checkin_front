import React, { useCallback, useEffect, useState } from "react";
import classes from "../styles/components/CheckInUi.module.css";
import Button from "./common/Button";
import Checkbox from "./common/Checkbox";

interface CardInputProps {
  cardNum: string;
  handleCardNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CardInput: React.FC<CardInputProps> = ({ cardNum, handleCardNumberChange }) => (
  <input
    tabIndex={0}
    className={classes.cardNumber}
    type='number'
    min={1}
    step={1}
    value={cardNum}
    inputMode='decimal' /* 숫자형 키패드 */
    placeholder='카드 번호'
    onChange={handleCardNumberChange}
  />
);

interface CheckInputProps {
  handleModalOpen: () => void;
  isChecked: boolean;
  handleCheck: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const CheckInput: React.FC<CheckInputProps> = ({ handleCheck, handleModalOpen, isChecked }) => (
  <div className={classes.checkWrap}>
    <Checkbox text='방역수칙에 동의하고 입장합니다.' checked={isChecked} onChange={handleCheck} />
    <button type='button' className={classes.checkDetail} onClick={handleModalOpen}>
      자세히
    </button>
  </div>
);

interface CheckInFormProps {
  handleCheckIn: (cardNum: string) => (e: React.FormEvent<HTMLFormElement>) => Promise<boolean>;
  handleModalOpen: () => void;
}
const CheckInForm: React.FC<CheckInFormProps> = ({ handleCheckIn, handleModalOpen }) => {
  const [cardNum, setCardNum] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [readySubmit, setReadySubmit] = useState(false);

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardNum(e.target.value);
  };

  const checkSubmitCondition = useCallback(() => {
    if (cardNum && isChecked) setReadySubmit(true);
    else setReadySubmit(false);
  }, [cardNum, isChecked]);

  useEffect(() => {
    checkSubmitCondition();
  }, [checkSubmitCondition]);

  return (
    <form className={classes["check-in-form"]} onSubmit={handleCheckIn(cardNum)}>
      <CardInput cardNum={cardNum} handleCardNumberChange={handleCardNumberChange} />
      <CheckInput
        handleModalOpen={handleModalOpen}
        isChecked={isChecked}
        handleCheck={handleCheck}
      />
      <Button
        className={classes["check-in-button"]}
        type='submit'
        text='CHECK IN'
        disabled={!readySubmit}
      />
    </form>
  );
};

export default CheckInForm;
