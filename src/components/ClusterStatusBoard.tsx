import React, { useEffect, useState } from "react";
import Circle from "./Circle";
import classes from "../styles/components/ClusterStatusBoard.module.css";
import useCluster from "../utils/hooks/useCluster";

const ClusterStatusBoard = () => {
  const {
    cluster: { gaepo, gaepoLimitation, seocho, seochoLimitation },
  } = useCluster();

  const [clusterCongestion, setClusterCongestion] = useState({
    // 개포, 서초 인원 수에 따른 혼잡도
    gaepoCongestion: "",
    seochoCongestion: "",
  });
  const { gaepoCongestion, seochoCongestion } = clusterCongestion;

  const getClusterCongestion = (current: number, max: number) => {
    const state = current / max;

    if (state > 0.8) {
      return "red";
    }
    if (state <= 0.8 && state > 0.4) {
      return "orange";
    }
    return "green";
  };

  useEffect(() => {
    setClusterCongestion({
      gaepoCongestion: getClusterCongestion(gaepo, gaepoLimitation),
      seochoCongestion: getClusterCongestion(seocho, seochoLimitation),
    });
  }, [gaepo, gaepoLimitation, seocho, seochoLimitation]);

  return (
    <div className={classes.wrap}>
      <div className={classes.item}>
        <span className={classes.title}>
          개포
          <span className={classes.count}>
            <span>
              {gaepo} / {gaepoLimitation}
            </span>
          </span>
          <Circle color={gaepoCongestion} />
        </span>
      </div>
      <div className={classes.item}>
        <span className={classes.title}>
          서초
          <span className={classes.count}>
            <span>
              {seocho} / {seochoLimitation}
            </span>
          </span>
          <Circle color={seochoCongestion} />
        </span>
      </div>
    </div>
  );
};

export default ClusterStatusBoard;
