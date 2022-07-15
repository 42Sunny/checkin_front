import ListIcon from "@mui/icons-material/List";
import React from "react";
import classes from "../styles/components/ProfileCard.module.css";
import useUser from "../utils/hooks/useUser";
import CheckInUi from "./CheckInUi";
import CheckOutUi from "./CheckOutUi";
import logo from "../assets/42-logo-black.png";
import CardContents from "./Card/CardContents";

interface UtilBoxProps {
  handleFlip: (e: React.MouseEvent) => void;
}
const UtilBox: React.FC<UtilBoxProps> = ({ handleFlip }) => (
  <div className={classes["util-box"]}>
    <ListIcon data-testid='flip-button' onClick={handleFlip} />
  </div>
);

interface ProfileProps {
  profile: string;
  userId: string;
}
const Profile: React.FC<ProfileProps> = ({ profile, userId }) => (
  <div className={classes["profile-wrapper"]}>
    <img className={classes.profile} src={profile} alt='profile' />
    <h2 className={classes.userId}>{userId}</h2>
  </div>
);
interface IProps {
  handleFlip: (e: React.MouseEvent) => void;
  handleCheckIn: (cardNum: string) => (e: React.FormEvent<HTMLFormElement>) => Promise<boolean>;
  handleCheckOut: () => Promise<void>;
}

// const ProfileCard: React.FC<IProps> = ({ handleFlip, handleCheckIn, handleCheckOut }) => {
//   const {
//     user: { id: userId, profile, state },
//   } = useUser();

//   return (
//     <div className={classes.profileCard}>
//       <img className={classes.logo} alt='logo' src={logo} />
//       <UtilBox handleFlip={handleFlip} />
//       <Profile profile={profile} userId={userId} />
//       <hr className={classes.divider} />
//       {state === "checkIn" ? (
//         <CheckOutUi handleCheckOut={handleCheckOut} />
//       ) : (
//         <CheckInUi handleCheckIn={handleCheckIn} />
//       )}
//     </div>
//   );
// };

const ProfileCard: React.FC<IProps> = ({ handleFlip, handleCheckIn, handleCheckOut }) => {
  const {
    user: { id: userId, profile, state },
  } = useUser();

  return (
    <div className={classes.profileCard}>
      <img className={classes.logo} alt='logo' src={logo} />
      <UtilBox handleFlip={handleFlip} />
      <Profile profile={profile} userId={userId} />
      <CardContents />
    </div>
  );
};

export default ProfileCard;
