import { Backdrop, CircularProgress } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { UserApi } from "../api";
import ClusterStatusBoard from "../components/ClusterStatusBoard";
import ProfileCard from "../components/ProfileCard";
import TimeLogCard from "../components/TimeLogCard";
import classes from "../styles/pages/CheckInPage.module.css";
import { removeCookieValue } from "../utils/cookie";
import useCluster from "../utils/hooks/useCluster";
import useUser from "../utils/hooks/useUser";
import { formatToGeneralTime } from "../utils/time";

const CheckIn = () => {
  const checkInCardWrapper = useRef<HTMLDivElement>(null);
  const history = useHistory();
  const { setUser, setCardNum, logout } = useUser();
  const { setCurrentUserCount } = useCluster();

  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [logs, setLogs] = useState<Log[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getUserData = useCallback(async () => {
    setIsLoading(true);
    try {
      const getUserStatusRes = await UserApi.getUserStatus();
      const {
        user: { card, login, profile_image_url, state, checkin_at, checkout_at },
        cluster: { gaepo, seocho },
      } = getUserStatusRes.data;
      const cardNum = card !== null ? card : "";

      setUser({
        state: state || "checkOut",
        id: login,
        cardNum,
        checkinAt: checkin_at,
        checkoutAt: checkout_at,
        profile: profile_image_url,
      });
      setCurrentUserCount({ gaepo, seocho });
    } catch (err) {
      alert("유저 정보가 올바르지 않습니다.\n 반복될 경우 관리자에게 요청해주세요");
      removeCookieValue(process.env.REACT_APP_AUTH_KEY);
      logout();
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [logout, setCurrentUserCount, setUser]);

  const getLogs = useCallback(async () => {
    try {
      const today = new Date();
      const from = formatToGeneralTime(new Date(today.getFullYear(), today.getMonth(), 1));
      const to = formatToGeneralTime(new Date(today.getFullYear(), today.getMonth() + 1, 0));

      const response = await UserApi.getDailyUsage({ from, to });
      const logData = response.data.list;
      setLogs(logData.reverse());
    } catch (err) {
      setLogs([]);
      throw err;
    }
  }, []);

  const handleFlip = () => {
    setIsCardFlipped((prev) => !prev);
  };

  const handleCheckIn = useCallback(
    (cardNum: string) => async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsLoading(true);
      try {
        const { data: userData } = await UserApi.getUserStatus();
        if (userData.user.card) throw new Error("이미 체크인 되었습니다.");
        const { data: checkinData } = await UserApi.postCheckIn({ cardNum });
        if (!checkinData.result)
          throw new Error(
            "체크인을 처리할 수 없습니다. 제한 인원 초과가 아닌 경우 관리자에게 문의해주세요.",
          );
        history.push("/end");
        return true;
      } catch (err: any) {
        let message = "정상적으로 처리되지 않았습니다.\n네트워크 연결 상태를 확인해주세요.";
        setCardNum({ cardNum: "" });
        message = err?.response?.data?.message || err.message || message;
        alert(message);
        window.location.reload();
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [history, setCardNum],
  );

  const handleCheckOut = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data: userData } = await UserApi.getUserStatus();
      if (!userData.user.card) throw new Error("이미 체크아웃 되었습니다.");
      const { data } = await UserApi.postCheckOut();
      if (!data)
        throw new Error(
          "체크아웃이 정상적으로 처리되지 않았습니다.\n네트워크 연결 상태를 확인해주세요.",
        );
      history.push("/end");
    } catch (err: any) {
      let message =
        "체크아웃이 정상적으로 처리되지 않았습니다.\n네트워크 연결 상태를 확인해주세요.";
      message = err?.response?.data?.message || err.message || message;
      alert(message);
      window.location.reload();
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [history]);

  useEffect(() => {
    getUserData();
    getLogs();
    return () => {
      setIsLoading(false);
    };
  }, [getUserData, getLogs]);
  return (
    <>
      <Backdrop style={{ zIndex: 1 }} open={isLoading}>
        <CircularProgress size={50} color='inherit' />
      </Backdrop>
      <ClusterStatusBoard />
      <div
        ref={checkInCardWrapper}
        className={`${classes["card-wrapper"]} ${!isCardFlipped ? classes.front : classes.back}`}
      >
        <ProfileCard
          handleCheckIn={handleCheckIn}
          handleCheckOut={handleCheckOut}
          handleFlip={handleFlip}
        />
        <TimeLogCard logs={logs} handleFlip={handleFlip} />
      </div>
    </>
  );
};
export default CheckIn;
