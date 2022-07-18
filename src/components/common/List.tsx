import React from "react";
import classes from "styles/components/List.module.css";

interface IProps {
  text: string;
}

const List = (props: IProps) => {
  const { text } = props;
  return <li className={classes.text}>{text}</li>;
};
export default List;
