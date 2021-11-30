import ListIcon from "@mui/icons-material/List";
import React from "react";
import classes from "../styles/components/ProfileCard.module.css";
import useUser from "../utils/hooks/useUser";

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
  render: () => React.ReactElement;
}

const ProfileCard: React.FC<IProps> = ({ handleFlip, render }) => {
  const {
    user: { id: userId, profile },
  } = useUser();

  return (
    <div className={classes.profileCard}>
      <UtilBox handleFlip={handleFlip} />
      <Profile profile={profile} userId={userId} />
      <hr className={classes.divider} />
      {render()}
    </div>
  );
};

export default ProfileCard;
