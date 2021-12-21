import React, { ComponentType } from "react";
import { RouteProps, Route, useHistory } from "react-router-dom";
import useUser from "../utils/hooks/useUser";

interface IProps extends RouteProps {
  component: ComponentType<any>;
}
const Auth: React.FC<IProps> = ({ component: Component, ...restProps }) => {
  const {
    user: { isLogin, isAdmin },
  } = useUser();
  const history = useHistory();
  return (
    <Route
      {...restProps}
      render={(props) => {
        if (!isAdmin || !isLogin) {
          history.push("/");
          return null;
        }
        return <Component {...props} />;
      }}
    />
  );
};

export default Auth;
