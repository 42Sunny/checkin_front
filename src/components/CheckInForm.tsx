import React, { useEffect, useState } from "react";
import classes from "../styles/CheckInForm.module.css";
import useUser from "../utils/hooks/useUser";
import Button from "./Button";
import List from "./List";

interface IProps {
  handleCheckIn: (e: React.FormEvent<HTMLFormElement>) => Promise<boolean>;
}

const checkLists = [
  "발열 체크시 37.5도 이하인 것을 확인했습니다.",
  "임시 출입카드 분실 시 분실 비용이 발생하는 것을 확인했습니다.",
  "마스크를 반드시 상시 착용하고 방역수칙을 준수할 것을 약속하며, 모든 설문을 이상없이 작성했음을 확인합니다.",
];

// const waitingNotice = [
//   " 입장 안내 알림을 받은 후로 10분 이내에 체크인을 완료하지 않을 시에 대기가 자동 취소됨을 확인합니다.",
// ];

const CheckInForm: React.FC<IProps> = ({ handleCheckIn }) => {
  const {
    user: { cardNum },
    setCardNum,
  } = useUser();

  const [checkAll, setCheckAll] = useState(false);
  const [readySubmit, setReadySubmit] = useState(false);

  const handleCheckAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setCheckAll(isChecked);
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardNum({ cardNum: e.target.value });
  };

  const checkSubmitCondition = () => {
    if (cardNum && checkAll) {
      setReadySubmit(true);
    } else {
      setReadySubmit(false);
    }
  };

  useEffect(() => {
    checkSubmitCondition();

    return () => {
      setReadySubmit(false);
    };
  });

  return (
    <form className={classes.form} onSubmit={handleCheckIn}>
      <div className={classes["check-in-form-wrapper"]}>
        <label htmlFor='allCheck' className={classes.allCheck}>
          <input
            id='allCheck'
            type='checkbox'
            checked={checkAll}
            onChange={handleCheckAll}
            className={classes.allCheckBox}
          />
          <span>클러스터 이용 약관에 모두 동의합니다.</span>
          <span className={classes.asterisk}>*</span>
        </label>
        <ul className={classes["check-list-wrapper"]}>
          {checkLists.map((checkList) => (
            <List key={checkList} text={checkList} />
          ))}
        </ul>
      </div>
      <div className={classes["cardNumber-wrapper"]}>
        <input
          className={classes.cardNumber}
          type='number'
          min={1}
          value={cardNum}
          inputMode='numeric' /* 숫자형 키패드 */
          placeholder='카드 번호'
          onChange={handleCardNumberChange}
        />
      </div>
      <Button type='submit' className={classes.submitBtn} text='CHECK IN' disabled={!readySubmit} />
    </form>
  );
};
export default CheckInForm;
