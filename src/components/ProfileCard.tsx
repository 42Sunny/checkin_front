import ListIcon from "@mui/icons-material/List";
import React from "react";
import classes from "../styles/components/ProfileCard.module.css";
import useUser from "../utils/hooks/useUser";
import CheckInUi from "./CheckInUi";
import CheckOutUi from "./CheckOutUi";

interface UtilBoxProps {
  handleFlip: (e: React.MouseEvent) => void;
}
const UtilBox: React.FC<UtilBoxProps> = ({ handleFlip }) => (
  <div className={classes["util-box"]}>
    <ListIcon onClick={handleFlip} />
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
}

const ProfileCard: React.FC<IProps> = ({ handleFlip, handleCheckIn, handleCheckOut }) => {
  const {
    user: { id: userId, profile, state },
  } = useUser();

  return (
    <div className={classes.profileCard}>
      <UtilBox handleFlip={handleFlip} />
      <Profile profile={profile} userId={userId} />
      <hr className={classes.divider} />
      {state === "checkIn" && <CheckOutUi handleCheckOut={handleCheckOut} />}
      {state === "checkOut" && <CheckInUi handleCheckIn={handleCheckIn} />}
    </div>
  );
};

export default ProfileCard;
