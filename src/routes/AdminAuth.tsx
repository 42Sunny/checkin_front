import React, { ComponentType } from "react";
import { RouteProps, Route, useHistory } from "react-router-dom";
import useUser from "utils/hooks/useUser";

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
        // admin권한을 checkin페이지에서 받아 이 코드가 실행되고 admin권한 획득함
        // 떄문에 라우팅이 이상해짐
        if (!isAdmin || !isLogin) {
          alert(isAdmin);
          alert(isLogin);
          history.push("/");
          return null;
        }
        return <Component {...props} />;
      }}
    />
  );
};

export default Auth;
