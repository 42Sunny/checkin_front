import React from "react";

import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

import AccountBoxIcon from "@mui/icons-material/AccountBox";
import classes from "../../styles/components/Card/TimeLogCard.module.css";

dayjs.extend(localizedFormat);
dayjs.locale("ko");

type UtilBoxProps = {
  handleFlip: () => void;
};

function UtilBox({ handleFlip }: UtilBoxProps) {
  return (
    <div className={classes["util-box"]}>
      <AccountBoxIcon onClick={handleFlip} />
    </div>
  );
}

const data = {
  durationTime: 234000,
  logs: [
    {
      id: 1,
      checkinAt: "2020-07-10T13:00:00",
      checkoutAt: "2020-07-10T18:00:00",
      durationTime: 3600,
    },
    {
      id: 2,
      checkinAt: "2020-07-11T13:00:00",
      checkoutAt: "2020-07-11T18:00:00",
      durationTime: 10860,
    },
  ],
};

const timeFormat = (seconds: number) => {
  const tempHours = Math.floor(seconds / 3600);
  const temppMinuts = (seconds % 3600) / 60;

  const hours = tempHours < 10 ? `0${tempHours}` : tempHours;
  const minutes = temppMinuts < 10 ? `0${temppMinuts}` : temppMinuts;
  return `${hours}시간${minutes}분`;
};

function LogCardContents() {
  const accTime = data.logs.reduce((ac, cur) => ac + cur.durationTime, 0);
  return (
    <div className={classes.timeLogWrpaper}>
      <div className={classes.timeLogTitleWrapper}>
        <p>총 누적 시간 : {timeFormat(accTime)}</p>
        <strong>이번달</strong>
      </div>
      <table className={classes.timeLogTable}>
        <thead>
          <tr>
            <th>입실</th>
            <th>퇴실</th>
            <th>체류시간</th>
          </tr>
        </thead>
        <tbody>
          {data.logs.map((log: any) => {
            return (
              <tr key={log.id} className={classes.row}>
                <td>{dayjs(log.checkinAt).format("MM월DD일 HH:mm")}</td>
                <td>{dayjs(log.checkoutAt).format("MM월DD일 HH:mm")}</td>
                <td>{timeFormat(log.durationTime)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

type TimeLogCardProps = {
  handleFlip: () => void;
  logs: Log[];
};

function TimeLogCard({ handleFlip, logs }: TimeLogCardProps) {
  return (
    <div className={classes["time-log-wrapper"]}>
      <UtilBox handleFlip={handleFlip} />
      <LogCardContents />
    </div>
  );
}

export default TimeLogCard;
