import { Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import classes from "../styles/components/CheckInForm.module.css";
import Button from "./Button";
import Checkbox from "./Checkbox";
import List from "./List";

const checkLists = [
  "발열 체크시 37.5도 이하인 것을 확인했습니다.",
  "임시 출입카드 분실 시 분실 비용이 발생하는 것을 확인했습니다.",
  "마스크를 반드시 상시 착용하고 방역수칙을 준수할 것을 약속하며, 모든 설문을 이상없이 작성했음을 확인합니다.",
];

interface CardInputProps {
  cardNum: string;
  handleCardNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CardInput: React.FC<CardInputProps> = ({ cardNum, handleCardNumberChange }) => (
  <div className={classes["cardNumber-wrapper"]}>
    <input
      className={classes.cardNumber}
      type='number'
      min={1}
      step={1}
      value={cardNum}
      inputMode='decimal' /* 숫자형 키패드 */
      placeholder='카드 번호'
      onChange={handleCardNumberChange}
    />
  </div>
);

const CheckList: React.FC = () => (
  <div className={classes["check-list-wrapper"]}>
    <ul className={classes["check-list"]}>
      {checkLists.map((checkList) => (
        <List key={checkList} text={checkList} />
      ))}
    </ul>
  </div>
);

interface IProps {
  handleCheckIn: (cardNum: string) => (e: React.FormEvent<HTMLFormElement>) => Promise<boolean>;
}

const CheckInForm: React.FC<IProps> = ({ handleCheckIn }) => {
  const [cardNum, setCardNum] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [readySubmit, setReadySubmit] = useState(false);
  const [isOpened, setIsOpened] = useState(false);

  const handleChecklistModalOpen = () => {
    setIsOpened(true);
  };
  const handleChecklistModalClose = () => {
    setIsOpened(false);
  };
  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardNum(e.target.value);
  };

  const checkSubmitCondition = () => {
    if (cardNum && isChecked) setReadySubmit(true);
    else setReadySubmit(false);
  };

  useEffect(() => {
    checkSubmitCondition();
    return () => {
      setReadySubmit(false);
    };
  });

  return (
    <form className={classes["check-in-form"]} onSubmit={handleCheckIn(cardNum)}>
      <Modal open={isOpened} onClose={handleChecklistModalClose}>
        <CheckList />
      </Modal>
      <CardInput cardNum={cardNum} handleCardNumberChange={handleCardNumberChange} />
      <div className={classes.checkWrap}>
        <Checkbox
          text='방역수칙에 동의하고 입장합니다.'
          checked={isChecked}
          onChange={handleCheck}
        />
        <button type='button' className={classes.checkDetail} onClick={handleChecklistModalOpen}>
          자세히
        </button>
      </div>
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
