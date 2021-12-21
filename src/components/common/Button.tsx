import React from "react";
import classes from "../../styles/components/Button.module.css";

interface IProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  text: string;
  type: "button" | "submit" | "reset";
  color?: string;
}

const Button: React.FC<IProps> = ({ color = "green", text, type, ...rest }) => {
  return (
    <button
      {...rest}
      className={`${classes.button} ${classes[`${color}`]}`}
      color={color}
      type={type}
    >
      {text}
    </button>
  );
};

export default Button;
