import ListIcon from "@mui/icons-material/List";
import React from "react";
import classes from "../styles/ProfileCard.module.css";
import useUser from "../utils/hooks/useUser";
import CheckInForm from "./CheckInForm";
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
  handleCheckIn: (e: React.FormEvent<HTMLFormElement>) => Promise<boolean>;
  handleCheckOut: () => Promise<void>;
}

const ProfileCard: React.FC<IProps> = ({ handleFlip, handleCheckIn, handleCheckOut }) => {
  const {
    user: { state, id: userId, profile },
  } = useUser();

  return (
    <div className={classes.profileCard}>
      <UtilBox handleFlip={handleFlip} />
      <Profile profile={profile} userId={userId} />
      {/* {state === "checkIn" && <hr className={classes.divider} />} */}
      <hr className={classes.divider} />
      {state === "checkOut" && <CheckInForm handleCheckIn={handleCheckIn} />}
      {state === "checkIn" && <CheckOutUi handleCheckOut={handleCheckOut} />}
    </div>
  );
};

export default ProfileCard;
