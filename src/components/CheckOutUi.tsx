import React, { useEffect, useState } from "react";
import useUser from "../utils/hooks/useUser";
import SlideButton from "./SlideButton";
import classes from "../styles/CheckOutUi.module.css";

interface CardNumberProps {
  cardNum: string;
}

const CardNumber: React.FC<CardNumberProps> = ({ cardNum }) => (
  <>
    <p>카드 번호</p>
    <p className={classes.cardNum}>1{cardNum}</p>
  </>
);
interface IProps {
  handleCheckOut: () => Promise<void>;
}
const CheckOutUi: React.FC<IProps> = ({ handleCheckOut }) => {
  const [sliderValue, setSliderValue] = useState(0);
  const {
    user: { cardNum },
  } = useUser();

  useEffect(() => {
    if (sliderValue === 100) handleCheckOut();
  }, [handleCheckOut, sliderValue]);

  return (
    <div className={classes["checkout-info-wrapper"]}>
      <CardNumber cardNum={cardNum} />
      <SlideButton value={sliderValue} setValue={setSliderValue} />
    </div>
  );
};

export default CheckOutUi;
