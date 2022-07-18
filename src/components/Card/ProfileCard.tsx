import ListIcon from "@mui/icons-material/List";
import React from "react";
import CardContents from "components/Card/CardContents";
import Circle from "components/common/Circle";
import classes from "styles/components/Card/ProfileCard.module.css";
import useUser from "utils/hooks/useUser";
import logo from "assets/42-logo-black.png";

type UtilBoxProps = {
  handleFlip: (e: React.MouseEvent) => void;
};

function UtilBox({ handleFlip }: UtilBoxProps) {
  return (
    <div className={classes["util-box"]}>
      <ListIcon data-testid='flip-button' onClick={handleFlip} />
    </div>
  );
}

type UserCircleProps = {
  state: string | null;
};
function UserCircle({ state }: UserCircleProps) {
  const color = state === "checkOut" ? "green" : "orange";
  return <Circle color={color} />;
}

type ProfileProps = {
  profile: string;
  userId: string;
  state: string | null;
};

function Profile({ profile, userId, state }: ProfileProps) {
  return (
    <div className={classes["profile-wrapper"]}>
      <UserCircle state={state} />
      <img className={classes.profile} src={profile} alt='profile' />
      <h2 className={classes.userId}>{userId}</h2>
    </div>
  );
}
type IProps = {
  handleFlip: (e: React.MouseEvent) => void;
};

function ProfileCard({ handleFlip }: IProps) {
  const {
    user: { id: userId, profile, state },
  } = useUser();

  return (
    <div className={classes.profileCard}>
      <img className={classes.logo} alt='logo' src={logo} />
      <UtilBox handleFlip={handleFlip} />
      <Profile profile={profile} userId={userId} state={state} />
      <CardContents />
    </div>
  );
}

export default ProfileCard;
