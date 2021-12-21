import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "../pages/Home";
import CheckIn from "../pages/CheckIn";
import End from "../pages/End";
import CheckInLog from "../checkin-admin/views/CheckInLog";
import CheckInSetting from "../checkin-admin/views/CheckInSetting";
import AuthRoute from "./Auth";
import AdminAuthRoute from "./AdminAuth";

const AppRouter = () => {
  return (
    <Switch>
      <AuthRoute path='/checkin' exact component={CheckIn} />
      <AuthRoute path='/end' exact component={End} />

      <AdminAuthRoute path='/admin/log' exact component={CheckInLog} />
      <AdminAuthRoute path='/admin/setting' exact component={CheckInSetting} />
      <Redirect from='/admin' to='/admin/log' />

      <Route path='/' component={Home} />
    </Switch>
  );
};

export default AppRouter;
