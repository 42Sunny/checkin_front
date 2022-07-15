import React, { useEffect, useRef, useState } from "react";
import classes from "../styles/components/CheckOutUi.module.css";
import useUser from "../utils/hooks/useUser";
import SlideButton from "./SlideButton";

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
const CheckOutForm: React.FC<IProps> = ({ handleCheckOut }) => {
  const [sliderValue, setSliderValue] = useState(0);
  const ref = useRef<HTMLFormElement>(null);
  const {
    user: { cardNum },
  } = useUser();

  useEffect(() => {
    if (sliderValue === 100) handleCheckOut();
  }, [handleCheckOut, sliderValue]);

  return (
    <form ref={ref} className={classes["checkout-info-wrapper"]}>
      <CardNumber cardNum={cardNum} />
      <SlideButton value={sliderValue} setValue={setSliderValue} />
    </form>
  );
};

export default CheckOutForm;
