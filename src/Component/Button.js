import React from "react";

const Button = (props) => {
  return <button onClick={props.clicked}>{props.title}</button>;
};
export default Button;
