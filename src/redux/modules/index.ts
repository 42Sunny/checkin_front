import { combineReducers } from "redux";
import userReducer from "redux/modules/user";
import clusterReducer from "redux/modules/cluster";

const rootReducer = combineReducers({
  userReducer,
  clusterReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
