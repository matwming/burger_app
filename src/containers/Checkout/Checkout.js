import React, { Component, Fragment } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route, Redirect, withRouter } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

const checkout = props => {
 const checkoutCancelled = () => {
  console.log("cancel");
  props.history.goBack();
 };
 const checkoutContinued = () => {
  props.history.replace("/checkout/contact-data");
 };
 return (
  <div>
   {props.ings ? (
    <Fragment>
     <CheckoutSummary
      ingredients={props.ings}
      checkoutCancelled={checkoutCancelled}
      checkoutContinued={checkoutContinued}
     />
     <Route path={props.match.path + "/contact-data"} component={ContactData} />
    </Fragment>
   ) : (
    <Redirect to="/" />
   )}
  </div>
 );
};

const mapStateToProps = state => {
 return {
  ings: state.burgerBuilder.ingredients,
  price: state.burgerBuilder.totalPrice,
  purchased: state.order.purchased
 };
};

export default connect(mapStateToProps)(withRouter(checkout));
