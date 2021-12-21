import React, { useMemo } from "react";
import { Doughnut } from "react-chartjs-2";
import styles from "../../styles/components/ClusterStatusChart.module.css";
import useCluster from "../../utils/hooks/useCluster";

const data = (cur: number, max: number) => ({
  datasets: [
    {
      data: [cur, !max ? 1 : max - cur],
      backgroundColor: ["rgb(74, 226, 170)", "rgba(74, 226, 170, 0.2)"],
      hoverOffset: 4,
      borderWidth: 0,
      cutout: "77%",
    },
  ],
});
interface ChartProps {
  name: "개포" | "서초";
  curUserCount: number;
  maxUserCount: number;
}
const Chart: React.FC<ChartProps> = ({ name, curUserCount, maxUserCount }) => {
  const chartData = useMemo(() => data(curUserCount, maxUserCount), [curUserCount, maxUserCount]);
  return (
    <div className={styles.chart}>
      <h2 className={styles.h2}>{name}</h2>
      <Doughnut data={chartData} />
      <span className={styles.label}>
        <span>
          <strong className={styles.strong}>{curUserCount}</strong> / {maxUserCount}
        </span>
      </span>
    </div>
  );
};

const ClusterStatusChart = () => {
  const {
    cluster: { gaepo, seocho, gaepoLimitation, seochoLimitation },
  } = useCluster();

  return (
    <section className={styles.wrapper}>
      <Chart curUserCount={gaepo} maxUserCount={gaepoLimitation} name='개포' />
      <Chart curUserCount={seocho} maxUserCount={seochoLimitation} name='서초' />
    </section>
  );
};

export default ClusterStatusChart;
