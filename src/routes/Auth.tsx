import React, { ComponentType } from "react";
import { Route, RouteProps, useHistory } from "react-router-dom";
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
        if (!isLogin) {
          history.push("/");
          return null;
        }
        if (isAdmin) {
          history.push("/admin");
          return null;
        }
        return <Component {...props} />;
      }}
    />
  );
};

export default Auth;
