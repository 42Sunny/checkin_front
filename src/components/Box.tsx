import React from "react";
import classes from "../styles/components/Box.module.css";

const Box: React.FC = ({ children }) => <div className={classes.box}>{children}</div>;

export default Box;
