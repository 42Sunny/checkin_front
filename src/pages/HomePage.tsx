import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Button from "../components/Button";
import ClusterStatusChart from "../components/ClusterStatusChart";
import MainHeader from "../components/MainHeader";
import MainNotice from "../components/MainNotice";
import classes from "../styles/LandingPage.module.css";
import useUser from "../utils/hooks/useUser";

function LandingPage() {
  const history = useHistory();
  const {
    user: { isLogin },
  } = useUser();

  const handleLogin = () => {
    window.location.href = `${
      process.env.REACT_APP_API_URL
    }/user/login?redirect=${encodeURIComponent(window.location.href)}`;
  };

  useEffect(() => {
    if (isLogin) history.push("/checkin");
  }, [history, isLogin]);

  return (
    <div className={classes["landing-wrapper"]}>
      <MainHeader />
      <ClusterStatusChart />
      <MainNotice />
      <Button type='button' onClick={handleLogin} text='LOG IN' />
    </div>
  );
}

export default LandingPage;