import React, { Component, Fragment } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";
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
     "Loading"
    )}
   </div>
  );
 }
}
const mapStateToProps = state => {
 return {
  ings: state.ingredients,
  price: state.totalPrice
 };
};
export default connect(
 mapStateToProps,
 null
)(Checkout);
