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
        // TODO: 카뎃이면서 어드민인 경우를 생각해서 일단 주석처리함
        // 다른방법(ex:환경변수?)을 찾아볼것
        // if (isAdmin) {
        //   history.push("/admin");
        //   return null;
        // }
        return <Component {...props} />;
      }}
    />
  );
};

export default Auth;
