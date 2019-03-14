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
 .invalid {
  border: 1px solid red;
  background-color: salmon;
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
 select {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
 }
`;

export default function InputContact(props) {
 let inputElement;
 let validationError = null;
 const inputClasses = ["inputElement"];
 if (props.invalid && props.shouldValidate && props.touched) {
  inputClasses.push("invalid");
  validationError = <p>Please enter a valid {props.labelName}</p>;
 }

 switch (props.elementType) {
  case "input":
   inputElement = (
    <input
     className={inputClasses.join(" ")}
     {...props.elementConfig}
     value={props.value}
     onChange={props.changed}
    />
   );
   break;
  case "textarea":
   inputElement = (
    <textarea
     className={inputClasses.join(" ")}
     {...props.elementConfig}
     value={props.value}
     onChange={props.changed}
    />
   );
   break;
  case "select":
   inputElement = (
    <select value={props.value} className={inputClasses.join(" ")} onChange={props.changed}>
     {props.elementConfig.options.map(option => {
      return (
       <option key={option.value} value={option.value}>
        {option.label}
       </option>
      );
     })}
    </select>
   );
   break;
  default:
   inputElement = (
    <input
     className={inputClasses.join(" ")}
     {...props.elementConfig}
     value={props.value}
     onChange={props.changed}
    />
   );
 }
 return (
  <Div>
   <label className={inputClasses.join(" ")}>{props.label}</label>
   {inputElement}
   {validationError}
  </Div>
 );
}
