import React, { Fragment, Component } from "react";
import MyButton from "../../UI/Button/Button";

class OrderSummary extends Component {
 state = {};
 componentDidUpdate() {
  console.log("ordersummary_didupdate");
 }

 render() {
  const ingredientSummary = Object.keys(this.props.ingredients).map((ingredient, i) => {
   return (
    <li key={ingredient + i}>
     <span style={{ textTransform: "capitalize" }}>{ingredient}</span>:
     {this.props.ingredients[ingredient]}
    </li>
   );
  });
  return (
   <Fragment>
    <h3>Your Order</h3>
    <p>Your delicious burger with the following ingredients</p>
    <ul>{ingredientSummary}</ul>
    <p>
     Total Price:<strong>{this.props.price}</strong>
    </p>
    <p>Continue to Checkout?</p>
    <MyButton btnType="Danger" clicked={this.props.purchaseCanceled}>
     CANCEL
    </MyButton>
    <MyButton btnType="Success" clicked={this.props.purchaseContinued}>
     CONTINUE
    </MyButton>
   </Fragment>
  );
 }
}

export default OrderSummary;
