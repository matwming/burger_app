import React from "react";
import styled from "styled-components";
const Button = styled.button`
 background-color: transparent;
 border: none;
 color: ${props => (props.btnType === "Success" ? "#5c9210" : "#944317")};
 outline: none;
 cursor: pointer;
 font: inherit;
 padding: 10px;
 margin: 10px;
 font-weight: bold;
 :disabled {
  color: #ccc;
  cursor: not-allowed;
 }
`;

const button = props => {
 return (
  <Button btnType={props.btnType} onClick={props.clicked} disabled={props.disabled}>
   {props.children}
  </Button>
 );
};
export default button;
