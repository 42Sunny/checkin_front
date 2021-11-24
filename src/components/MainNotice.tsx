import React, { useEffect, useState } from "react";
import styles from "../styles/MainNotice.module.css";
import useCluster from "../utils/hooks/useCluster";

const formatTime = ({ openAt, closeAt }: Pick<Cluster, "closeAt" | "openAt">) => {
  const openTime = openAt || "";
  const closeTime = closeAt || "";
  if (openTime === "" && closeTime === "") return `운영 시간: 00:00 ~ 24:00`;
  if (closeTime === "") return `운영 시간: ${openTime.slice(0, 5)} ~ `;
  if (openTime === "") return `운영 시간: ---- ~  ${closeTime.slice(0, 5)}`;
  return `운영 시간: ${openTime.slice(0, 5)} ~ ${closeTime.slice(0, 5)}`;
};

const MainNotice = () => {
  const {
    cluster: { openAt, closeAt },
  } = useCluster();
  const [time, setTime] = useState("");

  useEffect(() => {
    setTime(formatTime({ openAt, closeAt }));
  }, [closeAt, openAt]);

  return (
    <section className={styles.notice}>
      <strong className={styles.strong}>{time}</strong>
      <span>사회적 거리두기 단계에 따라 운영시간 변경 가능</span>
    </section>
  );
};

export default MainNotice;
