import React from "react";
import classes from "../styles/components/ClusterStatusBoard.module.css";
import useCluster from "../utils/hooks/useCluster";
import Circle from "./Circle";

const getClusterCongestion = (current: number, max: number) => {
  const state = current / max;
  if (state > 0.8) return "red";
  if (state > 0.4) return "orange";
  return "green";
};

interface StatusItemProps {
  current: number;
  limitation: number;
  name: string;
}

const StatusItem: React.FC<StatusItemProps> = ({ name, current, limitation }) => {
  const congestion = getClusterCongestion(current, limitation);
  return (
    <div className={classes.item}>
      <span className={classes.title}>
        {name}
        <span className={classes.count}>
          <span>
            {current} / {limitation}
          </span>
        </span>
        <Circle color={congestion} />
      </span>
    </div>
  );
};

const ClusterStatusBoard = () => {
  const {
    cluster: { gaepo, gaepoLimitation, seocho, seochoLimitation },
  } = useCluster();

  return (
    <div className={classes.wrap}>
      <StatusItem name='개포' current={gaepo} limitation={gaepoLimitation} />
      <StatusItem name='서초' current={seocho} limitation={seochoLimitation} />
    </div>
  );
};

export default ClusterStatusBoard;
