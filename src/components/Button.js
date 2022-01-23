import React from "react";
import { MainButton } from "./styles";

const Button = (props) => {
  const { text, onClick } = props;
  return (
    <MainButton className="action-button" onClick={onClick}>
      {text}
    </MainButton>
  );
};

export default Button;
