import ListIcon from "@mui/icons-material/List";
import React from "react";
import { Backdrop, CircularProgress } from "@mui/material";
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
  return (
    <div className={classes.profileCard}>
      <UtilBox handleFlip={handleFlip} />
      <Profile profile={profile} userId={userId} />
      {/* {state === "checkIn" && <hr className={classes.divider} />} */}
      <hr className={classes.divider} />
      <Backdrop open={isLoading}>
        <CircularProgress size={50} color='inherit' />
      </Backdrop>
      {state === "checkIn" ? (
        <CheckOutUi handleCheckOut={handleCheckOut} />
      ) : (
        <CheckInForm handleCheckIn={handleCheckIn} />
      )}
    </div>
  );
};

export default ProfileCard;
