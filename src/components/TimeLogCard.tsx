import AccountBoxIcon from "@mui/icons-material/AccountBox";
import moment from "moment-timezone";
import React, { useEffect, useState } from "react";
import classes from "../styles/components/TimeLogCard.module.css";
import useUser from "../utils/hooks/useUser";

interface HeaderProps {
  checkinTime: string;
}
const Header: React.FC<HeaderProps> = ({ checkinTime }) => (
  <div className={classes["time-log-header"]}>
    <h4 className={classes["time-log-title"]}>클러스터 로그</h4>
    <p className={classes["time-log-subtitle"]}>체크인 시각: {checkinTime}</p>
  </div>
);
interface UtilBoxProps {
  handleFlip: () => void;
}
const UtilBox: React.FC<UtilBoxProps> = ({ handleFlip }) => (
  <div className={classes["util-box"]}>
    <AccountBoxIcon onClick={handleFlip} />
  </div>
);

interface LogDataProps {
  log: Log;
}

const LogData: React.FC<LogDataProps> = ({ log: { date, seconds } }) => (
  <li className={classes["log-data"]}>
    <time dateTime={date}>{date}</time>
    <div>{moment.utc(+seconds * 1000).format("HH:mm:ss")}</div>
  </li>
);

interface LogDataListProps {
  logs: Log[];
}

const LogDataList: React.FC<LogDataListProps> = ({ logs }) => (
  <>
    <li className={classes["log-data-header"]}>
      <div>날짜</div>
      <div>이용 시간</div>
    </li>
    <hr className={classes.divider} />
    <ul className={classes["log-data-wrapper"]}>
      {logs.map((log, idx) => (
        <div key={idx.toString()}>
          <LogData log={log} />
          <hr className={classes.divider} />
        </div>
      ))}
    </ul>
  </>
);
interface IProps {
  handleFlip: () => void;
  logs: Log[];
}

const TimeLogCard: React.FC<IProps> = ({ handleFlip, logs }) => {
  const {
    user: { checkinAt },
  } = useUser();
  const [checkinTime, setCheckinTime] = useState("");

  useEffect(() => {
    if (checkinAt) setCheckinTime(moment(new Date(checkinAt)).format("YYYY-MM-DD HH:mm"));
  }, [checkinAt]);

  return (
    <div className={classes["time-log-wrapper"]}>
      <Header checkinTime={checkinTime} />
      <UtilBox handleFlip={handleFlip} />
      <LogDataList logs={logs} />
    </div>
  );
};

export default TimeLogCard;
