import { createAction, ActionType } from "typesafe-actions";
import * as Sentry from "@sentry/react";
import DEFAULT_PROFILE from "../../assets/user-default.png";
// actions
const LOGIN = "user/LOGIN";
const LOGOUT = "user/LOGOUT";
const SET_USER = "user/SET_USER";
const SET_CARD_NUM = "user/SET_CARD_NUM";

// action creators
export const login = createAction(LOGIN)();
export const logout = createAction(LOGOUT)();
export const setUser = createAction(SET_USER)<Omit<User, "isLogin" | "isAdmin">>();
export const setCardNum = createAction(SET_CARD_NUM)<{ cardNum: string }>();

// type
const actions = { setCardNum, setUser, login, logout };
type UserActions = ActionType<typeof actions>;

// initialState
const initialState: User = {
  isLogin: false,
  id: "",
  cardNum: "",
  state: "checkOut",
  checkinAt: null,
  checkoutAt: null,
  profile: DEFAULT_PROFILE,
  isAdmin: false,
};

// reducer
const user = (state = initialState, action: UserActions) => {
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

    case SET_USER: {
      const { cardNum, checkinAt, checkoutAt, id, profile, state: userState } = action.payload;
      Sentry.setUser({ username: id });
      return { ...state, id, cardNum, state: userState, checkinAt, checkoutAt, profile };
    }
    case SET_CARD_NUM:
      return {
        ...state,
        cardNum: action.payload.cardNum,
      };
    default:
      return state;
  }
};

export default user;
