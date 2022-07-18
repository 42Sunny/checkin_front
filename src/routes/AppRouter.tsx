import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import CheckInLog from "../checkin-admin/views/CheckInLog";
import CheckInSetting from "../checkin-admin/views/CheckInSetting";
import CheckIn from "../pages/CheckIn";
import Home from "../pages/Home";
import AuthRoute from "./Auth";

const AppRouter = () => {
  return (
    <Switch>
      <AuthRoute path='/checkin' exact component={CheckIn} />

      <Route path='/admin/log' exact component={CheckInLog} />
      <Route path='/admin/setting' exact component={CheckInSetting} />
      <Redirect from='/admin' to='/admin/log' />

      <Route path='/' component={Home} />
    </Switch>
  );
};

export default AppRouter;
