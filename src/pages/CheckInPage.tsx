import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { getUserStatus, postCheckIn, postCheckOut } from "../api/api";
import ProfileCard from "../components/ProfileCard";
import StatusBoard from "../components/StatusBoard";
import TimeLog from "../components/TimeLog";
import classes from "../styles/CheckInPage.module.css";
import useCluster from "../utils/hooks/useCluster";
import useUser from "../utils/hooks/useUser";
import { DEFAULT_PROFILE } from "../utils/utils";

const CheckInPage = () => {
  const checkinCardWrapper = useRef<HTMLDivElement>(null);
  const history = useHistory();
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const {
    user: { isLogin, cardNum },
    setUser,
    setCardNum,
    logout,
  } = useUser();
  const { setCurrentUserCount } = useCluster();

  const getUserData = useCallback(async () => {
    try {
      const getUserStatusRes = await getUserStatus();
      const { user, cluster, isAdmin } = getUserStatusRes.data;

      setUser({
        isLogin,
        id: user.login,
        cardNum: user.card !== null ? user.card : "",
        state: user.state,
        checkinAt: user.checkin_at,
        checkoutAt: user.checkout_at,
        profile: user.profile_image_url || DEFAULT_PROFILE,
        isAdmin,
      });

      setCurrentUserCount({
        gaepo: cluster.gaepo,
        seocho: cluster.seocho,
      });
    } catch (err) {
      console.log(err);
      document.cookie = `${process.env.REACT_APP_AUTH_KEY}=; expires=Thu, 01 Jan 1970 00:00:01 GMT; domain=${process.env.REACT_APP_COOKIE_DOMAIN}`;
      logout();
    }
  }, [isLogin, logout, setCurrentUserCount, setUser]);

  const handleFlip = () => {
    setIsCardFlipped((state) => !state);
  };

  const handleCheckIn = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const { data: userData } = await getUserStatus();
        if (userData.user.card) throw new Error("이미 체크인 되었습니다.");
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
        if (err.response?.data?.message) message = err.response.data.message;
        setCardNum({ cardNum: "" });
        alert(message);
        window.location.reload();
      }
      return false;
    },
    [cardNum, history, setCardNum],
  );

  const handleCheckOut = useCallback(async () => {
    try {
      const { data: userData } = await getUserStatus();
      if (!userData.user.card) throw new Error("이미 체크아웃 되었습니다.");
      const { data } = await postCheckOut();
      if (!data) throw new Error("무언가 잘못되었습니다.");

      history.push("/end");
    } catch (err: any) {
      let message = "";
      if (err.response?.data?.code === 404) {
        message = "이미 체크아웃 되었습니다.";
      } else if (err.response?.data?.message) {
        console.log(err.response);
        message = err.response.data.message;
      } else if (err.message) {
        message = err.message;
      } else {
        message = "정상적으로 처리되지 않았습니다.\n네트워크 연결 상태를 확인해주세요.";
      }
      alert(message);
      window.location.reload();
    }
  }, [history]);

  useLayoutEffect(() => {
    getUserData();
  }, [isLogin, history, getUserData]);

  return (
    <div className={classes["checkin-wrapper"]}>
      <StatusBoard />
      <div
        ref={checkinCardWrapper}
        className={`${classes["checkin-card-wrapper"]} ${
          !isCardFlipped ? classes.front : classes.back
        }`}
      >
        <ProfileCard
          handleFlip={handleFlip}
          handleCheckIn={handleCheckIn}
          handleCheckOut={handleCheckOut}
        />
        <TimeLog handleFlip={handleFlip} />
      </div>
    </div>
  );
};
export default CheckInPage;
