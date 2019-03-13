import React from "react";
import styled from "styled-components";

const Div = styled.div`
 .iputElement {
  outline: none;
  background-color: white;
  font: inherit;
  padding: 6px 10px;
  display: block;
  width: 100%;
 }
 .inputElement:focus {
  outline: none;
  background-color: #ccc;
 }
 input {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
 }
 label {
  font-weight: bold;
  display: block;
  margin-bottom: 8px;
 }
`;

export default function InputContact(props) {
 let inputElement;
 switch (props.inputtype) {
  case "input":
   inputElement = <input className="inputElement" {...props} />;
   break;
  case "textarea":
   inputElement = <textarea className="inputElement" {...props} />;
   break;
  default:
   inputElement = <input className="inputElement" {...props} />;
 }
 return (
  <Div>
   <label className="inputElement">{props.label}</label>
   {inputElement}
  </Div>
 );
}
