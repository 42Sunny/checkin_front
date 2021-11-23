import React from "react";
import styles from "../styles/MainNotice.module.css";

const MainNotice = () => {
  return (
    <section className={styles.notice}>
      <strong className={styles.strong}>운영 시간: 07:00 ~ 22:00</strong>
      <span>사회적 거리두기 단계에 따라 운영시간 변경 가능</span>
    </section>
  );
};

export default MainNotice;

// TODO: 쓸거임
