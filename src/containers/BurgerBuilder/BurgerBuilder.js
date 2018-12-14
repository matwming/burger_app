import React, { Component, Fragment } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BurgerControls/BurgerControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../config";
import Spinner from "../../components/UI/Spinner/Spinner";
import ErrorHandler from "../ErrorHandler/ErrorHandler";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions";

class BurgerBuilder extends Component {
 state = {
  purchasing: false,
  loading: false,
  error: false
 };
 componentDidMount() {
  // axios
  //  .get("https://newburgerapp.firebaseio.com/ingredients.json")
  //  .then(json => {
  //   console.log("burgerBuild", json.data);
  //   if (json.status === 200) {
  //    this.setState({
  //     ingredients: json.data
  //    });
  //   }
  //  })
  //  .catch(error =>
  //   this.setState({
  //    error: true
  //   })
  //  );
 }
 updatePurchaseState(ingredients) {
  const sum = Object.values(ingredients).reduce((a, b) => {
   return a + b;
  }, []);
  console.log("sum", sum);
  return sum > 0;
 }
 addIngredientHandler = type => {
  this.props.onIngredientAdded;
 };
 removeIngredientHandler = type => {
  this.props.onIngredientRemoved;
 };
 purchaseHandler() {
  this.setState({
   purchasing: true
  });
 }
 purchaseCancelHandler = () => {
  this.setState({ purchasing: false });
 };
 purchaseContinueHandler = () => {
  this.props.history.push("/checkout");
 };
 render() {
  console.log("loading_status", this.state.loading);
  const disabledInfo = {
   ...this.props.ings
  };
  for (let key in disabledInfo) {
   disabledInfo[key] = disabledInfo[key] <= 0;
  }
  let orderSummary = (
   <OrderSummary
    ingredients={this.props.ings}
    purchaseCanceled={this.purchaseCancelHandler}
    purchaseContinued={this.purchaseContinueHandler}
    price={this.props.price}
   />
  );
  if (this.state.loading) {
   orderSummary = <Spinner />;
  }
  let burger = (
   <Fragment>
    <Burger ingredients={this.props.ings} />
    <BuildControls
     ingredientAdded={this.props.onIngredientAdded}
     ingredientRemoved={this.props.onIngredientRemoved}
     disabled={disabledInfo}
     price={this.props.price}
     purchaseable={this.updatePurchaseState(this.props.ings)}
     ordered={this.purchaseHandler.bind(this)}
    />
   </Fragment>
  );
  if (!this.props.ings) {
   burger = this.state.error ? <p>Ingredients cannot be loaded!</p> : <Spinner />;
   orderSummary = <Spinner />;
  }
  return (
   <Fragment>
    <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
     {orderSummary}
    </Modal>
    {burger}
   </Fragment>
  );
 }
}
const mapStateToProps = state => {
 return {
  ings: state.ingredients,
  price: state.totalPrice
 };
};

const mapDispatchToProps = dispatch => {
 return {
  onIngredientAdded: name => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: name }),
  onIngredientRemoved: name =>
   dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: name })
 };
};
export default connect(
 mapStateToProps,
 mapDispatchToProps
)(withRouter(ErrorHandler(BurgerBuilder, axios)));
