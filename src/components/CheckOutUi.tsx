import React, { useEffect, useState } from "react";
// import moment from "moment-timezone";

import useUser from "../utils/hooks/useUser";
import SlideButton from "./SlideButton";
import classes from "../styles/CheckOutUi.module.css";

interface IProps {
  handleCheckOut: () => Promise<void>;
}
const CheckOutUi: React.FC<IProps> = ({ handleCheckOut }) => {
  const [sliderValue, setSliderValue] = useState(0);

  const {
    user: { cardNum, checkinAt },
  } = useUser();

  // let checkinTime = "";
  // if (checkinAt)
  //   checkinTime = moment(new Date(checkinAt)).tz("Asia/Seoul").format("YYYY-MM-DD HH:mm");

  useEffect(() => {
    if (sliderValue === 100) handleCheckOut();
  }, [handleCheckOut, sliderValue]);

  return (
    <>
      <hr className={classes.divider} />
      <div>
        <div className={classes["checkin-info-wrapper"]}>
          {/* <div>
            <div className={classes.title}>체크인 시각</div>
            <div className={classes.checkinTime}>{checkinTime}</div>
          </div> */}
          <div>
            <div className={classes.title}>카드 번호</div>
            <div className={classes.cardNum}>{cardNum}</div>
          </div>
        </div>
      </div>
      <SlideButton value={sliderValue} setValue={setSliderValue} />
    </>
  );
};

export default CheckOutUi;
