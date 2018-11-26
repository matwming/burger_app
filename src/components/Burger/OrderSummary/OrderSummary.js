import React, { Fragment } from "react";
import MyButton from "../../UI/Button/Button";

const orderSummary = props => {
 const ingredientSummary = Object.keys(props.ingredients).map((ingredient, i) => {
  return (
   <li key={ingredient + i}>
    <span style={{ textTransform: "capitalize" }}>{ingredient}</span>:
    {props.ingredients[ingredient]}
   </li>
  );
 });
 return (
  <Fragment>
   <h3>Your Order</h3>
   <p>Your delicious burger with the following ingredients</p>
   <ul>{ingredientSummary}</ul>
   <p>
    Total Price:<strong>{props.price}</strong>
   </p>
   <p>Continue to Checkout?</p>
   <MyButton btnType="Danger" clicked={props.purchaseCanceled}>
    CANCEL
   </MyButton>
   <MyButton btnType="Success" clicked={props.purchaseContinued}>
    CONTINUE
   </MyButton>
  </Fragment>
 );
};

export default orderSummary;
