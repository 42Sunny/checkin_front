import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Button from "../components/common/Button";
// import ClusterStatusChart from "../components/common/ClusterStatusChart";
import MainHeader from "../components/layout/MainHeader";
import MainNotice from "../components/layout/MainNotice";
import useUser from "../utils/hooks/useUser";

const Home = () => {
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
    <>
      <MainHeader />
      {/* <ClusterStatusChart /> */}
      <MainNotice />
      <Button type='button' onClick={handleLogin} text='LOG IN' />
    </>
  );
};

export default Home;
