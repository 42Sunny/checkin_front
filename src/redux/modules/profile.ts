import * as Sentry from "@sentry/react";
import { ActionType, createAction, Reducer } from "typesafe-actions";
import DEFAULT_PROFILE from "../../assets/user-default.png";
// actions
const LOGIN = "profile/LOGIN";
const LOGOUT = "profile/LOGOUT";
const SET_USER = "profile/SET_USER";
const SET_AUTH = "profile/SET_AUTH";

// action creators
export const login = createAction(LOGIN)();
export const logout = createAction(LOGOUT)();
export const setUser = createAction(SET_USER)<Omit<User, "isLogin" | "isAdmin">>();
export const setAuth = createAction(SET_AUTH)<{ isAdmin: boolean }>();

// type
const actions = { setUser, login, logout, setAuth };
type UserActions = ActionType<typeof actions>;

// initialState
export const initialState: User = {
  isLogin: false,
  id: "",
  state: "checkOut",
  checkinAt: null,
  checkoutAt: null,
  profile: DEFAULT_PROFILE,
  isAdmin: false,
};

// reducer
const user: Reducer<User, UserActions> = (state = initialState, action): User => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLogin: true,
      };
    case LOGOUT:
      return {
        ...state,
        isLogin: false,
      };
    case SET_AUTH: {
      const { isAdmin } = action.payload;
      return { ...state, isAdmin };
    }
    case SET_USER: {
      const { checkinAt, checkoutAt, id, profile, state: userState } = action.payload;
      Sentry.setUser({ username: id });
      return { ...state, id, state: userState, checkinAt, checkoutAt, profile };
    }

    default:
      return state;
  }
};

export default user;
