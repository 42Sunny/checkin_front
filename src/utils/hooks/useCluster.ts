import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/modules";
import * as clusterActions from "redux/modules/cluster";

const useCluster = () => {
  const dispatch = useDispatch();
  const cluster = useSelector((state: RootState) => state.clusterReducer);

  const setCluster = useCallback(
    (param: Omit<Cluster, "officeHour" | "officeLunchTime">) => {
      dispatch(clusterActions.setCluster(param));
    },
    [dispatch],
  );
  const setCurrentUserCount = useCallback(
    ({ gaepo, seocho }: { gaepo: number; seocho: number }) => {
      dispatch(clusterActions.setCurrentUserCount({ gaepo, seocho }));
    },
    [dispatch],
  );

  const setOfficeHour = useCallback(
    ({ officeHour }: { officeHour: string }) => {
      dispatch(clusterActions.setOfficeHour({ officeHour }));
    },
    [dispatch],
  );
  const setOfficeLunchTime = useCallback(
    ({ officeLunchTime }: { officeLunchTime: string }) => {
      dispatch(clusterActions.setLunchTime({ officeLunchTime }));
    },
    [dispatch],
  );

  return { cluster, setCluster, setCurrentUserCount, setOfficeHour, setOfficeLunchTime };
};

export default useCluster;
