import React, { useCallback, useEffect } from "react";
import { getConfig, getUsingCard } from "./api/api";
import AppRouter from "./components/AppRouter";
import useCluster from "./utils/hooks/useCluster";
import useUser from "./utils/hooks/useUser";
import { getCookieValue } from "./utils/utils";

const App = () => {
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
    if (!getCookieValue(process.env.REACT_APP_AUTH_KEY || "")) logout();
    else login();
    getConfigByDate();
  }, [getConfigByDate, login, logout]);

  return (
    <main className='wrapper'>
      <AppRouter />
      <footer className='footer'>v{process.env.REACT_APP_VERSION}</footer>
    </main>
  );
};

export default App;
