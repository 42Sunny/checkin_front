import React, { useEffect, useMemo, useState } from "react";
import useUser from "../utils/hooks/useUser";
import SlideButton from "./SlideButton";
import classes from "../styles/components/CheckOutUi.module.css";
import Box from "./Box";
import { formatToGeneralTime } from "../utils/time";

interface CardNumberProps {
  cardNum: string;
}

const CardNumber: React.FC<CardNumberProps> = ({ cardNum }) => (
  <>
    <p>카드 번호</p>
    <p className={classes.cardNum}>{cardNum}</p>
  </>
);
interface IProps {
  handleCheckOut: () => Promise<void>;
}
const CheckOutUi: React.FC<IProps> = ({ handleCheckOut }) => {
  const [sliderValue, setSliderValue] = useState(0);
  const {
    user: { cardNum, checkinAt },
  } = useUser();
  const checkInTime = useMemo(() => formatToGeneralTime(new Date(checkinAt!)), [checkinAt]);
  useEffect(() => {
    if (sliderValue === 100) handleCheckOut();
  }, [handleCheckOut, sliderValue]);

  return (
    <>
      <Box>
        <p>체크인 시간: {checkInTime}</p>
      </Box>
      <div className={classes["checkout-info-wrapper"]}>
        <CardNumber cardNum={cardNum} />
        <SlideButton value={sliderValue} setValue={setSliderValue} />
      </div>
    </>
  );
};

export default CheckOutUi;
