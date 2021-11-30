import { makeStyles } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import useCluster from "../utils/hooks/useCluster";

const useStyles = makeStyles(() => ({
  info: {
    background: "rgba(0, 0, 0, 0.5)",
    "& span": {
      fontSize: "0.8rem",
    },
  },
  title: {
    fontSize: "1rem",
    fontWeight: "bolder",
  },
}));

const Notice: React.FC = () => {
  const classes = useStyles();
  const {
    cluster: { officeHours },
  } = useCluster();

  return (
    <>
      <Alert severity='info' variant='filled' className={classes.info}>
        <AlertTitle className={classes.title}>`운영시간: ${officeHours}`</AlertTitle>
        <span>※ 사회적 거리두기 단계에 따라 운영시간 변경 가능</span>
      </Alert>
    </>
  );
};

export default Notice;
