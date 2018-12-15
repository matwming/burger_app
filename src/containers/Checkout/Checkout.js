import React, { Component, Fragment } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route, Redirect } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
class Checkout extends Component {
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
    {this.props.ings ? (
     <Fragment>
      <CheckoutSummary
       ingredients={this.props.ings}
       checkoutCancelled={this.checkoutCancelled.bind(this)}
       checkoutContinued={this.checkoutContinued.bind(this)}
      />
      <Route path={this.props.match.path + "/contact-data"} component={ContactData} />
     </Fragment>
    ) : (
     <Redirect to="/" />
    )}
   </div>
  );
 }
}
const mapStateToProps = state => {
 return {
  ings: state.burgerBuilder.ingredients,
  price: state.burgerBuilder.totalPrice,
  purchased: state.order.purchased
 };
};

export default connect(mapStateToProps)(Checkout);
