import ListIcon from "@mui/icons-material/List";
import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { postCheckIn, postCheckOut } from "../api/api";
import classes from "../styles/ProfileCard.module.css";
import useUser from "../utils/hooks/useUser";
import CheckInForm from "./CheckInForm";
import SlideButton from "./SlideButton";

interface IProps {
  handleFlip: (e: React.MouseEvent) => void;
}

const ProfileCard: React.FC<IProps> = ({ handleFlip }) => {
  const history = useHistory();

  const {
    user: { cardNum, status, id, profile },
    setCardNum,
  } = useUser();

  // slider
  const [sliderValue, setSliderValue] = useState(0);

  const handleCheckIn = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const {
          data: { result },
        } = await postCheckIn(cardNum);
        if (!result)
          throw new Error(
            "체크인을 처리할 수 없습니다. 제한 인원 초과가 아닌 경우 관리자에게 문의해주세요.",
          );
        history.push("/end");
        return true;
      } catch (err: any) {
        let { message } = err;
        if (err.response.data.message) message = err.response.data.message;
        alert(message);
        // if (err.response.data.code === 404) alert(err.response.data.message);
        setCardNum({ cardNum: "" });
      }
      return false;
    },
    [cardNum, history, setCardNum],
  );

  const handleCheckOut = useCallback(async () => {
    try {
      const { data } = await postCheckOut();
      if (!data) throw new Error("무언가 잘못되었습니다.");
      history.push("/end");
    } catch (err: any) {
      let message = "";
      if (err.response?.data?.code === 404) {
        message = "이미 체크아웃 되었습니다.";
        history.push("/");
      } else if (err.response?.data?.message) {
        console.log(err.response);
        message = err.response.data.message;
      } else {
        message = "정상적으로 처리되지 않았습니다.\n네트워크 연결 상태를 확인해주세요.";
      }
      alert(message);
    } finally {
      setSliderValue(0);
    }
  }, [history, setSliderValue]);

  useEffect(() => {
    if (sliderValue === 100) handleCheckOut();
  }, [handleCheckOut, sliderValue]);

  return (
    <div className={classes.profileCard}>
      <div
        style={{
          textAlign: "right",
          width: "100%",
        }}
      >
        <ListIcon onClick={handleFlip} />
      </div>
      <div className={classes["profile-wrapper"]}>
        <img className={classes.profile} src={profile} alt='profile' />
        <h2>{id}</h2>
      </div>
      {status === "out" ? (
        <CheckInForm handleCheckIn={handleCheckIn} />
      ) : (
        <>
          <hr className={classes.divider} />
          <div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 20 }}>Card Number</div>
              <div style={{ fontSize: 70 }}>{cardNum}</div>
            </div>
          </div>
          <SlideButton value={sliderValue} setValue={setSliderValue} />
        </>
      )}
    </div>
  );
};

export default ProfileCard;
