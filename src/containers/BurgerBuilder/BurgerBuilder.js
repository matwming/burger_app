import React, { useState, Fragment, useEffect } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BurgerControls/BurgerControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../config";
import Spinner from "../../components/UI/Spinner/Spinner";
import ErrorHandler from "../ErrorHandler/ErrorHandler";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

const burgerBuilder = props => {
 const [purchasing, setPurchasing] = useState(false);
 useEffect(() => {
  props.onInitIngredients();
  props.onInitPurchase();
 }, []);

 const updatePurchaseState = ingredients => {
  let sum = false;
  if (ingredients) {
   sum = Object.values(ingredients).reduce((a, b) => {
    return a + b;
   }, []);
  }

  return sum > 0;
 };
 const addIngredientHandler = type => {
  props.onIngredientAdded;
 };
 const removeIngredientHandler = type => {
  props.onIngredientRemoved;
 };
 const purchaseHandler = () => {
  if (props.isAuthenticated) {
   setPurchasing(true);
  } else {
   props.onSetAuthRedirectPath("/checkout");
   props.history.push("/auth");
  }
 };
 const purchaseCancelHandler = () => {
  setPurchasing(false);
 };
 const purchaseContinueHandler = () => {
  props.onInitPurchase();
  props.history.push("/checkout");
 };

 const disabledInfo = {
  ...props.ings
 };
 for (let key in disabledInfo) {
  disabledInfo[key] = disabledInfo[key] <= 0;
 }
 let orderSummary = (
  <OrderSummary
   ingredients={props.ings}
   purchaseCanceled={purchaseCancelHandler}
   purchaseContinued={purchaseContinueHandler}
   price={props.price}
  />
 );

 let burger = (
  <Fragment>
   <Burger ingredients={props.ings} />
   <BuildControls
    ingredientAdded={props.onIngredientAdded}
    ingredientRemoved={props.onIngredientRemoved}
    disabled={disabledInfo}
    price={props.price}
    purchaseable={updatePurchaseState(props.ings)}
    ordered={purchaseHandler}
    isAuth={props.isAuthenticated}
   />
  </Fragment>
 );
 if (!props.ings) {
  burger = props.error ? <p>Ingredients cannot be loaded!</p> : <Spinner />;
  orderSummary = <Spinner />;
 }
 return (
  <Fragment>
   <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
    {orderSummary}
   </Modal>
   {burger}
  </Fragment>
 );
};
const mapStateToProps = state => {
 return {
  ings: state.burgerBuilder.ingredients,
  price: state.burgerBuilder.totalPrice,
  error: state.burgerBuilder.error,
  purchased: state.order.purchased,
  isAuthenticated: state.auth.token !== null,
  path: state.auth.authRedirectPath
 };
};

const mapDispatchToProps = dispatch => {
 return {
  onIngredientAdded: name => dispatch(actions.addIngredient(name)),
  onIngredientRemoved: name => dispatch(actions.removeIngredient(name)),
  onInitIngredients: () => dispatch(actions.initIngredient()),
  onInitPurchase: () => dispatch(actions.purchaseInit()),
  onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path))
 };
};
export default connect(
 mapStateToProps,
 mapDispatchToProps
)(withRouter(ErrorHandler(burgerBuilder, axios)));
