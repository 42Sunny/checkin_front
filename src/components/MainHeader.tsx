import React from "react";
import classes from "../styles/MainHeader.module.css";

const MainHeader = () => {
  return (
    <header className={classes.header}>
      <span className={classes.logo}>42 logo</span>
      <h1 className={classes.title}>Check-in Cluster</h1>
    </header>
  );
};

export default MainHeader;

// TODO: 쓸거임
