import { Modal, Box as MuiBox } from "@mui/material";
import React, { useEffect, useState } from "react";
import moment from "moment";
import classes from "../styles/components/CheckInUi.module.css";
import useCluster from "../utils/hooks/useCluster";
import Button from "./Button";
import Checkbox from "./Checkbox";
import List from "./List";
import Box from "./Box";

const checkLists = [
  "발열 체크시 37.5도 이하인 것을 확인했습니다.",
  "임시 출입카드 분실 시 분실 비용이 발생하는 것을 확인했습니다.",
  "마스크를 반드시 상시 착용하고 방역수칙을 준수할 것을 약속하며, 모든 설문을 이상없이 작성했음을 확인합니다.",
];

const isWeekend = () => {
  const today = new Date(moment(new Date()).local().format());
  console.log(today);

  if (today.getDay() === 6 || today.getDay() === 0) return true;
  return false;
};
const deskLunchTime = isWeekend() ? "11:00 ~ 12:00" : "13:00 ~ 14:00";

interface CardInputProps {
  cardNum: string;
  handleCardNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CardInput: React.FC<CardInputProps> = ({ cardNum, handleCardNumberChange }) => (
  <>
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
  </>
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

const CheckInUi: React.FC<IProps> = ({ handleCheckIn }) => {
  const [cardNum, setCardNum] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [readySubmit, setReadySubmit] = useState(false);
  const [isOpened, setIsOpened] = useState(false);

  const {
    cluster: { officeHours },
  } = useCluster();

  const handleModalOpen = () => {
    setIsOpened(true);
  };
  const handleModalClose = () => {
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
    <>
      <Box>
        <p> 클러스터 운영시간: {officeHours}</p>
        <p> 인포데스크 점심시간 {deskLunchTime}</p>
      </Box>
      <form className={classes["check-in-form"]} onSubmit={handleCheckIn(cardNum)}>
        <Modal open={isOpened} onClose={handleModalClose}>
          <MuiBox>
            <CheckList />
          </MuiBox>
        </Modal>
        <CardInput cardNum={cardNum} handleCardNumberChange={handleCardNumberChange} />
        <div className={classes.checkWrap}>
          <Checkbox
            text='방역수칙에 동의하고 입장합니다.'
            checked={isChecked}
            onChange={handleCheck}
          />
          <button type='button' className={classes.checkDetail} onClick={handleModalOpen}>
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
    </>
  );
};

export default CheckInUi;
