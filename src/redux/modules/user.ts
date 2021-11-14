import { createAction, ActionType } from "typesafe-actions";
import { DEFAULT_PROFILE } from "../../utils/utils";

// actions
const LOGIN = "user/LOGIN";
const LOGOUT = "user/LOGOUT";
const SET_USER = "user/SET_USER";
const SET_CARD_NUM = "user/SET_CARD_NUM";

// action creators
export const login = createAction(LOGIN)();
export const logout = createAction(LOGOUT)();
export const setUser = createAction(SET_USER)<User>();
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
const userReducer = (state = initialState, action: UserActions) => {
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
    case SET_USER:
      return {
        ...state,
        id: action.payload.id,
        cardNum: action.payload.cardNum,
        state: action.payload.state,
        checkinAt: action.payload.checkinAt,
        checkoutAt: action.payload.checkoutAt,
        profile: action.payload.profile,
      };
    case SET_CARD_NUM:
      return {
        ...state,
        cardNum: action.payload.cardNum,
      };
    default:
      return state;
  }
};

export default userReducer;
