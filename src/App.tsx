import React, { useCallback, useEffect } from "react";
import { ConfigApi, UserApi } from "./api";
import AppRouter from "./components/AppRouter";
import { getCookieValue } from "./utils/cookie";
import useCluster from "./utils/hooks/useCluster";
import useUser from "./utils/hooks/useUser";
import { version } from "../package.json";

const App = () => {
  const { setCluster } = useCluster();
  const { login, logout } = useUser();

  const getConfigByDate = useCallback(async () => {
    try {
      const getConfigRes = await ConfigApi.getConfig();
      const {
        seocho: seochoLimitation,
        gaepo: gaepoLimitation,
        open_at,
        close_at,
      } = getConfigRes.data;
      const getUsingCardRes = await UserApi.getUsingCard();
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
      console.log(err);
      throw err;
    }
  }, [setCluster]);

  useEffect(() => {
    if (getCookieValue(process.env.REACT_APP_AUTH_KEY)) login();
    else logout();
    getConfigByDate();
  }, [getConfigByDate, login, logout]);

  return (
    <main className='wrapper'>
      <AppRouter />
      <footer className='footer'>v{version}</footer>
    </main>
  );
};

export default App;
