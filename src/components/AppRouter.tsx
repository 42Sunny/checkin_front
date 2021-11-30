import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "../pages/Home";
import CheckIn from "../pages/CheckIn";
import End from "../pages/End";
import NotFound from "../pages/NotFound";
import CheckInLog from "../checkin-admin/views/CheckInLog";
import CheckInSetting from "../checkin-admin/views/CheckInSetting";
import AuthRoute from "../routes/Auth";

const AppRouter = () => {
  return (
    <Switch>
      <Route path='/' exact component={Home} />
      <AuthRoute path='/checkin' exact component={CheckIn} />
      <AuthRoute path='/end' exact component={End} />
      <Route path='/admin/log' exact component={CheckInLog} />
      <Route path='/admin/setting' exact component={CheckInSetting} />
      <Redirect from='/admin' to='/admin/log' />
      <AuthRoute component={NotFound} />
    </Switch>
  );
};

export default AppRouter;
