import ListIcon from "@mui/icons-material/List";
import React from "react";
import classes from "../styles/ProfileCard.module.css";
import useUser from "../utils/hooks/useUser";
import CheckInForm from "./CheckInForm";
import CheckOutUi from "./CheckOutUi";

interface IProps {
  handleFlip: (e: React.MouseEvent) => void;
  handleCheckIn: (e: React.FormEvent<HTMLFormElement>) => Promise<boolean>;
  handleCheckOut: () => Promise<void>;
}

const ProfileCard: React.FC<IProps> = ({ handleFlip, handleCheckIn, handleCheckOut }) => {
  const {
    user: { state, id, profile },
  } = useUser();

  return (
    <div className={classes.profileCard}>
      <div className={classes["util-box"]}>
        <ListIcon onClick={handleFlip} />
      </div>
      <div className={classes["profile-wrapper"]}>
        <img className={classes.profile} src={profile} alt='profile' />
        <h2>{id}</h2>
      </div>
      {state === "checkOut" && <CheckInForm handleCheckIn={handleCheckIn} />}
      {state === "checkIn" && <CheckOutUi handleCheckOut={handleCheckOut} />}
    </div>
  );
};

export default ProfileCard;
