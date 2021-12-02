import { createAction, ActionType } from "typesafe-actions";
import { formatOfficeHours } from "../../utils/time";

// actions
const SET_CLUSTER = "cluster/SET_CLUSTER";
const SET_CURRENT_USER_COUNT = "cluster/SET_CURRENT_USER_COUNT";
// action creators

export const setCluster = createAction(SET_CLUSTER)<Omit<Cluster, "officeHours">>();
export const setCurrentUserCount =
  createAction(SET_CURRENT_USER_COUNT)<{ gaepo: number; seocho: number }>();
// type
const actions = { setCluster, setCurrentUserCount };
type ClusterActions = ActionType<typeof actions>;

// initalState
const initalState: Cluster = {
  openAt: "",
  closeAt: "",
  seocho: 0,
  gaepo: 0,
  seochoLimitation: 0,
  gaepoLimitation: 0,
  officeHours: "",
};

// reducer
const cluster = (state = initalState, action: ClusterActions): Cluster => {
  switch (action.type) {
    case SET_CLUSTER: {
      const { openAt, closeAt, gaepo, seocho, gaepoLimitation, seochoLimitation } = action.payload;
      const officeHours = formatOfficeHours({ openAt, closeAt });
      return {
        ...state,
        openAt,
        closeAt,
        gaepoLimitation,
        seochoLimitation,
        gaepo,
        seocho,
        officeHours,
      };
    }
    case SET_CURRENT_USER_COUNT: {
      const { gaepo, seocho } = action.payload;
      return { ...state, gaepo, seocho };
    }
    default:
      return state;
  }
};

export default cluster;
