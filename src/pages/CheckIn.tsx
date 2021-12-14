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

const getUserStatus = async () => {
  const getUserStatusRes = await UserApi.getUserStatus();
  const {
    user: { card, login, profile_image_url, state, checkin_at, checkout_at },
    cluster: { gaepo, seocho },
  } = getUserStatusRes.data;
  const cardNum = card !== null ? card : "";
  return {
    user: {
      state: state || "checkOut",
      id: login,
      cardNum,
      checkinAt: checkin_at,
      checkoutAt: checkout_at,
      profile: profile_image_url,
    },
    cluster: { gaepo, seocho },
  };
};

const getLogs = async () => {
  const today = new Date();
  const from = formatToGeneralTime(new Date(today.getFullYear(), today.getMonth(), 1));
  const to = formatToGeneralTime(new Date(today.getFullYear(), today.getMonth() + 1, 0));

  const response = await UserApi.getDailyUsage({ from, to });
  const logData = response.data.list;
  return logData.reverse();
};

const ALREADY_CHECK_IN_ERROR = "이미 체크인 되었습니다." as const;
const GENERAL_CHECK_IN_ERROR = "체크인을 처리할 수 없습니다. 관리자에게 문의해주세요." as const;
const ALREADY_CHECK_OUT_ERROR = "이미 체크아웃 되었습니다." as const;
const GENERAL_CHECK_OUT_ERROR = "체크아웃을 처리할 수 없습니다. 관리자에게 문의해주세요." as const;
const CheckIn = () => {
  const checkInCardWrapper = useRef<HTMLDivElement>(null);
  const history = useHistory();
  const {
    setUser,
    logout,
    user: { state: userState },
  } = useUser();
  const { setCurrentUserCount } = useCluster();

  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [logs, setLogs] = useState<Log[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getUserData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [getUserStatusData, getLogsData] = await Promise.all([getUserStatus(), getLogs()]);
      setUser(getUserStatusData.user);
      setCurrentUserCount(getUserStatusData.cluster);
      setLogs(getLogsData);
    } catch (e) {
      setLogs([]);
      alert("유저 정보가 올바르지 않습니다.\n 반복될 경우 관리자에게 요청해주세요");
      removeCookieValue(process.env.REACT_APP_AUTH_KEY);
      logout();
    }
    setIsLoading(false);
  }, [logout, setCurrentUserCount, setUser]);

  const handleFlip = () => {
    setIsCardFlipped((prev) => !prev);
  };

  const handleCheckIn = useCallback(
    (cardNum: string) => async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsLoading(true);
      try {
        if (userState === "checkIn") throw new Error(ALREADY_CHECK_IN_ERROR);
        const { data: checkinData } = await UserApi.postCheckIn({ cardNum });
        if (!checkinData.result) throw new Error(GENERAL_CHECK_IN_ERROR);
        history.push("/end");
        return true;
      } catch (err: any) {
        let message = GENERAL_CHECK_IN_ERROR;
        message = err?.response?.data?.message || err.message || message;
        alert(message);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [history, userState],
  );

  const handleCheckOut = useCallback(async () => {
    setIsLoading(true);
    try {
      if (userState === "checkOut") throw new Error(ALREADY_CHECK_OUT_ERROR);
      const { data } = await UserApi.postCheckOut();
      if (!data) throw new Error(GENERAL_CHECK_OUT_ERROR);
      history.push("/end");
    } catch (err: any) {
      let message = GENERAL_CHECK_OUT_ERROR;
      message = err?.response?.data?.message || err.message || message;
      alert(message);
      window.location.reload();
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [history, userState]);

  useEffect(() => {
    getUserData();
    return () => {
      setIsLoading(false);
    };
  }, [getUserData]);
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
