import { Backdrop, CircularProgress } from "@mui/material";
import moment from "moment";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { getDailyUsage, getUserStatus, postCheckIn, postCheckOut } from "../api/api";
import CheckInForm from "../components/CheckInForm";
import CheckOutUi from "../components/CheckOutUi";
import ClusterStatusBoard from "../components/ClusterStatusBoard";
import ProfileCard from "../components/ProfileCard";
import TimeLogCard from "../components/TimeLogCard";
import classes from "../styles/pages/CheckInPage.module.css";
import useCluster from "../utils/hooks/useCluster";
import useUser from "../utils/hooks/useUser";
import Box from "../components/Box";

const CheckIn = () => {
  const checkInCardWrapper = useRef<HTMLDivElement>(null);
  const history = useHistory();
  const {
    user: { state: userState },
  } = useUser();
  const {
    cluster: { officeHours },
    setCurrentUserCount,
  } = useCluster();
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [logs, setLogs] = useState<Log[]>([]);
  const { setUser, setCardNum, logout } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [checkInTime, setCheckInTime] = useState("");

  const getUserData = useCallback(async () => {
    setIsLoading(true);
    try {
      const getUserStatusRes = await getUserStatus();
      const {
        user: { card, login, profile_image_url, state, checkin_at, checkout_at },
        cluster: { gaepo, seocho },
      } = getUserStatusRes.data;
      const cardNum = card !== null ? card : "";

      if (checkin_at) setCheckInTime(moment(new Date(checkin_at)).format("YYYY-MM-DD HH:mm"));
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
      document.cookie = `${process.env.REACT_APP_AUTH_KEY}=; expires=Thu, 01 Jan 1970 00:00:01 GMT; domain=${process.env.REACT_APP_COOKIE_DOMAIN}`;
      logout();
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [logout, setCurrentUserCount, setUser]);

  const getLogs = useCallback(async () => {
    try {
      const today = new Date();
      const momentFormat = "YYYY-MM-DD HH:mm:ss";
      const from = moment(new Date(today.getFullYear(), today.getMonth(), 1)).format(momentFormat);
      const to = moment(new Date(today.getFullYear(), today.getMonth() + 1, 0)).format(
        momentFormat,
      );

      const response = await getDailyUsage(from, to);
      if (response.data?.list) {
        const logData = response.data.list;
        setLogs(logData.reverse());
      }
    } catch (err) {
      setLogs([]);
      console.log(err);
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
        const { data: userData } = await getUserStatus();
        if (userData.user.card) throw new Error("이미 체크인 되었습니다.");
        const { data: checkinData } = await postCheckIn(cardNum);
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
      const { data: userData } = await getUserStatus();
      if (!userData.user.card) throw new Error("이미 체크아웃 되었습니다.");
      const { data } = await postCheckOut();
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
          render={() =>
            userState === "checkIn" ? (
              <>
                <Box>
                  <p>체크인 시간:{checkInTime}</p>
                </Box>
                <CheckOutUi handleCheckOut={handleCheckOut} />
              </>
            ) : (
              <>
                <Box>
                  <p> 클러스터 운영시간: {officeHours}</p>
                  <p> 인포데스크 점심시간 13:00 ~ 14:00</p>
                </Box>
                <CheckInForm handleCheckIn={handleCheckIn} />
              </>
            )
          }
          handleFlip={handleFlip}
        />
        <TimeLogCard logs={logs} handleFlip={handleFlip} />
      </div>
    </>
  );
};
export default CheckIn;
