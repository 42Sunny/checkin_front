import React, { useEffect } from "react";
import AppRouter from "routes/AppRouter";
import useUser from "utils/hooks/useUser";
import { getCookieValue } from "utils/cookie";
import { version } from "../package.json";
// import useCluster from "./utils/hooks/useCluster";

const App = () => {
  // const { setCluster, setOfficeHour, setOfficeLunchTime } = useCluster();
  const { login, logout } = useUser();

  useEffect(() => {
    if (getCookieValue(process.env.REACT_APP_AUTH_KEY)) login();
    else logout();
  }, [login, logout]);

  return (
    <main className='wrapper'>
      <AppRouter />
      <footer className='footer'>v{version}</footer>
    </main>
  );
};

export default App;
