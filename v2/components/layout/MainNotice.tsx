import React from "react";
import styles from "../../styles/components/MainNotice.module.css";
import useCluster from "../../utils/hooks/useCluster";

const MainNotice = () => {
  const {
    cluster: { officeHour },
  } = useCluster();

  return (
    <section className={styles.notice}>
      <strong className={styles.strong}>{`운영시간: ${officeHour}`}</strong>
      <span>사회적 거리두기 단계에 따라 운영시간 변경 가능</span>
    </section>
  );
};

export default MainNotice;
