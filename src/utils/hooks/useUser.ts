import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/modules";
import * as userActions from "../../redux/modules/user";

const useUser = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.userReducer);

  const login = useCallback(() => {
    dispatch(userActions.login());
  }, [dispatch]);

  const logout = useCallback(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  const setUser = useCallback(
    (param: User) => {
      dispatch(userActions.setUser(param));
    },
    [dispatch],
  );

  const setCardNum = useCallback(
    ({ cardNum }: { cardNum: string }) => {
      dispatch(userActions.setCardNum({ cardNum }));
    },
    [dispatch],
  );

  return { user, login, logout, setCardNum, setUser };
};

export default useUser;
