import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useHistory } from "react-router-dom";
import ListIcon from "@mui/icons-material/List";
import Button from "./Button";
import Profile from "./Profile";
import CheckInForm from "./CheckInForm";
import CheckInInfo from "./CheckInInfo";
import { checkOut, checkIn } from "../api/api";

import { setCardNum } from "../redux/modules/user";
import "../styles/ProfileCard.css";
import SlideButton from "./SlideButton";
import { RootState } from "../redux/configureStore";

interface IProps {
  handleFlip: (e: React.MouseEvent) => void;
}

const ProfileCard: React.FC<IProps> = ({ handleFlip }) => {
  const history = useHistory();
  const { cardNum, status } = useSelector(
    (state: RootState) => ({
      cardNum: state.user.cardNum,
      status: state.user.status,
    }),
    shallowEqual,
  );

  const dispatch = useDispatch();

  const [checkAll, setCheckAll] = useState(false);
  const [checkStatus, setCheckStatus] = useState([false, false, false]);
  const [readySubmit, setReadySubmit] = useState(false);
  const [isFold, setIsFold] = useState(false);

  const btnText = status === "out" ? "CHECK IN" : "CHECK OUT";

  const handleCheckIn = useCallback(async () => {
    if (readySubmit) {
      try {
        await checkIn(cardNum);
        history.push("/end");
      } catch (err: any) {
        if (err.response.data.code === 404) alert(err.response.data.message);
        else
          alert("체크인을 처리할 수 없습니다. 제한 인원 초과가 아닌 경우 관리자에게 문의해주세요.");

        dispatch(setCardNum({ cardNum: "" }));
      }
    }
  }, [cardNum, readySubmit, history, dispatch]);

  const handleCheckOut = useCallback(async () => {
    try {
      await checkOut();
      history.push("/end");
    } catch (err: any) {
      if (!err.response) {
        alert("정상적으로 처리되지 않았습니다.\n네트워크 연결 상태를 확인해주세요.");
      } else if (err.response.data.code === 404) {
        alert("이미 체크아웃 되었습니다.");
        history.push("/");
      } else {
        alert(err.response.data.message);
      }
    }
  }, [history]);

  const checkSubmitCondition = useCallback(() => {
    if (cardNum && checkAll) {
      setReadySubmit(true);
    } else {
      setReadySubmit(false);
    }
  }, [cardNum, checkAll]);

  useEffect(() => {
    if (status === "out") {
      checkSubmitCondition();
    }
  }, [cardNum, status, checkSubmitCondition]);

  useEffect(() => {
    if (JSON.stringify(checkStatus) === JSON.stringify([true, true, true])) {
      setCheckAll(true);
      setIsFold(true);
    } else {
      setCheckAll(false);
      setIsFold(false);
    }
    return () => {
      setCheckAll(false);
    };
  }, [checkStatus]);

  // slider
  const [sliderValue, setSliderValue] = useState(0);
  useEffect(() => {
    if (sliderValue === 100) handleCheckOut();
  }, [handleCheckOut, sliderValue]);
  return (
    <div id='profile-card-wrapper'>
      <div
        style={{
          textAlign: "right",
          width: "100%",
        }}
      >
        <ListIcon onClick={handleFlip} />
      </div>
      <Profile />
      {status === "out" ? (
        <>
          <CheckInForm
            checkAll={checkAll}
            setCheckAll={setCheckAll}
            checkStatus={checkStatus}
            setCheckStatus={setCheckStatus}
            isFold={isFold}
            setIsFold={setIsFold}
          />

          {/* TODO:버튼은 폼에 잇는게 맞음 추후에 수정 */}
          <Button
            type='button'
            className='submitBtn'
            handleClick={status === "out" ? handleCheckIn : handleCheckOut}
            text={btnText}
            disabled={!readySubmit}
          />
        </>
      ) : (
        <>
          <hr className='divider' />
          <CheckInInfo />
          <SlideButton value={sliderValue} setValue={setSliderValue} />
        </>
      )}
    </div>
  );
};

export default ProfileCard;
