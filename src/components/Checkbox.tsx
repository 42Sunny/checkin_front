import React from "react";
import classes from "../styles/components/Checkbox.module.css";

interface IProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  text: string;
}

const Checkbox = ({ text, onChange, children, checked, id }: IProps) => {
  return (
    <label className={classes.text} htmlFor={id}>
      <input
        id={id}
        className={classes.checkbox}
        type='checkbox'
        checked={checked}
        onChange={onChange}
      />
      {text}
      {children}
    </label>
  );
};

export default Checkbox;
