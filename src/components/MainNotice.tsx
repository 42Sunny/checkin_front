import React, { useEffect, useState } from "react";
import styles from "../styles/components/MainNotice.module.css";
import useCluster from "../utils/hooks/useCluster";
import { formatOfficeTime } from "../utils/time";

const MainNotice = () => {
  const {
    cluster: { openAt, closeAt },
  } = useCluster();
  const [time, setTime] = useState("");

  useEffect(() => {
    setTime(formatOfficeTime({ openAt, closeAt }));
  }, [closeAt, openAt]);

  return (
    <section className={styles.notice}>
      <strong className={styles.strong}>{`운영시간: ${time}`}</strong>
      <span>사회적 거리두기 단계에 따라 운영시간 변경 가능</span>
    </section>
  );
};

export default MainNotice;
