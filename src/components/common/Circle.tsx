import React from "react";
import classes from "../../styles/components/Circle.module.css";

type Props = {
  color: string | "green" | "orange" | "red";
};
const Circle = ({ color = "green" }: Props) => (
  <div role='status' className={`${classes.circle} ${classes[color]}`} />
);

export default Circle;
