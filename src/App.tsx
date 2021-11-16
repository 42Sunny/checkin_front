import React, { useCallback, useEffect } from "react";
import { getConfig, getUsingCard } from "./api/api";
import "./App.css";
import AppRouter from "./components/AppRouter";
import Notice from "./components/Notice";
import useCluster from "./utils/hooks/useCluster";
import useUser from "./utils/hooks/useUser";
import { getCookieValue } from "./utils/utils";

function App() {
  const { setCluster } = useCluster();
  const { login, logout } = useUser();

  const getConfigByDate = useCallback(async () => {
    try {
      const getConfigRes = await getConfig();
      const {
        seocho: seochoLimitation,
        gaepo: gaepoLimitation,
        open_at,
        close_at,
      } = getConfigRes.data;
      const getUsingCardRes = await getUsingCard();
      const { gaepo, seocho } = getUsingCardRes.data;
      setCluster({
        openAt: open_at,
        closeAt: close_at,
        seochoLimitation,
        gaepoLimitation,
        gaepo,
        seocho,
      });
    } catch (err) {
      // TODO: 에러처리
      console.log(err);
      throw err;
    }
  }, [setCluster]);

  useEffect(() => {
    if (!getCookieValue(process.env.REACT_APP_AUTH_KEY || "")) {
      logout();
    } else {
      login();
    }
    getConfigByDate();
  }, [getConfigByDate, login, logout]);

  useEffect(() => {
    const vh = window.innerHeight * 0.01;
    const handleResize = () => {
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div id='page-wrapper'>
        <Notice />
        <AppRouter />
      </div>
      <footer id='version'>v{process.env.REACT_APP_VERSION}</footer>
    </>
  );
}

export default App;
