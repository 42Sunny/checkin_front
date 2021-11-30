import ListIcon from "@mui/icons-material/List";
import React, { useEffect, useState } from "react";
import { Backdrop, CircularProgress } from "@mui/material";
import classes from "../styles/components/ProfileCard.module.css";
import useUser from "../utils/hooks/useUser";
import CheckInForm from "./CheckInForm";
import CheckOutUi from "./CheckOutUi";
import useCluster from "../utils/hooks/useCluster";
import { formatOfficeTime } from "../utils/time";

interface UtilBoxProps {
  handleFlip: (e: React.MouseEvent) => void;
}
const UtilBox: React.FC<UtilBoxProps> = ({ handleFlip }) => (
  <div className={classes["util-box"]}>
    <ListIcon onClick={handleFlip} />
  </div>
);

interface OfficeHourBoxProps {
  officeTime: string;
}
const OfficeHourBox: React.FC<OfficeHourBoxProps> = ({ officeTime }) => (
  <div className={classes["opening-hour-box"]}>
    {`클러스터 운영시간: ${officeTime}`}
    <br />
    인포데스크 점심시간 13:00 ~ 14:00
  </div>
);

interface ProfileProps {
  profile: string;
  userId: string;
}
const Profile: React.FC<ProfileProps> = ({ profile, userId }) => (
  <div className={classes["profile-wrapper"]}>
    <img className={classes.profile} src={profile} alt='profile' />
    <h2>{userId}</h2>
  </div>
);
interface IProps {
  handleFlip: (e: React.MouseEvent) => void;
  handleCheckIn: (cardNum: string) => (e: React.FormEvent<HTMLFormElement>) => Promise<boolean>;
  handleCheckOut: () => Promise<void>;
  isLoading: boolean;
}

const ProfileCard: React.FC<IProps> = ({
  handleFlip,
  handleCheckIn,
  handleCheckOut,
  isLoading,
}) => {
  const {
    user: { state, id: userId, profile },
  } = useUser();
  const {
    cluster: { openAt, closeAt },
  } = useCluster();
  const [officeTime, setOfficeTime] = useState("");

  useEffect(() => {
    setOfficeTime(formatOfficeTime({ openAt, closeAt }));
  }, [closeAt, openAt]);

  return (
    <div className={classes.profileCard}>
      <Backdrop style={{ zIndex: 1 }} open={isLoading}>
        {isLoading && <CircularProgress size={50} color='inherit' />}
      </Backdrop>
      <UtilBox handleFlip={handleFlip} />
      <Profile profile={profile} userId={userId} />
      <hr className={classes.divider} />
      <OfficeHourBox officeTime={officeTime} />
      {state === "checkIn" ? (
        <CheckOutUi handleCheckOut={handleCheckOut} />
      ) : (
        <CheckInForm handleCheckIn={handleCheckIn} />
      )}
    </div>
  );
};

export default ProfileCard;
