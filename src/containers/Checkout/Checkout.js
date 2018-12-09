import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
class Checkout extends Component {
 state = {
  ingredients: {
   salad: 1,
   meat: 1,
   cheese: 1,
   bacon: 1
  }
 };
 componentDidMount() {
  const query = new URLSearchParams(this.props.location.search);
  console.log("query", query.getAll("cheese"));
  console.log("query.entries()", query.entries());
  const ingredients = {};
  for (let param of query) {
   console.log("param", param);
   console.log("param", param.entries());
   ingredients[param[0]] = +param[1];
  }
  console.log("ingredients", ingredients);
  this.setState({
   ingredients: ingredients
  });
 }
 checkoutCancelled() {
  console.log("cancel");
  this.props.history.goBack();
 }
 checkoutContinued() {
  this.props.history.replace("/checkout/contact-data");
 }
 render() {
  return (
   <div>
    <CheckoutSummary
     ingredients={this.state.ingredients}
     checkoutCancelled={this.checkoutCancelled.bind(this)}
     checkoutContinued={this.checkoutContinued.bind(this)}
    />
   </div>
  );
 }
}

export default Checkout;
