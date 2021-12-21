import React, { useCallback, useEffect } from "react";
import { ConfigApi, UserApi } from "./api";
import AppRouter from "./routes/AppRouter";
import { getCookieValue } from "./utils/cookie";
import useCluster from "./utils/hooks/useCluster";
import useUser from "./utils/hooks/useUser";
import { version } from "../package.json";

const App = () => {
  const { setCluster } = useCluster();
  const { login, logout } = useUser();

  const getConfig = useCallback(async () => {
    try {
      const [
        {
          data: { open_at, close_at, seocho: seochoLimitation, gaepo: gaepoLimitation },
        },
        {
          data: { gaepo, seocho },
        },
      ] = await Promise.all([ConfigApi.getConfig(), UserApi.getUsingCard()]);

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
    getConfig();
  }, [getConfig, login, logout]);

  return (
    <main className='wrapper'>
      <AppRouter />
      <footer className='footer'>v{version}</footer>
    </main>
  );
};

export default App;
