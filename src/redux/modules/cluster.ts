import { createAction, ActionType } from "typesafe-actions";
import { formatOfficeHours } from "../../utils/time";

// actions
const SET_CLUSTER = "cluster/SET_CLUSTER";
const SET_CURRENT_USER_COUNT = "cluster/SET_CURRENT_USER_COUNT";
const SET_OFFICE_HOUR = "cluster/SET_OFFICE_HOUR";
const SET_LUNCH_TIME = "cluster/SET_LUNCH_TIME";
// action creators

export const setCluster =
  createAction(SET_CLUSTER)<Omit<Cluster, "officeHour" | "officeLunchTime">>();
export const setCurrentUserCount =
  createAction(SET_CURRENT_USER_COUNT)<{ gaepo: number; seocho: number }>();
export const setOfficeHour = createAction(SET_OFFICE_HOUR)<{ officeHour: string }>();
export const setLunchTime = createAction(SET_LUNCH_TIME)<{ officeLunchTime: string }>();
// type
const actions = { setCluster, setCurrentUserCount, setOfficeHour, setLunchTime };
type ClusterActions = ActionType<typeof actions>;

// initialState
const initialState: Cluster = {
  openAt: "",
  closeAt: "",
  seocho: 0,
  gaepo: 0,
  seochoLimitation: 0,
  gaepoLimitation: 0,
  officeHour: "",
  officeLunchTime: "",
};

// reducer
const cluster = (state = initialState, action: ClusterActions): Cluster => {
  switch (action.type) {
    case SET_CLUSTER: {
      const { openAt, closeAt, gaepo, seocho, gaepoLimitation, seochoLimitation } = action.payload;
      return {
        ...state,
        openAt,
        closeAt,
        gaepoLimitation,
        seochoLimitation,
        gaepo,
        seocho,
      };
    }
    case SET_CURRENT_USER_COUNT: {
      const { gaepo, seocho } = action.payload;
      return { ...state, gaepo, seocho };
    }
    case SET_OFFICE_HOUR: {
      const { officeHour } = action.payload;
      return { ...state, officeHour };
    }
    case SET_LUNCH_TIME: {
      const { officeLunchTime } = action.payload;
      return { ...state, officeLunchTime };
    }
    default:
      return state;
  }
};

export default cluster;
